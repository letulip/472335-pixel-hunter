import {pageRender} from './renderModule.js';
import renderGreeting from './greeting.js';

const intro = `
<section class="intro">
  <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
  <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
</section>`;

const renderIntro = () => {
  pageRender(intro);

  const asterisk = document.querySelector(`.asterisk`);
  asterisk.addEventListener(`click`, () => {
    renderGreeting();
  });
};

export default renderIntro;
