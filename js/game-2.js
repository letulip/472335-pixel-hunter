import {gameRender, statsRender} from './renderModule.js';
import renderHeader from './header.js';
import renderGreeting from './greeting.js';
import {addAnswer, resetTimer, setNextLevel} from './state.js';

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

  renderHeader(state);
  resetTimer(state);
  gameRender(game2);
  const gameSection = document.querySelector(`.game`);
  statsRender(gameSection, state.answers);

  const backButton = document.querySelector(`.back`);
  backButton.addEventListener(`click`, () => {
    renderGreeting();
  });

  const inputsList = document.querySelectorAll(`input`);
  inputsList.forEach((input) => {
    input.addEventListener(`change`, () => {
      const timer = document.querySelector(`.game__timer`);
      const answerValue = (input.value === state.questions[0].options[0].type);
      const answer = {
        time: timer.textContent,
        isCorrect: answerValue
      };
      const tempState = addAnswer(state, answer);
      statsRender(gameSection, tempState.answers);
      // debugger;
      cb(setNextLevel(tempState));
    });
  });
};

export default renderGame2;
