'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Clock } from 'lucide-react'
import { blogPosts } from '@/app/lib/portfolioData'

export default function BlogPreview() {
  return (
    <section id="blog" className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-[#00f0ff] text-sm font-medium tracking-widest uppercase">Technical Blog</span>
            <h2 className="text-4xl md:text-5xl font-bold font-display mt-2">
              Engineering <span className="gradient-text">Insights</span>
            </h2>
          </div>
          <Link href="/blog" className="hidden md:flex items-center gap-2 text-sm text-gray-400 hover:text-white transition">
            View All <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.slice(0, 6).map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link href={`/blog/${post.slug}`} className="block glass-card p-6 rounded-2xl border border-white/5 h-full hover:border-[#00f0ff]/20 transition group">
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                  <Clock size={12} />
                  {post.readTime}
                  <span>·</span>
                  {new Date(post.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </div>
                <h3 className="text-lg font-semibold text-white group-hover:text-[#00f0ff] transition">{post.title}</h3>
                <p className="text-gray-400 text-sm mt-2 line-clamp-2">{post.excerpt}</p>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8 md:hidden">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-[#00f0ff]">
            View All Articles <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}
