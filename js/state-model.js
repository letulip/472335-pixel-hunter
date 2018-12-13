import StateController from './state-controller.js';

class StateModel {
  constructor() {
    this.lives = 3;
    this.level = 0;
    this.time = 30;
    this.questions = Object.freeze([]);
    this.answers = Object.freeze([]);
    this.userName = ``;
  }

  static initialState() {
    return Object.freeze(new StateModel());
  }

  static initialStateWithQuestions() {
    return StateController.addQuestions(StateModel.initialState(), QUESTIONS);
  }
}

// const INITIAL_STATE = Object.freeze({
//   lives: 3,
//   level: 0,
//   time: 30,
//   questions: Object.freeze([]),
//   answers: Object.freeze([]),
//   userName: ``
// });

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

export default StateModel;
