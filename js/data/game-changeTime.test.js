import {assert} from 'chai';

const INITIAL_STATE = Object.freeze({
  lives: 3,
  level: 0,
  time: 0,
  answers: [],
  userName: ``
});

const defaultTimerValue = 30;

const timerTick = () => {
  let i = defaultTimerValue;
  const timerId = setInterval(() => {
    // действие
    if (i === 0) {
      clearInterval(timerId);
    }
    i--;
  }, 1000);
};

const timeCount = (state) => {
  const newState = Object.assign({}, state, {
    'time': resetTimer()
  });
  // timerTick();

  return newState;
};

const resetTimer = () => {
  return defaultTimerValue;
};

describe(`Check time count`, () => {
  it(`should return object with default time value`, () => {
    assert.equal(timeCount(INITIAL_STATE).time, 30);
  });
});

describe(`Check reset Timer`, () => {
  it(`should reset time value`, () => {
    assert.equal(resetTimer(), 30);
  });
});
