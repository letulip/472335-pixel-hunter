import pageRender from "/js/renderModule.js";

const greeting = document.querySelector(`#greeting`);

const renderGreeting = () => {
  pageRender(greeting.innerHTML);
};

export default renderGreeting;
