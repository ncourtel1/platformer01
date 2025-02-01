import ECS from "./systems/ecs.js";
import createPlayer from "./entities/createPlayer.js";
import createObject from "./entities/createObject.js";
import createShooter from "./entities/createShooter.js";
import { playerAnimation, playerParticle, canonBallProjectile, canonFireAnim } from "./spriteLoader.js";
import generateBackground from "./backgroundObjects.js";
import { getMenuSys, initSystems } from "./initializeSystems.js";

export const ecs = new ECS();
export let player;

async function loadMap(filename) {
  try {
    const response = await fetch(filename);
    if (!response.ok) throw new Error("Error while loading map");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function generateObjectsFromMap() {
  const map1 = await loadMap('test.json');
  if (!map1) return;
  player = createPlayer(300, 500, 0, 0, "", 80, 92, playerAnimation, playerParticle);
  ecs.addEntity(player);
  const yoffset = 950;
  const zoom = 3.75;
  const tileSize = 32;
  const tilesPerRow = 17;
  const tilemapImage = new Image();
  tilemapImage.src = 'assets/Palm Tree Island/Sprites/Terrain/tileMap.png';
  const states = new Map();
  states.set('tile', [tilemapImage]);

  for (let y = 0; y < map1.length; y++) {
    for (let x = 0; x < map1[y].length; x++) {
      const tileIndex = map1[y][x];
      if (tileIndex !== -1) {
        const sx = (tileIndex % tilesPerRow) * tileSize;
        const sy = Math.floor(tileIndex / tilesPerRow) * tileSize;
        const posX = x * tileSize;
        const posY = y * tileSize;
        const obj = createObject(posX * zoom, posY * zoom - yoffset, "", tileSize * zoom, tileSize * zoom, states, undefined, undefined, undefined, sx * zoom, sy * zoom);
        ecs.addEntity(obj);
      }
    }
  }
  const canonBallObj = createObject(0, 0, "", 50, 50, canonBallProjectile, undefined, undefined, undefined, undefined, undefined, true, true);
  const canon1 = createShooter(600, 746, "", 160, 104, canonFireAnim, undefined, 0, 0.17, true, canonBallObj, 2000);
  ecs.addEntity(canon1);
}

let lastTime = performance.now();

function gameLoop(time) {
  const dt = (time - lastTime) / 1000;
  lastTime = time;

  if (!getMenuSys().isPaused()) {
    ecs.update(dt);
  }

  requestAnimationFrame(gameLoop);
}

async function startGame() {
  generateBackground();
  await generateObjectsFromMap();
  initSystems();
  gameLoop(lastTime);
}

startGame();
