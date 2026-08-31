<script setup lang="ts">
const route = useRoute()
const { locale, t } = useI18n()
const contentPath = useContentPath()

const { data: caseStudy } = await useAsyncData(
  `case-study-${route.params.slug}`,
  () => queryContent(contentPath('/case-studies'), route.params.slug as string).findOne(),
  { watch: [locale] },
)

if (!caseStudy.value) {
  throw createError({ statusCode: 404, statusMessage: 'Case study not found', fatal: true })
}

useHead({
  title: () => `${caseStudy.value?.title ?? ''} — Fabrizio Álvarez`,
  meta: [{ name: 'description', content: () => caseStudy.value?.summary || '' }],
})
</script>

<template>
  <article v-if="caseStudy" class="container-content py-16 max-w-3xl">
    <NuxtLinkLocale
      to="/case-studies"
      class="font-mono text-xs uppercase tracking-widest text-lav hover:text-violet transition-colors mb-8 inline-block"
    >
      {{ t('ui.allCaseStudiesLink') }}
    </NuxtLinkLocale>

    <header class="mb-10">
      <p v-if="caseStudy.area" class="font-mono text-[11px] uppercase tracking-[0.2em] text-violet mb-3">
        {{ caseStudy.area }}
      </p>
      <h1 class="font-display text-4xl sm:text-5xl font-bold uppercase tracking-tight text-ink leading-none">
        {{ caseStudy.title }}
      </h1>
      <p class="mt-4 text-base sm:text-lg text-mute leading-relaxed">{{ caseStudy.summary }}</p>
    </header>

    <div class="prose max-w-none">
      <ContentRenderer :value="caseStudy" />
    </div>
  </article>
</template>
