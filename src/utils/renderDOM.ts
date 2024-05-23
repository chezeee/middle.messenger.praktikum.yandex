import Component from '../services/Component';

export function render(query: string, Component: Component) {
  const root = document.querySelector(query);

  // Можно завязаться на реализации вашего класса Block
  root?.appendChild(Component.getContent());

  Component.dispatchComponentDidMount();

  return root;
}
