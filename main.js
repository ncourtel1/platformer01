import ECS from "./systems/ecs.js";
import createPlayer from "./entities/createPlayer.js";
import createObject from "./entities/createObject.js";
import createShooter from "./entities/createShooter.js";
import {
  playerAnimation,
  playerParticle,
  canonBallProjectile,
  canonFireAnim,
  spikeSprite,
  chestKeySprite,
  chestSprite,
  rhumSprite,
  foregroundPalmSprite,
} from "./spriteLoader.js";
import generateBackground from "./backgroundObjects.js";
import { getMenuSys, initSystems } from "./initializeSystems.js";
import MenuSystem from "./systems/menuSystem.js";

export const ecs = new ECS();
export let player;
export let lastTime;

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

async function generateObjectsFromMap(map) {
  const map1 = await loadMap(map);
  if (!map1) return;

  const yoffset = 950;
  const zoom = 3.75;
  const tileSize = 32;
  const tilesPerRow = 17;
  const foregroundtilesPerRow = 3;
  const tilemapImage = new Image();
  tilemapImage.src = "assets/Palm Tree Island/Sprites/Terrain/tileMap.png";
  const states = new Map();
  states.set("tile", [tilemapImage]);
  const foregroundImage = new Image();
  foregroundImage.src =
    "assets/Palm Tree Island/Sprites/Front Palm Trees/foreground_tileMap.png";
  const foregroundStates = new Map();
  foregroundStates.set("tile", [foregroundImage]);
  player = createPlayer(
    map1.player.x * 32 * zoom,
    map1.player.y * 32 * zoom - yoffset,
    0,
    0,
    "",
    80,
    92,
    playerAnimation,
    playerParticle
  );
  ecs.addEntity(player);
  for (let y = 0; y < map1.map.length; y++) {
    for (let x = 0; x < map1.map[y].length; x++) {
      const tileIndex = map1.map[y][x];
      if (tileIndex !== -1) {
        const sx = (tileIndex % tilesPerRow) * tileSize;
        const sy = Math.floor(tileIndex / tilesPerRow) * tileSize;
        const posX = x * tileSize;
        const posY = y * tileSize;
        const obj = createObject(
          posX * zoom,
          posY * zoom - yoffset,
          "",
          tileSize * zoom,
          tileSize * zoom,
          states,
          undefined,
          undefined,
          undefined,
          sx * zoom,
          sy * zoom
        );
        ecs.addEntity(obj);
      }
    }
  }
  for (let i = 0; i < map1.spikes.length; i++) {
    const spikesData = map1.spikes[i];
    const spike = createObject(
      spikesData.x * 32 * zoom,
      spikesData.y * 32 * zoom - yoffset + 60,
      "",
      tileSize * zoom,
      (tileSize * zoom) / 2,
      spikeSprite,
      undefined,
      undefined,
      0,
      undefined,
      undefined,
      true,
      false,
      "trap"
    );
    ecs.addEntity(spike);
  }
  for (let i = 0; i < map1.shooters.length; i++) {
    const shooterData = map1.shooters[i];
    const canonBallObj = createObject(
      0,
      0,
      "",
      50,
      50,
      canonBallProjectile,
      undefined,
      undefined,
      0.2,
      undefined,
      undefined,
      true,
      true,
      "trap"
    );
    const canon = createShooter(
      shooterData.x * 32 * zoom,
      shooterData.y * 32 * zoom - yoffset + 21,
      "",
      160,
      99,
      canonFireAnim,
      undefined,
      0,
      0.17,
      true,
      canonBallObj,
      2000,
      !shooterData.flip
    );
    ecs.addEntity(canon);
  }
  const chestKey = createObject(
    map1.chestKey.x * 32 * zoom,
    map1.chestKey.y * 32 * zoom - yoffset,
    "",
    (tileSize * zoom) / 1.5,
    (tileSize * zoom) / 1.5,
    chestKeySprite,
    undefined,
    undefined,
    0.2,
    undefined,
    undefined,
    true,
    false,
    "keyChess"
  );
  ecs.addEntity(chestKey);
  const chest = createObject(
    map1.chest.x * 32 * zoom,
    map1.chest.y * 32 * zoom - yoffset + 30,
    "",
    tileSize * zoom,
    (tileSize * zoom) / 1.34,
    chestSprite,
    undefined,
    undefined,
    0.2,
    undefined,
    undefined,
    true,
    false,
    "chess"
  );
  ecs.addEntity(chest);
  const rhum = createObject(
    map1.rhum.x * 32 * zoom + 40,
    map1.rhum.y * 32 * zoom - yoffset + 50,
    "",
    (tileSize * zoom) / 3,
    (tileSize * zoom) / 2.3,
    rhumSprite,
    undefined,
    undefined,
    0.2,
    undefined,
    undefined,
    true,
    false,
    "healthBonus"
  );
  ecs.addEntity(rhum);
  for (let y = 0; y < map1.foregroundMap.length; y++) {
    for (let x = 0; x < map1.foregroundMap[y].length; x++) {
      const tileIndex = map1.foregroundMap[y][x];
      if (tileIndex !== -1) {
        const sx = (tileIndex % foregroundtilesPerRow) * tileSize;
        const sy = Math.floor(tileIndex / foregroundtilesPerRow) * tileSize;
        const posX = x * tileSize;
        const posY = y * tileSize;
        const obj = createObject(
          posX * zoom,
          posY * zoom - yoffset,
          "",
          tileSize * zoom,
          tileSize * zoom,
          foregroundStates,
          undefined,
          undefined,
          undefined,
          sx * zoom,
          sy * zoom,
          false,
          false
        );
        ecs.addEntity(obj);
      }
    }
  }
  for (let i = 0; i < map1.palms.length; i++) {
    const palmsData = map1.palms[i];
    const palms = createObject(
      palmsData.x * 32 * zoom,
      palmsData.y * 32 * zoom - yoffset + 25,
      "",
      tileSize * zoom,
      (tileSize * zoom) / 1.25,
      foregroundPalmSprite,
      undefined,
      undefined,
      0,
      undefined,
      undefined,
      false,
      false,
      "palm"
    );
    ecs.addEntity(palms);
  }
}

