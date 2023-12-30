import { configureStore } from "@reduxjs/toolkit";
import productReducer from "@/hook/product/useProduct";

export default configureStore({
  reducer: {
    product: productReducer,
  },
});
