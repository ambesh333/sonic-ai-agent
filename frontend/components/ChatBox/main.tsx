import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import Jazzicon from "react-jazzicon";
import ActionSearchBar from "../search-box";
import { Card } from "../ui/card";

interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
}

interface ChatBoxProps {
  input: string;
}

/* A simple typing indicator with three bouncing dots */
const TypingIndicator = () => (
  <div className="flex items-center">
    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce mr-1"></div>
    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce mr-1"></div>
    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
  </div>
);

function ChatBox({ input }: ChatBoxProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const { address } = useAccount();

  useEffect(() => {
    if (input.trim() === "") return;

    // Create and add the user's message.
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: input,
    };
    setMessages((prev) => [...prev, userMessage]);

    // Create a temporary AI message placeholder.
    const aiMessageId = `ai-${Date.now()}`;
    const tempAiMessage: ChatMessage = {
      id: aiMessageId,
      sender: "ai",
      text: "", // empty text shows the typing indicator
    };
    setMessages((prev) => [...prev, tempAiMessage]);

    // Dummy API call simulation.
    const fetchAiResponse = async () => {
      // Simulate network delay (e.g., 1.2 seconds).
      await new Promise((resolve) => setTimeout(resolve, 1200));
      // In a real implementation, replace this with a fetch/axios call.
      return "This is a dummy AI response from API.";
    };

    fetchAiResponse().then((responseText) => {
      // Update the temporary AI message with the actual response.
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === aiMessageId ? { ...msg, text: responseText } : msg
        )
      );
    });
  }, [input]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col w-full max-w-3xl h-full bg-transparent  overflow-y-auto rounded-lg shadow-md p-4 mb-4 border border-border space-y-2"
    >
      {messages.map((msg) => (
        <motion.div
          key={msg.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`flex ${
            msg.sender === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`flex items-center px-4 py-2 rounded-lg max-w-[70%] ${
              msg.sender === "user"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-900"
            }`}
          >
            {/* Show Jazzicon for the user's message */}
            {msg.sender === "user" && address && (
              <Jazzicon
                diameter={32}
                seed={parseInt(address.slice(2, 10), 16)}
              />
            )}
            <div className="ml-2">
              {msg.sender === "ai" && msg.text === "" ? (
                <TypingIndicator />
              ) : (
                msg.text
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default ChatBox;