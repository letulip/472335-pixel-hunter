'use strict';

(function () {
  const TEMPLATES = document.querySelectorAll(`template`);
  const MAIN = document.querySelector(`#main`);
  let currentPageNumber = 0;

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
  };

  const previousPageHandler = () => {
    pageToDisplay(currentPageNumber += 1);
  };

  const nextPageHandler = () => {
    pageToDisplay(currentPageNumber -= 1);
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
