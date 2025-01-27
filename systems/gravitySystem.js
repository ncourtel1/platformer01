export default class GravitySystem{
   update(entities, dt){
      for(const entity of entities){
         const position = entity.getComponent('position');
         const state = entity.getComponent('state');
         const data = entity.getComponent('data')

         if(position && state && data){
            position.y += data.gravity;
            if(position.y >= 700){
               position.y = 700;
               state.isGrounded = true;
            }
            else state.isGrounded = false;
         }
      }
   }
}