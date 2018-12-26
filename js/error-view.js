import AbstractView from './abstract-view.js';

const SECTION_ELEMENT = `section`;
const ERROR_CLASSLIST = [`modal`];

class ViewError extends AbstractView {

  constructor(error) {
    super();
    this.error = error;
    this.tag = SECTION_ELEMENT;
    this.classList = ERROR_CLASSLIST;
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
