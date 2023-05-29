import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { Status, User } from "./interfaces.types";
import { apiInterface } from "../api/index";
import { LoginParams, LoginPayload } from "../interfaces/login";
import { RegisterParams } from "../interfaces/register";
export const fetchLogin = createAsyncThunk<LoginParams, LoginParams>(
  "auth/fetchLogin",
  async (params) => {
    const res = await apiInterface.auth.login(params);
    return res;
  }
);
export const fetchRegister = createAsyncThunk<RegisterParams, RegisterParams>(
  "auth/fetchRegister",
  async (params) => {
    const res = await apiInterface.auth.register(params);
    return res;
  }
);
export const fetchAuthMe = createAsyncThunk("auth/fetchAuthMe", async () => {
  const res = await apiInterface.auth.me();
  return res;
});
interface IState {
  user: User;
  status: Status;
}
const initialState: IState = {
  user: {
    _id: "",
    coupones: [],
    orders: [],
    email: "",
    token: "",
  },
  status: Status.UNDEFINED,
};
const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      window.localStorage.removeItem("token");
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLogin.pending, (state) => {
      state.status = Status.PENDING;
    });
    builder.addCase(fetchLogin.fulfilled, (state, action: any) => {
      state.user = action.payload.user;
      state.user.token = action.payload.token;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchLogin.rejected, (state) => {
      state.status = Status.ERROR;
    });

    builder.addCase(fetchRegister.pending, (state) => {
      state.status = Status.PENDING;
    });
    builder.addCase(
      fetchRegister.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.user.email = action.payload.email;
        state.status = Status.SUCCESS;
      }
    );
    builder.addCase(fetchRegister.rejected, (state) => {
      state.status = Status.ERROR;
    });
    builder.addCase(fetchAuthMe.pending, (state) => {
      state.status = Status.PENDING;
    });
    builder.addCase(
      fetchAuthMe.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.user = action.payload.user;
        state.status = Status.SUCCESS;
      }
    );
    builder.addCase(fetchAuthMe.rejected, (state) => {
      state.status = Status.ERROR;
    });
  },
});

export const { logout } = AuthSlice.actions;
export const authReducer = AuthSlice.reducer;
