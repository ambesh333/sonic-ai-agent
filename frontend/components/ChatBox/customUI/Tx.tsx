"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkle } from "lucide-react"
import * as React from 'react'
import {
  type BaseError,
  useSendTransaction,
  useWaitForTransactionReceipt
} from 'wagmi'
import { parseEther } from 'viem'
import { Button } from "@/components/ui/button"

// -----------------------
// StatusIndicator Component
// -----------------------
interface StatusIndicatorProps {
  status: "success" | "failure" | "pending"
  size?: number
  strokeWidth?: number
  className?: string
}

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: {
        delay: i * 0.2,
        type: "spring",
        duration: 1.5,
        bounce: 0.2,
        ease: "easeInOut",
      },
      opacity: { delay: i * 0.2, duration: 0.2 },
    },
  }),
}

export function StatusIndicator({ status, size = 80, strokeWidth = 4, className = "" }: StatusIndicatorProps) {
  const color =
    status === "success" ? "rgb(16 185 129)" :
      status === "failure" ? "rgb(239 68 68)" :
        "rgb(234 179 8)" // Yellow for pending

  const pathD =
    status === "success" ? "M30 50L45 65L70 35" :
      status === "failure" ? "M35 35L65 65 M65 35L35 65" :
        "M30 50h40" // Pending: horizontal line

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      initial="hidden"
      animate="visible"
      className={className}
    >
      <title>
        {status === "success" ? "Transfer Successful" :
          status === "failure" ? "Transfer Failed" : "Processing..."}
      </title>
      <motion.circle
        cx="50"
        cy="50"
        r="40"
        stroke={color}
        variants={draw}
        custom={0}
        style={{
          strokeWidth,
          strokeLinecap: "round",
          fill: "transparent",
        }}
      />
      <motion.path
        d={pathD}
        stroke={color}
        variants={draw}
        custom={1}
        style={{
          strokeWidth,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          fill: "transparent",
        }}
      />
    </motion.svg>
  )
}

// -----------------------
// TransactionCard Component
// -----------------------
interface TransactionCardProps {
  receiverAddress: string
  amount: string
}

function shortenAddress(address: string, chars = 6): string {
  return `${address?.substring(0, chars)}...${address?.substring(address?.length - 4)}`;
}

