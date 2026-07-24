/**
 * GetVerse 3.0 — Verified portfolio data (evidence-backed metrics)
 */

export interface Country {
  id: string
  name: string
  flag: string
  lat: number
  lng: number
  type: 'government' | 'client' | 'personal'
  projects: string[]
  description: string
}

export interface ProjectMetric {
  label: string
  value: string
  verified?: boolean
}

export interface ArchNode {
  id: string
  name: string
  tech?: string
  description: string
  children?: ArchNode[]
}

export interface WalkthroughStep {
  id: string
  title: string
  description: string
  detail: string
}

export const countries: Country[] = [
  { id: 'pk', name: 'Pakistan', flag: '🇵🇰', lat: 30.3753, lng: 69.3451, type: 'personal', projects: ['awazpk', 'imtiaz', 'medicare'], description: 'Voice AI civic platform, business systems, healthcare.' },
  { id: 'cd', name: 'DRC', flag: '🇨🇩', lat: -4.0383, lng: 21.7587, type: 'government', projects: ['maoni', 'arptc'], description: 'Presidential office & national telecom regulator platforms.' },
  { id: 'us', name: 'USA', flag: '🇺🇸', lat: 37.7749, lng: -122.4194, type: 'client', projects: ['selzara', 'tranquil'], description: 'AI SaaS and wellness platforms.' },
  { id: 'de', name: 'Germany', flag: '🇩🇪', lat: 51.1657, lng: 10.4515, type: 'client', projects: ['solidbridge'], description: 'Enterprise business intelligence.' },
  { id: 'ng', name: 'Nigeria', flag: '🇳🇬', lat: 9.082, lng: 8.6753, type: 'client', projects: ['justfly'], description: 'Real-time travel scraping & booking.' },
]

/** Portfolio-wide verified impact numbers */
export const impactMetrics: ProjectMetric[] = [
  { label: 'Production Systems', value: '18+', verified: true },
  { label: 'Countries', value: '5', verified: true },
  { label: 'Years Experience', value: '4+', verified: true },
  { label: 'Mapped Locations', value: '3,500+', verified: true },
  { label: 'Platform Uptime', value: '99.9%', verified: true },
  { label: 'Avg API Response', value: '0.48s', verified: true },
]

export const heroStats = impactMetrics.slice(0, 4)

/** Engineering scale — largest systems built */
export const engineeringScale = [
  { label: 'Largest Database', value: '22 Tables', sub: 'MAONI — secure PostgreSQL schema', icon: 'database' },
  { label: 'Largest API', value: '120 Endpoints', sub: 'MAONI — FastAPI backend', icon: 'api' },
  { label: 'Largest Project', value: '180,000 Lines', sub: 'MAONI — 5 production versions', icon: 'code' },
  { label: 'Largest Deployment', value: 'Government Platform', sub: 'DRC Presidential Office', icon: 'shield' },
  { label: 'Countries', value: '5', sub: 'PK · CD · US · DE · NG', icon: 'globe' },
  { label: 'Frameworks & Tools', value: '25+', sub: 'React, FastAPI, Supabase, Docker…', icon: 'layers' },
]

/** Per-project verified metrics */
export const projectMetrics: Record<string, ProjectMetric[]> = {
  maoni: [
    { label: 'Database Tables', value: '22', verified: true },
    { label: 'RLS Policies', value: '79', verified: true },
    { label: 'API Endpoints', value: '120', verified: true },
    { label: 'Avg Response', value: '0.48s', verified: true },
    { label: 'Uptime', value: '99.9%', verified: true },
    { label: 'Production Versions', value: '5', verified: true },
  ],
  arptc: [
    { label: 'Mapped Towers', value: '3,500+', verified: true },
    { label: 'Telecom Operators', value: '7', verified: true },
    { label: 'Map Load Time', value: '1.2s', verified: true },
    { label: 'Live Versions', value: '2', verified: true },
    { label: 'Provinces Covered', value: 'All DRC', verified: true },
  ],
  selzara: [
    { label: 'Daily Visitors', value: '457', verified: true },
    { label: 'Ad Spend', value: '$0', verified: true },
    { label: 'SaaS Modules', value: '10', verified: true },
    { label: 'Dashboard Load', value: '0.8s', verified: true },
  ],
  justfly: [
    { label: 'Airlines Scraped', value: '12', verified: true },
    { label: 'Response Time', value: '30s', verified: true },
    { label: 'Previous Time', value: '2+ min', verified: true },
    { label: 'Improvement', value: '75%', verified: true },
  ],
}

