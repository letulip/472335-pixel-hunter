import {assert} from 'chai';

const INITIAL_STATE = Object.freeze({
  points: 0,
  lives: 3,
  level: 0,
  time: 0
});

const levelChange = (state, level) => {
  if (typeof level !== `number`) {
    return state;
  }
  if (level < 0) {
    return state;
  }

  const newGame = Object.assign({}, state, {
    'level': level
  });

  return newGame;
};

describe(`Check level change`, () => {
  it(`should change level of game`, () => {
    assert.equal(levelChange(INITIAL_STATE, 1).level, 1);
    assert.equal(levelChange(INITIAL_STATE, 2).level, 2);
    assert.equal(levelChange(INITIAL_STATE, 10).level, 10);
    assert.equal(levelChange(INITIAL_STATE, 102).level, 102);
  });
  it(`should not allow set negative values`, () => {
    assert.equal(levelChange(INITIAL_STATE, -1).level, 0);
  });
  it(`should now allow set non number value`, () => {
    assert.equal(levelChange(INITIAL_STATE, []).level, 0);
    assert.equal(levelChange(INITIAL_STATE, {}).level, 0);
    assert.equal(levelChange(INITIAL_STATE, undefined).level, 0);
  });
});
