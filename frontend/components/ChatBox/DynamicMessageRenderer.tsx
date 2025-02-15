import { ChatMessage } from "@/types/chat";
import React from "react";


interface DynamicMessageRendererProps {
  message: ChatMessage;
}

// Example custom components for special UI types:
const CustomTxComponent: React.FC<{ data: any }> = ({ data }) => {
  return (
    <div className="p-2 border border-green-500">
      <p>Custom Transaction Component</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

const ChartComponent: React.FC<{ config: any }> = ({ config }) => {
  return (
    <div className="p-2 border border-blue-500">
      <p>Chart Component</p>
      <pre>{JSON.stringify(config, null, 2)}</pre>
    </div>
  );
};

export const DynamicMessageRenderer: React.FC<DynamicMessageRendererProps> = ({ message }) => {
  switch (message.uiType) {
    case "text":
      return <span>{message.text}</span>;
    case "customTx":
      return <CustomTxComponent data={message.payload} />;
    case "chart":
      return <ChartComponent config={message.payload} />;
    default:
      return <span>{message.text}</span>;
  }
};
