import ECS from "./systems/ecs.js";
import createPlayer from "./entities/createPlayer.js";
import createObject from "./entities/createObject.js";
import RunSystem from "./systems/runSystem.js";
import RenderSystem from "./systems/renderSystem.js";
import CollisionSystem from "./systems/collisionSystem.js";
import CameraSystem from "./systems/cameraSystem.js";
import JumpSystem from "./systems/jumpSystem.js";
import GravitySystem from "./systems/gravitySystem.js";

const ecs = new ECS();
const player = createPlayer(100, 500, 0, 0, "white", 64, 64);
ecs.addEntity(player);
const obj1 = createObject(400, 700, "green", 32, 32);
ecs.addEntity(obj1);
const obj2 = createObject(100, 700, "green", 32, 32);
ecs.addEntity(obj2);
const obj3 = createObject(700, 550, "green", 200, 200);
ecs.addEntity(obj3);
const obj4 = createObject(1000, 550, "green", 100, 50);
ecs.addEntity(obj4);
const ground = createObject(0, 800, "green", 3000, 100);
ecs.addEntity(ground);

const game_container = document.getElementById("game-container");

ecs.addSystem(new RunSystem());
ecs.addSystem(new RenderSystem(game_container));
ecs.addSystem(new JumpSystem());
ecs.addSystem(new CollisionSystem());
//ecs.addSystem(new CameraSystem(game_container, player, 400, 400));

ecs.addSystem(new GravitySystem());

let lastTime = performance.now();

function gameLoop(time){
   const dt = (time - lastTime) / 1000;
   lastTime = time;

   ecs.update(dt);

   requestAnimationFrame(gameLoop);
}

gameLoop(lastTime);