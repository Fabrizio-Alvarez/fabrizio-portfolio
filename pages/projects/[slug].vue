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
      class="text-sm text-accent hover:text-ink transition-colors mb-8 inline-block"
    >
      {{ t('ui.allProjectsLink') }}
    </NuxtLinkLocale>

    <header class="mb-10">
      <p class="text-xs font-mono uppercase tracking-widest text-accent mb-2">
        {{ project.role || t('ui.author') }}<span v-if="project.year"> · {{ project.year }}</span>
      </p>
      <h1 class="text-3xl sm:text-4xl font-bold text-ink tracking-tight">{{ project.title }}</h1>
      <p class="mt-4 text-lg text-mute max-w-2xl leading-relaxed">{{ project.summary }}</p>
      <div class="mt-6 flex flex-wrap gap-3 items-center">
        <a
          v-if="project.repo"
          :href="project.repo"
          target="_blank"
          rel="noopener"
          class="text-sm font-medium text-ink border border-line rounded-md px-3 py-1.5 hover:border-ink transition-colors"
        >
          {{ t('ui.githubLink') }} →
        </a>
        <a
          v-if="project.demo"
          :href="project.demo"
          target="_blank"
          rel="noopener"
          class="text-sm font-medium text-white bg-ink rounded-md px-3 py-1.5 hover:bg-accent transition-colors"
        >
          {{ t('ui.liveDemo') }} →
        </a>
        <div v-if="project.stack?.length" class="flex flex-wrap gap-1.5">
          <span
            v-for="tech in project.stack"
            :key="tech"
            class="text-xs px-2 py-0.5 bg-ink/5 text-ink/70 rounded font-mono"
          >{{ tech }}</span>
        </div>
      </div>
    </header>

    <div class="prose prose-slate max-w-none">
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
