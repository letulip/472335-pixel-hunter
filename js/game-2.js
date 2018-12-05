import {gameRender, createLayoutElement} from './renderModule.js';

const renderGame2 = (question, cb) => {
  const game2 = `
    <p class="game__task">${question.title}</p>
    <form class="game__content  game__content--wide">
    </form>
    <ul class="stats">
    </ul>`;

  const gameLayoutElement = createLayoutElement(`section`, game2, [`game`]);
  const gameContent = gameLayoutElement.querySelector(`.game__content`);

  question.options.forEach((option, index) => {
    const gameOptionLayout = `
      <img src="${option.src}" alt="Option ${index}" width="705" height="455">
      <label class="game__answer  game__answer--photo">
        <input class="visually-hidden" name="question${index}" type="radio" value="photo">
        <span>Фото</span>
      </label>
      <label class="game__answer  game__answer--paint">
        <input class="visually-hidden" name="question${index}" type="radio" value="paint">
        <span>Рисунок</span>
      </label>`;
    const gameOption = createLayoutElement(`div`, gameOptionLayout, [`game__option`]);

    // event listener:
    const inputsList = gameOption.querySelectorAll(`input`);
    inputsList.forEach((input) => {
      input.addEventListener(`change`, () => {
        cb(input.value === option.type);
      });
    });

    gameContent.append(gameOption);
  });


  gameRender(gameLayoutElement);
};

export default renderGame2;
