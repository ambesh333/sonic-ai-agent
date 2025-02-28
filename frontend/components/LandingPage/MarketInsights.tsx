'use client'
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const MarketInsights = () => {
  const [chartData, setChartData] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Generate random chart data
  useEffect(() => {
    const generateData = () => {
      const newData = Array.from({ length: 24 }, () => 
        Math.floor(Math.random() * 50) + 50
      );
      setChartData(newData);
      setIsLoading(false);
    };
    
    generateData();
    
    // Update data periodically
    const interval = setInterval(() => {
      setChartData(prev => {
        const newData = [...prev];
        newData.shift();
        newData.push(Math.floor(Math.random() * 50) + 50);
        return newData;
      });
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  const marketData = [
    { name: "SONIC", price: "$0.0842", change: "+5.67%", isPositive: true },
    { name: "USDC", price: "$1.00", change: "+0.01%", isPositive: true },
    { name: "ETH", price: "$3,245.78", change: "-2.34%", isPositive: false },
    { name: "BTC", price: "$52,678.91", change: "+1.23%", isPositive: true },
  ];

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
          <motion.div 
            className="lg:col-span-2 bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 overflow-hidden"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">SONIC Price Chart</h3>
              <div className="flex items-center gap-2 text-green-400">
                <TrendingUp className="w-4 h-4" />
                <span>+5.67%</span>
              </div>
            </div>
            
            {isLoading ? (
              <div className="h-64 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <div className="h-64 relative">
                {/* Chart visualization */}
                <div className="absolute inset-0 flex items-end justify-between">
                  {chartData.map((value, index) => (
                    <motion.div
                      key={index}
                      className="w-full bg-gradient-to-t from-blue-500 to-purple-500 rounded-t"
                      style={{ height: `${value}%` }}
                      initial={{ height: 0 }}
                      animate={{ height: `${value}%` }}
                      transition={{ duration: 0.5, delay: index * 0.02 }}
                    ></motion.div>
                  ))}
                </div>
                
                {/* Grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                  {[0, 1, 2, 3].map((_, index) => (
                    <div key={index} className="w-full h-px bg-white/10"></div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="mt-6 grid grid-cols-4 gap-4">
              {["1H", "24H", "7D", "30D"].map((period, index) => (
                <button
                  key={index}
                  className={`py-2 rounded-lg text-center text-sm font-medium transition-colors ${
                    index === 1 
                      ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" 
                      : "bg-white/5 text-gray-400 hover:bg-white/10"
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </motion.div>
          
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
                      <p className="text-sm text-gray-400">Sonic Chain</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-medium">{asset.price}</p>
                    <p className={`text-sm flex items-center justify-end ${
                      asset.isPositive ? "text-green-400" : "text-red-400"
                    }`}>
                      {asset.isPositive ? (
                        <ArrowUpRight className="w-3 h-3 mr-1" />
                      ) : (
                        <ArrowDownRight className="w-3 h-3 mr-1" />
                      )}
                      {asset.change}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.button
              className="w-full mt-6 py-3 rounded-lg bg-white/10 text-center text-sm font-medium hover:bg-white/15 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View All Assets
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MarketInsights;