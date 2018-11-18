import pageRender from '../js/renderModule.js';
import renderRules from '../js/rules.js';

const greeting = document.querySelector(`#greeting`);

const renderGreeting = () => {
  pageRender(greeting.innerHTML);

  const greetingContinue = document.querySelector(`.greeting__continue`);
  greetingContinue.addEventListener(`click`, () => {
    renderRules();
  });
};

export default renderGreeting;
