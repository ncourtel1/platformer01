import { lastTime } from "../main.js";

export default class TimerSystem {
  constructor(container, maxTime, player) {
    this.container = container;
    this.maxTime = maxTime;
    this.currTime = maxTime;
    this.isPaused = false;
    this.timer = null;
    this.darkeningThreshold = 7;
    this.player = player;
    this.lastDarkness = 0;
    this.targetDarkness = 0;
    this.transitionSpeed = 0.009; // Contrôle la vitesse de transition
    this.lastTime =  lastTime;

    const imgSize = 150;
    const xOffset = -150;
    const yOffset = -40;

    // Create darkening screen with radial gradient
    this.darkOverlay = document.createElement("div");
    this.darkOverlay.style.position = "fixed";
    this.darkOverlay.style.top = "0";
    this.darkOverlay.style.left = "0";
    this.darkOverlay.style.width = "100vw";
    this.darkOverlay.style.height = "100vh";
    this.darkOverlay.style.pointerEvents = "none";
    this.darkOverlay.style.zIndex = "1000";
    
    // Set initial radial gradient
    this.updateRadialGradient(0);
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
    this.gameOverText.style.transition = "all 0.7s ease";
    this.gameOverText.style.zIndex = "1001";
    this.gameOverText.style.display = "none";
    document.body.appendChild(this.gameOverText);

    // Create div for images
    this.imagesContainer = document.createElement("div");
    this.imagesContainer.style.marginLeft = `${xOffset}px`;
    this.imagesContainer.style.marginTop = `${yOffset}px`;
    this.imagesContainer.style.display = "flex";
    this.container.appendChild(this.imagesContainer);

    // Create bar images
    this.imageElement1 = document.createElement("img");
    this.imageElement1.src = "../assets/Wood and Paper UI/Sprites/Life Bars/Big Bars/2.png";
    this.imageElement1.style.width = `${imgSize-1}px`;
    this.imageElement1.style.zIndex = "1";
    this.imageElement1.style.imageRendering = "pixelated";
    this.imagesContainer.appendChild(this.imageElement1);

    this.imageElement3 = document.createElement("img");
    this.imageElement3.src = "../assets/Wood and Paper UI/Sprites/Life Bars/Big Bars/3.png";
    this.imageElement3.style.width = `${imgSize-2}px`;
    this.imageElement3.style.zIndex = "1";
    this.imageElement3.style.imageRendering = "pixelated";
    this.imagesContainer.appendChild(this.imageElement3);

    this.imageElement4 = document.createElement("img");
    this.imageElement4.src = "../assets/Wood and Paper UI/Sprites/Life Bars/Big Bars/4.png";
    this.imageElement4.style.width = `${imgSize}px`;
    this.imageElement4.style.zIndex = "1";
    this.imageElement4.style.imageRendering = "pixelated";
    this.imagesContainer.appendChild(this.imageElement4);

    // Create timer bar
    this.imageTimerBar = document.createElement("div");
    this.imageTimerBar.style.backgroundColor = "#f7ebb5";
    this.imageTimerBar.style.marginLeft = `${xOffset}px`;
    this.imageTimerBar.style.transition = "width 0.3s ease";
    this.imageTimerBar.style.position = "absolute";
    this.imageTimerBar.style.marginTop = `${yOffset}px`;
    this.imageTimerBar.style.zIndex = "2000";

    // Calculate dimensions relative to imgSize
    const heightRatio = 5 / 90;
    const topOffsetRatio = 40 / 90;
    const leftOffsetRatio = 48 / 90;

    // Apply relative dimensions
    this.imageTimerBar.style.height = `${imgSize * heightRatio + 1}px`;
    this.imageTimerBar.style.top = `${imgSize * topOffsetRatio - 1 + imgSize}px`;
    this.imageTimerBar.style.left = `${imgSize * leftOffsetRatio}px`;
    this.imagesContainer.appendChild(this.imageTimerBar);

    // Start the animation loop for continuous player position updates
    this.startAnimationLoop();
    this.startTimer();
    this.update();
  }

  updateRadialGradient(darkness) {
    if (!this.player) return;
    
    // Get player position and dimensions
    const visualComponent = this.player.getComponent('visual');
    const positionComponent = this.player.getComponent('position');

    // Calculate the center position of the player
    const playerCenterX = positionComponent.x + (visualComponent.width / 2);
    const playerCenterY = positionComponent.y + (visualComponent.height) - 30;

    // Calculate the radius based on remaining time
    const maxRadius = Math.max(window.innerWidth, window.innerHeight);
    const minRadius = 100; // Minimum visibility radius around player
    const radius = maxRadius - (maxRadius - minRadius) * darkness;

    if (darkness >= 1) {
      // Complete darkness when time is up
      this.darkOverlay.style.background = 'black';
    } else {
      // Create radial gradient with smooth transition to black
      const gradient = `radial-gradient(circle ${radius}px at ${playerCenterX}px ${playerCenterY}px, 
        transparent,
        rgba(0, 0, 0, ${darkness}) ${radius * 0.7}px,
        rgba(0, 0, 0, ${darkness}) ${radius}px)`;
      
      this.darkOverlay.style.background = gradient;
    }
  }

  startAnimationLoop() {
    const updatePosition = () => {
      if (this.currTime <= this.darkeningThreshold) {
        // Calculer la nouvelle valeur cible de l'obscurité
        this.targetDarkness = 1 - (this.currTime / this.darkeningThreshold);
        
        // Interpolation linéaire entre la dernière valeur et la valeur cible
        this.lastDarkness += (this.targetDarkness - this.lastDarkness) * this.transitionSpeed;
        
        // Mettre à jour le gradient avec la valeur interpolée
        this.updateRadialGradient(this.lastDarkness);
      }
      requestAnimationFrame(updatePosition);
    };
    requestAnimationFrame(updatePosition);
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
        this.update();
      }
    }, 1000);
  }

  pauseTimer() {
    this.isPaused = true;
    this.lastTime = 0;
  }

  resumeTimer() {
    this.isPaused = false;
    this.lastTime = performance.now();
  }

  toggleTimer() {
    if (this.isPaused) {
      this.resumeTimer();
    } else {
      this.pauseTimer();
    }
  }

  showGameOver() {
    this.targetDarkness = 1;
    this.gameOverText.style.display = "block";
    setTimeout(() => {
      this.gameOverText.style.opacity = "1";
    }, 500);
  }

  addTime(){
    this.currTime += (this.maxTime*(1/4))
  }

  update() {
    const healthRatio = this.currTime / this.maxTime;
    const imgSize = parseInt(this.imageElement1.style.width);
    const maxBarWidth = imgSize * 2.34;
    const healthBarWidth = maxBarWidth * healthRatio;
    this.imageTimerBar.style.width = `${healthBarWidth}px`;
  }
}