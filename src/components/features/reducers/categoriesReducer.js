const initialState = {
    categories: [],
    loading: false,
    error: null,
  };
  
  const categoriesReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_CATEGORIES_REQUEST':
        return {
          ...state,
          loading: true,
          error: null,
        };
      case 'FETCH_CATEGORIES_SUCCESS':
        return {
          ...state,
          loading: false,
          todos: action.payload,
        };
      case 'FETCH_CATEGORIES_FAILURE':
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default categoriesReducer;
  