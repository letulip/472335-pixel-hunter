const mainElement = document.querySelector(`#main`);

const pageRender = (strToRender) => {
  mainElement.innerHTML = strToRender;
};

export default pageRender;

(() => {
  // const templatesList = [`intro`, `greeting`, `rules`, `game-1`, `game-2`, `game-3`, `stats`]
  //   .map((template) => {
  //     return document.querySelector(`#${template}`);
  //   });
  // const bodyElement = document.querySelector(`body`);
  // let currentPageNumber = 0;

  // const addArrows = () => {
  //   const arrows = `
  //     <style>
  //       .arrows__wrap {
  //         position: absolute;
  //         top: 95px;
  //         left: 50%;
  //         margin-left: -56px;
  //       }
  //       .arrows__btn {
  //         background: none;
  //         border: 2px solid black;
  //         padding: 5px 20px;
  //       }
  //     </style>
  //     <button class="arrows__btn"><-</button>
  //     <button class="arrows__btn">-></button>`;
  //   const navigationElements = document.createElement(`div`);
  //   navigationElements.classList.add(`arrows__wrap`);
  //   navigationElements.innerHTML = arrows;
  //
  //   const navArrows = navigationElements.querySelectorAll(`.arrows__btn`);
  //   navArrows[0].addEventListener(`click`, () => {
  //     previousPage();
  //   });
  //   navArrows[1].addEventListener(`click`, () => {
  //     nextPage();
  //   });
  //
  //   bodyElement.append(navigationElements);
  // };

  // const previousPage = () => {
  //   if (currentPageNumber > 0) {
  //     pageRender(templatesList[--currentPageNumber].innerHTML);
  //   }
  // };

  // const nextPage = () => {
  //   if (currentPageNumber < templatesList.length - 1) {
  //     pageRender(templatesList[++currentPageNumber].innerHTML);
  //   }
  // };

  // document.addEventListener(`keydown`, (evt) => {
  //   if (evt.code === `ArrowLeft`) {
  //     evt.preventDefault();
  //     previousPage();
  //     return;
  //   }
  //   if (evt.code === `ArrowRight`) {
  //     evt.preventDefault();
  //     nextPage();
  //     return;
  //   }
  // });

  // pageRender(templatesList[currentPageNumber].innerHTML);
  // addArrows();
})();
