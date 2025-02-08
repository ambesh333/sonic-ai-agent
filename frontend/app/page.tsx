import { ChatInterface } from "@/components/chat-interface";
import { InsightsGrid } from "@/components/insights-grid";
import { Header } from "@/components/Header/header";

export default function Home() {
  return (
    <div className="flex flex-col h-screen w-full bg-background ">
      <div className="flex flex-col w-full max-w-7xl mx-auto ">
        <Header />
        <main className="flex-1 ">
          <div className="mx-auto space-y-6 ">
            <ChatInterface />
            {/* <InsightsGrid /> */}
          </div>
        </main>
      </div>
    </div>
  );
}
