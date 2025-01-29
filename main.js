import ECS from "./systems/ecs.js";
import createPlayer from "./entities/createPlayer.js";
import createObject from "./entities/createObject.js";
import RunSystem from "./systems/runSystem.js";
import RenderSystem from "./systems/renderSystem.js";
import CollisionSystem from "./systems/collisionSystem.js";
import CameraSystem from "./systems/cameraSystem.js";
import JumpSystem from "./systems/jumpSystem.js";
import GravitySystem from "./systems/gravitySystem.js";
import SpriteSystem from "./systems/spriteSystem.js";

const ecs = new ECS();

const playerIdle1 = new Image();
playerIdle1.src = "assets/Captain Clown Nose/Sprites/Captain Clown Nose/Captain Clown Nose without Sword/01-Idle/Idle 01.png";
const playerIdle2 = new Image();
playerIdle2.src = "assets/Captain Clown Nose/Sprites/Captain Clown Nose/Captain Clown Nose without Sword/01-Idle/Idle 02.png";
const playerIdle3 = new Image();
playerIdle3.src = "assets/Captain Clown Nose/Sprites/Captain Clown Nose/Captain Clown Nose without Sword/01-Idle/Idle 03.png";
const playerIdle4 = new Image();
playerIdle4.src = "assets/Captain Clown Nose/Sprites/Captain Clown Nose/Captain Clown Nose without Sword/01-Idle/Idle 04.png";
const playerIdle5 = new Image();
playerIdle5.src = "assets/Captain Clown Nose/Sprites/Captain Clown Nose/Captain Clown Nose without Sword/01-Idle/Idle 05.png";

const playerIdleImages = [playerIdle1, playerIdle2, playerIdle3, playerIdle4, playerIdle5];

const playerRun1 = new Image();
playerRun1.src = "assets/Captain Clown Nose/Sprites/Captain Clown Nose/Captain Clown Nose without Sword/02-Run/Run 01.png";
const playerRun2 = new Image();
playerRun2.src = "assets/Captain Clown Nose/Sprites/Captain Clown Nose/Captain Clown Nose without Sword/02-Run/Run 02.png";
const playerRun3 = new Image();
playerRun3.src = "assets/Captain Clown Nose/Sprites/Captain Clown Nose/Captain Clown Nose without Sword/02-Run/Run 03.png";
const playerRun4 = new Image();
playerRun4.src = "assets/Captain Clown Nose/Sprites/Captain Clown Nose/Captain Clown Nose without Sword/02-Run/Run 04.png";
const playerRun5 = new Image();
playerRun5.src = "assets/Captain Clown Nose/Sprites/Captain Clown Nose/Captain Clown Nose without Sword/02-Run/Run 05.png";
const playerRun6 = new Image();
playerRun6.src = "assets/Captain Clown Nose/Sprites/Captain Clown Nose/Captain Clown Nose without Sword/02-Run/Run 06.png";

const playerRunImages = [playerRun1, playerRun2, playerRun3, playerRun4, playerRun5, playerRun6];

const playerJump1 = new Image();
playerJump1.src = "assets/Captain Clown Nose/Sprites/Captain Clown Nose/Captain Clown Nose without Sword/03-Jump/Jump 01.png";
const playerJump2 = new Image();
playerJump2.src = "assets/Captain Clown Nose/Sprites/Captain Clown Nose/Captain Clown Nose without Sword/03-Jump/Jump 02.png";
const playerJump3 = new Image();
playerJump3.src = "assets/Captain Clown Nose/Sprites/Captain Clown Nose/Captain Clown Nose without Sword/03-Jump/Jump 03.png";

const playerJumpImages = [playerJump1, playerJump2, playerJump3];

const playerFall1 = new Image();
playerFall1.src = "assets/Captain Clown Nose/Sprites/Captain Clown Nose/Captain Clown Nose without Sword/04-Fall/Fall 01.png";

const playerFallImages = [playerFall1];

const playerAnimation = new Map();
playerAnimation.set('idle', playerIdleImages)
playerAnimation.set('run', playerRunImages)
playerAnimation.set('jump', playerJumpImages)
playerAnimation.set('fall', playerFallImages)

const playerParticleRun1 = new Image();
playerParticleRun1.src = "assets/Captain Clown Nose/Sprites/Dust Particles/Run 01.png";
const playerParticleRun2 = new Image();
playerParticleRun2.src = "assets/Captain Clown Nose/Sprites/Dust Particles/Run 02.png";
const playerParticleRun3 = new Image();
playerParticleRun3.src = "assets/Captain Clown Nose/Sprites/Dust Particles/Run 03.png";
const playerParticleRun4 = new Image();
playerParticleRun4.src = "assets/Captain Clown Nose/Sprites/Dust Particles/Run 04.png";
const playerParticleRun5 = new Image();
playerParticleRun5.src = "assets/Captain Clown Nose/Sprites/Dust Particles/Run 05.png";

