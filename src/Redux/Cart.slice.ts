import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ShopItem } from "../interfaces/shop";
interface CartState {
  totalPrice: number;
  items: ICartItem[];
  shop: any;
}

export interface ICartItem {
  _id: string;
  title: string;
  cover: string;
  price: number;
  description: string;
  shop: ShopItem;
  count: number;
}
const countTotalPrice = (state: CartState) => {
  state.totalPrice = state.items.reduce((sum: number, item: ICartItem) => {
    if (!item.count) {
      return item.price;
    }
    return item.price * item.count + sum;
  }, 0);
};
const updateLocalStorage = (state: CartState) => {
  window.localStorage.setItem("cart", JSON.stringify(state));
};
const initialState: CartState = {
  totalPrice: 0,
  items: [],
  shop: "",
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<ICartItem>) {
      const findItem = state.items.find((item) => {
        const regex = new RegExp(`${action.payload._id}`);
        return item._id.match(regex);
      });
      findItem
        ? findItem.count++
        : state.items.push({
            ...action.payload,
            count: 1,
          });
      countTotalPrice(state);
      state.shop = action.payload.shop;
      updateLocalStorage(state);
    },
    minusCount: (state, action: PayloadAction<ICartItem>) => {
      const findItem = state.items.find(
        (item) => item._id === action.payload._id
      );
      if (findItem && findItem.count > 1) {
        findItem.count--;
        countTotalPrice(state);
      } else {
      }
      updateLocalStorage(state);
    },
    removeItem: (state, action: PayloadAction<ICartItem>) => {
      state.items = state.items.filter(
        (item) => item._id !== action.payload._id
      );
      countTotalPrice(state);
      if (state.items.length === 0) {
        state.shop = "";
      }
      updateLocalStorage(state);
    },
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
      state.shop = "";
      updateLocalStorage(state);
    },
    getCartState: (state) => {
      const prevCart = JSON.parse(
        window.localStorage.getItem("cart") as string
      );
      if (prevCart) return { ...prevCart };
    },
  },
});
export const { addItem, removeItem, clearCart, minusCount, getCartState } =
  cartSlice.actions;
export const cartReducer = cartSlice.reducer;
