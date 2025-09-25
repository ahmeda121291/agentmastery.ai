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
  type: 'template' | 'guide' | 'checklist' | 'toolkit' | 'worksheet' | 'dataset'
  format: 'pdf' | 'xlsx' | 'csv' | 'sheets'
  downloadUrl?: string
  externalUrl?: string
  size?: string
  lastUpdated: string
  featured: boolean
  tags: string[]
}

export const resourceCategories: ResourceCategory[] = [
  {
    id: 'roi-tools',
    name: 'ROI Tools',
    description: 'Calculate and track your ROI',
    icon: '📊',
    color: 'bg-green-100 text-green-800'
  },
  {
    id: 'guides',
    name: 'Guides',
    description: 'Comprehensive guides and playbooks',
    icon: '📚',
    color: 'bg-blue-100 text-blue-800'
  },
  {
    id: 'templates',
    name: 'Templates',
    description: 'Ready-to-use templates',
    icon: '📋',
    color: 'bg-purple-100 text-purple-800'
  }
]

export const resources: Resource[] = [
  {
    id: 'revops-roi-planner-xlsx',
    title: 'RevOps ROI Planner',
    description: 'Enterprise-grade Excel workbook with dashboards, scenario planning, and payback analysis. Calculate your revenue operations impact with precision.',
    category: 'roi-tools',
    type: 'template',
    format: 'xlsx',
    downloadUrl: '/downloads/RevOps_ROI_Planner.xlsx',
    size: '27KB',
    lastUpdated: '2025-01',
    featured: true,
    tags: ['roi', 'planning', 'excel', 'revops']
  },
  {
    id: 'affiliate-forecast-csv',
    title: 'Affiliate Forecast Model',
    description: 'Ready-to-import CSV data for affiliate revenue forecasting. Compatible with your analytics tools or data warehouse.',
    category: 'roi-tools',
    type: 'dataset',
    format: 'csv',
    downloadUrl: '/downloads/RevOps_ROI_Planner - Affiliate Forecast.csv',
    size: '1KB',
    lastUpdated: '2025-01',
    featured: false,
    tags: ['affiliate', 'forecast', 'data', 'csv']
  },
  {
    id: 'ai-prompt-engineering-guide',
    title: 'AI Prompt Engineering Field Guide (2025)',
    description: 'Master prompt engineering with proven patterns, real-world examples, common mistakes to avoid, and role-based frameworks for maximum AI productivity.',
    category: 'guides',
    type: 'guide',
    format: 'pdf',
    downloadUrl: '/downloads/AI-Prompt-Engineering-Field-Guide-2025-Edition.pdf',
    size: '943KB',
    lastUpdated: '2025-01',
    featured: true,
    tags: ['ai', 'prompts', 'guide', 'engineering']
  },
  {
    id: 'ai-sales-stack-buyers-guide',
    title: 'AI Sales Stack Buyer\'s Guide (2025)',
    description: 'Cut through the AI hype. Compare tools that actually move pipeline with detailed evaluation criteria, vendor comparisons, and stack templates.',
    category: 'guides',
    type: 'guide',
    format: 'pdf',
    downloadUrl: '/downloads/AI-Sales-Stack-Buyers-Guide-2025.pdf',
    size: '7.1MB',
    lastUpdated: '2025-01',
    featured: true,
    tags: ['sales', 'ai-tools', 'buying-guide', 'stack']
  },
  {
    id: 'ai-tool-adoption-playbook',
    title: 'AI Tool Adoption Playbook',
    description: 'Step-by-step framework to roll out AI across your teams with minimal friction, clear ROI tracking, and proven change management strategies.',
    category: 'guides',
    type: 'guide',
    format: 'pdf',
    downloadUrl: '/downloads/AI-Tool-Adoption-Playbook.pdf',
    size: '1.0MB',
    lastUpdated: '2025-01',
    featured: false,
    tags: ['adoption', 'implementation', 'ai', 'playbook']
  },
  {
    id: 'revops-roi-planner-google',
    title: 'RevOps ROI Planner (Google Sheets)',
    description: 'Interactive Google Sheets template with automated calculations and scenario modeling. Click to make your own copy.',
    category: 'templates',
    type: 'template',
    format: 'sheets',
    externalUrl: 'https://docs.google.com/spreadsheets/d/1VHBk2qZEE_DBfSreqvmPCnx4tR7QLVp62U1AEwvurDQ/copy',
    lastUpdated: '2025-01',
    featured: true,
    tags: ['google-sheets', 'template', 'roi', 'interactive']
  }
]

// Helper functions
export function getResourcesByCategory(categoryId: string): Resource[] {
  return resources.filter(resource => resource.category === categoryId)
}

export function getFeaturedResources(): Resource[] {
  return resources.filter(resource => resource.featured)
}

export function getResourceById(id: string): Resource | undefined {
  return resources.find(resource => resource.id === id)
}