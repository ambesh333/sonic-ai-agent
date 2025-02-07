import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { ethers } from "ethers";
import { provider } from "../utils/rpc";
const balanceSchema = z.object({
  walletAddress: z.string().describe("The wallet address to get the balance for."),
});

const getWalletBalance = tool(
  async ({ walletAddress }) => {
    try {
      const balanceWei = await provider.getBalance(walletAddress);
      const balanceEther = ethers.formatEther(balanceWei);
      return `The balance of wallet ${walletAddress} is ${balanceEther} Sonic.`;
    } catch (error : any) {
      return `Failed to get balance for wallet ${walletAddress}: ${error.message}`;
    }
  },
  {
    name: "getWalletBalance",
    description: "Get the balance of a wallet address.",
    schema: balanceSchema,
  }
);

export { getWalletBalance };
