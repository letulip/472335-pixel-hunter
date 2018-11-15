'use strict';

(() => {
  const templatesList = [`intro`, `greeting`, `rules`, `game-1`, `game-2`, `game-3`, `modal-error`, `modal-confirm`]
    .map((template) => {
      return document.querySelector(`#${template}`);
    });
  const mainElement = document.querySelector(`#main`);
  const bodyElement = document.querySelector(`body`);
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

    const navArrows = navigationElements.querySelectorAll(`.arrows__btn`);
    navArrows[0].addEventListener(`click`, () => {
      previousPageHandler();
    });
    navArrows[1].addEventListener(`click`, () => {
      nextPageHandler();
    });

    bodyElement.append(navigationElements);
  };

  const pageToDisplay = (page) => {
    if (page < 0) {
      currentPageNumber = 0;
      return;
    }
    if (page >= templatesList.length) {
      currentPageNumber = templatesList.length;
      return;
    }
    mainElement.innerHTML = templatesList[page].innerHTML;
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
