import Component from '../services/Component';

export function render(query: string, Component: Component) {
  const root = document.querySelector(query);

  root?.appendChild(Component.getContent());

  Component.dispatchComponentDidMount();

  return root;
}
