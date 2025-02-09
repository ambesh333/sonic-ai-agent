// filepath: /home/ambesh/Desktop/social-oracle./frontend/components/ChatBox/main.tsx

import { motion } from "framer-motion";
import React, { useEffect, useReducer, useRef, useCallback, memo } from "react";
import { useAccount } from "wagmi";
import Jazzicon from "react-jazzicon";
import axios from "axios";

// ---------------------------------------------------------------------------
// Types and Reducer
// ---------------------------------------------------------------------------

export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: number; // used for ordering messages
}

type ChatAction =
  | { type: "ADD_MESSAGE"; payload: ChatMessage }
  | { type: "UPDATE_MESSAGE"; payload: { id: string; text: string } };

const chatReducer = (state: ChatMessage[], action: ChatAction): ChatMessage[] => {
  switch (action.type) {
    case "ADD_MESSAGE":
      return [...state, action.payload];
    case "UPDATE_MESSAGE":
      return state.map((msg) =>
        msg.id === action.payload.id ? { ...msg, text: action.payload.text } : msg
      );
    default:
      return state;
  }
};

// ---------------------------------------------------------------------------
// Presentational Components (Memoized)
// ---------------------------------------------------------------------------

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

interface ChatBoxProps {
  input: string;
}

// Use the public environment variable. Ensure your .env file contains:
// NEXT_PUBLIC_BACKEND_URL="http://localhost:3001"
const baseEndpoint = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

function ChatBox({ input }: ChatBoxProps) {
  const { address } = useAccount();
  const [messages, dispatch] = useReducer(chatReducer, []);
  const lastProcessedInput = useRef<string>("");

  // useCallback ensures the function isn’t recreated on every render.
  const fetchAiResponse = useCallback(
    async (userInput: string, aiMessageId: string) => {
      // Append "/agent" to the base endpoint.
      const apiEndpoint = `${baseEndpoint}/agent`;
      console.log("Calling API endpoint:", apiEndpoint);

      try {
        const response = await axios.post(
          apiEndpoint,
          { message: userInput },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log("API response:", response.data.response);
        const aiResponse: string = response.data.response;
        dispatch({ type: "UPDATE_MESSAGE", payload: { id: aiMessageId, text: aiResponse } });
      } catch (error) {
        console.error("Error fetching AI response:", error);
        dispatch({
          type: "UPDATE_MESSAGE",
          payload: { id: aiMessageId, text: "Error: Unable to fetch AI response." },
        });
      }
    },
    []
  );

  useEffect(() => {
    // Only process non-empty, new input.
    if (input.trim() === "" || lastProcessedInput.current === input) return;
    lastProcessedInput.current = input;

    const timestamp = Date.now();

    // Dispatch the user’s message.
    const userMessage: ChatMessage = {
      id: `user-${timestamp}`,
      sender: "user",
      text: input,
      timestamp,
    };
    dispatch({ type: "ADD_MESSAGE", payload: userMessage });

    // Dispatch a temporary AI message to show the typing indicator.
    const aiMessageId = `ai-${timestamp}`;
    const tempAiMessage: ChatMessage = {
      id: aiMessageId,
      sender: "ai",
      text: "",
      timestamp: timestamp + 1,
    };
    dispatch({ type: "ADD_MESSAGE", payload: tempAiMessage });

    // Trigger the API call.
    fetchAiResponse(input, aiMessageId);
  }, [input, fetchAiResponse]);

  // (Optional) Ensure messages are sorted by timestamp.
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
