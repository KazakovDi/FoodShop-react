import { AxiosInstance } from "axios";

export class Base {
  request: AxiosInstance;
  baseUrl: string;

  constructor(request: AxiosInstance, baseUrl: string) {
    this.baseUrl = baseUrl;
    this.request = request;
  }
}
