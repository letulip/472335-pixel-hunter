import {assert} from 'chai';

const INITIAL_STATE = Object.freeze({
  lives: 3,
  level: 0,
  time: 0,
  answers: [],
  userName: ``
});

const defaultTimerValue = 30;

const timerTick = (state) => {
  const newState = Object.freeze(Object.assign({}, state, {time: state.time - 1}));
  return newState;
};

const timeStart = (state) => {
  const newState = Object.freeze(Object.assign({}, state, {
    'time': resetTimer()
  }));

  return newState;
};

const resetTimer = () => {
  return defaultTimerValue;
};

describe(`Check time count`, () => {
  it(`should return object with default time value`, () => {
    assert.equal(timeStart(INITIAL_STATE).time, 30);
  });
});

describe(`Check reset Timer`, () => {
  it(`should reset time value`, () => {
    assert.equal(resetTimer(), 30);
  });
});

describe(`Check tick Timer`, () => {
  it(`should decrease time value`, () => {
    assert.equal(timerTick(INITIAL_STATE).time, -1);
    assert.equal(timerTick(timerTick(INITIAL_STATE)).time, -2);
  });
});
