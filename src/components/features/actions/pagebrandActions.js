import axios from "axios";

export const FETCH_PAGEBRAND_REQUEST = "FETCH_PAGEBRAND_REQUEST";
export const FETCH_PAGEBRAND_SUCCESS = "FETCH_PAGEBRAND_SUCCESS";
export const FETCH_PAGEBRAND_FAILURE = "FETCH_PAGEBRAND_FAILURE";

export const fetchPagebrandRequest = () => ({
  type: FETCH_PAGEBRAND_REQUEST,
});

export const fetchPagebrandSuccess = (pagebrand) => ({
  type: FETCH_PAGEBRAND_SUCCESS,
  payload: pagebrand,
});

export const fetchPagebrandFailure = (error) => ({
  type: FETCH_PAGEBRAND_FAILURE,
  payload: error,
});

export const fetchPagebrand = (brandId) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_PAGEBRAND_REQUEST });

    const options = {
      headers: {
        "X-Authorization": `${process.env.REACT_APP_HEADER}`,
        "Cache-Control": "no-cache, no-store, must-revalidate",
        mode: "cors",
        credentials: "include",
      },
    };

    try {
      const promises = brandId.map((e) =>
        axios.get(`${process.env.REACT_APP_BASE_URL}/brand/${e.id}`, options)
      );

      const responses = await Promise.all(promises);

      const data = responses.map((response) => response.data.products.data);
      //   const productData = responses.map((response) => response.data.data.products.data);

      dispatch({
        type: FETCH_PAGEBRAND_SUCCESS,
        payload: { brandProduct: data },
      });
    } catch (error) {
      dispatch({ type: FETCH_PAGEBRAND_FAILURE, payload: error.message });
    }
  };
};

// export const fetchPagecategory = () => {
//   return async (dispatch) => {
//     dispatch(fetchPagecategoryRequest());
//     const options = {
//       headers: {
//         "X-Authorization": `${process.env.REACT_APP_HEADER}`,
//         "Cache-Control": "no-cache, no-store, must-revalidate",
//         mode: "cors",
//         credentials: "include",
//       },
//     };

//     try {
//       const response = await axios.get(
//         `${process.env.REACT_APP_BASE_URL}/category/${e.id}`,
//         options
//       );
//       dispatch(fetchPagecategorySuccess(response.data));

//     } catch (error) {
//       dispatch(fetchPagecategoryFailure(error.message));
//     }
//   };
// };
