
const INITIAL_STATE = Object.freeze({
  lives: 3,
  level: 0,
  time: 30,
  questions: Object.freeze([]),
  answers: Object.freeze([]),
  userName: ``
});

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
  return lives >= 0;
};

const livesChange = (state) => {
  return Object.freeze(Object.assign({}, state, {lives: state.lives - 1}));
};

const DEFAULT_TIMER_VALUE = 30;

const timerTick = (state) => {
  return Object.freeze(Object.assign({}, state, {time: state.time - 1}));
};

const resetTimer = (state) => {
  return Object.freeze(Object.assign({}, state, {
    'time': DEFAULT_TIMER_VALUE
  }));
};

const fastTime = 10;
const slowTime = 20;
const fastPoints = 150;
const commonPoints = 100;
const slowPoints = 50;

const countPoints = (answers) => {
  let points = 0;
  for (let i = 0; i < answers.length; i++) {
    if (answers[i].isCorrect) {
      if (answers[i].time <= fastTime) {
        points += fastPoints;
      }
      if (answers[i].time > slowTime) {
        points += slowPoints;
      }
      if (answers[i].time < slowTime && answers[i].time > fastTime) {
        points += commonPoints;
      }
    } else {
      points = `FAIL!!!`;
    }
  }
  return points;
};

const addAnswer = (state, answer) => {
  return Object.freeze(Object.assign({}, state, {answers: Object.freeze([...state.answers, answer])}));
};

export {INITIAL_STATE, addQuestions, changeLevel, setNextLevel, hasNextLevel, isDead, livesChange, timerTick, resetTimer, countPoints, addAnswer};
