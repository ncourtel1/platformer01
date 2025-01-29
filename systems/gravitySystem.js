export default class GravitySystem{
   update(entities, dt){
      for(const entity of entities){
         const position = entity.getComponent('position');
         const state = entity.getComponent('state');
         const data = entity.getComponent('data');
         const velocity = entity.getComponent('velocity');

         if(position && state && data){

            velocity.vy += data.gravity * (data.mass * 3);
            if(state.isGrounded){
               velocity.vy = 0;
            }else{
               state.isGrounded = false;
            }

         }
      }
   }
}