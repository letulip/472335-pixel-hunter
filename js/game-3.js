import {gameRender, createLayoutElement} from './renderModule.js';

const renderGame3 = (options, cb) => {
  const game3 = `
    <p class="game__task">Найдите рисунок среди изображений</p>
    <form class="game__content  game__content--triple">
    </form>
    <ul class="stats">
    </ul>`;

  const gameLayoutElement = createLayoutElement(`section`, game3, [`game`]);
  const gameContent = gameLayoutElement.querySelector(`.game__content`);

  options.forEach((option, index) => {
    const gameOptionLayout = `
      <img src="${option.src}" alt="Option ${index}" width="304" height="455">`;
    const gameOption = createLayoutElement(`div`, gameOptionLayout, [`game__option`]);

    gameContent.append(gameOption);
  });

  // event listener:
  const gameOptionsList = gameContent.querySelectorAll(`.game__option`);
  gameOptionsList.forEach((option, index) => {
    option.addEventListener(`click`, () => {
      const timer = document.querySelector(`.game__timer`);
      let answer = {};
      if (index === 1) {
        answer = {
          time: timer.textContent,
          isCorrect: true
        };
        cb(answer);
      } else {
        answer = {
          time: timer.textContent,
          isCorrect: false
        };
        cb(answer);
      }
    });
  });

  gameRender(gameLayoutElement);
};

export default renderGame3;
