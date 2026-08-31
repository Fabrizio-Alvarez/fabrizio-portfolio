<script setup lang="ts">
defineProps<{ eyebrow?: string; num?: string; title: string }>()
</script>

<template>
  <div>
    <p
      v-if="eyebrow"
      class="font-mono text-xs uppercase tracking-[0.2em] text-lav mb-3"
    >
      <span v-if="num" class="text-violet">{{ num }}</span>{{ num ? ' — ' : '' }}{{ eyebrow }}
    </p>
    <h2 class="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-ink leading-none">
      {{ title }}
    </h2>
  </div>
</template>
