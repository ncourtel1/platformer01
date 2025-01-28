export default class TimerSystem {
  constructor(container, maxTime) {
    this.container = container;
    this.maxTime = maxTime;
    this.currTime = maxTime;
    this.isPaused = false;
    this.timer = null;
    this.darkeningThreshold = 30;

    const imgSize = 150;

    // Create darkening screen
    this.darkOverlay = document.createElement("div");
    this.darkOverlay.style.position = "fixed";
    this.darkOverlay.style.top = "0";
    this.darkOverlay.style.left = "0";
    this.darkOverlay.style.width = "100%";
    this.darkOverlay.style.height = "100%";
    this.darkOverlay.style.backgroundColor = "black";
    this.darkOverlay.style.opacity = "0";
    this.darkOverlay.style.transition = "opacity 0.1s ease";
    this.darkOverlay.style.pointerEvents = "none";
    this.darkOverlay.style.zIndex = "1000";
    document.body.appendChild(this.darkOverlay);

    // Create div for GameOver text
    this.gameOverText = document.createElement("div");
    this.gameOverText.textContent = "GAME OVER";
    this.gameOverText.style.position = "fixed";
    this.gameOverText.style.top = "50%";
    this.gameOverText.style.left = "50%";
    this.gameOverText.style.transform = "translate(-50%, -50%)";
    this.gameOverText.style.color = "red";
    this.gameOverText.style.fontSize = "64px";
    this.gameOverText.style.fontWeight = "bold";
    this.gameOverText.style.fontFamily = "Arial, sans-serif";
    this.gameOverText.style.textShadow = "2px 2px 4px rgba(0,0,0,0.5)";
    this.gameOverText.style.opacity = "0";
    this.gameOverText.style.transition = "opacity 0.5s ease";
    this.gameOverText.style.zIndex = "1001";
    this.gameOverText.style.display = "none";
    document.body.appendChild(this.gameOverText);

    // Create div for images
    this.imagesContainer = document.createElement("div");
    this.imagesContainer.style.display = "flex";
    this.container.appendChild(this.imagesContainer);

    // Créer les images de la barre (1.png, 3.png, 4.png)
    this.imageElement1 = document.createElement("img");
    this.imageElement1.src = "../assets/Wood and Paper UI/Sprites/Life Bars/Big Bars/2.png";
    this.imageElement1.style.width = `${imgSize}px`;
    this.imagesContainer.appendChild(this.imageElement1);

    this.imageElement3 = document.createElement("img");
    this.imageElement3.src = "../assets/Wood and Paper UI/Sprites/Life Bars/Big Bars/3.png";
    this.imageElement3.style.width = `${imgSize}px`;
    this.imagesContainer.appendChild(this.imageElement3);

    this.imageElement4 = document.createElement("img");
    this.imageElement4.src = "../assets/Wood and Paper UI/Sprites/Life Bars/Big Bars/4.png";
    this.imageElement4.style.width = `${imgSize}px`;
    this.imagesContainer.appendChild(this.imageElement4);

    // Créer l'image de la barre de vie
    this.imageTimerBar = document.createElement("div");
    this.imageTimerBar.style.backgroundColor = "#f7ebb5";
    this.imageTimerBar.style.transition = "width 0.3s ease";
    this.imageTimerBar.style.position = "absolute";

    // Calculer les dimensions relatives à imgSize
    const heightRatio = 5 / 90;
    const topOffsetRatio = 40 / 90;
    const leftOffsetRatio = 48 / 90;

    // Appliquer les dimensions relatives
    this.imageTimerBar.style.height = `${imgSize * heightRatio + 1}px`;
    this.imageTimerBar.style.top = `${imgSize * topOffsetRatio - 1 + imgSize}px`;
    this.imageTimerBar.style.left = `${imgSize * leftOffsetRatio}px`;
    this.imagesContainer.appendChild(this.imageTimerBar);

    this.startTimer();
    this.update();
  }

  startTimer() {
    this.timer = setInterval(() => {
      if (!this.isPaused) {
        this.currTime--;
        if (this.currTime <= 0) {
          this.currTime = 0;
          clearInterval(this.timer);
          this.showGameOver();
        }
        console.log(`time: ${this.currTime}s`);
        this.update();
      }
    }, 1000);
  }

  pauseTimer() {
    this.isPaused = true;
    console.log('Timer paused');
  }

  resumeTimer() {
    this.isPaused = false;
    console.log('Timer resumed');
  }

  toggleTimer() {
    if (this.isPaused) {
      this.resumeTimer();
    } else {
      this.pauseTimer();
    }
  }

  showGameOver() {
    this.darkOverlay.style.opacity = "1";
    this.gameOverText.style.display = "block";
    setTimeout(() => {
      this.gameOverText.style.opacity = "1";
    }, 500);
  }

  update() {
    const healthRatio = this.currTime / this.maxTime;
    const imgSize = parseInt(this.imageElement1.style.width);
    const maxBarWidth = imgSize * 2.34;
    const healthBarWidth = maxBarWidth * healthRatio;
    this.imageTimerBar.style.width = `${healthBarWidth}px`;

    // Gestion de l'assombrissement progressif
    if (this.currTime <= this.darkeningThreshold) {
      const darknessFactor = 1 - (this.currTime / this.darkeningThreshold);
      this.darkOverlay.style.opacity = darknessFactor.toString();
    }
  }
}