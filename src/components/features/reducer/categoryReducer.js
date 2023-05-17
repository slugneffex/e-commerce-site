import {
  FETCH_CATEGORY_FAILURE,
  FETCH_CATEGORY_REQUEST,
  FETCH_CATEGORY_SUCCESS,
  UPDATED_CATEGORY
} from "../actions/categoryActions";

const initialState = {
  loading: false,
  category: [],
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
        category: action.payload,
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
