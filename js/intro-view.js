import AbstractView from './abstract-view.js';

class ViewIntro extends AbstractView {
  constructor(cb) {
    super();
    this.tag = `section`;
    this.classList = [`intro`];
    this.cb = cb;
  }

  get template() {
    const intro = `
      <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
      <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>`;

    return intro;
  }

  start() {
    this.timeout = setTimeout(() => this.start(), 50);
  }

  stop() {
    clearTimeout(this.timeout);
  }

  bind() {
    const asterisk = this.element.querySelector(`.asterisk`);
    asterisk.addEventListener(`click`, this.cb);
  }
}

export default ViewIntro;
