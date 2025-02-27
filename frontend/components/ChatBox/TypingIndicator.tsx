// import React, { memo } from "react";

// export const TypingIndicator = memo(() => (
//   <div className="flex items-center">
//     <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce mr-1"></div>
//     <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce mr-1"></div>
//     <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
//   </div>
// ));
// TypingIndicator.displayName = "TypingIndicator";
import React, { memo } from "react";

export const TypingIndicator = memo(() => (
  <div className="flex items-center">
    <p className="shimmer-text text-xl font-thin">
      AI is typing
      <span className="typing-dots ml-2">...</span>
    </p>
    <style jsx>{`
      @keyframes shimmer {
        0% {
          background-position: -200px 0;
        }
        100% {
          background-position: 200px 0;
        }
      }
      .shimmer-text {
        background: linear-gradient(
          90deg,
          #ffffff,
          #d1d5db,
          #ffffff
        );
        background-size: 200% auto;
        color: transparent;
        background-clip: text;
        -webkit-background-clip: text;
        animation: shimmer 2s linear infinite;
      }
      @keyframes dots {
        0% {
          width: 0ch;
        }
        33% {
          width: 1ch;
        }
        66% {
          width: 2ch;
        }
        100% {
          width: 3ch;
        }
      }
      .typing-dots {
        display: inline-block;
        overflow: hidden;
        vertical-align: bottom;
        white-space: nowrap;
        animation: dots 1.5s steps(3, end) infinite;
      }
    `}</style>
  </div>
));

TypingIndicator.displayName = "TypingIndicator";
