import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { authReducer } from "./Auth.slice";
import { shopsReducer } from "./Shops.slice";
import { cartReducer } from "./Cart.slice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    shops: shopsReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
