import { Router, Request, Response } from "express";

import { HumanMessage } from "@langchain/core/messages";
import { graph } from "../workflow";

const router = Router();

async function run(message: string) {
    const finalState = await graph.invoke({
      messages: [new HumanMessage(message)],
    });
    return finalState.messages[finalState.messages.length - 1].content;
  }


router.post("/chat", async (req: Request, res: Response) => {
  const message = req.body.message;

  try {
    const responseMessage = await run(message);
    res.json({ response: responseMessage });
  } catch (error:any) {
    res.status(500).send(`Error: ${error.message}`);
  }
});

router.post("/dummy_chat", async (req: Request, res: Response) => {
  const message = req.body.message;

  try {
    const responseMessage = message+"agent dummy response";
    res.json({ response: responseMessage });
  } catch (error:any) {
    res.status(500).send(`Error: ${error.message}`);
  }
});

export default router;