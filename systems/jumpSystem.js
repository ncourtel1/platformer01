export default class JumpSystem{
   update(entities, dt){
      for(const entity of entities){
         const position = entity.getComponent('position');
         const input = entity.getComponent('input');
         const velocity = entity.getComponent('velocity');
         const playerData = entity.getComponent('data');
         const state = entity.getComponent('state');

         if(position && velocity && input.jumpPressed){
            input.jumpPressed = false;
            if(state.isGrounded){
               input.update();
               console.log("jump")
               position.y -= playerData.jumpForce;
               console.log(position.y);
               state.isGrounded = false;
            }  
         }
      }
         
   }
}  