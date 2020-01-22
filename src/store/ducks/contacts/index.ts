import { Reducer } from 'redux';
import { ContactsState, ContactTypes } from './types';

const INITIAL_STATE: ContactsState = {
  list: [],
  error: false,
  loading: false,
};

const reducer: Reducer<ContactsState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ContactTypes.LOAD_REQUEST:
      return { ...state, loading: true };
    case ContactTypes.LOAD_SUCCESS:
      return {
        ...state, loading: false, error: false, list: action.payload,
      };
    case ContactTypes.LOAD_FAILED:
      return {
        ...state, loading: false, error: true, data: [],
      };
    default:
      return state;
  }
};

export default reducer;
