import React from 'react';
import connectToWrap from '../utils/wrapper';

const allComponents = require('components');
let wrappedComponents;
wrappedComponents = {};

const toComponent = (obj, enableWrap, props = {}) => {
  const {
    children,
    component
  } = obj;

  let reactComponent = component;
  if (typeof component === 'string') {
    const matchedComponent = allComponents[component];
    if (matchedComponent) {
      reactComponent = matchedComponent;
    }
  }
  if (enableWrap && obj.componentId !== 'root') {
    if (!wrappedComponents[component]) {
      wrappedComponents[component] = connectToWrap()(reactComponent);
    }
    reactComponent = wrappedComponents[component];
  }
  const childrenComponent = !children || typeof children === 'string' ? obj : (children || []).map(item => toComponent(item, enableWrap, props));
  return React.createElement.apply(this, [reactComponent, Object.assign({}, props, obj), ...childrenComponent]);
};

export default toComponent;
