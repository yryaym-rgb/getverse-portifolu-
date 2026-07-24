'use client'

import { motion } from 'framer-motion'
import { Shield, CheckCircle, Lock, Database, Code, Zap, Settings, Key } from 'lucide-react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import { securityChecks } from '../lib/portfolioData'

const icons: Record<string, React.ReactNode> = {
  shield: <Shield size={24} />,
  database: <Database size={24} />,
  code: <Code size={24} />,
  zap: <Zap size={24} />,
  lock: <Lock size={24} />,
  settings: <Settings size={24} />,
  check: <CheckCircle size={24} />,
  key: <Key size={24} />,
}

export default function SecurityPage() {
  return (
    <main className="min-h-screen bg-black">
      <Navigation />

      <section className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-sm mb-6">
            <Shield size={14} />
            Enterprise Security
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-display">
            Security <span className="gradient-text">Posture</span>
          </h1>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Military-grade security practices from government platform development — verified, not just claimed.
          </p>
        </div>
      </section>

      <section className="pb-24 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
          {securityChecks.map((check, i) => (
            <motion.div
              key={check.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass-card p-6 rounded-2xl border border-white/5 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                {icons[check.icon]}
              </div>
              <div className="flex-1">
                <div className="font-semibold text-white">{check.name}</div>
                <div className="text-sm text-gray-500">{check.status}</div>
              </div>
              <CheckCircle size={20} className="text-emerald-400" />
            </motion.div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto mt-12 glass rounded-3xl border border-white/5 p-8">
          <h2 className="text-2xl font-bold font-display text-white mb-4">Government-Grade Practices</h2>
          <ul className="space-y-3 text-gray-300 text-sm">
            <li className="flex items-start gap-2"><CheckCircle size={16} className="text-[#00f0ff] mt-0.5 shrink-0" /> Row-Level Security (RLS) on all citizen data in MAONI</li>
            <li className="flex items-start gap-2"><CheckCircle size={16} className="text-[#00f0ff] mt-0.5 shrink-0" /> JWT authentication with role-based access control</li>
            <li className="flex items-start gap-2"><CheckCircle size={16} className="text-[#00f0ff] mt-0.5 shrink-0" /> Rate limiting on all public API endpoints</li>
            <li className="flex items-start gap-2"><CheckCircle size={16} className="text-[#00f0ff] mt-0.5 shrink-0" /> Full audit logging for government compliance</li>
            <li className="flex items-start gap-2"><CheckCircle size={16} className="text-[#00f0ff] mt-0.5 shrink-0" /> Cloudflare WAF and DDoS protection on production systems</li>
            <li className="flex items-start gap-2"><CheckCircle size={16} className="text-[#00f0ff] mt-0.5 shrink-0" /> Encryption at rest and in transit for sensitive data</li>
          </ul>
        </div>
      </section>

      <Footer />
    </main>
  )
}
