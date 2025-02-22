"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useAccount } from "wagmi";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { addMessage, updateMessage, setIsProcessing, setInput } from "@/store/chatSlice";
import { useMutation } from "@tanstack/react-query";
import { MessageList } from "./MessageList";

const baseEndpoint = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

export default function ChatBox() {
  const { address } = useAccount();
  const dispatch = useDispatch<AppDispatch>();
  const messages = useSelector((state: RootState) => state.chat.messages);
  const input = useSelector((state: RootState) => state.chat.input);
  const isProcessing = useSelector((state: RootState) => state.chat.isProcessing);
  const processedInputs = useRef<Set<string>>(new Set());

  const mutation = useMutation({
    mutationFn: async (userInput: string) => {
      const response = await axios.post(
        `${baseEndpoint}/v1/agent/dummy_customTx`,
        { message: userInput },
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data.response;
    },
  });

  useEffect(() => {
    const processMessage = async () => {
      // Return early if conditions aren't met
      if (!input || isProcessing || processedInputs.current.has(input)) {
        return;
      }

      const timestamp = Date.now();
      const messageId = `user-${timestamp}`;
      const aiMessageId = `ai-${timestamp}`;

      try {
        // Mark this input as processed
        processedInputs.current.add(input);
        
        // Set processing flag
        dispatch(setIsProcessing(true));

        // Add user message
        dispatch(
          addMessage({
            id: messageId,
            sender: "user",
            text: input,
            timestamp,
          })
        );

        // Add temporary AI message
        dispatch(
          addMessage({
            id: aiMessageId,
            sender: "ai",
            text: "",
            timestamp: timestamp + 1,
          })
        );

        // Get AI response
        const aiResponse = await mutation.mutateAsync(input);

        // Update AI message with response
        dispatch(
          updateMessage({
            id: aiMessageId,
            text: aiResponse.text || "",
            uiType: aiResponse.uiType,
            payload: aiResponse.output,
          })
        );

        // Clear the input after processing
        dispatch(setInput(""));
      } catch (error) {
        // Handle error
        dispatch(
          updateMessage({
            id: aiMessageId,
            text: "Error: Unable to fetch AI response.",
          })
        );
      } finally {
        // Reset processing flag
        dispatch(setIsProcessing(false));
      }
    };

    processMessage();
  }, [input, dispatch, mutation, isProcessing]);

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