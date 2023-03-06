// build the collision index
let collisions: string[] = [];

// left top walls, coner points (0, 0), (0, 176), (176, 368), (368, 0)
for (let i = 0; i < 368; i += 4) {
  for (let j = 0; j < 176; j += 4) {
    collisions.push([i, j].toString());
  }
}

//right top walls, coner points (468, 0), (468, 112), (640, 112), (640, 0)
for (let i = 468; i < 640; i += 4) {
  for (let j = 0; j < 112; j += 4) {
    collisions.push([i, j].toString());
  }
}

// between that two wall, (368, 0), (368, 32), (468, 32), (468, 0)
for (let i = 368; i < 468; i += 4) {
  for (let j = 0; j < 32; j += 4) {
    collisions.push([i, j].toString());
  }
}

// right walls, coner points (612, 112), (612, 336), (640, 336), (640, 112)
for (let i = 612; i < 640; i += 4) {
  for (let j = 112; j < 336; j += 4) {
    collisions.push([i, j].toString());
  }
}

// left walls, coner points (0, 176), (0, 384), (16, 384), (16, 176)
for (let i = 0; i < 16; i += 4) {
  for (let j = 176; j < 384; j += 4) {
    collisions.push([i, j].toString());
  }
}

export const COLLISIONS = collisions;
