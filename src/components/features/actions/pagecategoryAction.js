// import axios from "axios";

// export const FETCH_PAGECATEGORY_REQUEST = "FETCH_PAGECATEGORY_REQUEST";
// export const FETCH_PAGECATEGORY_SUCCESS = "FETCH_PAGECATEGORY_SUCCESS";
// export const FETCH_PAGECATEGORY_FAILURE = "FETCH_PAGECATEGORY_FAILURE";

// export const fetchPagecategoryRequest = () => ({
//   type: FETCH_PAGECATEGORY_REQUEST,
// });

// export const fetchPagecategorySuccess = (pagecategory) => ({
//   type: FETCH_PAGECATEGORY_SUCCESS,
//   payload: pagecategory,
// });

// export const fetchPagecategoryFailure = (error) => ({
//   type: FETCH_PAGECATEGORY_FAILURE,
//   payload: error,
// });





// export const fetchPagecategory = (categoriesId) => {
//   return async (dispatch) => {
//     dispatch({ type: FETCH_PAGECATEGORY_REQUEST });

//     const options = {
//       headers: {
//         'X-Authorization': `${process.env.REACT_APP_HEADER}`,
//         'Cache-Control': 'no-cache, no-store, must-revalidate',
//         mode: 'cors',
//         credentials: 'include',
//       },
//     };

//     try {
//       const promises = categoriesId.map((e) =>
//         axios.get(`${process.env.REACT_APP_BASE_URL}/category/${e.id}`, options)
//       );

//       const responses = await Promise.all(promises);

//       const data = responses.map((response) => response.data.data.combos.data);
//       const productData = responses.map((response) => response.data.data.products.data);

//       dispatch({
//         type: FETCH_PAGECATEGORY_SUCCESS,
//         payload: { categoriesCombo: data, categoriesProduct: productData },
//       });
//     } catch (error) {
//       dispatch({ type: FETCH_PAGECATEGORY_FAILURE, payload: error.message });
//     }
//   };
// };

// // export const fetchPagecategory = () => {
// //   return async (dispatch) => {
// //     dispatch(fetchPagecategoryRequest());
// //     const options = {
// //       headers: {
// //         "X-Authorization": `${process.env.REACT_APP_HEADER}`,
// //         "Cache-Control": "no-cache, no-store, must-revalidate",
// //         mode: "cors",
// //         credentials: "include",
// //       },
// //     };

// //     try {
// //       const response = await axios.get(
// //         `${process.env.REACT_APP_BASE_URL}/category/${e.id}`,
// //         options
// //       );
// //       dispatch(fetchPagecategorySuccess(response.data));
 
// //     } catch (error) {
// //       dispatch(fetchPagecategoryFailure(error.message));
// //     }
// //   };
// // };
