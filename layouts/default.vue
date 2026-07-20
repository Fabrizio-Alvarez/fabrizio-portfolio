<script setup lang="ts">
const { site, nav } = useSite()
</script>

<template>
  <div class="min-h-screen flex flex-col bg-white">
    <AppHeader :site="site" :nav="nav" />
    <main class="flex-1">
      <slot />
    </main>
    <AppFooter :site="site" :nav="nav" />
  </div>
</template>
