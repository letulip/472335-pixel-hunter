import {assert} from 'chai';

const INITIAL_STATE = Object.freeze({
  lives: 3,
  level: 0,
  time: 0,
  answers: Object.freeze([]),
  userName: ``
});

const FINAL_STATE_TRUE = Object.freeze({
  lives: 3,
  level: 0,
  time: 30,
  answers: [
    {time: 5, isCorrect: true},
    {time: 10, isCorrect: true},
    {time: 15, isCorrect: true},
    {time: 25, isCorrect: true},
    {time: 30, isCorrect: true},
    {time: 5, isCorrect: true},
    {time: 10, isCorrect: true},
    {time: 15, isCorrect: true},
    {time: 25, isCorrect: true},
    {time: 30, isCorrect: true}
  ],
  userName: ``
});

const FINAL_STATE_FALSE = Object.freeze({
  lives: 3,
  level: 0,
  time: 30,
  answers: [
    {time: 5, isCorrect: true},
    {time: 10, isCorrect: true},
    {time: 15, isCorrect: true},
    {time: 25, isCorrect: true},
    {time: 30, isCorrect: true},
    {time: 5, isCorrect: false},
    {time: 10, isCorrect: false},
    {time: 15, isCorrect: false},
    {time: 25, isCorrect: false},
    {time: 30, isCorrect: false}
  ],
  userName: ``
});

const fastTime = 10;
const slowTime = 20;
const fastPoints = 150;
const commonPoints = 100;
const slowPoints = 50;

const countPoints = (state) => {
  let points = 0;
  for (let i = 0; i < state.answers.length; i++) {
    if (state.answers[i].isCorrect) {
      if (state.answers[i].time <= fastTime) {
        points += fastPoints;
      }
      if (state.answers[i].time > slowTime) {
        points += slowPoints;
      }
      if (state.answers[i].time < slowTime && state.answers[i].time > fastTime) {
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

describe(`Check answer change`, () => {
  it(`should add new answer object to answers array`, () => {
    assert.equal(JSON.stringify(addAnswer(INITIAL_STATE, {time: 25, isCorrect: true}).answers[0]), JSON.stringify({time: 25, isCorrect: true}));
    assert.equal(JSON.stringify(addAnswer(addAnswer(INITIAL_STATE, {time: 15, isCorrect: true}), {time: 25, isCorrect: true}).answers[1]), JSON.stringify({time: 25, isCorrect: true}));
  });
});

describe(`Check count points`, () => {
  it(`should count points properly`, () => {
    assert.equal(countPoints(FINAL_STATE_TRUE), 1000);
  });
  it(`should return FAIL if not all answers were correct`, () => {
    assert.equal(countPoints(FINAL_STATE_FALSE), `FAIL!!!`);
  });
});
