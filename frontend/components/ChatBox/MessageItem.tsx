import { motion } from "framer-motion";
import React, { memo } from "react";
import Jazzicon from "react-jazzicon";
import { DynamicMessageRenderer } from "./DynamicMessageRenderer";
import { TypingIndicator } from "./TypingIndicator";
import { ChatMessage } from "@/types/chat";

interface MessageItemProps {
  message: ChatMessage;
  userAddress?: string;
}

// Separate text component for user messages
const UserMessageText: React.FC<{ text: string }> = ({ text }) => (
  <div className="px-4 py-2 rounded-lg max-w-[70%] min-w-[50%] bg-blue-500 text-white">
    {text}
  </div>
);


export const MessageItem: React.FC<MessageItemProps> = memo(({ message, userAddress }) => {
  return (
    <motion.div
      key={message.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
    >
      {message.sender === "user" && userAddress && (
        <Jazzicon diameter={32} seed={parseInt(userAddress.slice(2, 10), 16)} />
      )}
      <div className="ml-2">
        {message.sender === "ai" && !message.text && !message.uiType ? (
          <TypingIndicator />
        ) : message.uiType ? (
          <DynamicMessageRenderer message={message} />
        ) : (
          <UserMessageText text={message.text || ""} />
        )}
      </div>
    </motion.div>
  );
});
MessageItem.displayName = "MessageItem";
