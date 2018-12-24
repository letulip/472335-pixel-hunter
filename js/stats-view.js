import {statsRender, createLayoutElement} from './render-module.js';
import {countPoints} from './state.js';
import AbstractView from './abstract-view.js';

const OUT_OF_LIVES = -1;

const getWinStatus = (answers, lives) => {
  if (lives !== OUT_OF_LIVES) {
    return `Победа!`;
  }
  return `Не в этот раз, попробуй еще!`;
};

const createResultTable = (number, resultElement) => {
  const Points = {
    BONUS: 50,
    SLOW: -50,
    COMMON: 100,

  };
  const totalPoints = countPoints(resultElement.answers, resultElement.lives);
  const totalLives = resultElement.lives < 0 ? 0 : resultElement.lives;

  const resultWin = `
    <td class="result__points">× 100</td>
    <td class="result__total">${totalPoints.correctAnswers * Points.COMMON}</td>
  </tr>
  <tr>
    <td></td>
    <td class="result__extra">Бонус за скорость:</td>
    <td class="result__extra">${totalPoints.fastAnswers} <span class="stats__result stats__result--fast"></span></td>
    <td class="result__points">× 50</td>
    <td class="result__total">${totalPoints.fastAnswers * Points.BONUS}</td>
  </tr>
  <tr>
    <td></td>
    <td class="result__extra">Бонус за жизни:</td>
    <td class="result__extra">${totalLives} <span class="stats__result stats__result--alive"></span></td>
    <td class="result__points">× 50</td>
    <td class="result__total">${totalLives * Points.BONUS}</td>
  </tr>
  <tr>
    <td></td>
    <td class="result__extra">Штраф за медлительность:</td>
    <td class="result__extra">${totalPoints.slowAnswers} <span class="stats__result stats__result--slow"></span></td>
    <td class="result__points">× 50</td>
    <td class="result__total">${totalPoints.slowAnswers * Points.SLOW}</td>
  </tr>
  <tr>
    <td colspan="5" class="result__total  result__total--final">${totalPoints.points}</td>
  </tr>
</table>`;

  const resultFalse = `
    <td class="result__total"></td>
    <td class="result__total  result__total--final">fail</td>
  </tr>
</table>`;

  const statsContent = `
  <table class="result__table">
    <tr>
      <td class="result__number">${number + 1}.</td>
      <td colspan="2">
        <ul class="stats">
        </ul>
      </td>
      ${(totalPoints !== -1) ? resultWin : resultFalse}
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
    return `
    <section class="result">
      <h2 class="result__title">${getWinStatus(this.results[this.results.length - 1]._state.answers, this.results[this.results.length - 1]._state.lives)}</h2>
    </section>`;
  }

  bind() {

    const resultSection = this.element.querySelector(`.result`);
    const previousResults = resultSection.querySelectorAll(`.result__table`);
    previousResults.forEach((result) => {
      resultSection.deleteElement(result);
    });

    this.results.reverse().forEach((result, index) => {
      resultSection.appendChild(createResultTable(index, result._state));
    });
  }
}

export default ViewStats;
