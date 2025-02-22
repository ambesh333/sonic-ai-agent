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
  Strikethrough,
  Globe,
  Fuel,
  CircleDollarSign,
  ChartNoAxesCombined,
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
    label: "Balance",
    icon: <CircleDollarSign className="h-4 w-4 text-blue-500" />,
    description: "Get your account balance"
  },
  {
    id: "2",
    label: "Send Sonic Tokens",
    icon: <Strikethrough className="h-4 w-4 text-orange-500" />,
    description: "Send tokens to another address"
  },
  {
    id: "3",
    label: "Get Gas Estimate",
    icon: <Fuel className="h-4 w-4 text-purple-500" />,
    description: "Estimate gas for a transaction"
  },
  {
    id: "4",
    label: "Chart",
    icon: <ChartNoAxesCombined className="h-4 w-4 text-green-500" />,
    description: "Get Sonic token price chart"
  },
  {
    id: "5",
    label: "Translate",
    icon: <Globe className="h-4 w-4 text-blue-500" />,
    description: "gpt-4o"
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

  const handleSearchClick = (selectedLabel?: string) => {
    const labelToUse = selectedLabel ?? query;
    dispatch(setChatMode(true));
    dispatch(setInput(query || labelToUse));
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
        <Card className="w-full max-w-xl p-4  rounded-lg shadow-md">
          <ActionSearchBar
            actions={allActions}
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
        <Card className="w-full max-w-3xl px-4  rounded-lg shadow-md mx-auto">
          <ActionSearchBar
            actions={allActions}
            showSuggestions={false}
            onSearchClick={handleSearchClick}
          />
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
