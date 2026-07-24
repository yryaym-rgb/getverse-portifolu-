/**
 * Local response library for Abdul Malik's portfolio chat.
 * No external API keys or network calls required.
 */

export const responses: Record<string, string> = {
  // Greetings
  hello: "Hello! I'm Abdul Malik - AI Developer from Sukkur, Pakistan.",
  hi: 'Hi there! Ready to talk about my projects?',
  hey: 'Hey! What would you like to know about my work?',
  'good morning': 'Good morning! Ask me about my projects, skills, or experience.',
  'good afternoon': 'Good afternoon! How can I help you learn about my work?',
  'good evening': 'Good evening! Feel free to ask about my portfolio.',

  // About
  'who are you':
    "I'm Abdul Malik Lakho, an AI Developer & Full-Stack Engineer with 2+ years of experience. I build production-grade applications for clients worldwide.",
  'about me':
    "I'm Abdul Malik Lakho from Sukkur, Pakistan. I specialize in AI SaaS, government platforms, and business automation. I've served clients in USA, Nigeria, and DRC.",
  about:
    "I'm Abdul Malik Lakho — Full Stack AI Developer based in Sukkur, Pakistan. I build government platforms, AI SaaS products, and business automation systems for clients across USA, Nigeria, and DRC.",
  'tell me about yourself':
    "I'm Abdul Malik Lakho, a Full Stack AI Developer with 4+ years of experience. I specialize in React, Next.js, Python, FastAPI, and AI integrations. I've shipped 18+ production platforms including government systems for DRC and AI SaaS for Amazon sellers.",

  // Projects overview
  projects:
    'Here are my main projects:\n\n1. Selzara.com - AI SaaS for Amazon sellers (457 daily visitors)\n2. MAONI Platform - DRC Government presidential system\n3. TravelAgent.com.ng - Full travel booking platform\n4. GrapeTask.co - Freelance marketplace\n5. BookForge AI - AI book creation tool\n6. AutoTint - Automotive tinting business platform\n7. ARPTC Tower Map - 3,500+ telecom towers tracked\n8. JustFly - Real-time flight scraping\n9. SolidBridge - AI investment platform',

  // Individual projects
  selzara:
    'Selzara.com is my AI SaaS for Amazon sellers. It has 10 modules including PPC analyzer, profit calculator, and inventory alerts. Gets 457 daily organic visitors with zero paid ads. Valued at $8,500.',
  maoni:
    'MAONI Platform is a presidential-grade citizen consultation system for DRC Government constitutional reforms. Delivered 5 complete versions with military-grade security, AI sentiment analysis, and full audit logging.',
  travelagent:
    'TravelAgent.com.ng is a full travel booking platform for Nigerian clients. Includes user auth, payment processing, and admin dashboard. Live in production.',
  travel:
    'TravelAgent.com.ng is a full travel booking platform for Nigerian clients. Includes user auth, payment processing, and admin dashboard. Live in production.',
  grape:
    'GrapeTask.co is a complete freelance marketplace I built. Features job posting, bidding system, SafePay payments, dispute center, and messaging.',
  grapetask:
    'GrapeTask.co is a complete freelance marketplace I built. Features job posting, bidding system, SafePay payments, dispute center, and messaging.',
  bookforge:
    'BookForge AI is an AI-powered book creation tool. It helps authors generate, structure, and publish books using AI-assisted writing workflows.',
  autotint:
    'AutoTint is an automotive tinting business platform with booking, customer management, and service tracking built for a real business client.',
  arptc:
    'ARPTC Tower Map tracks 3,500+ mobile network towers across DRC for the national telecom regulator. Features interactive mapping, CRUD, bulk import/export, and French-language interface.',
  justfly:
    'JustFly is a real-time flight scraping platform that aggregates flight data from multiple sources with fast API response times.',
  solidbridge:
    'SolidBridge is an AI-enhanced investment platform with portfolio tracking, market analysis, and intelligent investment recommendations.',
  awazpk:
    'AwazPK is a national civic voice platform enabling citizens to share feedback and participate in governance discussions.',
  medicare:
    'MediCare Pro is a healthcare management platform with patient records, appointment scheduling, and admin dashboards.',

  // Skills
  skills:
    'My tech stack:\n\nFrontend: React, Next.js, TypeScript, Tailwind CSS\nAI: OpenAI GPT-4, LangChain, RAG, n8n, Vapi AI\nBackend: Python, FastAPI, Node.js\nDatabases: PostgreSQL, MongoDB, Supabase\nDevOps: Docker, AWS, Vercel',
  react:
    'I use React and Next.js extensively — built 18+ production platforms including MAONI, Selzara, and TravelAgent.com.ng. Expert in TypeScript, Tailwind CSS, and App Router.',
  nextjs:
    'Next.js is my primary frontend framework. I use App Router, API routes, SSR, and deploy on Vercel. This portfolio (getverse.dev) is built with Next.js 14.',
  python:
    'Python is my go-to backend language. I use FastAPI for high-performance APIs, Django for full-stack apps, and Python for AI/ML pipelines with LangChain and RAG.',
  fastapi:
    'I prefer FastAPI over Django for API-heavy projects — async support, automatic OpenAPI docs, and type safety. Used it on MAONI, Selzara, and multiple client projects.',
  node:
    'I use Node.js for real-time features, API gateways, and full-stack apps. Combined with Express and Next.js API routes for scalable backends.',
  'node.js':
    'I use Node.js for real-time features, API gateways, and full-stack apps. Combined with Express and Next.js API routes for scalable backends.',
  typescript:
    'TypeScript across all my projects — React, Next.js, and Node.js. Type safety catches bugs early and makes large codebases maintainable.',
  docker:
    'I containerize all production deployments with Docker. Used on MAONI, Selzara, and client VPS deployments with Nginx reverse proxy.',
  aws:
    'I deploy on AWS (EC2, S3, RDS) and Vercel. Experience with auto-scaling, load balancing, and CI/CD pipelines via GitHub Actions.',
  postgresql:
    'PostgreSQL is my primary database — used on MAONI, ARPTC, Selzara, and most client projects. Expert in schema design, indexing, and query optimization.',
  supabase:
    'I use Supabase for rapid prototyping and production apps — auth, real-time subscriptions, and PostgreSQL with Row Level Security.',
  ai: 'I integrate AI via Claude API, OpenAI, LangChain, and RAG pipelines. Built AI features for MAONI (sentiment analysis), Selzara (PPC optimization), and BookForge (content generation).',
  langchain:
    'I use LangChain for RAG pipelines, document processing, and AI agent workflows. Combined with vector databases for intelligent search and Q&A systems.',

  // Experience
  experience:
    '2+ years experience\n15+ projects shipped\n3 countries served (USA, Nigeria, DRC)\n457 daily visitors on Selzara\n10+ government level projects\n40 hours available per week',
  'years of experience':
    'I have 4+ years of professional development experience, with 18+ production platforms shipped across government, SaaS, and enterprise clients.',
  government:
    'I built government-grade platforms for DRC including MAONI (presidential consultation) and ARPTC (telecom infrastructure). Military-grade security, audit logging, and multi-role admin panels.',

  // Rates
  rates:
    'My rates:\nHourly: $15-$35/hr\nFixed: $150-$2,500 per project\nDelivery before payment guarantee.',
  price:
    'My rates:\nHourly: $15-$35/hr\nFixed: $150-$2,500 per project\nDelivery before payment guarantee.',
  pricing:
    'My rates:\nHourly: $15-$35/hr\nFixed: $150-$2,500 per project\nDelivery before payment guarantee.',
  hire:
    'I am available for hire! Rates: $15-$35/hr or $150-$2,500 fixed per project. I offer delivery before payment guarantee. Contact me at +92 328 6725204 or lakho0543@gmail.com.',
  available:
    'I am available 40 hours per week for new projects. I work with clients in USA, Nigeria, and DRC. Contact me to discuss your project!',

  // Contact
  contact:
    'Contact me:\nPhone: +92 328 6725204\nEmail: lakho0543@gmail.com\nLinkedIn: linkedin.com/in/abdul-malik-lakho\nGitHub: github.com/lakho0543-spec\nPortfolio: getverse.dev',
  email: 'You can reach me at lakho0543@gmail.com. I typically respond within 24 hours.',
  phone: 'My phone number is +92 328 6725204. Available for calls and WhatsApp.',
  linkedin: 'Find me on LinkedIn: linkedin.com/in/abdul-malik-lakho',
  github: 'Check out my code on GitHub: github.com/lakho0543-spec',

  // Engineering topics
  'engineering philosophy':
    'My engineering philosophy:\n\n1. Build for production from day one — no throwaway prototypes\n2. Security is non-negotiable, especially for government systems\n3. Choose boring technology that scales — PostgreSQL, Docker, FastAPI\n4. Ship fast, iterate based on real user feedback\n5. Document everything — future you will thank present you',
  scalability:
    'I think about scalability through: horizontal scaling with load balancers, database indexing and read replicas, caching with Redis, async processing with queues, and CDN for static assets. Applied these on MAONI (thousands of concurrent users) and Selzara (457 daily visitors).',
  'system design':
    'For system design, I start with requirements, identify bottlenecks, choose the right data store, design APIs first, plan for failure (circuit breakers, retries), and always consider security. I have designed national-scale platforms for DRC government.',
  security:
    'Security practices I implement: JWT with refresh tokens, RBAC, encryption at rest and in transit, rate limiting, audit logging, input validation, and OWASP compliance. Used military-grade security on MAONI for DRC government.',
  'voting system':
    'For a voting system, I would design: voter authentication with government ID verification, encrypted ballot storage, immutable audit trail, real-time tallying with consensus, DDoS protection, and geographic redundancy. Similar patterns to what I built for MAONI citizen consultation.',
  uber:
    'To design Uber, I would architect: real-time location tracking with WebSockets, geospatial indexing (PostGIS), driver-rider matching algorithm, payment processing, surge pricing engine, and a microservices architecture with separate services for matching, payments, and notifications.',
  'fastapi over django':
    'I choose FastAPI over Django when: I need async performance, building API-first services, want automatic OpenAPI docs, or need type-safe endpoints. I use Django when I need admin panels, ORM-heavy CRUD apps, or rapid prototyping with batteries included.',
  'cap theorem':
    'CAP theorem states you can only guarantee two of: Consistency, Availability, Partition tolerance. In distributed systems, partition tolerance is non-negotiable. I choose CP for financial/government systems (MAONI) and AP for high-traffic read-heavy apps (Selzara).',

  // Commands
  help: "I can help you with:\n\n- My projects (Selzara, MAONI, TravelAgent, GrapeTask)\n- My skills (React, Python, AI, Node.js)\n- My experience and rates\n- Contact information\n- Engineering philosophy and system design\n\nJust ask anything!",
  commands:
    "Try asking about:\n- projects\n- skills\n- experience\n- rates\n- contact\n- selzara / maoni / travelagent\n- engineering philosophy\n- system design",

  // Default
  default:
    "I don't have that information. Try asking about:\n- My projects (Selzara, MAONI, TravelAgent)\n- My skills (React, Python, AI)\n- My experience\n- My rates\n- Contact info",
}

