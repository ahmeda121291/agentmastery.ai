'use client'

import { TrendingUp, Zap, Star, Rocket } from 'lucide-react'

const tickerItems = [
  { icon: TrendingUp, text: 'SmartLead up 23% this week', color: 'text-green' },
  { icon: Zap, text: 'Motion.io fastest growing', color: 'text-yellow-500' },
  { icon: Star, text: 'Synthesia maintains #1 spot', color: 'text-blue-500' },
  { icon: Rocket, text: 'Apollo.io new features launched', color: 'text-purple-500' },
  { icon: TrendingUp, text: 'Jasper AI rebounds 15%', color: 'text-green' },
  { icon: Zap, text: 'Clay.com enters top 10', color: 'text-yellow-500' },
  { icon: Star, text: 'ElevenLabs voice quality improved', color: 'text-blue-500' },
  { icon: Rocket, text: 'Perplexity API now available', color: 'text-purple-500' },
]

export function Ticker() {
  return (
    <div
      className="bg-forest text-paper py-1.5 overflow-hidden border-b border-green/20"
      data-testid="site-ticker">
      <div className="ticker overflow-hidden whitespace-nowrap">
        <div className="ticker-content animate-ticker flex">
          {/* Duplicate items for seamless loop */}
          {[...tickerItems, ...tickerItems].map((item, index) => (
            <div key={index} className="flex items-center gap-2 px-6 whitespace-nowrap flex-shrink-0">
              <item.icon className={`h-3 w-3 ${item.color}`} />
              <span className="text-xs font-medium">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}