/** Expandable architecture per project */
export const projectArchitectures: Record<string, { title: string; nodes: ArchNode[] }> = {
  maoni: {
    title: 'MAONI — National Civic Platform',
    nodes: [
      {
        id: 'frontend',
        name: 'Frontend',
        tech: 'React 18 + TypeScript',
        description: 'Citizen portal for proposal submission, regional dashboards, and multi-language support. Code-split routes for performance.',
        children: [
          { id: 'citizen', name: 'Citizen Portal', description: 'Public-facing forms with real-time validation and submission tracking.' },
          { id: 'admin', name: 'Hidden Admin Panel', description: 'Multi-role admin with separate auth flow, not indexed by search engines.' },
        ],
      },
      {
        id: 'cloudflare',
        name: 'Cloudflare',
        tech: 'CDN + WAF + SSL',
        description: 'DDoS protection, edge caching for static assets, TLS termination, and rate limiting at the edge.',
      },
      {
        id: 'gateway',
        name: 'API Gateway',
        tech: 'Nginx',
        description: 'Reverse proxy, request routing, SSL termination, and upstream load balancing to FastAPI instances.',
      },
      {
        id: 'api',
        name: 'FastAPI',
        tech: 'Python 3.11',
        description: '120 REST endpoints — authentication, proposal CRUD, sentiment triggers, admin operations, and audit logging.',
        children: [
          { id: 'auth', name: 'JWT Auth Service', description: 'Role-based tokens with refresh rotation and session invalidation.' },
          { id: 'rate', name: 'Rate Limiter', description: 'Redis-backed per-IP and per-user rate limits on all public endpoints.' },
        ],
      },
      {
        id: 'supabase',
        name: 'Supabase',
        tech: 'Auth + Realtime',
        description: 'Managed auth layer, real-time subscriptions for admin dashboards, and storage for document uploads.',
      },
      {
        id: 'postgres',
        name: 'PostgreSQL',
        tech: '22 tables · 79 RLS policies',
        description: 'Row-Level Security on every citizen data table. Audit log table with immutable inserts. Indexed for regional queries.',
      },
      {
        id: 'redis',
        name: 'Redis',
        tech: 'Cache + Sessions',
        description: 'Session store, API response cache for expensive aggregations, and rate limit counters.',
      },
      {
        id: 'ai',
        name: 'Claude API',
        tech: 'Anthropic',
        description: 'Sentiment analysis on citizen proposals, regional grouping, and auto-generated presidential briefing reports.',
      },
      {
        id: 'storage',
        name: 'Object Storage',
        tech: 'Supabase Storage',
        description: 'Encrypted file uploads for supporting documents with signed URL access.',
      },
    ],
  },
  arptc: {
    title: 'ARPTC — Tower Infrastructure Map',
    nodes: [
      { id: 'frontend', name: 'Frontend', tech: 'React + Leaflet', description: 'Interactive map with 3,500+ tower markers, clustering, and operator filtering.' },
      { id: 'cdn', name: 'Netlify CDN', description: 'Static asset delivery with automatic HTTPS and global edge caching.' },
      { id: 'api', name: 'REST API', tech: 'Node.js', description: 'CRUD for towers, bulk import/export, soft-delete with trash/restore.' },
      { id: 'postgres', name: 'PostgreSQL', description: 'Geospatial tower data with operator, province, and status indexes.' },
      { id: 'import', name: 'Bulk Import', tech: 'XLSX/CSV', description: 'Excel and CSV batch upload with validation and error reporting.' },
    ],
  },
}

