"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useAccount } from "wagmi";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { addMessage, updateMessage } from "@/store/chatSlice";
import { useMutation } from "@tanstack/react-query";
import { MessageList } from "./MessageList";

const baseEndpoint = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

export default function ChatBox() {
  const { address } = useAccount();
  const dispatch = useDispatch<AppDispatch>();
  const messages = useSelector((state: RootState) => state.chat.messages);
  const input = useSelector((state: RootState) => state.chat.input);
  const lastProcessedInput = useRef<string>("");
  
  // dummy_chat
  // dummy_chart
  // dummy_customTx
  // Mutation to call backend and get AI response.
  const mutation = useMutation({
    mutationFn: async (userInput: string) => {
      const response = await axios.post(
        `${baseEndpoint}/v1/agent/dummy_customTx`,
        { message: userInput },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("response", response);
      return response.data.response;
    },
  });

  useEffect(() => {
    // Process only non-empty and new input
    if (input.trim() === "" || lastProcessedInput.current === input) return;
    lastProcessedInput.current = input;
    const timestamp = Date.now();

    // Add user's message
    dispatch(
      addMessage({
        id: `user-${timestamp}`,
        sender: "user",
        text: input,
        timestamp,
      })
    );

    // Add a temporary AI message (for typing indicator)
    const aiMessageId = `ai-${timestamp}`;
    dispatch(
      addMessage({
        id: aiMessageId,
        sender: "ai",
        text: "",
        timestamp: timestamp + 1,
      })
    );

    // Call backend API via mutation
    mutation.mutate(input, {
      onSuccess: (aiResponse: { uiType: string; output: any; text?: string }) => {
        dispatch(
          updateMessage({
            id: aiMessageId,
            text: aiResponse.text || "",
            uiType: aiResponse.uiType,
            payload: aiResponse.output,
          })
        );
      },
      onError: () => {
        dispatch(
          updateMessage({
            id: aiMessageId,
            text: "Error: Unable to fetch AI response.",
          })
        );
      },
    });
  }, [input, dispatch, mutation]);

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
