import {assert} from 'chai';

const INITIAL_STATE = Object.freeze({
  lives: 3,
  level: 0,
  time: 30,
  answers: [],
  userName: ``
});

const pointsIncrease = (state, isFast, isSlow) => {
  let newPoints = state.points;
  const fastPoints = 150;
  const commonPoints = 100;
  const slowPoints = 50;

  if (isFast) {
    newPoints += fastPoints;
  }
  if (isSlow) {
    newPoints += slowPoints;
  }
  if (!isFast && !isSlow) {
    newPoints += commonPoints;
  }

  return newPoints;
};

const correctAnswersIncrease = (state, isCorrect, isFast, isSlow) => {
  const newState = Object.assign({}, state);
  if (isCorrect) {
    ++newState.correctAnswers;
    newState.points = pointsIncrease(newState, isFast, isSlow);
    return newState;
  }
  return newState;
};

const pointsCount = (state, isCorrect, isFast, isSlow) => {
  if (isCorrect && typeof isCorrect !== `boolean`) {
    throw new Error(`isCorrect should be of type boolean`);
  }
  if (isFast && typeof isFast !== `boolean`) {
    throw new Error(`isFast should be of type boolean`);
  }
  if (isSlow && typeof isSlow !== `boolean`) {
    throw new Error(`isSlow should be of type boolean`);
  }

  const newGame = Object.assign({}, state, correctAnswersIncrease(state, isCorrect, isFast, isSlow));

  return newGame;
};

describe(`Check points increase`, () => {
  // it(`should return default points value`, () => {
  //   assert.equal(pointsCount(INITIAL_STATE).points, 0);
  //   assert.equal(pointsCount(pointsCount(INITIAL_STATE)).points, 0);
  // });
  // it(`should return increased common points value`, () => {
  //   assert.equal(pointsCount(INITIAL_STATE, true).points, 100);
  //   assert.equal(pointsCount(pointsCount(INITIAL_STATE, true), true).points, 200);
  //   assert.equal(pointsCount(pointsCount(INITIAL_STATE, true)).points, 100);
  // });
  // it(`should return increased fast points value`, () => {
  //   assert.equal(pointsCount(INITIAL_STATE, true, true).points, 150);
  //   assert.equal(pointsCount(pointsCount(INITIAL_STATE, true, true), true, true).points, 300);
  //   assert.equal(pointsCount(pointsCount(INITIAL_STATE, true, true)).points, 150);
  // });
  // it(`should return increased slow points value`, () => {
  //   assert.equal(pointsCount(INITIAL_STATE, true, false, true).points, 50);
  //   assert.equal(pointsCount(pointsCount(INITIAL_STATE, true, false, true), true, false, true).points, 100);
  //   assert.equal(pointsCount(pointsCount(INITIAL_STATE, true, false, true)).points, 50);
  // });
  // it(`should return increased fast and slow points value`, () => {
  //   assert.equal(pointsCount(pointsCount(INITIAL_STATE, true, true), true, false, true).points, 200);
  //   assert.equal(pointsCount(pointsCount(INITIAL_STATE, true, false, true), true, true).points, 200);
  // });
  // it(`should return increased common and slow points value`, () => {
  //   assert.equal(pointsCount(pointsCount(INITIAL_STATE, true), true, false, true).points, 150);
  //   assert.equal(pointsCount(pointsCount(INITIAL_STATE, true, false, true), true).points, 150);
  // });
  it(`should not take non-boolean arguments`, () => {
    assert.throws(() => pointsCount(INITIAL_STATE, []).points, /isCorrect should be of type boolean/);
    assert.throws(() => pointsCount(INITIAL_STATE, true, {}).points, /isFast should be of type boolean/);
    assert.throws(() => pointsCount(INITIAL_STATE, true, false, 2).points, /isSlow should be of type boolean/);
  });
  // it(`should return increased correctAnswers value`, () => {
  //   assert.equal(pointsCount(INITIAL_STATE, true).correctAnswers, 1);
  //   assert.equal(pointsCount(pointsCount(INITIAL_STATE, true), true).correctAnswers, 2);
  //   assert.equal(pointsCount(pointsCount(INITIAL_STATE, true), false).correctAnswers, 1);
  // });
});
