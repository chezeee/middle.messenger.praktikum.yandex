import Component from '../services/Component';

export function render(query: string, Component: Component) {
  const root = document.querySelector(query);
  
  if (root) {
    root.innerHTML = "";
    root.appendChild(Component.getContent());
  }

  Component.dispatchComponentDidMount();

  return root;
}
