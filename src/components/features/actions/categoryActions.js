import axios from "axios";

export const FETCH_CATEGORY_REQUEST = "FETCH_CATEGORY_REQUEST";
export const FETCH_CATEGORY_SUCCESS = "FETCH_CATEGORY_SUCCESS";
export const FETCH_CATEGORY_FAILURE = "FETCH_CATEGORY_FAILURE";



export const fetchCategoryRequest = () => ({
  type: FETCH_CATEGORY_REQUEST,
});

export const fetchCategorySuccess = (data) => ({
  type: FETCH_CATEGORY_SUCCESS,
  // payload: category,
  payload: data,

});



export const fetchCategoryFailure = (error) => ({
  type: FETCH_CATEGORY_FAILURE,
  payload: error,
});



export const fetchCategory = (id) => {
  return async (dispatch) => {
    dispatch(fetchCategoryRequest());
    const options = {
      headers: {
        "X-Authorization": `${process.env.REACT_APP_HEADER}`,
        "Cache-Control": "no-cache, no-store, must-revalidate",
        mode: "cors",
        credentials: "include",
      },
    };

    try {
     
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/category/${id}`,
          options
        );
        dispatch(fetchCategorySuccess(response.data));
      
     
    
    } catch (error) {
      dispatch(fetchCategoryFailure(error.message));
    }
 
  };
};
