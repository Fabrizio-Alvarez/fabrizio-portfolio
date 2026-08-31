<script setup lang="ts">
defineProps<{ metrics: { value: string; label: string }[] }>()
</script>

<template>
  <dl class="grid grid-cols-2 md:grid-cols-4 border-y border-line md:divide-x divide-line">
    <div
      v-for="m in metrics"
      :key="m.label"
      class="px-5 py-7 md:px-7"
    >
      <dt class="font-mono text-2xl sm:text-3xl text-ink tracking-tight">{{ m.value }}</dt>
      <dd class="font-mono text-[11px] uppercase tracking-widest text-mute mt-2 leading-snug">
        {{ m.label }}
      </dd>
    </div>
  </dl>
</template>
