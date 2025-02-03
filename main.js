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

  const yoffset = 950;
  const zoom = 3.75;
  const tileSize = 32;
  const tilesPerRow = 17;
  const tilemapImage = new Image();
  tilemapImage.src = 'assets/Palm Tree Island/Sprites/Terrain/tileMap.png';
  const states = new Map();
  states.set('tile', [tilemapImage]);
  player = createPlayer(map1.player.x * 32 * zoom, map1.player.y * 32 * zoom - yoffset, 0, 0, "", 80, 92, playerAnimation, playerParticle);
  ecs.addEntity(player);
  for (let y = 0; y < map1.map.length; y++) {
    for (let x = 0; x < map1.map[y].length; x++) {
      const tileIndex = map1.map[y][x];
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
  for (let i = 0; i < map1.shooters.length; i++) {
    const shooterData = map1.shooters[i];
    const canon = createShooter(shooterData.x * 32 * zoom, shooterData.y * 32 * zoom - yoffset + 16, "", 160, 104, canonFireAnim, undefined, 0, 0.17, true, canonBallObj, 2000, false);
    ecs.addEntity(canon);
  }
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
