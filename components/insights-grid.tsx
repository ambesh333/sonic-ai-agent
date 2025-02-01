"use client"

import { Card } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const tokenPriceData = [
  { name: "Jan", price: 1000 },
  { name: "Feb", price: 1200 },
  { name: "Mar", price: 1100 },
  { name: "Apr", price: 1300 },
  { name: "May", price: 1400 },
  { name: "Jun", price: 1350 },
]

export function InsightsGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="p-6 rounded-xl overflow-hidden">
        <h3 className="font-semibold mb-4">ETH Price Analysis</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={tokenPriceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="price" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <div className="space-y-6">
        <Card className="p-6 rounded-xl">
          <h3 className="font-semibold mb-2">Social Sentiment</h3>
          <p className="text-sm text-muted-foreground">
            Positive discussions around new DeFi protocols surge. Overall sentiment: Bullish
          </p>
        </Card>

        <Card className="p-6 rounded-xl">
          <h3 className="font-semibold mb-2">Market Trends</h3>
          <p className="text-sm text-muted-foreground">
            Trading volume increases across DEXes. New governance proposals gaining traction.
          </p>
        </Card>
      </div>
    </div>
  )
}

