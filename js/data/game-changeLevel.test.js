import {assert} from 'chai';

const INITIAL_STATE = Object.freeze({
  lives: 3,
  level: 0,
  time: 30,
  answers: [],
  userName: ``
});

const levelChange = (state, level) => {
  if (typeof level !== `number`) {
    throw new Error(`Level should be of type number`);
  }
  if (level < 0) {
    throw new Error(`Level should not be negative`);
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
  });
  it(`should not allow set negative values`, () => {
    assert.throws(() => levelChange(INITIAL_STATE, -1).level, 0);
  });
  it(`should now allow set non number value`, () => {
    assert.throws(() => levelChange(INITIAL_STATE, []).level, 0);
    assert.throws(() => levelChange(INITIAL_STATE, {}).level, 0);
    assert.throws(() => levelChange(INITIAL_STATE, undefined).level, 0);
  });
});
