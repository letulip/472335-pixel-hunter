import AbstractView from './abstract-view.js';

class ViewGame2 extends AbstractView {
  constructor(question, cb) {
    super();
    this.question = question;
    this.cb = cb;
    this.tag = `section`;
    this.classList = [`game`];
  }

  get template() {
    const GAME_2 = `
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

    return GAME_2;
  }

  bind() {
    const inputsList = this.element.querySelectorAll(`input`);
    inputsList.forEach((input) => {
      input.addEventListener(`change`, () => {
        this.cb(this.question.options.some((option) => {
          return option.type === input.value;
        }));
      });
    });
  }
}

export default ViewGame2;
