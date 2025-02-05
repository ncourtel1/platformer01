export default class ScoreSystem {
  constructor(player, timerSys) {
    this.player = player;
    this.timerSys = timerSys;
    this.baseScore = 1000;
    this.minScore = 100;
  }

  update() {
    const maxTime = this.timerSys.maxTime;
    const currTime = this.timerSys.currTime; 

    const timeUsedPercentage = (maxTime - currTime) / maxTime;

    let score = this.baseScore - timeUsedPercentage * (this.baseScore - this.minScore);

    const scoreComponent = this.player.getComponent("score");
    if (scoreComponent) {
      scoreComponent.score = Math.round(score);
    }
  }
}
