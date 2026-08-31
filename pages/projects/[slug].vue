<script setup lang="ts">
const route = useRoute()
const { locale, t } = useI18n()
const contentPath = useContentPath()

const { data: project } = await useAsyncData(
  `project-${route.params.slug}`,
  () => queryContent(contentPath('/projects'), route.params.slug as string).findOne(),
  { watch: [locale] },
)

if (!project.value) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found', fatal: true })
}

const { data: more } = await useAsyncData(
  `project-${route.params.slug}-more`,
  () =>
    queryContent(contentPath('/projects'))
      .where({ _path: { $ne: project.value!._path } })
      .sort({ order: 1 })
      .limit(2)
      .find(),
  { watch: [locale] },
)

useHead({
  title: () => `${project.value?.title ?? ''} — Fabrizio Álvarez`,
  meta: [{ name: 'description', content: () => project.value?.summary || '' }],
})
</script>

<template>
  <article v-if="project" class="container-content py-16">
    <NuxtLinkLocale
      to="/projects"
      class="font-mono text-xs uppercase tracking-widest text-lav hover:text-violet transition-colors mb-8 inline-block"
    >
      {{ t('ui.allProjectsLink') }}
    </NuxtLinkLocale>

    <header class="mb-10">
      <p class="font-mono text-[11px] uppercase tracking-[0.2em] text-violet mb-3">
        {{ project.role || t('ui.author') }}<span v-if="project.year"> · {{ project.year }}</span>
      </p>
      <h1 class="font-display text-4xl sm:text-5xl font-bold uppercase tracking-tight text-ink leading-none">
        {{ project.title }}
      </h1>
      <p class="mt-4 text-base sm:text-lg text-mute max-w-2xl leading-relaxed">{{ project.summary }}</p>
      <div class="mt-6 flex flex-wrap gap-3 items-center">
        <a
          v-if="project.repo"
          :href="project.repo"
          target="_blank"
          rel="noopener"
          class="font-mono text-xs uppercase tracking-widest text-ink border border-line px-3 py-1.5 hover:border-lav hover:text-lav transition-colors"
        >
          {{ t('ui.githubLink') }} →
        </a>
        <a
          v-if="project.demo"
          :href="project.demo"
          target="_blank"
          rel="noopener"
          class="font-mono text-xs uppercase tracking-widest text-white bg-violet px-3 py-1.5 hover:bg-lav hover:text-deep transition-colors"
        >
          {{ t('ui.liveDemo') }} →
        </a>
        <div v-if="project.stack?.length" class="flex flex-wrap gap-x-3 gap-y-1">
          <span
            v-for="tech in project.stack"
            :key="tech"
            class="font-mono text-[11px] text-mute"
          >{{ tech }}</span>
        </div>
      </div>
    </header>

    <div class="prose max-w-none">
      <ContentRenderer :value="project" />
    </div>

    <div v-if="more && more.length" class="mt-16 pt-10 border-t border-line">
      <SectionHeading :eyebrow="t('ui.more')" :title="t('ui.otherProjects')" />
      <div class="grid gap-5 sm:grid-cols-2 mt-6">
        <ProjectCard
          v-for="p in more"
          :key="p._path"
          :project="p"
        />
      </div>
    </div>
  </article>
</template>
