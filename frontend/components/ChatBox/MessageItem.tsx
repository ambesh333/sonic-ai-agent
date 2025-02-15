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

export const MessageItem: React.FC<MessageItemProps> = memo(({ message, userAddress }) => {
  return (
    <motion.div
      key={message.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`flex items-center px-4 py-2 rounded-lg max-w-[70%] ${
          message.sender === "user"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-900"
        }`}
      >
        {message.sender === "user" && userAddress && (
          <Jazzicon diameter={32} seed={parseInt(userAddress.slice(2, 10), 16)} />
        )}
        <div className="ml-2">
          {message.sender === "ai" && !message.text && !message.uiType ? (
            <TypingIndicator />
          ) : (
            <DynamicMessageRenderer message={message} />
          )}
        </div>
      </div>
    </motion.div>
  );
});
MessageItem.displayName = "MessageItem";
