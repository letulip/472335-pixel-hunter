import {gameRender} from './renderModule.js';
import {addAnswer, setNextLevel, decreaseLives} from './state.js';

const renderGame2 = (state, gameOptions, cb) => {
  const gameLayoutElement = document.createElement(`section`);
  gameLayoutElement.classList.add(`game`);

  const game2 = `
    <p class="game__task">Угадай, фото или рисунок?</p>
    <form class="game__content  game__content--wide">
      ${gameOptions}
    </form>
    <ul class="stats">
    </ul>`;

  gameLayoutElement.innerHTML = game2;

  const inputsList = gameLayoutElement.querySelectorAll(`input`);
  inputsList.forEach((input) => {
    input.addEventListener(`change`, () => {
      const timer = document.querySelector(`.game__timer`);
      const answer = {
        time: timer.textContent,
        isCorrect: (input.value === state.questions[state.level].options[0].type)
      };
      if (!answer.isCorrect) {
        cb(setNextLevel(decreaseLives(addAnswer(state, answer))));
      } else {
        cb(setNextLevel(addAnswer(state, answer)));
      }
    });
  });

  gameRender(gameLayoutElement, state);
};

export default renderGame2;
