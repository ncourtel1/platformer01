export default class StateComponent{
   constructor(canCollide = true, tag = ""){
      this.isColliding = false;
      this.isGrounded = false;
      this.isJumping = false;
      this.canCollide = canCollide;
      this.tag = tag;
      this.canFinish = false;
   }
}