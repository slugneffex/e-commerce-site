// import {
//   FETCH_PAGECATEGORY_FAILURE,
//   FETCH_PAGECATEGORY_REQUEST,
//   FETCH_PAGECATEGORY_SUCCESS,
// } from "../actions/pagecategoryAction";


// const initialState = {
//     loading: false,
//     categoriesCombo: [],
//     categoriesProduct: [],
//     error: null,
//   };


// const pagecategoryReducer = (state = initialState, action) => {
//     switch (action.type) {
//       case FETCH_PAGECATEGORY_REQUEST:
//         return {
//           ...state,
//           loading: true,
//           error: null,
//         };
//       case FETCH_PAGECATEGORY_SUCCESS:
//         return {
//           ...state,
//           loading: false,
//           categoriesCombo: action.payload.categoriesCombo,
//           categoriesProduct: action.payload.categoriesProduct,
//         };
//       case FETCH_PAGECATEGORY_FAILURE:
//         return {
//           ...state,
//           loading: false,
//           error: action.payload,
//         };
//       default:
//         return state;
//     }
//   };

//   export default pagecategoryReducer;