export default function TransactionCard({
  receiverAddress,
  amount,
}: TransactionCardProps) {
  // State to control whether the instructions text is shown
  const [showInstructions, setShowInstructions] = React.useState(true);

  const {
    data: hash,
    error,
    isPending,
    sendTransaction
  } = useSendTransaction();

  const { data: receipt, isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash });

  // Determine the transaction status
  const status = isConfirmed ? "success" : error ? "failure" : "pending";

  // Define dynamic background and border classes based on status
  const statusClasses = {
    pending: "bg-yellow-500/10 border border-yellow-500/20",
    success: "bg-emerald-500/10 border border-emerald-500/20",
    failure: "bg-red-500/10 border border-red-500/20",
  }[status];

  // Function to initiate the transaction
  const handleSendTransaction = () => {
    if (!receiverAddress || !amount) {
      alert("Receiver address and amount are required");
      return;
    }
    // Hide instructions when the send button is clicked
    setShowInstructions(false);
    sendTransaction({
      to: receiverAddress as `0x${string}`,
      value: parseEther(amount)
    });
  };

  return (
    // Card with AI theme: overall left alignment with a transparent glassmorphism background and dynamic border
    <Card className={`w-full max-w-sm ml-4 min-h-[300px] relative ${statusClasses} backdrop-blur-lg`}>
      {/* Left top icon, matching AI theme */}
      <div className="absolute -top-3 -left-3">
        <Sparkle size={24} />
      </div>
      <CardContent className="space-y-4">
        {/* Instruction Text - shown until Send Transaction is clicked */}

        {/* Animated Status Indicator - center aligned */}
        <div className="flex justify-center">
          <div className="relative">
            <motion.div
              className="absolute inset-0 blur-xl rounded-full"
              // Use a tone based on the status for the animated background
              style={{
                backgroundColor: status === "pending" ? "rgba(234, 179, 8, 0.1)" :
                  status === "success" ? "rgba(16, 185, 129, 0.1)" :
                    "rgba(239, 68, 68, 0.1)"
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            />
            <StatusIndicator
              status={status}
              size={80}
              strokeWidth={4}
              className="relative z-10 drop-shadow-[0_0_10px_rgba(0,0,0,0.1)]"
            />
          </div>
        </div>

        {/* Transaction Status Message - center aligned */}
        <div className="text-center">
          <motion.h2
            className={`text-lg tracking-tighter font-semibold uppercase ${status === "success" ? "text-emerald-400" : status === "failure" ? "text-red-400" : "text-yellow-400"}`}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.4 }}
          >
            {status === "pending" ? "Sending Transaction..." : status === "success" ? "Transfer Successful" : "Transfer Failed"}
          </motion.h2>
        </div>

        {/* Receiver Block - center aligned */}
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-2 justify-center">
            <span className="text-xs font-medium text-gray-300">Receiver:</span>
            <span className="font-medium text-gray-100 tracking-tight">
              {shortenAddress(receiverAddress)}
            </span>
          </div>
        </div>

        {/* Transaction Details - left aligned */}
        <div className="flex flex-col gap-1 mt-4 w-full">
          {/* Amount Detail */}
          <div className="flex justify-between bg-zinc-800/50 rounded-xl p-3 border border-zinc-800 backdrop-blur-md">
            <span className="text-xs font-medium text-gray-400">
              {status === "pending" ? "Amount Sending" : "Amount Sent"}
            </span>
            <span className="font-medium text-gray-100 tracking-tight">{amount} ETH</span>
          </div>
          {/* Gas Fees Detail (only when not pending) */}
          {status !== "pending" && (
            <div className="flex justify-between bg-zinc-800/50 rounded-xl p-3 border border-zinc-800 backdrop-blur-md">
              <span className="text-xs font-medium text-gray-400">Gas Fees</span>
              <span className="font-medium text-gray-100 tracking-tight">
                {receipt?.gasUsed && receipt?.effectiveGasPrice
                  ? `${(parseFloat(receipt.gasUsed.toString()) * parseFloat(receipt.effectiveGasPrice.toString()) / 1e18).toFixed(6)} ETH`
                  : "Pending"}
              </span>
            </div>
          )}
        </div>

        {/* Send Transaction Button - center aligned */}
        <div className="flex justify-center w-full">
          <button
            onClick={handleSendTransaction}
            disabled={isPending || isConfirming}
            className="px-4 py-2 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            {isPending ? "Sending..." : "Send Transaction"}
          </button>
        </div>

        {/* Tx Link Button - center aligned */}
        {hash && (
          <div className="relative flex justify-center mt-4 w-full">
            <Button asChild className="relative bg-gray-800 text-gray-200 hover:bg-gray-700 rounded-lg">
              <a
                href={`https://testnet.sonicscan.org/tx/${hash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 px-4 py-2 font-semibold"
              >
                Tx Link
              </a>
            </Button>
          </div>
        )}
        {showInstructions && (
          <div className="relative overflow-hidden text-center p-2 bg-gray-800/50 rounded-lg mt-1 border border-gray-700">
            <p className="text-sm text-gray-200 relative z-10">
              Click on "Send Transaction" button to continue.
            </p>
            {/* Shimmer effect layer */}
            <div className="absolute inset-0 animate-shimmer" />
            <style jsx>{`
              @keyframes shimmer {
                0% {
                  background-position: -200px 0;
                }
                100% {
                  background-position: 200px 0;
                }
              }
              .animate-shimmer {
                background: linear-gradient(
                  to right,
                  transparent 0%,
                  rgba(255, 255, 255, 0.2) 50%,
                  transparent 100%
                );
                background-size: 200% auto;
                animation: shimmer 2s linear infinite;
              }
            `}</style>
          </div>
        )}

        {/* Error Handling - center aligned */}
        {error && (
          <div className="text-red-500 text-sm text-center">
            Error: {(error as any)?.shortMessage || error?.message}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
