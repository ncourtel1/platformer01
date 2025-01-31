import { ecs } from "../main.js";

export default class ShooterSystem {
   update(entities) {
      const currentTime = Date.now();

      for (const entity of entities) {
         const projectileComp = entity.getComponent('projectile');
         const velocity = entity.getComponent('velocity');
         const position = entity.getComponent('position');
         const state = entity.getComponent('state');
         const sprite = entity.getComponent('sprite');
         console.log(sprite.currentState.length);
         if (sprite.currentState === 'fire' && Math.round(sprite.currentFrame) === sprite.currentState.length && projectileComp) {
            sprite.setState('idle');
            sprite.setState('idle');
         }

         if (projectileComp) {
            if (!projectileComp.lastShotTime) {
               projectileComp.lastShotTime = 0;
            }

            if (!projectileComp.hasActiveProjectile && (currentTime - projectileComp.lastShotTime >= projectileComp.fireRate)) {
               const projectile = projectileComp.projectile;
               const projectilePosition = projectile.getComponent('position');
               const projectileVelocity = projectile.getComponent('velocity');
               const projectileState = projectile.getComponent('state');
               projectile.shooter = entity;

               projectileState.isColliding = false;
               projectilePosition.x = position.x + 17;
               projectilePosition.y = position.y + 17;
               projectileVelocity.vx = -6;

               ecs.addEntity(projectile);
               sprite.setState('fire');
               sprite.setState('fire');

               projectileComp.hasActiveProjectile = true;
               projectileComp.lastShotTime = currentTime;
            }
         }

         if (position && velocity && state.isProjectile) {
            if (state.isColliding) {
               ecs.removeEntity(entity);
               if (entity.shooter) {
                  const shooterProjectileComp = entity.shooter.getComponent('projectile');
                  if (shooterProjectileComp) shooterProjectileComp.hasActiveProjectile = false;
               }
            } else {
               position.x += velocity.vx;
            }
         }
      }
   }
}
