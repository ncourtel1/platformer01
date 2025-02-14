import { startGame } from "../main.js";

export default class HealthSystem {
  constructor(container, player) {
    this.container = container;
    this.player = player;
    const imgSize = 150; // Taille de base des images
    const xOffset = -150;

    // Créer une div pour contenir les images
    this.imagesContainer = document.createElement("div");
    this.imagesContainer.style.marginLeft = `${xOffset}px`;
    this.imagesContainer.style.marginTop = "-870px";
    this.imagesContainer.style.display = "flex";
    this.container.appendChild(this.imagesContainer);

    // Créer les images de la barre (1.png, 3.png, 4.png)
    this.imageElement1 = document.createElement("img");
    this.imageElement1.src =
      "../assets/Wood and Paper UI/Sprites/Life Bars/Big Bars/1.png";
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

    // Créer l'image de la barre de vie
    this.imageHealthBar = document.createElement("div");
    this.imageHealthBar.style.backgroundColor = "#db4848";
    this.imageHealthBar.style.transition = "width 0.3s ease";
    this.imageHealthBar.style.position = "absolute";
    this.imageHealthBar.style.marginLeft = `${xOffset}px`;
    this.imageHealthBar.style.zIndex = "10";

    // Calculer les dimensions relatives à imgSize
    const heightRatio = 5 / 90;
    const topOffsetRatio = 40 / 90;
    const leftOffsetRatio = 48 / 90;

    // Appliquer les dimensions relatives
    this.imageHealthBar.style.height = `${imgSize * heightRatio + 1}px`;
    this.imageHealthBar.style.top = `${imgSize * topOffsetRatio - 1}px`;
    this.imageHealthBar.style.left = `${imgSize * leftOffsetRatio}px`;
    this.imagesContainer.appendChild(this.imageHealthBar);

    // Mettre à jour les barres de santé au démarrage
    this.update();
  }

  update() {
    let playerHealth = this.player.getComponent("health");
    const healthRatio = playerHealth.healthObj.value / playerHealth.maxHealth;
    const maxBarWidth = 150 * 2.34;
    const healthBarWidth = maxBarWidth * healthRatio;
    this.imageHealthBar.style.width = `${healthBarWidth}px`;
    if (playerHealth.healthObj.value === 0 && !playerHealth.gameOver) {
      playerHealth.gameOver = true;
      startGame("death");
    }
  }
}
