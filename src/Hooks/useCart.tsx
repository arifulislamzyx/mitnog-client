"use client";
import { AuthContext } from "@/Providers/AuthProviders";
import { useContext } from "react";
import { useQuery, UseQueryResult } from "react-query";
import UserAxiosSecure from "./useAxiosSecure";
import { AxiosResponse } from "axios";

interface cartItem{
  _id: string;
  name: string;
  price: number;
  img: string;
  email: string;
}

interface UseCartResult {
  cart: cartItem[];
  refetch: ()=> Promise<UseQueryResult<cartItem[], unknown>>,
}

const UseCart = (): UseCartResult => {
  const { user, loading } = useContext(AuthContext);
  const [axiosSecure] = UserAxiosSecure();

  const { refetch, data: cart = [] } = useQuery<cartItem[], unknown>({
    queryKey: ["carts", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res: AxiosResponse<cartItem[]> = await axiosSecure(`/carts?email=${user?.email}`);
      const data = res.data;
      return data;
    },
  });
  return {cart, refetch};
};

export default UseCart;
