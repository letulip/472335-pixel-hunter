import AbstractView from './abstract-view.js';

class ViewIntro extends AbstractView {
  constructor(cb) {
    super();
    this.tag = `section`;
    this.classList = [`intro`];
    this._cb = cb;
  }

  get template() {
    return `
      <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
      <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>`;
  }

  bind() {
    const asterisk = this.element.querySelector(`.asterisk`);
    asterisk.addEventListener(`click`, this._cb);
  }
}

export default ViewIntro;
