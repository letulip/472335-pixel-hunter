import {assert} from 'chai';

const INITIAL_STATE = Object.freeze({
  lives: 3,
  level: 0,
  time: 0,
  answers: [],
  userName: ``
});

const FINAL_STATE = Object.freeze({
  lives: 3,
  level: 0,
  time: 30,
  answers: [
    {time: 5, isCorrect: true},
    {time: 10, isCorrect: true},
    {time: 15, isCorrect: true},
    {time: 25, isCorrect: true},
    {time: 30, isCorrect: true},
    {time: 5, isCorrect: false},
    {time: 10, isCorrect: false},
    {time: 15, isCorrect: false},
    {time: 25, isCorrect: false},
    {time: 30, isCorrect: false}
  ],
  userName: ``
});

const fastTime = 10;
const slowTime = 20;

const countPoints = (state) => {
  let points = 0;
  state.answers.forEach((answer) => {
    if (answer.isCorrect) {
      if (answer.time <= fastTime) {
        points += 150;
        return;
      }
      if (answer.time <= slowTime) {
        points += 100;
        return;
      } else {
        points += 50;
        return;
      }
    }
  });
  return points;
};

const addAnswer = (state, answer) => {
  if (state.answers.length === 10) {
    countPoints(state.answers, state.lives);
  }

  const newState = Object.assign({}, state);
  newState.answers.push(answer);

  return newState;
};

describe(`Check answer change`, () => {
  it(`should add new answer object to answers array`, () => {
    // assert.equal(JSON.stringify(addAnswer(INITIAL_STATE, {time: 25, isCorrect: true}).answers[0]), JSON.stringify({time: 25, isCorrect: true}));
    // Если я открываю закомментированный кусок выше, то его проверка проходит, а нижняя нет, если запустить тест в таком виде - то все проходит правильно, почему?
    assert.equal(JSON.stringify(addAnswer(addAnswer(INITIAL_STATE, {time: 15, isCorrect: true}), {time: 25, isCorrect: true}).answers[1]), JSON.stringify({time: 25, isCorrect: true}));
  });
});

describe(`Check count points`, () => {
  it(`should add new answer object to answers array`, () => {
    assert.equal(countPoints(FINAL_STATE), 500);
  });
});
