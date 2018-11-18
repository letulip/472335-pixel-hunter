import pageRender from '../js/renderModule.js';
import renderGreeting from '../js/greeting.js';
import renderGame1 from '../js/game-1.js';

const rules = document.querySelector(`#rules`);

const renderRules = () => {
  pageRender(rules.innerHTML);

  const backButton = document.querySelector(`.back`);
  backButton.addEventListener(`click`, () => {
    renderGreeting();
  });

  const rulesInput = document.querySelector(`.rules__input`);
  rulesInput.addEventListener(`change`, () => {
    const goButton = document.querySelector(`.continue`);

    if (rulesInput.value) {
      goButton.removeAttribute(`disabled`);
      goButton.addEventListener(`click`, () => {
        renderGame1();
      });
    } else {
      goButton.setAttribute(`disabled`, `true`);
    }
  });
};

export default renderRules;
