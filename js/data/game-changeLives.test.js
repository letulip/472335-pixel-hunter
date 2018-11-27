import {assert} from 'chai';

const INITIAL_STATE = Object.freeze({
  lives: 3,
  level: 0,
  time: 0,
  answers: [],
  userName: ``
});

const livesChange = (state) => {
  const newState = Object.assign({}, state);

  if (newState.lives > 0) {
    --newState.lives;
    return newState;
  } else {
    return -1;
  }
};

describe(`Check lives change`, () => {
  it(`should return decreased lives value`, () => {
    assert.equal(livesChange(INITIAL_STATE).lives, 2);
    assert.equal(livesChange(livesChange(INITIAL_STATE)).lives, 1);
  });
  it(`should return -1 if player out of lives`, () => {
    assert.equal(livesChange(livesChange(livesChange(livesChange(INITIAL_STATE)))), -1);
    assert.equal(livesChange(livesChange(livesChange(livesChange(livesChange(INITIAL_STATE))))), -1);
  });
});
