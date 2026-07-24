'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Github, GitCommit, FolderGit2, Layers } from 'lucide-react'
import { githubStats } from '@/app/lib/portfolioData'

export default function GitHubIntelligence() {
  const contributionWeeks = 52
  const contributions = Array.from({ length: contributionWeeks * 7 }, () =>
    Math.random() > 0.35 ? Math.floor(Math.random() * 4) + 1 : 0
  )

  return (
    <section id="github" className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-gray-400 text-sm font-medium tracking-widest uppercase">Open Source</span>
          <h2 className="text-4xl md:text-5xl font-bold font-display mt-2">
            GitHub <span className="gradient-text">Intelligence</span>
          </h2>
        </div>

        <div className="glass rounded-3xl border border-white/5 p-8">
          <div className="grid grid-cols-3 gap-6 mb-8">
            {[
              { label: 'Commits', value: githubStats.commits, icon: <GitCommit size={20} /> },
              { label: 'Repositories', value: githubStats.repositories, icon: <FolderGit2 size={20} /> },
              { label: 'Technologies', value: githubStats.technologies, icon: <Layers size={20} /> },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-[#00f0ff] flex justify-center mb-2">{stat.icon}</div>
                <div className="text-2xl md:text-3xl font-bold font-display text-white">{stat.value}</div>
                <div className="text-gray-500 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="mb-6">
            <div className="text-sm text-gray-500 mb-3">Contribution Graph</div>
            <div className="flex flex-wrap gap-[3px] justify-center">
              {contributions.map((level, i) => (
                <div
                  key={i}
                  className="w-[10px] h-[10px] rounded-sm"
                  style={{
                    backgroundColor: level === 0 ? 'rgba(255,255,255,0.05)' :
                      level === 1 ? 'rgba(0,240,255,0.2)' :
                      level === 2 ? 'rgba(0,240,255,0.4)' :
                      level === 3 ? 'rgba(0,240,255,0.6)' : 'rgba(0,240,255,0.9)',
                  }}
                />
              ))}
            </div>
          </div>

          <div className="mb-6">
            <div className="text-sm text-gray-500 mb-3">Top Languages</div>
            <div className="space-y-2">
              {githubStats.topLanguages.map((lang) => (
                <div key={lang.name} className="flex items-center gap-3">
                  <span className="text-sm text-gray-400 w-24">{lang.name}</span>
                  <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${lang.percent}%`, backgroundColor: lang.color }} />
                  </div>
                  <span className="text-xs text-gray-500 w-10">{lang.percent}%</span>
                </div>
              ))}
            </div>
          </div>

          <Link
            href={`https://github.com/${githubStats.username}`}
            target="_blank"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#00f0ff]/30 transition text-sm"
          >
            <Github size={18} />
            View on GitHub
          </Link>
        </div>
      </div>
    </section>
  )
}
