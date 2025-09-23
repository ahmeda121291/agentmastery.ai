import Link from 'next/link'
import { Container } from '@/components/ui/container'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    'Explore': [
      { href: '/arcade', label: '🎮 Agent Arcade' },
      { href: '/leaderboards', label: '🏆 Leaderboards' },
      { href: '/tools', label: '🛠️ All AI Tools' },
      { href: '/blog', label: '📚 Blog' },
      { href: '/answers', label: '💬 Quick Takes' },
    ],
    'Interactive': [
      { href: '/quiz', label: '🎯 Tool Matcher Quiz' },
      { href: '/games/pop-quiz', label: '🧠 AI Pop Quiz' },
      { href: '/games/bingo', label: '🎲 Tool Bingo' },
      { href: '/calculators/roi', label: '📊 ROI Calculator' },
      { href: '/calculators/switch-savings', label: '💰 Switch & Save' },
    ],
    'Comparisons': [
      { href: '/compare/apollo-vs-zoominfo', label: 'Apollo vs ZoomInfo' },
      { href: '/compare/hubspot-vs-salesforce', label: 'HubSpot vs Salesforce' },
      { href: '/compare/jasper-vs-copy-ai', label: 'Jasper vs Copy.ai' },
      { href: '/compare/loom-vs-vidyard', label: 'Loom vs Vidyard' },
      { href: '/compare/instantly-vs-smartlead', label: 'Instantly vs SmartLead' },
    ],
    'Deep Dive': [
      { href: '/blog/innovative-b2b-lead-generation-strategies-for-2025-outbound-approaches-that-work', label: 'B2B Lead Generation 2025' },
      { href: '/blog/mastering-cold-email-deliverability-proven-strategies-for-success', label: 'Cold Email Deliverability' },
      { href: '/blog/choosing-the-right-ai-sales-automation-tools-a-comprehensive-comparison', label: 'AI Sales Automation Guide' },
      { href: '/blog/mastering-customer-support-chatbot-implementation-for-enhanced-user-experience', label: 'Chatbot Implementation' },
    ],
  }

  return (
    <footer className="bg-mist border-t border-gray-200">
      <Container>
        <div className="py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h3 className="text-sm font-semibold text-forest mb-4">
                  {category}
                </h3>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-ink hover:text-green transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="text-center">
              <span className="text-sm text-ink">
                © {currentYear} AgentMastery.ai. All rights reserved.
              </span>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}