import AbstractView from './abstract-view.js';

class ViewGame3 extends AbstractView {
  constructor(question, cb) {
    super();
    this.question = question;
    this.cb = cb;
    this.tag = `section`;
    this.classList = [`game`];
  }

  get template() {
    const game3 = `
      <p class="game__task">${this.question.question}</p>
      <form class="game__content game__content--triple">
        ${this.question.answers.map((answer, index) => `
          <div class="game__option">
            <img src="${answer.image.url}" alt="Option ${index}" width="304" height="455">
          </div>`).join(``)}
      </form>
      <ul class="stats">
      </ul>`;

    return game3;
  }

  bind() {
    let paintCount = 0;
    let photoCount = 0;
    let questionType = `painting`;

    // event listener:
    const gameOptionsList = this.element.querySelectorAll(`.game__option`);
    gameOptionsList.forEach((optionElement, index) => {
      if (this.question.answers[index].type === `painting`) {
        ++paintCount;
      } else {
        ++photoCount;
      }
      if (paintCount > photoCount) {
        questionType = `photo`;
      }
      optionElement.addEventListener(`click`, () => {
        this.cb(this.question.answers[index].type === questionType);
      });
    });
  }
}

export default ViewGame3;
