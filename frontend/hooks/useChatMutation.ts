import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const baseEndpoint = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8001";

export const useChatMutation = (address: any, threadId: string | null) => {
  return useMutation({
    mutationFn: async (userInput: string) => {
      const response = await axios.post(
        `${baseEndpoint}/v1/agent/chat`,
        { content: userInput, userId: address},
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("response", response.data);
      const output = {
        messages: response.data.messages,
        uiType: response.data.uiType || "text",
        output: {
          receiverAddress: response.data?.walletAddress,
          amount: response.data?.amount,
          symbol: response.data?.token,
          tool_calls: response.data.tool_calls
        },
        threadId: response.data.threadId
      };
      console.log("output", output);
      return output;
    },
  });
};