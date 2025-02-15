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
    const responseMessage = {
      uiType: "text",
      text: `${message} agent dummy chat response`
    };
    res.json({ response: responseMessage });
  } catch (error: any) {
    res.status(500).send(`Error: ${error.message}`);
  }
});

// Dummy Chart Endpoint – returns data for rendering a chart
router.post("/dummy_chart", async (req: Request, res: Response) => {
  const message = req.body.message;
  try {
    const responseMessage = {
      uiType: "chart",
      text: `Dummy chart response for: ${message}`,
      output: {
        chartType: "bar",
        labels: ["January", "February", "March"],
        data: [10, 20, 30]
      }
    };
    res.json({ response: responseMessage });
  } catch (error: any) {
    res.status(500).send(`Error: ${error.message}`);
  }
});

// Dummy Custom Transaction Endpoint – returns details for a custom tx UI
router.post("/dummy_customTx", async (req: Request, res: Response) => {
  const message = req.body.message;
  try {
    const responseMessage = {
      uiType: "customTx",
      text: `Dummy custom transaction response for: ${message}`,
      output: {
        transactionId: "0x123abc456def",
        amount: "0.01",
        status: "pending"
      }
    };
    res.json({ response: responseMessage });
  } catch (error: any) {
    res.status(500).send(`Error: ${error.message}`);
  }
});

export default router;