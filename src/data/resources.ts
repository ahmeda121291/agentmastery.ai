export interface ResourceCategory {
  id: string
  name: string
  description: string
  icon: string
  color: string
}

export interface Resource {
  id: string
  title: string
  description: string
  category: string
  type: 'template' | 'guide' | 'checklist' | 'toolkit' | 'worksheet' | 'ebook'
  format: 'pdf' | 'docx' | 'xlsx' | 'notion' | 'sheets' | 'figma' | 'link'
  downloadUrl?: string
  externalUrl?: string
  isAffiliate?: boolean
  affiliateUrl?: string
  size?: string
  pages?: number
  lastUpdated: string
  featured: boolean
  tags: string[]
  previewImage?: string
  relatedQuizzes?: string[]
  relatedTools?: string[]
  relatedBlogPosts?: string[]
}

export interface DownloadableAsset {
  id: string
  title: string
  description: string
  filename: string
  downloadPath: string
  category: string
  type: string
  size: string
  format: string
  lastUpdated: string
  downloadCount?: number
  featured: boolean
}

export const resourceCategories: ResourceCategory[] = [
  {
    id: 'ai-strategy',
    name: 'AI Strategy',
    description: 'Strategic frameworks and planning tools for AI implementation',
    icon: '🎯',
    color: 'bg-blue-100 text-blue-800'
  },
  {
    id: 'tool-selection',
    name: 'Tool Selection',
    description: 'Guides and frameworks for choosing the right AI tools',
    icon: '🔧',
    color: 'bg-green-100 text-green-800'
  },
  {
    id: 'implementation',
    name: 'Implementation',
    description: 'Step-by-step guides for rolling out AI tools',
    icon: '⚡',
    color: 'bg-purple-100 text-purple-800'
  },
  {
    id: 'templates',
    name: 'Templates',
    description: 'Ready-to-use templates and worksheets',
    icon: '📋',
    color: 'bg-orange-100 text-orange-800'
  },
  {
    id: 'roi-tracking',
    name: 'ROI Tracking',
    description: 'Measurement and optimization frameworks',
    icon: '📊',
    color: 'bg-indigo-100 text-indigo-800'
  },
  {
    id: 'team-training',
    name: 'Team Training',
    description: 'Resources for training teams on AI tools',
    icon: '👥',
    color: 'bg-pink-100 text-pink-800'
  }
]

