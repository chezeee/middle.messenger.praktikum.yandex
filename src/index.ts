//@ts-nocheck

import Component from './services/Component';
import { render } from './utils/renderDOM';
// import * as Components from './components';
// import { Container } from './components';
import * as Pages from './pages';
import './style.scss';

const pages: Record<string, Component> = {
  login: Pages.LoginPage,
  registration: Pages.RegistrationPage,
  chatList: [Pages.ChatList],
  profile: Pages.ProfilePage,
  passwordEdit: Pages.PasswordEditPage,
  profileEdit: Pages.ProfileEditPage,
  error404: [Pages.Error404],
  error500: [Pages.Error500],
};

// console.log('Container', Container);

// for (let key in Components) {
//   Handlebars.registerPartial(key, Components[key]);
// }

// Handlebars.registerPartial('Container', Container);

// const render = (page: string): void => {
//   // const [src, assets]: string[] = pages[page];

//   const app: HTMLElement = document.getElementById('app');
//   console.log('pages', pages);
//   app.appendChild(pages[page].getContent());
//   return; // const handlebars = Handlebars.compile(src);
//   // app.innerHTML = handlebars(assets);
//   // render('#app', handlebars(assets));
// };

document.addEventListener('DOMContentLoaded', (event) => {
  const path: string = event.target.location.pathname;
  switch (path) {
    case '/login': {
      render('#app', pages['login']);
      break;
    }
    case '/registration': {
      render('#app', pages['registration']);
      break;
    }
    case '/chat': {
      render('#app', pages['chatList']);
      break;
    }
    case '/profile': {
      render('#app', pages['profile']);
      break;
    }
    case '/password-edit': {
      render('#app', pages['passwordEdit']);
      break;
    }
    case '/profile-edit': {
      render('#app', pages['profileEdit']);
      break;
    }
    case '/error404': {
      render('#app', pages['error404']);
      break;
    }
    case '/error500': {
      render('#app', pages['error500']);
      break;
    }
    default: {
      window.location.pathname = '/login';
    }
  }
});
