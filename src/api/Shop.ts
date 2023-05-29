import { Order } from "../interfaces/Order";
import { ShopItem } from "../interfaces/shop";
import { Base } from "./Base";

export default class Shop extends Base {
  async getShops() {
    const response = await this.request.get(`${this.baseUrl}/shops/`);
    return response.data;
  }
  async getShopProducts(id: string) {
    const response = await this.request.get(`${this.baseUrl}/shops/${id}`);
    return response.data;
  }
  async createShop(input: ShopItem) {
    const response = await this.request.post(
      `${this.baseUrl}/shops/create`,
      input
    );
    return response.data;
  }
  async createOrder(input: Order) {
    const response = await this.request.post(
      `${this.baseUrl}/shops/create-order`,
      input
    );
    return response.data;
  }
}
