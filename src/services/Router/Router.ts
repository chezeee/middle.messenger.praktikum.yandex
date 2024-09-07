import Route, { RouteComponent } from './Route';

class Router {
  routes: Route[];
  history: History;
  currentRoute: Route | null;
  _rootQuery: string;

  constructor(rootQuery: string) {

    this.routes = [];
    this.history = window.history;
    this.currentRoute = null;
    this._rootQuery = rootQuery;
  }

  public use(
    pathname: string,
    block: RouteComponent,
    props?: Record<string, unknown>
  ) {
    const route = new Route(pathname, block, this._rootQuery, props);
    this.routes.push(route);
    return this;
  }

  public start() {
    this._onRoute(window.location.pathname);

    window.addEventListener('popstate', () => {
      this._onRoute(window.location.pathname);
    });
  }

  private _onRoute(pathname: string) {
    const route = this.getRoute(pathname);

    if (route) {
      this.currentRoute = route;
      route.render();
    }
  }

  public go(pathname: string) {
    this.history.pushState({ pathname }, '', pathname);
    this._onRoute(pathname);
  }

  public back() {
    this.history.back();
  }

  public forward() {
    this.history.forward();
  }

  public getRoute(pathname: string) {
    return (
      this.routes.find((route) => route.match(pathname)) ??
      this.routes.find((route) => route.match('*'))
    );
  }
}

const router = new Router('#app');
export default router;
