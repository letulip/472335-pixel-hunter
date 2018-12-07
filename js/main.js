import ViewIntro from './intro.js';
import {contentRender, clearMainElement} from './renderModule.js';
import ViewGreeting from './greeting.js';
import ViewRules from './rules.js';
import ViewHeader from './header.js';
import {INITIAL_STATE_WITH_QUESTIONS} from './state.js';

const header = new ViewHeader(false, true);
const rules = new ViewRules(INITIAL_STATE_WITH_QUESTIONS);
const renderRules = () => {
  clearMainElement();
  contentRender(header.element);
  contentRender(rules.element);
};

const greeting = new ViewGreeting(renderRules);

const renderGreeting = () => {
  clearMainElement();
  contentRender(greeting.element);
};

const intro = new ViewIntro(renderGreeting);
contentRender(intro.element);
