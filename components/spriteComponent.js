export default class SpriteComponent {
    constructor(states) {
      this.states = states;
      this.currentState = states.keys().next().value || null;
      this.currentFrame = 0;
      this.flip = false;
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
  