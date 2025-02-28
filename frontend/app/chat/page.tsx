'use client'
import { Header } from '@/components/Header/header';
import { ChatInterface } from '@/components/chat-interface';

export default function ChatPage() {
  return (
    <div className="flex flex-col h-screen w-full bg-background">
      <div className="flex flex-col w-full max-w-7xl mx-auto">
        <Header />
        <main className="flex-1">
          <div className="mx-auto space-y-6">
            <ChatInterface />
          </div>
        </main>
      </div>
    </div>
  );
}
