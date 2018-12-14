import {INITIAL_STATE_WITH_QUESTIONS, changeLevel, setNextLevel, hasNextLevel, isDead, tickTimer} from './state.js';

class GameModel {
  constructor(playerName) {
    this.playerName = playerName;
    this._state = INITIAL_STATE_WITH_QUESTIONS;
  }

  get state() {
    return Object.freeze(this._state);
  }

  hasNextLevel() {
    hasNextLevel(this._state);
  }

  setNextLevel(state) {
    this._state = setNextLevel(state);
  }

  restart() {
    this._state = INITIAL_STATE_WITH_QUESTIONS;
  }

  isDead() {
    isDead(this._state.lives);
  }

  changeLevel() {
    changeLevel(this._state, this._state.level);
  }

  tick(state) {
    this._state = tickTimer(state);
  }
}

export default GameModel;
