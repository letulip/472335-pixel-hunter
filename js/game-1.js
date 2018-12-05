import {gameRender, createLayoutElement} from './renderModule.js';

const renderGame1 = (question, cb) => {
  const game1 = `
    <p class="game__task">${question.title}</p>
    <form class="game__content">
    </form>
    <ul class="stats">
    </ul>`;

  const gameLayoutElement = createLayoutElement(`section`, game1, [`game`]);
  const gameContent = gameLayoutElement.querySelector(`.game__content`);

  question.options.forEach((option, index) => {
    const gameOptionLayout = `
      <img src="${option.src}" alt="Option ${index}" width="468" height="458">
      <label class="game__answer game__answer--photo">
        <input class="visually-hidden" name="question${index}" type="radio" value="photo">
        <span>Фото</span>
      </label>
      <label class="game__answer game__answer--paint">
        <input class="visually-hidden" name="question${index}" type="radio" value="paint">
        <span>Рисунок</span>
      </label>`;
    const gameOption = createLayoutElement(`div`, gameOptionLayout, [`game__option`]);

    // event listener:
    gameOption.addEventListener(`click`, () => {
      const inputList = gameContent.querySelectorAll(`input:checked`);
      if (inputList.length === 2) {
        cb(Array.prototype.every.call(inputList, (inputElement, inputIndex) => {
          return inputElement.value === question.options[inputIndex].type;
        }));
      }
    });

    gameContent.append(gameOption);
  });

  gameRender(gameLayoutElement);
};

export default renderGame1;
