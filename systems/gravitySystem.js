export default class GravitySystem{
   update(entities, dt){
      for(const entity of entities){
         const position = entity.getComponent('position');
         const state = entity.getComponent('state');
         const data = entity.getComponent('data');
         const velocity = entity.getComponent('velocity');

         if(position && state && data){

            velocity.vy += data.gravity * (data.mass * 3);
            if(position.y >= 700){
               position.y = 700;
               velocity.vy = 0;
               console.log("bounce");
               state.isGrounded = true;
            }
            else state.isGrounded = false;
         }
      }
   }
}