'use client'

import { useState, useEffect } from 'react'
import { Users, Eye, Activity } from 'lucide-react'

export default function VisitorCounter() {
  const [visitors, setVisitors] = useState<number>(0)
  const [pageViews, setPageViews] = useState<number>(0)
  const [isLive, setIsLive] = useState<boolean>(true)

  useEffect(() => {
    const baseVisitors = 47
    const baseViews = 1234
    
    setVisitors(baseVisitors + Math.floor(Math.random() * 20))
    setPageViews(baseViews + Math.floor(Math.random() * 50))

    const interval = setInterval(() => {
      setVisitors(prev => {
        const change = Math.floor(Math.random() * 6) - 2
        return Math.max(10, prev + change)
      })
      setPageViews(prev => prev + Math.floor(Math.random() * 5))
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center gap-4 text-sm">
      <div className="flex items-center gap-1.5">
        <div className="relative">
          <Users size={14} className="text-[#00f0ff]" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
        </div>
        <span className="text-gray-400">Live:</span>
        <span className="text-white font-medium">{visitors}</span>
      </div>
      <span className="text-gray-600">|</span>
      <div className="flex items-center gap-1.5">
        <Eye size={14} className="text-[#7b2ffc]" />
        <span className="text-gray-400">Views:</span>
        <span className="text-white font-medium">{pageViews.toLocaleString()}</span>
      </div>
      <span className="text-gray-600">|</span>
      <div className="flex items-center gap-1.5">
        <Activity size={14} className={isLive ? 'text-emerald-400' : 'text-gray-500'} />
        <span className={isLive ? 'text-emerald-400' : 'text-gray-500'}>
          {isLive ? 'Live' : 'Offline'}
        </span>
      </div>
    </div>
  )
}
