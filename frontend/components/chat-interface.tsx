"use client"

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Focus, Paperclip, Zap } from "lucide-react";
import { useState } from "react";
import { useCopilotChat } from "@copilotkit/react-core";
import { Role, TextMessage } from "@copilotkit/runtime-client-gql";

export function ChatInterface() {
  const [input, setInput] = useState("");
  const {
    visibleMessages,
    appendMessage,
    setMessages,
    deleteMessage,
    reloadMessages,
    stopGeneration,
    isLoading,
  } = useCopilotChat();

  const sendMessage = () => {
    if (!input.trim()) return;
    appendMessage(new TextMessage({ content: input, role: Role.User }));
    setInput("");
  };

  return (
    <Card className="p-6 rounded-xl">
      <h2 className="text-2xl font-bold text-center mb-6">What do you want to know?</h2>
      <div className="relative max-w-2xl mx-auto mb-8">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything about market trends and sentiment..."
          className="pr-32 h-12 text-lg"
        />
        <div className="absolute right-2 top-2 flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Focus className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Paperclip className="w-4 h-4" />
          </Button>
          <Button onClick={sendMessage} size="sm" className="h-8">
            <Zap className="w-4 h-4 mr-2" />
            Pro
          </Button>
        </div>
      </div>

      {/* Chat messages */}
      <div className="space-y-4">
        {visibleMessages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === Role.User ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] p-3 rounded-lg text-sm ${
                msg.role === Role.User ? "bg-blue-500 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-900"
              }`}
            >
              <p>{msg.content}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
