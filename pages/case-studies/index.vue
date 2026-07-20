<script setup lang="ts">
const { data: caseStudies } = await useAsyncData('case-studies-list', () =>
  queryContent('/case-studies').sort({ order: 1 }).find(),
)
useHead({ title: 'Case studies — Fabrizio Álvarez' })
</script>

<template>
  <div class="container-content py-16">
    <SectionHeading eyebrow="Commercial impact" title="Case studies" />
    <p class="text-mute max-w-2xl mt-4 mb-10 leading-relaxed">
      Sanitized write-ups of 5 years on a multi-country healthcare SaaS (EMR) —
      the problem, the technical decisions, and the outcome. No proprietary code.
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
