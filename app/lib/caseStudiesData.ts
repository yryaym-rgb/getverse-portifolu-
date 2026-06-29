/**
 * Case Studies Data
 * Centralized data for all case studies
 * Used in /case-studies pages
 */

export interface CaseStudy {
  title: string
  subtitle: string
  description: string
  image: string
  slug: string
  color: string
  category: string
  results: string[]
  metrics: { label: string; value: string; color?: string }[]
  tech: string[]
  challenge: string
  solution: string
  duration: string
  team: string
  impact: string
  architecture: string[]
  timeline: { phase: string; weeks: string; done: boolean }[]
  lessons: string
  featured?: boolean
  stats?: { label: string; value: string }[]
}

export const caseStudiesData: Record<string, CaseStudy> = {
  maoni: {
    title: 'MAONI',
    subtitle: 'Presidential Civic Consultation Platform',
    description: 'How I built a national-scale platform for DRC constitutional reform with AI sentiment analysis, military-grade security, and 5 production versions.',
    image: '/images/projects/maoni-dashboard.png',
    slug: 'maoni',
    color: '#00f0ff',
    category: 'Government',
    featured: true,
    results: [
      '5 production versions delivered successfully',
      'AI-powered sentiment analysis in real-time',
      'Military-grade security implemented and verified',
      'Full audit logging for all actions',
      '99.9% uptime maintained',
      'Trusted by the DRC Presidential Office'
    ],
    metrics: [
      { label: 'Versions', value: '5', color: '#00f0ff' },
      { label: 'Security', value: 'Military-Grade', color: '#7b2ffc' },
      { label: 'Uptime', value: '99.9%', color: '#ff6b35' },
      { label: 'Users', value: 'Millions', color: '#00f0ff' }
    ],
    tech: ['React', 'Node.js', 'Supabase', 'Claude API', 'PostgreSQL'],
    challenge: 'The Democratic Republic of Congo needed a national platform for constitutional reform consultation. The system had to handle sensitive citizen data with military-grade security while being accessible to millions of citizens across the country.',
    solution: 'Built a 5-version platform with AI sentiment analysis using Claude API, hidden multi-role admin panel, and full audit logging. The system processes citizen proposals in real-time and generates presidential briefing reports automatically.',
    duration: '6 months',
    team: '1 developer + 1 PM',
    impact: 'National-scale platform used by millions of citizens for constitutional reform consultation.',
    architecture: ['React Frontend', 'Node.js API', 'Supabase', 'PostgreSQL', 'Claude API', 'Nginx', 'Ubuntu VPS'],
    timeline: [
      { phase: 'Research & Requirements', weeks: '2 weeks', done: true },
      { phase: 'Architecture Design', weeks: '2 weeks', done: true },
      { phase: 'Development v1', weeks: '4 weeks', done: true },
      { phase: 'Testing & Refinement', weeks: '3 weeks', done: true },
      { phase: 'Deployment v1', weeks: '1 week', done: true },
      { phase: 'Iterations v2-v5', weeks: '12 weeks', done: true }
    ],
    lessons: 'Working with government clients requires extreme attention to security, documentation, and scalability. Each version improved based on user feedback and changing requirements. Security cannot be an afterthought — it must be baked into every layer of the architecture from day one.'
  },

  arptc: {
    title: 'ARPTC Tower Map',
    subtitle: 'National Telecom Infrastructure',
    description: 'Building an interactive map tracking 3,500+ mobile network towers across all DRC provinces for the national telecom regulator.',
    image: '/images/projects/arptc-tower-map.png',
    slug: 'arptc',
    color: '#7b2ffc',
    category: 'Government',
    results: [
      '3,500+ towers tracked across all provinces',
      '7 telecom operators covered',
      'French-language interface implemented',
      'Complete technical documentation delivered',
      'Bulk import/export functionality',
      'Soft-delete trash/restore system'
    ],
    metrics: [
      { label: 'Towers', value: '3,500+', color: '#7b2ffc' },
      { label: 'Operators', value: '7', color: '#00f0ff' },
      { label: 'Languages', value: '2', color: '#ff6b35' },
      { label: 'Versions', value: '2', color: '#7b2ffc' }
    ],
    tech: ['React', 'Leaflet', 'PostgreSQL', 'XLSX'],
    challenge: 'Track and manage 3,500+ mobile network tower sites across all DRC provinces for the national telecom regulator. The system needed to handle bulk imports, multiple map styles, and French-language interface.',
    solution: 'Built interactive mapping platform with CRUD operations, bulk Excel/CSV import, soft-delete trash/restore system, and multiple map styles (Streets, Satellite, Terrain). Delivered two parallel live versions.',
    duration: '4 months',
    team: '1 developer',
    impact: 'National telecom infrastructure management for the DRC regulator.',
    architecture: ['React 18', 'React-Leaflet', 'PostgreSQL', 'XLSX Processing', 'Netlify'],
    timeline: [
      { phase: 'Research & Data Modeling', weeks: '2 weeks', done: true },
      { phase: 'Map Integration', weeks: '3 weeks', done: true },
      { phase: 'CRUD Development', weeks: '4 weeks', done: true },
      { phase: 'Bulk Import/Export', weeks: '2 weeks', done: true },
      { phase: 'Testing & Deployment', weeks: '3 weeks', done: true },
      { phase: 'Documentation', weeks: '2 weeks', done: true }
    ],
    lessons: 'Handling large datasets requires efficient data processing and thoughtful UX for bulk operations. Users need to trust that their data is safe — soft-delete was a critical feature for peace of mind.'
  },

  selzara: {
    title: 'Selzara',
    subtitle: 'AI Operating System for Amazon Sellers',
    description: 'Creating a 10-module SaaS with 457 daily organic visitors and $0 ad spend through SEO and community-led growth.',
    image: '/images/projects/selzara-dashboard.png',
    slug: 'selzara',
    color: '#ff6b35',
    category: 'AI',
    featured: true,
    results: [
      '457 daily organic visitors',
      '$0 paid advertising spend',
      '10 modules deployed',
      'Tiered subscription billing via Gumroad',
      '95% user retention rate',
      'SEO and community-led growth'
    ],
    metrics: [
      { label: 'Visitors', value: '457/day', color: '#ff6b35' },
      { label: 'Ad Spend', value: '$0', color: '#00f0ff' },
      { label: 'Retention', value: '95%', color: '#7b2ffc' },
      { label: 'Modules', value: '10', color: '#ff6b35' }
    ],
    tech: ['Python', 'FastAPI', 'Supabase', 'PostgreSQL'],
    challenge: 'Amazon sellers needed a comprehensive AI platform for PPC optimization, profit analytics, inventory management, and listing generation with zero paid advertising budget.',
    solution: 'Built a 10-module SaaS platform covering PPC optimization, profit analytics, inventory intelligence, AI listing generation, competitor intelligence, dynamic pricing, review management, demand forecasting, and cashflow tracking.',
    duration: '8 months',
    team: '1 developer (solo founder)',
    impact: '457 daily organic visitors with zero paid advertising spend.',
    architecture: ['Python FastAPI', 'Supabase', 'PostgreSQL', 'Jinja2', 'Ubuntu Nginx VPS'],
    timeline: [
      { phase: 'Market Research', weeks: '2 weeks', done: true },
      { phase: 'MVP Development', weeks: '6 weeks', done: true },
      { phase: 'Module Expansion', weeks: '8 weeks', done: true },
      { phase: 'SEO Optimization', weeks: '4 weeks', done: true },
      { phase: 'Community Building', weeks: 'Ongoing', done: true },
      { phase: 'Iteration & Growth', weeks: 'Ongoing', done: true }
    ],
    lessons: 'Organic growth is possible with SEO and community-led marketing when the product delivers real value. Focus on solving actual problems and the users will come.'
  },

  justfly: {
    title: 'JustFly',
    subtitle: 'Real-Time Flight Scraping Platform',
    description: 'Optimizing a 12-airline flight scraper from 2+ minutes to 30-45 seconds with Cloudflare bypass and desktop companion app.',
    image: '/images/projects/justfly-search.png',
    slug: 'justfly',
    color: '#00f0ff',
    category: 'Scraping',
    results: [
      '75% faster response time (2min → 30-45s)',
      '9 of 12 airlines live in production',
      'Cloudflare bypass implemented',
      'CAPTCHA handling automated',
      'Desktop companion app shipped',
      'Reduced CPU and memory load by 70%'
    ],
    metrics: [
      { label: 'Speed Improvement', value: '75%', color: '#00f0ff' },
      { label: 'Airlines', value: '9/12', color: '#7b2ffc' },
      { label: 'Response', value: '30-45s', color: '#ff6b35' },
      { label: 'CPU Reduction', value: '70%', color: '#00f0ff' }
    ],
    tech: ['Django', 'React', 'Electron', 'Selenium', 'Playwright'],
    challenge: 'Nigerian travel market needed a real-time flight scraper for 12 airlines that could handle Cloudflare and CAPTCHA challenges while delivering results in under 30 seconds.',
    solution: 'Rebuilt scraper with intelligent route filtering and progressive result loading. Shipped a desktop companion application (Electron + Django) with auto-starting local backend and packaged Windows installer.',
    duration: '3 months',
    team: '1 developer',
    impact: 'Reduced response time from 2+ minutes to 30-45 seconds (75% faster).',
    architecture: ['Django Backend', 'React Frontend', 'Electron Desktop', 'Selenium', 'Playwright', 'VPS Deployment'],
    timeline: [
      { phase: 'Analysis & Architecture', weeks: '1 week', done: true },
      { phase: 'Scraper Rebuild', weeks: '4 weeks', done: true },
      { phase: 'Optimization', weeks: '2 weeks', done: true },
      { phase: 'Desktop App Development', weeks: '3 weeks', done: true },
      { phase: 'Testing & Deployment', weeks: '2 weeks', done: true }
    ],
    lessons: 'Sometimes the best optimization is rethinking the architecture, not just tweaking the code. Progressive loading made the biggest difference in perceived performance.'
  },

  solidbridge: {
    title: 'SolidBridge',
    subtitle: 'AI-Enhanced Investment Platform',
    description: 'Building a modern fintech platform with portfolio management, wallet operations, and real-time financial analytics.',
    image: '/images/projects/solidbridge-dashboard.png',
    slug: 'solidbridge',
    color: '#7b2ffc',
    category: 'Fintech',
    results: [
      'Full portfolio management implemented',
      'Real-time analytics dashboard',
      'Secure transaction processing',
      'Responsive design for all devices',
      'Multi-asset investment interface',
      'Enterprise-grade security'
    ],
    metrics: [
      { label: 'Assets', value: 'Multi-asset', color: '#7b2ffc' },
      { label: 'Security', value: 'Enterprise', color: '#00f0ff' },
      { label: 'Analytics', value: 'Real-time', color: '#ff6b35' },
      { label: 'Availability', value: '24/7', color: '#7b2ffc' }
    ],
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'REST APIs'],
    challenge: 'Investors needed a centralized fintech platform with portfolio management, wallet operations, transaction tracking, and real-time financial analytics.',
    solution: 'Built modern investment platform with portfolio management, wallet operations, transaction tracking, and real-time financial analytics. Enterprise-grade security and responsive design.',
    duration: '5 months',
    team: '1 developer',
    impact: 'Modern investment platform with enterprise-grade security.',
    architecture: ['React Frontend', 'TypeScript', 'Tailwind CSS', 'REST APIs', 'Chart.js', 'Netlify'],
    timeline: [
      { phase: 'Requirements & Design', weeks: '2 weeks', done: true },
      { phase: 'Core Development', weeks: '6 weeks', done: true },
      { phase: 'Analytics Integration', weeks: '3 weeks', done: true },
      { phase: 'Security Implementation', weeks: '2 weeks', done: true },
      { phase: 'Testing & Deployment', weeks: '3 weeks', done: true }
    ],
    lessons: 'Financial platforms require extreme attention to data accuracy and user experience. Every number must be precise and every transaction must be secure.'
  },

  awazpk: {
    title: 'AwazPK',
    subtitle: 'National Civic Voice Platform',
    description: 'Building a multi-lingual civic platform enabling citizens to report issues via voice in 5 languages with real-time AI triage.',
    image: '/images/projects/awazpk-voice.png',
    slug: 'awazpk',
    color: '#ff6b35',
    category: 'AI',
    results: [
      '5 languages supported (Urdu, Punjabi, Sindhi, Pashto, English)',
      'Real-time AI triage with Claude API',
      'Government dashboard with live map visualization',
      'Case resolution workflow implemented',
      'Voice-based reporting for citizens'
    ],
    metrics: [
      { label: 'Languages', value: '5', color: '#ff6b35' },
      { label: 'Response', value: 'Real-time', color: '#00f0ff' },
      { label: 'Coverage', value: 'National', color: '#7b2ffc' },
      { label: 'Type', value: 'Voice AI', color: '#ff6b35' }
    ],
    tech: ['React', 'TypeScript', 'Supabase', 'Claude AI', 'Web Speech API'],
    challenge: 'Enable citizens to report public service issues via voice in 5 languages with real-time AI triage and routing to the correct government departments.',
    solution: 'Built voice-based platform with Claude AI triage routing complaints to correct departments instantly. Supports 5 languages with real-time processing.',
    duration: '4 months',
    team: '1 developer',
    impact: 'National civic engagement platform with voice AI.',
    architecture: ['React Frontend', 'TypeScript', 'Supabase', 'Claude AI', 'Web Speech API', 'Figma Make'],
    timeline: [
      { phase: 'Research & Design', weeks: '2 weeks', done: true },
      { phase: 'Voice Integration', weeks: '3 weeks', done: true },
      { phase: 'AI Triage Development', weeks: '4 weeks', done: true },
      { phase: 'Dashboard & Map', weeks: '3 weeks', done: true },
      { phase: 'Testing & Deployment', weeks: '2 weeks', done: true }
    ],
    lessons: 'Voice interfaces require careful UX design and robust error handling. AI triage must be accurate enough to route complaints correctly.'
  }
}

/**
 * Get all case studies as an array
 */
export function getAllCaseStudies(): CaseStudy[] {
  return Object.values(caseStudiesData)
}

/**
 * Get a specific case study by slug
 */
export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudiesData[slug]
}

/**
 * Get featured case studies
 */
export function getFeaturedCaseStudies(): CaseStudy[] {
  return Object.values(caseStudiesData).filter(study => study.featured)
}

/**
 * Get case studies by category
 */
export function getCaseStudiesByCategory(category: string): CaseStudy[] {
  return Object.values(caseStudiesData).filter(study => study.category === category)
}

/**
 * Get all categories
 */
export function getAllCategories(): string[] {
  const categories = new Set(Object.values(caseStudiesData).map(study => study.category))
  return ['All', ...Array.from(categories)]
}