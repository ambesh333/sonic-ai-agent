// backend/lib/tools.ts
import { Tool } from "langchain/tools";

// Tool: Fetch Market Data (Example)
export class MarketDataTool extends Tool {
  name = "market_data";
  description = "Fetch market data for a given token.";

  async _call(token: string) {
    const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${token}&vs_currencies=usd`);
    const data = await response.json();
    return JSON.stringify(data);
  }
}