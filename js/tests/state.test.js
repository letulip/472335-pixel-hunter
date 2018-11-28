import {assert} from 'chai';

import {INITIAL_STATE, addQuestions, changeLevel, setNextLevel, hasNextLevel, isDead, livesChange, timerTick, resetTimer, countPoints, addAnswer} from '../state.js';

const QUESTIONS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

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
    assert.equal(hasNextLevel(INITIAL_STATE.level, addQuestions(INITIAL_STATE, QUESTIONS).questions), true);
    assert.equal(hasNextLevel(10, addQuestions(INITIAL_STATE, QUESTIONS).questions), false);
  });
});

describe(`Check add questions`, () => {
  it(`should add questions to initial state`, () => {
    assert.equal(JSON.stringify(addQuestions(INITIAL_STATE, QUESTIONS).questions), JSON.stringify([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]));
  });
});


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

describe(`Check reset Timer`, () => {
  it(`should reset time value`, () => {
    assert.equal(resetTimer(INITIAL_STATE).time, 30);
  });
});

describe(`Check tick Timer`, () => {
  it(`should decrease time value`, () => {
    assert.equal(timerTick(INITIAL_STATE).time, 29);
    assert.equal(timerTick(timerTick(INITIAL_STATE)).time, 28);
    assert.equal(timerTick(timerTick(resetTimer(INITIAL_STATE))).time, 28);
  });
});

const FINAL_ANSWERS_TRUE = Object.freeze([
  {isAnswer: true, time: 5, isCorrect: true},
  {isAnswer: true, time: 10, isCorrect: true},
  {isAnswer: true, time: 15, isCorrect: true},
  {isAnswer: true, time: 25, isCorrect: true},
  {isAnswer: true, time: 30, isCorrect: true},
  {isAnswer: true, time: 5, isCorrect: true},
  {isAnswer: true, time: 10, isCorrect: true},
  {isAnswer: true, time: 15, isCorrect: true},
  {isAnswer: true, time: 25, isCorrect: true},
  {isAnswer: true, time: 30, isCorrect: true}
]);

const FINAL_ANSWERS_FALSE = Object.freeze([
  {isAnswer: true, time: 5, isCorrect: true},
  {isAnswer: true, time: 10, isCorrect: true},
  {isAnswer: true, time: 15, isCorrect: true},
  {isAnswer: true, time: 25, isCorrect: true},
  {isAnswer: true, time: 30, isCorrect: true},
  {isAnswer: true, time: 5, isCorrect: false},
  {isAnswer: true, time: 10, isCorrect: false},
  {isAnswer: true, time: 15, isCorrect: false},
  {isAnswer: true, time: 25, isCorrect: false},
  {isAnswer: true, time: 30, isCorrect: false}
]);

const FINAL_ANSWERS_LOOSE = Object.freeze([
  {isAnswer: true, time: 5, isCorrect: true},
  {isAnswer: true, time: 10, isCorrect: true},
  {isAnswer: true, time: 15, isCorrect: true},
  {isAnswer: true, time: 25, isCorrect: true},
  {isAnswer: true, time: 30, isCorrect: true},
  {isAnswer: true, time: 5, isCorrect: false},
  {isAnswer: true, time: 10, isCorrect: false},
  {isAnswer: false, time: 15, isCorrect: false},
  {isAnswer: true, time: 25, isCorrect: false},
  {isAnswer: true, time: 30, isCorrect: false}
]);

describe(`Check answer change`, () => {
  it(`should add new answer object to answers array`, () => {
    assert.equal(JSON.stringify(addAnswer(INITIAL_STATE, {time: 25, isCorrect: true}).answers[0]), JSON.stringify({time: 25, isCorrect: true}));
    assert.equal(JSON.stringify(addAnswer(addAnswer(INITIAL_STATE, {time: 15, isCorrect: true}), {time: 25, isCorrect: true}).answers[1]), JSON.stringify({time: 25, isCorrect: true}));
  });
});

describe(`Check count points`, () => {
  it(`should count points properly`, () => {
    assert.equal(countPoints(FINAL_ANSWERS_TRUE), 1000);
  });
  it(`should count points properly`, () => {
    assert.equal(countPoints(FINAL_ANSWERS_FALSE), 500);
  });
  it(`should return -1 if got less then 10 answers`, () => {
    assert.equal(countPoints(FINAL_ANSWERS_LOOSE), -1);
  });
});
