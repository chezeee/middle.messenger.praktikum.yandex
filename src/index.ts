//@ts-nocheck

import Component from './services/Component';
import { render } from './utils/renderDOM';
import * as Pages from './pages';
import './style.scss';

const pages: Record<string, Component> = {
  login: Pages.LoginPage,
  registration: Pages.RegistrationPage,
  chat: Pages.ChatPage,
  profile: Pages.ProfilePage,
  passwordEdit: Pages.PasswordEditPage,
  profileEdit: Pages.ProfileEditPage,
  error404: [Pages.Error404],
  error500: [Pages.Error500],
};

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
      render('#app', pages['chat']);
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
