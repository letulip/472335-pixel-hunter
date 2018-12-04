import {gameRender, createLayoutElement} from './renderModule.js';
// import {addAnswer, setNextLevel, decreaseLives} from './state.js';

const renderGame1 = (options, cb) => {
  const game1 = `
    <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
    <form class="game__content">
    </form>
    <ul class="stats">
    </ul>`;

  const gameLayoutElement = createLayoutElement(`section`, game1, [`game`]);
  const gameContent = gameLayoutElement.querySelector(`.game__content`);

  options.forEach((option, index) => {
    const gameOptionLayout = `
    <div class="game__option">
      <img src="${option.src}" alt="Option ${index}" width="468" height="458">
      <label class="game__answer game__answer--photo">
        <input class="visually-hidden" name="question${index}" type="radio" value="photo">
        <span>Фото</span>
      </label>
      <label class="game__answer game__answer--paint">
        <input class="visually-hidden" name="question${index}" type="radio" value="paint">
        <span>Рисунок</span>
      </label>
    </div>`;
    const gameOption = createLayoutElement(`div`, gameOptionLayout, [`game__option`]);

    // event listener:
    gameOption.addEventListener(`click`, () => {
      const inputsList = gameContent.querySelectorAll(`input:checked`);
      if (inputsList.length === 2) {
        const timer = document.querySelector(`.game__timer`);
        const isCorrect = Array.prototype.every.call(inputsList, (inputElement) => {
          return inputElement.value === option.type;
        });

        const answer = {
          time: timer.textContent,
          isCorrect
        };

        cb(answer);
      }
    });

    gameContent.append(gameOption);
  });

  gameRender(gameLayoutElement);
};

export default renderGame1;
