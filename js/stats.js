import {contentRender, statsRender} from './renderModule.js';
import renderGreeting from './greeting.js';
import {countPoints} from './state.js';

const getWinStatus = (state) => {
  let winStatus = ``;
  if (state.answers === 10) {
    winStatus = `Победа!`;
  } else {
    winStatus = `Не в этот раз, попробуй еще!`;
  }
  return winStatus;
};

const results = [];

const renderTotalStats = (stateFromGame3) => {
  results.push(stateFromGame3);

  const createResultTable = (number, resultElement) => {
    const resultTable = document.createElement(`table`);
    resultTable.classList.add(`result__table`);
    let statsContent = `
    <table class="result__table">
      <tr>
        <td class="result__number">${number + 1}.</td>
        <td colspan="2">
          <ul class="stats">
          </ul>
        </td>
        <td class="result__points">× 100</td>
        <td class="result__total">900</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Бонус за скорость:</td>
        <td class="result__extra">1 <span class="stats__result stats__result--fast"></span></td>
        <td class="result__points">× 50</td>
        <td class="result__total">50</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">2 <span class="stats__result stats__result--alive"></span></td>
        <td class="result__points">× 50</td>
        <td class="result__total">100</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Штраф за медлительность:</td>
        <td class="result__extra">2 <span class="stats__result stats__result--slow"></span></td>
        <td class="result__points">× 50</td>
        <td class="result__total">-100</td>
      </tr>
      <tr>
        <td colspan="5" class="result__total  result__total--final">950</td>
      </tr>
    </table>`;
    resultTable.innerHTML = statsContent;
    statsRender(resultTable, resultElement.answers);
    return resultTable;
  };

  const statsLayout = `
  <header class="header">
    <button class="back">
      <span class="visually-hidden">Вернуться к началу</span>
      <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
        <use xlink:href="img/sprite.svg#arrow-left"></use>
      </svg>
      <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
        <use xlink:href="img/sprite.svg#logo-small"></use>
      </svg>
    </button>
  </header>
  <section class="result">
    <h2 class="result__title">${getWinStatus(stateFromGame3)}</h2>
  </section>`;

  contentRender(statsLayout);

  const resultSection = document.querySelector(`.result`);
  const previousResults = resultSection.querySelectorAll(`.result__table`);
  previousResults.forEach((result) => {
    resultSection.deleteElement(result);
  });

  for (let i = 0; i < results.length; i++) {
    resultSection.appendChild(createResultTable(i, results[i]));
  }

  const backButton = document.querySelector(`.back`);
  backButton.addEventListener(`click`, () => {
    renderGreeting();
  });
};

export default renderTotalStats;
