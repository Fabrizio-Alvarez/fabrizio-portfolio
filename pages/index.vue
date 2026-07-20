<script setup lang="ts">
const { site, hero, metrics } = useSite()

const { data: featuredProjects } = await useAsyncData('home-projects', () =>
  queryContent('/projects').where({ featured: true }).sort({ order: 1 }).find(),
)
const { data: caseStudies } = await useAsyncData('home-case-studies', () =>
  queryContent('/case-studies').sort({ order: 1 }).limit(3).find(),
)

useHead({
  title: `${site.name} — ${site.role}`,
})
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="border-b border-line">
      <div class="container-content py-20 sm:py-28">
        <p class="text-sm font-mono text-accent mb-4">{{ hero.eyebrow }}</p>
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-ink leading-[1.08] tracking-tight max-w-4xl">
          {{ hero.headline }}
        </h1>
        <p class="mt-6 text-lg text-mute max-w-2xl leading-relaxed">{{ hero.sub }}</p>
        <div class="mt-8 flex flex-wrap gap-3">
          <NuxtLink
            to="/projects"
            class="inline-flex items-center px-5 py-2.5 bg-ink text-white text-sm font-medium rounded-md hover:bg-accent transition-colors"
          >
            View my work
          </NuxtLink>
          <NuxtLink
            to="/contact"
            class="inline-flex items-center px-5 py-2.5 border border-line text-ink text-sm font-medium rounded-md hover:border-ink transition-colors"
          >
            Get in touch
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Metrics -->
    <section class="border-b border-line">
      <div class="container-content py-12">
        <MetricStrip :metrics="metrics" />
      </div>
    </section>

    <!-- Featured projects -->
    <section v-if="featuredProjects?.length" class="border-b border-line">
      <div class="container-content py-16">
        <div class="flex items-end justify-between mb-8 gap-4">
          <SectionHeading eyebrow="Selected work" title="Projects" />
          <NuxtLink to="/projects" class="text-sm text-accent hover:text-ink transition-colors whitespace-nowrap pb-1">All projects →</NuxtLink>
        </div>
        <div class="grid gap-5 sm:grid-cols-2">
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
      <div class="container-content py-16">
        <div class="flex items-end justify-between mb-8 gap-4">
          <SectionHeading eyebrow="Commercial impact" title="Case studies" />
          <NuxtLink to="/case-studies" class="text-sm text-accent hover:text-ink transition-colors whitespace-nowrap pb-1">All case studies →</NuxtLink>
        </div>
        <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
      <div class="container-content py-20">
        <div class="border border-line rounded-lg p-10 sm:p-14 text-center">
          <h2 class="text-2xl sm:text-3xl font-bold text-ink tracking-tight">Looking for a backend engineer?</h2>
          <p class="mt-3 text-mute max-w-xl mx-auto leading-relaxed">{{ site.availableFor }}</p>
          <div class="mt-6 flex flex-wrap justify-center gap-3">
            <a
              :href="`mailto:${site.email}`"
              class="inline-flex items-center px-5 py-2.5 bg-ink text-white text-sm font-medium rounded-md hover:bg-accent transition-colors"
            >
              {{ site.email }}
            </a>
            <NuxtLink
              to="/about"
              class="inline-flex items-center px-5 py-2.5 border border-line text-ink text-sm font-medium rounded-md hover:border-ink transition-colors"
            >
              More about me
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
