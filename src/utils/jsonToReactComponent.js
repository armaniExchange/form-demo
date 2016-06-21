import React from 'react';

const allComponents = require('components');
const toComponent = (obj) => {
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
  console.log('children');
  console.log(children);
  const childrenComponent = !children || typeof children === 'string' ? obj : (children || []).map(toComponent);
  return React.createElement.apply(this, [reactComponent, obj, ...childrenComponent]);
};

export default toComponent;
