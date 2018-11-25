const mainElement = document.querySelector(`#main`);

const contentRender = (strToRender) => {
  mainElement.innerHTML = strToRender;
  // debugger;
};

const gameRender = (strToRender) => {
  const game = document.querySelector(`.game`);
  game.innerHTML = strToRender;
};

const statsRender = () => {
  const statsLayout = `
    <li class="stats__result stats__result--wrong"></li>
    <li class="stats__result stats__result--slow"></li>
    <li class="stats__result stats__result--fast"></li>
    <li class="stats__result stats__result--correct"></li>
    <li class="stats__result stats__result--wrong"></li>
    <li class="stats__result stats__result--unknown"></li>
    <li class="stats__result stats__result--slow"></li>
    <li class="stats__result stats__result--unknown"></li>
    <li class="stats__result stats__result--fast"></li>
    <li class="stats__result stats__result--unknown"></li>`;
  const stats = document.querySelector(`.stats`);
  stats.innerHTML = statsLayout;
};

export {contentRender, gameRender, statsRender};
