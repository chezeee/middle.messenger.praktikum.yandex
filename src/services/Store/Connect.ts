import { StateModel } from '../../models/StateModel';
import Component, { ComponentProps } from '../Component';
import { store, StoreEvents } from './Store';

export type ComponentWithStoreProps = ComponentProps & Partial<StateModel>;

export const Connect = (
  Block: typeof Component,
  mapStateToProps: (state: StateModel) => Record<string, unknown>
) => {
  return class extends Block {
    constructor(
      tagName?: keyof HTMLElementTagNameMap,
      propsAndChildren: ComponentWithStoreProps = {}
    ) {
      super(tagName, {
        ...propsAndChildren,
        ...mapStateToProps(store.getState()),
      });

      store.on(StoreEvents.Updated, () => {
        this.setProps({ ...mapStateToProps(store.getState()) });
      });
    }
  };
};
