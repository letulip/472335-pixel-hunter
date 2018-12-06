import {gameRender, createLayoutElement} from './renderModule.js';
import AbstractView from './AbstractView.js';

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
        const isCorrect = Array.prototype.every.call(inputList, (inputElement, inputIndex) => {
          return inputElement.value === question.options[inputIndex].type;
        });
        cb(isCorrect);
      }
    });

    gameContent.append(gameOption);
  });

  gameRender(gameLayoutElement);
};

class ViewGame1 extends AbstractView {
  constructor(question, cb) {
    super();
    this.question = question;
    this.cb = cb;
    this.tag = `section`;
    this.classList = [`game`];
  }

  get template() {
    const game1 = `
      <p class="game__task">${this.question.title}</p>
      <form class="game__content">
        ${this.question.options.map((option, index) => `
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
          </div>`).join(``)}
      </form>
      <ul class="stats">
      </ul>`;

    return game1;
  }

  bind() {
    const gameOptions = this.element.querySelectorAll(`.game__option`);
    gameOptions.forEach((option) => {
      option.addEventListener(`click`, () => {
        const inputList = this.element.querySelectorAll(`input:checked`);
        if (inputList.length === 2) {
          const isCorrect = Array.prototype.every.call(inputList, (inputElement, inputIndex) => {
            return inputElement.value === this.question.options[inputIndex].type;
          });
          this.cb(isCorrect);
        }
      });
    });
  }
}

export default ViewGame1;
