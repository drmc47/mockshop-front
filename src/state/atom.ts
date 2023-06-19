import { atom } from "recoil";
import { OrdersDB } from "../hooks/useOrders";

export interface Products {
  id: number;
  title: string;
  price: number;
  description?: string;
  category: string;
  image: string;
  rating: Rating;
}

export interface ShoppingCart {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

export interface Order {
  products: ShoppingCart[];
  date: Date;
  total: number;
  id: number;
  status: "active" | "completed";
}

export interface Rating {
  rate: number;
  count: number;
}
export const productsAtom = atom<Products[]>({
  key: "products",
  default: [],
});

export const filterAtom = atom<string>({
  key: "filter",
  default: "",
});

export const shoppingCartAtom = atom<ShoppingCart[]>({
  key: "shoppingCart",
  default: [],
  dangerouslyAllowMutability: true,
});

export const loginStatusAtom = atom<boolean>({
  key: "loginStatus",
  default: false,
});

export const currencyAtom = atom<string>({
  key: "currency",
  default: "USD",
});

export const ordersAtom = atom<Order[]>({
  key: "orders",
  default: [],
  dangerouslyAllowMutability: true,
});

export const userIdAtom = atom<string>({
  key: "userId",
  default: "",
});

export const completedOrdersAtom = atom<OrdersDB[]>({
  key: "completedOrders",
  default: [],
});

export const categoryFilterAtom = atom<string>({
  key: "categoryFilter",
  default: "",
});

export const ratingFilterAtom = atom<number>({
  key: "rating",
  default: 0,
});
