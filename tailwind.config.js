import typography from '@tailwindcss/typography'

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
        // Branding inherited from the CV (clean, professional, monochrome + one accent).
        ink: '#1a1a1a', // body text
        accent: '#2c3e50', // headings / CTAs (slate-blue from the CV)
        mute: '#666666', // secondary text
        line: '#cfd3d8', // borders / separators
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      maxWidth: {
        content: '72rem',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.ink'),
            a: { color: theme('colors.accent'), textDecoration: 'none', fontWeight: '500' },
            'a:hover': { textDecoration: 'underline' },
            h1: { color: theme('colors.ink'), fontWeight: '700' },
            h2: { color: theme('colors.ink'), fontWeight: '700' },
            h3: { color: theme('colors.ink'), fontWeight: '600' },
            code: { color: theme('colors.accent'), backgroundColor: '#f4f5f7', padding: '0.15em 0.4em', borderRadius: '0.25rem', fontWeight: '500' },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            blockquote: { color: theme('colors.mute'), borderLeftColor: theme('colors.line') },
          },
        },
      }),
    },
  },
  plugins: [typography],
}
