export default class AnimationSystem {
    update(entities, dt) {
      for (const entity of entities) {
        const sprite = entity.getComponent('sprite');
        if (!sprite || !sprite.currentState) continue;
        const state = sprite.getCurrentState();
        if (!state) continue;  
        sprite.timeAccumulator += dt;  
        const frameDuration = 1 / state.frameRate;
        if (sprite.timeAccumulator >= frameDuration) {
          sprite.currentFrame = (sprite.currentFrame + 1) % state.frames.length;
          sprite.timeAccumulator -= frameDuration;
        }
      }
    }
  }
  