import {gameRender, createLayoutElement} from './renderModule.js';
import AbstractView from './AbstractView.js';

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

class ViewGame2 extends AbstractView {
  constructor(question, cb) {
    super();
    this.question = question;
    this.cb = cb;
    this.tag = `section`;
    this.classList = [`game`];
  }

  get template() {
    const game2 = `
      <p class="game__task">${this.question.title}</p>
      <form class="game__content  game__content--wide">
        ${this.question.options.map((option, index) => `
          <div class="game__option">
            <img src="${option.src}" alt="Option ${index}" width="705" height="455">
            <label class="game__answer  game__answer--photo">
              <input class="visually-hidden" name="question${index}" type="radio" value="photo">
              <span>Фото</span>
            </label>
            <label class="game__answer  game__answer--paint">
              <input class="visually-hidden" name="question${index}" type="radio" value="paint">
              <span>Рисунок</span>
            </label>
            </div>`).join(``)}
      </form>
      <ul class="stats">
      </ul>`;

    return game2;
  }

  bind() {
    const inputsList = this.element.querySelectorAll(`input`);
    inputsList.forEach((input) => {
      input.addEventListener(`change`, () => {
        this.cb(input.value === this.question.options[0].type);
      });
    });
  }
}

export default ViewGame2;
