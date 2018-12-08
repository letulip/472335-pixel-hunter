import ViewIntro from './intro.js';
import {contentRender, clearMainElement} from './renderModule.js';
import ViewGreeting from './greeting.js';
import ViewRules from './rules.js';
import ViewHeader from './header.js';
import {INITIAL_STATE_WITH_QUESTIONS} from './state.js';
import renderGameState from './game.js';
import ViewStats from './stats.js';

const renderRules = () => {
  renderHeader();
  contentRender(rules.element);
};

const renderGameCB = (state) => {
  renderGameState(state, renderGreeting, renderStatsCB);
};

const greeting = new ViewGreeting(renderRules);

const renderGreeting = () => {
  clearMainElement();
  contentRender(greeting.element);
};

const header = new ViewHeader(false, renderGreeting);

const renderHeader = () => {
  clearMainElement();
  contentRender(header.element);
};

const renderStatsCB = (state) => {
  const stats = new ViewStats(state);
  contentRender(stats.element);
};

const rules = new ViewRules(INITIAL_STATE_WITH_QUESTIONS, renderGameCB);

const intro = new ViewIntro(renderGreeting);
contentRender(intro.element);
