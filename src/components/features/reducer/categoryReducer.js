import {
  FETCH_CATEGORY_FAILURE,
  FETCH_CATEGORY_REQUEST,
  FETCH_CATEGORY_SUCCESS,
} from "../actions/categoryActions";

const initialState = {
  loading: false,
  banner:null,
  combo:null,
  product:null,
  error: null,
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        banner: action.payload.category,
        combo: action.payload.data.combos.data,
        product: action.payload.data.products.data,
        
      };
  
    case FETCH_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default categoryReducer;
