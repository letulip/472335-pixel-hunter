import {gameRender} from './renderModule.js';
import {addAnswer, setNextLevel, decreaseLives} from './state.js';

const renderGame3 = (state, gameOptions, cb) => {
  const gameLayoutElement = document.createElement(`section`);
  gameLayoutElement.classList.add(`game`);

  const game3 = `
    <p class="game__task">Найдите рисунок среди изображений</p>
    <form class="game__content  game__content--triple">
      ${gameOptions}
    </form>
    <ul class="stats">
    </ul>`;

  gameLayoutElement.innerHTML = game3;

  const gameOptionsList = gameLayoutElement.querySelectorAll(`.game__option`);
  gameOptionsList.forEach((option, number) => {
    option.addEventListener(`click`, () => {
      const timer = document.querySelector(`.game__timer`);
      let answer = {};
      if (number === 1) {
        answer = {
          time: timer.textContent,
          isCorrect: true
        };
        cb(setNextLevel(addAnswer(state, answer)));
      } else {
        answer = {
          time: timer.textContent,
          isCorrect: false
        };
        cb(setNextLevel(decreaseLives(addAnswer(state, answer))));
      }
    });
  });

  gameRender(gameLayoutElement, state);
};

export default renderGame3;
