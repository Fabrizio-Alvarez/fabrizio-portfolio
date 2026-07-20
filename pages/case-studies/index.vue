<script setup lang="ts">
const { locale, t } = useI18n()
const contentPath = useContentPath()
const { data: caseStudies } = await useAsyncData(
  'case-studies-list',
  () => queryContent(contentPath('/case-studies')).sort({ order: 1 }).find(),
  { watch: [locale] },
)
useHead({ title: () => t('seo.caseStudiesTitle') })
</script>

<template>
  <div class="container-content py-16">
    <SectionHeading :eyebrow="t('ui.commercialImpact')" :title="t('ui.caseStudies')" />
    <p class="text-mute max-w-2xl mt-4 mb-10 leading-relaxed">
      {{ t('ui.caseStudiesDesc') }}
    </p>
    <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <CaseStudyCard
        v-for="c in caseStudies"
        :key="c._path"
        :case-study="c"
      />
    </div>
  </div>
</template>
