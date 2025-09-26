import { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Chatbot Savings Calculator',
  description: 'Calculate customer support cost savings and ROI from implementing AI chatbots',
  routeInfo: { pathname: '/arcade/chatbot-savings' }
});
