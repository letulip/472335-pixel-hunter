
const INITIAL_STATE = Object.freeze({
  lives: 3,
  level: 0,
  time: 30,
  questions: Object.freeze([]),
  answers: Object.freeze([]),
  userName: ``
});

const QUESTIONS = [
  {
    title: `Угадай, фото или рисунок?`,
    type: `single`,
    options: [
      {src: `https://k42.kn3.net/D2F0370D6.jpg`, type: `paint`}
    ]
  },
  {
    title: `Угадайте для каждого изображения фото или рисунок?`,
    type: `double`,
    options: [
      {src: `https://k42.kn3.net/CF42609C8.jpg`, type: `paint`},
      {src: `http://i.imgur.com/1KegWPz.jpg`, type: `photo`}
    ]
  },
  {
    title: `Найдите рисунок среди изображений`,
    type: `triple`,
    options: [
      {src: `https://i.imgur.com/DiHM5Zb.jpg`, type: `photo`},
      {src: `https://k32.kn3.net/5C7060EC5.jpg`, type: `paint`},
      {src: `http://i.imgur.com/DKR1HtB.jpg`, type: `photo`}
    ]
  },
  {
    title: `Угадай, фото или рисунок?`,
    type: `single`,
    options: [
      {src: `https://k42.kn3.net/D2F0370D6.jpg`, type: `paint`}
    ]
  },
  {
    title: `Угадайте для каждого изображения фото или рисунок?`,
    type: `double`,
    options: [
      {src: `https://k42.kn3.net/CF42609C8.jpg`, type: `paint`},
      {src: `http://i.imgur.com/1KegWPz.jpg`, type: `photo`}
    ]
  },
  {
    title: `Найдите рисунок среди изображений`,
    type: `triple`,
    options: [
      {src: `https://i.imgur.com/DiHM5Zb.jpg`, type: `photo`},
      {src: `https://k32.kn3.net/5C7060EC5.jpg`, type: `paint`},
      {src: `http://i.imgur.com/DKR1HtB.jpg`, type: `photo`}
    ]
  },
  {
    title: `Угадай, фото или рисунок?`,
    type: `single`,
    options: [
      {src: `https://k42.kn3.net/D2F0370D6.jpg`, type: `paint`}
    ]
  },
  {
    title: `Угадайте для каждого изображения фото или рисунок?`,
    type: `double`,
    options: [
      {src: `https://k42.kn3.net/CF42609C8.jpg`, type: `paint`},
      {src: `http://i.imgur.com/1KegWPz.jpg`, type: `photo`}
    ]
  },
  {
    title: `Найдите рисунок среди изображений`,
    type: `triple`,
    options: [
      {src: `https://i.imgur.com/DiHM5Zb.jpg`, type: `photo`},
      {src: `https://k32.kn3.net/5C7060EC5.jpg`, type: `paint`},
      {src: `http://i.imgur.com/DKR1HtB.jpg`, type: `photo`}
    ]
  },
  {
    title: `Угадай, фото или рисунок?`,
    type: `single`,
    options: [
      {src: `https://k42.kn3.net/D2F0370D6.jpg`, type: `paint`}
    ]
  },
];

const DEFAULT_TIMER_VALUE = 30;
const FAST_TIME = 20;
const SLOW_TIME = 10;
const BONUS_POINTS = 50;
const COMMON_POINTS = 100;
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
    'time': DEFAULT_TIMER_VALUE
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
};

const addAnswer = (state, answer) => {
  return Object.freeze(Object.assign({}, state, {answers: Object.freeze([...state.answers, answer])}));
};

const INITIAL_STATE_WITH_QUESTIONS = addQuestions(INITIAL_STATE, QUESTIONS);

export {INITIAL_STATE, INITIAL_STATE_WITH_QUESTIONS, addQuestions, changeLevel, setNextLevel, hasNextLevel, isDead, decreaseLives, tickTimer, resetTimer, countPoints, addAnswer};
