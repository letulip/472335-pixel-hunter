import {assert} from 'chai';

const INITIAL_STATE = Object.freeze({
  lives: 3,
  level: 0,
  time: 30,
  answers: [],
  userName: ``
});

const livesDecrease = (state, value) => {
  const newState = Object.assign({}, state);
  newState.lives += value;
  return newState;
};

const livesChange = (state, lives) => {
  if (typeof lives !== `number`) {
    throw new Error(`Lives should be of type number`);
  }
  if (lives < 0) {
    return livesDecrease(state, lives);
  }
  const newState = Object.assign({}, state, {
    'lives': lives
  });

  return newState;
};

describe(`Check lives change`, () => {
  it(`should change lives of player in game`, () => {
    assert.equal(livesChange(INITIAL_STATE, 1).lives, 1);
    assert.equal(livesChange(INITIAL_STATE, 2).lives, 2);
  });
  it(`should take only number`, () => {
    assert.throws(() => livesChange(INITIAL_STATE, []).level, /Lives should be of type number/);
    assert.throws(() => livesChange(INITIAL_STATE, {}).level, /Lives should be of type number/);
    assert.throws(() => livesChange(INITIAL_STATE, null).level, /Lives should be of type number/);
    assert.throws(() => livesChange(INITIAL_STATE, undefined).level, /Lives should be of type number/);
    assert.throws(() => livesChange(INITIAL_STATE, ``).level, /Lives should be of type number/);
  });
});

describe(`Check lives decrease`, () => {
  it(`should return decreased lives value`, () => {
    assert.equal(livesChange(INITIAL_STATE, -1).lives, 2);
    assert.equal(livesChange(livesChange(INITIAL_STATE, -1), -1).lives, 1);
  });
});
