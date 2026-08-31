<script setup lang="ts">
const { t } = useI18n()
const { site, skills } = useSite()
useHead({ title: () => t('seo.aboutTitle') })
</script>

<template>
  <div class="container-content py-16">
    <div class="grid lg:grid-cols-3 gap-12">
      <div class="lg:col-span-2">
        <SectionHeading :eyebrow="t('ui.aboutEyebrow')" :title="t('ui.backendHoldsUp')" />
        <div class="prose max-w-none mt-6">
          <p>{{ t('about.p1') }}</p>
          <p>{{ t('about.p2') }}</p>
          <h3>{{ t('about.whatIDo') }}</h3>
          <ul>
            <li>
              <strong>{{ t('about.feature') }}</strong><span v-html="t('about.featureDesc')"></span>
            </li>
            <li>
              <strong>{{ t('about.performance') }}</strong><span>{{ t('about.performanceDesc') }}</span><code>{{ t('about.performanceWinFrom') }}</code><span>{{ t('about.performanceWinTo') }}</span>.
            </li>
            <li>
              <strong>{{ t('about.testing') }}</strong><span v-html="t('about.testingDesc')"></span>
            </li>
            <li>
              <strong>{{ t('about.integrations') }}</strong><span v-html="t('about.integrationsDesc')"></span>
            </li>
          </ul>
          <p>{{ t('about.p3') }}</p>
        </div>
      </div>

      <aside>
        <SectionHeading :eyebrow="t('ui.stackEyebrow')" :title="t('ui.skills')" />
        <div class="mt-6 space-y-6">
          <div v-for="group in skills" :key="group.group">
            <p class="font-mono text-[11px] uppercase tracking-[0.2em] text-violet mb-2">{{ group.group }}</p>
            <div class="flex flex-wrap gap-x-3 gap-y-1">
              <span
                v-for="item in group.items"
                :key="item"
                class="font-mono text-xs text-mute"
              >{{ item }}</span>
            </div>
          </div>
        </div>

        <div class="mt-8 pt-5 border-t border-line">
          <p class="font-mono text-[11px] uppercase tracking-[0.2em] text-violet mb-2">{{ t('ui.languageListHeader') }}</p>
          <p class="text-sm text-ink">{{ t('languages.spanishNative') }}</p>
          <p class="text-sm text-ink">{{ t('languages.englishC1') }}</p>
        </div>
      </aside>
    </div>
  </div>
</template>
