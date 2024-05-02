import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';

const pages = {
  login: [Pages.Login],
};

for (let [name, component] in Components) {
  Handlebars.registerPartial(name, component);
}

const nav = (page) => {
  const [src, assets] = pages[page];
  const handlebars = Handlebars.compile(src);
  document.getElementById('app').innerHTML = handlebars(assets);
};

document.addEventListener('DOMContentLoaded', (event) => {
  const path = event.target.location.pathname;

  switch (path) {
    case '/login': {
      nav('login');
      break;
    }
    default: {
      window.location.pathname = '/login';
    }
  }
});
