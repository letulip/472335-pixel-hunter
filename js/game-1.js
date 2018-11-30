import {gameRender, statsRender} from './renderModule.js';
import renderHeader from './header.js';
import renderGreeting from './greeting.js';
import renderGame2 from './game-2.js';
import {INITIAL_STATE_WITH_QUESTIONS, addAnswer, resetTimer} from './state.js';

const game1 = `
  <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
  <form class="game__content">
    <div class="game__option">
      <img src="${INITIAL_STATE_WITH_QUESTIONS.questions[1].options[0].src}" alt="Option 1" width="468" height="458">
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
      <img src="${INITIAL_STATE_WITH_QUESTIONS.questions[1].options[1].src}" alt="Option 2" width="468" height="458">
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

const renderGame1 = (question) => {
  gameRender(game1);
  const gameSection = document.querySelector(`.game`);
  statsRender(gameSection, INITIAL_STATE_WITH_QUESTIONS.answers);

  const backButton = document.querySelector(`.back`);
  backButton.addEventListener(`click`, () => {
    renderGreeting();
  });

  let newState = INITIAL_STATE_WITH_QUESTIONS;

  const inputsList = document.querySelectorAll(`input`);
  inputsList.forEach((input) => {
    input.addEventListener(`change`, () => {
      if (input.checked) {
        const timer = document.querySelector(`.game__timer`);
        const answer = {
          time: timer.textContent,
          isCorrect: true
        };
        const tempState = addAnswer(newState, answer);
        statsRender(gameSection, tempState.answers);
        checkedCounter(inputsList, tempState);
        newState = tempState;
        resetTimer(newState);
      }
    });
  });
};

export default renderGame1;
