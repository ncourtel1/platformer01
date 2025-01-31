export default class ProjectileComponent{
   constructor(projectile, fireRate){
      this.projectile = projectile;
      this.fireRate = fireRate;
      this.lastShotTime;
   }
}