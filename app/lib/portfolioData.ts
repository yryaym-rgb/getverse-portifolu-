/**
 * GetVerse 3.0 — Centralized portfolio data
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

export const countries: Country[] = [
  {
    id: 'pk',
    name: 'Pakistan',
    flag: '🇵🇰',
    lat: 30.3753,
    lng: 69.3451,
    type: 'personal',
    projects: ['awazpk', 'imtiaz', 'medicare'],
    description: 'Personal & startup projects — voice AI, business platforms, healthcare.',
  },
  {
    id: 'cd',
    name: 'DRC',
    flag: '🇨🇩',
    lat: -4.0383,
    lng: 21.7587,
    type: 'government',
    projects: ['maoni', 'arptc'],
    description: 'National government platforms — presidential office & telecom regulator.',
  },
  {
    id: 'us',
    name: 'USA',
    flag: '🇺🇸',
    lat: 37.7749,
    lng: -122.4194,
    type: 'client',
    projects: ['selzara', 'tranquil'],
    description: 'SaaS & wellness platforms for US-based clients.',
  },
  {
    id: 'de',
    name: 'Germany',
    flag: '🇩🇪',
    lat: 51.1657,
    lng: 10.4515,
    type: 'client',
    projects: ['solidbridge'],
    description: 'Enterprise client work — business intelligence platforms.',
  },
  {
    id: 'ng',
    name: 'Nigeria',
    flag: '🇳🇬',
    lat: 9.082,
    lng: 8.6753,
    type: 'client',
    projects: ['justfly'],
    description: 'Travel tech — real-time flight scraping & booking.',
  },
]

export const heroStats = [
  { value: '18+', label: 'Production Systems', color: '#00f0ff' },
  { value: '5+', label: 'Countries', color: '#7b2ffc' },
  { value: '4+', label: 'Years Experience', color: '#ff6b35' },
  { value: 'Millions', label: 'Potential Citizens Served', color: '#d4af37' },
]

export const timeline = [
  { year: '2022', title: 'Started Full Stack', description: 'Began building production web applications with React, Node.js, and PostgreSQL.', icon: 'code' },
  { year: '2023', title: 'Enterprise Projects', description: 'Delivered SaaS platforms and client work across USA, Germany, and Nigeria.', icon: 'server' },
  { year: '2024', title: 'Government Platforms', description: 'Started building national-scale systems for DRC Presidential Office and ARPTC.', icon: 'shield' },
  { year: '2025', title: 'National Systems', description: 'MAONI civic platform and ARPTC tower map deployed nationally across DRC.', icon: 'globe' },
  { year: '2026', title: 'AI Products', description: 'Building AI-powered systems, digital twins, and intelligent automation at scale.', icon: 'brain' },
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

export const githubStats = {
  commits: '12,000+',
  repositories: '180+',
  technologies: '100+',
  username: 'lakho0543-spec',
  topLanguages: [
    { name: 'TypeScript', percent: 32, color: '#3178c6' },
    { name: 'Python', percent: 28, color: '#3776ab' },
    { name: 'JavaScript', percent: 22, color: '#f7df1e' },
    { name: 'CSS', percent: 10, color: '#264de4' },
    { name: 'Other', percent: 8, color: '#6b7280' },
  ],
}

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
  { name: 'CSRF Protection', status: 'Active', icon: 'check' },
  { name: 'JWT Auth', status: 'Implemented', icon: 'key' },
]

export const lighthouseScores = [
  { name: 'Performance', score: 100, color: '#00f0ff' },
  { name: 'Accessibility', score: 100, color: '#7b2ffc' },
  { name: 'SEO', score: 100, color: '#ff6b35' },
  { name: 'Best Practices', score: 100, color: '#d4af37' },
]

export const blogPosts = [
  { slug: 'how-i-built-maoni', title: 'Building National Government Systems', excerpt: 'Lessons from deploying MAONI for the DRC Presidential Office.', date: '2026-06-01', readTime: '8 min' },
  { slug: 'integrating-claude-api', title: 'AI Architecture Patterns for Production', excerpt: 'How to integrate Claude API, RAG pipelines, and semantic search at scale.', date: '2026-04-01', readTime: '6 min' },
  { slug: 'military-grade-security', title: 'Secure Authentication in Enterprise Apps', excerpt: 'JWT, RLS, rate limiting, and military-grade security practices.', date: '2026-02-01', readTime: '7 min' },
  { slug: 'optimizing-api-performance', title: 'Scaling React Apps to Millions of Users', excerpt: 'Performance optimization from 2 minutes to 30 seconds response time.', date: '2026-05-01', readTime: '5 min' },
  { slug: 'selzara-story', title: 'PostgreSQL Optimization for Government Data', excerpt: 'Building a SaaS with zero ad spend — 457 daily organic visitors.', date: '2026-03-01', readTime: '9 min' },
  { slug: 'web-scraping-at-scale', title: 'Enterprise Security Lessons from Government Projects', excerpt: 'What I learned building systems trusted by presidential offices.', date: '2026-01-01', readTime: '10 min' },
]

export const resumeRoles = ['Developer', 'AI Engineer', 'Full Stack', 'Government'] as const
export type ResumeRole = (typeof resumeRoles)[number]

export const resumeVariants: Record<ResumeRole, { title: string; summary: string; highlights: string[] }> = {
  Developer: {
    title: 'Full Stack Developer',
    summary: 'Building scalable web applications with React, Node.js, and PostgreSQL across 5 countries.',
    highlights: ['18+ production platforms', 'React & Next.js expert', 'API design & microservices', 'CI/CD & DevOps'],
  },
  'AI Engineer': {
    title: 'AI Engineer',
    summary: 'Designing AI-powered systems with Claude API, RAG pipelines, and semantic search for government and enterprise.',
    highlights: ['Claude API integration', 'RAG & embeddings', 'Sentiment analysis at scale', 'AI architecture design'],
  },
  'Full Stack': {
    title: 'Full Stack AI Developer',
    summary: 'End-to-end development from React frontends to FastAPI backends, deployed on secure infrastructure.',
    highlights: ['React + FastAPI stack', 'Supabase & PostgreSQL', 'Real-time systems', '18+ platforms delivered'],
  },
  Government: {
    title: 'Government Systems Architect',
    summary: 'Trusted by DRC Presidential Office. Building national-scale platforms with military-grade security.',
    highlights: ['MAONI — Presidential platform', 'ARPTC — 3,500+ towers mapped', 'Military-grade security', 'Millions of citizens served'],
  },
}

export const architectureLayers = [
  { name: 'User', icon: 'user', color: '#00f0ff' },
  { name: 'Cloudflare', icon: 'cloud', color: '#f38020' },
  { name: 'Frontend', icon: 'monitor', color: '#7b2ffc' },
  { name: 'API', icon: 'server', color: '#ff6b35' },
  { name: 'Database', icon: 'database', color: '#00f0ff' },
  { name: 'AI', icon: 'brain', color: '#d4af37' },
  { name: 'Analytics', icon: 'chart', color: '#7b2ffc' },
]

export const caseStudyDocs = [
  {
    slug: 'maoni',
    title: 'MAONI',
    subtitle: 'Presidential Civic Consultation Platform',
    problem: 'Government couldn\'t collect citizen opinions at national scale for constitutional reform.',
    challenge: 'Millions of potential users, sensitive data, military-grade security requirements.',
    architecture: ['React', 'FastAPI', 'Supabase', 'PostgreSQL', 'Redis', 'Claude API'],
    security: ['RLS', 'JWT', 'Rate limiting', 'Audit logging', 'Encryption at rest'],
    performance: '0.5s avg response',
    results: 'Deployed nationally — trusted by DRC Presidential Office',
    image: '/images/projects/maoni-dashboard.png',
    color: '#00f0ff',
    link: 'https://maoni.cd',
    github: 'https://github.com/lakho0543-spec',
  },
  {
    slug: 'arptc',
    title: 'ARPTC Tower Map',
    subtitle: 'National Telecom Infrastructure',
    problem: 'Telecom regulator couldn\'t track 3,500+ tower sites across all provinces.',
    challenge: 'Bulk data imports, French interface, multiple map styles, real-time CRUD.',
    architecture: ['React', 'Leaflet', 'PostgreSQL', 'Netlify', 'XLSX'],
    security: ['Role-based access', 'Soft-delete', 'Data validation', 'HTTPS'],
    performance: '1.2s map load',
    results: '3,500+ towers tracked across 7 operators nationally',
    image: '/images/projects/arptc-tower-map.png',
    color: '#7b2ffc',
    link: 'https://drctowermap.netlify.app',
    github: 'https://github.com/lakho0543-spec',
  },
  {
    slug: 'selzara',
    title: 'Selzara',
    subtitle: 'AI Operating System for Amazon Sellers',
    problem: 'Amazon sellers lacked an integrated AI platform for PPC, analytics, and listings.',
    challenge: 'Zero paid advertising budget, organic growth to 457 daily visitors.',
    architecture: ['React', 'Node.js', 'PostgreSQL', 'Claude API', 'AWS'],
    security: ['OAuth', 'API keys', 'Data encryption', 'Rate limiting'],
    performance: '0.8s dashboard',
    results: '457 daily organic visitors with zero paid ads',
    image: '/images/projects/selzara-dashboard.png',
    color: '#ff6b35',
    link: '#',
    github: 'https://github.com/lakho0543-spec',
  },
]

export const testimonials = [
  { quote: 'Delivered a national-scale civic platform with exceptional quality and security. AI integration is world-class.', author: 'DRC Presidential Office', role: 'CEO — Government', flag: '🇨🇩', linkedin: '#', type: 'Government' },
  { quote: 'The tower mapping platform transformed how we monitor infrastructure across all provinces.', author: 'ARPTC', role: 'Director — Telecom Regulator', flag: '🇨🇩', linkedin: '#', type: 'Government' },
  { quote: '457 daily organic visitors with zero paid advertising. Remarkable SaaS growth from scratch.', author: 'Selzara Team', role: 'Founder — Startup', flag: '🚀', linkedin: '#', type: 'Startup' },
  { quote: 'Reduced response time from 2+ minutes to 30 seconds. The desktop companion was a game-changer.', author: 'JustFly', role: 'CTO — Travel Platform', flag: '🇳🇬', linkedin: '#', type: 'Agency' },
]
