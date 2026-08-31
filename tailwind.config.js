import typography from '@tailwindcss/typography'

// "Technical Ink" — dark editorial design system generated via Stitch MCP
// (project fabrizio-portfolio, screen 'Fabrizio Álvarez Portfolio', design
// system 'Technical Ink'). Typography-led: no shadows, no gradients, sharp
// corners, 1px hairlines, one violet accent.
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue',
    './content/**/*.md',
    './error.vue',
  ],
  theme: {
    extend: {
      colors: {
        // Surfaces
        surface: '#111317', // page background
        deep: '#0c0e12', // header / footer / nested wells
        container: '#1e2023', // code bg, wells
        // Ink
        ink: '#e2e2e7', // primary text
        mute: '#958da1', // secondary text / metadata
        line: '#2a2a33', // hairlines / borders
        // Accent (violet family)
        violet: '#7c3aed', // fills, markers, underlines
        lav: '#d2bbff', // accent TEXT on dark (readable violet)
      },
      fontFamily: {
        display: ['Archivo Narrow', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      maxWidth: {
        content: '80rem',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.ink'),
            maxWidth: 'none',
            a: { color: theme('colors.lav'), textDecoration: 'none', fontWeight: '500', borderBottom: `1px solid ${theme('colors.violet')}` },
            'a:hover': { color: theme('colors.violet'), borderBottomColor: theme('colors.lav') },
            h1: { color: theme('colors.ink'), fontWeight: '700' },
            h2: { color: theme('colors.ink'), fontWeight: '700' },
            h3: { color: theme('colors.ink'), fontWeight: '600' },
            strong: { color: theme('colors.ink') },
            code: { color: theme('colors.lav'), backgroundColor: theme('colors.deep'), border: `1px solid ${theme('colors.line')}`, padding: '0.15em 0.4em', fontWeight: '500' },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            blockquote: { color: theme('colors.mute'), borderLeftColor: theme('colors.violet') },
            hr: { borderColor: theme('colors.line') },
            'th, td': { borderColor: theme('colors.line') },
            'thead th': { color: theme('colors.ink') },
            img: { borderRadius: '0' },
          },
        },
      }),
    },
  },
  plugins: [typography],
}
