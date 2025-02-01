"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Focus, Paperclip, Zap } from "lucide-react"
import { useState } from "react"

export function ChatInterface() {
  const [input, setInput] = useState("")

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
          <Button size="sm" className="h-8">
            <Zap className="w-4 h-4 mr-2" />
            Pro
          </Button>
        </div>
      </div>

      {/* Sample chat messages */}
      <div className="space-y-4">
        <div className="flex justify-end">
          <div className="max-w-[80%] bg-blue-500 text-white p-3 rounded-lg">
            <p className="text-sm">What's the current market sentiment for Ethereum?</p>
          </div>
        </div>
        <div className="flex justify-start">
          <div className="max-w-[80%] bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
            <p className="text-sm">
              Based on social media analysis, the current sentiment for Ethereum is predominantly positive. There's
              significant discussion around the recent network upgrades and increased DeFi activity. Trading volume has
              increased by 15% in the last 24 hours, and social media mentions are up 23%.
            </p>
          </div>
        </div>
        <div className="flex justify-end">
          <div className="max-w-[80%] bg-blue-500 text-white p-3 rounded-lg">
            <p className="text-sm">Can you provide more details on the DeFi activity?</p>
          </div>
        </div>
        <div className="flex justify-start">
          <div className="max-w-[80%] bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
            <p className="text-sm">
              The DeFi sector on Ethereum has seen a surge in activity over the past week. Total Value Locked (TVL)
              across DeFi protocols has increased by 12%, reaching $45 billion. Decentralized exchanges (DEXs) have
              experienced a 20% uptick in trading volume, with Uniswap leading the charge. New yield farming
              opportunities and the launch of innovative lending platforms have contributed to this growth.
              Additionally, there's been increased interest in cross-chain DeFi solutions, bridging Ethereum with other
              blockchain networks.
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
}

