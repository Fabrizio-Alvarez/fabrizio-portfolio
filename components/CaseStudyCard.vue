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
  <NuxtLink :to="caseStudy._path" class="group block border-t border-line pt-5">
    <p
      v-if="caseStudy.area"
      class="font-mono text-[11px] uppercase tracking-[0.2em] text-violet mb-2"
    >
      {{ caseStudy.area }}
    </p>
    <h3
      class="font-display text-xl font-bold uppercase tracking-tight text-ink group-hover:text-lav transition-colors"
    >
      {{ caseStudy.title }}
    </h3>
    <p class="mt-2 text-sm text-mute leading-relaxed">{{ caseStudy.summary }}</p>
  </NuxtLink>
</template>
