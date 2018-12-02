import {gameRender, statsRender} from './renderModule.js';
import renderHeader from './header.js';
import renderGreeting from './greeting.js';
import {addAnswer, resetTimer, setNextLevel} from './state.js';

const checkedCounter = (list, tempState, cb) => {
  let count = 0;
  for (let i = 0; i < list.length; i++) {
    if (list[i].checked) {
      ++count;
      if (count === 2) {
        cb(setNextLevel(tempState));
      }
    }
  }
};

const renderGame1 = (state, cb) => {

  const game1 = `
    <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
    <form class="game__content">
      <div class="game__option">
        <img src="${state.questions[state.level].options[0].src}" alt="Option 1" width="468" height="458">
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
        <img src="${state.questions[state.level].options[1].src}" alt="Option 2" width="468" height="458">
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

  renderHeader(state);
  resetTimer(state);
  gameRender(game1);
  const gameSection = document.querySelector(`.game`);
  statsRender(gameSection, state.answers);

  const backButton = document.querySelector(`.back`);
  backButton.addEventListener(`click`, () => {
    renderGreeting();
  });

  const inputsList = document.querySelectorAll(`input`);
  inputsList.forEach((input) => {
    input.addEventListener(`change`, () => {
      if (input.checked) {
        const timer = document.querySelector(`.game__timer`);
        const answer = {
          time: timer.textContent,
          isCorrect: true
        };
        const tempState = addAnswer(state, answer);
        statsRender(gameSection, tempState.answers);
        checkedCounter(inputsList, tempState, cb);
      }
    });
  });
};

export default renderGame1;