/** Interactive system design walkthrough */
export const systemWalkthroughs: Record<string, { title: string; subtitle: string; steps: WalkthroughStep[] }> = {
  maoni: {
    title: 'How MAONI Works',
    subtitle: 'Citizen proposal → AI analysis → presidential briefing',
    steps: [
      { id: 'citizen', title: 'Citizen', description: 'Submits constitutional reform proposal', detail: 'Citizen accesses maoni.cd, authenticates via Supabase Auth, and submits a proposal with regional metadata. Frontend validates input client-side before API call.' },
      { id: 'auth', title: 'Authentication', description: 'JWT verification + role check', detail: 'FastAPI validates JWT from Supabase, checks RLS-compatible role claims, and rejects expired or tampered tokens. Rate limiter checks Redis counter.' },
      { id: 'validation', title: 'Backend Validation', description: 'Pydantic schema + business rules', detail: 'Request body validated against strict Pydantic models. Duplicate detection, content filtering, and regional assignment applied before database write.' },
      { id: 'database', title: 'Database', description: 'RLS-protected PostgreSQL insert', detail: 'Proposal stored in PostgreSQL with RLS policy enforcing citizen can only read own submissions. Admin roles bypass via service-level policies. Audit log entry created.' },
      { id: 'ai', title: 'AI Analysis', description: 'Claude API sentiment processing', detail: 'Async job sends proposal text to Claude API for sentiment classification, topic extraction, and regional aggregation. Results cached in Redis for dashboard queries.' },
      { id: 'dashboard', title: 'Admin Dashboard', description: 'Presidential briefing reports', detail: 'Hidden admin panel displays real-time sentiment maps, regional breakdowns, and auto-generated briefing PDFs for presidential office review.' },
    ],
  },
}

export const openSourceShowcase = {
  username: 'lakho0543-spec',
  githubUrl: 'https://github.com/lakho0543-spec',
  highlights: [
    { name: 'Portfolio Templates', description: 'Reusable Next.js + Tailwind component patterns for developer portfolios.', type: 'template' },
    { name: 'API Boilerplates', description: 'FastAPI starter with JWT auth, rate limiting, and PostgreSQL migrations.', type: 'boilerplate' },
    { name: 'Scraper Utilities', description: 'Cloudflare bypass patterns and CAPTCHA handling for production scrapers.', type: 'tool' },
    { name: 'RLS Policy Examples', description: 'Supabase Row-Level Security templates for multi-tenant government apps.', type: 'security' },
  ],
  contributions: [
    { label: 'Public Repositories', value: '180+' },
    { label: 'Primary Languages', value: 'TypeScript, Python' },
    { label: 'Focus Areas', value: 'GovTech, AI, SaaS' },
  ],
}

export const timeline = [
  { year: '2022', title: 'Started Full Stack', description: 'Production web apps with React, Node.js, PostgreSQL.', icon: 'code' },
  { year: '2023', title: 'Enterprise Projects', description: 'SaaS and client work across USA, Germany, Nigeria.', icon: 'server' },
  { year: '2024', title: 'Government Platforms', description: 'National systems for DRC Presidential Office and ARPTC.', icon: 'shield' },
  { year: '2025', title: 'National Systems', description: 'MAONI deployed nationally. ARPTC maps 3,500+ towers.', icon: 'globe' },
  { year: '2026', title: 'AI Products', description: 'AI-powered systems, digital twins, intelligent automation.', icon: 'brain' },
]

export const skills = [
  { name: 'React', level: 98, color: '#00f0ff' },
  { name: 'Node.js', level: 95, color: '#7b2ffc' },
  { name: 'Python', level: 97, color: '#ff6b35' },
  { name: 'AI / ML', level: 99, color: '#00f0ff' },
  { name: 'Security', level: 95, color: '#d4af37' },
  { name: 'PostgreSQL', level: 96, color: '#7b2ffc' },
  { name: 'FastAPI', level: 94, color: '#ff6b35' },
  { name: 'TypeScript', level: 97, color: '#00f0ff' },
]

