import express from "express";
import bodyParser from "body-parser";
import { Server } from "socket.io";
import http from "http";
import dotenv from "dotenv";
import redis from "redis";
import sql from "mssql";
import twilio from "twilio";

dotenv.config();

const PORT = process.env.PORT || 5000;
export const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// config for your database
const config = {
  user: "CloudSA4069d47d",
  password: "yuerunyu1.",
  server: "chat-town.database.windows.net",
  database: "chat-town",
  options: {
    encrypt: true,
    enableArithAbort: true,
  },
};

// connect to your database
sql.connect(config, function (err) {
  if (err) console.log(err);
  else console.log("Database connected");
});

app.post("/send-sms", (req, res) => {
  const accountSid = "AC662c7db6285d6b82a91d93d37a8ab278";
  const authToken = "0f444eb16079fadab4a282c6297ea813";
  const client = twilio(accountSid, authToken);

  const { to, body } = req.body;

  client.messages
    .create({
      body: body,
      from: "+15075805415",
      to: to,
    })
    .then((message) => res.status(200).json({ message: "SMS sent!" }))
    .catch((err) => {
      res.status(500).json({ message: "Something went wrong" });
    });
});

// connect to redis
const client = redis.createClient({
  url: "redis://redis:6379",
});

client.on("error", (err) => console.log("Redis Client Error", err));
client.connect().then(() => console.log("Redis Client Connected"));

// create socket server
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
  },
});

// socket connection
io.on("connection", (socket) => {
  // send socket id to client
  socket.emit("connection", socket.id);

  // disconnect
  socket.on("disconnect", () => {
    client.hDel("players", socket.id).then(() => {
      io.sockets.emit("player_disconnected", socket.id);
    });
  });

  // new player joined
  socket.on("player_joined", (data) => {
    client.hSet("players", socket.id, JSON.stringify(data));
    io.sockets.emit("player_joined", data);
  });

  // existing players
  socket.on("online_players", () => {
    client.hGetAll("players").then((players) => {
      socket.emit("online_players", players);
    });
  });

  // player Moved
  socket.on("player_moved", (player) => {
    client.hSet("players", player.id, JSON.stringify(player));
    client.hGetAll("players").then((players) => {
      io.sockets.emit("player_moved", players);
    });
  });
});

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
