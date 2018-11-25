import {gameRender, statsRender} from './renderModule.js';
import renderHeader from './header.js';
import renderGreeting from './greeting.js';
import renderGame3 from './game-3.js';

const game2 = `
  <p class="game__task">Угадай, фото или рисунок?</p>
  <form class="game__content  game__content--wide">
    <div class="game__option">
      <img src="http://placehold.it/705x455" alt="Option 1" width="705" height="455">
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

const renderGame2 = (stateFromGame1) => {
  renderHeader(stateFromGame1);
  gameRender(game2);
  statsRender();

  const backButton = document.querySelector(`.back`);
  backButton.addEventListener(`click`, () => {
    renderGreeting();
  });

  const inputsList = document.querySelectorAll(`input`);
  inputsList.forEach((input) => {
    input.addEventListener(`change`, () => {
      renderGame3(stateFromGame1);
    });
  });
};

export default renderGame2;
