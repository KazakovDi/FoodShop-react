import { ICartItem } from "./Cart.slice";

export interface User {
  email: string;
  token?: string;
  _id: string;
  coupones: [];
  orders: ICartItem[];
}
export enum Status {
  SUCCESS = "loaded",
  PENDING = "loading",
  ERROR = "error",
  UNDEFINED = "",
}
