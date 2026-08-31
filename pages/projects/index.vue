<script setup lang="ts">
const { locale, t } = useI18n()
const contentPath = useContentPath()
const { data: projects } = await useAsyncData(
  'projects-list',
  () => queryContent(contentPath('/projects')).sort({ order: 1 }).find(),
  { watch: [locale] },
)
useHead({ title: () => t('seo.projectsTitle') })
</script>

<template>
  <div class="container-content py-16">
    <SectionHeading :eyebrow="t('ui.selectedWork')" :title="t('ui.projects')" />
    <p class="text-mute max-w-2xl mt-4 mb-10 leading-relaxed">
      {{ t('ui.projectsDesc') }}
    </p>
    <div class="border-b border-line">
      <ProjectCard
        v-for="p in projects"
        :key="p._path"
        :project="p"
      />
    </div>
  </div>
</template>
