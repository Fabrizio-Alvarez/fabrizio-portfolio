<script setup lang="ts">
const { site, nav } = useSite()
const head = useLocaleHead()
useHead(head)
</script>

<template>
  <div class="min-h-screen flex flex-col bg-surface">
    <AppHeader :site="site" :nav="nav" />
    <main class="flex-1">
      <slot />
    </main>
    <AppFooter :site="site" :nav="nav" />
  </div>
</template>
