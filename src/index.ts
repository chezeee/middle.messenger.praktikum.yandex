import LoginPage from './pages/auth/login';
import RegistrationPage from './pages/auth/registration';
import ChatPage from './pages/chat';
import ProfilePage from './pages/profile';
import ProfileEditPage from './pages/profile-edit';
import PasswordEditPage from './pages/password-edit';
import Error404Page from './pages/errors/error404';
import Error500Page from './pages/errors/error404';
import router from './services/Router/Router';
import { getUserData } from './controllers/auth';

import './style.scss';

router
  .use('/', LoginPage)
  .use('/sign-up', RegistrationPage)
  .use('/messenger', ChatPage)
  .use('/settings', ProfilePage)
  .use('/settings/profile-edit', ProfileEditPage)
  .use('/settings/password-edit', PasswordEditPage)
  .use('/error404', Error404Page)
  .use('/error500', Error500Page)
  .start();

try {
  const user = await getUserData();
  if (
    (router.currentRoute?.pathname === '/' ||
      router.currentRoute?.pathname === '/sign-up') &&
    user
  ) {
    router.go('/messenger');
  }
} catch (err) {
  router.go('/');
}
