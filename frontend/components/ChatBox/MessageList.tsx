import React, { memo } from "react";
import { MessageItem } from "./MessageItem";
import { ChatMessage } from "@/types/chat";

interface MessageListProps {
  messages: ChatMessage[];
  userAddress?: string;
}

export const MessageList: React.FC<MessageListProps> = memo(({ messages, userAddress }) => {
  return (
    <>
      {messages.map((msg) => (
        <MessageItem key={msg.id} message={msg} userAddress={userAddress} />
      ))}
    </>
  );
});
MessageList.displayName = "MessageList";
