import Component from './Component';
import { expect } from 'chai';
import Sinon, { spy } from 'sinon';

describe('Component', () => {
  let component: Component;

  beforeEach(() => {
    component = new Component();
  });

  it('should be created new component entity when declaring with "new"', () => {
    expect(component).to.be.an.instanceof(Component);
  });

  it('should set props correctly', () => {
    component.setProps({ name: 'test' });

    expect(component.props).haveOwnProperty('name').equal('test');
  });

  it('should get content correctly', () => {
    expect(component.getContent()).to.equal(component.element);
  });

  it('should add event correctly', () => {
    const click = Sinon.stub();

    component.setProps({ name: 'test', events: { click } });
    component.show();
    component.element?.dispatchEvent(new MouseEvent('click'));
    component.setProps({ events: {} });

    expect(click.callCount).to.equal(1);
  });

  it('should call the method "componentDidUpdate" only once', () => {
    component.setProps({ name: 'test1', content: '1' });
    const spyFunc = spy(component, 'componentDidUpdate');
    component.setProps({ name: 'test2' });

    expect(spyFunc.calledOnce).to.be.true;
  });

  it('should call the method "render" 2 times', () => {
    const newComponent = new Component('div', { content: 'test' });
    const spyFunc = spy(newComponent, 'render');
    newComponent.show();
    newComponent.setProps({ content: 'test test' });

    expect(spyFunc.callCount).to.equal(2);
  });
});
