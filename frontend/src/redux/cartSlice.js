import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  fullName: "",
  phone: "",
  flat: "",
  area: "",
  city: "",
  state: "",
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const product = state.products.find(
        (product) => product._id === action.payload._id
      );
      if (product) {
        product.quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload._id
      );
    },
    setTotalPrice: (state, action) => {
      state.totalPrice = action.payload;
    },
    setAddress: (state, action) => {
      state.fullName = action.payload.fullName;
      state.phone = action.payload.phone;
      state.flat = action.payload.flat;
      state.area = action.payload.area;
      state.city = action.payload.city;
      state.state = action.payload.state;
    },
  },
  clear: (state) => {
    state.products = null;
  },
});

export const {
  addProduct,
  removeProduct,
  emptyCart,
  toggleShowCart,
  clear,
  setTotalPrice,
  setAddress,
} = cartSlice.actions;

export default cartSlice.reducer;
