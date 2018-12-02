import {gameRender} from './renderModule.js';
import {addAnswer, setNextLevel, decreaseLives} from './state.js';

const renderGame2 = (state, cb) => {

  const game2 = `
    <p class="game__task">Угадай, фото или рисунок?</p>
    <form class="game__content  game__content--wide">
      <div class="game__option">
        <img src="${state.questions[state.level].options[0].src}" alt="Option 1" width="705" height="455">
        <label class="game__answer  game__answer--photo">
          <input class="visually-hidden" name="question1" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--paint">
          <input class="visually-hidden" name="question1" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
    </form>
    <ul class="stats">
    </ul>`;

  gameRender(game2, state);

  const inputsList = document.querySelectorAll(`input`);
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
};

export default renderGame2;
