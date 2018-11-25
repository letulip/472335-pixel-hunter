const mainElement = document.querySelector(`#main`);

const pageRender = (strToRender) => {
  mainElement.innerHTML = strToRender;
  // debugger;
};

const gameRender = (strToRender) => {
  const game = document.querySelector(`.game`);
  game.innerHTML = strToRender;
};

export {pageRender, gameRender};
