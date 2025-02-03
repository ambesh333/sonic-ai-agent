// lib/tools.ts
import { Tool } from "langchain/tools";
import { useAccount, useBalance } from "wagmi";

// Tool: Fetch Wallet Balance
export class WalletBalanceTool extends Tool {
  name = "wallet_balance";
  description = "Fetch the balance of the connected wallet.";

  async _call() {
    const { address } = useAccount();
    const { data: balance } = useBalance({ address });
    return balance?.formatted || "0";
  }
}

