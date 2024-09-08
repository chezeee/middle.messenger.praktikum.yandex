import { expect } from 'chai';
import Route, { RouteComponent } from './Route';

describe('Route', () => {
  let route: Route;
  let TestComponent: RouteComponent;

  it('should return the correct path', () => {
    route = new Route('/test', TestComponent, '', {});

    expect(route.pathname).to.be.equal('/test');
  });

  describe('Route methods', () => {
    it('should check path matching correctly', () => {
      route = new Route('/test', TestComponent, '', {});

      const testPath = '/test?a=1&b=2';

      expect(route.match(testPath)).to.equal(true);
    });
  });
});
