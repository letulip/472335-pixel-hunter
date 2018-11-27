import {assert} from 'chai';

const INITIAL_STATE = Object.freeze({
  lives: 3,
  level: 0,
  time: 0,
  questions: Object.freeze([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
  answers: Object.freeze([]),
  userName: ``
});

const changeLevel = (state, level) => {
  if (typeof level !== `number`) {
    throw new Error(`Level should be of type number`);
  }
  if (level < 0) {
    throw new Error(`Level should not be negative`);
  }

  return Object.assign({}, state, {
    'level': level
  });
};

const setNextLevel = (state) => {
  return Object.freeze(Object.assign({}, state, {
    'level': state.level + 1
  }));
};

const hasNextLevel = (level, questions) => {
  return level < questions.length;
};

describe(`Check level change`, () => {
  it(`should change level of game`, () => {
    assert.equal(changeLevel(INITIAL_STATE, 1).level, 1);
    assert.equal(changeLevel(INITIAL_STATE, 2).level, 2);
  });
  it(`should not allow set negative values`, () => {
    assert.throws(() => changeLevel(INITIAL_STATE, -1).level, 0);
  });
  it(`should now allow set non number value`, () => {
    assert.throws(() => changeLevel(INITIAL_STATE, []).level, 0);
    assert.throws(() => changeLevel(INITIAL_STATE, {}).level, 0);
    assert.throws(() => changeLevel(INITIAL_STATE, undefined).level, 0);
  });
});

describe(`Check set Next level`, () => {
  it(`should set next level of game`, () => {
    assert.equal(setNextLevel(INITIAL_STATE).level, 1);
    assert.equal(setNextLevel(setNextLevel(INITIAL_STATE)).level, 2);
  });
});

describe(`Check has Next level`, () => {
  it(`should check for next level existense`, () => {
    assert.equal(hasNextLevel(INITIAL_STATE.level, INITIAL_STATE.questions), true);
    assert.equal(hasNextLevel(10, INITIAL_STATE.questions), false);
  });
});
