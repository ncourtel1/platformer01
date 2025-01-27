import ECS from "./systems/Ecs.js";
import createPlayer from "./entities/createPlayer.js";
import createObject from "./entities/createObject.js";
import RunSystem from "./systems/RunSystem.js";
import RenderSystem from "./systems/renderSystem.js";
import CollisionSystem from "./systems/collisionSystem.js";
import CameraSystem from "./systems/cameraSystem.js";
import JumpSystem from "./systems/jumpSystem.js";
import GravitySystem from "./systems/gravitySystem.js";

const ecs = new ECS();
const player = createPlayer(100, 500, 10, 10, "white", 100, 100);
ecs.addEntity(player);
//const obj1 = createObject(200, 500, "green", 32, 32);
//ecs.addEntity(obj1);

const game_container = document.getElementById("game-container");

ecs.addSystem(new RunSystem());
ecs.addSystem(new RenderSystem(game_container));
ecs.addSystem(new CollisionSystem());
//ecs.addSystem(new CameraSystem(game_container, player, 400, 400));
ecs.addSystem(new JumpSystem());
ecs.addSystem(new GravitySystem());

let lastTime = performance.now();

function gameLoop(time){
   const dt = (time - lastTime) / 1000;
   lastTime = time;

   ecs.update(dt);

   requestAnimationFrame(gameLoop);
}

gameLoop(lastTime);