import {assert} from 'chai';

const INITIAL_STATE = Object.freeze({
  lives: 3,
  level: 0,
  time: 30,
  answers: [],
  userName: ``
});

const countPoints = (state) => {
  return state;
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
