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
  playerSounds,
  cannonSounds,
  ambience,
  music,
} from "./spriteLoader.js";
import generateBackground from "./backgroundObjects.js";
import { getMenuSys, getTimerSys, initSystems } from "./initializeSystems.js";
import { displayScores, submitScore } from "./scoring/scoring.js";

export const ecs = new ECS();
export let player;
export let lastTime;
let playerHealth = { value: 3, old: 3 };
const maxHealth = 3;
export let score = { point: 0, time: 0 };
let isTitle = true;

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
    playerParticle,
    playerSounds,
    maxHealth,
    playerHealth,
    score
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
      !shooterData.flip,
      cannonSounds
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

export let levels = [
  // "introduction",
  // "introduction2",
  // "intermezzo",
  // "level-1.json",
  // "intermezzo",
  "palms.json",
  "score",
];

export let current_level = 0;

// Fonction pour set une valeur au current_level, utilisable depuis un autre package
export const setCurrentLevel = (lvl) => {
  current_level = lvl;
  if (current_level > levels.length - 1) {
    current_level = levels.length - 1;
  }
};

// Fonction pour passer au niveau suivant depuis un autre package
export const loadNextLevel = (gameOver) => {
  setCurrentLevel(current_level + 1);
  startGame(levels[current_level], gameOver);
};

async function gameLoop(time) {
  const dt = (time - lastTime) / 1000;
  lastTime = time;

  if (!getMenuSys().isPaused()) {
    ecs.update(dt);
  }

  gameLoopId = requestAnimationFrame(gameLoop);
}

export async function startGame(map, restart = false) {
  if (gameLoopId) {
    cancelAnimationFrame(gameLoopId);
    gameLoopId = null;
    if (map != "death" && !restart) {
      score.time +=
        getMenuSys().timerSys.maxTime -
        getMenuSys().timerSys.currTime.toFixed(3);
    }
    ecs.clear();
  }
  document.getElementById("scoreboard").style.display = "none";
  document.getElementById("scoreButton").style.display = "none";
  lastTime = performance.now();

  if (
    map !== "intermezzo" &&
    map !== "introduction" &&
    map !== "introduction2" &&
    map !== "death" &&
    map !== "score"
  ) {
    // cas ou c'est un map de jeu
    if (playerHealth.value <= 0) {
      playerHealth.value = maxHealth;
    }
    if (restart) {
      playerHealth.value = playerHealth.old;
    } else {
      playerHealth.old = playerHealth.value;
    }

    generateBackground();
    await generateObjectsFromMap(map);
    initSystems(lastTime);

    ecs.addEventListener(
      document.getElementById("continueButton"),
      "click",
      handleContinue
    );
    ecs.addEventListener(
      document.getElementById("restartButton"),
      "click",
      handleRestart
    );
    ecs.addEventListener(window, "blur", handleBlur);
    ecs.addEventListener(window, "focus", handleFocus);
    

    gameLoop(lastTime);
  } else {
    if (map == "score") {
      // Cas ou c'est la fin du jeu
      if (ecs.initialized) {
        getTimerSys().pauseTimer();
      }
      const menu = document.getElementById("start-menu");
      if (menu) {
        Object.assign(menu.style, {
          position: "relative",
          width: "1920px",
          height: "970px",
          background: 'url("assets/background.gif") no-repeat center center',
          backgroundSize: "cover",
          imageRendering: "pixelated",
          justifyContent: "center",
          alignItems: "center",
          top: "100px",
          zIndex: "10001",
        });
      }

      const title = document.getElementById("title");
      title.innerHTML = `Time ---- ${(
        Math.round(score.time * 1000) / 1000
      ).toFixed(3)}`;
      title.style.maxWidth = "250px";

      const display = document.getElementById("display");
      display.style.display = "flex";

      const continueBtn = document.getElementById("continueButton");
      const restartBtn = document.getElementById("restartButton");
      menu.style.display = "flex";

      restartBtn.style.display = "none";
      continueBtn.style.display = "none";

      const game_container = document.getElementById("game-container");
      game_container.style.display = "none";
    } else {
      if (ecs.initialized) {
        ecs.removeEventListeners();
        getTimerSys().pauseTimer();
        if (getMenuSys().paused) {
          getMenuSys().togglePause(true);
        }
      }

      const game = document.getElementById("game-container");
      const gameWidth = game.offsetWidth;
      const gameHeight = game.offsetHeight;
      const source =
        map == "intermezzo"
          ? "mapTransition.gif"
          : map == "introduction"
          ? "introduction.gif"
          : map == "introduction2"
          ? "introduction2.gif"
          : map == "death"
          ? "death.gif"
          : "";
      intermezzo.src = `assets/${source}`;
      intermezzo.style.zIndex = 10;
      intermezzo.style.width = `${gameWidth}px`;
      intermezzo.style.height = `${gameHeight}px`;
      intermezzo.style.imageRendering = "pixelated";
      intermezzo.style.filter = "brightness(0%)";
      intermezzo.style.transition = "filter 1s ease-in-out";
      game.appendChild(intermezzo);
      setTimeout(() => {
        intermezzo.style.filter = "brightness(100%)";
      }, 50);
      setTimeout(() => {
        intermezzo.style.filter = "brightness(0%)";
      }, 3450 - (map == "introduction" ? 400 : map == "introduction2" ? 1200 : map == "death" ? 2000 : 0));
      setTimeout(() => {
        completeIntermezzo(map == "death" ? true : false);
      }, 4500 - (map == "introduction" ? 400 : map == "introduction2" ? 1200 : map == "death" ? 2000 : 0));
    }
  }
}

