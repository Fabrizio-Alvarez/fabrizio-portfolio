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
      class="text-sm text-accent hover:text-ink transition-colors mb-8 inline-block"
    >
      {{ t('ui.allCaseStudiesLink') }}
    </NuxtLinkLocale>

    <header class="mb-10">
      <p v-if="caseStudy.area" class="text-xs font-mono uppercase tracking-widest text-accent mb-2">
        {{ caseStudy.area }}
      </p>
      <h1 class="text-3xl sm:text-4xl font-bold text-ink tracking-tight">{{ caseStudy.title }}</h1>
      <p class="mt-4 text-lg text-mute leading-relaxed">{{ caseStudy.summary }}</p>
    </header>

    <div class="prose prose-slate max-w-none">
      <ContentRenderer :value="caseStudy" />
    </div>
  </article>
</template>
