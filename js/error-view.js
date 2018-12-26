import AbstractView from './abstract-view.js';

const SECTION_ELEMENT = `section`;
const ERROR_CLASSLIST = [`modal`];

class ViewError extends AbstractView {

  constructor(error) {
    super();
    this.error = error;
    this.elementTag = SECTION_ELEMENT;
    this.elementClassList = ERROR_CLASSLIST;
  }

  get tag() {
    return this.elementTag;
  }

  get classList() {
    return this.elementClassList;
  }

  get template() {
    return `
      <div class="modal__inner">
        <h2 class="modal__title">Произошла ошибка!</h2>
        <p class="modal__text modal__text--error">${this.error.stack}</p>
      </div>`;
  }

}

export default ViewError;
