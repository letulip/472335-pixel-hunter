import {assert} from 'chai';

import {INITIAL_STATE, addQuestions, changeLevel, setNextLevel, hasNextLevel, isDead, decreaseLives, tickTimer, resetTimer, countPoints, addAnswer} from '../state.js';

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
    assert.equal(decreaseLives(INITIAL_STATE).lives, 2);
    assert.equal(decreaseLives(decreaseLives(INITIAL_STATE)).lives, 1);
  });
});

describe(`Check is dead`, () => {
  it(`should return false`, () => {
    assert.equal(isDead(2), false);
    assert.equal(isDead(0), false);
  });
  it(`should return true`, () => {
    assert.equal(isDead(-1), true);
  });
});

describe(`Check reset Timer`, () => {
  it(`should reset time value`, () => {
    assert.equal(resetTimer(INITIAL_STATE).time, 30);
  });
});

describe(`Check tick Timer`, () => {
  it(`should decrease time value`, () => {
    assert.equal(tickTimer(INITIAL_STATE).time, 29);
    assert.equal(tickTimer(tickTimer(INITIAL_STATE)).time, 28);
    assert.equal(tickTimer(tickTimer(resetTimer(INITIAL_STATE))).time, 28);
  });
});

const FINAL_STATE_TRUE = Object.freeze({
  lives: 3,
  level: 0,
  time: 30,
  questions: Object.freeze([]),
  answers: Object.freeze([
    {time: 5, isCorrect: true},
    {time: 10, isCorrect: true},
    {time: 15, isCorrect: true},
    {time: 25, isCorrect: true},
    {time: 30, isCorrect: true},
    {time: 5, isCorrect: true},
    {time: 10, isCorrect: true},
    {time: 15, isCorrect: true},
    {time: 25, isCorrect: true},
    {time: 29, isCorrect: true}
  ]),
  userName: ``});

const FINAL_STATE_TRUE_2 = Object.freeze({
  lives: 2,
  level: 0,
  time: 30,
  questions: Object.freeze([]),
  answers: Object.freeze([
    {time: 5, isCorrect: true},
    {time: 10, isCorrect: true},
    {time: 15, isCorrect: true},
    {time: 25, isCorrect: true},
    {time: 30, isCorrect: true},
    {time: 5, isCorrect: true},
    {time: 10, isCorrect: true},
    {time: 15, isCorrect: true},
    {time: 25, isCorrect: true},
    {time: 29, isCorrect: false}
  ]),
  userName: ``});

const FINAL_STATE_FALSE = Object.freeze({
  lives: -1,
  level: 0,
  time: 30,
  questions: Object.freeze([]),
  answers: Object.freeze([
    {time: 5, isCorrect: true},
    {time: 10, isCorrect: true},
    {time: 15, isCorrect: true},
    {time: 25, isCorrect: true},
    {time: 30, isCorrect: true},
    {time: 5, isCorrect: true},
    {time: 10, isCorrect: false},
    {time: 15, isCorrect: false},
    {time: 25, isCorrect: false},
    {time: 29, isCorrect: false}
  ]),
  userName: ``});

const FINAL_STATE_LOOSE = Object.freeze({
  lives: 3,
  level: 0,
  time: 30,
  questions: Object.freeze([]),
  answers: Object.freeze([
    {time: 5, isCorrect: true},
    {time: 10, isCorrect: true},
    {time: 15, isCorrect: true},
    {time: 25, isCorrect: true},
    {time: 30, isCorrect: true},
    {time: 5, isCorrect: true},
    {time: 10, isCorrect: true},
    {time: 15, isCorrect: true},
    {time: 25, isCorrect: true}
  ]),
  userName: ``});

describe(`Check answer change`, () => {
  it(`should add new answer object to answers array`, () => {
    assert.equal(JSON.stringify(addAnswer(INITIAL_STATE, {time: 25, isCorrect: true}).answers[0]), JSON.stringify({time: 25, isCorrect: true}));
    assert.equal(JSON.stringify(addAnswer(addAnswer(INITIAL_STATE, {time: 15, isCorrect: true}), {time: 25, isCorrect: true}).answers[1]), JSON.stringify({time: 25, isCorrect: true}));
  });
});

describe(`Check count points`, () => {
  it(`should count points properly`, () => {
    assert.equal(countPoints(FINAL_STATE_TRUE.answers, FINAL_STATE_TRUE.lives).points, 1250);
    assert.equal(countPoints(FINAL_STATE_TRUE_2.answers, FINAL_STATE_TRUE_2.lives).points, 1050);
  });
  it(`should return 0 if got less then 10 answers or less then 0 lives`, () => {
    assert.equal(countPoints(FINAL_STATE_FALSE.answers, FINAL_STATE_FALSE.lives).points, 0);
    assert.equal(countPoints(FINAL_STATE_LOOSE.answers, FINAL_STATE_LOOSE.lives).points, 0);
  });
});
