<script setup lang="ts">
const { site, skills } = useSite()
useHead({ title: `About — ${site.name}` })
</script>

<template>
  <div class="container-content py-16">
    <div class="grid lg:grid-cols-3 gap-12">
      <div class="lg:col-span-2">
        <SectionHeading eyebrow="About" title="Backend that holds up under load" />
        <div class="prose prose-slate max-w-none mt-6">
          <p>
            I'm a Backend Software Engineer and Product Engineer with 5 years of experience
            designing, building, and scaling high-availability PHP systems for a multi-country
            healthcare SaaS. I specialize in turning vague business needs into appropriate
            technical solutions — and keeping them fast under real production load.
          </p>
          <p>
            Most of my work has been on an EMR used across five countries by clinics processing
            up to 30,000 appointments a day. That scale taught me to care about the boring,
            load-bearing things: query plans, idempotency, retries, and tests you can trust.
          </p>
          <h3>What I actually do</h3>
          <ul>
            <li><strong>Feature development</strong> — from understanding the business need and
              defining the technical solution through implementation and testing.</li>
            <li><strong>Performance optimization</strong> — profiling production databases
              (AWS Aurora), eliminating N+1 queries, designing composite indexes, and refactoring
              slow queries. Best-known win: a critical query from <code>30s</code> down to
              <code>~2s</code>.</li>
            <li><strong>Testing strategy &amp; quality engineering</strong> — migrated the backend
              suite to Pest and built an AI-assisted E2E methodology on Playwright, wired into CI.</li>
            <li><strong>Integrations &amp; payments</strong> — MercadoPago QR, multi-country
              electronic invoicing, and RIS/LIS bridges, with idempotency and signature
              verification treated as defaults.</li>
          </ul>
          <p>
            I'm fluent in Spanish (native) and English (advanced — C1), and I'm open to remote
            roles in backend, platform, or product engineering.
          </p>
        </div>
      </div>

      <aside>
        <SectionHeading eyebrow="Stack" title="Skills" />
        <div class="mt-6 space-y-6">
          <div v-for="group in skills" :key="group.group">
            <p class="text-xs font-mono uppercase tracking-widest text-accent mb-2">{{ group.group }}</p>
            <div class="flex flex-wrap gap-1.5">
              <span
                v-for="item in group.items"
                :key="item"
                class="text-xs px-2 py-1 bg-ink/5 text-ink/80 rounded font-mono"
              >{{ item }}</span>
            </div>
          </div>
        </div>

        <div class="mt-8 p-5 border border-line rounded-lg">
          <p class="text-xs font-mono uppercase tracking-widest text-accent mb-2">Languages</p>
          <p class="text-sm text-ink">Spanish — native</p>
          <p class="text-sm text-ink">English — advanced (C1)</p>
        </div>
      </aside>
    </div>
  </div>
</template>
