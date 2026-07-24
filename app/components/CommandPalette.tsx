'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Command } from 'cmdk'
import { searchItems, type SearchItem } from '../lib/searchIndex'
import { FileText, Folder, Globe, Zap, ArrowRight } from 'lucide-react'

interface CommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const categoryIcons: Record<SearchItem['category'], React.ReactNode> = {
  page: <Globe size={14} />,
  project: <Folder size={14} />,
  'case-study': <FileText size={14} />,
  skill: <Zap size={14} />,
  action: <ArrowRight size={14} />,
}

export default function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchItem[]>([])

  useEffect(() => {
    setResults(searchItems(query))
  }, [query])

  useEffect(() => {
    if (!open) setQuery('')
  }, [open])

  const navigate = useCallback(
    (href: string) => {
      onOpenChange(false)
      router.push(href)
    },
    [router, onOpenChange]
  )

  if (!open) return null

  const grouped = results.reduce<Record<string, SearchItem[]>>((acc, item) => {
    const key = item.category
    if (!acc[key]) acc[key] = []
    acc[key].push(item)
    return acc
  }, {})

  const categoryLabels: Record<string, string> = {
    action: 'Actions',
    'case-study': 'Case Studies',
    project: 'Projects',
    page: 'Pages',
    skill: 'Skills',
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] bg-black/80 backdrop-blur-sm"
      onClick={() => onOpenChange(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <Command
        className="w-full max-w-2xl glass rounded-2xl border border-white/10 overflow-hidden shadow-2xl animate-slideDown"
        onClick={(e) => e.stopPropagation()}
        shouldFilter={false}
      >
        <div className="flex items-center gap-3 px-4 border-b border-white/5">
          <Command.Input
            value={query}
            onValueChange={setQuery}
            placeholder="Search projects, case studies, skills…"
            className="w-full py-4 bg-transparent border-none outline-none text-white text-lg placeholder-gray-500"
            autoFocus
          />
          <kbd className="hidden sm:inline px-2 py-1 rounded bg-white/10 text-gray-400 text-xs">ESC</kbd>
        </div>

        <Command.List className="max-h-96 overflow-y-auto p-2 custom-scrollbar">
          <Command.Empty className="py-8 text-center text-gray-500 text-sm">
            No results for &ldquo;{query}&rdquo;
          </Command.Empty>

          {Object.entries(grouped).map(([category, items]) => (
            <Command.Group
              key={category}
              heading={categoryLabels[category] || category}
              className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:text-gray-500 [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider"
            >
              {items.map((item) => (
                <Command.Item
                  key={item.id}
                  value={item.id}
                  onSelect={() => navigate(item.href)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer text-gray-300 data-[selected=true]:bg-white/10 data-[selected=true]:text-white transition"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-gray-500 flex-shrink-0">
                      {categoryIcons[item.category]}
                    </span>
                    <div className="min-w-0">
                      <div className="font-medium truncate">{item.label}</div>
                      {item.description && (
                        <div className="text-xs text-gray-500 truncate">{item.description}</div>
                      )}
                    </div>
                  </div>
                  <ArrowRight size={14} className="text-gray-600 flex-shrink-0" />
                </Command.Item>
              ))}
            </Command.Group>
          ))}
        </Command.List>

        <div className="px-4 py-2 border-t border-white/5 text-xs text-gray-500 flex gap-4">
          <span><kbd className="px-1.5 py-0.5 rounded bg-white/10">↑↓</kbd> navigate</span>
          <span><kbd className="px-1.5 py-0.5 rounded bg-white/10">↵</kbd> open</span>
          <span><kbd className="px-1.5 py-0.5 rounded bg-white/10">esc</kbd> close</span>
        </div>
      </Command>
    </div>
  )
}
