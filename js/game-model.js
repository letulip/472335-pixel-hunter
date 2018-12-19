import {INITIAL_STATE, addQuestions, changeLevel, addPlayerName, addAnswer, decreaseLives, setNextLevel, hasNextLevel, isDead, tickTimer, resetTimer} from './state.js';

const TIME_OVER = 0;

class GameModel {
  constructor(playerName, questions) {
    this.playerName = playerName;
    this._state = addPlayerName(INITIAL_STATE, this.playerName);
    this._state = addQuestions(this._state, questions);
  }

  get state() {
    return Object.freeze(this._state);
  }

  get time() {
    return this._state.time;
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
    this._state = INITIAL_STATE;
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
      return decreaseLives(this.resetTimer());
    }
    return this.resetTimer();
  }

  changeLevel() {
    changeLevel(this._state, this._state.level);
  }

  resetTimer() {
    return resetTimer(this._state);
  }

  isTimeOver() {
    return this._state.time === TIME_OVER;
  }

  tick() {
    this._state = tickTimer(this._state);
  }
}

export default GameModel;
