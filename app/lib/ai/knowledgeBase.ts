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
    id: 'government-systems',
    question: 'What government systems has Abdul built?',
    answer: 'Abdul has built two national government platforms for DRC:\n\n1. **MAONI** — Presidential civic consultation platform for constitutional reform. 22 database tables, 79 RLS policies, 120 API endpoints, 0.48s avg response, 99.9% uptime. Live at maoni.cd.\n\n2. **ARPTC Tower Map** — National telecom infrastructure tracker with 3,500+ towers across 7 operators. French-language interface with bulk import/export.\n\nBoth platforms were built as sole architect with military-grade security.',
    keywords: ['government', 'systems', 'national', 'drc', 'presidential', 'public', 'civic', 'what government'],
    source: 'Government Projects',
  },
  {
    id: 'maoni-architecture',
    question: "Explain MAONI's architecture",
    answer: "MAONI architecture:\n\n**Frontend** → React 18 + TypeScript (citizen portal + hidden admin)\n**Cloudflare** → CDN, WAF, SSL, edge rate limiting\n**Nginx** → API gateway and reverse proxy\n**FastAPI** → 120 REST endpoints with JWT auth\n**Supabase** → Auth + realtime + storage\n**PostgreSQL** → 22 tables with 79 RLS policies\n**Redis** → Sessions, caching, rate limits\n**Claude API** → Sentiment analysis and briefing reports\n\nData flow: Citizen submits proposal → JWT auth → Pydantic validation → RLS-protected DB insert → async Claude analysis → admin dashboard briefing.",
    keywords: ['maoni', 'architecture', 'explain', 'design', 'stack', 'how maoni', 'system'],
    source: 'MAONI Architecture',
  },
  {
    id: 'ai-projects',
    question: 'Show AI projects',
    answer: 'Abdul\'s AI projects:\n\n1. **MAONI** — Claude API sentiment analysis on citizen proposals at national scale\n2. **Selzara** — 10-module AI SaaS for Amazon sellers (457 daily organic visitors)\n3. **AwazPK** — Voice AI triage in 5 languages routing complaints to departments\n4. **JustFly** — Intelligent flight scraping with Cloudflare bypass\n\nAI stack: Claude API, OpenAI, LangChain, RAG pipelines, semantic search, embeddings.',
    keywords: ['ai', 'projects', 'show', 'artificial', 'machine learning', 'claude', 'ml'],
    source: 'AI Projects',
  },
  {
    id: 'why-hire',
    question: 'Why should I hire Abdul?',
    answer: 'Why hire Abdul Malik Lakho:\n\n✅ **Proven government trust** — Sole architect for DRC Presidential Office platform\n✅ **Scale** — 18+ production systems, 3,500+ mapped locations, 120 API endpoints\n✅ **Security** — 79 RLS policies, JWT auth, rate limiting, full audit logging\n✅ **Performance** — 0.48s avg API response, 99.9% uptime\n✅ **AI expertise** — Production Claude API integration at national scale\n✅ **Global delivery** — 5 countries, 4+ years experience\n✅ **Full ownership** — End-to-end from architecture to deployment\n\nAvailable for full-time, contract, and remote work. Responds within 24 hours.',
    keywords: ['why', 'hire', 'should', 'recruit', 'employ', 'choose', 'benefits', 'reasons'],
    source: 'Hiring',
  },
  {
    id: 'contact',
    question: 'How can I hire you?',
    answer: 'Reach out via the contact form at getverse.dev/contact, email abdulmaliklakho@gmail.com, or connect on LinkedIn. I respond within 24 hours and offer free 30-minute discovery calls.',
    keywords: ['contact', 'hire', 'email', 'reach', 'work together', 'collaborate'],
    source: 'Contact Page',
  },
]
