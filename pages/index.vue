<script setup lang="ts">
const { locale, t } = useI18n()
const { site, hero, metrics } = useSite()
const contentPath = useContentPath()

const { data: featuredProjects } = await useAsyncData(
  'home-projects',
  () =>
    queryContent(contentPath('/projects'))
      .where({ featured: true })
      .sort({ order: 1 })
      .find(),
  { watch: [locale] },
)

const { data: caseStudies } = await useAsyncData(
  'home-case-studies',
  () => queryContent(contentPath('/case-studies')).sort({ order: 1 }).limit(3).find(),
  { watch: [locale] },
)

useHead({
  title: () => `${site.value.name}${t('seo.homeTitleSuffix')}`,
  meta: [{ name: 'description', content: () => t('seo.metaDescription') }],
})
</script>

<template>
  <div>
    <!-- Hero -->
    <section>
      <div class="container-content pt-20 pb-16 sm:pt-28 sm:pb-20">
        <p class="font-mono text-xs uppercase tracking-[0.2em] text-lav mb-6">{{ hero.eyebrow }}</p>
        <h1
          class="font-display text-[2.75rem] sm:text-6xl lg:text-7xl font-bold uppercase leading-[0.95] tracking-tight text-ink max-w-5xl"
        >
          {{ hero.headline }}<span class="text-violet">.</span>
        </h1>
        <p class="mt-6 text-base sm:text-lg text-mute max-w-2xl leading-relaxed">{{ hero.sub }}</p>
        <div class="mt-10 flex flex-wrap gap-3">
          <NuxtLinkLocale
            to="/projects"
            class="inline-flex items-center px-5 py-2.5 bg-violet text-white font-mono text-xs uppercase tracking-widest hover:bg-lav hover:text-deep transition-colors"
          >
            {{ t('ui.viewWork') }}
          </NuxtLinkLocale>
          <NuxtLinkLocale
            to="/contact"
            class="inline-flex items-center px-5 py-2.5 border border-line text-ink font-mono text-xs uppercase tracking-widest hover:border-lav hover:text-lav transition-colors"
          >
            {{ t('ui.getInTouch') }}
          </NuxtLinkLocale>
        </div>
      </div>
    </section>

    <!-- Metrics -->
    <MetricStrip :metrics="metrics" />

    <!-- Featured projects -->
    <section v-if="featuredProjects?.length" class="border-b border-line">
      <div class="container-content py-16 sm:py-24">
        <div class="flex items-end justify-between mb-8 gap-4">
          <SectionHeading num="01" :eyebrow="t('ui.selectedWork')" :title="t('ui.projects')" />
          <NuxtLinkLocale
            to="/projects"
            class="font-mono text-xs uppercase tracking-widest text-lav hover:text-violet transition-colors whitespace-nowrap pb-1"
          >{{ t('ui.allProjects') }} →</NuxtLinkLocale>
        </div>
        <div class="border-b border-line">
          <ProjectCard
            v-for="p in featuredProjects"
            :key="p._path"
            :project="p"
          />
        </div>
      </div>
    </section>

    <!-- Case studies -->
    <section v-if="caseStudies?.length" class="border-b border-line">
      <div class="container-content py-16 sm:py-24">
        <div class="flex items-end justify-between mb-8 gap-4">
          <SectionHeading num="02" :eyebrow="t('ui.commercialImpact')" :title="t('ui.caseStudies')" />
          <NuxtLinkLocale
            to="/case-studies"
            class="font-mono text-xs uppercase tracking-widest text-lav hover:text-violet transition-colors whitespace-nowrap pb-1"
          >{{ t('ui.allCaseStudies') }} →</NuxtLinkLocale>
        </div>
        <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <CaseStudyCard
            v-for="c in caseStudies"
            :key="c._path"
            :case-study="c"
          />
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section>
      <div class="container-content py-20 sm:py-28 text-center">
        <h2 class="font-display text-3xl sm:text-5xl font-bold uppercase tracking-tight text-ink leading-none">
          {{ t('ui.lookingForEngineer') }}<span class="text-violet">_</span>
        </h2>
        <p class="mt-4 text-mute max-w-xl mx-auto leading-relaxed">{{ site.availableFor }}</p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <a
            :href="`mailto:${site.email}`"
            class="inline-flex items-center px-5 py-2.5 bg-violet text-white font-mono text-xs uppercase tracking-widest hover:bg-lav hover:text-deep transition-colors"
          >
            {{ site.email }}
          </a>
          <NuxtLinkLocale
            to="/about"
            class="inline-flex items-center px-5 py-2.5 border border-line text-ink font-mono text-xs uppercase tracking-widest hover:border-lav hover:text-lav transition-colors"
          >
            {{ t('ui.moreAboutMe') }}
          </NuxtLinkLocale>
        </div>
      </div>
    </section>
  </div>
</template>
