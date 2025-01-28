import ECS from "./systems/ecs.js";
import createPlayer from "./entities/createPlayer.js";
import createObject from "./entities/createObject.js";
import RunSystem from "./systems/runSystem.js";
import RenderSystem from "./systems/renderSystem.js";
import CollisionSystem from "./systems/collisionSystem.js";
import JumpSystem from "./systems/jumpSystem.js";
import GravitySystem from "./systems/gravitySystem.js";
import HealthSystem from "./systems/healthSystem.js";
import TimerSystem from "./systems/timerSystem.js";
import MenuSystem from "./systems/menuSystem.js";

const ecs = new ECS();
const player = createPlayer(100, 500, 0, 0, "white", 100, 100);
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

ecs.addSystem(new HealthSystem(game_container, player));

const timerSys = new TimerSystem(game_container, 10);
const menuSys = new MenuSystem(game_container, timerSys);

ecs.addSystem(timerSys);
ecs.addSystem(menuSys);

let lastTime = performance.now();

function gameLoop(time) {
  const dt = (time - lastTime) / 1000;
  lastTime = time;

  if (!menuSys.isPaused()) {
    ecs.update(dt);
  }

  requestAnimationFrame(gameLoop);
}

gameLoop(lastTime);