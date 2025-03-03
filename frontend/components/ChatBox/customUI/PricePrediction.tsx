import { memo } from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Prediction {
  token: string
  topic_id: number
  topic_name: string
  network_inference_normalized: string
  current_price: number
}

interface TradingViewChartProps {
  prediction: Prediction[]
}

const PricePrediction: React.FC<TradingViewChartProps> = ({ prediction }) => {
  if (!prediction || !Array.isArray(prediction) || prediction.length === 0) {
    return <div>No predictions available.</div>
  }
  const { token, current_price } = prediction[0]

  return (
    <Card className="bg-transparent text-white border border-white/10 w-full max-w-md">
      <CardHeader>
        <p className="text-sm text-gray-300 mb-2">
          Live Price Prediction Overview: Each prediction represents the forecasted token price for a different time interval.
        </p>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold uppercase">
            {token}
          </CardTitle>
          <Button className="bg-neutral-700 text-white hover:bg-neutral-700">
            Current Price: ${current_price}
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        {prediction.map((item) => (
          <div
            key={item.topic_id}
            className="flex items-center justify-between rounded-md p-3 my-2 border border-white/10 hover:bg-neutral-900"
          >
            <span className="font-semibold">{item.topic_name}</span>
            <span className="font-semibold">
            {parseFloat(item.network_inference_normalized).toFixed(2)}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default memo(PricePrediction)
