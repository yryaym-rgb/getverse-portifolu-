'use client'

import { useEffect, useState } from 'react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import { BarChart3, Users, Eye, Globe, Monitor, Smartphone } from 'lucide-react'

interface AnalyticsData {
  pageViews: number
  uniqueVisitors: number
  topPages: { path: string; views: number }[]
  referrers: { source: string; count: number }[]
  devices: { type: string; percentage: number }[]
  period: string
  source: 'vercel' | 'estimated'
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/analytics')
      .then((r) => r.json())
      .then(setData)
      .finally(() => setLoading(false))
  }, [])

  return (
    <main className="min-h-screen bg-black">
      <Navigation />

      <section className="pt-32 pb-8 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00f0ff]/20 bg-[#00f0ff]/5 text-[#00f0ff] text-sm mb-4">
            <BarChart3 size={14} />
            Portfolio Analytics
          </div>
          <h1 className="text-4xl font-bold">Real Analytics Dashboard</h1>
          <p className="text-gray-400 mt-2">
            {data?.source === 'vercel' ? 'Live data from Vercel Analytics' : 'Portfolio traffic overview (configure VERCEL_API_KEY for live data)'}
          </p>
        </div>
      </section>

      <section className="px-4 max-w-5xl mx-auto pb-20">
        {loading ? (
          <div className="text-center text-gray-400 py-20">Loading analytics...</div>
        ) : data ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="glass p-5 rounded-2xl border border-white/5 text-center">
                <Eye size={20} className="mx-auto mb-2 text-[#00f0ff]" />
                <div className="text-3xl font-bold text-[#00f0ff]">{data.pageViews.toLocaleString()}</div>
                <p className="text-gray-400 text-xs mt-1">Page Views ({data.period})</p>
              </div>
              <div className="glass p-5 rounded-2xl border border-white/5 text-center">
                <Users size={20} className="mx-auto mb-2 text-[#7b2ffc]" />
                <div className="text-3xl font-bold text-[#7b2ffc]">{data.uniqueVisitors.toLocaleString()}</div>
                <p className="text-gray-400 text-xs mt-1">Unique Visitors</p>
              </div>
              <div className="glass p-5 rounded-2xl border border-white/5 text-center">
                <Globe size={20} className="mx-auto mb-2 text-[#ff6b35]" />
                <div className="text-3xl font-bold text-[#ff6b35]">{data.topPages.length}</div>
                <p className="text-gray-400 text-xs mt-1">Tracked Pages</p>
              </div>
              <div className="glass p-5 rounded-2xl border border-white/5 text-center">
                <BarChart3 size={20} className="mx-auto mb-2 text-emerald-400" />
                <div className="text-3xl font-bold text-emerald-400">
                  {data.source === 'vercel' ? 'Live' : 'Demo'}
                </div>
                <p className="text-gray-400 text-xs mt-1">Data Source</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass p-6 rounded-2xl border border-white/5">
                <h3 className="text-sm font-bold text-[#00f0ff] uppercase tracking-wider mb-4">Top Pages</h3>
                <div className="space-y-3">
                  {data.topPages.map((page) => (
                    <div key={page.path} className="flex items-center justify-between">
                      <span className="text-gray-300 text-sm font-mono">{page.path}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-white/5 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#00f0ff] rounded-full"
                            style={{ width: `${(page.views / data.topPages[0].views) * 100}%` }}
                          />
                        </div>
                        <span className="text-gray-400 text-xs w-10 text-right">{page.views}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass p-6 rounded-2xl border border-white/5">
                <h3 className="text-sm font-bold text-[#7b2ffc] uppercase tracking-wider mb-4">Referrers</h3>
                <div className="space-y-3">
                  {data.referrers.map((ref) => (
                    <div key={ref.source} className="flex items-center justify-between">
                      <span className="text-gray-300 text-sm">{ref.source}</span>
                      <span className="text-[#7b2ffc] text-sm font-medium">{ref.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass p-6 rounded-2xl border border-white/5 md:col-span-2">
                <h3 className="text-sm font-bold text-[#ff6b35] uppercase tracking-wider mb-4">Devices</h3>
                <div className="grid grid-cols-3 gap-4">
                  {data.devices.map((d) => (
                    <div key={d.type} className="text-center p-4 rounded-xl bg-white/5">
                      {d.type === 'Desktop' ? <Monitor size={24} className="mx-auto mb-2 text-[#00f0ff]" /> :
                       d.type === 'Mobile' ? <Smartphone size={24} className="mx-auto mb-2 text-[#7b2ffc]" /> :
                       <Globe size={24} className="mx-auto mb-2 text-[#ff6b35]" />}
                      <div className="text-2xl font-bold text-white">{d.percentage}%</div>
                      <p className="text-gray-400 text-xs">{d.type}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : null}
      </section>

      <Footer />
    </main>
  )
}
