import {
  FETCH_BRANDPRODUCT_FAILURE,
  FETCH_BRANDPRODUCT_REQUEST,
  FETCH_BRANDPRODUCT_SUCCESS,
} from "../actions/brandproductActions";

const initialState = {
    loading: false,
    brandproduct: [],
    error: null,
  };

const brandproductReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_BRANDPRODUCT_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FETCH_BRANDPRODUCT_SUCCESS:
        return {
          ...state,
          loading: false,
          brandproduct: action.payload,
        };
      case FETCH_BRANDPRODUCT_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default brandproductReducer;
  