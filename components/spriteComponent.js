export default class SpriteComponent {
  
    constructor(states, particleStates, offset, speed, sx, sy, flip = false) {
      this.states = states;
      this.particleStates = particleStates
      this.currentState = states.keys().next().value || null;
      this.currentFrame = 0;
      this.flip = flip;
      this.offset = offset || 0;
      this.speed = speed || 0.2;
      this.sx = sx || 0;
      this.sy = sy || 0;
      this.lastRequestedState = this.currentState;
      this.stateRequestCount = 0;
      this.isPoping = true;
    }
    setState(state) {
      const currentTime = Date.now();
  
      if (this.lastRequestedState === state) {
        this.stateRequestCount++;
      } else {
        this.lastRequestedState = state;
        this.stateRequestCount = 1;
      }
  
      if (
        this.stateRequestCount >= 2 &&
        this.currentState !== state 
      ) {
        this.currentState = state;
        this.currentFrame = 0;
        this.stateRequestCount = 0;
    }
  }

  getCurrentState() {
    return this.states.get(this.currentState);
  }
}
