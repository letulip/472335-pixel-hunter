import pageRender from './renderModule.js';
import renderGreeting from './greeting.js';

const intro = document.querySelector(`#intro`);

const renderIntro = () => {
  pageRender(intro.innerHTML);

  const asterisk = document.querySelector(`.asterisk`);
  asterisk.addEventListener(`click`, () => {
    renderGreeting();
  });
};

export default renderIntro;
