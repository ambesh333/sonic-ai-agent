import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { ethers } from "ethers";

const estimateGasSchema = z.object({
  recipientAddress: z.string().optional().describe("The recipient's wallet address (optional). If not provided, a general estimate will be calculated."),
  amount: z.string().describe("The amount of Sonic tokens to send."),
});

const estimateGas = tool(
  async ({ recipientAddress, amount }) => {
    try {
      const rpcUrl = "https://rpc.blaze.soniclabs.com";
      const provider = new ethers.JsonRpcProvider(rpcUrl);

      const amountInWei = ethers.parseUnits(amount, 18); // Assuming 18 decimals
      const gasEstimate = await provider.getFeeData()
    //   let gasEstimate;
    //   if (recipientAddress) {
    //     gasEstimate = await provider.estimateGas({
    //       to: recipientAddress,
    //       value: amountInWei,
    //     });
    //   } else {
    //     gasEstimate = await provider.estimateGas({
    //       to: "0x3D129878377e90145A839A2257CDFC311C71ccD2", 
    //       value: amountInWei,
    //     });
    //   }

      return `Estimated gas for transferring ${amount} Sonic ${recipientAddress ? `to ${recipientAddress}` : "(general estimation)"} is ${gasEstimate.toString()}.`;
    } catch (error: any) {
      return `Failed to estimate gas: ${error.message}`;
    }
  },
  {
    name: "estimateGas",
    description: "Estimate the gas required for a Sonic token transfer. If no recipient address is provided, a general estimate is calculated.",
    schema: estimateGasSchema,
  }
);

export { estimateGas };
