import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { ethers } from "ethers";

const balanceSchema = z.object({
  walletAddress: z.string().describe("The wallet address to get the balance for."),
});

const getWalletBalance = tool(
  async ({ walletAddress }) => {
    try {
      const rpcUrl = "https://rpc.blaze.soniclabs.com";
      const provider = new ethers.JsonRpcProvider(rpcUrl);
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
