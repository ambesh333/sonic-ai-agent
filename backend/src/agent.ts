import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { llm } from "./model";
import {getWalletBalance} from './tools/get_balance';
import { estimateGas } from "./tools/estimate_gas";
import { sendSonicToken } from "./tools/send_token";

export const agent = createReactAgent({ llm: llm, tools: [getWalletBalance , estimateGas , sendSonicToken] });

