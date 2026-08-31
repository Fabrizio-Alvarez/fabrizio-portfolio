<script setup lang="ts">
defineProps<{
  site: { name: string; fullName: string }
  nav: { label: string; to: string }[]
}>()

const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

// The "other" locale — what the toggle takes you to.
const otherLocale = computed(() => {
  const all = locales.value as Array<{ code: string; name: string }>
  return all.find((l) => l.code !== locale.value) ?? null
})
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-line bg-deep/90 backdrop-blur">
    <div class="container-content h-14 flex items-center justify-between gap-4">
      <NuxtLinkLocale
        to="/"
        class="font-mono text-xs lowercase tracking-[0.2em] text-ink hover:text-lav transition-colors"
      >
        falvarez.dev
      </NuxtLinkLocale>
      <nav class="flex items-center gap-5 sm:gap-7 font-mono text-xs uppercase tracking-widest">
        <NuxtLinkLocale
          v-for="item in nav"
          :key="item.to"
          :to="item.to"
          class="text-mute hover:text-ink transition-colors whitespace-nowrap"
          active-class="text-lav"
        >
          {{ item.label }}
        </NuxtLinkLocale>
        <NuxtLink
          v-if="otherLocale"
          :to="switchLocalePath(otherLocale.code)"
          class="text-violet hover:text-lav transition-colors whitespace-nowrap uppercase"
          :aria-label="`Switch to ${otherLocale.name}`"
        >
          {{ otherLocale.code }}
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>
