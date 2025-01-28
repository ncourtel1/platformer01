export default class TimerSystem {
  constructor(container, maxTime) {
    this.container = container;
    this.maxTime = maxTime
    this.currTime = maxTime

    const imgSize = 150;

    // Créer une div pour contenir les images
    this.imagesContainer = document.createElement("div");
    this.imagesContainer.style.display = "flex";
    this.container.appendChild(this.imagesContainer);

    // Créer les images de la barre (1.png, 3.png, 4.png)
    this.imageElement1 = document.createElement("img");
    this.imageElement1.src =
      "../assets/Wood and Paper UI/Sprites/Life Bars/Big Bars/2.png";
    this.imageElement1.style.width = `${imgSize}px`;
    this.imagesContainer.appendChild(this.imageElement1);

    this.imageElement3 = document.createElement("img");
    this.imageElement3.src =
      "../assets/Wood and Paper UI/Sprites/Life Bars/Big Bars/3.png";
    this.imageElement3.style.width = `${imgSize}px`;
    this.imagesContainer.appendChild(this.imageElement3);

    this.imageElement4 = document.createElement("img");
    this.imageElement4.src =
      "../assets/Wood and Paper UI/Sprites/Life Bars/Big Bars/4.png";
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

    let timer = setInterval(() => {
        this.currTime--
        if (this.currTime == 0) {
            
            clearInterval(timer)
            
        }
        console.log(`time: ${this.currTime}s`)
    }, 1000)

    {() => timer}
    this.update();
  }

  update() {
    const healthRatio = this.currTime / this.maxTime;
    const imgSize = parseInt(this.imageElement1.style.width);
    const maxBarWidth = imgSize * 2.34;
    const healthBarWidth = maxBarWidth * healthRatio;
    this.imageTimerBar.style.width = `${healthBarWidth}px`;
  }
}
