import {gameRender, statsRender} from './renderModule.js';
import renderHeader from './header.js';
import renderGreeting from './greeting.js';
import renderGame2 from './game-2.js';
import images from './sampleImages.js';
import {INITIAL_STATE} from './state.js';


const game1 = `
  <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
  <form class="game__content">
    <div class="game__option">
      <img src="${images.paintings[0]}" alt="Option 1" width="468" height="458">
      <label class="game__answer game__answer--photo">
        <input class="visually-hidden" name="question1" type="radio" value="photo">
        <span>Фото</span>
      </label>
      <label class="game__answer game__answer--paint">
        <input class="visually-hidden" name="question1" type="radio" value="paint">
        <span>Рисунок</span>
      </label>
    </div>
    <div class="game__option">
      <img src="${images.photos[0]}" alt="Option 2" width="468" height="458">
      <label class="game__answer  game__answer--photo">
        <input class="visually-hidden" name="question2" type="radio" value="photo">
        <span>Фото</span>
      </label>
      <label class="game__answer  game__answer--paint">
        <input class="visually-hidden" name="question2" type="radio" value="paint">
        <span>Рисунок</span>
      </label>
    </div>
  </form>
  <ul class="stats">
  </ul>`;

const checkedCounter = (list, stateFromGame1) => {
  let count = 0;
  for (let i = 0; i < list.length; i++) {
    if (list[i].checked) {
      ++count;
      if (count === 2) {
        renderGame2(stateFromGame1);
        return;
      }
    }
  }
};

const renderGame1 = () => {
  renderHeader(INITIAL_STATE);
  gameRender(game1);
  // debugger;
  statsRender(INITIAL_STATE.answers);

  const backButton = document.querySelector(`.back`);
  backButton.addEventListener(`click`, () => {
    renderGreeting();
  });

  const inputsList = document.querySelectorAll(`input`);
  inputsList.forEach((input) => {
    input.addEventListener(`change`, () => {
      if (input.checked) {
        checkedCounter(inputsList, INITIAL_STATE);
      }
    });
  });
};

export default renderGame1;
