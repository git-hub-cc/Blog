<template>
  <div class="app-shell">
    <!-- Mobile Header (visible ≤1024px) -->
    <header class="mobile-header">
      <button class="mobile-menu-btn" @click="sidebarOpen = true" aria-label="Open menu">
        <span class="material-icons-round">menu</span>
      </button>
      <router-link to="/" class="mobile-brand">
        <div class="mobile-brand-icon">
          <span class="material-icons-round">auto_awesome</span>
        </div>
        <span class="mobile-brand-name">{{ config.title }}</span>
      </router-link>
      <button class="mobile-search-btn" @click="openSearch" aria-label="Search">
        <span class="material-icons-round">search</span>
      </button>
    </header>

    <!-- Sidebar backdrop (mobile) -->
    <transition name="fade">
      <div v-if="sidebarOpen" class="sidebar-backdrop" @click="sidebarOpen = false"></div>
    </transition>

    <Sidebar :mobile-open="sidebarOpen" @close="sidebarOpen = false" />
    <main class="main-area">
      <router-view v-slot="{ Component }">
        <transition name="page-fade" mode="out-in">
          <component :is="Component" :key="$route.path" />
        </transition>
      </router-view>
    </main>
    <SearchOverlay />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import Sidebar from './components/Sidebar.vue'
import SearchOverlay from './components/SearchOverlay.vue'
import config from './config.js'

const route = useRoute()
const sidebarOpen = ref(false)

function openSearch() {
  window.dispatchEvent(new CustomEvent('docblog:open-search'))
}

// Close sidebar on route change (mobile)
watch(() => route.path, () => {
  sidebarOpen.value = false
})
</script>

<style scoped>
.app-shell {
  display: flex;
  min-height: 100vh;
}

.main-area {
  flex: 1;
  min-width: 0;
}

/* ============ Mobile Header ============ */
.mobile-header {
  display: none;
}

@media (max-width: 1024px) {
  .app-shell {
    flex-direction: column;
  }

  .mobile-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 1rem;
    position: sticky;
    top: 0;
    z-index: 40;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }
}

html.dark .mobile-header {
  background: oklch(from #0a0f14 l c h / 0.85);
  border-bottom: 1px solid var(--color-border-dark);
}

html:not(.dark) .mobile-header {
  background: oklch(from #ffffff l c h / 0.85);
  border-bottom: 1px solid var(--color-border-light);
}

.mobile-menu-btn,
.mobile-search-btn {
  width: 2.25rem;
  height: 2.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  background: transparent;
  transition: all 0.15s;
}

html.dark .mobile-menu-btn,
html.dark .mobile-search-btn {
  color: var(--color-text-body);
}

html.dark .mobile-menu-btn:hover,
html.dark .mobile-search-btn:hover {
  background: var(--color-surface-dark);
  color: var(--color-text-heading);
}

html:not(.dark) .mobile-menu-btn,
html:not(.dark) .mobile-search-btn {
  color: #475569;
}

html:not(.dark) .mobile-menu-btn:hover,
html:not(.dark) .mobile-search-btn:hover {
  background: #f1f5f9;
  color: #0f172a;
}

.mobile-brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
}

.mobile-brand-icon {
  width: 1.75rem;
  height: 1.75rem;
  background: var(--color-primary);
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}

.mobile-brand-icon .material-icons-round {
  font-size: 0.875rem;
}

.mobile-brand-name {
  font-weight: 700;
  font-size: 1rem;
  letter-spacing: -0.025em;
}

html.dark .mobile-brand-name { color: var(--color-text-heading); }
html:not(.dark) .mobile-brand-name { color: #0f172a; }

/* ============ Sidebar Backdrop ============ */
.sidebar-backdrop {
  position: fixed;
  inset: 0;
  z-index: 45;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

html.dark .sidebar-backdrop {
  background: oklch(from #020617 l c h / 0.5);
}

html:not(.dark) .sidebar-backdrop {
  background: oklch(from #0f172a l c h / 0.2);
}

/* ============ Page transition ============ */
.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.page-fade-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.page-fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

/* Fade for backdrop */
.fade-enter-active { transition: opacity 0.25s ease; }
.fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
