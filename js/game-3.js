import {gameRender, createLayoutElement} from './renderModule.js';

const renderGame3 = (question, cb) => {
  const game3 = `
    <p class="game__task">${question.title}</p>
    <form class="game__content  game__content--triple">
    </form>
    <ul class="stats">
    </ul>`;

  const gameLayoutElement = createLayoutElement(`section`, game3, [`game`]);
  const gameContent = gameLayoutElement.querySelector(`.game__content`);

  let paintCount = 0;
  let photoCount = 0;
  let questionType = ``;

  question.options.forEach((option, index) => {
    const gameOptionLayout = `
      <img src="${option.src}" alt="Option ${index}" width="304" height="455">`;
    const gameOption = createLayoutElement(`div`, gameOptionLayout, [`game__option`]);

    if (option.type === `paint`) {
      ++paintCount;
    } else {
      ++photoCount;
    }

    gameContent.append(gameOption);
  });

  if (paintCount > photoCount) {
    questionType = `photo`;
  } else {
    questionType = `paint`;
  }

  // event listener:
  const gameOptionsList = gameContent.querySelectorAll(`.game__option`);
  gameOptionsList.forEach((optionElement, index) => {
    optionElement.addEventListener(`click`, () => {
      cb(question.options[index].type === questionType);
    });
  });

  gameRender(gameLayoutElement);
};

export default renderGame3;
