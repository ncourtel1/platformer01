import RunSystem from "./systems/runSystem.js";
import RenderSystem from "./systems/renderSystem.js";
import CollisionSystem from "./systems/collisionSystem.js";
import JumpSystem from "./systems/jumpSystem.js";
import GravitySystem from "./systems/gravitySystem.js";
import ShooterSystem from "./systems/shooterSystem.js";
import HealthSystem from "./systems/healthSystem.js";
import TimerSystem from "./systems/timerSystem.js";
import MenuSystem from "./systems/menuSystem.js";
import SpriteSystem from "./systems/spriteSystem.js";
import RespawnSystem from "./systems/respawnSystem.js";
import { ecs, player } from "./main.js";

let menuSys;

export function getMenuSys() {
    return menuSys;
}

export async function initSystems() {
    const game_container = document.getElementById("game-container");
    const HUD = document.getElementById("HUD");

    ecs.addSystem(new CollisionSystem());
    ecs.addSystem(new GravitySystem()); 

    ecs.addSystem(new RunSystem());
    ecs.addSystem(new JumpSystem());

    ecs.addSystem(new RenderSystem(game_container));
    ecs.addSystem(new SpriteSystem(game_container));
    ecs.addSystem(new ShooterSystem());

    ecs.addSystem(new HealthSystem(HUD, player));
    ecs.addSystem(new RespawnSystem());

    const timerSys = new TimerSystem(HUD, 10000, player);
    menuSys = new MenuSystem(HUD, timerSys);

    ecs.addSystem(timerSys);
    ecs.addSystem(menuSys);
}