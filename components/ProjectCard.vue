<script setup lang="ts">
defineProps<{
  project: {
    _path: string
    title: string
    summary: string
    year?: number | string
    stack?: string[]
    demo?: string
  }
}>()
</script>

<template>
  <NuxtLink
    :to="project._path"
    class="group grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-2 border-t border-line py-7 hover:bg-deep/60 transition-colors px-2 -mx-2"
  >
    <div class="min-w-0">
      <div class="flex items-baseline gap-3 flex-wrap">
        <h3
          class="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-ink group-hover:text-lav transition-colors"
        >
          {{ project.title }}
        </h3>
        <span
          v-if="project.demo"
          class="font-mono text-[11px] uppercase tracking-widest text-violet group-hover:text-lav transition-colors"
        >
          Live ↗
        </span>
      </div>
      <p class="mt-2 text-sm text-mute leading-relaxed max-w-2xl">{{ project.summary }}</p>
      <p v-if="project.stack?.length" class="mt-3 font-mono text-[11px] text-lav/90 tracking-wide">
        <span v-for="(tech, i) in project.stack.slice(0, 5)" :key="tech">
          {{ tech }}<span v-if="i < Math.min(project.stack.length, 5) - 1" class="text-line"> · </span>
        </span>
      </p>
    </div>
    <span v-if="project.year" class="font-mono text-xs text-mute shrink-0">{{ project.year }}</span>
  </NuxtLink>
</template>
