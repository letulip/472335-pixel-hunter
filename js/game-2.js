import {gameRender, statsRender} from './renderModule.js';
import renderHeader from './header.js';
import renderGreeting from './greeting.js';
import renderGame3 from './game-3.js';
import images from './sampleImages.js';
import {addAnswer, resetTimer} from './state.js';

const game2 = `
  <p class="game__task">Угадай, фото или рисунок?</p>
  <form class="game__content  game__content--wide">
    <div class="game__option">
      <img src="${images.paintings[1]}" alt="Option 1" width="705" height="455">
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
  resetTimer(stateFromGame1);
  gameRender(game2);
  const gameSection = document.querySelector(`.game`);
  statsRender(gameSection, stateFromGame1.answers);

  const backButton = document.querySelector(`.back`);
  backButton.addEventListener(`click`, () => {
    renderGreeting();
  });

  let newState = stateFromGame1;

  const inputsList = document.querySelectorAll(`input`);
  inputsList.forEach((input) => {
    input.addEventListener(`change`, () => {
      const timer = document.querySelector(`.game__timer`);
      const answer = {
        time: timer.textContent,
        isCorrect: true
      };
      const tempState = addAnswer(newState, answer);
      statsRender(gameSection, tempState.answers);
      renderGame3(tempState);
    });
  });
};

export default renderGame2;
