import React, { memo } from "react";

export const TypingIndicator = memo(() => (
  <div className="flex items-center">
    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce mr-1"></div>
    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce mr-1"></div>
    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
  </div>
));
TypingIndicator.displayName = "TypingIndicator";
