'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import { 
  ArrowLeft, Calendar, User, Clock, 
  ArrowRight, Heart, Eye, Share2, 
  Bookmark, Twitter, Linkedin, Link2,
  Tag, Sparkles, MessageCircle
} from 'lucide-react'

// Blog post data
const blogPosts: Record<string, any> = {
  'how-i-built-maoni': {
    title: 'How I Built MAONI: A Presidential Platform',
    date: 'June 2026',
    author: 'Abdul Malik Lakho',
    readTime: '8 min read',
    category: 'Case Study',
    image: '/images/projects/maoni-dashboard.png',
    tags: ['Government', 'AI', 'Security', 'React', 'Node.js'],
    views: 1247,
    likes: 89,
    content: `
      <h2>The Challenge</h2>
      <p>The Democratic Republic of Congo needed a national platform for constitutional reform consultation. The system had to handle sensitive citizen data with military-grade security while being accessible to millions of citizens across the country.</p>

      <h2>Key Requirements</h2>
      <ul>
        <li>National-scale platform handling millions of submissions</li>
        <li>AI-powered sentiment analysis of citizen proposals</li>
        <li>Military-grade security with full audit logging</li>
        <li>Hidden multi-role admin panel for government officials</li>
        <li>Real-time data processing and reporting</li>
        <li>Support for multiple regional languages</li>
      </ul>

      <h2>The Solution</h2>
      <p>I built a 5-version platform using React, Node.js, Supabase, and Claude API. The system automatically analyzes citizen proposals, performs sentiment analysis across regional groups, and generates presidential briefing reports.</p>

      <p>The architecture was designed for scalability and security:</p>

      <pre><code>React Frontend → Node.js API → Supabase → PostgreSQL → Claude API → Nginx → Ubuntu VPS</code></pre>

      <h2>Key Features Implemented</h2>
      <ul>
        <li><strong>AI Sentiment Analysis:</strong> Using Claude API to analyze citizen proposals and categorize sentiment across regions</li>
        <li><strong>Hidden Admin Panel:</strong> Multi-role system with military-grade security and full audit logging</li>
        <li><strong>Real-time Dashboard:</strong> Live statistics and visualization of citizen feedback</li>
        <li><strong>Presidential Briefing Reports:</strong> Auto-generated reports with key insights and recommendations</li>
        <li><strong>Multi-language Support:</strong> Interface available in multiple regional languages</li>
      </ul>

      <h2>Results</h2>
      <ul>
        <li>5 successful production versions delivered</li>
        <li>AI-powered sentiment analysis working in real-time</li>
        <li>Trusted by the DRC Presidential Office</li>
        <li>Military-grade security implemented and verified</li>
        <li>99.9% uptime maintained throughout the consultation period</li>
      </ul>

      <h2>Lessons Learned</h2>
      <p>Working with government clients requires extreme attention to security, documentation, and scalability. Each version improved based on user feedback and changing requirements.</p>

      <p>The most important lesson was that <strong>security cannot be an afterthought</strong> — it must be baked into every layer of the architecture from day one.</p>

      <blockquote>
        "Building for governments means building for millions of citizens. Every line of code matters."
      </blockquote>
    `
  },
  'optimizing-api-performance': {
    title: 'Optimizing API Performance: 2 Minutes to 30 Seconds',
    date: 'May 2026',
    author: 'Abdul Malik Lakho',
    readTime: '6 min read',
    category: 'Engineering',
    image: '/images/projects/justfly-search.png',
    tags: ['Performance', 'Optimization', 'Scraping', 'API'],
    views: 856,
    likes: 67,
    content: `
      <h2>The Problem</h2>
      <p>The Nigerian travel market needed a real-time flight scraper for 12 airlines. The original application took over 2 minutes to return results, making it unusable for users.</p>

      <h2>The Challenge</h2>
      <ul>
        <li>Cloudflare and CAPTCHA challenges on multiple airline sites</li>
        <li>Real-time price fetching with no caching allowed</li>
        <li>High CPU and memory load on the server</li>
        <li>12 different airline APIs and scraping targets</li>
        <li>Unpredictable response times from external services</li>
      </ul>

      <h2>The Solution</h2>
      <p>I rebuilt the scraper with intelligent route filtering and progressive result loading. The system now returns results in 30-45 seconds while reducing CPU and memory load by over 70%.</p>

      <h2>Key Optimizations</h2>
      <ul>
        <li><strong>Intelligent Route Filtering:</strong> Only process routes that match user criteria</li>
        <li><strong>Progressive Result Loading:</strong> Show results as they become available</li>
        <li><strong>Cloudflare Bypass:</strong> Implemented advanced techniques to handle anti-bot measures</li>
        <li><strong>CAPTCHA Handling:</strong> Automated CAPTCHA solving for supported services</li>
        <li><strong>Desktop Companion App:</strong> Built with Electron for local processing</li>
      </ul>

      <h2>Results</h2>
      <ul>
        <li>Response time: 2+ minutes → 30-45 seconds (75% faster)</li>
        <li>9 of 12 airlines live in production</li>
        <li>Desktop companion application shipped to clients</li>
        <li>VPS deployment with dedicated domain</li>
        <li>Reduced server costs by 40%</li>
      </ul>

      <pre><code># Before optimization
2 minutes 15 seconds average response
70% CPU usage

# After optimization
32 seconds average response
20% CPU usage</code></pre>

      <h2>Key Takeaway</h2>
      <p>Sometimes the best optimization is rethinking the architecture, not just tweaking the code. The progressive loading pattern made the biggest difference in perceived performance.</p>
    `
  },
  'integrating-claude-api': {
    title: 'Integrating Claude API for Government Systems',
    date: 'April 2026',
    author: 'Abdul Malik Lakho',
    readTime: '5 min read',
    category: 'AI',
    image: '/images/projects/selzara-dashboard.png',
    tags: ['AI', 'Claude API', 'Automation', 'Government'],
    views: 723,
    likes: 54,
    content: `
      <h2>The Challenge</h2>
      <p>Government systems need AI that is reliable, secure, and accurate. I integrated Claude API across multiple platforms for sentiment analysis, proposal summarization, and automation.</p>

      <h2>AI Use Cases</h2>
      <ul>
        <li><strong>Sentiment Analysis:</strong> Analyzing citizen proposals to understand public sentiment</li>
        <li><strong>Content Summarization:</strong> Generating concise summaries of lengthy documents</li>
        <li><strong>Report Generation:</strong> Auto-generating presidential briefing reports</li>
        <li><strong>Classification:</strong> Categorizing citizen complaints and proposals</li>
        <li><strong>RAG Pipelines:</strong> Building retrieval-augmented generation systems</li>
      </ul>

      <h2>Technical Implementation</h2>
      <p>I built RAG pipelines with LangChain, implemented prompt engineering for consistent results, and ensured all AI outputs are auditable and secure.</p>

      <h2>Key Considerations</h2>
      <ul>
        <li><strong>Security:</strong> All AI processing happens with proper encryption and logging</li>
        <li><strong>Accuracy:</strong> Continuous monitoring and refinement of AI outputs</li>
        <li><strong>Auditability:</strong> Every AI interaction is logged for government compliance</li>
        <li><strong>Performance:</strong> Optimized prompts for fast response times</li>
      </ul>

      <h2>Results</h2>
      <ul>
        <li>22+ AI integrations across platforms</li>
        <li>Real-time sentiment analysis working at scale</li>
        <li>Automated report generation saving 10+ hours per week</li>
        <li>Government-trusted AI systems with full audit trail</li>
      </ul>

      <blockquote>
        "AI is not a replacement for human judgment — it's a tool to enhance it."
      </blockquote>
    `
  },
  'selzara-story': {
    title: 'Building a SaaS with Zero Ad Spend: The Selzara Story',
    date: 'March 2026',
    author: 'Abdul Malik Lakho',
    readTime: '7 min read',
    category: 'SaaS',
    image: '/images/projects/selzara-dashboard.png',
    tags: ['SaaS', 'Growth', 'AI', 'Entrepreneurship'],
    views: 634,
    likes: 42,
    content: `
      <h2>The Vision</h2>
      <p>Amazon sellers needed a comprehensive AI platform for PPC optimization, profit analytics, and inventory management. I built Selzara to solve this problem with zero paid advertising.</p>

      <h2>The Product</h2>
      <ul>
        <li>10-module SaaS platform</li>
        <li>AI-powered PPC optimization</li>
        <li>Profit analytics and forecasting</li>
        <li>Inventory intelligence</li>
        <li>AI listing generation</li>
        <li>Competitor intelligence</li>
        <li>Dynamic pricing</li>
        <li>Review management</li>
        <li>Demand forecasting</li>
        <li>Cashflow tracking</li>
      </ul>

      <h2>The Growth Strategy</h2>
      <p>Instead of paid advertising, I focused on SEO, content marketing, and community-led growth. The platform achieved 457 daily organic visitors with $0 ad spend.</p>

      <h2>Key Growth Tactics</h2>
      <ul>
        <li><strong>SEO Optimization:</strong> Targeted high-intent keywords with quality content</li>
        <li><strong>Community Building:</strong> Engaged with Amazon seller communities</li>
        <li><strong>Content Marketing:</strong> Published valuable resources and guides</li>
        <li><strong>Word of Mouth:</strong> Delivered exceptional value to early users</li>
        <li><strong>Referral Program:</strong> Incentivized users to share the platform</li>
      </ul>

      <h2>Results</h2>
      <ul>
        <li>457 daily organic visitors</li>
        <li>$0 paid advertising spend</li>
        <li>10 modules deployed</li>
        <li>Tiered subscription billing via Gumroad</li>
        <li>95% user retention rate</li>
      </ul>

      <blockquote>
        "You don't need a massive marketing budget to build a successful SaaS. You need a product that solves real problems."
      </blockquote>
    `
  },
  'military-grade-security': {
    title: 'Military-Grade Security for Government Platforms',
    date: 'February 2026',
    author: 'Abdul Malik Lakho',
    readTime: '6 min read',
    category: 'Security',
    image: '/images/projects/maoni-dashboard.png',
    tags: ['Security', 'Government', 'Encryption', 'Audit'],
    views: 512,
    likes: 38,
    content: `
      <h2>The Challenge</h2>
      <p>Government platforms require the highest level of security. I implemented military-grade security practices across multiple national-scale systems.</p>

      <h2>Security Implementation</h2>
      <ul>
        <li><strong>JWT Authentication:</strong> Secure token-based authentication with refresh tokens</li>
        <li><strong>Role-Based Access Control:</strong> Granular permissions for different user roles</li>
        <li><strong>Comprehensive Audit Logging:</strong> Every action is logged and traceable</li>
        <li><strong>Data Encryption:</strong> Encryption at rest and in transit</li>
        <li><strong>Hidden Admin Panels:</strong> Secure, multi-role administration</li>
        <li><strong>Rate Limiting:</strong> Protection against DDoS attacks</li>
      </ul>

      <h2>Key Features</h2>
      <ul>
        <li>Full audit trail for all user actions</li>
        <li>Military-grade encryption standards</li>
        <li>Secure session management with automatic timeout</li>
        <li>Compliance with government security requirements</li>
        <li>Regular security audits and penetration testing</li>
      </ul>

      <h2>Results</h2>
      <ul>
        <li>Trusted by DRC Presidential Office</li>
        <li>All systems pass security audits</li>
        <li>99.98% uptime maintained</li>
        <li>Zero security breaches</li>
      </ul>
    `
  },
  'web-scraping-at-scale': {
    title: 'Web Scraping at Scale: Cloudflare and CAPTCHA Bypass',
    date: 'January 2026',
    author: 'Abdul Malik Lakho',
    readTime: '5 min read',
    category: 'Scraping',
    image: '/images/projects/justfly-search.png',
    tags: ['Scraping', 'Automation', 'Data', 'Python'],
    views: 445,
    likes: 31,
    content: `
      <h2>The Challenge</h2>
      <p>Building production scrapers that handle anti-bot measures and extract real-time data at scale for multiple clients across different industries.</p>

      <h2>Technical Approach</h2>
      <ul>
        <li><strong>Selenium & Playwright:</strong> Advanced browser automation</li>
        <li><strong>Cloudflare Bypass:</strong> Techniques to handle Cloudflare challenges</li>
        <li><strong>CAPTCHA Handling:</strong> Automated CAPTCHA solving strategies</li>
        <li><strong>Proxy Rotation:</strong> IP rotation to avoid detection</li>
        <li><strong>Real-time Pipelines:</strong> Streaming data extraction</li>
      </ul>

      <h2>Key Projects</h2>
      <ul>
        <li>12-airline flight scraper for Nigerian market</li>
        <li>Real-time price monitoring systems</li>
        <li>Competitor intelligence scraping</li>
        <li>Automated data extraction pipelines</li>
      </ul>

      <h2>Results</h2>
      <ul>
        <li>75% faster response time (2min → 30-45sec)</li>
        <li>9 of 12 airlines live in production</li>
        <li>Cloudflare and CAPTCHA challenges resolved</li>
        <li>99.9% data accuracy maintained</li>
      </ul>
    `
  }
}

