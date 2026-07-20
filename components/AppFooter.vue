<script setup lang="ts">
defineProps<{
  site: { fullName: string; role: string; email: string; github: string; linkedin: string }
  nav: { label: string; to: string }[]
}>()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-line">
    <div class="container-content py-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 text-sm text-mute">
      <div>
        <p class="text-ink font-medium">{{ site.fullName }}</p>
        <p class="mt-0.5">© {{ year }} · {{ site.role }}</p>
      </div>
      <div class="flex items-center gap-5">
        <a :href="`mailto:${site.email}`" class="hover:text-ink transition-colors">Email</a>
        <a :href="site.github" target="_blank" rel="noopener" class="hover:text-ink transition-colors">GitHub</a>
        <a :href="site.linkedin" target="_blank" rel="noopener" class="hover:text-ink transition-colors">LinkedIn</a>
      </div>
    </div>
  </footer>
</template>
