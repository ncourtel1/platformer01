export default class StateComponent{
   constructor(canCollide = true, isProjectile = false){
      this.isColliding = false;
      this.isGrounded = false;
      this.isJumping = false;
      this.canCollide = canCollide;
      this.isProjectile = isProjectile;
   }
}