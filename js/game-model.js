import {INITIAL_STATE, addQuestions, changeLevel, addPlayerName, addAnswer, decreaseLives, setNextLevel, hasNextLevel, isDead, tickTimer, resetTimer} from './state.js';

const TIME_OVER = 0;

class GameModel {
  constructor(playerName, questions) {
    this._playerName = playerName;
    this._state = addPlayerName(INITIAL_STATE, this._playerName);
    this._state = addQuestions(this._state, questions);
  }

  get state() {
    return Object.freeze(this._state);
  }

  get time() {
    return this._state.time;
  }

  getQuestion() {
    return this._state.questions[this._state.level];
  }

  getAnswers() {
    return this._state.answers;
  }

  getLives() {
    return this._state.lives;
  }

  hasNextLevel() {
    return hasNextLevel(this._state.level, this._state.questions);
  }

  setNextLevel(timerValue, isCorrect) {
    this._state = setNextLevel(this.addAnswer(timerValue, isCorrect));
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
