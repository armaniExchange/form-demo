export default function toJSX(schema, indent = 0) {
  const props = Object.assign({}, schema, {
    _isNew: null,
    component: null,
    componentId: null,
    editingComponentId: null,
    children: null
  });

  const indention = '\n' + ' '.repeat(indent * 2);
  const propsString = Object.keys(props).filter(prop=> props[prop] !== null)
  .map(prop => {
    let result = `${prop}=`;
    const value = props[prop];
    switch (typeof props[prop]) {
      case 'string':
        result += `"${value}"`;
        break;
      case 'number':
      case 'object':
      case 'bool':
      default:
        result += `{${value}}`;
    }
    return result;
  }).join(`${indention}`);

  if (!schema.children) {
    return `${indention}<${schema.component}${propsString} />`;
  }

  return `
${indention}<${schema.component}${propsString}>
${typeof schema.children === 'string' ?
  indention + '  ' + schema.children :
  schema.children.map(child=> toJSX(child, indent + 1)).join('')
}
${indention}</${schema.component}>
`;
}

