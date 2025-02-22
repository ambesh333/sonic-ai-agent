import { memo, useEffect, useState } from 'react';
import { AdvancedRealTimeChart } from 'react-ts-tradingview-widgets';

interface TradingViewChartProps {
  symbol: string;
}

const TradingViewChart: React.FC<TradingViewChartProps> = ({ symbol }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-96 relative">
      {!loaded && (
        <div className="absolute inset-0 bg-gray-300 animate-pulse" />
      )}
      <div className="flex w-full h-full min-w-[700px]  min-h-[400px] flex-col">
      <AdvancedRealTimeChart
        symbol={symbol}
        theme="dark"
        autosize
        interval='D'
      />
      </div>
    </div>
  );
};

export default memo(TradingViewChart);