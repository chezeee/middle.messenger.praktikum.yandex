# Web-messenger

## Описание

Данный проект представляет из себя SPA для обмена сообщенями с другими пользователями по протоколу WebSocket.

Проект основан на реактивных компонентах с реализацией классов базового компонента, EventBus, Store (хранилища данных), Router, передачи данных по HTTP и WebSocket.

В данной версии настроены тесты с использованием Mocha, Chai и Sinon для роутера, базового компонента, модуля отправки запросов.

Проект развернут на хостинге Netlify.

## Версия

Версия веб-приложения: **_1.0.0_**

## Технологии, используемые в процессе; разработки:

- **TypeScript**
- **Vite**
- **Handlebars**
- **SCSS**
- **HTTP**
- **WebSocket**
- **Express**
- **Netlify**
- **ESLint**
- **StyleLint**
- **Mocha**
- **Chai**
- **Sinon**
- **Husky**

## Дизайн

**Ссылка на макет дизайна прототипа в Figma:**

<https://www.figma.com/file/K0neyWuWIICfWvj6dpIRyg/MyChat_YP?type=design&node-id=0%3A1&mode=design&t=lozDhFoWS0WPqZrN-1>

## **Развертывание приложения из GitHub на хостинге Netlify**

**Проект доступен для ознакомления по следующей ссылке:**

<https://yp-messenger.netlify.app>

### **URL страниц:**

- <https://yp-messenger.netlify.app/> - страница авторизации пользователя
- <https://yp-messenger.netlify.app/sign-up> - страница регистрации пользователя
- <https://yp-messenger.netlify.app/messenger> - страница c списком чатом и лентой переписки
- <https://yp-messenger.netlify.app/settings> - страница c информацией о пользователе
- <https://yp-messenger.netlify.app/settings/profile-edit> - страница для изменения данных пользователя
- <https://yp-messenger.netlify.app/settings/password-edit> - страница для смены пароля пользователя
- <https://yp-messenger.netlify.app/error404> - страница с ошибкой 404
- <https://yp-messenger.netlify.app/error500> - страница с ошибкой 500

## **Установка и использование проекта локально**

`git clone https://github.com/chezeee/middle.messenger.prakticum.yandex.git` - клонирование проекта в локальный репозиторий;

`npm i` — установка зависимостей;

`npm run dev` — сборка и запуск на 3000 порту версии для разработчика;

`npm run build` — сборка стабильной версии.

`npm run lint` - запускают проверки eslint и stylelint

`npm run test` - запускает тесты

Также в проекте настроен и используется хук **precommit** (Husky), который выполняется перед `git commit` и запускает **lint-staged** и **test**.

### **URL страниц для просмотра в режиме разработки**

- <http://localhost:3000/> - страница авторизации пользователя
- <http://localhost:3000/sign-up> - страница регистрации пользователя
- <http://localhost:3000/messenger> - страница c списком чатом и лентой переписки
- <http://localhost:3000/settings> - страница c информацией о пользователе
- <http://localhost:3000/settings/profile-edit> - страница для изменения данных пользователя
- <http://localhost:3000/settings/password-edit> - страница для смены пароля пользователя
- <http://localhost:3000/error404> - страница с ошибкой 404
- <http://localhost:3000/error500> - страница с ошибкой 500
