'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import { 
  Mail, Phone, MapPin, Send, CheckCircle, 
  Clock, Users, Globe, MessageSquare,
  ArrowRight, Sparkles, Shield, Award,
  Calendar, User, FileText, Briefcase,
  Linkedin, Github, Twitter, Youtube,
  Loader2, AlertCircle
} from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Simulate sending
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    if (Math.random() > 0.1) {
      setSubmitted(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setSubmitted(false), 5000)
    } else {
      setError('Something went wrong. Please try again.')
    }
    setLoading(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const quickContact = [
    { icon: <Mail size={18} />, label: 'Email', value: 'lakho0543@gmail.com', href: 'mailto:lakho0543@gmail.com', color: '#00f0ff' },
    { icon: <Phone size={18} />, label: 'Phone', value: '+92 328 672 5204', href: 'tel:+923286725204', color: '#7b2ffc' },
    { icon: <MapPin size={18} />, label: 'Location', value: 'Sukkur, Pakistan', href: '#', color: '#ff6b35' },
    { icon: <Clock size={18} />, label: 'Response Time', value: 'Within 24 hours', href: '#', color: '#00f0ff' },
  ]

  const availability = [
    { label: 'Full-time', icon: <Briefcase size={14} />, color: '#00f0ff' },
    { label: 'Contract', icon: <FileText size={14} />, color: '#7b2ffc' },
    { label: 'Remote', icon: <Globe size={14} />, color: '#ff6b35' },
    { label: 'On-site', icon: <MapPin size={14} />, color: '#00f0ff' },
  ]

  const subjects = [
    'Project Inquiry',
    'Job Opportunity',
    'Partnership',
    'Consulting',
    'Speaking Engagement',
    'Other'
  ]

  return (
    <main className="min-h-screen bg-black">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#00f0ff]/5 via-transparent to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#7b2ffc] opacity-[0.02] rounded-full  " />
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00f0ff]/20 bg-[#00f0ff]/5 text-[#00f0ff] text-sm mb-4">
            <MessageSquare size={14} />
            Let's Connect
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">
            <span className="gradient-text">Contact</span> Me
          </h1>
          <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
            Have a project in mind? Let's talk about how I can help bring your vision to life.
          </p>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="px-4 max-w-7xl mx-auto pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: '24h', label: 'Response Time', icon: <Clock size={18} />, color: '#00f0ff' },
            { value: '18+', label: 'Projects Delivered', icon: <Award size={18} />, color: '#7b2ffc' },
            { value: '5', label: 'Countries', icon: <Globe size={18} />, color: '#ff6b35' },
            { value: '100%', label: 'Satisfaction', icon: <Shield size={18} />, color: '#00f0ff' },
          ].map((stat, i) => (
            <div key={i} className="glass p-4 rounded-2xl text-center border border-white/5">
              <div className="flex justify-center mb-1" style={{ color: stat.color }}>
                {stat.icon}
              </div>
              <div className="text-2xl font-bold" style={{ color: stat.color }}>
                {stat.value}
              </div>
              <p className="text-gray-400 text-xs">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="px-4 max-w-6xl mx-auto pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left - Contact Info */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">
              Get in <span className="gradient-text">Touch</span>
            </h2>
            <p className="text-gray-400 text-sm">
              I'm always open to new opportunities, collaborations, and interesting projects. 
              Reach out and let's build something amazing together.
            </p>

            {/* Quick Contact */}
            <div className="space-y-3">
              {quickContact.map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-[#00f0ff]/20 hover:bg-white/10 transition group"
                >
                  <div 
                    className="p-2 rounded-xl flex-shrink-0 transition group-hover:scale-110"
                    style={{ background: `${item.color}15` }}
                  >
                    <span style={{ color: item.color }}>{item.icon}</span>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs">{item.label}</p>
                    <p className="text-white font-medium text-sm">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Availability */}
            <div className="glass p-4 rounded-2xl border border-white/5">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
                Available For
              </h3>
              <div className="flex flex-wrap gap-2">
                {availability.map((item, i) => (
                  <span 
                    key={i}
                    className="px-3 py-1.5 rounded-xl text-sm font-medium flex items-center gap-1.5"
                    style={{ background: `${item.color}15`, color: item.color }}
                  >
                    {item.icon}
                    {item.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="glass p-4 rounded-2xl border border-white/5">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
                Connect Online
              </h3>
              <div className="flex gap-3">
                <a
                  href="https://github.com/lakho0543-spec"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-white/5 border border-white/5 hover:border-[#00f0ff]/30 hover:bg-white/10 transition text-gray-400 hover:text-white"
                >
                  <Github size={20} />
                </a>
                <a
                  href="https://linkedin.com/in/abdul-malik-lakho-19103b292"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-white/5 border border-white/5 hover:border-[#00f0ff]/30 hover:bg-white/10 transition text-gray-400 hover:text-white"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="https://x.com/LakhoMalik58424"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-white/5 border border-white/5 hover:border-[#00f0ff]/30 hover:bg-white/10 transition text-gray-400 hover:text-white"
                >
                  <Twitter size={20} />
                </a>
              </div>
            </div>

            {/* Trust Badge */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-[#00f0ff]/5 border border-[#00f0ff]/10">
              <Shield size={20} className="text-[#00f0ff]" />
              <p className="text-gray-400 text-xs">
                Your information is secure and will never be shared with third parties.
              </p>
            </div>
          </div>

          {/* Right - Form */}
          <div className="glass p-6 md:p-8 rounded-3xl border border-white/5">
            <h2 className="text-2xl font-bold text-white mb-6">
              Send a <span className="gradient-text">Message</span>
            </h2>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-2">
                <AlertCircle size={18} className="text-red-400" />
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-gray-300 text-sm font-medium block mb-2">
                  Your Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  className="w-full px-4 py-3 bg-white/5 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-[#00f0ff] focus:outline-none transition"
                />
              </div>

              <div>
                <label className="text-gray-300 text-sm font-medium block mb-2">
                  Email Address <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 bg-white/5 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-[#00f0ff] focus:outline-none transition"
                />
              </div>

              <div>
                <label className="text-gray-300 text-sm font-medium block mb-2">
                  Subject <span className="text-red-400">*</span>
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-gray-700 rounded-xl text-white focus:border-[#00f0ff] focus:outline-none transition"
                >
                  <option value="">Select a subject...</option>
                  {subjects.map((subj) => (
                    <option key={subj} value={subj}>{subj}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-gray-300 text-sm font-medium block mb-2">
                  Message <span className="text-red-400">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tell me about your project..."
                  className="w-full px-4 py-3 bg-white/5 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-[#00f0ff] focus:outline-none transition resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-8 py-4 rounded-xl bg-gradient-to-r from-[#00f0ff] to-[#7b2ffc] text-white font-semibold hover:shadow-lg hover:shadow-[#00f0ff]/25 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Sending...
                  </>
                ) : submitted ? (
                  <>
                    <CheckCircle size={18} />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </button>

              {submitted && !loading && (
                <p className="text-[#00f0ff] text-center text-sm animate-fadeIn">
                  ✓ Message sent! I'll respond within 24 hours.
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}