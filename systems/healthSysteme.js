export default class HealthSystem {
    constructor(container, player) {
      this.container = container;
      this.player = player;
      
      // Créer un conteneur pour le texte et la barre de santé visuelle
      this.healthBarContainer = document.createElement("div");
      this.healthBarContainer.style.position = "absolute";
      this.healthBarContainer.style.top = "30px";  
      this.healthBarContainer.style.left = "10px"; 
      this.healthBarContainer.style.width = "200px";  
      this.container.appendChild(this.healthBarContainer);
  
      // Créer la barre de santé texte (centré au-dessus de la barre)
      this.healthBarText = document.createElement("div");
      this.healthBarText.style.position = "absolute";
      this.healthBarText.style.top = "-20px"; 
      this.healthBarText.style.left = "50%";  
      this.healthBarText.style.transform = "translateX(-50%)"; 
      this.healthBarText.style.color = "white";
      this.healthBarText.style.fontSize = "16px";
      this.healthBarContainer.appendChild(this.healthBarText);
  
      // Créer la barre de santé visuelle (rouge)
      this.healthBarVisual = document.createElement("div");
      this.healthBarVisual.style.height = "10px";  
      this.healthBarVisual.style.backgroundColor = "red";
      this.healthBarVisual.style.borderRadius = "5px"; 
      this.healthBarContainer.appendChild(this.healthBarVisual);
  
      // Mettre à jour les deux barres au démarrage
      this.update();
    }
  
    update() {
      let playerHealth = this.player.getComponent("health");
      
    
      this.healthBarText.textContent = `${playerHealth.currentHealth} / ${playerHealth.maxHealth}`;
      const maxBarWidth = 200; 
      let healthPercentage = (playerHealth.currentHealth / playerHealth.maxHealth);
      let newWidth = healthPercentage * maxBarWidth;
      this.healthBarVisual.style.width = `${newWidth}px`;
    }
  }
  