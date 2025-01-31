export default class StateComponent{
   constructor(canCollide = true){
      this.isColliding = false;
      this.isGrounded = false;
      this.isJumping = false;
      this.canCollide = canCollide;
      this.dead = false;
   }
}