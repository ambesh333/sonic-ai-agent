import { llm } from "./model";
import { getWalletBalance } from "./tools/get_balance";
import { estimateGas } from "./tools/estimate_gas";
import { sendSonicToken } from "./tools/send_token";

import {
  StateGraph,
  START,
  END,
  MessagesAnnotation,
} from "@langchain/langgraph";
import { ToolNode } from "@langchain/langgraph/prebuilt";

import { AIMessage, HumanMessage } from "@langchain/core/messages";
import { z } from "zod";

// -------------------------
// 1) Define your tools
// -------------------------
const tools = [getWalletBalance, estimateGas, sendSonicToken];
const toolNode = new ToolNode(tools);

// -------------------------
// 2) Define the final output schema
//    for your structured response
// -------------------------
const finalResponseSchema = z.object({
  uiType: z.enum(["text", "customTx"]),
  text: z.string(),
  output: z
    .object({
      receiverAddress: z.string().optional(),
      amount: z.string().optional(),
    })
    .optional(),
});

// -------------------------
// 3) Create a second "structured" model
//    that always returns valid JSON
// -------------------------
// If your primary LLM is named 'llm', you can clone or reuse it in "structured" mode:
const structuredLLM = llm.withStructuredOutput(finalResponseSchema);

// -------------------------
// 4) Agent node
//    This node calls the main LLM with tools
// -------------------------
async function callAgentNode(state: any) {
  const { messages } = state;

  // Provide instructions so the LLM knows it can call tools
  const systemMessage = {
    role: "system",
    content: "You are a web3 task manager with several tools. Use them as needed.",
  };

  // Bind your tools to the base model
  const llmWithTools = llm.bindTools(tools);
  // Now call the model
  const result = await llmWithTools.invoke([systemMessage, ...messages]);
  return { messages: result };
}

// -------------------------
// 5) generate_structured_response node
//    Once the agent decides it's done with tools,
//    we produce a final structured JSON response
// -------------------------
async function generateStructuredResponseNode(state: any) {
  const { messages } = state;
  // Typically you might feed the entire conversation or just the last user question
  // For demonstration, let's pass the last user or tool message to the structured model
  const lastMessage = messages[messages.length - 1];

  // Convert the last message to a HumanMessage (since structured LLMs expect user content)
  const userMessage = new HumanMessage(lastMessage.content || "");

  // Call the structured LLM
  const structuredOutput = await structuredLLM.invoke([userMessage]);

  // We'll store it in final_response for your app to read
  return { final_response: structuredOutput };
}

// -------------------------
// 6) Routing function
//    If the last AI message called a tool, route to 'tools'
//    Otherwise, route to 'generate_structured_response'
// -------------------------
function routingFunction({ messages }: typeof MessagesAnnotation.State) {
  const lastMessage = messages[messages.length - 1] as AIMessage;

  if (lastMessage.tool_calls?.length) {
    // If there's at least one tool call, let's route to "tools"
    return "tools";
  }
  // If no tool calls, we produce the final structured output
  return "generate_structured_response";
}

// -------------------------
// 7) Build the StateGraph
// -------------------------
const workflow = new StateGraph(MessagesAnnotation)
  // agent node calls the model with tools
  .addNode("agent", callAgentNode)
  // tools node executes the tool calls
  .addNode("tools", toolNode)
  // final node for generating the structured response
  .addNode("generate_structured_response", generateStructuredResponseNode)

  // Flow:
  .addEdge(START, "agent") // Start at 'agent'
  .addConditionalEdges("agent", routingFunction, {
    tools: "tools",
    generate_structured_response: "generate_structured_response",
  })
  // After tools, we go back to agent
  .addEdge("tools", "agent")
  // Once we reach the final node, we end
  .addEdge("generate_structured_response", END);

// Compile the graph
export const graph = workflow.compile();
