export default class HealthComponent {
  constructor(health) {
    this.maxHealth = health;
    this.currentHealth = health;
    this.oldCurrent = health;
  }
}