export const resources: Resource[] = [
  {
    id: 'ai-tool-evaluation-framework',
    title: 'AI Tool Evaluation Framework',
    description: 'A comprehensive scoring system to evaluate and compare AI tools based on your specific business needs. Includes weighted criteria, ROI calculations, and decision matrices.',
    category: 'tool-selection',
    type: 'toolkit',
    format: 'sheets',
    externalUrl: 'https://docs.google.com/spreadsheets/d/1234567890/edit?usp=sharing&copy=true',
    size: '2MB',
    lastUpdated: '2024-12-01',
    featured: true,
    tags: ['evaluation', 'decision-making', 'roi', 'comparison'],
    relatedQuizzes: ['tool-finder'],
    relatedTools: ['all-tools'],
    relatedBlogPosts: ['choosing-right-ai-tools']
  },
  {
    id: 'ai-implementation-checklist',
    title: '90-Day AI Implementation Checklist',
    description: 'A step-by-step checklist for successfully implementing AI tools in your organization. Covers planning, rollout, training, and optimization phases.',
    category: 'implementation',
    type: 'checklist',
    format: 'pdf',
    downloadUrl: '/downloads/90-day-ai-implementation-checklist.pdf',
    size: '1.2MB',
    pages: 8,
    lastUpdated: '2024-11-15',
    featured: true,
    tags: ['implementation', 'checklist', 'planning', 'rollout'],
    relatedQuizzes: ['implementation-readiness'],
    relatedBlogPosts: ['ai-implementation-guide']
  },
  {
    id: 'ai-roi-calculator-template',
    title: 'AI ROI Calculator Template',
    description: 'Calculate the return on investment for your AI tool implementations. Includes cost modeling, productivity gains, and payback period calculations.',
    category: 'roi-tracking',
    type: 'template',
    format: 'sheets',
    externalUrl: 'https://docs.google.com/spreadsheets/d/ai-roi-calculator/edit?usp=sharing&copy=true',
    size: '1.5MB',
    lastUpdated: '2024-12-01',
    featured: true,
    tags: ['roi', 'calculator', 'financial', 'metrics'],
    relatedQuizzes: ['roi-assessment'],
    relatedBlogPosts: ['measuring-ai-roi']
  },
  {
    id: 'ai-strategy-blueprint',
    title: 'AI Strategy Blueprint',
    description: 'A comprehensive guide to developing your organization\'s AI strategy. Includes market analysis, competitive positioning, and roadmap templates.',
    category: 'ai-strategy',
    type: 'ebook',
    format: 'pdf',
    downloadUrl: '/downloads/ai-strategy-blueprint.pdf',
    size: '4.8MB',
    pages: 32,
    lastUpdated: '2024-11-20',
    featured: true,
    tags: ['strategy', 'planning', 'roadmap', 'competitive-analysis'],
    relatedQuizzes: ['strategy-assessment'],
    relatedBlogPosts: ['ai-strategy-fundamentals']
  },
  {
    id: 'team-ai-training-kit',
    title: 'Team AI Training Starter Kit',
    description: 'Complete training materials for introducing your team to AI tools. Includes presentation slides, exercises, and assessment templates.',
    category: 'team-training',
    type: 'toolkit',
    format: 'pdf',
    downloadUrl: '/downloads/team-ai-training-kit.pdf',
    size: '3.2MB',
    pages: 24,
    lastUpdated: '2024-11-10',
    featured: false,
    tags: ['training', 'team', 'onboarding', 'education'],
    relatedQuizzes: ['team-readiness'],
    relatedBlogPosts: ['training-teams-on-ai']
  },
  {
    id: 'ai-vendor-comparison-template',
    title: 'AI Vendor Comparison Template',
    description: 'Standardized template for comparing AI tool vendors. Includes feature matrices, pricing comparisons, and decision criteria.',
    category: 'tool-selection',
    type: 'template',
    format: 'xlsx',
    downloadUrl: '/downloads/ai-vendor-comparison-template.xlsx',
    size: '800KB',
    lastUpdated: '2024-11-25',
    featured: false,
    tags: ['comparison', 'vendor-evaluation', 'features', 'pricing'],
    relatedTools: ['comparison-tools'],
    relatedBlogPosts: ['vendor-selection-guide']
  },
  {
    id: 'ai-security-checklist',
    title: 'AI Security & Privacy Checklist',
    description: 'Essential security and privacy considerations when implementing AI tools. Covers data protection, compliance, and risk assessment.',
    category: 'implementation',
    type: 'checklist',
    format: 'pdf',
    downloadUrl: '/downloads/ai-security-privacy-checklist.pdf',
    size: '1.1MB',
    pages: 6,
    lastUpdated: '2024-11-30',
    featured: false,
    tags: ['security', 'privacy', 'compliance', 'risk-assessment'],
    relatedBlogPosts: ['ai-security-best-practices']
  },
  {
    id: 'monthly-ai-report-template',
    title: 'Monthly AI Performance Report Template',
    description: 'Track and report on your AI tool performance with this comprehensive monthly report template. Includes KPI tracking and executive summaries.',
    category: 'roi-tracking',
    type: 'template',
    format: 'sheets',
    externalUrl: 'https://docs.google.com/spreadsheets/d/monthly-ai-report/edit?usp=sharing&copy=true',
    size: '900KB',
    lastUpdated: '2024-11-28',
    featured: false,
    tags: ['reporting', 'kpi', 'performance', 'analytics'],
    relatedBlogPosts: ['ai-performance-metrics']
  },
  {
    id: 'ai-prompt-library',
    title: 'Ultimate AI Prompt Library',
    description: 'Collection of 200+ proven prompts for various AI tools and use cases. Organized by industry, function, and tool type.',
    category: 'templates',
    type: 'toolkit',
    format: 'sheets',
    externalUrl: 'https://docs.google.com/spreadsheets/d/ai-prompt-library/edit?usp=sharing&copy=true',
    size: '2.8MB',
    lastUpdated: '2024-12-01',
    featured: true,
    tags: ['prompts', 'examples', 'best-practices', 'productivity'],
    relatedBlogPosts: ['mastering-ai-prompts']
  },
  {
    id: 'ai-budget-planner',
    title: 'AI Budget Planning Worksheet',
    description: 'Plan and track your AI tool investments with this comprehensive budget planner. Includes cost forecasting and variance analysis.',
    category: 'ai-strategy',
    type: 'worksheet',
    format: 'xlsx',
    downloadUrl: '/downloads/ai-budget-planner.xlsx',
    size: '650KB',
    lastUpdated: '2024-11-22',
    featured: false,
    tags: ['budget', 'planning', 'cost-management', 'forecasting'],
    relatedBlogPosts: ['budgeting-for-ai-tools']
  }
]

