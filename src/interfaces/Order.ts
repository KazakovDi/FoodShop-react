import { ICartItem } from "../Redux/Cart.slice";
import { IContact } from "./contact-form";

export interface Order extends IContact {
  orders: ICartItem[];
}
