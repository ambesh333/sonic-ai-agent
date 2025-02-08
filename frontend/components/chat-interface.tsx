"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import ActionSearchBar from "./search-box";
import {
  Search,
  Send,
  BarChart2,
  Globe,
  Video,
  PlaneTakeoff,
  AudioLines,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChatBox from "./ChatBox/main";

const tags = [
  "Clean account fields",
  "Clean contact fields",
  "Create master 'People' list",
  "Account Fit Score",
  "Match leads to account",
];

const allActions = [
  {
    id: "1",
    label: "Book tickets",
    icon: <PlaneTakeoff className="h-4 w-4 text-blue-500" />,
    description: "Operator",
    short: "⌘K",
    end: "Agent",
  },
  {
    id: "2",
    label: "Summarize",
    icon: <BarChart2 className="h-4 w-4 text-orange-500" />,
    description: "gpt-4o",
    short: "⌘cmd+p",
    end: "Command",
  },
  {
    id: "3",
    label: "Screen Studio",
    icon: <Video className="h-4 w-4 text-purple-500" />,
    description: "gpt-4o",
    short: "",
    end: "Application",
  },
  {
    id: "4",
    label: "Talk to Jarvis",
    icon: <AudioLines className="h-4 w-4 text-green-500" />,
    description: "gpt-4o voice",
    short: "",
    end: "Active",
  },
  {
    id: "5",
    label: "Translate",
    icon: <Globe className="h-4 w-4 text-blue-500" />,
    description: "gpt-4o",
    short: "",
    end: "Command",
  },
];

/* ---------------------------------------------
   IntroSection Component
   - Renders the initial UI with title, tags, and the search bar
---------------------------------------------- */
function IntroSection({
  query,
  setQuery,
  onSearchClick,
}: {
  query: string;
  setQuery: (q: string) => void;
  onSearchClick: () => void;
}) {
  return (
    <motion.div
      key="intro"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      className="flex flex-col w-full max-w-3xl divide-y divide-transparent"
    >
      {/* Empty space */}
      <div className="h-2/7"></div>
      {/* Main content */}
      <div className="h-3/7 flex flex-col items-center">
        <h2 className="text-3xl font-bold text-center mb-4">
          What do you want to do?
        </h2>
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tags.map((tag, index) => (
            <Button key={index} variant="outline" className="rounded-full">
              {tag}
            </Button>
          ))}
        </div>
        <Card className="w-full max-w-xl p-4 border border-border rounded-lg shadow-md">
          <ActionSearchBar
            actions={allActions}
            query={query}
            setQuery={setQuery}
            showSuggestions={true}
            onSearchClick={onSearchClick}
          />
        </Card>
      </div>
    </motion.div>
  );
}

/* ---------------------------------------------
   ChatSection Component
   - Renders the chat UI along with the search bar (moved to the bottom)
   - Includes a Back button to return to the intro mode
---------------------------------------------- */
  
function ChatSection({
  query,
  setQuery,
  onSearchClick,
  input,
  onBack,
}: {
  query: string;
  setQuery: (q: string) => void;
  onSearchClick: () => void;
  input: string;
  onBack: () => void;
}) {
  return (
    <motion.div
      key="chat"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="relative flex flex-col w-full max-w-3xl h-full h-svh max-h-[calc(100vh-10rem)]"
    >
      {/* Scrollable Chat Area with extra bottom padding */}
      <div className="flex-1 pb-32 overflow-y-auto overflow-x-hidden">
        <ChatBox input={input} />
      </div>

      {/* Fixed Search Bar at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Card className="w-full max-w-3xl px-4 border border-border rounded-lg shadow-md mx-auto">
          <ActionSearchBar
            actions={allActions}
            query={query}
            setQuery={setQuery}
            showSuggestions={false}
            onSearchClick={onSearchClick}
          />
          <Button variant="outline" className="w-full " onClick={onBack}>
            Back
          </Button>
        </Card>
      </div>
    </motion.div>
  );
}


/* ---------------------------------------------
   ChatInterface (Main Component)
   - Decides whether to show the Intro or Chat mode.
   - Uses AnimatePresence for smooth transitions.
---------------------------------------------- */
export function ChatInterface() {
  const [query, setQuery] = useState("");
  const [chatMode, setChatMode] = useState(false);
  const [input , setInput] = useState("");

  const handleSearchClick = () => {
    setChatMode(true);
    setInput(query);
    setQuery("");
  };

  const handleBackClick = () => {
    setChatMode(false);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 max-h-[calc(100vh-5rem)] min-h-[calc(100vh-5rem)]">
      <AnimatePresence mode="wait">
        {!chatMode ? (
          <IntroSection
            query={query}
            setQuery={setQuery}
            onSearchClick={handleSearchClick}
          />
        ) : (
          <ChatSection
            query={query}
            setQuery={setQuery}
            input={input}
            onSearchClick={handleSearchClick}
            onBack={handleBackClick}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
