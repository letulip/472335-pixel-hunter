import ViewIntro from './intro.js';
import {contentRender, clearMainElement} from './renderModule.js';
import ViewGreeting from './greeting.js';
import ViewRules from './rules.js';
import ViewHeader from './header.js';
import {INITIAL_STATE_WITH_QUESTIONS} from './state.js';


const rules = new ViewRules(INITIAL_STATE_WITH_QUESTIONS);

const renderRules = () => {
  renderHeader();
  contentRender(rules.element, renderHeader);
};

const greeting = new ViewGreeting(renderRules);

const renderGreeting = () => {
  clearMainElement();
  contentRender(greeting.element);
};

const header = new ViewHeader(false, true, renderGreeting);

const renderHeader = () => {
  clearMainElement();
  contentRender(header.element);
};

const intro = new ViewIntro(renderGreeting);
contentRender(intro.element);
