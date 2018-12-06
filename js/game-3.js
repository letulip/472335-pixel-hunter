import AbstractView from './AbstractView.js';

class ViewGame1 extends AbstractView {
  constructor(question, cb) {
    super();
    this.question = question;
    this.cb = cb;
    this.tag = `section`;
    this.classList = [`game`];
  }

  get template() {
    const game3 = `
      <p class="game__task">${this.question.title}</p>
      <form class="game__content game__content--triple">
        ${this.question.options.map((option, index) => `
          <div class="game__option">
            <img src="${option.src}" alt="Option ${index}" width="304" height="455">
          </div>`).join(``)}
      </form>
      <ul class="stats">
      </ul>`;

    return game3;
  }

  bind() {
    let paintCount = 0;
    let photoCount = 0;
    let questionType = `paint`;

    // event listener:
    const gameOptionsList = this.element.querySelectorAll(`.game__option`);
    gameOptionsList.forEach((optionElement, index) => {
      if (this.question.options[index].type === `paint`) {
        ++paintCount;
      } else {
        ++photoCount;
      }
      if (paintCount > photoCount) {
        questionType = `photo`;
      }
      optionElement.addEventListener(`click`, () => {
        this.cb(this.question.options[index].type === questionType);
      });
    });
  }
}

export default ViewGame1;
