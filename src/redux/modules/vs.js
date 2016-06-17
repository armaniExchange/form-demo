const SAVE_UI = 'SAVE_UI';


const initialState = {
  uiData: ['react', 'angular'],
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {

    case SAVE_UI:
      // console.log(action.uiData, action, 'at vs reducer');
      return {
        ...state,
        uiData: action.uiData
      };

    default:
      // console.log('default reducer');
      return state;
  }
}

export function saveUI(data) {
  // console.log('UI Data', data);
  return {
    type: SAVE_UI,
    uiData: data
    // promise: (client) => client.post('/form/save', {
    //   data
    // })
  };
}
