import { memo } from "react"
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from "@/components/ui/card"

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


            {/* Token & Price Section */}
            <div className="flex items-center justify-between bg-neutral-900 px-4 py-3 border border-white/10">
                <CardTitle className="text-lg font-bold uppercase text-white">
                    {token}
                </CardTitle>
                <div className="relative">
                    <span className="font-semibold text-white">Current Price: ${current_price}</span>
                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                </div>
            </div>

            {/* Predictions Content */}
            <CardContent>
                {prediction.map((item) => (
                    <div
                        key={item.topic_id}
                        className="flex items-center justify-between p-4 my-2 border border-white/10 hover:bg-neutral-900 transition"
                    >
                        <span className="font-semibold">{item.topic_name}</span>
                        <span className="font-semibold">
                            {parseFloat(item.network_inference_normalized).toFixed(2)}
                        </span>
                    </div>
                ))}
            </CardContent>

            {/* Footer Section */}
            <CardFooter className="bg-white text-black font-medium text-center py-3 flex justify-center items-center">
                Powered by Allora Network
            </CardFooter>
        </Card>
    )
}

export default memo(PricePrediction)
