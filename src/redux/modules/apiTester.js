// const APIREQUEST = 'redux-example/widgets/SAVE_SUCCESS';
// const APIREQUEST_FAIL = 'redux-example/widgets/APIREQUEST_FAIL';
const SAVE_SUCCESS = 'redux-example/widgets/SAVE_SUCCESS';
const SAVE_FAIL = 'redux-example/widgets/SAVE_FAIL';

const initialState = {
  response: {}
};

export default function reducer(state = initialState, action = {}) {
  console.log('entered here');
  switch (action.type) {

    case SAVE_SUCCESS:
      console.log(state, action);
      return state;

    case SAVE_FAIL:
      console.log(state, action);
      return state;
    default:
      // console.log('default reducer');
      return state;
  }
}

export function request(data) {
  return {
    types: [SAVE_SUCCESS, SAVE_FAIL],
    promise: (client) => client.post(data.path, {
      data: data.body
    })
  };
}
