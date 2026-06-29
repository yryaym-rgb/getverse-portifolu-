/**
 * Tech Data
 * Centralized data for all technologies
 * Used in /engineering and tech stack displays
 */

export interface TechCategory {
  name: string
  icon: string
  technologies: string[]
  color: string
  description?: string
}

export interface TechDetail {
  name: string
  category: string
  icon?: string
  description?: string
  years?: number
  projects?: string[]
}

export const techCategories: TechCategory[] = [
  {
    name: 'Frontend',
    icon: '⚛️',
    color: '#00f0ff',
    description: 'User interfaces and client-side applications',
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Bootstrap', 'HTML5', 'CSS3']
  },
  {
    name: 'Backend',
    icon: '🚀',
    color: '#7b2ffc',
    description: 'Server-side applications and APIs',
    technologies: ['Python', 'FastAPI', 'Django', 'Node.js', 'Flask', 'PHP']
  },
  {
    name: 'Databases',
    icon: '🗄️',
    color: '#ff6b35',
    description: 'Data storage and management',
    technologies: ['PostgreSQL', 'Supabase', 'MySQL', 'MongoDB']
  },
  {
    name: 'AI & Automation',
    icon: '🧠',
    color: '#00f0ff',
    description: 'Artificial intelligence and workflow automation',
    technologies: ['Claude API', 'OpenAI', 'LangChain', 'RAG Pipelines', 'n8n', 'Make.com', 'Zapier', 'Vapi AI', 'Retell AI']
  },
  {
    name: 'DevOps & Infra',
    icon: '☁️',
    color: '#7b2ffc',
    description: 'Infrastructure, deployment, and operations',
    technologies: ['Docker', 'Nginx', 'AWS S3', 'Cloudflare', 'CI/CD', 'Ubuntu Linux VPS']
  },
  {
    name: 'Mobile & Desktop',
    icon: '📱',
    color: '#ff6b35',
    description: 'Cross-platform applications',
    technologies: ['Flutter', 'Electron']
  },
  {
    name: 'Web Scraping',
    icon: '🕷️',
    color: '#00f0ff',
    description: 'Data extraction and automation',
    technologies: ['Selenium', 'Playwright', 'Cloudflare Bypass', 'CAPTCHA Handling']
  },
  {
    name: 'Payments',
    icon: '💳',
    color: '#7b2ffc',
    description: 'Payment processing and subscriptions',
    technologies: ['Stripe', 'Gumroad', 'PayPal']
  },
  {
    name: 'Other',
    icon: '🔧',
    color: '#ff6b35',
    description: 'Additional tools and technologies',
    technologies: ['REST API Design', 'Web Speech API', 'Figma Make', 'Jinja2']
  }
]

export const techDetails: TechDetail[] = [
  // Frontend
  { name: 'React', category: 'Frontend', icon: '⚛️', description: 'UI library for building component-based interfaces', years: 4 },
  { name: 'Next.js', category: 'Frontend', icon: '▲', description: 'React framework with SSR and SSG', years: 3 },
  { name: 'TypeScript', category: 'Frontend', icon: '🔷', description: 'Type-safe JavaScript', years: 4 },
  { name: 'Tailwind CSS', category: 'Frontend', icon: '🎨', description: 'Utility-first CSS framework', years: 3 },
  { name: 'Bootstrap', category: 'Frontend', icon: '📦', description: 'CSS framework for responsive design', years: 4 },
  
  // Backend
  { name: 'Python', category: 'Backend', icon: '🐍', description: 'Primary backend language', years: 4 },
  { name: 'FastAPI', category: 'Backend', icon: '🚀', description: 'Modern Python web framework with async support', years: 3 },
  { name: 'Django', category: 'Backend', icon: '🎯', description: 'High-level Python web framework', years: 3 },
  { name: 'Node.js', category: 'Backend', icon: '🟢', description: 'JavaScript runtime for server-side', years: 3 },
  { name: 'Flask', category: 'Backend', icon: '🌶️', description: 'Micro web framework for Python', years: 2 },
  
  // Databases
  { name: 'PostgreSQL', category: 'Databases', icon: '🐘', description: 'Primary relational database', years: 4 },
  { name: 'Supabase', category: 'Databases', icon: '🔥', description: 'Open-source Firebase alternative', years: 3 },
  { name: 'MySQL', category: 'Databases', icon: '🐬', description: 'Relational database management system', years: 2 },
  { name: 'MongoDB', category: 'Databases', icon: '🍃', description: 'NoSQL document database', years: 2 },
  
  // AI & Automation
  { name: 'Claude API', category: 'AI & Automation', icon: '🧠', description: 'Anthropic\'s Claude AI integration', years: 2 },
  { name: 'OpenAI', category: 'AI & Automation', icon: '🤖', description: 'GPT models and embeddings', years: 2 },
  { name: 'LangChain', category: 'AI & Automation', icon: '🔗', description: 'Framework for LLM applications', years: 1 },
  { name: 'RAG Pipelines', category: 'AI & Automation', icon: '📚', description: 'Retrieval-augmented generation', years: 1 },
  { name: 'n8n', category: 'AI & Automation', icon: '🔄', description: 'Workflow automation tool', years: 2 },
  
  // DevOps
  { name: 'Docker', category: 'DevOps & Infra', icon: '🐳', description: 'Containerization platform', years: 3 },
  { name: 'Nginx', category: 'DevOps & Infra', icon: '🌐', description: 'Web server and reverse proxy', years: 4 },
  { name: 'AWS S3', category: 'DevOps & Infra', icon: '☁️', description: 'Cloud storage service', years: 2 },
  { name: 'Cloudflare', category: 'DevOps & Infra', icon: '🛡️', description: 'CDN and security', years: 3 },
  { name: 'Ubuntu Linux VPS', category: 'DevOps & Infra', icon: '🐧', description: 'Primary deployment OS', years: 4 },
  
  // Mobile & Desktop
  { name: 'Flutter', category: 'Mobile & Desktop', icon: '📱', description: 'Cross-platform mobile framework', years: 1 },
  { name: 'Electron', category: 'Mobile & Desktop', icon: '⚡', description: 'Desktop app framework', years: 1 },
  
  // Web Scraping
  { name: 'Selenium', category: 'Web Scraping', icon: '🕷️', description: 'Browser automation', years: 3 },
  { name: 'Playwright', category: 'Web Scraping', icon: '🎭', description: 'Modern browser automation', years: 2 },
  { name: 'Cloudflare Bypass', category: 'Web Scraping', icon: '☁️', description: 'Anti-bot protection handling', years: 2 },
  { name: 'CAPTCHA Handling', category: 'Web Scraping', icon: '✅', description: 'Automated CAPTCHA solving', years: 2 },
  
  // Payments
  { name: 'Stripe', category: 'Payments', icon: '💳', description: 'Payment processing', years: 2 },
  { name: 'Gumroad', category: 'Payments', icon: '🛒', description: 'Creator payment platform', years: 2 },
  { name: 'PayPal', category: 'Payments', icon: '💰', description: 'Online payment system', years: 2 }
]

