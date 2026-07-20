<script setup lang="ts">
defineProps<{
  caseStudy: {
    _path: string
    title: string
    area?: string
    summary: string
  }
}>()
</script>

<template>
  <NuxtLink
    :to="caseStudy._path"
    class="group flex flex-col border border-line rounded-lg p-6 hover:border-accent hover:-translate-y-0.5 transition-all duration-200"
  >
    <p
      v-if="caseStudy.area"
      class="text-xs font-mono uppercase tracking-widest text-accent mb-2"
    >
      {{ caseStudy.area }}
    </p>
    <h3 class="text-lg font-semibold text-ink group-hover:text-accent transition-colors mb-2">
      {{ caseStudy.title }}
    </h3>
    <p class="text-sm text-mute leading-relaxed">{{ caseStudy.summary }}</p>
  </NuxtLink>
</template>
