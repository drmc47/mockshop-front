import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { Products, productsAtom } from "../state/atom";
import { useSetRecoilState } from "recoil";

export const useProducts = () => {
  const setProducts = useSetRecoilState(productsAtom);
  const getProducts = async () => {
    try {
      const response: AxiosResponse<Products[]> = await axios.get("http://localhost:3000/products");
      setProducts(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  const productsQuery = useQuery(["products"], getProducts);
  return productsQuery;
};
