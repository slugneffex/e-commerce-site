import {
  FETCH_BRANDPRODUCT_FAILURE,
  FETCH_BRANDPRODUCT_REQUEST,
  FETCH_BRANDPRODUCT_SUCCESS,
  SORT_BRANDPRODUCT,
} from "../actions/brandproductActions";

const initialState = {
  loading: false,
  brandproduct: [],
  brandname: [],
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
        brandproduct: action.payload.products.data,
        brandname: action.payload.brand,
      };
    case FETCH_BRANDPRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      case SORT_BRANDPRODUCT:
      const { brandproduct } = state;
      const sortOrder = action.payload;

      const sortedBrandproduct = [...brandproduct]; // Clone the brandproduct array

      sortedBrandproduct.sort((a, b) => {
        if (sortOrder === "highToLow") {
          return b.price - a.price;
        } else if (sortOrder === "lowToHigh") {
          return a.price - b.price;
        }
        return 0;
      });

      return {
        ...state,
        brandproduct: sortedBrandproduct,
      };
    default:
      return state;
  }
};

export default brandproductReducer;
