
const INITIAL_STATE = Object.freeze({
  lives: 3,
  level: 0,
  time: 30,
  questions: Object.freeze([]),
  answers: Object.freeze([]),
  userName: ``
});

const VALUES = {
  DEFAULT_TIMER_VALUE: 30,
  FAST_TIME: 20,
  SLOW_TIME: 10,
  BONUS_POINTS: 50,
  COMMON_POINTS: 100,
  LIVE_POINTS: 50,
};

const addQuestions = (state, questions) => {
  return Object.freeze(Object.assign({}, state, {
    questions: Object.freeze([...questions])
  }));
};

const addPlayerName = (state, name) => {
  return Object.freeze(Object.assign({}, state, {
    userName: name
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
  return (lives < 0);
};

const decreaseLives = (state) => {
  return Object.freeze(Object.assign({}, state, {lives: state.lives - 1}));
};

const tickTimer = (state) => {
  return Object.freeze(Object.assign({}, state, {time: state.time - 1}));
};

const resetTimer = (state) => {
  return Object.freeze(Object.assign({}, state, {
    time: VALUES.DEFAULT_TIMER_VALUE
  }));
};

const countPoints = (answers, lives) => {
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
        totalPoints.points += VALUES.COMMON_POINTS;
        if (answer.time >= VALUES.FAST_TIME) {
          totalPoints.points += VALUES.BONUS_POINTS;
          totalPoints.fastAnswers += 1;
        }
        if (answer.time < VALUES.SLOW_TIME) {
          totalPoints.points -= VALUES.BONUS_POINTS;
          totalPoints.slowAnswers += 1;
        }
      }
    });
    totalPoints.points += lives * VALUES.LIVE_POINTS;

    return totalPoints;
  }
  return -1;
};

const addAnswer = (state, answer) => {
  return Object.freeze(Object.assign({}, state, {answers: Object.freeze([...state.answers, answer])}));
};

export {INITIAL_STATE, addQuestions, addPlayerName, changeLevel, setNextLevel, hasNextLevel, isDead, decreaseLives, tickTimer, resetTimer, countPoints, addAnswer};
