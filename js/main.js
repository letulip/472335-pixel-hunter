'use strict';

(() => {
  const templates = document.querySelectorAll(`template`);
  const main = document.querySelector(`#main`);
  const body = document.querySelector(`body`);
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
    const navigationElements = document.createElement(`div`);
    navigationElements.classList.add(`arrows__wrap`);
    navigationElements.innerHTML = arrows;

    body.append(navigationElements);

    const navArrows = document.querySelectorAll(`.arrows__btn`);
    navArrows[0].addEventListener(`click`, () => {
      previousPageHandler();
    });
    navArrows[1].addEventListener(`click`, () => {
      nextPageHandler();
    });
  };

  const pageToDisplay = (page) => {
    if (page < 0) {
      page = 0;
      currentPageNumber = 0;
      return;
    }
    if (page >= templates.length - 1) {
      page = templates.length - 1;
      currentPageNumber = templates.length - 1;
      return;
    }
    main.innerHTML = templates[page].innerHTML;
  };

  const previousPageHandler = () => {
    pageToDisplay(--currentPageNumber);
  };

  const nextPageHandler = () => {
    pageToDisplay(++currentPageNumber);
  };

  document.addEventListener(`keydown`, (evt) => {
    if (evt.code === `ArrowLeft`) {
      evt.preventDefault();
      previousPageHandler();
      return;
    }
    if (evt.code === `ArrowRight`) {
      evt.preventDefault();
      nextPageHandler();
      return;
    }
  });

  pageToDisplay(currentPageNumber);
  addArrows();
})();
