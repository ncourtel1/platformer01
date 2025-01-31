import { ecs } from "../main.js";

let count = 1

export default class ShooterSystem {
   update(entities) {
      for (const entity of entities) {
         const projectile = entity.getComponent('projectile');
         const velocity = entity.getComponent('velocity');
         const position = entity.getComponent('position');
         const state = entity.getComponent('state');
         if (projectile) {
            if (count !== 0) {
               const projectilePosition = projectile.projectile.getComponent('position')
               const projectileVelocity = projectile.projectile.getComponent('velocity')
               const projectileState = projectile.projectile.getComponent('state');
               projectileState.isColliding = false;
               projectilePosition.x = position.x;
               projectilePosition.y = position.y + 17;
               projectileVelocity.vx = -6;
               console.log(projectile)
               ecs.addEntity(projectile.projectile);
               count--;
            }
         }
         if (position && velocity && state.isProjectile) {
            if (state.isColliding) {
               ecs.removeEntity(entity);
               count = 1;
            }
            else position.x += velocity.vx;
         }
      }
   }
}