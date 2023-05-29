import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { apiInterface } from "../api";
import { Status } from "./interfaces.types";
import { ShopItem } from "../interfaces/shop";
import { Order } from "../interfaces/Order";
export const fetchShops = createAsyncThunk("shops/fetchShops", async () => {
  try {
    const res = apiInterface.shop.getShops();
    return res;
  } catch (err: any) {
    console.log(err);
  }
});
export const fetchShopProducts = createAsyncThunk(
  "shops/fetchShopProducts",
  async (id: string) => {
    try {
      const res = apiInterface.shop.getShopProducts(id);
      return res;
    } catch (err: any) {
      console.log(err);
    }
  }
);
export const fetchCreateOrder = createAsyncThunk(
  "shops/fetchCreateOrder",
  async (params: Order) => {
    try {
      const res = apiInterface.shop.createOrder(params);
      return res;
    } catch (err: any) {
      console.log(err);
    }
  }
);
interface CurrentShop extends ShopItem {
  status: Status;
}
interface ShopState {
  data: ShopItem[];
  currentShop: CurrentShop | null;
  status: Status;
  adress: string;
}
const initialState: ShopState = {
  data: [],
  currentShop: null,
  status: Status.UNDEFINED,
  adress: "",
};
const shopsSlice = createSlice({
  name: "shops",
  initialState,
  reducers: {
    setAdress(state, action) {
      state.adress = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchShops.pending, (state) => {
      state.status = Status.PENDING;
    });

    builder.addCase(fetchShops.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchShops.rejected, (state) => {
      state.status = Status.ERROR;
    });
    builder.addCase(fetchShopProducts.pending, (state) => {
      if (state.currentShop) state.currentShop.status = Status.PENDING;
    });

    builder.addCase(fetchShopProducts.fulfilled, (state, action: any) => {
      state.currentShop = action.payload;
      if (state.currentShop) state.currentShop.status = Status.SUCCESS;
    });
    builder.addCase(fetchShopProducts.rejected, (state) => {
      if (state.currentShop) state.currentShop.status = Status.ERROR;
    });
  },
});

export const { setAdress } = shopsSlice.actions;
export const shopsReducer = shopsSlice.reducer;
