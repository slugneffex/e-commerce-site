import axios from "axios";

export const FETCH_BRANDPRODUCT_REQUEST = "FETCH_BRANDPRODUCT_REQUEST";
export const FETCH_BRANDPRODUCT_SUCCESS = "FETCH_BRANDPRODUCT_SUCCESS";
export const FETCH_BRANDPRODUCT_FAILURE = "FETCH_BRANDPRODUCT_FAILURE";
export const SORT_BRANDPRODUCT = "SORT_BRANDPRODUCT";

export const fetchBrandproductRequest = () => ({
  type: FETCH_BRANDPRODUCT_REQUEST,
});

export const fetchBrandproductSuccess = (branddata) => ({
  type: FETCH_BRANDPRODUCT_SUCCESS,
  payload: branddata,
});

export const fetchBrandproductFailure = (error) => ({
  type: FETCH_BRANDPRODUCT_FAILURE,
  payload: error,
});

export const sortBrandproduct = (sortOrder) => ({
  type: SORT_BRANDPRODUCT,
  payload: sortOrder,
});

export const fetchBrandproduct = (brand_id) => {
  return async (dispatch) => {
    dispatch(fetchBrandproductRequest());
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
        `${process.env.REACT_APP_BASE_URL}/brand/${brand_id}`,
        options
      );
      dispatch(fetchBrandproductSuccess(response.data));
 
    } catch (error) {
      dispatch(fetchBrandproductFailure(error.message));
    }
  };
};
