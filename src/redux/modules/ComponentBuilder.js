import shortid from 'shortid';

const ADD_COMPONENT = 'componentBuilder/ADD_COMPONENT';
const DELETE_COMPONENT = 'componentBuilder/DELETE_COMPONENT';
const UPDATE_COMPONENT = 'componentBuilder/UPDATE_COMPONENT';
const MOVE_COMPONENT = 'componentBuilder/MOVE_COMPONENT';
const START_TO_EDIT_COMPONENT = 'componentBuilder/START_TO_EDIT_COMPONENT';
const STOP_EDITING_COMPONENT = 'componentBuilder/STOP_EDITING_COMPONENT';

const initialState = {
  sandboxValue: {
    componentId: 'root',
    component: 'Form',
    className: 'form-horizontal',
    style: {
      minHeight: 100
    },
    children: [
      {
        componentId: 'exampleA',
        component: 'Button',
        bsStyle: 'primary',
        children: 'OK'
      },
      {
        componentId: 'exampleB',
        component: 'Button',
        bsStyle: 'danger',
        children: 'Cancel'
      },
    ]
  },
  isEditingProps: false,
  editingComponentId: null,
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
        return _updateComponent(item, componentId, component);
      })
  };
}

function _moveComponent(schema, dragComponent, dropComponentId, isNew, asChild = false) {
  if (isNew && !dragComponent.componentId) {
    dragComponent.componentId = shortid.generate();
  }
  const modifiedChildren = !schema.children || typeof schema.children === 'string' ? schema.children :
    schema.children.filter(item => item.componentId !== dragComponent.componentId)
    .map(item => _moveComponent(item, dragComponent, dropComponentId, isNew, asChild))
    .reduce((prev, current) => {
      if (current.componentId === dropComponentId) {
        if (asChild) {
          current.children = current.children || [];
          current.children = [...current.children, dragComponent];
        } else {
          return [...prev, dragComponent, current];
        }
      } else if (current.componentId === dragComponent.id) {
        return prev;
      }
      return [...prev, current];
    }, []);
  return {
    ...schema,
    children: modifiedChildren
  };
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ADD_COMPONENT:
      const {
        component,
      } = action;
      const newComponent = {
        componentId: shortid.generate(),
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
    case MOVE_COMPONENT:
      return {
        ...state,
        sandboxValue: _moveComponent(state.sandboxValue, action.dragComponent, action.dropComponentId, action.isNew, action.asChild)
      };
    case START_TO_EDIT_COMPONENT:
      return {
        ...state,
        isEditingProps: true,
        editingComponentId: action.componentProps.componentId,
        editingComponentProps: action.componentProps,
        editingComponentPropTypes: action.componentPropTypes
      };
    case STOP_EDITING_COMPONENT:
      return {
        ...state,
        isEditingProps: false,
        editingComponentId: null
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

export function moveComponent(dragComponent, dropComponentId, isNew, asChild) {
  return {
    type: MOVE_COMPONENT,
    dragComponent,
    dropComponentId,
    isNew,
    asChild
  };
}


export function startToEditComponent({componentProps, componentPropTypes}) {
  return {
    type: START_TO_EDIT_COMPONENT,
    componentProps,
    componentPropTypes
  };
}

export function stopEditingComponent() {
  return {
    type: STOP_EDITING_COMPONENT
  };
}
