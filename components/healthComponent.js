export default class HealthComponent {
  constructor(health) {
    this.maxHealth = health;
    this.currentHealth = health;
    this.oldCurrent = health;
    this.loseLife = false;
    this.dead = false;
    this.gameOver = false;
  }

  removeHealth(dmg) {
    if (!this.dead) {
      this.oldCurrent = this.currentHealth;
      this.currentHealth -= dmg;
      this.currentHealth = this.currentHealth < 0 ? 0 : this.currentHealth;

      if (this.currentHealth == 0) {
        console.log("you die");
      }
      
    }
    this.loseLife = true;
  }

  addHealth(hp) {
    this.currentHealth += hp
    this.currentHealth = this.currentHealth < this.maxHealth ? this.currentHealth : this.maxHealth
  }

}
