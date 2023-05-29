export interface ShopItem {
  _id: string;
  title: string;
  cover: string;
  products: Product[];
}

export interface Product {
  price: number;
  title: string;
  description: string;
  cover: string;
  shop: string;
  _id: string;
}
