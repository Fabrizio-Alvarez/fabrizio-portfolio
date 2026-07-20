<script setup lang="ts">
defineProps<{ site: { name: string; fullName: string }; nav: { label: string; to: string }[] }>()
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-line bg-white/80 backdrop-blur">
    <div class="container-content h-16 flex items-center justify-between gap-4">
      <NuxtLink
        to="/"
        class="font-semibold text-ink hover:text-accent transition-colors tracking-tight"
      >
        {{ site.name }}
      </NuxtLink>
      <nav class="flex items-center gap-5 sm:gap-7 text-sm">
        <NuxtLink
          v-for="item in nav"
          :key="item.to"
          :to="item.to"
          class="text-mute hover:text-ink transition-colors whitespace-nowrap"
          active-class="text-ink font-medium"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>
