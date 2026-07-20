<script setup lang="ts">
const { data: projects } = await useAsyncData('projects-list', () =>
  queryContent('/projects').sort({ order: 1 }).find(),
)
useHead({ title: 'Projects — Fabrizio Álvarez' })
</script>

<template>
  <div class="container-content py-16">
    <SectionHeading eyebrow="Selected work" title="Projects" />
    <p class="text-mute max-w-2xl mt-4 mb-10 leading-relaxed">
      Side projects and architecture studies. Each one is built to be defended in an
      interview — real domain, framework-agnostic core, tests, Docker, and CI.
    </p>
    <div class="grid gap-5 sm:grid-cols-2">
      <ProjectCard
        v-for="p in projects"
        :key="p._path"
        :project="p"
      />
    </div>
  </div>
</template>
