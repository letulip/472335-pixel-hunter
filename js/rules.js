import AbstractView from './AbstractView.js';

class ViewRules extends AbstractView {
  constructor(state, renderGameCB) {
    super();
    this.tag = `div`;
    this.state = state;
    this.renderGameCB = renderGameCB;
  }

  get template() {
    const rules = `
    <section class="rules">
      <h2 class="rules__title">Правила</h2>
      <ul class="rules__description">
        <li>Угадай 10 раз для каждого изображения фото
          <img class="rules__icon" src="img/icon-photo.png" width="32" height="31" alt="Фото"> или рисунок
          <img class="rules__icon" src="img/icon-paint.png" width="32" height="31" alt="Рисунок"></li>
        <li>Фотографиями или рисунками могут быть оба изображения.</li>
        <li>На каждую попытку отводится 30 секунд.</li>
        <li>Ошибиться можно не более 3 раз.</li>
      </ul>
      <p class="rules__ready">Готовы?</p>
      <form class="rules__form">
        <input class="rules__input" type="text" placeholder="Ваше Имя">
        <button class="rules__button  continue" type="submit" disabled>Go!</button>
      </form>
    </section>`;

    return rules;
  }

  bind() {

    const rulesInput = this.element.querySelector(`.rules__input`);
    rulesInput.addEventListener(`keyup`, () => {
      const goButton = this.element.querySelector(`.continue`);

      if (rulesInput.value) {
        goButton.removeAttribute(`disabled`);
        goButton.addEventListener(`click`, () => {
          this.renderGameCB(this.state, rulesInput.value);
        });
      } else {
        goButton.setAttribute(`disabled`, `true`);
      }
    });
  }
}

// const RULES = new ViewRules();

export default ViewRules;
