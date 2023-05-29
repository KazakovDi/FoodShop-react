import { LoginParams } from "../interfaces/login";
import { RegisterParams } from "../interfaces/register";
import { Base } from "./Base";

export default class Auth extends Base {
  async login(params: LoginParams) {
    const response = await this.request.post(
      `${this.baseUrl}/auth/signin`,
      params
    );
    return response.data;
  }
  async register(input: RegisterParams) {
    const response = await this.request.post(
      `${this.baseUrl}/auth/signup`,
      input
    );
    return response.data;
  }
  async me() {
    const response = await this.request.get(`${this.baseUrl}/auth/me`);
    return response.data;
  }
}
