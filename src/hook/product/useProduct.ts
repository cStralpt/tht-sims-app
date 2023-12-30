import { Product } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";

export const counterSlice = createSlice({
  name: "product",
  initialState: {
    value: null,
  },
  reducers: {
    increment: (state) => {
      state.value = null;
    },
    setProductByValue: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { increment, setProductByValue } = counterSlice.actions;

export default counterSlice.reducer;

export const useProductState = () => {
  const dispatch = useDispatch();

  const setProduct = (state: Product[]) => {
    dispatch(setProductByValue(state));
  };

  const getProduct = useSelector((state: any) => state.product.value);
  return { getProduct, setProduct };
};
