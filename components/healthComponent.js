export default class HealthComponent {
  constructor(maxHealth, healthObj) {
    this.maxHealth = maxHealth;
    this.healthObj = healthObj;
    this.oldCurrent = healthObj.old;
    this.loseLife = false;
    this.dead = false;
    this.gameOver = false;
  }

  removeHealth(dmg) {
    if (!this.dead) {
      this.healthObj.value -= dmg;
      this.healthObj.value = Math.max(0, this.healthObj.value);

      if (this.healthObj.value === 0) {
        console.log("you die");
      }
    }
    this.loseLife = true;
  }

  addHealth(hp) {
    this.healthObj.value += hp;
    this.healthObj.value = Math.min(this.maxHealth, this.healthObj.value);
  }

}