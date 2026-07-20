// Central source of truth for site-wide copy and structured data.
// Bilingual (es/en) is a phase-2 follow-up: swap this object by locale.
// Source: fabrizio-career/cv-redone-es.md + case-studies/

interface NavItem {
  label: string
  to: string
}

interface Metric {
  value: string
  label: string
}

interface SkillGroup {
  group: string
  items: string[]
}

export const useSite = () => {
  const site = {
    name: 'Fabrizio Álvarez',
    fullName: 'Fabrizio Nicolás Álvarez',
    role: 'Backend Software Engineer · Product Engineer',
    location: 'Buenos Aires, Argentina',
    email: 'fabrizioalvrz@gmail.com',
    phone: '+54 3487 632294',
    github: 'https://github.com/Fabrizio-Alvarez',
    linkedin: 'https://www.linkedin.com/in/fabrizio-alvarez',
    availableFor: 'Open to remote roles — backend, platform, product engineering.',
  }

  const nav: NavItem[] = [
    { label: 'Work', to: '/projects' },
    { label: 'Case studies', to: '/case-studies' },
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
  ]

  const hero = {
    eyebrow: 'Backend Software Engineer · Product Engineer',
    headline: 'I build and scale PHP backends that stay fast under real load.',
    sub: "5 years engineering a multi-country healthcare SaaS (EMR) handling 30,000 appointments/day — performance optimization, payments, integrations, and testing strategy.",
  }

  const metrics: Metric[] = [
    { value: '5 yrs', label: 'building & scaling a PHP SaaS' },
    { value: '30k', label: 'daily appointments served' },
    { value: '5', label: 'countries in production' },
    { value: '30s → 2s', label: 'critical query optimization' },
  ]

  const skills: SkillGroup[] = [
    { group: 'Languages & databases', items: ['PHP (7, 8.3)', 'MySQL', 'TypeScript', 'Node.js'] },
    { group: 'Architecture', items: ['Domain-Driven Design', 'SOLID', 'PSR standards', 'REST API design'] },
    { group: 'Testing & CI/CD', items: ['Pest', 'PHPUnit', 'Playwright (E2E)', 'GitHub Actions', 'Sentry'] },
    { group: 'Performance', items: ['N+1 elimination', 'Composite indexes', 'Query refactoring', 'Profiling (AWS Aurora)'] },
    { group: 'Integrations', items: ['Payments (MercadoPago)', 'Electronic invoicing', 'RIS / LIS', 'Third-party APIs'] },
    { group: 'Other', items: ['Laravel', 'CodeIgniter', 'Docker', 'AWS (basic)'] },
  ]

  const channels = [
    { label: 'Email', value: site.email, href: `mailto:${site.email}` },
    { label: 'GitHub', value: '@Fabrizio-Alvarez', href: site.github },
    { label: 'LinkedIn', value: 'in/fabrizio-alvarez', href: site.linkedin },
    { label: 'Phone', value: site.phone, href: `tel:${site.phone.replace(/\s/g, '')}` },
    { label: 'Location', value: site.location, href: '' },
  ]

  return { site, nav, hero, metrics, skills, channels }
}
