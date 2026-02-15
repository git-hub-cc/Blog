<template>
  <aside class="sidebar" :class="{ 'mobile-open': mobileOpen }">
    <!-- Brand -->
    <div class="sidebar-header">
      <router-link to="/" class="brand">
        <div class="brand-icon">
          <span class="material-icons-round">auto_awesome</span>
        </div>
        <span class="brand-name">{{ config.title }}</span>
      </router-link>

      <!-- Search Trigger -->
      <button class="search-trigger" @click="openSearch">
        <span class="material-icons-round search-icon">search</span>
        <span class="search-placeholder">{{ config.search.placeholder }}</span>
        <kbd class="search-kbd">{{ isMac ? '⌘K' : 'Ctrl K' }}</kbd>
      </button>
    </div>

    <!-- Navigation -->
    <nav class="sidebar-nav">
      <NavGroup
        v-for="(group, gi) in sidebarGroups"
        :key="gi"
        :group="group"
        :depth="0"
      />
    </nav>

    <!-- Footer -->
    <div class="sidebar-footer">
      <button class="theme-toggle" @click="toggleTheme" :title="isDark ? 'Switch to Light' : 'Switch to Dark'">
        <span class="material-icons-round">{{ isDark ? 'light_mode' : 'dark_mode' }}</span>
      </button>
      <div class="social-links">
        <a
          v-for="(link, i) in config.socialLinks"
          :key="i"
          :href="link.link"
          target="_blank"
          rel="noopener"
          class="social-link"
          :aria-label="link.label || link.icon"
        >
          <span class="material-icons-round">{{ link.icon }}</span>
        </a>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import config from '../config.js'
import { getDocTree } from '../docs/loader.js'
import NavGroup from './NavGroup.vue'

const props = defineProps({
  mobileOpen: { type: Boolean, default: false }
})

const emit = defineEmits(['close'])

const route = useRoute()
const isDark = ref(true)
const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad|iPod/.test(navigator.userAgent)

// Use auto-generated tree; fall back to config.sidebar if defined
const sidebarGroups = computed(() => {
  const tree = getDocTree()
  return tree.length > 0 ? tree : (config.sidebar || [])
})

function toggleTheme() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('docblog-theme', isDark.value ? 'dark' : 'light')
}

function openSearch() {
  window.dispatchEvent(new CustomEvent('docblog:open-search'))
}

function handleKeydown(e) {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault()
    openSearch()
  }
}

onMounted(() => {
  const saved = localStorage.getItem('docblog-theme')
  if (saved === 'light') {
    isDark.value = false
    document.documentElement.classList.remove('dark')
  } else if (saved === 'dark') {
    isDark.value = true
    document.documentElement.classList.add('dark')
  } else {
    // No saved preference: respect system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    isDark.value = prefersDark
    document.documentElement.classList.toggle('dark', prefersDark)
  }
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.sidebar {
  width: 272px;
  height: 100vh;
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  overflow: hidden;
  transition: background-color 0.3s, border-color 0.3s;
}

html.dark .sidebar {
  background: var(--color-bg-dark);
  border-right: 1px solid var(--color-border-dark);
}

html:not(.dark) .sidebar {
  background: var(--color-surface-light);
  border-right: 1px solid var(--color-border-light);
}

/* Brand */
.sidebar-header {
  padding: 1.5rem;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  margin-bottom: 1.5rem;
}

.brand-icon {
  width: 2rem;
  height: 2rem;
  background: var(--color-primary);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}

.brand-icon .material-icons-round {
  font-size: 1rem;
}

.brand-name {
  font-weight: 700;
  font-size: 1.125rem;
  letter-spacing: -0.025em;
}

html.dark .brand-name { color: var(--color-text-heading); }
html:not(.dark) .brand-name { color: #0f172a; }

/* Search Trigger */
.search-trigger {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.5rem 0.75rem;
  border-radius: var(--radius-md);
  cursor: pointer;
  font-family: var(--font-display);
  font-size: 0.875rem;
  transition: all 0.15s;
  border: 1px solid;
}

html.dark .search-trigger {
  background: var(--color-surface-dark);
  border-color: var(--color-border-dark);
  color: #64748b;
}

html.dark .search-trigger:hover {
  border-color: var(--color-primary);
}

html:not(.dark) .search-trigger {
  background: #f8fafc;
  border-color: var(--color-border-light);
  color: #94a3b8;
}

html:not(.dark) .search-trigger:hover {
  border-color: var(--color-primary);
}

.search-icon {
  font-size: 1rem;
  margin-right: 0.5rem;
}

.search-placeholder {
  flex: 1;
  text-align: left;
}

.search-kbd {
  font-size: 0.625rem;
  font-weight: 600;
  padding: 0.125rem 0.375rem;
  border-radius: var(--radius-sm);
  font-family: var(--font-display);
}

html.dark .search-kbd {
  background: var(--color-bg-dark);
  border: 1px solid var(--color-border-dark);
  color: #64748b;
}

html:not(.dark) .search-kbd {
  background: #fff;
  border: 1px solid var(--color-border-light);
  color: #94a3b8;
  box-shadow: 0 1px 2px rgb(0 0 0 / 0.05);
}

/* Navigation */
.sidebar-nav {
  flex: 1;
  overflow-y: auto;
  padding: 0 1rem;
}

/* Footer */
.sidebar-footer {
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: border-color 0.3s;
}

html.dark .sidebar-footer {
  border-top: 1px solid var(--color-border-dark);
}

html:not(.dark) .sidebar-footer {
  border-top: 1px solid var(--color-border-light);
}

.theme-toggle {
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.15s;
  background: transparent;
  border: 1px solid;
}

html.dark .theme-toggle {
  border-color: var(--color-border-dark);
  color: #64748b;
}

html.dark .theme-toggle:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

html:not(.dark) .theme-toggle {
  border-color: var(--color-border-light);
  color: #94a3b8;
}

html:not(.dark) .theme-toggle:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.theme-toggle .material-icons-round {
  font-size: 1.125rem;
}

.social-links {
  display: flex;
  gap: 0.75rem;
}

.social-link {
  transition: color 0.15s;
}

html.dark .social-link { color: #94a3b8; }
html.dark .social-link:hover { color: var(--color-primary); }
html:not(.dark) .social-link { color: #94a3b8; }
html:not(.dark) .social-link:hover { color: var(--color-primary); }

.social-link .material-icons-round {
  font-size: 1.125rem;
}

@media (max-width: 1024px) {
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 50;
    transform: translateX(-100%);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                box-shadow 0.3s ease;
    box-shadow: none;
  }

  .sidebar.mobile-open {
    transform: translateX(0);
    box-shadow: 4px 0 24px rgb(0 0 0 / 0.25);
  }
}
</style>
