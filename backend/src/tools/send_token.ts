import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { ethers } from "ethers";

const sendSonicTokenSchema = z.object({
  recipientAddress: z.string().describe("The recipient's wallet address."),
  amount: z.string().describe("The amount of Sonic tokens to send."),
});

const sendSonicToken = tool(
  async ({  recipientAddress, amount }) => {
    try {
      return {
          receiverAddress: recipientAddress,
          amount: amount,
          uiType: "customTx",
      }
    } catch (error: any) {
      return {
        uiType: "text",
        text: `Failed to send Sonic token: ${error.message}`,
      };
    }
  },
  {
    name: "sendSonicToken",
    description: "Send Sonic tokens to a specified wallet address.",
    schema: sendSonicTokenSchema,
  }
);

// const sendSonicToken = tool(
//   async ({  recipientAddress, amount }) => {
//     try {
//       return {
//         uiType: "customTx",
//         text: `sending ${amount} Sonic tokens to ${recipientAddress}`,
//         output: {
//           receiverAddress: recipientAddress,
//           amount: amount,
//         },
//       }
//     } catch (error: any) {
//       return {
//         uiType: "text",
//         text: `Failed to send Sonic token: ${error.message}`,
//       };
//     }
//   },
//   {
//     name: "sendSonicToken",
//     description: "Send Sonic tokens to a specified wallet address.",
//     schema: sendSonicTokenSchema,
//   }
// );

export { sendSonicToken };
