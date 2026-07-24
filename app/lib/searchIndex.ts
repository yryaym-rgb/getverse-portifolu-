/**
 * Search index for command palette — projects, pages, skills.
 */

import { getAllProjects } from './projectsData'

export interface SearchItem {
  id: string
  label: string
  description?: string
  href: string
  category: 'page' | 'project' | 'case-study' | 'skill' | 'action'
  keywords?: string[]
}

const pages: SearchItem[] = [
  { id: 'home', label: 'Home', href: '/', category: 'page', keywords: ['start', 'command center'] },
  { id: 'projects', label: 'Projects', description: '18+ production platforms', href: '/projects', category: 'page' },
  { id: 'case-studies', label: 'Case Studies', description: 'Deep dives on MAONI, ARPTC, Selzara', href: '/case-studies', category: 'page' },
  { id: 'about', label: 'About', href: '/about', category: 'page' },
  { id: 'contact', label: 'Contact / Hire Me', href: '/contact', category: 'action', keywords: ['hire', 'email', 'work'] },
  { id: 'resume', label: 'Download Resume', href: '/resume', category: 'action', keywords: ['cv', 'pdf', 'download'] },
  { id: 'digital-twin', label: 'Digital Twin', description: 'Ask about my engineering philosophy', href: '/digital-twin', category: 'page', keywords: ['ai', 'chat'] },
  { id: 'playground', label: 'Code Playground', description: 'Live Sandpack editor', href: '/playground', category: 'page', keywords: ['code', 'sandpack', 'editor'] },
  { id: 'command-center', label: '3D Command Center', description: 'Interactive Three.js experience', href: '/command-center', category: 'page', keywords: ['3d', 'threejs', 'interactive'] },
  { id: 'whiteboard', label: 'System Design Whiteboard', description: 'Interactive architecture tool', href: '/whiteboard', category: 'page', keywords: ['whiteboard', 'reactflow', 'design'] },
  { id: 'analytics', label: 'Analytics Dashboard', description: 'Portfolio traffic insights', href: '/analytics', category: 'page', keywords: ['analytics', 'traffic', 'metrics'] },
  { id: 'engineering', label: 'Engineering Hub', href: '/engineering', category: 'page' },
  { id: 'blog', label: 'Blog', href: '/blog', category: 'page' },
  { id: 'maoni-case', label: 'MAONI Case Study', href: '/case-studies/maoni', category: 'case-study', keywords: ['government', 'drc', 'presidential'] },
  { id: 'arptc-case', label: 'ARPTC Case Study', href: '/case-studies/arptc', category: 'case-study', keywords: ['tower', 'telecom', 'map'] },
  { id: 'selzara-case', label: 'Selzara Case Study', href: '/case-studies/selzara', category: 'case-study', keywords: ['saas', 'amazon'] },
]

const skills: SearchItem[] = [
  'React', 'Next.js', 'TypeScript', 'Python', 'FastAPI', 'PostgreSQL',
  'Claude AI', 'Docker', 'AWS', 'Supabase', 'Node.js',
].map((skill) => ({
  id: `skill-${skill.toLowerCase()}`,
  label: skill,
  description: 'View projects using this technology',
  href: `/projects?search=${encodeURIComponent(skill)}`,
  category: 'skill' as const,
  keywords: [skill.toLowerCase()],
}))

export function getSearchIndex(): SearchItem[] {
  const projects: SearchItem[] = getAllProjects().map((p) => ({
    id: `project-${p.slug}`,
    label: p.title,
    description: p.subtitle,
    href: `/projects/${p.slug}`,
    category: 'project' as const,
    keywords: [...p.tech, p.category].map((t) => t.toLowerCase()),
  }))

  return [...pages, ...projects, ...skills]
}

export function searchItems(query: string): SearchItem[] {
  const q = query.trim().toLowerCase()
  if (!q) return getSearchIndex()

  return getSearchIndex().filter((item) => {
    const haystack = [item.label, item.description, ...(item.keywords || [])]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()
    return haystack.includes(q) || item.label.toLowerCase().includes(q)
  })
}
