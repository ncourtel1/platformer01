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

const backPalmTree1 = new Image();
backPalmTree1.src = "assets/Palm Tree Island/Sprites/Back Palm Trees/Back Palm Tree Regular 01.png";
const backPalmTree2 = new Image();
backPalmTree2.src = "assets/Palm Tree Island/Sprites/Back Palm Trees/Back Palm Tree Regular 02.png";
const backPalmTree3 = new Image();
backPalmTree3.src = "assets/Palm Tree Island/Sprites/Back Palm Trees/Back Palm Tree Regular 03.png";
const backPalmTree4 = new Image();
backPalmTree4.src = "assets/Palm Tree Island/Sprites/Back Palm Trees/Back Palm Tree Regular 04.png";

const backPalmTrees = [backPalmTree1, backPalmTree2, backPalmTree3, backPalmTree4]

const backgroundPalmTrees = new Map();
backgroundPalmTrees.set('regular', backPalmTrees)

const waterReflect1 = new Image();
waterReflect1.src = "assets/Palm Tree Island/Sprites/Background/Water Reflect Big 01.png";
const waterReflect2 = new Image();
waterReflect2.src = "assets/Palm Tree Island/Sprites/Background/Water Reflect Big 02.png";
const waterReflect3 = new Image();
waterReflect3.src = "assets/Palm Tree Island/Sprites/Background/Water Reflect Big 03.png";
const waterReflect4 = new Image();
waterReflect4.src = "assets/Palm Tree Island/Sprites/Background/Water Reflect Big 04.png";

const waterReflects = [waterReflect1, waterReflect2, waterReflect3, waterReflect4]

const backgroundWaterReflects = new Map();
backgroundWaterReflects.set('big', waterReflects)

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

const player = createPlayer(300, 500, 0, 0, "", 80, 92, playerAnimation, playerParticle);
ecs.addEntity(player);
/*
const waterReflections = createObject(200, 700, "", 1500, 50, backgroundWaterReflects, undefined, 0, 0.1);
ecs.addEntity(waterReflections);
const forestYOffset = 100;
// BACK PALMS START
const obj3 = createObject(350, 500 + forestYOffset, "", 180, 180, backgroundPalmTrees, undefined, 0, 0.2);
ecs.addEntity(obj3);
const obj1 = createObject(200, 400 + forestYOffset, "", 320, 320, backgroundPalmTrees, undefined, 1, 0.1);
ecs.addEntity(obj1);
const obj2 = createObject(100, 550 + forestYOffset, "", 160, 160, backgroundPalmTrees, undefined, 2, 0.09);
ecs.addEntity(obj2);
const obj4 = createObject(600, 550 + forestYOffset, "", 160, 160, backgroundPalmTrees, undefined, 3, 0.08);
ecs.addEntity(obj4);
const obj5 = createObject(350 + 500, 500 + forestYOffset, "", 180, 180, backgroundPalmTrees, undefined, 4, 0.07);
ecs.addEntity(obj5);
const obj6 = createObject(200 + 500, 400 + forestYOffset, "", 320, 320, backgroundPalmTrees, undefined, 5, 0.11);
ecs.addEntity(obj6);
const obj7 = createObject(100 + 500, 550 + forestYOffset, "", 160, 160, backgroundPalmTrees, undefined, 6, 0.12);
ecs.addEntity(obj7);
const obj8 = createObject(600 + 500, 550 + forestYOffset, "", 160, 160, backgroundPalmTrees, undefined, 7, 0.13);
ecs.addEntity(obj8);
const obj9 = createObject(350 + 800, 500 + forestYOffset, "", 180, 180, backgroundPalmTrees, undefined, 8, 0.14);
ecs.addEntity(obj9);
const obj10 = createObject(200 + 1200, 400 + forestYOffset, "", 320, 320, backgroundPalmTrees, undefined, 9, 0.15);
ecs.addEntity(obj10);
const obj11 = createObject(100 + 1000, 550 + forestYOffset, "", 160, 160, backgroundPalmTrees, undefined, 10, 0.16);
ecs.addEntity(obj11);
const obj12 = createObject(600 + 1000, 550 + forestYOffset, "", 160, 160, backgroundPalmTrees, undefined, 11, 0.17);
ecs.addEntity(obj12);
// BACK PALMS END
*/
const map1 = [[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[0,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,2],[17,19,-1,68,69,69,70,-1,-1,4,-1,-1,-1,-1,17,19],[17,19,-1,-1,-1,-1,-1,-1,-1,21,-1,-1,-1,-1,17,19],[17,19,-1,-1,-1,-1,-1,-1,-1,21,-1,-1,72,-1,17,19],[17,19,-1,-1,-1,-1,-1,-1,-1,38,-1,-1,-1,-1,17,19],[17,19,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,17,19],[83,69,69,69,69,69,69,69,69,69,69,69,69,69,69,84]];

function generateObjectsFromMap() {
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
            const obj = createObject(posX, posY, "", tileSize, tileSize, states, null, 0, 0, sx, sy);
            ecs.addEntity(obj);
         }
      }
   }
}


const game_container = document.getElementById("game-container");

ecs.addSystem(new RunSystem());
ecs.addSystem(new JumpSystem());
ecs.addSystem(new CollisionSystem());
ecs.addSystem(new GravitySystem());
ecs.addSystem(new RenderSystem(game_container));
ecs.addSystem(new SpriteSystem(game_container));


//ecs.addSystem(new CameraSystem(game_container, player, 400, 400));

let lastTime = performance.now();


function gameLoop(time) {
   const dt = (time - lastTime) / 1000;
   lastTime = time;

   ecs.update(dt);

   requestAnimationFrame(gameLoop);
}


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
generateObjectsFromMap();
gameLoop(lastTime);
