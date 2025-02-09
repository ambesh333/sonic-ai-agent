import { llm } from "./model";
import {getWalletBalance} from './tools/get_balance';
import { estimateGas } from "./tools/estimate_gas";
import { sendSonicToken } from "./tools/send_token";
import {
  Annotation,
  END,
  START,
  StateGraph,
  NodeInterrupt,
  MessagesAnnotation,
  AnyValue,
} from "@langchain/langgraph";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import {
    AIMessage,
  SystemMessage,
  ToolMessage,
  HumanMessage
} from "@langchain/core/messages";

const tools = [getWalletBalance , estimateGas ];
const toolNode = new ToolNode(tools);

const callModel = async (state: any) => {
  const { messages } = state;

  const systemMessage = {
    role: "system",
    content:
      "You're an expert web3 task managet , You have different functions that you can perform for the user "
  };

  const llmWithTools = llm.bindTools(tools);
  const result = await llmWithTools.invoke([systemMessage, ...messages]);
  return { messages: result };
};

function shouldContinue({ messages }: typeof MessagesAnnotation.State) {
  const lastMessage = messages[messages.length - 1] as AIMessage;

  // If the LLM makes a tool call, then we route to the "tools" node
  if (lastMessage.tool_calls?.length) {
    return "tools";
  }
  // Otherwise, we stop (reply to the user) using the special "__end__" node
  return "__end__";
}

const workflow = new StateGraph(MessagesAnnotation)
  .addNode("agent", callModel)
  .addEdge(START, "agent")
  .addNode("tools", toolNode)
  .addEdge("tools", "agent")
  .addConditionalEdges("agent", shouldContinue);

export const graph = workflow.compile({
  // The LangGraph Studio/Cloud API will automatically add a checkpointer
  // only uncomment if running locally
  // checkpointer: new MemorySaver(),
});
