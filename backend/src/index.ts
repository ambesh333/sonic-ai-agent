// server.ts
import express, { Request, Response } from "express";
import { json } from "body-parser";
import dotenv from "dotenv";
import { agent } from "./agent";
dotenv.config();

const app = express();
app.use(express.json()); 

// Define the POST /query endpoint.
app.post("/query", async (req: Request, res: Response) => {
  try {
    const { message, threadId } = req.body;
    if (!message) {
      res.status(400).json({ error: "Missing 'message' in request body" });
      return;
    }

    // Build the input state using the provided message.
    const inputs = {
      messages: [{ role: "user", content: message }],
    };

    // Optionally include a thread ID for conversation context.
    const config = threadId ? { configurable: { thread_id: threadId } } : {};

    // Use the stream API to get the data from the agent.
    const stream = await agent.stream(inputs, { streamMode: "values" });
    const responses: any[] = [];

    // Accumulate each response message from the stream.
    for await (const { messages } of stream) {
      console.log("Streamed messages:", messages);
      responses.push(messages);
    }

    // After the stream completes, send the aggregated responses as JSON.
    res.json({ result: responses });

  } catch (error) {
    console.error("Agent invocation error:", error);
    res.status(500).json({ error: "Internal Server Error", details: error });
  }
});

// Endpoint using .stream to accumulate full state updates
app.post("/query2", async (req: Request, res: Response) => {
    try {
      const { message, threadId } = req.body;
      if (!message) {
        res.status(400).json({ error: "Missing 'message' in request body" });
        return;
      }
      // Build input state with a single user message.
      const inputs = {
        messages: [{ role: "user", content: message }],
      };
      // Optionally include a thread ID for conversation context.
      const config = threadId ? { configurable: { thread_id: threadId } } : {};
  
      // Use the stream API with streamMode "values" to get full state after each step.
      const stream = await agent.stream(inputs, { ...config, streamMode: "values" });
      const responses: any[] = [];
  
      for await (const { messages } of stream) {
        console.log("Streamed messages:", messages);
        responses.push(messages);
      }
      // Send the aggregated responses as JSON.
      res.json({ result: responses });
    } catch (error) {
      console.error("Agent invocation error:", error);
      res.status(500).json({ error: "Internal Server Error", details: error });
    }
  });
  


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
