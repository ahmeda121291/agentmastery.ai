import { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Chatbot Savings | AgentMastery',
  description: 'Interactive chatbot savings calculator and tool',
  routeInfo: { pathname: '/arcade/chatbot-savings' }
});