export const techColorMap: Record<string, string> = {
  'Frontend': '#00f0ff',
  'Backend': '#7b2ffc',
  'Databases': '#ff6b35',
  'AI & Automation': '#00f0ff',
  'DevOps & Infra': '#7b2ffc',
  'Mobile & Desktop': '#ff6b35',
  'Web Scraping': '#00f0ff',
  'Payments': '#7b2ffc',
  'Other': '#ff6b35'
}

export const techIconMap: Record<string, string> = {
  'React': '⚛️',
  'Next.js': '▲',
  'TypeScript': '🔷',
  'Tailwind CSS': '🎨',
  'Bootstrap': '📦',
  'Python': '🐍',
  'FastAPI': '🚀',
  'Django': '🎯',
  'Node.js': '🟢',
  'Flask': '🌶️',
  'PostgreSQL': '🐘',
  'Supabase': '🔥',
  'MySQL': '🐬',
  'MongoDB': '🍃',
  'Claude API': '🧠',
  'OpenAI': '🤖',
  'LangChain': '🔗',
  'RAG Pipelines': '📚',
  'n8n': '🔄',
  'Docker': '🐳',
  'Nginx': '🌐',
  'AWS S3': '☁️',
  'Cloudflare': '🛡️',
  'Ubuntu Linux VPS': '🐧',
  'Flutter': '📱',
  'Electron': '⚡',
  'Selenium': '🕷️',
  'Playwright': '🎭',
  'Stripe': '💳',
  'Gumroad': '🛒',
  'PayPal': '💰'
}

/**
 * Get all technologies as a flat array
 */
export function getAllTechnologies(): string[] {
  return techCategories.flatMap(cat => cat.technologies)
}

/**
 * Get technologies by category
 */
export function getTechnologiesByCategory(category: string): string[] {
  const cat = techCategories.find(c => c.name === category)
  return cat ? cat.technologies : []
}

/**
 * Get all categories
 */
export function getAllTechCategories(): string[] {
  return techCategories.map(cat => cat.name)
}

/**
 * Get category color
 */
export function getTechCategoryColor(category: string): string {
  return techColorMap[category] || '#00f0ff'
}

/**
 * Get tech icon
 */
export function getTechIcon(techName: string): string {
  return techIconMap[techName] || '🔧'
}

/**
 * Get tech details by name
 */
export function getTechDetails(techName: string): TechDetail | undefined {
  return techDetails.find(t => t.name === techName)
}

/**
 * Get technologies by category with details
 */
export function getTechCategoryDetails(category: string): TechDetail[] {
  return techDetails.filter(t => t.category === category)
}

/**
 * Get technologies by project
 */
export function getTechByProject(projectTech: string[]): TechDetail[] {
  return techDetails.filter(t => projectTech.includes(t.name))
}

/**
 * Get tech count by category
 */
export function getTechCountByCategory(): Record<string, number> {
  const counts: Record<string, number> = {}
  techCategories.forEach(cat => {
    counts[cat.name] = cat.technologies.length
  })
  return counts
}

/**
 * Get years of experience for a technology
 */
export function getTechYears(techName: string): number | undefined {
  const detail = techDetails.find(t => t.name === techName)
  return detail?.years
}

/**
 * Get technologies with experience years
 */
export function getTechWithExperience(): Array<{ name: string; years: number; category: string }> {
  return techDetails.map(t => ({
    name: t.name,
    years: t.years || 0,
    category: t.category
  }))
}

/**
 * Get technology categories for display
 */
export function getTechCategoriesForDisplay(): Array<{
  name: string
  icon: string
  color: string
  technologies: string[]
  count: number
}> {
  return techCategories.map(cat => ({
    ...cat,
    count: cat.technologies.length
  }))
}