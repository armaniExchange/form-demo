import React from 'react';

const allComponents = require('components');
const toComponent = (obj, props = {}) => {
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
  const childrenComponent = !children || typeof children === 'string' ? obj : (children || []).map(item => toComponent(item, props));
  return React.createElement.apply(this, [reactComponent, Object.assign({}, props, obj), ...childrenComponent]);
};

export default toComponent;
