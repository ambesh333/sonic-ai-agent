import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { ethers } from "ethers";

const sendSonicTokenSchema = z.object({
  senderPrivateKey: z.string().describe("The private key of the sender's wallet."),
  recipientAddress: z.string().describe("The recipient's wallet address."),
  amount: z.string().describe("The amount of Sonic tokens to send."),
});

const sendSonicToken = tool(
  async ({ senderPrivateKey, recipientAddress, amount }) => {
    try {
      const rpcUrl = "https://rpc.blaze.soniclabs.com";
      const provider = new ethers.JsonRpcProvider(rpcUrl);

      // Initialize wallet and contract
      const wallet = new ethers.Wallet(senderPrivateKey, provider);

      // Assuming Sonic is an ERC-20 token; replace with the actual contract address
      const sonicTokenAddress = "0xYourSonicTokenContractAddress";
      const sonicAbi = [
        // Minimal ABI to interact with ERC-20 Token
        "function transfer(address to, uint amount) returns (bool)",
      ];
      const contract = new ethers.Contract(sonicTokenAddress, sonicAbi, wallet);

      // Send tokens
      const amountInWei = ethers.parseUnits(amount, 18); // Assuming 18 decimals
      const tx = await contract.transfer(recipientAddress, amountInWei);
      await tx.wait();

      return `Successfully sent ${amount} Sonic from ${wallet.address} to ${recipientAddress}. Transaction hash: ${tx.hash}`;
    } catch (error: any) {
      return `Failed to send Sonic tokens: ${error.message}`;
    }
  },
  {
    name: "sendSonicToken",
    description: "Send Sonic tokens to a specified wallet address.",
    schema: sendSonicTokenSchema,
  }
);

export { sendSonicToken };
