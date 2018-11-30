const mainElement = document.querySelector(`#main`);

const contentRender = (strToRender) => {
  mainElement.innerHTML = strToRender;
  // debugger;
};

const gameRender = (strToRender) => {
  const game = document.querySelector(`.game`);
  game.innerHTML = strToRender;
};

const statsRender = (answers) => {
  let statsLayout = ``;
  const DEFAULT_ANSWERS_COUNT = 10;
  const FAST_TIME = 10;
  const SLOW_TIME = 20;
  for (let i = 0; i < DEFAULT_ANSWERS_COUNT; i++) {
    if (!answers[i]) {
      statsLayout += `<li class="stats__result stats__result--unknown"></li>`;
    }
    if (answers[i] && !answers[i].isCorrect) {
      statsLayout += `<li class="stats__result stats__result--wrong"></li>`;
    }
    if (answers[i] && answers[i].isCorrect && answers[i].time <= FAST_TIME) {
      statsLayout += `<li class="stats__result stats__result--fast"></li>`;
    }
    if (answers[i] && answers[i].isCorrect && answers[i].time > SLOW_TIME) {
      statsLayout += `<li class="stats__result stats__result--slow"></li>`;
    }
    if (answers[i] && answers[i].isCorrect && answers[i].time > FAST_TIME && answers[i].time <= SLOW_TIME) {
      statsLayout += `<li class="stats__result stats__result--correct"></li>`;
    }
  }
  const stats = document.querySelector(`.stats`);
  stats.innerHTML = statsLayout;
};

export {contentRender, gameRender, statsRender};
