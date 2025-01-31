export default class StateComponent{
   constructor(canCollide = true, isProjectile = false, tag = ""){
      this.isColliding = false;
      this.isGrounded = false;
      this.isJumping = false;
      this.canCollide = canCollide;
      this.isProjectile = isProjectile;
      this.hasActiveProjectile = false;
      this.tag = tag;
      this.canFinish = false;
   }
}