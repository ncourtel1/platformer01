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
                let entityElement = document.getElementById(entity.id);
                if (!entityElement) {
                    entityElement = document.createElement("div");
                    entityElement.id = entity.id;
                    entityElement.style.position = "absolute";
                    this.container.appendChild(entityElement);
                }
                const isTile = sprite.states.has('tile');
                const currentStateImages = sprite.getCurrentState();
                if (currentStateImages && currentStateImages.length > 0) {
                    sprite.currentFrame += sprite.speed;
                    const frameIndex = Math.floor(sprite.currentFrame + sprite.offset) % currentStateImages.length;
                    if (!isTile) {
                        entityElement.style.backgroundImage = `url(${currentStateImages[frameIndex].src})`;
                        entityElement.style.backgroundSize = `${visual.width}px auto`;
                        entityElement.style.transform = `translate(${position.x}px, ${position.y}px) ${sprite.flip ? "scaleX(-1)" : "scaleX(1)"}`;
                    } else {
                        if (currentStateImages && currentStateImages.length > 0) {
                            const yoffset = 955;
                            const zoom = 3.75;
                            const tileImage = currentStateImages[0];  // Première tile
                            entityElement.style.width = `${visual.width * zoom}px`;
                            entityElement.style.height = `${visual.height * zoom}px`;
                            entityElement.style.backgroundImage = `url(${tileImage.src})`;
                            entityElement.style.backgroundPosition = `-${sprite.sx * zoom}px -${sprite.sy * zoom}px`;
                            entityElement.style.backgroundSize = `${tileImage.naturalWidth * zoom}px ${tileImage.naturalHeight * zoom}px`;
                            entityElement.style.imageRendering = 'pixelated';
                            entityElement.style.transform = `translate(${position.x * zoom}px, ${position.y * zoom - yoffset}px)`;
                        }
                    }
                }
                // Particles
                if (sprite.particleStates) {
                    const particleStateImages = sprite.particleStates.get(sprite.currentState);
                    if (particleStateImages && particleStateImages.length > 0) {
                        let particleElement = document.getElementById(`${entity.id}-particles`);
                        if (!particleElement) {
                            particleElement = document.createElement("div");
                            particleElement.id = `${entity.id}-particles`;
                            particleElement.style.position = "absolute";
                            this.container.appendChild(particleElement);
                        }
                        const particleFrameIndex = Math.floor(sprite.currentFrame) % particleStateImages.length;
                        particleElement.style.backgroundImage = `url(${particleStateImages[particleFrameIndex].src})`;
                        particleElement.style.backgroundRepeat = 'no-repeat';
                        particleElement.style.width = `${particleStateImages[particleFrameIndex].width * 1.8}px`;
                        particleElement.style.height = `${particleStateImages[particleFrameIndex].height * 2}px`;
                        particleElement.style.transform = `translate(${position.x + (particleStateImages[particleFrameIndex].width / 1.8)}px, ${position.y + visual.height - (particleStateImages[particleFrameIndex].height * 2.2)}px) ${sprite.flip ? "scaleX(-1)" : "scaleX(1)"
                            }`;
                    }
                    else {
                        let particleElement = document.getElementById(`${entity.id}-particles`);
                        if (particleElement) particleElement.remove();
                    }
                }
            }
        }
    }
}
