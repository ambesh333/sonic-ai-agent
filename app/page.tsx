import { ChatInterface } from "@/components/chat-interface"
import { InsightsGrid } from "@/components/insights-grid"
import { Header } from "@/components/Header/header"

export default function Home() {
  return (
    <div className="flex min-h-screen bg-background">
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="mx-auto space-y-6">
            <ChatInterface />
            <InsightsGrid />
          </div>
        </main>
      </div>
    </div>
  )
}
