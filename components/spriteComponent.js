export default class SpriteComponent {
  constructor(states, particleStates) {
    this.states = states;
    this.particleStates = particleStates;
    this.currentState = states.keys().next().value || null;
    this.currentFrame = 0;
    this.flip = false;

    this.lastRequestedState = this.currentState;
    this.stateRequestCount = 0;
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
