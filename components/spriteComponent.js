export default class SpriteComponent {
    constructor(states, particleStates, offset, speed) {
      this.states = states;
      this.particleStates = particleStates
      this.currentState = states.keys().next().value || null;
      this.currentFrame = 0;
      this.flip = false;
      this.offset = offset || 0;
      this.speed = speed || 0.2;
    }
    setState(state) {
      if (this.currentState !== state) {
        this.currentState = state;
        this.currentFrame = 0;
      }
    }
    getCurrentState() {
      return this.states.get(this.currentState);
    }
  }
  