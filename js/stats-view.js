import {statsRender, createLayoutElement} from './render-module.js';
import {countPoints} from './state.js';
import AbstractView from './abstract-view.js';

const getWinStatus = (state) => {
  let winStatus = ``;
  if (state.answers.length === 10) {
    winStatus = `Победа!`;
  } else {
    winStatus = `Не в этот раз, попробуй еще!`;
  }
  return winStatus;
};


const createResultTable = (number, resultElement) => {
  const TOTAL_POINTS = countPoints(resultElement.answers, resultElement.lives);
  const BONUS_POINTS = 50;
  const SLOW_POINTS = -50;
  const COMMON_POINTS = 100;
  const TOTAL_LIVES = resultElement.lives < 0 ? 0 : resultElement.lives;

  let resultWin = `
    <td class="result__points">× 100</td>
    <td class="result__total">${TOTAL_POINTS.correctAnswers * COMMON_POINTS}</td>
  </tr>
  <tr>
    <td></td>
    <td class="result__extra">Бонус за скорость:</td>
    <td class="result__extra">${TOTAL_POINTS.fastAnswers} <span class="stats__result stats__result--fast"></span></td>
    <td class="result__points">× 50</td>
    <td class="result__total">${TOTAL_POINTS.fastAnswers * BONUS_POINTS}</td>
  </tr>
  <tr>
    <td></td>
    <td class="result__extra">Бонус за жизни:</td>
    <td class="result__extra">${TOTAL_LIVES} <span class="stats__result stats__result--alive"></span></td>
    <td class="result__points">× 50</td>
    <td class="result__total">${TOTAL_LIVES * BONUS_POINTS}</td>
  </tr>
  <tr>
    <td></td>
    <td class="result__extra">Штраф за медлительность:</td>
    <td class="result__extra">${TOTAL_POINTS.slowAnswers} <span class="stats__result stats__result--slow"></span></td>
    <td class="result__points">× 50</td>
    <td class="result__total">${TOTAL_POINTS.slowAnswers * SLOW_POINTS}</td>
  </tr>
  <tr>
    <td colspan="5" class="result__total  result__total--final">${TOTAL_POINTS.points}</td>
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
      ${(TOTAL_POINTS !== -1) ? resultWin : resultFalse}
    `;
  const resultTable = createLayoutElement(`table`, statsContent, [`result__table`]);
  statsRender(resultElement.answers, resultTable);
  return resultTable;
};

class ViewStats extends AbstractView {
  constructor(state) {
    super();
    this.tag = `div`;
    this.state = state;
    this.results = [this.state];
  }

  get template() {
    const stats = `
    <section class="result">
      <h2 class="result__title">${getWinStatus(this.state)}</h2>
    </section>`;

    return stats;
  }

  bind() {

    const resultSection = this.element.querySelector(`.result`);
    const previousResults = resultSection.querySelectorAll(`.result__table`);
    previousResults.forEach((result) => {
      resultSection.deleteElement(result);
    });

    for (let i = 0; i < this.results.length; i++) {
      resultSection.appendChild(createResultTable(i, this.results[i]));
    }
  }
}

export default ViewStats;
