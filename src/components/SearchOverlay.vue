<template>
  <Teleport to="body">
    <transition name="overlay">
      <div v-if="isOpen" class="search-overlay" @click.self="close">
        <transition name="modal">
          <div v-if="isOpen" class="search-modal">
            <!-- Search Input -->
            <div class="search-input-wrap">
              <span class="material-icons-round search-input-icon">search</span>
              <input
                ref="inputRef"
                v-model="query"
                type="text"
                class="search-input"
                placeholder="Search documentation..."
                @keydown.escape="close"
                @keydown.down.prevent="moveDown"
                @keydown.up.prevent="moveUp"
                @keydown.enter.prevent="selectCurrent"
              />
              <kbd class="esc-badge">ESC</kbd>
            </div>

            <!-- Results -->
            <div class="search-results" v-if="debouncedQuery.trim()">
              <div v-if="results.length === 0" class="search-empty">
                <span class="material-icons-round empty-icon">search_off</span>
                <p>No results found for "<strong>{{ debouncedQuery }}</strong>"</p>
              </div>
              <div v-else>
                <h3 class="results-category">
                  Articles
                  <span class="results-count" v-if="totalMatches > results.length">
                    {{ results.length }} / {{ totalMatches }}
                  </span>
                </h3>
                <div
                  v-for="(result, i) in results"
                  :key="result.link"
                  class="result-item"
                  :class="{ selected: selectedIndex === i }"
                  @click="goTo(result.link)"
                  @mouseenter="selectedIndex = i"
                >
                  <div class="result-icon-wrap" :class="{ 'icon-selected': selectedIndex === i }">
                    <span class="material-icons-round result-icon">description</span>
                  </div>
                  <div class="result-content">
                    <div class="result-title" v-html="highlightMatch(result.title)"></div>
                    <div class="result-snippet" v-if="result.snippet" v-html="highlightMatch(result.snippet)"></div>
                    <div class="result-path" v-else-if="result.description" v-html="highlightMatch(result.description)"></div>
                  </div>
                  <span class="material-icons-round result-enter" :class="{ 'enter-visible': selectedIndex === i }">keyboard_return</span>
                </div>
              </div>
            </div>

            <!-- Initial State -->
            <div v-else class="search-initial">
              <p class="search-initial-text">Start typing to search the documentation</p>
            </div>

            <!-- Footer Hints -->
            <div class="search-footer">
              <div class="hint">
                <div class="hint-keys">
                  <span class="hint-key"><span class="material-icons-round" style="font-size:14px">arrow_upward</span></span>
                  <span class="hint-key"><span class="material-icons-round" style="font-size:14px">arrow_downward</span></span>
                </div>
                <span class="hint-label">TO NAVIGATE</span>
              </div>
              <div class="hint">
                <span class="hint-key wide"><span class="material-icons-round" style="font-size:14px">keyboard_return</span></span>
                <span class="hint-label">TO SELECT</span>
              </div>
              <div class="hint">
                <span class="hint-key wide esc-key">ESC</span>
                <span class="hint-label">TO CLOSE</span>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import config from '../config.js'
import { getAllDocs } from '../docs/loader.js'
import { parseFrontmatter } from '../markdown/renderer.js'

const router = useRouter()
const isOpen = ref(false)
const query = ref('')
const debouncedQuery = ref('')
const selectedIndex = ref(0)
const inputRef = ref(null)
let debounceTimer = null

/** Strip markdown syntax for cleaner search snippets */
function stripMarkdown(text) {
  return text
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/__(.+?)__/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/_(.+?)_/g, '$1')
    .replace(/`(.+?)`/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '')
    .replace(/^[-*+]\s+/gm, '')
    .replace(/^\d+\.\s+/gm, '')
    .replace(/^>\s*/gm, '')
    .replace(/\|/g, ' ')
    .replace(/^-{3,}/gm, '')
    .replace(/\n{2,}/g, ' ')
    .replace(/\n/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim()
}

/** Extract a snippet around the keyword from plain text */
function extractSnippet(plainContent, query) {
  const lowerContent = plainContent.toLowerCase()
  const lowerQuery = query.toLowerCase()
  const idx = lowerContent.indexOf(lowerQuery)
  if (idx === -1) return ''

  // Use a larger radius and bias it to show more context before the keyword,
  // so the keyword appears roughly centered in the visible snippet.
  const preRadius = 40
  const postRadius = 80
  const start = Math.max(0, idx - preRadius)
  const end = Math.min(plainContent.length, idx + query.length + postRadius)

  let snippet = plainContent.slice(start, end).trim()
  if (start > 0) snippet = '...' + snippet
  if (end < plainContent.length) snippet = snippet + '...'
  return snippet
}

