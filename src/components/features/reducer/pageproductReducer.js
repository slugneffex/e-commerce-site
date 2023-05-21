import {
  FETCH_PAGEPRODUCT_FAILURE,
  FETCH_PAGEPRODUCT_REQUEST,
  FETCH_PAGEPRODUCT_SUCCESS,
} from "../actions/pageproductActions";


const initialState = {
    loading: false,
    banner: [],
    combo:[],
    product:[],
    brandId:[],
    categoriesId:[],
    error: null,
  };

  const pageproductReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_PAGEPRODUCT_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
  
      case FETCH_PAGEPRODUCT_SUCCESS:
        return {
          ...state,
          loading: false,
          banner: action.payload,
          combo: action.payload.combos,
          product: action.payload.product,
          brandId: action.payload.brands,
          categoriesId: action.payload.categories,
          
        };
    
      case FETCH_PAGEPRODUCT_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default pageproductReducer;
  