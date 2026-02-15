<template>
  <div class="pagination" v-if="prev || next">
    <router-link v-if="prev" :to="prev.link" class="page-link page-prev">
      <span class="page-label">Previous</span>
      <span class="page-title">
        <span class="material-icons-round page-arrow">arrow_back</span>
        {{ prev.title }}
      </span>
    </router-link>
    <div v-else></div>

    <router-link v-if="next" :to="next.link" class="page-link page-next">
      <span class="page-label">Next</span>
      <span class="page-title">
        {{ next.title }}
        <span class="material-icons-round page-arrow">arrow_forward</span>
      </span>
    </router-link>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { getFlatDocs } from '../docs/loader.js'

const props = defineProps({
  currentPath: { type: String, required: true }
})

const allItems = computed(() => {
  return getFlatDocs()
})

const currentIndex = computed(() => {
  return allItems.value.findIndex(item => item.link === props.currentPath)
})

const prev = computed(() => {
  const idx = currentIndex.value
  return idx > 0 ? allItems.value[idx - 1] : null
})

const next = computed(() => {
  const idx = currentIndex.value
  return idx >= 0 && idx < allItems.value.length - 1 ? allItems.value[idx + 1] : null
})
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  margin-top: 4rem;
  padding-top: 2rem;
  gap: 1rem;
}

html.dark .pagination {
  border-top: 1px solid var(--color-border-dark);
}

html:not(.dark) .pagination {
  border-top: 1px solid var(--color-border-light);
}

.page-link {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  text-decoration: none;
  padding: 0.75rem;
  border-radius: var(--radius-md);
  transition: all 0.15s;
}

.page-link:hover {
  background: oklch(from #197fe6 l c h / 0.05);
}

.page-next {
  text-align: right;
  align-items: flex-end;
}

.page-label {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

html.dark .page-label { color: #64748b; }
html:not(.dark) .page-label { color: #94a3b8; }

.page-title {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.9375rem;
  font-weight: 600;
  transition: color 0.15s;
}

html.dark .page-title { color: var(--color-text-heading); }
html:not(.dark) .page-title { color: #0f172a; }

.page-link:hover .page-title {
  color: var(--color-primary);
}

.page-arrow {
  font-size: 0.875rem;
}
</style>
