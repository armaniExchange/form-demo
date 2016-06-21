const ADD_COMPONENT = 'componentBuilder/ADD_COMPONENT';
const DELETE_COMPONENT = 'componentBuilder/DELETE_COMPONENT';
const UPDATE_COMPONENT = 'componentBuilder/UPDATE_COMPONENT';
const START_TO_EDIT_COMPONENT = 'componentBuilder/START_TO_EDIT_COMPONENT';

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

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ADD_COMPONENT:
      return {
        ...state,
        sandboxValue: {
          ...state.sandboxValue,
          children: [...state.sandboxValue.children, action.component],
        }
      };
    case DELETE_COMPONENT:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      };
    case UPDATE_COMPONENT:
      return {
        ...state
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

export function startToEditComponent({componentProps, componentPropTypes}) {
  return {
    type: START_TO_EDIT_COMPONENT,
    componentProps,
    componentPropTypes
  };
}
