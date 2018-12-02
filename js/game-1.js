import {gameRender} from './renderModule.js';
import {addAnswer, setNextLevel, decreaseLives} from './state.js';

const checkedCounter = (list, state, answers, cb) => {
  let count = 0;
  let tempState = {};
  for (let i = 0; i < list.length; i++) {
    if (list[i].checked) {
      ++count;
      if (count === 2) {
        const lastAnswer = answers.pop();
        const prelastAnswer = answers.pop();
        const totalTime = lastAnswer.time + prelastAnswer.time;
        if (lastAnswer.isCorrect === true && prelastAnswer.isCorrect === true) {
          const totalAnswer = {
            time: totalTime,
            isCorrect: true
          };
          tempState = addAnswer(state, totalAnswer);
        } else {
          const totalAnswer = {
            time: totalTime,
            isCorrect: false
          };
          tempState = decreaseLives(addAnswer(state, totalAnswer));
        }
        cb(setNextLevel(tempState));
      }
    }
  }
};

const renderGame1 = (state, cb) => {

  const game1 = `
    <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
    <form class="game__content">
      <div class="game__option">
        <img src="${state.questions[state.level].options[0].src}" alt="Option 1" width="468" height="458">
        <label class="game__answer game__answer--photo">
          <input class="visually-hidden" name="question1" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer game__answer--paint">
          <input class="visually-hidden" name="question1" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
      <div class="game__option">
        <img src="${state.questions[state.level].options[1].src}" alt="Option 2" width="468" height="458">
        <label class="game__answer  game__answer--photo">
          <input class="visually-hidden" name="question2" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--paint">
          <input class="visually-hidden" name="question2" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
    </form>
    <ul class="stats">
    </ul>`;

  gameRender(game1, state);

  const answers = [];

  const inputsList = document.querySelectorAll(`input`);
  inputsList.forEach((input) => {
    input.addEventListener(`change`, () => {
      if (input.checked) {
        const timer = document.querySelector(`.game__timer`);
        const inputNumber = Array.from(input.name).pop() - 1;
        const answer = {
          time: timer.textContent,
          isCorrect: (input.value === state.questions[state.level].options[inputNumber].type)
        };
        answers.push(answer);
        checkedCounter(inputsList, state, answers, cb);
      }
    });
  });
};

export default renderGame1;
