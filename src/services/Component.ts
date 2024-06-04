import { v4 } from 'uuid';
import Handlebars from 'handlebars';
import EventBus from './EventBus';

type ObjectTypes = Record<string, unknown>;
type Events = Record<string, (event: Event | never) => void>;

export type ComponentProps = ObjectTypes & {
  events?: Events;
  attrs?: { class?: string } & Record<string, string>;
};

export default class Component {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_RENDER: 'flow:render',
    FLOW_CDU: 'flow:component-did-update',
  };

  props: ComponentProps;

  _children: ObjectTypes;

  _lists: ObjectTypes;

  _element: HTMLElement;

  _id: string;

  _eventBus: EventBus;

  _tagName: keyof HTMLElementTagNameMap;

  constructor(
    tagName: keyof HTMLElementTagNameMap = 'div',
    propsAndChilds: ComponentProps = {}
  ) {
    const { props, children, lists } = this._getChildren(propsAndChilds);
    this._eventBus = new EventBus();
    this._tagName = tagName;
    this._id = v4();
    this.props = this._makePropsProxy({ ...props, id: this._id });
    this._children = this._makePropsProxy(children);
    this._lists = this._makePropsProxy(lists);
    this._registerEvents(this._eventBus);
    this._eventBus.emit(Component.EVENTS.INIT);
  }

  get element() {
    return this._element;
  }

  _getChildren(propsAndChilds: ObjectTypes) {
    const props: ObjectTypes = {};
    const children: Record<string, Component> = {};
    const lists: ObjectTypes = {};

    Object.entries(propsAndChilds).forEach(([key, value]) => {
      if (value instanceof Component) {
        children[key] = value;
      } else if (Array.isArray(value)) {
        lists[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { props, children, lists };
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Component.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Component.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Component.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(Component.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
  }

  _createResources() {
    const element = this._createDocumentElement(this._tagName);
    this._element = element;
  }

  init() {
    this._createResources();
    this._eventBus.emit(Component.EVENTS.FLOW_RENDER);
  }

  _componentDidMount() {
    this.componentDidMount();

    Object.values(this._children).forEach((child: Component) => {
      child.dispatchComponentDidMount();
    });
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidMount() {}

  dispatchComponentDidMount() {
    this._eventBus.emit(Component.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(oldProps: ComponentProps, newProps: ComponentProps) {
    const response = this.componentDidUpdate(oldProps, newProps);

    if (!response) {
      return;
    }
    this._render();
  }

  // Может переопределять пользователь, необязательно трогать

  componentDidUpdate(oldProps: ComponentProps, newProps: ComponentProps) {
    if (oldProps !== newProps) {
      this._eventBus.emit(Component.EVENTS.FLOW_RENDER);
      return true;
    }

    return false;
  }

  setProps = (nextProps: ComponentProps) => {
    if (!nextProps) {
      return;
    }

    const { props, children, lists } = this._getChildren(nextProps);

    if (Object.values(props).length) {
      this.props = Object.assign(this.props, props);
    }
    if (Object.values(lists).length) {
      this._lists = Object.assign(this._lists, lists);
    }
    if (Object.values(children).length) {
      this._children = Object.assign(this._children, children);
    }
  };

  addAttribute() {
    if (this.props.attr) {
      Object.entries(this.props.attr).forEach(
        ([key, value]: [string, string]) => {
          this._element.setAttribute(key, value);
        }
      );
    }
  }

  _addEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      this._element.addEventListener(eventName, events[eventName]);
    });
  }

  _removeEvents() {
    const { events } = this.props;

    if (events) {
      Object.keys(events).forEach((eventName) => {
        this._element.removeEventListener(eventName, events[eventName]);
      });
    }
  }

  compile(template: string, props?: ComponentProps) {
    const propsAndStubs = props ? { ...props } : { ...this.props };

    Object.entries(this._children).forEach(
      ([key, child]: [string, Component]) => {
        propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
      }
    );

    Object.keys(this._lists).forEach((key) => {
      propsAndStubs[key] = `<div data-id="${key}"></div>`;
    });

    const fragment = this._createDocumentElement(
      'template'
    ) as HTMLTemplateElement;
    fragment.innerHTML = Handlebars.compile(template)(propsAndStubs);

    Object.values(this._children).forEach((child: Component) => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);

      stub?.replaceWith(child.getContent());
    });

    Object.entries(this._lists).forEach(
      ([key, item]: [string, Component[]]) => {
        const stub = fragment.content.querySelector(`[data-id="${key}"]`);

        if (!stub) {
          return;
        }

        const listContent = this._createDocumentElement(
          'template'
        ) as HTMLTemplateElement;
        item.forEach((item) => {
          listContent.content.appendChild(item.getContent());
        });
        stub.replaceWith(listContent.content);
      }
    );

    return fragment.content;
  }

  _render() {
    const component = this.render();

    this._removeEvents();
    this._element.innerHTML = '';
    this._element.appendChild(component);
    this.addAttribute();
    this._addEvents();
  }

  render() {
    return this.compile('');
  }

  getContent() {
    return this._element;
  }

  _makePropsProxy(props: ObjectTypes) {
    const updateValue = (oldValue: ObjectTypes, newValue: ObjectTypes) => {
      this._eventBus.emit(Component.EVENTS.FLOW_CDU, [oldValue, newValue]);
    };

    const proxy = new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop: string, value) {
        const oldValue: ObjectTypes = { ...target };
        target[prop] = value;
        updateValue(oldValue, target);

        return true;
      },
    });

    return proxy;
  }

  _createDocumentElement(tagName?: keyof HTMLElementTagNameMap): HTMLElement {
    return document.createElement(tagName || 'div');
  }

  show() {
    this.getContent().style.display = 'block';
  }

  hide() {
    this.getContent().style.display = 'none';
  }
}
