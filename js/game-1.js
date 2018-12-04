import {gameRender, createLayoutElement} from './renderModule.js';

const answers = [];

const checkedCounter = (answersFromGame, cb) => {
  const lastAnswer = answersFromGame.pop();
  const prelastAnswer = answersFromGame.pop();
  const totalTime = lastAnswer.time + prelastAnswer.time;
  if (lastAnswer.isCorrect && prelastAnswer.isCorrect) {
    const totalAnswer = {
      time: totalTime,
      isCorrect: true
    };
    cb(totalAnswer);
  } else {
    const totalAnswer = {
      time: totalTime,
      isCorrect: false
    };
    cb(totalAnswer);
  }
};

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
    const inputsList = gameOption.querySelectorAll(`input`);
    inputsList.forEach((inputElement) => {
      inputElement.addEventListener(`change`, () => {
        if (inputElement.checked) {
          const timer = document.querySelector(`.game__timer`);

          const answer = {
            time: timer.textContent,
            isCorrect: (inputElement.value === option.type)
          };
          answers.push(answer);
          if (answers.length >= 2) {
            checkedCounter(answers, cb);
          }
        }
      });
    });

    gameContent.append(gameOption);
  });

  gameRender(gameLayoutElement);
};

export default renderGame1;
