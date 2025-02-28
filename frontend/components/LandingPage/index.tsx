'use client'

import { Header } from '@/components/Header/header';
import HeroSection from '@/components/LandingPage/HeroSection';
import BentoGrid from '@/components/LandingPage/BentoGrid';
import FAQ from '@/components/LandingPage/FAQ';
import MarketInsights from '@/components/LandingPage/MarketInsights';
import TokenTransfer from '@/components/LandingPage/TokenTransfer';
import Footer from '@/components/LandingPage/Footer';

export default function LandingPage() {
  return (
    <div className="flex flex-col h-screen w-full bg-background">
      <div className="flex flex-col w-full max-w-7xl mx-auto">
        <Header />
        <main className="flex-1">
          <div className="mx-auto space-y-6">
            <HeroSection />
            <BentoGrid />
            <TokenTransfer />
            <MarketInsights />
            <FAQ />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