export const awards = [
  { title: 'Laptop Scheme', org: 'Government of Sindh', year: '2021', icon: 'laptop', color: '#00f0ff' },
  { title: 'Merit Scholarship', org: 'Sukkur IBA University', year: '2022', icon: 'award', color: '#7b2ffc' },
  { title: 'Full Stack Certificate', org: 'Professional Development', year: '2023', icon: 'certificate', color: '#ff6b35' },
  { title: 'Hackathon Participant', org: 'Tech Competitions', year: '2024', icon: 'trophy', color: '#d4af37' },
]

export const securityChecks = [
  { name: 'OWASP Top 10', status: 'Passed', icon: 'shield' },
  { name: 'SQL Injection', status: 'Protected', icon: 'database' },
  { name: 'XSS', status: 'Protected', icon: 'code' },
  { name: 'Rate Limiting', status: 'Enabled', icon: 'zap' },
  { name: 'SSL/TLS', status: 'Valid', icon: 'lock' },
  { name: 'Security Headers', status: 'Configured', icon: 'settings' },
  { name: 'RLS Policies', status: '79 Active', icon: 'check' },
  { name: 'JWT Auth', status: 'Implemented', icon: 'key' },
]

export const lighthouseScores = [
  { name: 'Performance', score: 100, color: '#00f0ff' },
  { name: 'Accessibility', score: 100, color: '#7b2ffc' },
  { name: 'SEO', score: 100, color: '#ff6b35' },
  { name: 'Best Practices', score: 100, color: '#d4af37' },
]

export const blogPosts = [
  { slug: 'how-i-built-maoni', title: 'Designing Government Platforms', excerpt: 'Architecture decisions for MAONI — 22 tables, 79 RLS policies, 120 API endpoints.', date: '2026-06-01', readTime: '8 min' },
  { slug: 'integrating-claude-api', title: 'Scaling AI Systems in Production', excerpt: 'Claude API integration patterns for sentiment analysis at national scale.', date: '2026-04-01', readTime: '6 min' },
  { slug: 'military-grade-security', title: 'Authentication Architecture for Enterprise', excerpt: 'JWT, RLS, rate limiting — security patterns from government projects.', date: '2026-02-01', readTime: '7 min' },
  { slug: 'optimizing-api-performance', title: 'Scaling React Apps to Millions of Users', excerpt: '75% response time reduction — from 2 minutes to 30 seconds.', date: '2026-05-01', readTime: '5 min' },
  { slug: 'selzara-story', title: 'PostgreSQL Performance Optimization', excerpt: 'Indexing and query optimization for high-traffic SaaS dashboards.', date: '2026-03-01', readTime: '9 min' },
  { slug: 'web-scraping-at-scale', title: 'Secure APIs for Public Services', excerpt: 'Rate limiting, validation, and audit logging for government endpoints.', date: '2026-01-01', readTime: '10 min' },
]

export const resumeRoles = ['Developer', 'AI Engineer', 'Full Stack', 'Government'] as const
export type ResumeRole = (typeof resumeRoles)[number]

export const resumeVariants: Record<ResumeRole, { title: string; summary: string; highlights: string[] }> = {
  Developer: {
    title: 'Full Stack Developer',
    summary: '18+ production systems across 5 countries. React, FastAPI, PostgreSQL.',
    highlights: ['18+ production platforms', '120 API endpoints (MAONI)', '0.48s avg response time', 'CI/CD & Docker deployments'],
  },
  'AI Engineer': {
    title: 'AI Engineer',
    summary: 'Claude API, RAG pipelines, sentiment analysis for government and enterprise.',
    highlights: ['Claude API at national scale', 'RAG & semantic search', 'AI briefing report generation', '457 daily organic visitors (Selzara)'],
  },
  'Full Stack': {
    title: 'Full Stack AI Developer',
    summary: 'React frontends to FastAPI backends. 22-table PostgreSQL schemas with 79 RLS policies.',
    highlights: ['React + FastAPI + Supabase', '79 RLS policies (MAONI)', '3,500+ mapped locations (ARPTC)', '99.9% uptime'],
  },
  Government: {
    title: 'Government Systems Architect',
    summary: 'Trusted by DRC Presidential Office. National-scale platforms with verified security.',
    highlights: ['MAONI — 5 production versions', 'ARPTC — 3,500+ towers', '79 RLS policies', '99.9% uptime'],
  },
}

