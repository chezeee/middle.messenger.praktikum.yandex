/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect } from 'chai';
import Component from '../Component';
import router from './Router';
import sinon from 'sinon';

describe('Router', () => {
  let pushStateStub: any;
  let backStub: any;
  let forwardStub: any;

  class TestComponent1 extends Component {
    constructor() {
      super('section', {});
    }
    render() {
      return this.compile('', this.props);
    }
  }

  class TestComponent2 extends Component {
    constructor() {
      super('section', {});
    }
    render() {
      return this.compile('', this.props);
    }
  }

  beforeEach(() => {
    pushStateStub = sinon.stub(window.history, 'pushState');
    backStub = sinon.stub(window.history, 'back');
    forwardStub = sinon.stub(window.history, 'forward');

    if (router) {
      router.use('/test1', TestComponent1).use('/test2', TestComponent2);
    }
  });

  afterEach(() => {
    pushStateStub.restore();
    backStub.restore();
    forwardStub.restore();

    window.history.pushState({}, '/');
  });

  it('should start and handle the current route', () => {
    router.start();
    expect(router.currentRoute).to.be.null;
  });

  it('should contain the correct number of routes after use()', () => {
    expect(router.routes.length).to.be.equal(4);
  });

  it('should change the state of the transition history', () => {
    router.go('/test2');
    router.go('/test1');

    expect(history.length).to.be.equal(3);
  });

  it('should find a route using getRoute()', () => {
    const route = router.getRoute('/test2');

    expect(route?.pathname).to.equal('/test2');
  });

  it('should handle backward navigation', () => {
    router.go('/test1');
    router.go('/test2');
    router.back();

    expect(backStub.calledOnce).to.be.true;
  });

  it('should handle forward navigation', () => {
    router.go('/test1');
    router.go('/test2');
    router.forward();

    expect(forwardStub.calledOnce).to.be.true;
  });

  it('should return to the last page after using the back - forward navigation', () => {
    router.go('/test1');
    router.go('/test2');

    router.back;
    router.forward();

    expect(router.currentRoute?.pathname).to.equal('/test2');
  });
});
