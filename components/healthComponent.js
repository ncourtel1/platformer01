export default class HealthComponent {
  constructor(player, health) {
    this.maxHealth = health;
    this.currentHealth = health;
    this.oldCurrent = health;
    this.player = player;
  }

  removeHealth(dmg) {
    this.currentHealth -= dmg;
    this.currentHealth = this.currentHealth < 0 ? 0 : this.currentHealth;

    if (this.currentHealth == 0) {
      const playerTags = this.player.getComponent("state");
      playerTags.dead = true;
    }
  }

  addHealth(hp) {
    this.currentHealth += hp
    this.currentHealth = this.currentHealth < this.maxHealth ? this.currentHealth : this.maxHealth
  }
}
