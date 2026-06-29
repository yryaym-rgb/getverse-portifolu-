'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import { 
  Calendar, User, ArrowRight, Clock, 
  Search, Filter, BookOpen, TrendingUp,
  Sparkles, Tag, Eye, Heart
} from 'lucide-react'

const posts = [
  {
    title: 'How I Built MAONI: A Presidential Platform',
    description: 'Building a national-scale civic consultation platform with AI sentiment analysis for the DRC Presidential Office. The journey from concept to 5 production versions.',
    date: 'June 2026',
    author: 'Abdul Malik Lakho',
    readTime: '8 min read',
    category: 'Case Study',
    slug: 'how-i-built-maoni',
    image: '/images/projects/maoni-dashboard.png',
    tags: ['Government', 'AI', 'Security'],
    featured: true,
    views: 1247,
    likes: 89
  },
  {
    title: 'Optimizing API Performance: 2 Minutes to 30 Seconds',
    description: 'How I optimized a 12-airline flight scraper using intelligent routing, caching, and progressive loading to achieve 75% faster response times.',
    date: 'May 2026',
    author: 'Abdul Malik Lakho',
    readTime: '6 min read',
    category: 'Engineering',
    slug: 'optimizing-api-performance',
    image: '/images/projects/justfly-search.png',
    tags: ['Performance', 'Optimization', 'Scraping'],
    featured: false,
    views: 856,
    likes: 67
  },
  {
    title: 'Integrating Claude API for Government Systems',
    description: 'Using AI for sentiment analysis, summarization, and automation in government and enterprise platforms with real-world results.',
    date: 'April 2026',
    author: 'Abdul Malik Lakho',
    readTime: '5 min read',
    category: 'AI',
    slug: 'integrating-claude-api',
    image: '/images/projects/selzara-dashboard.png',
    tags: ['AI', 'Claude API', 'Automation'],
    featured: false,
    views: 723,
    likes: 54
  },
  {
    title: 'Building a SaaS with Zero Ad Spend: The Selzara Story',
    description: 'How I built a 10-module AI SaaS platform and achieved 457 daily organic visitors with $0 paid advertising through SEO and community growth.',
    date: 'March 2026',
    author: 'Abdul Malik Lakho',
    readTime: '7 min read',
    category: 'SaaS',
    slug: 'selzara-story',
    image: '/images/projects/selzara-dashboard.png',
    tags: ['SaaS', 'Growth', 'AI'],
    featured: false,
    views: 634,
    likes: 42
  },
  {
    title: 'Military-Grade Security for Government Platforms',
    description: 'Implementing audit logging, encryption, and multi-role admin panels for national-scale government systems.',
    date: 'February 2026',
    author: 'Abdul Malik Lakho',
    readTime: '6 min read',
    category: 'Security',
    slug: 'military-grade-security',
    image: '/images/projects/maoni-dashboard.png',
    tags: ['Security', 'Government', 'Encryption'],
    featured: false,
    views: 512,
    likes: 38
  },
  {
    title: 'Web Scraping at Scale: Cloudflare and CAPTCHA Bypass',
    description: 'Building production scrapers that handle anti-bot measures and extract real-time data at scale for multiple industries.',
    date: 'January 2026',
    author: 'Abdul Malik Lakho',
    readTime: '5 min read',
    category: 'Scraping',
    slug: 'web-scraping-at-scale',
    image: '/images/projects/justfly-search.png',
    tags: ['Scraping', 'Automation', 'Data'],
    featured: false,
    views: 445,
    likes: 31
  }
]

const categories = ['All', 'Case Study', 'Engineering', 'AI', 'SaaS', 'Security', 'Scraping']

