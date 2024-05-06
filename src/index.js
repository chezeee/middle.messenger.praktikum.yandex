import './style.scss';
import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';

const pages = {
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
