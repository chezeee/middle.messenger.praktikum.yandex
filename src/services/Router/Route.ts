import { render } from '../../utils/renderDOM';
import Component, { ComponentProps } from '../Component';

function isEqual(lhs: unknown, rhs: unknown) {
  return lhs === rhs;
}

export type RouteComponent = new (props?: ComponentProps) => Component;

export default class Route {
  _pathname: string;
  _blockClass: RouteComponent;
  _block: InstanceType<RouteComponent> | null;
  _rootQuery: string;
  _props?: ComponentProps;

  constructor(
    pathname: string,
    view: RouteComponent,
    rootQuery: string,
    props?: ComponentProps
  ) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
    this._rootQuery = rootQuery;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string) {
    return isEqual(pathname.split('?')[0], this._pathname);
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass(this._props);
    }

    render(this._rootQuery, this._block);
    return;
  }
}
