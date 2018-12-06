import {contentRender} from './renderModule.js';
import renderGreeting from './greeting.js';
import AbstractView from './AbstractView.js';

// const intro = `
// <section class="intro">
//   <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
//   <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
// </section>`;

const renderIntro = () => {
  contentRender(intro);

  const asterisk = document.querySelector(`.asterisk`);
  asterisk.addEventListener(`click`, () => {
    renderGreeting();
  });
};

class ViewIntro extends AbstractView {
  constructor(question, cb) {
    super();
    this.question = question;
    this.cb = cb;
    this.tag = `section`;
    this.classList = [`game`];
  }

  get template() {
    const intro = `
    <section class="intro">
      <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
      <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
    </section>`;

    return intro;
  }

  render() {
    return contentRender(this.template);
  }

  bind() {
    const asterisk = this.element.querySelector(`.asterisk`);
    asterisk.addEventListener(`click`, () => {
      renderGreeting();
    });
  }
}

export default ViewIntro;
