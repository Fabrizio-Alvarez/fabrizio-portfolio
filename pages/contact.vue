<script setup lang="ts">
const { t } = useI18n()
const { site, channels } = useSite()
useHead({ title: () => t('seo.contactTitle') })
</script>

<template>
  <div class="container-content py-16 max-w-3xl">
    <SectionHeading :eyebrow="t('ui.contactEyebrow')" :title="t('ui.letsTalk')" />
    <p class="text-mute mt-4 mb-10 leading-relaxed max-w-2xl">
      {{ site.availableFor }} {{ t('ui.contactLead') }}
    </p>

    <div class="border-y border-line sm:divide-y divide-line">
      <div
        v-for="c in channels"
        :key="c.label"
        class="py-5 flex items-center justify-between gap-4"
      >
        <div>
          <p class="font-mono text-[11px] uppercase tracking-[0.2em] text-violet">{{ c.label }}</p>
          <p class="mt-1 text-sm text-ink break-all">{{ c.value }}</p>
        </div>
        <a
          v-if="c.href"
          :href="c.href"
          :target="c.href.startsWith('http') ? '_blank' : undefined"
          rel="noopener"
          class="font-mono text-xs uppercase tracking-widest text-lav hover:text-violet transition-colors whitespace-nowrap"
        >
          {{ t('ui.open') }} →
        </a>
      </div>
    </div>

    <div class="mt-12 border-t border-line pt-8">
      <h2 class="font-display text-2xl font-bold uppercase tracking-tight text-ink">{{ t('ui.preferEmail') }}</h2>
      <p class="mt-2 text-mute text-sm">{{ t('ui.dropLine') }}</p>
      <a
        :href="`mailto:${site.email}`"
        class="mt-5 inline-flex items-center px-5 py-2.5 bg-violet text-white font-mono text-xs uppercase tracking-widest hover:bg-lav hover:text-deep transition-colors"
      >
        {{ site.email }}
      </a>
    </div>
  </div>
</template>
