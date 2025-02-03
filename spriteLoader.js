/**
 * @file spriteLoader.js
 * 
 * @brief This file is loading every sprites and preparing every
 *        animation with different states.
 */


/**
 * @exports playerAnimation export player animation with
 *                          idle, run, jump & fall states.
 * @exports playerParticle
 */
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

export const playerAnimation = new Map();
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

export const playerParticle = new Map();
playerParticle.set('run', playerParticleRunImages)
//playerParticle.set('jump', playerParticleJumpImages)


/**
 * @brief export sprites and animations of decorative background assets.
 * @exports backgroundPalmTrees
 * @exports backgroundWaterReflects
 */
const backPalmTree1 = new Image();
backPalmTree1.src = "assets/Palm Tree Island/Sprites/Back Palm Trees/Back Palm Tree Regular 01.png";
const backPalmTree2 = new Image();
backPalmTree2.src = "assets/Palm Tree Island/Sprites/Back Palm Trees/Back Palm Tree Regular 02.png";
const backPalmTree3 = new Image();
backPalmTree3.src = "assets/Palm Tree Island/Sprites/Back Palm Trees/Back Palm Tree Regular 03.png";
const backPalmTree4 = new Image();
backPalmTree4.src = "assets/Palm Tree Island/Sprites/Back Palm Trees/Back Palm Tree Regular 04.png";

const backPalmTrees = [backPalmTree1, backPalmTree2, backPalmTree3, backPalmTree4]

export const backgroundPalmTrees = new Map();
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

export const backgroundWaterReflects = new Map();
backgroundWaterReflects.set('big', waterReflects)


/**
 * @brief exports projectile and shooter sprites and animations
 * @exports canonBallProjectile
 * @exports canonFireAnim
 */
const canonBall = new Image();
canonBall.src = "assets/Shooter Traps/Sprites/Cannon/Cannon Ball Idle/1.png";

const canonBallExplosion1 = new Image();
canonBallExplosion1.src = "assets/Shooter Traps/Sprites/Cannon/Cannon Ball Explosion/1.png";
const canonBallExplosion2 = new Image();
canonBallExplosion2.src = "assets/Shooter Traps/Sprites/Cannon/Cannon Ball Explosion/2.png";
const canonBallExplosion3 = new Image();
canonBallExplosion3.src = "assets/Shooter Traps/Sprites/Cannon/Cannon Ball Explosion/3.png";
const canonBallExplosion4 = new Image();
canonBallExplosion4.src = "assets/Shooter Traps/Sprites/Cannon/Cannon Ball Explosion/4.png";
const canonBallExplosion5 = new Image();
canonBallExplosion5.src = "assets/Shooter Traps/Sprites/Cannon/Cannon Ball Explosion/5.png";
const canonBallExplosion6 = new Image();
canonBallExplosion6.src = "assets/Shooter Traps/Sprites/Cannon/Cannon Ball Explosion/6.png";
const canonBallExplosion7 = new Image();
canonBallExplosion7.src = "assets/Shooter Traps/Sprites/Cannon/Cannon Ball Explosion/7.png";

const canonBallExplosionAnim = [canonBallExplosion1, canonBallExplosion2, canonBallExplosion3, canonBallExplosion4, canonBallExplosion5, canonBallExplosion6, canonBallExplosion7];

export const canonBallProjectile = new Map();
canonBallProjectile.set('projectile', [canonBall]);
canonBallProjectile.set('explosion', canonBallExplosionAnim);

const canonIdle1 = new Image();
canonIdle1.src = "assets/Shooter Traps/Sprites/Cannon/Cannon Idle/1.png";

const canonFire1 = new Image();
canonFire1.src = "assets/Shooter Traps/Sprites/Cannon/Cannon Fire/1.png";
const canonFire2 = new Image();
canonFire2.src = "assets/Shooter Traps/Sprites/Cannon/Cannon Fire/2.png";
const canonFire3 = new Image();
canonFire3.src = "assets/Shooter Traps/Sprites/Cannon/Cannon Fire/3.png";
const canonFire4 = new Image();
canonFire4.src = "assets/Shooter Traps/Sprites/Cannon/Cannon Fire/4.png";
const canonFire5 = new Image();
canonFire5.src = "assets/Shooter Traps/Sprites/Cannon/Cannon Fire/5.png";
const canonFire6 = new Image();
canonFire6.src = "assets/Shooter Traps/Sprites/Cannon/Cannon Fire/6.png";

const canonFires = [canonFire1, canonFire2, canonFire3, canonFire4, canonFire5, canonFire6];

export const canonFireAnim = new Map();
canonFireAnim.set('idle', [canonIdle1]);
canonFireAnim.set('fire', canonFires);

/**
 * @brief exports spikes
 * @exports spikeSprite
 */
const spike = new Image();
spike.src = "assets/Palm Tree Island/Sprites/Objects/Spikes/Spikes.png";

export const spikeSprite = new Map();
spikeSprite.set('spike', [spike]);

/**
 * @brief character sprites and animations alternative
 *
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