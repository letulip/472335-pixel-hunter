import {createLayoutElement} from './renderModule.js';

class AbstractView {
  constructor(level) {
    this.level = level;
  }

  template() {
    return ``;
  }

  render(tag, classList) {
    createLayoutElement(tag, this.template(), classList);
  }

  bind() {

  }

  element(element) {
    element.render();
    element.bind();
    return element;
  }
}

export default AbstractView;
