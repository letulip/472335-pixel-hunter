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
      previousPage();
    });
    navArrows[1].addEventListener(`click`, () => {
      nextPage();
    });

    bodyElement.append(navigationElements);
  };

  const pageRender = (page) => {
    mainElement.innerHTML = templatesList[page].innerHTML;
  };

  const previousPage = () => {
    if (--currentPageNumber < 0) {
      currentPageNumber = 0;
      return;
    }
    pageRender(currentPageNumber);
  };

  const nextPage = () => {
    if (++currentPageNumber >= templatesList.length) {
      currentPageNumber = templatesList.length;
      return;
    }
    pageRender(currentPageNumber);
  };

  document.addEventListener(`keydown`, (evt) => {
    if (evt.code === `ArrowLeft`) {
      evt.preventDefault();
      previousPage();
      return;
    }
    if (evt.code === `ArrowRight`) {
      evt.preventDefault();
      nextPage();
      return;
    }
  });

  pageRender(currentPageNumber);
  addArrows();
})();
