// import Component from './services/Component';
// import { render } from './utils/renderDOM';
// import * as Pages from './pages';
import LoginPage from './pages/auth/login';
import RegistrationPage from './pages/auth/registration';
import ChatPage from './pages/chat';
import ProfilePage from './pages/profile';
import ProfileEditPage from './pages/profile-edit';
import PasswordEditPage from './pages/password-edit';
import Error404Page from './pages/errors/error404';
import Error500Page from './pages/errors/error404';
import router from './services/Router/Router';
// import Store  from './services/Store/Store';
// import { StateModel } from './models/StateModel';
import './style.scss';

// const pages: Record<string, Component> = {
//   login: Pages.LoginPage,
//   registration: Pages.RegistrationPage,
//   chat: Pages.ChatPage,
//   profile: Pages.ProfilePage,
//   passwordEdit: Pages.PasswordEditPage,
//   profileEdit: Pages.ProfileEditPage,
//   error404: Pages.Error404Page,
//   error500: Pages.Error500Page,
// };

// declare global {
//   interface Window {
//     store: Store<StateModel>;
//   }

//   // type Nullable<T> = T | null;
// }

// const state = {
//   user: null,
//   chatId: null,
//   chats: [],
//   error: null,
// };

// window.store = new Store<StateModel>(state);

router
  .use('/', LoginPage)
  .use('/login', LoginPage)
  .use('/registration', RegistrationPage)
  .use('/messenger', ChatPage)
  .use('/settings', ProfilePage)
  .use('/settings/profile-edit', ProfileEditPage)
  .use('/settings/password-edit', PasswordEditPage)
  .use('/error404', Error404Page)
  .use('/error500', Error500Page)
  .start();

// if (router.getCurrentRoute() === '/' || '/login' || '/registration') {

// }

// document.addEventListener('DOMContentLoaded', (event: Event) => {
//   const path: string = (event.target as Window)?.location.pathname;
//   switch (path) {
//     case '/login': {
//       render('#app', pages['login']);
//       break;
//     }
//     case '/registration': {
//       render('#app', pages['registration']);
//       break;
//     }
//     case '/chat': {
//       render('#app', pages['chat']);
//       break;
//     }
//     case '/profile': {
//       render('#app', pages['profile']);
//       break;
//     }
//     case '/password-edit': {
//       render('#app', pages['passwordEdit']);
//       break;
//     }
//     case '/profile-edit': {
//       render('#app', pages['profileEdit']);
//       break;
//     }
//     case '/error404': {
//       render('#app', pages['error404']);
//       break;
//     }
//     case '/error500': {
//       render('#app', pages['error500']);
//       break;
//     }
//     default: {
//       window.location.pathname = '/login';
//     }
//   }
// });