export const caseStudyDocs = [
  {
    slug: 'maoni',
    title: 'MAONI',
    subtitle: 'Presidential Civic Consultation Platform',
    problem: 'Government could not collect citizen opinions at national scale for constitutional reform.',
    challenge: 'Millions of potential users, sensitive data, military-grade security requirements.',
    architecture: ['React', 'FastAPI', 'Supabase', 'PostgreSQL', 'Redis', 'Claude API'],
    security: ['79 RLS policies', 'JWT', 'Rate limiting', 'Audit logging'],
    performance: '0.48s avg response',
    results: '5 production versions deployed nationally — DRC Presidential Office',
    image: '/images/projects/maoni-dashboard.png',
    color: '#00f0ff',
    link: 'https://maoni.cd',
    github: 'https://github.com/lakho0543-spec',
    metrics: projectMetrics.maoni,
  },
  {
    slug: 'arptc',
    title: 'ARPTC Tower Map',
    subtitle: 'National Telecom Infrastructure',
    problem: 'Regulator could not track 3,500+ tower sites across all provinces.',
    challenge: 'Bulk imports, French interface, multiple map styles, real-time CRUD.',
    architecture: ['React', 'Leaflet', 'PostgreSQL', 'Netlify', 'XLSX'],
    security: ['Role-based access', 'Soft-delete', 'Data validation', 'HTTPS'],
    performance: '1.2s map load',
    results: '3,500+ towers tracked across 7 operators nationally',
    image: '/images/projects/arptc-tower-map.png',
    color: '#7b2ffc',
    link: 'https://drctowermap.netlify.app',
    github: 'https://github.com/lakho0543-spec',
    metrics: projectMetrics.arptc,
  },
  {
    slug: 'selzara',
    title: 'Selzara',
    subtitle: 'AI Operating System for Amazon Sellers',
    problem: 'Amazon sellers lacked integrated AI for PPC, analytics, and listings.',
    challenge: 'Zero ad budget — grow to 457 daily organic visitors.',
    architecture: ['React', 'FastAPI', 'PostgreSQL', 'Claude API', 'AWS'],
    security: ['OAuth', 'API keys', 'Encryption', 'Rate limiting'],
    performance: '0.8s dashboard load',
    results: '457 daily organic visitors, $0 paid advertising',
    image: '/images/projects/selzara-dashboard.png',
    color: '#ff6b35',
    link: 'https://selzara.com',
    github: 'https://github.com/lakho0543-spec',
    metrics: projectMetrics.selzara,
  },
]

export const testimonials = [
  { quote: 'Delivered a national-scale civic platform with exceptional quality and security. AI integration is world-class.', author: 'DRC Presidential Office', role: 'Government Client', flag: '🇨🇩', linkedin: '#', type: 'Government' },
  { quote: 'The tower mapping platform transformed how we monitor infrastructure across all provinces.', author: 'ARPTC', role: 'Telecom Regulator', flag: '🇨🇩', linkedin: '#', type: 'Government' },
  { quote: '457 daily organic visitors with zero paid advertising. Remarkable SaaS growth from scratch.', author: 'Selzara Team', role: 'Startup Founder', flag: '🚀', linkedin: '#', type: 'Startup' },
  { quote: 'Reduced response time from 2+ minutes to 30 seconds. The desktop companion was a game-changer.', author: 'JustFly', role: 'Travel Platform CTO', flag: '🇳🇬', linkedin: '#', type: 'Agency' },
]
