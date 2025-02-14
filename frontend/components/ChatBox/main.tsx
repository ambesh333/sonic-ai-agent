// filepath: /home/ambesh/Desktop/social-oracle/frontend/components/ChatBox/main.tsx
"use client";

import { motion } from "framer-motion";
import React, { useEffect, useRef, memo } from "react";
import { useAccount } from "wagmi";
import Jazzicon from "react-jazzicon";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { addMessage, updateMessage } from "@/store/chatSlice";
import { useMutation } from "@tanstack/react-query";

// ---------------------------------------------------------------------------
// Presentational Components (Memoized)
// ---------------------------------------------------------------------------

interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: number;
}

interface MessageItemProps {
  message: ChatMessage;
  userAddress?: string;
}

const MessageItem = memo(({ message, userAddress }: MessageItemProps) => {
  return (
    <motion.div
      key={message.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`flex items-center px-4 py-2 rounded-lg max-w-[70%] ${
          message.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-900"
        }`}
      >
        {message.sender === "user" && userAddress && (
          <Jazzicon diameter={32} seed={parseInt(userAddress.slice(2, 10), 16)} />
        )}
        <div className="ml-2">
          {message.sender === "ai" && message.text === "" ? <TypingIndicator /> : message.text}
        </div>
      </div>
    </motion.div>
  );
});

MessageItem.displayName = "MessageItem";

interface MessageListProps {
  messages: ChatMessage[];
  userAddress?: string;
}

const MessageList = memo(({ messages, userAddress }: MessageListProps) => {
  return (
    <>
      {messages.map((msg) => (
        <MessageItem key={msg.id} message={msg} userAddress={userAddress} />
      ))}
    </>
  );
});

MessageList.displayName = "MessageList";

const TypingIndicator = memo(() => (
  <div className="flex items-center">
    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce mr-1"></div>
    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce mr-1"></div>
    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
  </div>
));

TypingIndicator.displayName = "TypingIndicator";

// ---------------------------------------------------------------------------
// ChatBox Component
// ---------------------------------------------------------------------------

// Base endpoint for API calls. Ensure your .env file contains NEXT_PUBLIC_BACKEND_URL.
const baseEndpoint = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

function ChatBox() {
  const { address } = useAccount();
  const dispatch = useDispatch<AppDispatch>();
  const messages = useSelector((state: RootState) => state.chat.messages);
  const input = useSelector((state: RootState) => state.chat.input);
  const lastProcessedInput = useRef<string>("");

  // Tanstack Query mutation to fetch the AI response.
  const mutation = useMutation({
    mutationFn: async (userInput: string) => {
      const response = await axios.post(
        `${baseEndpoint}/agent`,
        { message: userInput },
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data.response;
    },
  });

  useEffect(() => {
    // Only process non-empty and new input.
    if (input.trim() === "" || lastProcessedInput.current === input) return;
    lastProcessedInput.current = input;
    const timestamp = Date.now();

    // Dispatch the user's message.
    dispatch(
      addMessage({
        id: `user-${timestamp}`,
        sender: "user",
        text: input,
        timestamp,
      })
    );

    // Dispatch a temporary AI message to show the typing indicator.
    const aiMessageId = `ai-${timestamp}`;
    dispatch(
      addMessage({
        id: aiMessageId,
        sender: "ai",
        text: "",
        timestamp: timestamp + 1,
      })
    );

    // Trigger the API call via Tanstack Query.
    mutation.mutate(input, {
      onSuccess: (aiResponse: string) => {
        dispatch(updateMessage({ id: aiMessageId, text: aiResponse }));
      },
      onError: () => {
        dispatch(
          updateMessage({ id: aiMessageId, text: "Error: Unable to fetch AI response." })
        );
      },
    });
  }, [input, dispatch, mutation]);

  // (Optional) Sort messages by timestamp.
  const sortedMessages = [...messages].sort((a, b) => a.timestamp - b.timestamp);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col w-full max-w-3xl h-full bg-transparent overflow-y-auto rounded-lg shadow-md p-4 mb-4 border border-border space-y-2"
    >
      <MessageList messages={sortedMessages} userAddress={address || ""} />
    </motion.div>
  );
}

export default ChatBox;
