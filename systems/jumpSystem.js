export default class JumpSystem{
   update(entities, dt){
      for(const entity of entities){
         const position = entity.getComponent('position');
         const input = entity.getComponent('input');
         const velocity = entity.getComponent('velocity');
         const playerData = entity.getComponent('data');

         if(position && velocity && input.jumpPressed){
            velocity.vy = -playerData.jumpForce;
            input.jumpPressed = false
            position.y += velocity.vx * dt;
         }
      }
         
   }
}  