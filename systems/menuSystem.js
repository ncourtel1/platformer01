// MenuSystem.js
export default class MenuSystem {
  constructor(container, timerSys) {
    this.container = container;
    this.paused = false;
    this.timerSys = timerSys

    // Créer une div pour contenir les images
    this.imagesContainer = document.createElement("div");
    this.imagesContainer.style.position = "absolute"; // Changed from display to position
    this.imagesContainer.style.backgroundImage =
      "url('../assets/Wood and Paper UI/Sprites/board.png')"; // Added url()
    this.imagesContainer.style.display = "none";
    this.imagesContainer.style.height = "90px";
    this.imagesContainer.style.width = "90px"; // Changed from weight to width

    // Ajouter du texte "PAUSE" au menu
    const pauseText = document.createElement("div");
    pauseText.textContent = "PAUSE";
    pauseText.style.color = "white";
    pauseText.style.fontSize = "24px";
    pauseText.style.textAlign = "center";
    pauseText.style.paddingTop = "35px";

    this.imagesContainer.appendChild(pauseText);
    this.container.appendChild(this.imagesContainer);

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.togglePause();
      }
    });
  }

  togglePause() {
    this.paused = !this.paused;
    this.timerSys.toggleTimer()
    this.imagesContainer.style.display = this.paused ? "block" : "none";
  }

  isPaused() {
    return this.paused;
  }

  update() {}
}
