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
  const TOTAL_ANSWERS = 10;

  for (let i = 0; i < TOTAL_ANSWERS; i++) {
    while (answers.length) {
      if (!answers[i].isCorrect) {
        statsLayout += `<li class="stats__result stats__result--wrong"></li>`;
      }
      if (answers[i].time <= 10 && answers[i].isCorrect) {
        statsLayout += `<li class="stats__result stats__result--fast"></li>`;
      }
      if (answers[i].time > 20 && answers[i].isCorrect) {
        statsLayout += `<li class="stats__result stats__result--slow"></li>`;
      }
      if (answers[i].time > 10 && answers[i].time <= 20 && answers[i].isCorrect) {
        statsLayout += `<li class="stats__result stats__result--correct"></li>`;
      }
    }
    statsLayout += `<li class="stats__result stats__result--unknown"></li>`;
  }

  const stats = document.querySelector(`.stats`);
  stats.innerHTML = statsLayout;
};

export {contentRender, gameRender, statsRender};
