import { createStore, AnyAction } from 'redux';

// actions
export const ADD_DATA = 'ADD_DATA';

// initial state
interface AppState {
    data: Record<string, string>[];
}

const initialState: AppState = {
  data: [],
};

// reducer
const rootReducer = (state = initialState, action: AnyAction): AppState => {
  switch (action.type) {
    case ADD_DATA:
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

// store
const store = createStore(rootReducer);

export default store;