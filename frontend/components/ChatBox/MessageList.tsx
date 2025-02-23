import React, { memo } from "react";

import { ChatMessage } from "@/types/chat";
import MessageItem from "./MessageItem";

interface MessageListProps {
  messages: ChatMessage[];
  userAddress?: string;
}

export const MessageList: React.FC<MessageListProps> = memo(({ messages, userAddress }) => {
  return (
    <div className="space-y-4">
      {messages.map((msg) => (
        <MessageItem key={msg.id} message={msg} userAddress={userAddress} />
      ))}
    </div>
  );
});
MessageList.displayName = "MessageList";
