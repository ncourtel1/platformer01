export default class RunSystem {
   // Basic player horizontal movements
   update(entities, dt) {
      for (const entity of entities) {
         const position = entity.getComponent('position');
         const velocity = entity.getComponent('velocity');
         const input = entity.getComponent('input');
         const playerData = entity.getComponent('data');
         if (position && velocity) {
            input.update();
            const acceleration = (input.x * playerData.x_acceleration) / playerData.mass;
            velocity.vx += acceleration * dt;
            if (input.x === 0 || Math.sign(input.x) !== Math.sign(velocity.vx)) {
               const brakingForce = playerData.braking_force * dt;
               if (velocity.vx > 0) {
                  velocity.vx -= brakingForce;
                  if (velocity.vx < 0) velocity.vx = 0;
               } else if (velocity.vx < 0) {
                  velocity.vx += brakingForce;
                  if (velocity.vx > 0) velocity.vx = 0;
               }
            }
            if (velocity.vx > playerData.x_max_speed) velocity.vx = playerData.x_max_speed;
            else if (velocity.vx < -playerData.x_max_speed) velocity.vx = -playerData.x_max_speed;
            position.x += velocity.vx * dt;
         }
      }
   }
}
