import StateModel from './state-model.js';
import StateController from './state-controller.js';

class GameModel {
  constructor(playerName) {
    this.playerName = playerName;
    this.restart();
  }

  get state() {
    return Object.freeze(this._state);
  }

  hasNextLevel() {
    StateController.hasNextLevel(this._state);
  }

  setNextLevel(state) {
    this._state = StateController.setNextLevel(state);
  }

  restart() {
    this._state = StateModel.initialStateWithQuestions();
  }

  isDead() {
    StateController.isDead(this._state.lives);
  }

  changeLevel() {
    StateController.changeLevel(this._state, this._state.level);
  }

  tick(state) {
    this._state = StateController.tickTimer(state);
  }
}

export default GameModel;
