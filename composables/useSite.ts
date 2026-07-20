// Central source of truth for site-wide copy and structured data.
// Bilingual (en default · es) via @nuxtjs/i18n. Strings live in i18n/locales/{en,es}.json;
// this composable re-exposes them reactively alongside non-translatable data
// (contact info, technical skill items, channel hrefs).
// Source: fabrizio-career/cv-fabrizio-es.md + case-studies/

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

interface Channel {
  label: string
  value: string
  href: string
}

// Static (non-translatable) data — names, contacts, technical skill items.
const fullName = 'Fabrizio Nicolás Álvarez'
const name = 'Fabrizio Álvarez'
const email = 'fabrizioalvrz@gmail.com'
const phone = '+54 3487 632294'
const phoneHref = 'tel:+543487632294'
const githubUrl = 'https://github.com/Fabrizio-Alvarez'
const linkedinUrl = 'https://www.linkedin.com/in/fabrizio-alvarez'
const location = 'Buenos Aires, Argentina'

// Skill items are technical terms — same across locales.
const skillItems: Record<string, string[]> = {
  languages: ['PHP (7, 8.3)', 'MySQL', 'TypeScript', 'Node.js'],
  architecture: ['Domain-Driven Design', 'SOLID', 'PSR standards', 'REST API design'],
  testing: ['Pest', 'PHPUnit', 'Playwright (E2E)', 'GitHub Actions', 'Sentry'],
  performance: ['N+1 elimination', 'Composite indexes', 'Query refactoring', 'Profiling (AWS Aurora)'],
  integrations: ['Payments (MercadoPago)', 'Electronic invoicing', 'RIS / LIS', 'Third-party APIs'],
  other: ['Laravel', 'CodeIgniter', 'Docker', 'AWS (basic)'],
}

const channelData = [
  { key: 'email', value: email, href: `mailto:${email}` },
  { key: 'github', value: '@Fabrizio-Alvarez', href: githubUrl },
  { key: 'linkedin', value: 'in/fabrizio-alvarez', href: linkedinUrl },
  { key: 'phone', value: phone, href: phoneHref },
  { key: 'location', value: location, href: '' },
]

export const useSite = () => {
  const { t, tm } = useI18n()

  const site = computed(() => ({
    name,
    fullName,
    email,
    phone,
    github: githubUrl,
    linkedin: linkedinUrl,
    location,
    role: t('site.role'),
    availableFor: t('site.availableFor'),
  }))

  const nav = computed<NavItem[]>(() => [
    { label: t('nav.work'), to: '/projects' },
    { label: t('nav.caseStudies'), to: '/case-studies' },
    { label: t('nav.about'), to: '/about' },
    { label: t('nav.contact'), to: '/contact' },
  ])

  const hero = computed(() => ({
    eyebrow: t('hero.eyebrow'),
    headline: t('hero.headline'),
    sub: t('hero.sub'),
  }))

  const metrics = computed<Metric[]>(() => [
    tm('metrics.experience') as Metric,
    tm('metrics.throughput') as Metric,
    tm('metrics.countries') as Metric,
    tm('metrics.perf') as Metric,
  ])

  const skills = computed<SkillGroup[]>(() =>
    Object.entries(skillItems).map(([key, items]) => ({
      group: t(`skillGroups.${key}`),
      items,
    })),
  )

  const channels = computed<Channel[]>(() =>
    channelData.map((c) => ({
      label: t(`channels.${c.key}`),
      value: c.value,
      href: c.href,
    })),
  )

  return { site, nav, hero, metrics, skills, channels }
}
