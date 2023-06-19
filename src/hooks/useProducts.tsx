import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { Products, productsAtom } from "../state/atom";
import { useSetRecoilState } from "recoil";
import { fetcher } from "../utils/fetcher";

export const useProducts = () => {
  const setProducts = useSetRecoilState(productsAtom);
  const getProducts = async () => {
    try {
      const response: AxiosResponse<Products[]> = await fetcher.get("/products");
      console.log(response.data);

      setProducts(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  const productsQuery = useQuery(["products"], getProducts);
  return productsQuery;
};
