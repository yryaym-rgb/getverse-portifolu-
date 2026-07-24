import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk, IBM_Plex_Sans } from 'next/font/google'
import JsonLd from './components/JsonLd'
import { LocaleProvider } from './components/LocaleProvider'
import PremiumProviders from './components/Premium/Providers'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
  weight: ['400', '500', '600', '700'],
})

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-ibm-plex',
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://getverse.dev'),

  title: {
    default: 'Abdul Malik Lakho | Full Stack AI Developer',
    template: '%s | Abdul Malik Lakho',
  },

  description:
    'Building AI systems, government platforms & enterprise software used across multiple countries. 18+ production systems, 5+ countries, trusted by DRC Presidential Office.',

  keywords: [
    'AI Developer',
    'Full Stack Developer',
    'Government Systems',
    'DRC Presidential Platform',
    'AI Engineering',
    'SaaS Development',
    'React Developer',
    'FastAPI',
    'Python',
    'Next.js',
    'Machine Learning',
    'Web Development',
    'Government Technology',
  ],

  authors: [{ name: 'Abdul Malik Lakho', url: 'https://getverse.dev' }],
  creator: 'Abdul Malik Lakho',
  publisher: 'Abdul Malik Lakho',

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://getverse.dev',
    siteName: 'Abdul Malik Lakho | AI Engineering Command Center',
    title: 'Abdul Malik Lakho | Full Stack AI Developer',
    description:
      'Building AI systems, government platforms & enterprise software used across multiple countries.',
    images: [
      {
        url: '/images/social/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Abdul Malik Lakho - Full Stack AI Developer',
        type: 'image/png',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Abdul Malik Lakho | Full Stack AI Developer',
    description:
      'Building AI systems, government platforms & enterprise software used across multiple countries.',
    images: ['/images/social/og-image.png'],
    creator: '@LakhoMalik58424',
    site: '@LakhoMalik58424',
  },

  alternates: {
    canonical: 'https://getverse.dev',
    languages: { 'en-US': 'https://getverse.dev' },
  },

  category: 'technology',
  applicationName: 'AI Engineering Command Center',

  formatDetection: {
    email: true,
    address: false,
    telephone: true,
  },

  appleWebApp: {
    capable: true,
    title: 'Abdul Malik Lakho',
    statusBarStyle: 'black-translucent',
  },

  icons: {
    icon: [
      { url: '/images/logo/favicon.ico' },
      { url: '/images/logo/logo-icon.svg', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/images/logo/apple-touch-icon.png' }],
    shortcut: ['/images/logo/favicon.ico'],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0a0a0f' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0f' },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${ibmPlexSans.variable}`}>
      <head>
        <link rel="preload" href="/images/hero/profile.jpg" as="image" type="image/jpeg" />
        <link rel="preload" href="/images/logo/logo.png" as="image" type="image/png" />
        <JsonLd />
      </head>
      <body className="bg-black text-white antialiased font-sans">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-[#00f0ff] focus:text-black focus:font-semibold"
        >
          Skip to main content
        </a>
        <LocaleProvider>
          <PremiumProviders>
            {children}
          </PremiumProviders>
        </LocaleProvider>
      </body>
    </html>
  )
}
