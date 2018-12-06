import {contentRender} from './renderModule.js';
import GREETING from './greeting.js';
import AbstractView from './AbstractView.js';

class ViewIntro extends AbstractView {
  constructor() {
    super();
    this.tag = `section`;
    this.classList = [`intro`];
  }

  get template() {
    const intro = `
      <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
      <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>`;

    return intro;
  }

  bind() {
    const asterisk = this.element.querySelector(`.asterisk`);
    asterisk.addEventListener(`click`, () => {
      contentRender(GREETING.element);
    });
  }
}

const INTRO = new ViewIntro();

export default INTRO;
