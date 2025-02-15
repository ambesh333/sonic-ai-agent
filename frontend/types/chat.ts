export interface ChatMessage {
    id: string;
    sender: "user" | "ai";
    text?: string;       // plain text (optional)
    uiType?: string;     // type of UI to render (e.g. "text", "customTx", "chart")
    payload?: any;       // additional data for rendering
    timestamp: number;
  }
  