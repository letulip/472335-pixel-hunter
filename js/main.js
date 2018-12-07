import ViewIntro from './intro.js';
import {contentRender} from './renderModule.js';
import ViewGreeting from './greeting.js';
import RULES from './rules.js';

const renderRules = () => {
  contentRender(RULES.element);
};

const greeting = new ViewGreeting(renderRules);

const renderGreeting = () => {
  contentRender(greeting.element);
};

const intro = new ViewIntro(renderGreeting);
contentRender(intro.element);
