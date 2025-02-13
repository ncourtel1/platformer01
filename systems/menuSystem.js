import { current_level, ecs, levels } from "../main.js";

// MenuSystem.js
export default class MenuSystem {
  constructor(container, timerSys, player) {
    this.player = player;
    this.container = container;
    this.paused = false;
    this.timerSys = timerSys;
    this.menu = document.getElementById("start-menu");
    this.isIntermezzo = false;

    this.handleKeydown = (e) => {
      if (e.key === "Escape" && !this.isIntermezzo && current_level != levels.length-1) {
        this.togglePause();
      }
    };

    // Ajouter l'écouteur via le système ECS
    ecs.addEventListener(window, "keydown", this.handleKeydown);
  }

  togglePause(alreadyPaused = false) {
    this.paused = !this.paused;
    if (!alreadyPaused && !this.isIntermezzo) {
      this.timerSys.toggleTimer();
    }

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
      title.textContent = `Time ---- ${this.timerSys ? (Math.round((this.timerSys.maxTime - this.timerSys.currTime ) * 1000) / 1000).toFixed(3) : (Math.round(score.time  * 1000) / 1000).toFixed(3)}`;
      restartBtn.style.display = "block";
      continueBtn.style.display = "block";
      continueText.textContent  = "Next Lvl"
      playBtn.style.display = "none";
      ecs.removeEventListeners(['keydown', 'keyup', 'keypress'])
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
      title.textContent = `Time ---- ${this.timerSys ? (Math.round((this.timerSys.maxTime - this.timerSys.currTime ) * 1000) / 1000).toFixed(3) : (Math.round(score.time  * 1000) / 1000).toFixed(3)}`;
      restartBtn.style.display = "block";
    } else {
      this.menu.style.display = "none";
    }
  }

  isPaused() {
    return this.paused;
  }

  update() {}
}