/** Ordered keywords — longer/more specific matches first */
const keywordPriority: string[] = [
  'who are you',
  'tell me about yourself',
  'about me',
  'good morning',
  'good afternoon',
  'good evening',
  'years of experience',
  'engineering philosophy',
  'fastapi over django',
  'voting system',
  'system design',
  'cap theorem',
  'node.js',
  'travelagent',
  'grapetask',
  'bookforge',
  'autotint',
  'solidbridge',
  'postgresql',
  'typescript',
  'langchain',
  'experience',
  'government',
  'scalability',
  'selzara',
  'travel',
  'grape',
  'maoni',
  'arptc',
  'justfly',
  'awazpk',
  'medicare',
  'autotint',
  'projects',
  'linkedin',
  'fastapi',
  'nextjs',
  'pricing',
  'security',
  'commands',
  'available',
  'react',
  'python',
  'skills',
  'docker',
  'github',
  'contact',
  'fastapi',
  'node',
  'rates',
  'price',
  'email',
  'phone',
  'uber',
  'help',
  'hire',
  'about',
  'hello',
  'skills',
  'ai',
  'aws',
  'hey',
  'hi',
]

export function getLocalResponse(input: string): string {
  const lowerInput = input.toLowerCase().trim()

  for (const key of keywordPriority) {
    if (lowerInput.includes(key)) {
      return responses[key]
    }
  }

  for (const [key, value] of Object.entries(responses)) {
    if (key !== 'default' && lowerInput.includes(key)) {
      return value
    }
  }

  return responses.default
}
