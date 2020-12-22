import * as types from '../types';

const initialState = {
  data: [],
  recently_viewed: [],
  loading: false,
  error: false,
  errorMessage: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_PRODUCTS:
      return {
        ...state,
        loading: true,
        data: [],
      };
    case types.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
        error: false,
        errorMessage: '',
      };
    case types.FETCH_PRODUCTS_FAILED:
      return {
        ...state,
        loading: false,
        data: [],
        error: true,
        errorMessage: action.error,
      };
    case 'PUSH_RECENTLY_VIEWED':
      return {
        ...state,
        recently_viewed: state.recently_viewed
          .filter(f => f !== action.data)
          .concat([action.data]),
      };
    default:
      return state;
  }
};

export default reducer;