export default function BlogPage() {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [showFeatured, setShowFeatured] = useState(true)

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase()) ||
                          post.description.toLowerCase().includes(search.toLowerCase()) ||
                          post.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory
    const matchesFeatured = showFeatured ? true : !post.featured
    return matchesSearch && matchesCategory && matchesFeatured
  })

  const featuredPosts = posts.filter(post => post.featured)

  return (
    <main className="min-h-screen bg-black">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#00f0ff]/5 via-transparent to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#7b2ffc] opacity-[0.02] rounded-full blur-3xl animate-pulse" />
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00f0ff]/20 bg-[#00f0ff]/5 text-[#00f0ff] text-sm mb-6">
            <BookOpen size={14} />
            Engineering Blog
          </div>
          <h1 className="text-4xl md:text-6xl font-bold">
            <span className="gradient-text">Engineering</span> Insights
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mt-4">
            Lessons learned from building production systems for governments and enterprises
          </p>
        </div>
      </section>

      {/* Featured Post (if any) */}
      {featuredPosts.length > 0 && (
        <section className="px-4 max-w-7xl mx-auto pb-12">
          <div className="glass p-6 md:p-8 rounded-3xl border border-[#00f0ff]/10 bg-gradient-to-r from-[#00f0ff]/5 to-[#7b2ffc]/5">
            <div className="flex items-center gap-2 text-[#00f0ff] text-sm font-medium mb-3">
              <Sparkles size={14} />
              Featured Article
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-3 text-sm text-gray-400 mb-3">
                  <span className="px-3 py-1 rounded-full bg-[#00f0ff]/10 text-[#00f0ff] text-xs">
                    {featuredPosts[0].category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {featuredPosts[0].date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {featuredPosts[0].readTime}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white hover:text-[#00f0ff] transition">
                  <Link href={`/blog/${featuredPosts[0].slug}`}>
                    {featuredPosts[0].title}
                  </Link>
                </h2>
                <p className="text-gray-400 mt-3">{featuredPosts[0].description}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {featuredPosts[0].tags.map((tag, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-full bg-white/5 text-gray-400 text-xs border border-white/5">
                      #{tag}
                    </span>
                  ))}
                </div>
                <Link 
                  href={`/blog/${featuredPosts[0].slug}`}
                  className="inline-flex items-center gap-2 mt-4 text-[#00f0ff] hover:gap-3 transition"
                >
                  Read Article <ArrowRight size={16} />
                </Link>
              </div>
              <div className="relative h-48 md:h-64 rounded-2xl overflow-hidden">
                <img 
                  src={featuredPosts[0].image} 
                  alt={featuredPosts[0].title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Search & Filter */}
      <section className="px-4 max-w-7xl mx-auto pb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-[#00f0ff] focus:outline-none transition"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-[#00f0ff] to-[#7b2ffc] text-white'
                    : 'bg-white/5 text-gray-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="px-4 max-w-7xl mx-auto pb-20">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-400 text-lg">No articles found matching your search</p>
            <button 
              onClick={() => { setSearch(''); setSelectedCategory('All') }}
              className="mt-4 text-[#00f0ff] hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, i) => (
              <Link
                key={i}
                href={`/blog/${post.slug}`}
                className="group bg-white/5 rounded-2xl overflow-hidden border border-white/5 hover:border-[#00f0ff]/30 hover:bg-white/10 transition-all hover:scale-[1.02]"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-0.5 rounded bg-[#00f0ff]/20 text-[#00f0ff] text-xs">
                      {post.category}
                    </span>
                  </div>
                  {post.featured && (
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-400 text-xs flex items-center gap-1">
                        <Sparkles size={10} />
                        Featured
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#00f0ff] transition line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 text-sm mt-2 line-clamp-2">
                    {post.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {post.tags.slice(0, 2).map((tag, j) => (
                      <span key={j} className="px-2 py-0.5 rounded bg-white/5 text-gray-500 text-xs border border-white/5">
                        #{tag}
                      </span>
                    ))}
                    {post.tags.length > 2 && (
                      <span className="px-2 py-0.5 rounded bg-white/5 text-gray-500 text-xs">
                        +{post.tags.length - 2}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Eye size={12} />
                        {post.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart size={12} />
                        {post.likes}
                      </span>
                    </div>
                    <span className="text-[#00f0ff] text-sm flex items-center gap-1 group-hover:gap-2 transition">
                      Read <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  )
}