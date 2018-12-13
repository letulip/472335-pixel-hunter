const DEFAULT_TIMER_VALUE = 30;
const FAST_TIME = 20;
const SLOW_TIME = 10;
const BONUS_POINTS = 50;
const COMMON_POINTS = 100;
const LIVE_POINTS = 50;
const ONE_SECOND = 1000;
let timer;

class StateController {
  static addQuestions(state, questions) {
    return Object.freeze(Object.assign({}, state, {
      questions: Object.freeze([...questions])
    }));
  }

  static addPlayerName(state, name) {
    return Object.freeze(Object.assign({}, state, {
      userName: name
    }));
  }

  static changeLevel(state, level) {
    if (typeof level !== `number`) {
      throw new Error(`Level should be of type number`);
    }
    if (level < 0) {
      throw new Error(`Level should not be negative`);
    }

    return Object.freeze(Object.assign({}, state, {
      'level': level
    }));
  }

  static setNextLevel(state) {
    return Object.freeze(Object.assign({}, state, {
      'level': state.level + 1
    }));
  }

  static hasNextLevel(level, questions) {
    return level < questions.length;
  }

  static isDead(lives) {
    return (lives < 0);
  }

  static decreaseLives(state) {
    return Object.freeze(Object.assign({}, state, {lives: state.lives - 1}));
  }

  static tickTimer(state) {
    return Object.freeze(Object.assign({}, state, {time: state.time - 1}));
  }

  static startTimer(state, cb) {
    timer = setTimeout(() => {
      StateController.startTimer(cb(StateController.tickTimer(state)), cb);
    }, ONE_SECOND);
  }

  static stopTimer(state) {
    clearTimeout(timer);
    return state;
  }

  static resetTimer(state) {
    return Object.freeze(Object.assign({}, state, {
      'time': DEFAULT_TIMER_VALUE
    }));
  }

  static countPoints(answers, lives) {
    const totalPoints = {
      points: 0,
      correctAnswers: 0,
      fastAnswers: 0,
      slowAnswers: 0
    };
    if (lives >= 0 && answers.length >= 10) {
      answers.forEach((answer) => {
        if (answer.isCorrect) {
          totalPoints.correctAnswers += 1;
          totalPoints.points += COMMON_POINTS;
          if (answer.time >= FAST_TIME) {
            totalPoints.points += BONUS_POINTS;
            totalPoints.fastAnswers += 1;
          }
          if (answer.time < SLOW_TIME) {
            totalPoints.points -= BONUS_POINTS;
            totalPoints.slowAnswers += 1;
          }
        }
      });
      totalPoints.points += lives * LIVE_POINTS;

      return totalPoints;
    } else {
      return -1;
    }
  }

  static addAnswer(state, answer) {
    return Object.freeze(Object.assign({}, state, {answers: Object.freeze([...state.answers, answer])}));
  }
}

export default StateController;
