import {assert} from 'chai';

const INITIAL_STATE = Object.freeze({
  lives: 3,
  level: 0,
  time: 0,
  answers: Object.freeze([]),
  userName: ``
});

const DEFAULT_TIMER_VALUE = 30;

const timerTick = (state) => {
  return Object.freeze(Object.assign({}, state, {time: state.time - 1}));
};

const resetTimer = (state) => {
  return Object.freeze(Object.assign({}, state, {
    'time': DEFAULT_TIMER_VALUE
  }));
};

describe(`Check reset Timer`, () => {
  it(`should reset time value`, () => {
    assert.equal(resetTimer(INITIAL_STATE).time, 30);
  });
});

describe(`Check tick Timer`, () => {
  it(`should decrease time value`, () => {
    assert.equal(timerTick(INITIAL_STATE).time, -1);
    assert.equal(timerTick(timerTick(INITIAL_STATE)).time, -2);
    assert.equal(timerTick(timerTick(resetTimer(INITIAL_STATE))).time, 28);
  });
});
