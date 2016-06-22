const ADD_COMPONENT = 'componentBuilder/ADD_COMPONENT';
const DELETE_COMPONENT = 'componentBuilder/DELETE_COMPONENT';
const UPDATE_COMPONENT = 'componentBuilder/UPDATE_COMPONENT';
const START_TO_EDIT_COMPONENT = 'componentBuilder/START_TO_EDIT_COMPONENT';

let count = 0;

const initialState = {
  sandboxValue: {
    componentId: '123',
    component: 'div',
    children: [
      {
        componentId: '456',
        component: 'MyButton',
        bsStyle: 'primary',
        children: 'OK'
      },
      {
        componentId: '789',
        component: 'MyButton',
        bsStyle: 'danger',
        children: 'Cancel'
      },
    ]
  },
  editingComponentPropTypes: {},
  editingComponentProps: {}
};

function _deleteComponent(schema, componentId) {
  return {
    ...schema,
    children: !schema.children || typeof schema.children === 'string' ? schema.children :
      schema.children.filter(item => item.componentId !== componentId)
      .map(item => {
        return _deleteComponent(item, componentId);
      })
  };
}

function _updateComponent(schema, componentId, component) {
  return {
    ...schema,
    children: !schema.children || typeof schema.children === 'string' ? schema.children :
      schema.children
      .map(item => {
        if ( item.componentId === componentId) {
          Object.assign(item, component);
        }
        return _updateComponent(item, componentId);
      })
  };
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ADD_COMPONENT:
      const {
        component,
      } = action;
      const newComponent = {
        componentId: (count++).toString(),
        ...component
      };
      return {
        ...state,
        sandboxValue: {
          ...state.sandboxValue,
          children: [...state.sandboxValue.children, newComponent],
        }
      };
    case DELETE_COMPONENT:
      return {
        ...state,
        sandboxValue: _deleteComponent(state.sandboxValue, action.componentId)
      };
    case UPDATE_COMPONENT:
      return {
        ...state,
        sandboxValue: _updateComponent(state.sandboxValue, action.componentId, action.component)
      };
    case START_TO_EDIT_COMPONENT:
      return {
        ...state,
        editingComponentProps: action.componentProps,
        editingComponentPropTypes: action.componentPropTypes
      };
    default:
      return state;
  }
}

export function addComponent(component) {
  return {
    type: ADD_COMPONENT,
    component
  };
}

export function updateComponent(componentId, component) {
  return {
    type: UPDATE_COMPONENT,
    componentId,
    component
  };
}

export function deleteComponent(componentId) {
  console.log(`deleteComponent ${componentId}`);
  return {
    type: DELETE_COMPONENT,
    componentId
  };
}

export function startToEditComponent({componentProps, componentPropTypes}) {
  return {
    type: START_TO_EDIT_COMPONENT,
    componentProps,
    componentPropTypes
  };
}
