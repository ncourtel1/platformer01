import { ecs, lastTime, startGame } from "../main.js";

export default class TimerSystem {
  constructor(container, maxTime, player) {
    this.container = container;
    this.maxTime = maxTime;
    this.currTime = maxTime;
    this.lastFrameTime = performance.now();
    this.isPaused = false;
    this.animationFrameId = null;
    this.darkeningThreshold = 7;
    this.player = player;
    this.lastTime = lastTime;

    const imgSize = 150;
    const xOffset = -150;
    const yOffset = -40;

    this.imagesContainer = document.createElement("div");
    this.imagesContainer.style.marginLeft = `${xOffset}px`;
    this.imagesContainer.style.marginTop = `${yOffset}px`;
    this.imagesContainer.style.display = "flex";
    this.container.appendChild(this.imagesContainer);

    this.imageElement1 = document.createElement("img");
    this.imageElement1.src =
      "../assets/Wood and Paper UI/Sprites/Life Bars/Big Bars/2.png";
    this.imageElement1.style.width = `${imgSize}px`;
    this.imageElement1.style.zIndex = "1";
    this.imageElement1.style.imageRendering = "pixelated";
    this.imagesContainer.appendChild(this.imageElement1);

    this.imageElement3 = document.createElement("img");
    this.imageElement3.src =
      "../assets/Wood and Paper UI/Sprites/Life Bars/Big Bars/3.png";
    this.imageElement3.style.width = `${imgSize}px`;
    this.imageElement3.style.zIndex = "1";
    this.imageElement3.style.imageRendering = "pixelated";
    this.imagesContainer.appendChild(this.imageElement3);

    this.imageElement4 = document.createElement("img");
    this.imageElement4.src =
      "../assets/Wood and Paper UI/Sprites/Life Bars/Big Bars/4.png";
    this.imageElement4.style.width = `${imgSize}px`;
    this.imageElement4.style.zIndex = "1";
    this.imageElement4.style.imageRendering = "pixelated";
    this.imagesContainer.appendChild(this.imageElement4);

    this.imageTimerBar = document.createElement("div");
    this.imageTimerBar.style.backgroundColor = "#f7ebb5";
    this.imageTimerBar.style.marginLeft = `${xOffset}px`;
    this.imageTimerBar.style.transition = "width 0.3s ease";
    this.imageTimerBar.style.position = "absolute";
    this.imageTimerBar.style.marginTop = `${yOffset}px`;
    this.imageTimerBar.style.zIndex = "2000";

    const heightRatio = 5 / 90;
    const topOffsetRatio = 40 / 90;
    const leftOffsetRatio = 48 / 90;

    this.imageTimerBar.style.height = `${imgSize * heightRatio + 1}px`;
    this.imageTimerBar.style.top = `${
      imgSize * topOffsetRatio - 1 + imgSize
    }px`;
    this.imageTimerBar.style.left = `${imgSize * leftOffsetRatio}px`;
    this.imagesContainer.appendChild(this.imageTimerBar);

    this.startTimer();
    this.update();
  }

  startTimer() {
    const updateTimer = (currentTime) => {
      if (!this.isPaused) {
        const deltaTime = (currentTime - this.lastFrameTime) / 1000; // Convertir en secondes
        this.currTime = Math.max(0, this.currTime - deltaTime);

        if (this.currTime <= 0) {
          this.currTime = 0;

          this.showGameOver()
          return;
        }
        console.log(this.currTime.toFixed(3))
        this.update();
      }
      this.lastFrameTime = currentTime;
      this.animationFrameId = requestAnimationFrame(updateTimer);
    };

    this.animationFrameId = requestAnimationFrame(updateTimer);
  }

  pauseTimer() {
    this.isPaused = true;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  resumeTimer() {
    this.isPaused = false;
    this.lastFrameTime = performance.now();
    this.startTimer();
  }

  toggleTimer() {
    if (this.isPaused) {
      this.resumeTimer();
    } else {
      this.pauseTimer();
    }
  }

  showGameOver() {
    startGame("death");
  }

  addTime() {
    this.currTime += this.maxTime * (1 / 4);
  }

  update() {
    // Pour la barre visuelle, on utilise la valeur entière en secondes
    const visualSeconds = Math.floor(this.currTime);
    const healthRatio = visualSeconds / this.maxTime;

    const imgSize = parseInt(this.imageElement1.style.width);
    const maxBarWidth = imgSize * 2.34;
    const healthBarWidth = maxBarWidth * healthRatio;
    this.imageTimerBar.style.width = `${healthBarWidth}px`;
  }
}
