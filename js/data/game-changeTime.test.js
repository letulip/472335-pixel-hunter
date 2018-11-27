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
  // const roundTime = resetTimer(INITIAL_STATE).time;
  // const timeNow = Date.now();
  // const timeOut = timeNow + roundTime * 1000;

  // как сделать таймер?
};

const timeCount = (state, time) => {
  if (typeof time !== `number`) {
    throw new Error(`Time should be of type number`);
  }
  if (time < 0) {
    throw new Error(`Time should not be negative`);
  }

  const newState = Object.assign({}, state, {
    'time': timerTick(state, time)
  });

  return newState;
};

const resetTimer = (state) => {
  const newState = Object.assign({}, state, {
    'time': defaultTimerValue
  });
  return newState;
};

describe(`Check time change`, () => {
  // it(`should change time of game`, () => {
  //   assert.equal(timeCount(INITIAL_STATE, 1).time, 1);
  //   assert.equal(timeCount(INITIAL_STATE, 2).time, 2);
  // });
  it(`should not allow set negative values`, () => {
    assert.throws(() => timeCount(INITIAL_STATE, -1).time, 0);
  });
  it(`should take only number`, () => {
    assert.throws(() => timeCount(INITIAL_STATE, []).time, /Time should be of type number/);
    assert.throws(() => timeCount(INITIAL_STATE, {}).time, /Time should be of type number/);
    assert.throws(() => timeCount(INITIAL_STATE, null).time, /Time should be of type number/);
    assert.throws(() => timeCount(INITIAL_STATE, undefined).time, /Time should be of type number/);
    assert.throws(() => timeCount(INITIAL_STATE, ``).time, /Time should be of type number/);
  });
});

// describe(`Check time increase`, () => {
//   it(`should return increased time value`, () => {
//     assert.equal(timeCount(INITIAL_STATE, 50).time, 50);
//     assert.equal(timeCount(timeCount(INITIAL_STATE, 150), 50).time, 200);
//   });
// });

describe(`Check reset Timer`, () => {
  it(`should reset time value`, () => {
    assert.equal(resetTimer(INITIAL_STATE).time, 30);
  });
});