export default function BlogDetail() {
  const params = useParams()
  const slug = params.slug as string
  const post = blogPosts[slug]

  if (!post) {
    return (
      <main className="min-h-screen bg-black">
        <Navigation />
        <section className="pt-32 text-center">
          <div className="text-6xl mb-4">📝</div>
          <h1 className="text-4xl font-bold">Post Not Found</h1>
          <p className="text-gray-400 mt-2">The article you're looking for doesn't exist.</p>
          <Link href="/blog" className="text-[#00f0ff] mt-4 inline-block hover:underline">
            ← Back to Blog
          </Link>
        </section>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black">
      <Navigation />

      <section className="pt-24 pb-20 px-4 max-w-4xl mx-auto">
        {/* Back Button */}
        <Link href="/blog" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition mb-8 group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition" />
          Back to Blog
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 text-sm text-gray-400 mb-4 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-[#00f0ff]/10 text-[#00f0ff]">
              {post.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              {post.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {post.readTime}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white">{post.title}</h1>
          <div className="flex items-center gap-2 mt-4 text-gray-400">
            <User size={16} />
            <span>{post.author}</span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative h-64 md:h-80 rounded-3xl overflow-hidden mb-8">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        {/* Tags */}
        <div className="mt-8 flex flex-wrap gap-2">
          {post.tags.map((tag: string, i: number) => (
            <span key={i} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-gray-400 text-sm flex items-center gap-1">
              <Tag size={12} />
              {tag}
            </span>
          ))}
        </div>

        {/* Engagement */}
        <div className="mt-8 pt-8 border-t border-white/5 flex flex-wrap items-center justify-end gap-4">
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition text-gray-400 hover:text-white">
              <Heart size={18} />
            </button>
            <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition text-gray-400 hover:text-white">
              <Bookmark size={18} />
            </button>
            <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition text-gray-400 hover:text-white">
              <Share2 size={18} />
            </button>
            <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition text-gray-400 hover:text-white">
              <Twitter size={18} />
            </button>
            <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition text-gray-400 hover:text-white">
              <Linkedin size={18} />
            </button>
          </div>
        </div>

        {/* Author Bio */}
        <div className="mt-8 p-6 rounded-2xl bg-white/5 border border-white/5">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#00f0ff] to-[#7b2ffc] flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
              A
            </div>
            <div>
              <h4 className="text-white font-semibold">{post.author}</h4>
              <p className="text-gray-400 text-sm">Full Stack AI Developer & Founder</p>
              <p className="text-gray-400 text-sm mt-1">
                Building mission-critical AI systems for governments & enterprises. 
                Trusted by the DRC Presidential Office.
              </p>
              <Link 
                href="/contact" 
                className="inline-flex items-center gap-2 mt-3 text-[#00f0ff] text-sm hover:gap-3 transition"
              >
                Get in touch <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        <div className="mt-8 pt-8 border-t border-white/5">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Sparkles size={18} className="text-[#00f0ff]" />
            Related Articles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(blogPosts)
              .filter(([key]) => key !== slug)
              .slice(0, 2)
              .map(([key, post]) => (
                <Link
                  key={key}
                  href={`/blog/${key}`}
                  className="group p-4 rounded-xl bg-white/5 border border-white/5 hover:border-[#00f0ff]/30 transition"
                >
                  <h4 className="text-white font-medium group-hover:text-[#00f0ff] transition">
                    {post.title}
                  </h4>
                  <p className="text-gray-400 text-sm mt-1">{post.date}</p>
                </Link>
              ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-[#00f0ff]/5 to-[#7b2ffc]/5 border border-[#00f0ff]/10 text-center">
          <p className="text-white font-medium">Enjoyed this article?</p>
          <p className="text-gray-400 text-sm">Let's discuss how I can help with your project.</p>
          <Link 
            href="/contact" 
            className="inline-flex items-center gap-2 mt-3 px-6 py-2 rounded-xl bg-gradient-to-r from-[#00f0ff] to-[#7b2ffc] text-white font-semibold hover:shadow-lg transition"
          >
            Get in Touch <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}