// Build search index from docs
const searchIndex = computed(() => {
  const docs = getAllDocs()
  const items = []
  for (const [route, raw] of docs) {
    const { meta, content } = parseFrontmatter(raw)
    const plainContent = stripMarkdown(content)
    items.push({
      title: meta.title || route.replace(/\//g, '').replace(/-/g, ' '),
      description: meta.description || '',
      link: route,
      plainContent,
      contentLower: plainContent.toLowerCase(),
    })
  }
  return items
})

// All matches (for total count)
const allMatches = computed(() => {
  if (!debouncedQuery.value.trim()) return []
  const q = debouncedQuery.value.toLowerCase()
  return searchIndex.value.filter(item =>
    item.title.toLowerCase().includes(q) ||
    item.description.toLowerCase().includes(q) ||
    item.contentLower.includes(q)
  )
})

const totalMatches = computed(() => allMatches.value.length)

// Sliced results with snippets
const results = computed(() => {
  if (!debouncedQuery.value.trim()) return []
  const q = debouncedQuery.value
  return allMatches.value
    .sort((a, b) => {
      const aT = a.title.toLowerCase().includes(q.toLowerCase())
      const bT = b.title.toLowerCase().includes(q.toLowerCase())
      if (aT && !bT) return -1
      if (!aT && bT) return 1
      return 0
    })
    .slice(0, 10)
    .map(item => {
      const contentMatch = item.contentLower.includes(q.toLowerCase())
      const snippet = contentMatch ? extractSnippet(item.plainContent, q) : ''
      return { ...item, snippet }
    })
})

function highlightMatch(text) {
  if (!debouncedQuery.value.trim()) return text
  const regex = new RegExp(`(${debouncedQuery.value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
  return text.replace(regex, '<span class="search-highlight">$1</span>')
}

function open() {
  isOpen.value = true
  query.value = ''
  debouncedQuery.value = ''
  selectedIndex.value = 0
  nextTick(() => inputRef.value?.focus())
}

function close() { isOpen.value = false }

function goTo(link) {
  router.push(link)
  close()
}

function moveDown() {
  if (selectedIndex.value < results.value.length - 1) selectedIndex.value++
}

function moveUp() {
  if (selectedIndex.value > 0) selectedIndex.value--
}

function selectCurrent() {
  if (results.value[selectedIndex.value]) goTo(results.value[selectedIndex.value].link)
}

// Debounce query input
watch(query, (val) => {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => { debouncedQuery.value = val }, 200)
})

watch(debouncedQuery, () => { selectedIndex.value = 0 })

onMounted(() => { window.addEventListener('docblog:open-search', open) })
onUnmounted(() => { window.removeEventListener('docblog:open-search', open) })
</script>

<style scoped>
/* Overlay */
.search-overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 15vh;
  padding-left: 1rem;
  padding-right: 1rem;
}

html.dark .search-overlay {
  background: oklch(from #020617 l c h / 0.6);
  backdrop-filter: blur(12px);
}

html:not(.dark) .search-overlay {
  background: oklch(from #0f172a l c h / 0.3);
  backdrop-filter: blur(8px);
}

/* Modal */
.search-modal {
  width: 100%;
  max-width: 40rem;
  border-radius: var(--radius-lg);
  overflow: hidden;
  max-height: 70vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.5);
}

html.dark .search-modal {
  background: #0d141b;
  border: 1px solid var(--color-border-dark);
}

html:not(.dark) .search-modal {
  background: #fff;
  border: 1px solid var(--color-border-light);
  box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.15);
}

/* Input */
.search-input-wrap {
  display: flex;
  align-items: center;
  padding: 1rem 1.25rem;
}

html.dark .search-input-wrap {
  border-bottom: 1px solid var(--color-border-dark);
}

html:not(.dark) .search-input-wrap {
  border-bottom: 1px solid var(--color-border-light);
}

.search-input-icon {
  margin-right: 0.75rem;
}

html.dark .search-input-icon { color: #64748b; }
html:not(.dark) .search-input-icon { color: #94a3b8; }

.search-input {
  flex: 1;
  background: transparent;
  border: none;
  font-size: 1.125rem;
  font-family: var(--font-display);
  outline: none;
}

html.dark .search-input { color: var(--color-text-heading); }
html.dark .search-input::placeholder { color: #475569; }
html:not(.dark) .search-input { color: #0f172a; }
html:not(.dark) .search-input::placeholder { color: #94a3b8; }

.esc-badge {
  font-size: 0.625rem;
  font-weight: 700;
  padding: 0.25rem 0.5rem;
  border-radius: var(--radius-sm);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-family: var(--font-display);
}

html.dark .esc-badge {
  background: var(--color-surface-dark);
  border: 1px solid var(--color-border-dark);
  color: #64748b;
}

html:not(.dark) .esc-badge {
  background: #f8fafc;
  border: 1px solid var(--color-border-light);
  color: #94a3b8;
}

/* Results */
.search-results {
  flex: 1;
  overflow-y: auto;
  padding: 0.5rem;
}

.results-category {
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 0.5rem 0.75rem;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

html.dark .results-category { color: #64748b; }
html:not(.dark) .results-category { color: #94a3b8; }

.results-count {
  font-size: 0.625rem;
  font-weight: 600;
  padding: 0.125rem 0.5rem;
  border-radius: var(--radius-full);
  text-transform: none;
  letter-spacing: 0;
}

html.dark .results-count {
  background: var(--color-surface-dark);
  color: #64748b;
}

html:not(.dark) .results-count {
  background: #f1f5f9;
  color: #94a3b8;
}

.result-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: background 0.1s;
  margin-bottom: 0.125rem;
}

.result-item.selected {
  border: 1px solid oklch(from #197fe6 l c h / 0.2);
}

html.dark .result-item.selected { background: oklch(from #197fe6 l c h / 0.1); }
html:not(.dark) .result-item.selected { background: oklch(from #197fe6 l c h / 0.06); }

.result-icon-wrap {
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  flex-shrink: 0;
  margin-right: 1rem;
  transition: all 0.15s;
}

html.dark .result-icon-wrap { background: var(--color-surface-dark); color: #64748b; }
html.dark .result-icon-wrap.icon-selected { background: oklch(from #197fe6 l c h / 0.2); color: var(--color-primary); }
html:not(.dark) .result-icon-wrap { background: #f1f5f9; color: #94a3b8; }
html:not(.dark) .result-icon-wrap.icon-selected { background: oklch(from #197fe6 l c h / 0.12); color: var(--color-primary); }

.result-icon { font-size: 0.875rem; }

.result-content { flex: 1; min-width: 0; }

.result-title { font-size: 0.9375rem; font-weight: 500; }

html.dark .result-title { color: #cbd5e1; }
html.dark .result-item.selected .result-title { color: var(--color-text-heading); }
html:not(.dark) .result-title { color: #475569; }
html:not(.dark) .result-item.selected .result-title { color: #0f172a; }

.result-snippet {
  font-size: 0.75rem;
  margin-top: 0.25rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.5;
  word-break: break-all;
}

html.dark .result-snippet { color: #64748b; }
html:not(.dark) .result-snippet { color: #94a3b8; }

.result-path {
  font-size: 0.75rem;
  margin-top: 0.125rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

html.dark .result-path { color: #475569; }
html:not(.dark) .result-path { color: #94a3b8; }

.result-enter {
  font-size: 1.25rem;
  opacity: 0;
  transition: opacity 0.15s;
}

.result-enter.enter-visible { opacity: 1; color: var(--color-primary); }

/* Search highlight */
:deep(.search-highlight) {
  color: var(--color-primary);
  font-weight: 600;
}

/* Empty */
.search-empty { padding: 2rem; text-align: center; }
html.dark .search-empty { color: #475569; }
html:not(.dark) .search-empty { color: #94a3b8; }
.empty-icon { font-size: 2rem; margin-bottom: 0.5rem; opacity: 0.5; }

/* Initial */
.search-initial { padding: 2rem; text-align: center; }
.search-initial-text { font-size: 0.875rem; }
html.dark .search-initial-text { color: #475569; }
html:not(.dark) .search-initial-text { color: #94a3b8; }

/* Footer */
.search-footer {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 0.75rem 1.25rem;
}

html.dark .search-footer { background: #0a1016; border-top: 1px solid var(--color-border-dark); }
html:not(.dark) .search-footer { background: #f8fafc; border-top: 1px solid var(--color-border-light); }

.hint { display: flex; align-items: center; gap: 0.5rem; }
.hint-keys { display: flex; gap: 0.25rem; }

.hint-key {
  width: 1.25rem;
  height: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
}

.hint-key.wide { width: auto; padding: 0 0.375rem; }

html.dark .hint-key { background: var(--color-surface-dark); border: 1px solid var(--color-border-dark); color: #64748b; }
html:not(.dark) .hint-key { background: #fff; border: 1px solid var(--color-border-light); color: #94a3b8; }

.esc-key { font-size: 0.625rem; font-weight: 700; }
.hint-label { font-size: 0.6875rem; font-weight: 600; text-transform: uppercase; }
html.dark .hint-label { color: #475569; }
html:not(.dark) .hint-label { color: #94a3b8; }

/* Transitions */
.overlay-enter-active { transition: opacity 0.2s; }
.overlay-leave-active { transition: opacity 0.15s; }
.overlay-enter-from, .overlay-leave-to { opacity: 0; }

.modal-enter-active { transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1); }
.modal-leave-active { transition: all 0.15s ease; }
.modal-enter-from { opacity: 0; transform: translateY(-16px) scale(0.97); }
.modal-leave-to { opacity: 0; transform: translateY(-8px) scale(0.98); }
</style>
