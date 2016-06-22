const APIREQUEST = 'APIREQUEST';


const initialState = {

};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {

    case APIREQUEST:
      console.log(state, action);
      return state;
    default:
      // console.log('default reducer');
      return state;
  }
}

export function request(data) {
  return {
    type: APIREQUEST,
    promise: (client) => client.get(data.path)
  };
}
