import {assert} from 'chai';

import adaptServerData from '../data-adapter.js';

const SERVER_DATA = [
  {
    answers: [
      {
        image: {
          url: `https://k42.kn3.net/D2F0370D6.jpg`,
        },
        type: `painting`
      }
    ],
    type: `tinder-like`,
    question: `Угадай, фото или рисунок?`
  },
  {
    answers: [
      {
        image: {
          url: `https://k42.kn3.net/CF42609C8.jpg`,
        },
        type: `painting`
      },
      {
        image: {
          url: `http://i.imgur.com/1KegWPz.jpg`,
        },
        type: `photo`
      }
    ],
    type: `two-of-two`,
    question: `Угадайте для каждого изображения фото или рисунок?`
  },
  {
    answers: [
      {
        image: {
          url: `https://i.imgur.com/DiHM5Zb.jpg`,
        },
        type: `photo`
      },
      {
        image: {
          url: `https://k32.kn3.net/5C7060EC5.jpg`,
        },
        type: `painting`
      },
      {
        image: {
          url: `http://i.imgur.com/DKR1HtB.jpg`,
        },
        type: `photo`
      }
    ],
    type: `one-of-three`,
    question: `Найдите рисунок среди изображений`
  }
];

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
  }
];

describe(`Check adapt Server Data`, () => {
  it(`should adapt server data to local data model`, () => {
    assert.deepEqual(adaptServerData(SERVER_DATA), QUESTIONS);
  });
});
