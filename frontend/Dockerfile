# Stage 1: Build the Angular app
FROM node:16-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Stage 2: Create the production image
FROM nginx:alpine
COPY --from=builder /app/dist/frontend /usr/share/nginx/html