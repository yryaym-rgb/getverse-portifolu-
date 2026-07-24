'use client'

import { useTranslation, type Locale } from './LocaleProvider'
import { Globe } from 'lucide-react'
import { useState } from 'react'

const locales: { code: Locale; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'ar', label: 'AR' },
  { code: 'ur', label: 'UR' },
]

export default function LanguageSwitcher() {
  const { locale, setLocale } = useTranslation()
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition text-sm"
        aria-label="Change language"
        aria-expanded={open}
      >
        <Globe size={16} />
        <span className="text-xs font-medium">{locale.toUpperCase()}</span>
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 glass rounded-xl border border-white/10 overflow-hidden z-50 min-w-[80px]">
          {locales.map((l) => (
            <button
              key={l.code}
              onClick={() => { setLocale(l.code); setOpen(false) }}
              className={`block w-full px-4 py-2 text-sm text-left hover:bg-white/5 transition ${
                locale === l.code ? 'text-[#00f0ff]' : 'text-gray-300'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
