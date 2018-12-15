import {INITIAL_STATE_WITH_QUESTIONS, changeLevel, addPlayerName, addAnswer, decreaseLives, setNextLevel, hasNextLevel, isDead, tickTimer, resetTimer} from './state.js';

const TIME_OVER = 0;

class GameModel {
  constructor(playerName) {
    this.playerName = playerName;
    this._state = addPlayerName(INITIAL_STATE_WITH_QUESTIONS, this.playerName);
  }

  get state() {
    return Object.freeze(this._state);
  }

  getQuestion() {
    return this.state.questions[this.state.level];
  }

  getAnswers() {
    return this.state.answers;
  }

  getCorrectAnsers() {
    return this.state.correctAnswers;
  }

  getLives() {
    return this.state.lives;
  }

  getLevel() {
    return this.state.level;
  }

  hasNextLevel() {
    return hasNextLevel(this._state.level, this._state.questions);
  }

  setNextLevel(timerValue, isCorrect) {
    this._state = setNextLevel(this.addAnswer(timerValue, isCorrect));
  }

  restart() {
    this._state = INITIAL_STATE_WITH_QUESTIONS;
    return this._state;
  }

  isDead() {
    return isDead(this._state.lives);
  }

  addAnswer(timerValue, isCorrect) {
    return addAnswer(this.decreaseStateLives(isCorrect), {time: timerValue, isCorrect});
  }

  decreaseStateLives(answer) {
    if (!answer) {
      return decreaseLives(this._state);
    }
    return this._state;
  }

  changeLevel() {
    changeLevel(this._state, this._state.level);
  }

  resetTimer() {
    this._state = resetTimer(this._state);
    return this._state;
  }

  isTimeOver() {
    return this._state.time === TIME_OVER;
  }

  tick() {
    this._state = tickTimer(this._state);
    return this._state.time;
  }
}

export default GameModel;
