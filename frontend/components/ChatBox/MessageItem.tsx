import { motion } from "framer-motion";
import React, { memo } from "react";

import { DynamicMessageRenderer } from "./DynamicMessageRenderer";
import { TypingIndicator } from "./TypingIndicator";
import { ChatMessage } from "@/types/chat";
import ChatBubble from "./customUI/Chat";

interface MessageItemProps {
  message: ChatMessage;
  userAddress?: string;
}

const MessageItem: React.FC<MessageItemProps> = memo(({ message, userAddress }) => {
  return (
    <motion.div
      key={message.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
    >
      <div className="w-full">
        {message.sender === "ai" && !message.text && !message.uiType ? (
          <TypingIndicator />
        ) : message.uiType ? (
          <DynamicMessageRenderer message={message} />
        ) : (
          <ChatBubble text={message.text || ""} sender={message.sender} userAddress={userAddress} />
        )}
      </div>
    </motion.div>
  );
});

export default MessageItem;