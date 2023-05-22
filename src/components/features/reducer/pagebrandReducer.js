import {
  FETCH_PAGEBRAND_FAILURE,
  FETCH_PAGEBRAND_REQUEST,
  FETCH_PAGEBRAND_SUCCESS,
} from "../actions/pagebrandActions";

const initialState = {
  loading: false,
  brandProduct: [],
  error: null,
};



const pagebrandReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_PAGEBRAND_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FETCH_PAGEBRAND_SUCCESS:
        return {
          ...state,
          loading: false,
          brandProduct: action.payload.brandProduct,

        };
      case FETCH_PAGEBRAND_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };

  export default pagebrandReducer;
