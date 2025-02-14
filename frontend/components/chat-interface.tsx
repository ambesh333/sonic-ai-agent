"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import ActionSearchBar from "./search-box";
import ChatBox from "./ChatBox/main";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { setQuery, setChatMode, setInput } from "@/store/chatSlice";
import {
  Search,
  Send,
  BarChart2,
  Globe,
  Video,
  PlaneTakeoff,
  AudioLines,
} from "lucide-react";

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

/* -------------------------------------------------------------------------
   IntroSection Component
   - Renders the initial UI with title, tags, and the search bar.
   - Uses Redux to read and update the query.
------------------------------------------------------------------------- */
function IntroSection() {
  const dispatch = useDispatch<AppDispatch>();
  const query = useSelector((state: RootState) => state.chat.query);

  const handleInputChange = (value: string) => {
    dispatch(setQuery(value));
  };

  const handleSearchClick = () => {
    // Enter chat mode using the current query.
    dispatch(setChatMode(true));
    dispatch(setInput(query));
    dispatch(setQuery(""));
  };

  return (
    <motion.div
      key="intro"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      className="flex flex-col w-full max-w-3xl divide-y divide-transparent"
    >
      {/* Spacer */}
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
            setQuery={handleInputChange}
            showSuggestions={true}
            onSearchClick={handleSearchClick}
          />
        </Card>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------
   ChatSection Component
   - Renders the chat UI along with a bottom search bar.
   - Includes a “Back” button to exit chat mode.
   - Uses Redux to read/update the query and input.
------------------------------------------------------------------------- */
function ChatSection() {
  const dispatch = useDispatch<AppDispatch>();
  const query = useSelector((state: RootState) => state.chat.query);
  const input = useSelector((state: RootState) => state.chat.input);

  const handleInputChange = (value: string) => {
    dispatch(setQuery(value));
  };

  // (Optional) In chat mode you might still want to re-trigger a search action.
  const handleSearchClick = () => {
    dispatch(setChatMode(true));
    dispatch(setInput(query));
    dispatch(setQuery(""));
  };

  const handleBackClick = () => {
    dispatch(setChatMode(false));
  };

  return (
    <motion.div
      key="chat"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="relative flex flex-col w-full max-w-3xl h-full h-svh max-h-[calc(100vh-10rem)]"
    >
      {/* Chat area */}
      <div className="flex-1 pb-32 overflow-y-auto overflow-x-hidden">
        <ChatBox />
      </div>

      {/* Fixed search bar at bottom */}
      <div className="absolute bottom-0 left-0 right-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Card className="w-full max-w-3xl px-4 border border-border rounded-lg shadow-md mx-auto">
          <ActionSearchBar
            actions={allActions}
            query={query}
            setQuery={handleInputChange}
            showSuggestions={false}
            onSearchClick={handleSearchClick}
          />
          <Button variant="outline" className="w-full" onClick={handleBackClick}>
            Back
          </Button>
        </Card>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------
   ChatInterface Component
   - Decides whether to show the Intro or Chat mode based on Redux state.
------------------------------------------------------------------------- */
export function ChatInterface() {
  const chatMode = useSelector((state: RootState) => state.chat.chatMode);

  return (
    <div className="flex flex-col items-center justify-center p-6 max-h-[calc(100vh-5rem)] min-h-[calc(100vh-5rem)]">
      <AnimatePresence mode="wait">
        {!chatMode ? <IntroSection /> : <ChatSection />}
      </AnimatePresence>
    </div>
  );
}
