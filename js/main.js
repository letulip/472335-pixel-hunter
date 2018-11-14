'use strict';

(function () {
  const TEMPLATES = document.querySelectorAll(`template`);
  const MAIN = document.querySelector(`#main`);
  const BODY = document.querySelector(`body`);
  let currentPageNumber = 0;

  const addArrows = () => {
    const arrows = `
      <style>
        .arrows__wrap {
          position: absolute;
          top: 95px;
          left: 50%;
          margin-left: -56px;
        }
        .arrows__btn {
          background: none;
          border: 2px solid black;
          padding: 5px 20px;
        }
      </style>
      <button class="arrows__btn"><-</button>
      <button class="arrows__btn">-></button>`;
    const arrowsBlock = document.createElement(`div`);
    arrowsBlock.classList.add(`arrows__wrap`);
    arrowsBlock.innerHTML += arrows;
    BODY.append(arrowsBlock);
  };

  const pageToDisplay = (page) => {
    if (page < 0) {
      page = 0;
      currentPageNumber = 0;
    }
    if (page >= TEMPLATES.length - 1) {
      page = TEMPLATES.length - 1;
      currentPageNumber = TEMPLATES.length - 1;
    }
    MAIN.innerHTML = TEMPLATES[page].innerHTML;
    addArrows();
  };

  const previousPageHandler = () => {
    pageToDisplay(currentPageNumber -= 1);
  };

  const nextPageHandler = () => {
    pageToDisplay(currentPageNumber += 1);
  };

  document.addEventListener(`keydown`, (evt) => {
    if (evt.code === `ArrowLeft`) {
      evt.preventDefault();
      previousPageHandler();
    }
    if (evt.code === `ArrowRight`) {
      evt.preventDefault();
      nextPageHandler();
    }
  });

  pageToDisplay(currentPageNumber);
})();
