
const INITIAL_STATE = Object.freeze({
  lives: 3,
  level: 0,
  time: 30,
  questions: Object.freeze([]),
  answers: Object.freeze([
    {time: 5, isCorrect: true},
    {time: 10, isCorrect: true},
    {time: 15, isCorrect: true},
    {time: 25, isCorrect: true},
    {time: 30, isCorrect: true},
    {time: 5, isCorrect: true},
    {time: 10, isCorrect: false},
    {time: 15, isCorrect: false},
    {time: 25, isCorrect: false},
  ]),
  userName: ``
});

const DEFAULT_TIMER_VALUE = 30;
const FAST_TIME = 10;
const SLOW_TIME = 20;
const FAST_POINTS = 150;
const COMMON_POINTS = 100;
const SLOW_POINTS = 50;
const LIVE_POINTS = 50;

const addQuestions = (state, questions) => {
  return Object.freeze(Object.assign({}, state, {
    questions: Object.freeze([...questions])
  }));
};

const changeLevel = (state, level) => {
  if (typeof level !== `number`) {
    throw new Error(`Level should be of type number`);
  }
  if (level < 0) {
    throw new Error(`Level should not be negative`);
  }

  return Object.freeze(Object.assign({}, state, {
    'level': level
  }));
};

const setNextLevel = (state) => {
  return Object.freeze(Object.assign({}, state, {
    'level': state.level + 1
  }));
};

const hasNextLevel = (level, questions) => {
  return level < questions.length;
};

const isDead = (lives) => {
  return !(lives >= 0);
};

const decreaseLives = (state) => {
  return Object.freeze(Object.assign({}, state, {lives: state.lives - 1}));
};

const tickTimer = (state) => {
  return Object.freeze(Object.assign({}, state, {time: state.time - 1}));
};

const resetTimer = (state) => {
  return Object.freeze(Object.assign({}, state, {
    'time': DEFAULT_TIMER_VALUE
  }));
};

const countPoints = (state) => {
  if (state.lives >= 0 && state.answers.length >= 10) {
    let points = 0;
    state.answers.forEach((answer) => {
      if (answer.isCorrect) {
        if (answer.time <= FAST_TIME) {
          points += FAST_POINTS;
        }
        if (answer.time > SLOW_TIME) {
          points += SLOW_POINTS;
        }
        if (answer.time <= SLOW_TIME && answer.time > FAST_TIME) {
          points += COMMON_POINTS;
        }
      }
    });

    return points + (state.lives * LIVE_POINTS);
  }
  return -1;
};

const addAnswer = (state, answer) => {
  return Object.freeze(Object.assign({}, state, {answers: Object.freeze([...state.answers, answer])}));
};

export {INITIAL_STATE, addQuestions, changeLevel, setNextLevel, hasNextLevel, isDead, decreaseLives, tickTimer, resetTimer, countPoints, addAnswer};
