import ECS from "./systems/ecs.js";
import createPlayer from "./entities/createPlayer.js";
import createObject from "./entities/createObject.js";
import RunSystem from "./systems/runSystem.js";
import RenderSystem from "./systems/renderSystem.js";
import CollisionSystem from "./systems/collisionSystem.js";
import CameraSystem from "./systems/cameraSystem.js";
import JumpSystem from "./systems/jumpSystem.js";
import GravitySystem from "./systems/gravitySystem.js";
import AnimationSystem from "./systems/animationSystem.js";
import SpriteSystem from "./systems/spriteSystem.js";

const ecs = new ECS();
const playerIdle1 = new Image();
playerIdle1.src = "assets/The Crusty Crew/Sprites/Pink Star/01-Idle/Idle 01.png";
const playerIdle2 = new Image();
playerIdle2.src = "assets/The Crusty Crew/Sprites/Pink Star/01-Idle/Idle 02.png";
const playerIdle3 = new Image();
playerIdle3.src = "assets/The Crusty Crew/Sprites/Pink Star/01-Idle/Idle 03.png";
const playerIdle4 = new Image();
playerIdle4.src = "assets/The Crusty Crew/Sprites/Pink Star/01-Idle/Idle 04.png";
const playerIdle5 = new Image();
playerIdle5.src = "assets/The Crusty Crew/Sprites/Pink Star/01-Idle/Idle 05.png";
const playerIdle6 = new Image();
playerIdle6.src = "assets/The Crusty Crew/Sprites/Pink Star/01-Idle/Idle 06.png";
const playerIdle7 = new Image();
playerIdle7.src = "assets/The Crusty Crew/Sprites/Pink Star/01-Idle/Idle 07.png";
const playerIdle8 = new Image();
playerIdle8.src = "assets/The Crusty Crew/Sprites/Pink Star/01-Idle/Idle 08.png";
const playerImages = [playerIdle1, playerIdle2, playerIdle3, playerIdle4, playerIdle5, playerIdle6, playerIdle7, playerIdle8];

const player = createPlayer(100, 500, 0, 0, "", 100, 100, playerImages, "idle");
ecs.addEntity(player);
const obj1 = createObject(200, 500, "green", 32, 32);
ecs.addEntity(obj1);

const game_container = document.getElementById("game-container");

ecs.addSystem(new RunSystem());
ecs.addSystem(new RenderSystem(game_container));
ecs.addSystem(new CollisionSystem());
//ecs.addSystem(new CameraSystem(game_container, player, 400, 400));
ecs.addSystem(new JumpSystem());
ecs.addSystem(new GravitySystem());
//ecs.addSystem(new AnimationSystem());
ecs.addSystem(new SpriteSystem(game_container));

let lastTime = performance.now();

function gameLoop(time){
   const dt = (time - lastTime) / 1000;
   lastTime = time;

   ecs.update(dt);

   requestAnimationFrame(gameLoop);
}

gameLoop(lastTime);