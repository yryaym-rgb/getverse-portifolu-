'use client'

import { useState, useEffect } from 'react'
import { Save, Download, Share2, Trash2, FolderOpen } from 'lucide-react'

interface WorkspaceItem {
  id: string
  title: string
  content: string
  type: 'architecture' | 'database' | 'api' | 'proposal' | 'timeline'
  updatedAt: Date
}

export default function Workspace() {
  const [items, setItems] = useState<WorkspaceItem[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load from localStorage
    const saved = localStorage.getItem('workspace')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setItems(parsed.map((item: any) => ({
          ...item,
          updatedAt: new Date(item.updatedAt)
        })))
      } catch (e) {
        console.error('Failed to load workspace', e)
      }
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('workspace', JSON.stringify(items))
    }
  }, [items, isLoading])

  const saveItem = (item: WorkspaceItem) => {
    setItems(prev => {
      const existing = prev.findIndex(i => i.id === item.id)
      if (existing >= 0) {
        const updated = [...prev]
        updated[existing] = { ...item, updatedAt: new Date() }
        return updated
      }
      return [...prev, { ...item, id: Date.now().toString(), updatedAt: new Date() }]
    })
  }

  const deleteItem = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id))
    if (selectedId === id) setSelectedId(null)
  }

  const exportWorkspace = () => {
    const data = JSON.stringify(items, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `workspace-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FolderOpen size={18} className="text-[#00f0ff]" />
          <h3 className="text-lg font-bold text-white">Workspace</h3>
          <span className="text-xs text-gray-500">{items.length} saved</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={exportWorkspace}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition text-gray-400 hover:text-white"
          >
            <Download size={16} />
          </button>
          <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition text-gray-400 hover:text-white">
            <Share2 size={16} />
          </button>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-8 text-gray-400 text-sm">
          <div className="text-4xl mb-3">📁</div>
          <p>No saved items yet</p>
          <p className="text-gray-500 text-xs mt-1">Generated blueprints will appear here</p>
        </div>
      ) : (
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {items.map(item => (
            <div
              key={item.id}
              className={`flex items-center justify-between p-3 rounded-xl border transition ${
                selectedId === item.id
                  ? 'border-[#00f0ff]/30 bg-[#00f0ff]/5'
                  : 'border-white/5 hover:border-white/10'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500">{item.type}</span>
                <span className="text-white text-sm font-medium">{item.title}</span>
                <span className="text-xs text-gray-500">
                  {new Date(item.updatedAt).toLocaleDateString()}
                </span>
              </div>
              <button
                onClick={() => deleteItem(item.id)}
                className="text-gray-400 hover:text-red-400 transition"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}