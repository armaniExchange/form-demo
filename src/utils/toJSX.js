export default function toJSX(schema, indent = 0) {
  const props = Object.assign({}, schema, {
    _isNew: null,
    component: null,
    componentId: null,
    editingComponentId: null,
    children: null
  });

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
        result += `{${value}}`
    }
    return result;
  }).join('\n');
  const indention = ' '.repeat(indent * 2);

  if (!schema.children) {
    return `\n${indention}<${schema.component} ${propsString} />`;
  }
  return `\n${indention}<${schema.component}${propsString ? ' ' + propsString : ''}>${
  typeof schema.children !== 'string' ?
    schema.children.map(child=> toJSX(child, indent + 1)).join('') : '\n' + indention + '  ' + schema.children
  }\n${indention}</${schema.component}>`;
}

