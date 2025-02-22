import React from "react";
import Jazzicon from "react-jazzicon";

interface ChatBubbleProps {
  text: string;
  sender: "user" | "ai";
  userAddress?: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ text, sender, userAddress }) => {
  const bubbleBg = sender === "user" ? "bg-gray-200 text-black" : "bg-gray-800 text-white";
  const alignment = sender === "user" ? " ml-auto" : "mr-auto";

  return (
    <div
      className={`flex items-start gap-1 px-2 py-2 rounded-lg ${bubbleBg} ${alignment} 
                  w-full max-w-[400px] min-h-[40px] break-words whitespace-pre-wrap`}
    >
      {/* {sender === "user" && userAddress && (
        <Jazzicon
          seed={parseInt(userAddress.slice(2, 10), 16)}
          className="w-6 h-6 rounded-full"
        />
      )} */}
      <span>{text}</span>
    </div>
  );
};

export default ChatBubble;
