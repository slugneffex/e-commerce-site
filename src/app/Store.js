// import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import useCartReducer from "../components/features/useCartSlice";
import useSingleCartReducer from "../components/features/SingleCartSlice";
import freebiesCartReducer from "../components/features/freebiesCartSlice";
import storage from "redux-persist/lib/storage";
import categoriesReducer from "../components/features/reducers/categoriesReducer";

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
const persistConfig = {
  key: "root",
  storage: storage,
};

export const rootReducers = combineReducers({
  cart: useCartReducer,
  SingleCart: useSingleCartReducer,
  freebies: freebiesCartReducer,
  categories: categoriesReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducers);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
setupListeners(store.dispatch);
export default store;
