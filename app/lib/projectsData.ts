/**
 * Projects Data
 * Centralized data for all projects
 * Used in /projects pages
 */

export interface Project {
  slug: string
  title: string
  subtitle: string
  description: string
  longDescription: string
  tech: string[]
  image: string
  color: string
  category: string
  features: string[]
  challenge: string
  solution: string
  link?: string
  github?: string
  metrics?: { label: string; value: string }[]
  status?: 'active' | 'development' | 'completed'
  featured?: boolean
}

export const projectsData: Project[] = [
  {
    slug: 'maoni',
    title: 'MAONI',
    subtitle: 'Presidential Civic Consultation Platform',
    description: 'National-scale platform for DRC constitutional reform with AI sentiment analysis.',
    longDescription: 'Built 5 production versions of a national consultation platform for the DRC presidential office. Integrated Claude API for automated AI analysis of citizen proposals, sentiment analysis across regional groups, and auto-generated presidential briefing reports. The platform handles sensitive citizen data with military-grade security and real-time processing.',
    tech: ['React', 'Node.js', 'Supabase', 'Claude API', 'PostgreSQL'],
    image: '/images/projects/maoni-dashboard.png',
    color: '#00f0ff',
    category: 'Government',
    featured: true,
    status: 'active',
    features: [
      'AI-powered sentiment analysis',
      'Hidden multi-role admin panel',
      'Military-grade security practices',
      'Real-time data processing',
      'Full audit logging',
      '5 production versions delivered'
    ],
    challenge: 'DRC needed a secure national platform for constitutional reform consultation handling sensitive citizen data with military-grade security.',
    solution: 'Built a 5-version platform with AI sentiment analysis, hidden multi-role admin panel, and full audit logging.',
    link: 'https://maoni.cd',
    github: 'https://github.com/lakho0543-spec',
    metrics: [
      { label: 'Versions', value: '5' },
      { label: 'Uptime', value: '99.9%' }
    ]
  },
  {
    slug: 'arptc',
    title: 'ARPTC Tower Map',
    subtitle: 'National Telecom Infrastructure',
    description: 'Interactive map tracking 3,500+ mobile network towers across DRC.',
    longDescription: 'Built interactive mapping platform with CRUD, bulk import, soft-delete, and multiple map styles for the national telecom regulator. Delivered two parallel live versions (classic and enhanced icon systems) with a French-language interface and client-specified branding.',
    tech: ['React', 'Leaflet', 'PostgreSQL', 'XLSX'],
    image: '/images/projects/arptc-tower-map.png',
    color: '#7b2ffc',
    category: 'Government',
    status: 'active',
    features: [
      '3,500+ towers tracked',
      '7 telecom operators',
      'French-language interface',
      'Complete documentation',
      'Bulk import/export',
      'Soft-delete system'
    ],
    challenge: 'Track 3,500+ mobile network tower sites across all DRC provinces for the national telecom regulator.',
    solution: 'Built interactive mapping platform with CRUD, bulk import, soft-delete, and multiple map styles.',
    link: 'https://drctowermap.netlify.app',
    github: 'https://github.com/lakho0543-spec',
    metrics: [
      { label: 'Towers', value: '3,500+' },
      { label: 'Operators', value: '7' }
    ]
  },
  {
    slug: 'selzara',
    title: 'Selzara',
    subtitle: 'AI OS for Amazon Sellers',
    description: '10-module SaaS with 457 daily organic visitors, $0 ad spend.',
    longDescription: 'Built a 10-module SaaS platform covering PPC optimization, profit analytics, inventory intelligence, AI listing generation, competitor intelligence, dynamic pricing, review management, demand forecasting, and cashflow tracking. Achieved 457 daily organic visitors with zero paid advertising.',
    tech: ['Python', 'FastAPI', 'Supabase', 'PostgreSQL'],
    image: '/images/projects/selzara-dashboard.png',
    color: '#ff6b35',
    category: 'AI',
    featured: true,
    status: 'active',
    features: [
      '457 daily visitors',
      '$0 ad spend',
      '10 modules deployed',
      'Tiered subscription billing',
      'AI listing generation',
      'Competitor intelligence'
    ],
    challenge: 'Amazon sellers needed a comprehensive AI platform for PPC optimization and inventory management.',
    solution: 'Built 10-module SaaS with AI listing generation, competitor intelligence, and dynamic pricing.',
    link: 'https://selzara.com',
    github: 'https://github.com/lakho0543-spec',
    metrics: [
      { label: 'Visitors', value: '457/day' },
      { label: 'Ad Spend', value: '$0' }
    ]
  },
  {
    slug: 'awazpk',
    title: 'AwazPK',
    subtitle: 'National Civic Voice Platform',
    description: 'Multi-lingual civic platform with real-time AI triage in 5 languages.',
    longDescription: 'Built voice-based platform with Claude AI triage routing complaints to correct departments instantly. Supports 5 languages (Urdu, Punjabi, Sindhi, Pashto, English) with real-time processing and government-facing dashboard with live Pakistan map visualization.',
    tech: ['React', 'TypeScript', 'Supabase', 'Claude AI', 'Web Speech API'],
    image: '/images/projects/awazpk-voice.png',
    color: '#00f0ff',
    category: 'AI',
    status: 'active',
    features: [
      '5 languages supported',
      'Real-time AI triage',
      'Government dashboard',
      'Pakistan map visualization',
      'Voice-based reporting',
      'Case resolution workflow'
    ],
    challenge: 'Enable citizens to report issues via voice in 5 languages with real-time AI classification.',
    solution: 'Built voice platform with Claude AI triage routing complaints to correct departments.',
    link: '#',
    github: 'https://github.com/lakho0543-spec',
    metrics: [
      { label: 'Languages', value: '5' },
      { label: 'Response', value: 'Real-time' }
    ]
  },
  {
    slug: 'justfly',
    title: 'JustFly',
    subtitle: 'Real-Time Flight Scraping',
    description: '12-airline scraper with Cloudflare bypass, 75% faster.',
    longDescription: 'Rebuilt scraper with intelligent routing, reducing response time from 2+ minutes to 30-45 seconds. Shipped Electron desktop companion app with auto-starting local backend, system tray integration, and packaged Windows installer.',
    tech: ['Django', 'React', 'Electron', 'Selenium', 'Playwright'],
    image: '/images/projects/justfly-search.png',
    color: '#7b2ffc',
    category: 'Scraping',
    status: 'active',
    features: [
      '75% faster response',
      '9/12 airlines live',
      'Cloudflare bypass',
      'CAPTCHA handling',
      'Desktop companion app',
      'Windows installer'
    ],
    challenge: 'Nigerian market needed a 12-airline flight scraper handling Cloudflare and CAPTCHA.',
    solution: 'Rebuilt scraper with intelligent routing, reducing response time by 75%.',
    link: 'https://justfly.com.ng',
    github: 'https://github.com/lakho0543-spec',
    metrics: [
      { label: 'Speed Improvement', value: '75%' },
      { label: 'Airlines', value: '9/12' }
    ]
  },
  {
    slug: 'solidbridge',
    title: 'SolidBridge',
    subtitle: 'AI-Enhanced Investment Platform',
    description: 'Modern fintech platform with portfolio management and real-time analytics.',
    longDescription: 'Built modern investment platform with wallet operations, transaction tracking, financial visualization, and secure account management. Provides users with a centralized environment to manage portfolios and monitor financial performance.',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'REST APIs'],
    image: '/images/projects/solidbridge-dashboard.png',
    color: '#ff6b35',
    category: 'Fintech',
    status: 'active',
    features: [
      'Portfolio management',
      'Real-time analytics',
      'Secure transactions',
      'Responsive design',
      'Multi-asset support',
      'Enterprise security'
    ],
    challenge: 'Investors needed a centralized fintech platform for portfolio management.',
    solution: 'Built investment platform with wallet operations, transaction tracking, and real-time analytics.',
    link: 'https://solidbridge.netlify.app',
    github: 'https://github.com/lakho0543-spec',
    metrics: [
      { label: 'Assets', value: 'Multi-asset' },
      { label: 'Security', value: 'Enterprise' }
    ]
  },
  {
    slug: 'medicare',
    title: 'MediCare Pro',
    subtitle: 'Healthcare Management Platform',
    description: 'Comprehensive healthcare platform with appointments, records, and analytics.',
    longDescription: 'Built healthcare platform with appointment scheduling, patient records, provider coordination, and healthcare analytics. Enhances patient experience and streamlines healthcare operations.',
    tech: ['React', 'TypeScript', 'REST APIs', 'Tailwind CSS'],
    image: '/images/projects/medicare-dashboard.png',
    color: '#00f0ff',
    category: 'Healthcare',
    status: 'active',
    features: [
      'Appointment scheduling',
      'Patient records',
      'Provider coordination',
      'Healthcare analytics',
      'Secure workflows',
      'Responsive design'
    ],
    challenge: 'Healthcare providers needed a digital platform to manage operations efficiently.',
    solution: 'Built comprehensive healthcare management platform with modern UI and secure workflows.',
    link: 'https://medicare-pro-kappa.vercel.app',
    github: 'https://github.com/lakho0543-spec',
    metrics: [
      { label: 'Type', value: 'Healthcare' },
      { label: 'Status', value: 'Production' }
    ]
  },
  {
    slug: 'tranquil',
    title: 'Tranquil',
    subtitle: 'Mental Wellness Platform',
    description: 'Digital wellness platform with mindfulness resources and guided journaling.',
    longDescription: 'Built wellness platform with mindfulness resources, guided journaling, self-care tools, and emotional well-being content. Provides a calming digital environment for mental wellness.',
    tech: ['React', 'JavaScript', 'CSS3'],
    image: '/images/projects/tranquil-wellness.png',
    color: '#7b2ffc',
    category: 'Healthcare',
    status: 'completed',
    features: [
      'Mindfulness resources',
      'Guided journaling',
      'Self-care tools',
      'Wellness content',
      'Emotional support',
      'Responsive design'
    ],
    challenge: 'Users needed a calming digital environment for mental wellness and self-care.',
    solution: 'Built wellness platform with mindfulness resources, guided journaling, and self-care tools.',
    link: 'https://tranquil-grove-demo.netlify.app',
    github: 'https://github.com/lakho0543-spec',
    metrics: [
      { label: 'Type', value: 'Wellness' },
      { label: 'Status', value: 'Live' }
    ]
  },
  {
    slug: 'imtiaz',
    title: 'Imtiaz Business',
    subtitle: 'Enterprise Business Management',
    description: 'Enterprise platform with real-time analytics, sales monitoring, and KPI reporting.',
    longDescription: 'Built enterprise platform with real-time analytics, sales monitoring, KPI reporting, and business intelligence dashboards. Centralizes operations and improves decision-making.',
    tech: ['React', 'TypeScript', 'Chart.js', 'Tailwind CSS'],
    image: '/images/projects/imtiaz-business.png',
    color: '#ff6b35',
    category: 'SaaS',
    status: 'active',
    features: [
      'Real-time analytics',
      'Sales monitoring',
      'KPI reporting',
      'Business intelligence',
      'Centralized operations',
      'Dashboard visualizations'
    ],
    challenge: 'Businesses needed a centralized platform to monitor operations and performance.',
    solution: 'Built enterprise platform with real-time analytics, sales monitoring, and KPI reporting.',
    link: 'https://imtiaz-business-manager.netlify.app',
    github: 'https://github.com/lakho0543-spec',
    metrics: [
      { label: 'Type', value: 'Enterprise' },
      { label: 'Analytics', value: 'Real-time' }
    ]
  }
]

