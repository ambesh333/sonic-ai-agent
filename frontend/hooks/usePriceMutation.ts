import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const baseEndpoint = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8001";

export const usePriceMutation = () => {
  return useMutation({
    mutationFn: async (tokenName: string) => {
      const response = await axios.post(
        `${baseEndpoint}/v1/price/getprice`,
        { tokenName },
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data;
    },
  });
};