const playerParticleRunImages = [playerParticleRun1, playerParticleRun2, playerParticleRun3, playerParticleRun4, playerParticleRun5];

const playerParticleJump1 = new Image();
playerParticleJump1.src = "assets/Captain Clown Nose/Sprites/Dust Particles/Jump 01.png";
const playerParticleJump2 = new Image();
playerParticleJump2.src = "assets/Captain Clown Nose/Sprites/Dust Particles/Jump 02.png";
const playerParticleJump3 = new Image();
playerParticleJump3.src = "assets/Captain Clown Nose/Sprites/Dust Particles/Jump 03.png";
const playerParticleJump4 = new Image();
playerParticleJump4.src = "assets/Captain Clown Nose/Sprites/Dust Particles/Jump 04.png";
const playerParticleJump5 = new Image();
playerParticleJump5.src = "assets/Captain Clown Nose/Sprites/Dust Particles/Jump 05.png";
const playerParticleJump6 = new Image();
playerParticleJump6.src = "assets/Captain Clown Nose/Sprites/Dust Particles/Jump 06.png";

const playerParticleJumpImages = [playerParticleJump1, playerParticleJump2, playerParticleJump3, playerParticleJump4, playerParticleJump5, playerParticleJump6];

const playerParticle = new Map();
playerParticle.set('run', playerParticleRunImages)
//playerParticle.set('jump', playerParticleJumpImages)

/*

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

const playerIdleImages = [playerIdle1, playerIdle2, playerIdle3, playerIdle4, playerIdle5, playerIdle6, playerIdle7, playerIdle8];

const playerRun1 = new Image();
playerRun1.src = "assets/The Crusty Crew/Sprites/Pink Star/02-Run/Run 01.png";
const playerRun2 = new Image();
playerRun2.src = "assets/The Crusty Crew/Sprites/Pink Star/02-Run/Run 02.png";
const playerRun3 = new Image();
playerRun3.src = "assets/The Crusty Crew/Sprites/Pink Star/02-Run/Run 03.png";
const playerRun4 = new Image();
playerRun4.src = "assets/The Crusty Crew/Sprites/Pink Star/02-Run/Run 04.png";
const playerRun5 = new Image();
playerRun5.src = "assets/The Crusty Crew/Sprites/Pink Star/02-Run/Run 05.png";
const playerRun6 = new Image();
playerRun6.src = "assets/The Crusty Crew/Sprites/Pink Star/02-Run/Run 06.png";

const playerRunImages = [playerRun1, playerRun2, playerRun3, playerRun4, playerRun5, playerRun6];

const playerJump1 = new Image();
playerJump1.src = "assets/The Crusty Crew/Sprites/Pink Star/03-Jump/Jump 01.png";
const playerJump2 = new Image();
playerJump2.src = "assets/The Crusty Crew/Sprites/Pink Star/03-Jump/Jump 02.png";
const playerJump3 = new Image();
playerJump3.src = "assets/The Crusty Crew/Sprites/Pink Star/03-Jump/Jump 03.png";

const playerJumpImages = [playerJump1, playerJump2, playerJump3];

const playerFall1 = new Image();
playerFall1.src = "assets/The Crusty Crew/Sprites/Pink Star/04-Fall/Fall 01.png";

const playerFallImages = [playerFall1];

const playerAnimation = new Map();
playerAnimation.set('idle', playerIdleImages)
playerAnimation.set('run', playerRunImages)
playerAnimation.set('jump', playerJumpImages)
playerAnimation.set('fall', playerFallImages)

*/

const player = createPlayer(100, 500, 0, 0, "white", 160, 100, playerAnimation, playerParticle);
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
ecs.addSystem(new CollisionSystem());
ecs.addSystem(new GravitySystem());
ecs.addSystem(new JumpSystem());
ecs.addSystem(new RenderSystem(game_container));
ecs.addSystem(new SpriteSystem(game_container));


//ecs.addSystem(new CameraSystem(game_container, player, 400, 400));

let lastTime = performance.now();


function gameLoop(time){
   const dt = (time - lastTime) / 1000;
   lastTime = time;

   ecs.update(dt);

   requestAnimationFrame(gameLoop);
}

gameLoop(lastTime);

// function fpsMeter() {
//    let prevTime = Date.now(),
//        frames = 0;

//    requestAnimationFrame(function loop() {
//      const time = Date.now();
//      frames++;
//      if (time > prevTime + 1000) {
//        let fps = Math.round( ( frames * 1000 ) / ( time - prevTime ) );
//        prevTime = time;
//        frames = 0;

//        console.log('FPS: ', fps);
//      }

//      requestAnimationFrame(loop);
//    });
//  }
 
//  fpsMeter();