import { tool } from "@langchain/core/tools";
import { z } from "zod";

const Response = z.object({
  uiType: z.enum(["text", "customTx"]).describe("The type of UI element to display"),
  text: z.string().describe("The text to display in the UI element"),
  output: z
    .object({
      receiverAddress: z.string().optional(),
      amount: z.string().optional(),
    }).describe("The output data for a custom transaction")
    .optional(),
});

const finalResponseTool = tool(async () => {}, {
    name: "Response",
    description: "Always respond to the user using this tool.",
    schema: Response,
  });

export { finalResponseTool };