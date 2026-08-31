// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: false },

  modules: ['@nuxt/content', '@nuxtjs/i18n', '@nuxtjs/sitemap', '@nuxtjs/tailwindcss'],

  // Production domain (apex on Cloudflare Pages — same CF account as the Mnemo
  // worker; projects hang off their own subdomains, e.g. mnemo.falvarez.dev).
  site: {
    url: 'https://falvarez.dev',
  },

  // Static Site Generation — fully static output, served as static assets on a
  // Cloudflare Worker (deploy config: deploy/wrangler.toml). The explicit
  // `preset: 'static'` stops Nitro from auto-switching to `cloudflare-module`
  // when it sees a wrangler config, which would hijack the static deploy
  // (Nitro then overrides `assets` and wrangler fails looking for index.mjs).
  ssr: true,
  nitro: {
    preset: 'static',
    prerender: {
      crawlLinks: true,
      routes: ['/', '/projects', '/case-studies', '/about', '/contact'],
      failOnError: false,
    },
  },

  i18n: {
    // English is the default locale with NO URL prefix (clean URLs for the primary
    // international audience); Spanish lives under /es/*.
    strategy: 'prefix_except_default',
    defaultLocale: 'en',
    locales: [
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
      { code: 'es', language: 'es-AR', name: 'Español', file: 'es.json' },
    ],
    lazy: true,
    langDir: 'locales',
    baseUrl: 'https://falvarez.dev',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_locale',
      redirectOn: 'root',
      alwaysRedirect: false,
    },
    bundle: {
      optimizeTranslationDirective: false,
    },
  },

  content: {
    highlight: {
      theme: {
        default: 'github-light',
      },
      preload: ['php', 'typescript', 'bash', 'json'],
    },
    markdown: {
      anchorLinks: false,
    },
  },

  tailwindcss: {
    cssPath: '~/assets/css/main.css',
  },

  app: {
    head: {
      title: 'Fabrizio Álvarez — Backend Software Engineer',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Backend Software Engineer & Product Engineer. 5 years scaling a multi-country healthcare SaaS (30k appointments/day). PHP, Laravel, performance engineering, payments and integrations.',
        },
        { name: 'author', content: 'Fabrizio Nicolás Álvarez' },
        { property: 'og:title', content: 'Fabrizio Álvarez — Backend Software Engineer' },
        {
          property: 'og:description',
          content: 'Backend & Product Engineer scaling a multi-country healthcare SaaS.',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: '/og.png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: 'Fabrizio Álvarez — Backend Software Engineer' },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap',
        },
      ],
    },
  },
})
