const DEFAULT_ANSWERS_COUNT = 10;
const mainElement = document.querySelector(`#main`);
const bodyElement = document.querySelector(`body`);

const deleteElement = (element) => {
  bodyElement.removeChild(element);
};

const bodyAppendElement = (element) => {
  bodyElement.appendChild(element);
};

const contentRender = (element) => {
  mainElement.appendChild(element);
};

const clearMainElement = () => {
  mainElement.innerHTML = ``;
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
  const Time = {
    FAST: 20,
    SLOW: 10
  };

  if (!answer) {
    return `unknown`;
  }
  if (answer && !answer.isCorrect) {
    return `wrong`;
  }
  if (answer && answer.isCorrect && answer.time >= Time.FAST) {
    return `fast`;
  }
  if (answer && answer.isCorrect && answer.time < Time.SLOW) {
    return `slow`;
  }
  return `correct`;
};

const statsRender = (answers, element) => {
  const statsArray = [...answers];
  let statsLayout = ``;
  let stats = mainElement.querySelector(`.stats`);
  statsArray.length = DEFAULT_ANSWERS_COUNT;
  for (let answer of statsArray) {
    statsLayout += `<li class="stats__result stats__result--${resultAnswer(answer)}"></li>`;
  }

  if (element) {
    stats = element.querySelector(`.stats`);
  }
  stats.innerHTML = statsLayout;
};

export {contentRender, bodyAppendElement, deleteElement, clearMainElement, gameRender, statsRender, createLayoutElement};
