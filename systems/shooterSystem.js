import { ecs } from "../main.js";

export default class ShooterSystem{
   update(entities){
      for(const entity of entities){
         const projectile = entity.getComponent('projectile');
         const velocity = entity.getComponent('velocity');
         const position = entity.getComponent('position');
         const state = entity.getComponent('state');
         if(projectile){
            const position = entity.getComponent('position')
            const projectilePosition = projectile.projectile.getComponent('position')
            const projectileVelocity = projectile.projectile.getComponent('velocity')
            projectilePosition.x = position.x;
            projectilePosition.y = position.y;
            projectileVelocity.vx = -3;
            ecs.addEntity(projectile.projectile);
         }
         if (position && velocity && state.isProjectile) position.x += velocity.vx;
      }
   }
}