const mainElement = document.querySelector(`#main`);

const contentRender = (element) => {
  mainElement.innerHTML = ``;
  mainElement.append(element);
};

const gameRender = (elementToRender) => {
  const gameWrapper = mainElement.querySelector(`.game__wrapper`);
  const game = gameWrapper.querySelector(`.game`);
  gameWrapper.replaceChild(elementToRender, game);
};

const createLayoutElement = (tag, content, elementClassList) => {
  const gameLayoutElement = document.createElement(tag);
  if (elementClassList) {
    elementClassList.forEach((elementClass) => {
      gameLayoutElement.classList.add(elementClass);
    });
  }
  gameLayoutElement.innerHTML = content;
  return gameLayoutElement;
};

const resultAnswer = (answer) => {
  const FAST_TIME = 20;
  const SLOW_TIME = 10;
  if (!answer) {
    return `unknown`;
  }
  if (answer && !answer.isCorrect) {
    return `wrong`;
  }
  if (answer && answer.isCorrect && answer.time >= FAST_TIME) {
    return `fast`;
  }
  if (answer && answer.isCorrect && answer.time < SLOW_TIME) {
    return `slow`;
  }
  return `correct`;
};

const statsRender = (answers, element) => {
  let statsLayout = ``;
  const DEFAULT_ANSWERS_COUNT = 10;
  for (let i = 0; i < DEFAULT_ANSWERS_COUNT; i++) {
    statsLayout += `<li class="stats__result stats__result--${resultAnswer(answers[i])}"></li>`;
  }
  let stats = mainElement.querySelector(`.stats`);
  if (element) {
    stats = element.querySelector(`.stats`);
  }
  stats.innerHTML = statsLayout;
};

export {contentRender, gameRender, statsRender, createLayoutElement};
