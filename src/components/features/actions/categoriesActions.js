import axios from "axios";

const FETCH_CATEGORIES_REQUEST = "FETCH_CATEGORIES_REQUEST";
const FETCH_CATEGORIES_SUCCESS = "FETCH_CATEGORIES_SUCCESS";
const FETCH_CATEGORIES_FAILURE = "FETCH_CATEGORIES_FAILURE";

const fetchCategoriesRequest = () => ({
  type: FETCH_CATEGORIES_REQUEST,
});

const fetchCategoriesSuccess = (categories) => ({
  type: FETCH_CATEGORIES_SUCCESS,
  payload: categories,
});

const fetchCategoriesFailure = (error) => ({
  type: FETCH_CATEGORIES_FAILURE,
  payload: error,
});

export const fetchCategories = () => {
  return (dispatch) => {
    dispatch(fetchCategoriesRequest());
    const options = {
      headers: {
        "X-Authorization": `${process.env.REACT_APP_HEADER}`,
        "Cache-Control": "no-cache, no-store, must-revalidate",
        mode: "cors",
        credentials: "include",
      },
    };
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/categories`, options)
      .then((response) => {
        const categories = response.data;
        dispatch(fetchCategoriesSuccess(categories));
      })
      .catch((error) => {
        dispatch(fetchCategoriesFailure(error.message));
      });
  };
};
