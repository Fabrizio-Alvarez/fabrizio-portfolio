<script setup lang="ts">
const { site, channels } = useSite()
useHead({ title: `Contact — ${site.name}` })
</script>

<template>
  <div class="container-content py-16 max-w-3xl">
    <SectionHeading eyebrow="Contact" title="Let's talk" />
    <p class="text-mute mt-4 mb-10 leading-relaxed max-w-2xl">
      {{ site.availableFor }} The fastest way to reach me is email — I usually reply within a day.
    </p>

    <div class="grid sm:grid-cols-2 gap-px bg-line border border-line rounded-lg overflow-hidden">
      <div
        v-for="c in channels"
        :key="c.label"
        class="bg-white px-5 py-5 flex items-center justify-between gap-4"
      >
        <div>
          <p class="text-xs font-mono uppercase tracking-widest text-accent">{{ c.label }}</p>
          <p class="mt-1 text-sm text-ink break-all">{{ c.value }}</p>
        </div>
        <a
          v-if="c.href"
          :href="c.href"
          :target="c.href.startsWith('http') ? '_blank' : undefined"
          rel="noopener"
          class="text-xs font-medium text-accent hover:text-ink transition-colors whitespace-nowrap"
        >
          open →
        </a>
      </div>
    </div>

    <div class="mt-10 border border-line rounded-lg p-8 sm:p-10">
      <h2 class="text-xl font-semibold text-ink">Prefer email?</h2>
      <p class="mt-2 text-mute text-sm">Drop me a line and I'll get back to you.</p>
      <a
        :href="`mailto:${site.email}`"
        class="mt-5 inline-flex items-center px-5 py-2.5 bg-ink text-white text-sm font-medium rounded-md hover:bg-accent transition-colors"
      >
        {{ site.email }}
      </a>
    </div>
  </div>
</template>
