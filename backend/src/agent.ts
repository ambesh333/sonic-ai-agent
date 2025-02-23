import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { llm } from "./model";
import {getWalletBalance} from './tools/get_balance';
import { estimateGas } from "./tools/estimate_gas";
import { sendSonicToken } from "./tools/send_token";

import { z } from "zod";

const agentResponseSchema = z.object({
  uiType: z.enum(["text", "customTx"]),
  text: z.string(),
  output: z
    .object({
      receiverAddress: z.string(),
      amount: z.string(),
    })
    .optional(),
});


export const agent = createReactAgent({ llm: llm, tools: [getWalletBalance , estimateGas , sendSonicToken] ,
    responseFormat: agentResponseSchema
});

