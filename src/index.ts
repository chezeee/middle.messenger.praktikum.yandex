//@ts-nocheck
import './style.scss';
import Handlebars from 'handlebars';
import { render } from './utils/renderDOM';
import * as Components from './components';
import * as Pages from './pages';

const pages: Record<string, string[]> = {
  login: [Pages.Login],
  registration: [Pages.Registration],
  chatList: [Pages.ChatList],
  profile: [Pages.Profile],
  passwordEdit: [Pages.PasswordEdit],
  profileEdit: [Pages.ProfileEdit],
  error404: [Pages.Error404],
  error500: [Pages.Error500],
};

for (let key in Components) {
  Handlebars.registerPartial(key, Components[key]);
}

const nav = (page: string): void => {
  const [src, assets]: string[] = pages[page];
  const handlebars = Handlebars.compile(src);
  // const app: HTMLElement = document.getElementById('app');
  // app.innerHTML = handlebars(assets);
  render('#app', handlebars(assets));
};

document.addEventListener('DOMContentLoaded', (event) => {
  const path: string = event.target.location.pathname;
  switch (path) {
    case '/login': {
      nav('login');
      break;
    }
    case '/registration': {
      nav('registration');
      break;
    }
    case '/chat': {
      nav('chatList');
      break;
    }
    case '/profile': {
      nav('profile');
      break;
    }
    case '/password-edit': {
      nav('passwordEdit');
      break;
    }
    case '/profile-edit': {
      nav('profileEdit');
      break;
    }
    case '/error404': {
      nav('error404');
      break;
    }
    case '/error500': {
      nav('error500');
      break;
    }
    default: {
      window.location.pathname = '/login';
    }
  }
});
