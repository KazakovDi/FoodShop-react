import { User } from "../Redux/interfaces.types";

export interface LoginParams {
  email: string;
  password: string;
  token?: string;
}

export interface LoginPayload {
  user: User;
  token: string;
}
