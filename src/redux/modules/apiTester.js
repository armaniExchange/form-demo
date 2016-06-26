const SAVE_SUCCESS = 'SAVE_SUCCESS';
const SAVE_FAIL = 'SAVE_FAIL';
const SAVE = 'SAVE';

const initialState = {};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SAVE:
      return {
        ...state,
        isLoading: true
      };

    case SAVE_SUCCESS:
      return {
        ...state,
        response: action.result
      };

    case SAVE_FAIL:
      return {
        ...state,
        error: true,
        response: {}
      };
    default:
      // console.log('default reducer');
      return state;
  }
}

export function request(data) {
  return {
    types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
    promise: (client) => client[data.method.toLowerCase()](data.path, {
      data: data.body
    })
  };
}
