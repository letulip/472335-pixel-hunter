import AbstractView from './AbstractView.js';

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

  bind() {
    const asterisk = this.element.querySelector(`.asterisk`);
    asterisk.addEventListener(`click`, this.cb);
  }
}

export default ViewIntro;
