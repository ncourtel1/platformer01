export default class SpriteSystem {
    constructor(container) {
      this.container = container;
    }
  
    update(entities) {
      for (const entity of entities) {
        const position = entity.getComponent("position");
        const sprite = entity.getComponent("sprite");
        const visual = entity.getComponent("visual");
  
        if (position && sprite) {
            console.log(sprite.currentState);
          let entityElement = document.getElementById(entity.id);  
          if (!entityElement) {
            entityElement = document.createElement("div");
            entityElement.id = entity.id;
            entityElement.style.position = "absolute";
            this.container.appendChild(entityElement);
          }  
          const currentStateImages = sprite.getCurrentState();
          if (currentStateImages && currentStateImages.length > 0) {
            sprite.currentFrame += 0.1;
            const frameIndex = Math.floor(sprite.currentFrame) % currentStateImages.length;  
            entityElement.style.backgroundImage = `url(${currentStateImages[frameIndex].src})`;
            entityElement.style.backgroundSize = `${visual.width}px auto`;
            entityElement.style.transform = `translate(${position.x}px, ${position.y}px) ${
                sprite.flip ? "scaleX(-1)" : "scaleX(1)"
              }`;
          }
        }
      }
    }
  }
  