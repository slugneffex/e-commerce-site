// import { setupListeners } from "@reduxjs/toolkit/query";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import useCartReducer from "../components/features/useCartSlice";
import useSingleCartReducer from "../components/features/SingleCartSlice";
import freebiesCartReducer from "../components/features/freebiesCartSlice";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import categoriesReducer from "../components/features/reducer/categoriesReducer";
import categoryReducer from "../components/features/reducer/categoryReducer";
import byocReducer from "../components/features/reducer/byocReducer";
import heroReducer from "../components/features/reducer/heroReducer";
import youmaylikeReducer from "../components/features/reducer/youmaylikeReducer";
import brandReducer from "../components/features/reducer/brandReducer";
import jbrandsReducer from "../components/features/reducer/jbrandsReducer"
import toppicksReducer from "../components/features/reducer/toppicksReducer";
import forherReducer from "../components/features/reducer/forherReducer";
import { persistReducer } from "redux-persist";
const persistConfig = {
  key: "root",
  storage: storage,
};

export const rootReducers = combineReducers({
  cart: useCartReducer,
  SingleCart: useSingleCartReducer,
  freebies: freebiesCartReducer,
  categories: categoriesReducer,
  category: categoryReducer,
  byoc: byocReducer,
  hero: heroReducer,
  youmaylike: youmaylikeReducer,
  brand: brandReducer,
  jbrands:jbrandsReducer,
  toppicks: toppicksReducer,
  forher: forherReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducers);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(thunk),
});

// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
// });
// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// });
// setupListeners(store.dispatch);
export default store;
