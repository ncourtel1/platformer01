export default class SpriteComponent {
    constructor(images, states) {
      this.images = images;
      this.states = states;
      this.currentState = null;
      this.currentFrame = 0;
    }
    setState(state) {
      if (this.currentState !== state) {
        this.currentState = state;
        this.currentFrame = 0;
      }
    }  
    getCurrentState() {
      return this.states[this.currentState];
    }
  }
  