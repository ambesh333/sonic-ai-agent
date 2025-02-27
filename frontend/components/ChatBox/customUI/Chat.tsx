import React from "react";
import Jazzicon from "react-jazzicon";
import { Sparkle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ChatBubbleProps {
  text: string;
  sender: "user" | "ai";
  userAddress?: string;
  toolName?: string | string[]; 
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ text, sender, userAddress, toolName }) => {
  const isUser = sender === "user";
  const displayedTools = sender === "ai" ? (toolName && toolName.length ? toolName : ["Balance", "Send Token"]) : [];

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`relative max-w-xs w-full p-4 rounded-lg shadow-lg ${
          isUser
            ? "bg-zinc-500/10 text-white" 
            : "bg-transparent backdrop-blur-lg border border-white/20 text-white" 
        }`}
      >
        {isUser && userAddress && (
          <div className="absolute -top-3 -left-3">
            <Jazzicon diameter={24} seed={parseInt(userAddress.slice(2, 10), 16)} />
          </div>
        )}
        {!isUser && (
          <div className="absolute -top-3 -left-3">
            <Sparkle size={24} />
          </div>
        )}
        {!isUser && displayedTools.length > 0 && (
          <div className="mt-2 flex gap-2 ml-8">
            {Array.isArray(displayedTools) &&
              displayedTools.map((tool: string, index: number) => (
                <Badge key={index} variant="outline" className="bg-blue-100 text-blue-800">
                  {tool}
                </Badge>
              ))}
          </div>
        )}
        <p className="ml-8 mt-2">{text}</p>
      </div>
    </div>
  );
};

export default ChatBubble;
