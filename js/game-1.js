import {gameRender} from './renderModule.js';
import {addAnswer, setNextLevel, decreaseLives} from './state.js';

const checkedCounter = (list, state, answers, cb) => {
  let count = 0;
  let tempState = {};
  for (let i = 0; i < list.length; i++) {
    if (list[i].checked) {
      ++count;
      if (count === 2) {
        const lastAnswer = answers.pop();
        const prelastAnswer = answers.pop();
        const totalTime = lastAnswer.time + prelastAnswer.time;
        if (lastAnswer.isCorrect && prelastAnswer.isCorrect) {
          const totalAnswer = {
            time: totalTime,
            isCorrect: true
          };
          tempState = addAnswer(state, totalAnswer);
        } else {
          const totalAnswer = {
            time: totalTime,
            isCorrect: false
          };
          tempState = decreaseLives(addAnswer(state, totalAnswer));
        }
        cb(setNextLevel(tempState));
      }
    }
  }
};

const renderGame1 = (state, gameOptions, cb) => {
  const gameLayoutElement = document.createElement(`section`);
  gameLayoutElement.classList.add(`game`);

  const game1 = `
    <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
    <form class="game__content">
      ${gameOptions}
    </form>
    <ul class="stats">
    </ul>`;

  gameLayoutElement.innerHTML = game1;

  const answers = [];

  const inputsList = gameLayoutElement.querySelectorAll(`input`);
  inputsList.forEach((input) => {
    input.addEventListener(`change`, () => {
      if (input.checked) {
        const timer = document.querySelector(`.game__timer`);
        const inputNumber = Array.from(input.name).pop();
        const answer = {
          time: timer.textContent,
          isCorrect: (input.value === state.questions[state.level].options[inputNumber].type)
        };
        answers.push(answer);
        checkedCounter(inputsList, state, answers, cb);
      }
    });
  });

  gameRender(gameLayoutElement, state);
};

export default renderGame1;
