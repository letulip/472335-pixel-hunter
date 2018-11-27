import {assert} from 'chai';

const INITIAL_STATE = Object.freeze({
  lives: 3,
  level: 0,
  time: 0,
  answers: [],
  userName: ``
});

const isDead = (lives) => {
  return lives >= 0;
};

const livesChange = (state) => {
  const newState = Object.freeze(Object.assign({}, state, {lives: state.lives - 1}));
  return newState;
};

describe(`Check lives change`, () => {
  it(`should return decreased lives value`, () => {
    assert.equal(livesChange(INITIAL_STATE).lives, 2);
    assert.equal(livesChange(livesChange(INITIAL_STATE)).lives, 1);
  });
});

describe(`Check is dead`, () => {
  it(`should return true`, () => {
    assert.equal(isDead(2), true);
    assert.equal(isDead(0), true);
  });
  it(`should return false`, () => {
    assert.equal(isDead(-1), false);
  });
});
