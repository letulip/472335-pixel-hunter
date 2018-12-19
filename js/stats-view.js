import {statsRender, createLayoutElement} from './render-module.js';
import {countPoints} from './state.js';
import AbstractView from './abstract-view.js';

const getWinStatus = (answers) => {
  let winStatus = ``;
  if (answers.length === 10) {
    winStatus = `Победа!`;
  } else {
    winStatus = `Не в этот раз, попробуй еще!`;
  }
  return winStatus;
};

const createResultTable = (number, resultElement) => {
  const POINTS = {
    TOTAL: countPoints(resultElement.answers, resultElement.lives),
    BONUS: 50,
    SLOW: -50,
    COMMON: 100,

  };
  const TOTAL_LIVES = resultElement.lives < 0 ? 0 : resultElement.lives;

  let resultWin = `
    <td class="result__points">× 100</td>
    <td class="result__total">${POINTS.TOTAL.correctAnswers * POINTS.COMMON}</td>
  </tr>
  <tr>
    <td></td>
    <td class="result__extra">Бонус за скорость:</td>
    <td class="result__extra">${POINTS.TOTAL.fastAnswers} <span class="stats__result stats__result--fast"></span></td>
    <td class="result__points">× 50</td>
    <td class="result__total">${POINTS.TOTAL.fastAnswers * POINTS.BONUS}</td>
  </tr>
  <tr>
    <td></td>
    <td class="result__extra">Бонус за жизни:</td>
    <td class="result__extra">${TOTAL_LIVES} <span class="stats__result stats__result--alive"></span></td>
    <td class="result__points">× 50</td>
    <td class="result__total">${TOTAL_LIVES * POINTS.BONUS}</td>
  </tr>
  <tr>
    <td></td>
    <td class="result__extra">Штраф за медлительность:</td>
    <td class="result__extra">${POINTS.TOTAL.slowAnswers} <span class="stats__result stats__result--slow"></span></td>
    <td class="result__points">× 50</td>
    <td class="result__total">${POINTS.TOTAL.slowAnswers * POINTS.SLOW}</td>
  </tr>
  <tr>
    <td colspan="5" class="result__total  result__total--final">${POINTS.TOTAL.points}</td>
  </tr>
</table>`;

  const resultFalse = `
    <td class="result__total"></td>
    <td class="result__total  result__total--final">fail</td>
  </tr>
</table>`;

  let statsContent = `
  <table class="result__table">
    <tr>
      <td class="result__number">${number + 1}.</td>
      <td colspan="2">
        <ul class="stats">
        </ul>
      </td>
      ${(POINTS.TOTAL !== -1) ? resultWin : resultFalse}
    `;
  const resultTable = createLayoutElement(`table`, statsContent, [`result__table`]);
  statsRender(resultElement.answers, resultTable);
  return resultTable;
};

class ViewStats extends AbstractView {
  constructor(model) {
    super();
    this.tag = `div`;
    this.results = model;
  }

  get template() {
    const STATS = `
    <section class="result">
      <h2 class="result__title">${getWinStatus(this.results[this.results.length - 1]._state.answers)}</h2>
    </section>`;

    return STATS;
  }

  bind() {

    const resultSection = this.element.querySelector(`.result`);
    const previousResults = resultSection.querySelectorAll(`.result__table`);
    previousResults.forEach((result) => {
      resultSection.deleteElement(result);
    });

    this.results.forEach((result, index) => {
      resultSection.appendChild(createResultTable(index, result._state));
    });
  }
}

export default ViewStats;
