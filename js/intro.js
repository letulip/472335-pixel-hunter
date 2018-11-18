import pageRender from '../js/renderModule.js';
import renderGreeting from '../js/greeting.js';

const intro = document.querySelector(`#intro`);

const renderIntro = () => {
  pageRender(intro.innerHTML);

  const asterisk = document.querySelector(`.asterisk`);
  asterisk.addEventListener(`click`, () => {
    renderGreeting();
  });
};

export default renderIntro;
