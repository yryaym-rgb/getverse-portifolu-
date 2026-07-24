'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react'

export type Locale = 'en' | 'ar' | 'ur'

type Messages = Record<string, Record<string, string>>

interface LocaleContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
  dir: 'ltr' | 'rtl'
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: 'en',
  setLocale: () => {},
  t: (key) => key,
  dir: 'ltr',
})

const messageCache: Partial<Record<Locale, Messages>> = {}

async function loadMessages(locale: Locale): Promise<Messages> {
  if (messageCache[locale]) return messageCache[locale]!
  const data = await import(`../../messages/${locale}.json`)
  messageCache[locale] = data.default
  return data.default
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en')
  const [messages, setMessages] = useState<Messages>({})

  useEffect(() => {
    const saved = localStorage.getItem('locale') as Locale | null
    if (saved && ['en', 'ar', 'ur'].includes(saved)) {
      setLocaleState(saved)
    }
  }, [])

  useEffect(() => {
    loadMessages(locale).then(setMessages)
    document.documentElement.lang = locale
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr'
  }, [locale])

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l)
    localStorage.setItem('locale', l)
  }, [])

  const t = useCallback(
    (key: string) => {
      const [section, field] = key.split('.')
      return messages[section]?.[field] ?? key
    },
    [messages]
  )

  const dir = locale === 'ar' ? 'rtl' : 'ltr'

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t, dir }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useTranslation() {
  return useContext(LocaleContext)
}