let gameLoopId = null;
lastTime = 0;

export let levels = ["intermezzo", "level-1.json", "intermezzo", "palms.json"];
export let current_level = 0;

// Fonction pour set une valeur au current_level, utilisable depuis un autre package
export const setCurrentLevel = (lvl) => {
  current_level = lvl;
  if (current_level > levels.length - 1) {
    current_level = levels.length - 1;
  }
};

// Fonction pour passer au niveau suivant depuis un autre package
export const loadNextLevel = () => {
  setCurrentLevel(current_level + 1);
  startGame(levels[current_level]);
};

async function gameLoop(time) {
  const dt = (time - lastTime) / 1000;
  lastTime = time;

  if (!getMenuSys().isPaused()) {
    ecs.update(dt);
  }

  gameLoopId = requestAnimationFrame(gameLoop);
}

export async function startGame(map) {
  if (gameLoopId) {
    cancelAnimationFrame(gameLoopId);
    gameLoopId = null;
    ecs.clear();
  }
  lastTime = performance.now();
  
  if (map !== "intermezzo") {
    generateBackground();
    await generateObjectsFromMap(map);
    initSystems(lastTime);
    gameLoop(lastTime);
  } else {
    const game = document.getElementById("game-container");
    const gameWidth = game.offsetWidth;
    const gameHeight = game.offsetHeight;
    
    intermezzo = new Image();
    intermezzo.src = `assets/mapTransition.gif?t=${new Date().getTime()}`;
    intermezzo.style.zIndex = 100000;
    intermezzo.style.width = `${gameWidth}px`;
    intermezzo.style.height = `${gameHeight}px`;
    intermezzo.style.imageRendering = "pixelated";
    game.appendChild(intermezzo);
    intermezzo.style.filter = "brightness(0%)";
    intermezzo.style.transition = "filter 1s ease-in-out";    
    setTimeout(() => {
      intermezzo.style.filter = "brightness(100%)";
    }, 50);
    setTimeout(() => {
      intermezzo.style.filter = "brightness(0%)";
    }, 3450);
    setTimeout(completeIntermezzo, 4500);
  }
}


let intermezzo = undefined;

function completeIntermezzo() {
  if (intermezzo) intermezzo.remove()
    loadNextLevel();
}

document.getElementById("playButton").addEventListener("click", () => {
  const menu = document.getElementById("start-menu");
  menu.style.display = "none";

  const game_container = document.getElementById("game-container");
  game_container.style.display = "block";

  // Lancer le jeu
  startGame(levels[0]);
});

document.getElementById("restartButton").addEventListener("click", () => {
  const menu = document.getElementById("start-menu");
  menu.style.display = "none";

  const game_container = document.getElementById("game-container");
  game_container.style.display = "block";

  // relancer le jeu au niveau actuel

  startGame(levels[current_level]);
});

window.addEventListener("blur", () => {
  if (ecs.initialized) {
    lastTime = 0;
    let menuSys = ecs.getSystem(MenuSystem);
    menuSys.togglePause();
  }
});

window.addEventListener("focus", () => {
  if (ecs.initialized) {
    let menuSys = ecs.getSystem(MenuSystem);
    menuSys.togglePause();
    lastTime = performance.now();
  }
});
