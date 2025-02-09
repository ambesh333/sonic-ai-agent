// server.ts
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { graph } from "./workflow";
import { HumanMessage } from "@langchain/core/messages";

dotenv.config();

const app = express();
app.use(express.json());

async function run(message: string) {
  const finalState = await graph.invoke({
    messages: [new HumanMessage(message)],
  });
  return finalState.messages[finalState.messages.length - 1].content;
}


app.post("/agent", async (req: Request, res: Response) => {
  const message = req.body.message;

  try {
    const responseMessage = await run(message);
    res.json({ response: responseMessage });
  } catch (error:any) {
    res.status(500).send(`Error: ${error.message}`);
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});