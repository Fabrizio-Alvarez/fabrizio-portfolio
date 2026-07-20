<script setup lang="ts">
defineProps<{
  project: {
    _path: string
    title: string
    summary: string
    year?: number | string
    stack?: string[]
  }
}>()
</script>

<template>
  <NuxtLink
    :to="project._path"
    class="group block border border-line rounded-lg p-6 hover:border-accent hover:-translate-y-0.5 transition-all duration-200"
  >
    <div class="flex items-start justify-between gap-4 mb-3">
      <h3 class="text-lg font-semibold text-ink group-hover:text-accent transition-colors">
        {{ project.title }}
      </h3>
      <span
        v-if="project.year"
        class="text-xs text-mute font-mono shrink-0 mt-1"
      >{{ project.year }}</span>
    </div>
    <p class="text-sm text-mute mb-4 leading-relaxed">{{ project.summary }}</p>
    <div
      v-if="project.stack?.length"
      class="flex flex-wrap gap-1.5"
    >
      <span
        v-for="tech in project.stack.slice(0, 5)"
        :key="tech"
        class="text-xs px-2 py-0.5 bg-ink/5 text-ink/70 rounded font-mono"
      >{{ tech }}</span>
    </div>
  </NuxtLink>
</template>
