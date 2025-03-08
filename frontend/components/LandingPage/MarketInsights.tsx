'use client'
import React, { useState, useEffect, memo } from 'react';
import { motion } from 'framer-motion';
import { BarChart3 } from 'lucide-react';
import { AdvancedRealTimeChart } from 'react-ts-tradingview-widgets';
import { usePriceMutation } from '@/hooks/usePriceMutation';

interface MarketAsset {
  name: string;
  price: string;
}

const MarketInsights = () => {
  const tokenList = [
    { name: "SONIC", id: "s" },
    { name: "USDC", id: "usd" },
    { name: "ETH", id: "ethereum" },
    { name: "BTC", id: "bitcoin" },
  ];

  const formatPrice = (priceInWei: number | undefined, tokenName: string): string => {
    if (priceInWei === undefined || priceInWei === null) return "N/A";
    const priceInEther = priceInWei / 1e18;
  
    if (tokenName === "SONIC") {
      if (priceInEther < 1e-6) {
        return `$${priceInEther.toExponential(2)}`;
      }
      return `$${priceInEther.toFixed(9)}`;
    }
    return `$${priceInEther.toFixed(2)}`;
  };
  

  const [marketData, setMarketData] = useState<MarketAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const priceMutation = usePriceMutation();

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const data = await Promise.all(
          tokenList.map(async (token) => {
            const response = await priceMutation.mutateAsync(token.id);
            return {
              name: token.name,
              price: formatPrice(response.price, token.name),
            };
          })
        );
        setMarketData(data);
      } catch (error) {
        console.error('Error fetching market data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMarketData();
  }, []);

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
              {loading ? (
                <p>Loading market data...</p>
              ) : (
                marketData.map((asset, index) => (
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
                    </div>
                  </motion.div>
                ))
              )}
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
