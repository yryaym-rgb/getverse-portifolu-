export interface KnowledgeEntry {
  id: string
  question: string
  answer: string
  keywords: string[]
  source: string
}

export const knowledgeBase: KnowledgeEntry[] = [
  {
    id: 'about',
    question: 'Who is Abdul Malik?',
    answer: "I'm Abdul Malik Lakho, a Full Stack AI Developer with 4+ years of experience based in Sukkur, Pakistan. I build government platforms, AI SaaS products, and business automation for clients across USA, Nigeria, and DRC.",
    keywords: ['who', 'about', 'abdul', 'malik', 'developer', 'engineer', 'yourself'],
    source: 'Portfolio / About',
  },
  {
    id: 'maoni',
    question: 'Tell me about MAONI',
    answer: 'MAONI is a presidential-grade citizen consultation platform for DRC Government constitutional reforms. I delivered 5 production versions with military-grade security, AI sentiment analysis via Claude API, hidden multi-role admin panel, and full audit logging. Live at maoni.cd.',
    keywords: ['maoni', 'drc', 'government', 'presidential', 'constitutional', 'consultation', 'citizen'],
    source: 'Case Study: MAONI',
  },
  {
    id: 'arptc',
    question: 'What is ARPTC?',
    answer: 'ARPTC Tower Map tracks 3,500+ mobile network towers across all DRC provinces for the national telecom regulator. Features interactive Leaflet mapping, CRUD operations, bulk Excel/CSV import, soft-delete trash/restore, and French-language interface.',
    keywords: ['arptc', 'tower', 'telecom', 'map', 'drc', 'leaflet', '3500'],
    source: 'Case Study: ARPTC',
  },
  {
    id: 'selzara',
    question: 'What is Selzara?',
    answer: 'Selzara.com is my AI SaaS for Amazon sellers with 10 modules: PPC optimization, profit analytics, inventory intelligence, AI listing generation, and more. Gets 457 daily organic visitors with $0 paid advertising.',
    keywords: ['selzara', 'amazon', 'saas', 'seller', 'ppc', 'ecommerce'],
    source: 'Project: Selzara',
  },
  {
    id: 'skills',
    question: 'What are your skills?',
    answer: 'Frontend: React, Next.js, TypeScript, Tailwind CSS\nBackend: Python, FastAPI, Node.js\nAI: LangChain, RAG, Claude API, OpenAI\nDatabases: PostgreSQL, Supabase, MongoDB\nDevOps: Docker, AWS, Nginx, CI/CD',
    keywords: ['skills', 'tech', 'stack', 'react', 'python', 'fastapi', 'typescript', 'nextjs'],
    source: 'Resume / Skills',
  },
  {
    id: 'experience',
    question: 'How much experience do you have?',
    answer: '4+ years of full-stack and AI development experience. I have shipped 18+ production platforms across 5 countries, including government systems for DRC Presidential Office and AI SaaS products.',
    keywords: ['experience', 'years', 'how long', 'career', 'background'],
    source: 'Resume',
  },
  {
    id: 'rates',
    question: 'What are your rates?',
    answer: 'My rates are $15-35/hr for hourly work, or $150-2500 for fixed-scope projects depending on complexity. Government and enterprise projects are quoted separately after requirements review.',
    keywords: ['rate', 'rates', 'price', 'pricing', 'cost', 'hire', 'budget', 'hourly'],
    source: 'Contact / Pricing',
  },
  {
    id: 'philosophy',
    question: 'What is your engineering philosophy?',
    answer: 'I believe in shipping fast but building right: start with the simplest architecture that works, instrument everything, and iterate based on real user feedback. Security and data integrity are non-negotiable, especially for government clients.',
    keywords: ['philosophy', 'approach', 'engineering', 'principles', 'how do you think', 'mindset'],
    source: 'Engineering Notes',
  },
  {
    id: 'scalability',
    question: 'How do you think about scalability?',
    answer: 'I design for horizontal scaling from day one: stateless APIs, connection pooling, Redis caching, CDN for static assets, and database indexing. For MAONI, we handled millions of users with PostgreSQL + Redis + Nginx load balancing.',
    keywords: ['scalability', 'scale', 'scaling', 'performance', 'load', 'millions'],
    source: 'Engineering Notes',
  },
  {
    id: 'fastapi',
    question: 'Why FastAPI over Django?',
    answer: 'FastAPI gives me async support, automatic OpenAPI docs, Pydantic validation, and 3x faster response times for API-heavy workloads. I use Django when I need the full admin panel and ORM ecosystem, but FastAPI is my default for microservices.',
    keywords: ['fastapi', 'django', 'python', 'backend', 'api', 'why'],
    source: 'Engineering Notes',
  },
  {
    id: 'justfly',
    question: 'What is JustFly?',
    answer: 'JustFly is a real-time flight scraping platform for the Nigerian travel market. Rebuilt scraper with 75% faster response (2min → 30-45s), Cloudflare bypass, CAPTCHA handling, and an Electron desktop companion app.',
    keywords: ['justfly', 'flight', 'scraping', 'nigeria', 'travel', 'selenium'],
    source: 'Case Study: JustFly',
  },
  {
    id: 'system-design',
    question: 'How would you design Uber?',
    answer: 'Uber-style system: geospatial indexing (PostGIS/H3), real-time matching via WebSockets, surge pricing service, trip state machine, payment ledger with idempotency, and driver/rider apps behind an API gateway with rate limiting and JWT auth.',
    keywords: ['uber', 'system design', 'design', 'architecture', 'voting', 'twitter', 'netflix'],
    source: 'System Design Notes',
  },
  {
    id: 'contact',
    question: 'How can I hire you?',
    answer: 'Reach out via the contact form at getverse.dev/contact, email abdulmaliklakho@gmail.com, or connect on LinkedIn. I respond within 24 hours and offer free 30-minute discovery calls.',
    keywords: ['contact', 'hire', 'email', 'reach', 'work together', 'collaborate'],
    source: 'Contact Page',
  },
]
