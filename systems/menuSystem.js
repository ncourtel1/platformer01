// MenuSystem.js
export default class MenuSystem {
  constructor(container, timerSys, player) {
    this.player = player;
    this.container = container;
    this.paused = false;
    this.timerSys = timerSys;
    this.menu = document.getElementById("start-menu");
    this.isIntermezzo = false;

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !this.isIntermezzo) {

        this.togglePause();
      }
    });
  }

  togglePause(gameOver) {
    this.paused = !this.paused;
    this.timerSys.toggleTimer();

    const game = document.getElementById("game");
    const gameContainer = document.getElementById("game-container");
    const title = document.getElementById("title");
    const playBtn = document.getElementById("playButton");
    const continueBtn = document.getElementById("continueButton");
    const continueText = document.getElementById("continueButton-Text") 
    const scoreComponent = this.player.getComponent("score");
    const restartBtn = document.getElementById("restartButton");

    if (this.isIntermezzo) {
      const gameHeight = game.offsetHeight;
      const gameContainerHeight = gameContainer.offsetHeight;

      this.menu.style.display = "flex";
      this.menu.style.justifyContent = "center";
      this.menu.style.alignItems = "center";
      this.menu.style.position = "fixed";
      this.menu.style.width = this.container.style.width;
      this.menu.style.height = this.container.style.height;
      this.menu.style.background = "none";
      this.menu.style.backdropFilter = `blur(10px)`;

      this.menu.style.top = `${-80}px`; // Aligner en haut du game
      this.menu.style.left = `${gameContainer.offsetLeft}px`; // Alignement gauche
      this.menu.style.width = `${game.offsetWidth}px`; // Largeur du jeu
      this.menu.style.height = `${gameHeight + gameContainerHeight}px`; // Hauteur totale combinée
      title.textContent = `Time ---- ${scoreComponent.score}`;
      restartBtn.style.display = "block";
      continueBtn.style.display = "block";
      continueText.textContent  = "Next Lvl"
      playBtn.style.display = "none";
    } else if (this.paused) {
      
      const gameHeight = game.offsetHeight;
      const gameContainerHeight = gameContainer.offsetHeight;

      this.menu.style.display = "flex";
      this.menu.style.justifyContent = "center";
      this.menu.style.alignItems = "center";
      this.menu.style.position = "fixed";
      this.menu.style.width = this.container.style.width;
      this.menu.style.height = this.container.style.height;
      this.menu.style.background = "none";
      this.menu.style.backdropFilter = `blur(10px)`;

      this.menu.style.top = `${-80}px`; // Aligner en haut du game
      this.menu.style.left = `${gameContainer.offsetLeft}px`; // Alignement gauche
      this.menu.style.width = `${game.offsetWidth}px`; // Largeur du jeu
      this.menu.style.height = `${gameHeight + gameContainerHeight}px`; // Hauteur totale combinée
      title.textContent = gameOver ? 'Game Over' : `Time ---- ${scoreComponent.score}`;
      restartBtn.style.display = "block";
      if (gameOver) restartBtn.style.marginTop = "300px";
      continueBtn.style.display = gameOver ? "none" : "block";
      continueText.textContent = "Play"
      playBtn.style.display = "none";
    } else {
      this.menu.style.display = "none";
    }
  }

  isPaused() {
    return this.paused;
  }

  update() {}
}
