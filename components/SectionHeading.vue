<script setup lang="ts">
defineProps<{ eyebrow?: string; title: string }>()
</script>

<template>
  <div>
    <p
      v-if="eyebrow"
      class="text-xs font-mono uppercase tracking-widest text-accent mb-2"
    >
      {{ eyebrow }}
    </p>
    <h2 class="text-2xl sm:text-3xl font-bold text-ink tracking-tight">
      {{ title }}
    </h2>
  </div>
</template>
