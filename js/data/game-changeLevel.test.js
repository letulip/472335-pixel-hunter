import {assert} from 'chai';

const INITIAL_STATE = Object.freeze({
  lives: 3,
  level: 0,
  time: 30,
  answers: [],
  userName: ``
});

const changeLevel = (state, level) => {
  if (typeof level !== `number`) {
    throw new Error(`Level should be of type number`);
  }
  if (level < 0) {
    throw new Error(`Level should not be negative`);
  }

  const newState = Object.assign({}, state, {
    'level': level
  });

  return newState;
};

const setNextLevel = (state) => {
  let newLevel = state.level;
  const newState = Object.assign({}, state, {
    'level': ++newLevel
  });
  return newState;
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
