"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowUpDownIcon } from "lucide-react"
import * as React from 'react'
import { 
  type BaseError, 
  useSendTransaction, 
  useWaitForTransactionReceipt 
} from 'wagmi' 
import { parseEther } from 'viem' 

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
    const { 
      data: hash,
      error, 
      isPending, 
      sendTransaction 
    } = useSendTransaction();
  
    const { data: receipt, isLoading: isConfirming, isSuccess: isConfirmed } = 
      useWaitForTransactionReceipt({ hash });
  
    // Function to initiate the transaction
    const handleSendTransaction = () => {
      if (!receiverAddress || !amount) {
        alert("Receiver address and amount are required");
        return;
      }
  
      sendTransaction({ 
        to: receiverAddress as `0x${string}`, 
        value: parseEther(amount) 
      });
    };
  
    return (
      <Card className="w-full max-w-sm mx-auto min-h-[300px] flex flex-col justify-center bg-zinc-900 border-zinc-800 backdrop-blur-sm">
        <CardContent className="space-y-4 flex flex-col items-center justify-center">
          {/* Animated Status Indicator */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.4,
              ease: [0.4, 0, 0.2, 1],
              scale: { type: "spring", damping: 15, stiffness: 200 },
            }}
          >
            <div className="relative">
              <motion.div
                className="absolute inset-0 blur-xl bg-emerald-500/10 rounded-full"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
              />
              <StatusIndicator
                status={isConfirmed ? "success" : error ? "failure" : "pending"}
                size={80}
                strokeWidth={4}
                className="relative z-10 drop-shadow-[0_0_10px_rgba(0,0,0,0.1)]"
              />
            </div>
          </motion.div>
  
          {/* Transaction Status Message */}
          <motion.div
            className="space-y-2 text-center w-full"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            <motion.h2
              className="text-lg text-zinc-100 tracking-tighter font-semibold uppercase"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.4 }}
            >
              {isConfirmed ? "Transfer Successful" : error ? "Transfer Failed" : "Processing..."}
            </motion.h2>
  
            {/* Sender and Receiver Block */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-zinc-500 flex items-center gap-1.5">
                  Receiver:
                </span>
                <span className="font-medium text-zinc-100 tracking-tight">
                 {shortenAddress(receiverAddress)}
                </span>
              </div>
            </div>
  
            {/* Transaction Details */}
            <div className="flex flex-col gap-1 mt-4 w-full">
              <div className="flex justify-between bg-zinc-800/50 rounded-xl p-3 border border-zinc-800 backdrop-blur-md">
                <span className="text-xs font-medium text-zinc-500">Amount Sent</span>
                <span className="font-medium text-zinc-100 tracking-tight">{amount} ETH</span>
              </div>
              <div className="flex justify-between bg-zinc-800/50 rounded-xl p-3 border border-zinc-800 backdrop-blur-md">
                <span className="text-xs font-medium text-zinc-500">Gas Fees</span>
                <span className="font-medium text-zinc-100 tracking-tight">
                  {receipt?.gasUsed && receipt?.effectiveGasPrice
                    ? `${(parseFloat(receipt.gasUsed.toString()) * parseFloat(receipt.effectiveGasPrice.toString()) / 1e18).toFixed(6)} ETH`
                    : "Pending"}
                </span>
              </div>
              {/* New Transaction Hash Block */}
              {hash && (
                <div className="flex justify-between bg-zinc-800/50 rounded-xl p-3 border border-zinc-800 backdrop-blur-md">
                  <span className="text-xs font-medium text-zinc-500">Tx Hash</span>
                  <span className="font-medium text-zinc-100 tracking-tight">{hash}</span>
                </div>
              )}
            </div>
          </motion.div>
  
          {/* Send Transaction Button */}
          <button
            onClick={handleSendTransaction}
            disabled={isPending || isConfirming}
            className="px-4 py-2 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            {isPending ? "Sending..." : "Send Transaction"}
          </button>
  
          {/* Error Handling */}
          {error && (
            <div className="text-red-500 text-sm">
              Error: {(error as any)?.shortMessage || error?.message}
            </div>
          )}
        </CardContent>
      </Card>
    );
  }
