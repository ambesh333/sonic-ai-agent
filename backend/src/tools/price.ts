import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { ethers } from "ethers";
// import PythAbi from ".."; // Adjust the path as necessary


const getPythPriceSchema = z.object({
  priceId: z.string().describe("The price feed ID to query from the Pyth oracle."),
});

const getPythPrice = tool(
  async ({ priceId }) => {
    try {
      // Connect to Sonic Testnet RPC
      const rpcUrl = "https://rpc.testnet.soniclabs.com";
      const provider = new ethers.JsonRpcProvider(rpcUrl);

      // Pyth contract address on Sonic Testnet
      const contractAddress = "0x96124d1F6E44FfDf1fb5D6d74BB2DE1B7Fbe7376";
      // const contract = new ethers.Contract(contractAddress, PythAbi, provider);

      // Query the price using the provided price feed ID
      // const [price, conf, expo, timestamp] = await contract.getPrice(priceId);

      // Convert values to strings (you may want to further process the exponent)
      // return `Price: ${price.toString()}, Confidence: ${conf.toString()}, Exponent: ${expo.toString()}, Timestamp: ${timestamp.toString()}`;
    } catch (error: any) {
      return `Failed to fetch Pyth price data: ${error.message}`;
    }
  },
  {
    name: "getPythPrice",
    description: "Fetch the current price data from the Pyth oracle on the Sonic Testnet using a provided price feed ID.",
    schema: getPythPriceSchema,
  }
);

export { getPythPrice };