export const downloadableAssets: DownloadableAsset[] = [
  {
    id: 'ai-implementation-checklist-pdf',
    title: '90-Day AI Implementation Checklist',
    description: 'Step-by-step checklist for AI tool rollout',
    filename: '90-day-ai-implementation-checklist.pdf',
    downloadPath: '/downloads/90-day-ai-implementation-checklist.pdf',
    category: 'implementation',
    type: 'checklist',
    size: '1.2MB',
    format: 'pdf',
    lastUpdated: '2024-11-15',
    featured: true
  },
  {
    id: 'ai-strategy-blueprint-pdf',
    title: 'AI Strategy Blueprint',
    description: 'Comprehensive guide to AI strategy development',
    filename: 'ai-strategy-blueprint.pdf',
    downloadPath: '/downloads/ai-strategy-blueprint.pdf',
    category: 'ai-strategy',
    type: 'ebook',
    size: '4.8MB',
    format: 'pdf',
    lastUpdated: '2024-11-20',
    featured: true
  },
  {
    id: 'team-ai-training-kit-pdf',
    title: 'Team AI Training Starter Kit',
    description: 'Complete training materials for team onboarding',
    filename: 'team-ai-training-kit.pdf',
    downloadPath: '/downloads/team-ai-training-kit.pdf',
    category: 'team-training',
    type: 'toolkit',
    size: '3.2MB',
    format: 'pdf',
    lastUpdated: '2024-11-10',
    featured: false
  },
  {
    id: 'ai-vendor-comparison-xlsx',
    title: 'AI Vendor Comparison Template',
    description: 'Standardized vendor evaluation template',
    filename: 'ai-vendor-comparison-template.xlsx',
    downloadPath: '/downloads/ai-vendor-comparison-template.xlsx',
    category: 'tool-selection',
    type: 'template',
    size: '800KB',
    format: 'xlsx',
    lastUpdated: '2024-11-25',
    featured: false
  },
  {
    id: 'ai-security-checklist-pdf',
    title: 'AI Security & Privacy Checklist',
    description: 'Security considerations for AI implementation',
    filename: 'ai-security-privacy-checklist.pdf',
    downloadPath: '/downloads/ai-security-privacy-checklist.pdf',
    category: 'implementation',
    type: 'checklist',
    size: '1.1MB',
    format: 'pdf',
    lastUpdated: '2024-11-30',
    featured: false
  },
  {
    id: 'ai-budget-planner-xlsx',
    title: 'AI Budget Planning Worksheet',
    description: 'Budget planning and tracking worksheet',
    filename: 'ai-budget-planner.xlsx',
    downloadPath: '/downloads/ai-budget-planner.xlsx',
    category: 'ai-strategy',
    type: 'worksheet',
    size: '650KB',
    format: 'xlsx',
    lastUpdated: '2024-11-22',
    featured: false
  }
]

// Helper functions
export function getResourcesByCategory(categoryId: string): Resource[] {
  return resources.filter(resource => resource.category === categoryId)
}

export function getFeaturedResources(): Resource[] {
  return resources.filter(resource => resource.featured)
}

export function getResourcesByType(type: Resource['type']): Resource[] {
  return resources.filter(resource => resource.type === type)
}

export function getResourcesByTags(tags: string[]): Resource[] {
  return resources.filter(resource =>
    resource.tags.some(tag => tags.includes(tag))
  )
}

export function getResourceById(id: string): Resource | undefined {
  return resources.find(resource => resource.id === id)
}

export function getDownloadableAssets(): DownloadableAsset[] {
  return downloadableAssets.filter(asset => asset.downloadPath.startsWith('/downloads/'))
}