import {contentRender} from './renderModule.js';
import GREETING from './greeting.js';
import AbstractView from './AbstractView.js';

class ViewHeader extends AbstractView {
  constructor(state, isShort) {
    super();
    this.tag = `div`;
    this.classList = [`game__wrapper`];
    if (state) {
      this.state = state;
    }
    this.isShort = isShort;
  }

  get template() {
    let header = `
    <header class="header">
      <button class="back">
        <span class="visually-hidden">Вернуться к началу</span>
        <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
          <use xlink:href="img/sprite.svg#arrow-left"></use>
        </svg>
        <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
          <use xlink:href="img/sprite.svg#logo-small"></use>
        </svg>
      </button>
    </header>`;

    if (!this.isShort) {
      header = `
      <header class="header">
        <button class="back">
          <span class="visually-hidden">Вернуться к началу</span>
          <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
            <use xlink:href="img/sprite.svg#arrow-left"></use>
          </svg>
          <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
            <use xlink:href="img/sprite.svg#logo-small"></use>
          </svg>
        </button>
        <div class="game__timer">${this.state.time}</div>
        <div class="game__lives">
          ${new Array(3 - this.state.lives)
            .fill(`<img src="img/heart__empty.svg" class="game__heart" alt=" Missed Life" width="31" height="27">`)
            .join(``)}
          ${new Array(this.state.lives)
            .fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">`)
            .join(``)}
        </div>
      </header>
      <section class="game">
      </section>`;
    }

    return header;
  }

  bind() {
    const backButton = this.element.querySelector(`.back`);
    backButton.addEventListener(`input`, () => {
      contentRender(GREETING.element);
    });


  }
}

export default ViewHeader;
