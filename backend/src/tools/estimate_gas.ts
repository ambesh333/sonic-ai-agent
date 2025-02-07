import { tool } from "@langchain/core/tools";
import { ethers } from "ethers";
import { provider } from "../utils/rpc";

const estimateGas = tool(
  async () => {
    try {


      const feeData = await provider.getFeeData();

      // Convert values from Wei to Gwei for readability
      const currentGasPrice = feeData.gasPrice
        ? ethers.formatUnits(feeData.gasPrice, "gwei") + " gwei"
        : "N/A";
      const maxFeePerGas = feeData.maxFeePerGas
        ? ethers.formatUnits(feeData.maxFeePerGas, "gwei") + " gwei"
        : "N/A";
      const maxPriorityFeePerGas = feeData.maxPriorityFeePerGas
        ? ethers.formatUnits(feeData.maxPriorityFeePerGas, "gwei") + " gwei"
        : "N/A";

      return {
        currentGasPrice,
        maxFeePerGas,
        maxPriorityFeePerGas,
      };
    } catch (error: any) {
      return `Failed to estimate gas: ${error.message}`;
    }
  },
  {
    name: "estimateGas",
    description: "Estimate the current gas fee data in gwei for a Sonic token transfer. This tool does not require any input.",
  }
);

export { estimateGas };
