export default class ScoreSystem {
  constructor(player, timerSys) {
    this.player = player;
    this.timerSys = timerSys;
    this.baseScore = 1000;
    this.minScore = 0;
    this.healthBonus = 50;
  }

  update() {
    const maxTime = this.timerSys.maxTime;
    const currTime = this.timerSys.currTime.toFixed(3); 
    const healthComponent = this.player.getComponent("health");
    const currentHealth = healthComponent?.healthObj.value || 1;

    // Calcul du score basé sur le temps
    const timeUsedPercentage = (maxTime - currTime) / maxTime;
    let timeScore = this.baseScore - timeUsedPercentage * (this.baseScore - this.minScore);

    // Ajout du bonus de santé
    // La santé va de 1 à 3, donc le bonus sera de 50 à 150 points
    const healthBonus = currentHealth * this.healthBonus;
    
    // Score final = score basé sur le temps + bonus de santé
    const finalScore = timeScore + healthBonus;

    const scoreComponent = this.player.getComponent("score");
    if (scoreComponent) {
      scoreComponent.score = Math.round(finalScore);
    }
  }
}