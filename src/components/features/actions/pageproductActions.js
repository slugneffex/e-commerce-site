// import axios from "axios";

// export const FETCH_PAGEPRODUCT_REQUEST = "FETCH_PAGEPRODUCT_REQUEST";
// export const FETCH_PAGEPRODUCT_SUCCESS = "FETCH_PAGEPRODUCT_SUCCESS";
// export const FETCH_PAGEPRODUCT_FAILURE = "FETCH_PAGEPRODUCT_FAILURE";



// export const fetchPageproductRequest = () => ({
//   type: FETCH_PAGEPRODUCT_REQUEST,
// });

// export const fetchPageproductSuccess = (pagedata) => ({
//   type: FETCH_PAGEPRODUCT_SUCCESS,
//   // payload: category,
//   payload: pagedata,

// });



// export const fetchPageproductFailure = (error) => ({
//   type: FETCH_PAGEPRODUCT_FAILURE,
//   payload: error,
// });



// export const fetchPageproduct = (id) => {
//   return async (dispatch) => {
//     dispatch(fetchPageproductRequest());
//     const options = {
//       headers: {
//         "X-Authorization": `${process.env.REACT_APP_HEADER}`,
//         "Cache-Control": "no-cache, no-store, must-revalidate",
//         mode: "cors",
//         credentials: "include",
//       },
//     };

//     try {
     
//         const response = await axios.get(
//           `${process.env.REACT_APP_BASE_URL}/page/${id}`,
//           options
//         );
//         dispatch(fetchPageproductSuccess(response.data));
      
     
    
//     } catch (error) {
//       dispatch(fetchPageproductFailure(error.message));
//     }
 
//   };
// };
