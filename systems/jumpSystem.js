let jumpCounter = 0;

export default class JumpSystem {
   update(entities, dt) {
      for (const entity of entities) {
         const position = entity.getComponent('position');
         const input = entity.getComponent('input');
         const velocity = entity.getComponent('velocity');
         const playerData = entity.getComponent('data');
         const state = entity.getComponent('state');
         const animation = entity.getComponent('sprite');

         if (position && velocity && state && playerData) {
            input.update();
            if (!input.jumpPressed) {
               state.canJump = true;
            }
            if (input.jumpPressed && state.isGrounded && state.canJump && !state.isJumping) {
               state.isJumping = true;
               state.isGrounded = false;
               state.canJump = false;
               jumpCounter = 0;
               animation.setState('jump');
            }
            if (state.isJumping && input.jumpPressed && jumpCounter < playerData.maxHeight) {
               position.y += -playerData.jumpForce / playerData.mass;
               jumpCounter++;
               animation.setState('jump');
            } else {
               state.isJumping = false;
            }
            if (!state.isGrounded) {
               position.y += velocity.vy * dt;
               if (!state.isJumping) {
                  animation.setState("fall");
                }
            }
            if (state.isGrounded) {
               state.isJumping = false;
            }
         }
      }
   }
}
