'use client'
import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { BarChart3 } from 'lucide-react';
import { AdvancedRealTimeChart } from 'react-ts-tradingview-widgets';

interface MarketAsset {
  name: string;
  price: string;
  change: string;
  isPositive: boolean;
}

const MarketInsights = () => {
  const marketData: MarketAsset[] = [
    { name: "SONIC", price: "$0.5107", change: "+1.73%", isPositive: true },
    { name: "USDC", price: "$1.00", change: "0.00%", isPositive: true },
    { name: "BTC", price: "$52,678.91", change: "+1.73%", isPositive: true },
    { name: "ETH", price: "$2,144.2", change: "+0.16%", isPositive: true },
  ];

  const symbol = "SONICUSD";

  return (
    <section id="market-insights" className="py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-4">
            <BarChart3 className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Real-time Data</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Market Insights at Your Fingertips
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Get real-time market data and insights through natural language queries. 
            Our AI analyzes trends and provides actionable information.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Market Chart */}
          <div className="lg:col-span-2">
            <TradingViewChart symbol={symbol} />
          </div>

          {/* Market Data */}
          <motion.div 
            className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-6">Top Assets</h3>
            
            <div className="space-y-4">
              {marketData.map((asset, index) => (
                <motion.div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xs font-bold">
                      {asset.name.substring(0, 2)}
                    </div>
                    <div>
                      <p className="font-medium">{asset.name}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-medium">{asset.price}</p>
                    <p className={`text-sm flex items-center justify-end ${
                      asset.isPositive ? "text-green-400" : "text-red-400"
                    }`}>
                      {asset.change}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

interface TradingViewChartProps {
  symbol: string;
}

const TradingViewChart = memo(({ symbol }: TradingViewChartProps) => {
  if (typeof window === 'undefined') {
    return null;
  }
  return (
    <div className="w-full h-96">
      <AdvancedRealTimeChart symbol={symbol} theme="dark" autosize interval="120" />
    </div>
  );
});

export default MarketInsights;
