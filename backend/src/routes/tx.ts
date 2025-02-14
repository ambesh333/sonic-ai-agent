import { Router, Request, Response, NextFunction } from "express";

import { provider } from "../utils/rpc";
import { ethers, parseEther } from "ethers";
const router = Router();

router.post("/getTx", async (req: Request, res: Response): Promise<any> => {
  const { from, to, amount } = req.body;
  try {
    const network = await provider.getNetwork();
    const nonce = await provider.getTransactionCount(from, 'latest');
    const feeData = await provider.getFeeData();
    const gasPrice = feeData.gasPrice;
    let gasLimit;
    try {
      gasLimit = await provider.estimateGas({
        from,
        to,
        value: parseEther(amount)
      });
    } catch (err) {
      gasLimit = 21000n; 
    }
    const tx = {
      from, 
      to,
      value: parseEther(amount),
      nonce,
      gasLimit,
      gasPrice,
      chainId: network.chainId,
      data: '0x' 
    };

    const jsonResponse = JSON.stringify({ tx }, (key, value) =>
      typeof value === 'bigint' ? value.toString() : value
    );

    res.setHeader('Content-Type', 'application/json');
    return res.status(200).send(jsonResponse);
  } catch (error: any) {
    console.error('Error preparing transaction:', error);
    return res.status(500).json({ error: error.message });
  }
});



router.post('/sendTx', async (req: Request, res: Response): Promise<any>  => {
  const { signedTx } = req.body;
  if (!signedTx) {
    return res.status(400).json({ error: 'Missing signedTx in request body' });
  }
  try {
    const txResponse = await provider.broadcastTransaction(signedTx);
    return res.status(200).json({ txHash: txResponse.hash });
  } catch (error: any) {
    console.error('Error sending transaction:', error);
    return res.status(500).json({ error: error.message });
  }
});

export default router;