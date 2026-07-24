/**
 * Single source of truth for resume/CV data.
 * Used by /resume page and /api/resume download.
 */

export const resumeData = {
  name: 'Abdul Malik Lakho',
  title: 'Full Stack AI Developer',
  location: 'Sukkur, Pakistan',
  email: 'lakho0543@gmail.com',
  phone: '+92 328 672 5204',
  website: 'https://getverse.dev',
  github: 'https://github.com/lakho0543-spec',
  linkedin: 'https://linkedin.com/in/abdul-malik-lakho-19103b292',
  summary:
    'Full Stack AI Developer with 4+ years building mission-critical systems for governments and enterprises. Sole architect of national civic platforms for the DRC Presidential Office and ARPTC telecom regulator. Shipped 18+ production platforms across 5 countries.',
  experience: [
    {
      role: 'Full Stack AI Developer',
      company: 'Independent / Contract',
      period: '2022 — Present',
      highlights: [
        'Built MAONI — national civic consultation platform for DRC Presidential Office (5 production versions)',
        'Delivered ARPTC Tower Map — 3,500+ telecom towers tracked across DRC',
        'Founded Selzara — AI SaaS for Amazon sellers with 457 daily organic visitors',
        'Shipped JustFly — real-time flight scraper with 75% performance improvement',
      ],
    },
  ],
  skills: {
    frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    backend: ['Python', 'FastAPI', 'Node.js', 'Django'],
    databases: ['PostgreSQL', 'Supabase', 'MongoDB', 'Redis'],
    ai: ['Claude API', 'OpenAI', 'LangChain', 'RAG'],
    devops: ['Docker', 'AWS', 'Nginx', 'GitHub Actions', 'Netlify'],
  },
  education: [
    {
      degree: 'Software Engineering',
      institution: 'Self-taught + Production Experience',
      period: '2022 — Present',
    },
  ],
  projects: [
    { name: 'MAONI', url: 'https://maoni.cd', description: 'Presidential civic consultation platform (DRC)' },
    { name: 'ARPTC Tower Map', url: 'https://drctowermap.netlify.app', description: 'National telecom infrastructure map' },
    { name: 'Selzara', url: 'https://selzara.com', description: 'AI OS for Amazon sellers' },
    { name: 'JustFly', description: 'Real-time flight scraping platform (Nigeria)' },
  ],
  languages: ['English', 'Urdu', 'Sindhi'],
  availability: 'Available for full-time, contract, and remote work',
}
