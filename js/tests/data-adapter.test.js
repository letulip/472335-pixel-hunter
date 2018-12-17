import {assert} from 'chai';

import adaptServerData from '../data-adapter.js';
import {INITIAL_STATE_WITH_QUESTIONS} from '../state.js';

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
    question: `Угадай фото или рисунок?`
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
    question: `Угадай фото или рисунок?`
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
    question: `Угадай фото или рисунок?`
  },
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
    question: `Угадай фото или рисунок?`
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
    question: `Угадай фото или рисунок?`
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
    question: `Угадай фото или рисунок?`
  },
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
    question: `Угадай фото или рисунок?`
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
    question: `Угадай фото или рисунок?`
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
    question: `Угадай фото или рисунок?`
  },
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
    question: `Угадай фото или рисунок?`
  }
];

describe(`Check adapt Server Data`, () => {
  it(`should adapt server data to local data model`, () => {
    assert.equal(adaptServerData(SERVER_DATA), INITIAL_STATE_WITH_QUESTIONS.questions);
  });
});
