import { ChatMessage } from "@/types/chat";
import React from "react";
import TransactionCard from "./customUI/Tx";
import TradingViewChart from "./customUI/chart";
import ChatBubble from "./customUI/Chat";

interface DynamicMessageRendererProps {
  message: ChatMessage;
}

export const DynamicMessageRenderer: React.FC<DynamicMessageRendererProps> = ({ message }) => {
  switch (message.uiType) {
    case "text":
      return <ChatBubble text={message.text || ""} sender={message.sender} toolName={message.payload?.tool_calls}/>;
    case "customTx":
      return <TransactionCard
        receiverAddress={message.payload?.receiverAddress}
        amount={message.payload?.amount}
      />;
    case 'chart':
      return message.payload?.symbol ? (
        <div className="w-full">
          <TradingViewChart symbol={message.payload?.symbol} />
        </div>
      ) : (
        <span>Symbol not available</span>
      );

    default:
      return <span>{message.text}</span>;
  }
};
