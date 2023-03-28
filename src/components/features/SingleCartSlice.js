import { createSlice } from "@reduxjs/toolkit";

const useSingleCartSlicer = createSlice({
  name: "SingleCart",
  initialState: {
    singleCartItems: [],
    singletotalCount: 0,
    singletax: 0,
    singlesubAmount: 0,
    singletotalAmount: 0,
    singletotalDiscount: 0,
  },

  reducers: {
    singleaddCartProduct: {
      reducer: (statee, action) => {
        let singleCartIndex = statee.singleCartItems.findIndex(
          (item) => item.id === action.payload.id
        );
        if (singleCartIndex >= 0) {
          statee.singleCartItems[singleCartIndex].quantity += 1;
        } else {
          let tempProduct = { ...action.payload, quantity: 1 };
          statee.singleCartItems.push(tempProduct);
        }
      },
    },

    getsingleCartProducts: (statee, action) => {
      return {
        ...statee,
      };
    },

    getsingleCartCount: (statee, action) => {
      let singlecartCount = statee.singleCartItems.reduce((total, item) => {
        return item.quantity + total;
      }, 0);
      statee.singletotalCount = singlecartCount;
    },

    removesingleCartItem: (statee, action) => {
      let index = statee.singleCartItems.findIndex(
        (item) => item.id === action.payload
      );
      if (index !== -1) {
        statee.singleCartItems.splice(index, 1);
      }
    },
  },
});

export const {
  singleaddCartProduct,
  getsingleCartProducts,
  removesingleCartItem,
  getsingleCartCount,
} = useSingleCartSlicer.actions;
export default useSingleCartSlicer.reducer;
