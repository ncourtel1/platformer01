export default class SpriteSystem {
    constructor(container) {
      this.container = container; // Conteneur où les entités visuelles seront ajoutées
    }
  
    update(entities) {
      for (const entity of entities) {
        const position = entity.getComponent("position");
        const sprite = entity.getComponent("sprite");
        const visual = entity.getComponent('visual');
  
        if (position && sprite) {
          let entityElement = document.getElementById(entity.id);
  
          // Créer l'élément si nécessaire
          if (!entityElement) {
            entityElement = document.createElement("div");
            entityElement.id = entity.id;
            entityElement.style.position = "absolute";
            this.container.appendChild(entityElement);
          }
          sprite.currentFrame+= 0.2;
          // Obtenir les informations de l'état et de la frame courante
          //const state = sprite.getCurrentState();
          //if (!state) continue;
          //const frame = state.frames[sprite.currentFrame];
          //const frameWidth = state.frameWidth;
          //const frameHeight = state.frameHeight;
  
          // Mettre à jour les styles pour refléter le sprite actuel
          entityElement.style.backgroundImage = `url(${sprite.images[Math.round(sprite.currentFrame) % sprite.images.length].src})`;
          entityElement.style.backgroundSize = `${visual.width}px auto`;
        }
      }
    }
  }
  