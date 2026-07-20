<script setup lang="ts">
defineProps<{ metrics: { value: string; label: string }[] }>()
</script>

<template>
  <dl class="grid grid-cols-2 sm:grid-cols-4 gap-px bg-line border border-line rounded-lg overflow-hidden">
    <div
      v-for="m in metrics"
      :key="m.label"
      class="bg-white px-5 py-6"
    >
      <dt class="text-2xl sm:text-3xl font-bold text-ink tracking-tight">{{ m.value }}</dt>
      <dd class="text-xs text-mute mt-1.5 leading-snug">{{ m.label }}</dd>
    </div>
  </dl>
</template>
