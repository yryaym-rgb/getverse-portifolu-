import { resumeData } from '../lib/resumeData'

export default function JsonLd() {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: resumeData.name,
    jobTitle: resumeData.title,
    url: resumeData.website,
    email: resumeData.email,
    telephone: resumeData.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Sukkur',
      addressCountry: 'PK',
    },
    sameAs: [resumeData.github, resumeData.linkedin],
    knowsAbout: [
      'Artificial Intelligence',
      'Full Stack Development',
      'Government Technology',
      'System Architecture',
      'React',
      'Next.js',
      'Python',
      'FastAPI',
    ],
    description: resumeData.summary,
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Abdul Malik Lakho — AI Engineering Command Center',
    url: 'https://getverse.dev',
    description: resumeData.summary,
    author: { '@type': 'Person', name: resumeData.name },
  }

  const professionalServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Abdul Malik Lakho — Full Stack AI Development',
    url: 'https://getverse.dev',
    description: 'Mission-critical AI systems for governments and enterprises.',
    areaServed: ['PK', 'CD', 'NG', 'US', 'GB'],
    serviceType: [
      'AI Development',
      'Government Systems',
      'SaaS Development',
      'Full Stack Engineering',
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
      />
    </>
  )
}
