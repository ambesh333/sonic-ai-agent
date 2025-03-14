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
import { useAccount } from "wagmi";

const tags = [
  "Get account balance",
  "Send tokens",
  "Estimate gas",
  "Get token price chart",
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
    description: "Get Bitcoin token price chart"
  },
  {
    id: "5",
    label: "Prediction",
    icon: <Globe className="h-4 w-4 text-blue-500" />,
    description: "Get price prediction for Bitcoin"
  },
];

/* -------------------------------------------------------------------------
   IntroSection Component
   - Renders the initial UI with title, tags, and the search bar.
   - Uses Redux to read and update the query.
------------------------------------------------------------------------- */
function IntroSection() {
  const { address } = useAccount();
  const dispatch = useDispatch<AppDispatch>();
  const query = useSelector((state: RootState) => state.chat.query);

  const handleInputChange = (value: string) => {
    dispatch(setQuery(value));
  };

  const handleSearchClick = (selectedLabel?: string) => {
    let labelToUse = selectedLabel ?? query;
    if (labelToUse === "Balance") {
      labelToUse = `Balance of ${address}`;
    }
    if (labelToUse === "Chart") {
      labelToUse = `Give chart for Bitcoin token`;
    }
    if (labelToUse === "Prediction") {
      labelToUse = `Predict Bitcoin price`;
    }
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
      <div className="h-2/7"></div>
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
      className="relative w-full max-w-3xl mx-auto min-h-[calc(100vh-5rem)] flex flex-col"
    >
      <div className="flex-1 overflow-y-scroll overflow-x-hidden pr-4 pb-20 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent">
        <ChatBox />
      </div>
      <div className="sticky bottom-0 left-0 right-0 px-4 py-2 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10">
        <Card className="w-full rounded-lg shadow-md">
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
