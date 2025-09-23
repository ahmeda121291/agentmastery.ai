export type ArcadeItem = {
  slug: string              // route path
  title: string
  blurb: string
  kind: 'Quiz' | 'Calculator' | 'Game'
  tags: string[]            // e.g., ["Outbound","Data","Video"]
  cta: string               // button text
  highlight?: boolean       // featured
}

export const ARCADE_ITEMS: ArcadeItem[] = [
  {
    slug: '/quiz',
    title: 'Tool Matcher Quiz',
    blurb: 'Answer 6 questions to get your ideal AI stack.',
    kind: 'Quiz',
    tags: ['General', 'Stack'],
    cta: 'Take the Quiz',
    highlight: true
  },
  {
    slug: '/calculators/roi',
    title: 'Cold Email ROI',
    blurb: 'Estimate revenue uplift from SmartLead improvements.',
    kind: 'Calculator',
    tags: ['Outbound', 'Email'],
    cta: 'Calculate ROI',
    highlight: true
  },
  {
    slug: '/calculators/switch-savings',
    title: 'Switch & Save: Data Tools',
    blurb: 'Compare ZoomInfo vs Apollo seat costs and savings.',
    kind: 'Calculator',
    tags: ['Data', 'Prospecting'],
    cta: 'Compare Savings'
  },
  {
    slug: '/games/bingo',
    title: 'AI Sales Bingo',
    blurb: 'Check off your weekly AI wins and share your card.',
    kind: 'Game',
    tags: ['Outbound', 'Fun'],
    cta: 'Play Bingo'
  },
  {
    slug: '/games/pop-quiz',
    title: 'AI Pop Quiz',
    blurb: '10 questions, 60 seconds—test your tool IQ.',
    kind: 'Game',
    tags: ['General', 'Learning'],
    cta: 'Start Pop Quiz'
  }
]

// Get all unique tags
export function getUniqueTags(): string[] {
  const tags = new Set<string>()
  ARCADE_ITEMS.forEach(item => {
    item.tags.forEach(tag => tags.add(tag))
  })
  return Array.from(tags).sort()
}

// Get kind labels
export const KIND_LABELS = {
  Quiz: { label: 'Quiz', emoji: '📝', color: 'bg-green/10 text-green border-green/20' },
  Calculator: { label: 'Calculator', emoji: '🧮', color: 'bg-forest/10 text-forest border-forest/20' },
  Game: { label: 'Game', emoji: '🎮', color: 'bg-blue-500/10 text-blue-600 border-blue-500/20' }
}