let intermezzo = new Image();

function completeIntermezzo(gameOver) {
  if (ecs.initialized) {
    getMenuSys().isIntermezzo = false;
  }
  if (intermezzo) intermezzo.remove();
  if (gameOver) setCurrentLevel(2);
  if (ecs.initialized) {
    ecs.clear();
  }

  loadNextLevel(gameOver);
}

document.getElementById("playButton").addEventListener("click", () => {
  if (ecs.initialized) {
    ecs.clear();
  }

  const menu = document.getElementById("start-menu");
  menu.style.display = "none";

  const game_container = document.getElementById("game-container");
  game_container.style.display = "block";

  ambience.play();
  music.play();

  // Lancer le jeu
  startGame(levels[0]);
});

const handleContinue = () => {
  if (getMenuSys().isIntermezzo) {
    getMenuSys().isIntermezzo = !getMenuSys().isIntermezzo;
    getMenuSys().togglePause();
    loadNextLevel();
  } else {
    getMenuSys().togglePause();
  }
};

const handleRestart = () => {
  const menu = document.getElementById("start-menu");
  menu.style.display = "none";

  const game_container = document.getElementById("game-container");
  game_container.style.display = "block";

  playerHealth.value = playerHealth.old;
  startGame(levels[current_level], true);
};

const handleBlur = () => {
  if (ecs.initialized && current_level != levels.length - 1) {
    if (!getMenuSys().isIntermezzo && !getMenuSys().paused) {
      getMenuSys().togglePause();
      lastTime = 0;
    }
  }
};

const handleFocus = () => {
  if (ecs.initialized && current_level != levels.length - 1) {
    if (!getMenuSys().isIntermezzo) {
      getMenuSys().togglePause();
      lastTime = performance.now();
    }
  }
};

const handleSubmit = () => {
  const inputValue = document.getElementById("menuInput").value;
  if (inputValue.trim() !== "" && inputValue.length >= 1) {
    const formattedTime = (Math.round(score.time * 1000) / 1000).toFixed(3);
    submitScore(inputValue, formattedTime);
    window.location.reload(true);
  } else {
    window.location.reload(true);
  }
};

const handleScore = () => {
  if (isTitle) {
    document.getElementById("title").style.display = "none";
    displayScores(1);
    document.getElementById("scoreboard").style.fontSize = "20px";
    document.getElementById("scoreboard").style.margin = "-100 auto";
    document.getElementById("scoreboard").style.transform = "translateX(-90%)";
    document.getElementById("scoreboard").style.left = "50%";
    document.getElementById("scoreButton-text").innerHTML = "Back";
    isTitle = !isTitle;
  } else {
    document.getElementById("title").style.display = "block";
    document.getElementById("scoreboard").innerHTML = "";
    document.getElementById("scoreButton-text").innerHTML = "Score";
    isTitle = !isTitle;
  }
};

const handleInput = (e) => {
  let currentValue = e.target.value;
  
  let text = document.getElementById("submit-btn-text")
  
  if (currentValue.length > 6) {
    e.target.value = currentValue.substring(0, 6);
  } else if (currentValue.length >= 1){
    text.innerText = "Submit"
  } else if (currentValue == 0){
    text.innerText = "Menu"
  }
};

document.getElementById("submitButton").addEventListener("click", handleSubmit);
document.getElementById("scoreButton").addEventListener("click", handleScore);
document.getElementById("menuInput").addEventListener("input", handleInput);
