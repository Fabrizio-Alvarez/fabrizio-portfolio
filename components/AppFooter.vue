<script setup lang="ts">
defineProps<{
  site: { fullName: string; role: string; email: string; github: string; linkedin: string }
  nav: { label: string; to: string }[]
}>()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-line bg-deep">
    <div
      class="container-content py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs text-mute"
    >
      <p class="lowercase tracking-wider">© {{ year }} · {{ site.fullName }}</p>
      <div class="flex items-center gap-6 uppercase tracking-widest">
        <a :href="`mailto:${site.email}`" class="hover:text-lav transition-colors">Email</a>
        <a :href="site.github" target="_blank" rel="noopener" class="hover:text-lav transition-colors">GitHub</a>
        <a :href="site.linkedin" target="_blank" rel="noopener" class="hover:text-lav transition-colors">LinkedIn</a>
        <span class="text-line">|</span>
        <span>Buenos Aires, AR</span>
      </div>
    </div>
  </footer>
</template>