/**
 * Get all projects
 */
export function getAllProjects(): Project[] {
  return projectsData
}

/**
 * Get a specific project by slug
 */
export function getProjectBySlug(slug: string): Project | undefined {
  return projectsData.find(project => project.slug === slug)
}

/**
 * Get featured projects
 */
export function getFeaturedProjects(): Project[] {
  return projectsData.filter(project => project.featured)
}

/**
 * Get projects by category
 */
export function getProjectsByCategory(category: string): Project[] {
  return projectsData.filter(project => project.category === category)
}

/**
 * Get all categories
 */
export function getAllProjectCategories(): string[] {
  const categories = new Set(projectsData.map(project => project.category))
  return ['All', ...Array.from(categories)]
}

/**
 * Get projects by status
 */
export function getProjectsByStatus(status: 'active' | 'development' | 'completed'): Project[] {
  return projectsData.filter(project => project.status === status)
}

/**
 * Search projects by query
 */
export function searchProjects(query: string): Project[] {
  const lowerQuery = query.toLowerCase()
  return projectsData.filter(project =>
    project.title.toLowerCase().includes(lowerQuery) ||
    project.subtitle.toLowerCase().includes(lowerQuery) ||
    project.description.toLowerCase().includes(lowerQuery) ||
    project.tech.some(t => t.toLowerCase().includes(lowerQuery)) ||
    project.category.toLowerCase().includes(lowerQuery)
  )
}