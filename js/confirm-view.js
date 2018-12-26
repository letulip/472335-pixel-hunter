import AbstractView from './abstract-view.js';
import {deleteElement} from './render-module.js';

const SECTION_ELEMENT = `section`;
const CONFIRM_CLASSLIST = [`modal`];

class ViewConfirm extends AbstractView {

  constructor(cb) {
    super();
    this.tag = SECTION_ELEMENT;
    this.classList = CONFIRM_CLASSLIST;
    this._cb = cb;
  }

  get template() {
    return `
    <form class="modal__inner">
      <button class="modal__close" type="button">
        <span class="visually-hidden">Закрыть</span>
      </button>
      <h2 class="modal__title">Подтверждение</h2>
      <p class="modal__text">Вы уверены что хотите начать игру заново?</p>
      <div class="modal__button-wrapper">
        <button class="modal__btn">Ок</button>
        <button class="modal__btn">Отмена</button>
      </div>
    </form>`;
  }

  bind() {
    const closeBtn = this.element.querySelector(`.modal__close`);
    const cancelBtn = this.element.querySelector(`.modal__btn:last-child`);
    const okBtn = this.element.querySelector(`.modal__btn`);

    const cancelHandler = (evt) => {
      evt.preventDefault();
      deleteElement(this.element);
    };

    closeBtn.addEventListener(`click`, cancelHandler);
    cancelBtn.addEventListener(`click`, cancelHandler);
    okBtn.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this._cb();
      deleteElement(this.element);
    });
  }
}

export default ViewConfirm;
