import { useRecoilValue, useSetRecoilState } from "recoil";
import { completedOrdersAtom, userIdAtom } from "../state/atom";
import axios, { AxiosResponse } from "axios";
import { useQuery } from "@tanstack/react-query";

export interface OrdersDB {
  products: {
    id: number;
    title: string;
    price: number;
    _id: string;
    quantity: number;
  }[];
  total: number;
  userId: string;
  _id: string;
  _v: number;
}

export const useOrders = () => {
  const setCompletedOrders = useSetRecoilState(completedOrdersAtom);
  const userId = useRecoilValue(userIdAtom);
  const getOrders = async () => {
    try {
      const response: AxiosResponse<OrdersDB[]> = await axios.get(`http://localhost:3000/orders/${userId}`);
      setCompletedOrders(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const ordersQuery = useQuery(["orders"], getOrders);
  return ordersQuery;
};
