<template>
  <aside v-if="headings.length" class="toc-aside">
    <h4 class="toc-title">ON THIS PAGE</h4>
    <nav class="toc-nav">
      <a
          v-for="(h, i) in headings"
          :key="i"
          :href="`#${h.slug}`"
          class="toc-link"
          :class="{
          active: activeSlug === h.slug,
          'is-h3': h.level === 3,
        }"
          @click.prevent="scrollTo(h.slug)"
      >
        {{ h.text }}
      </a>
    </nav>

    <div class="toc-card">
      <h5 class="toc-card-title">Need help?</h5>
      <p class="toc-card-text">Can't find what you're looking for? Talk to our support team.</p>
      <button class="toc-card-btn" @click="showContact = true">Contact Us</button>
    </div>
  </aside>

  <Teleport to="body">
    <button
        v-if="headings.length"
        class="toc-fab"
        @click="tocDrawerOpen = true"
        aria-label="Table of contents"
    >
      <span class="material-icons-round">toc</span>
    </button>

    <transition name="toc-drawer-backdrop">
      <div v-if="tocDrawerOpen" class="toc-drawer-backdrop" @click="tocDrawerOpen = false"></div>
    </transition>
    <transition name="toc-drawer">
      <div v-if="tocDrawerOpen" class="toc-drawer">
        <div class="toc-drawer-header">
          <h4 class="toc-title" style="margin:0">ON THIS PAGE</h4>
          <button class="toc-drawer-close" @click="tocDrawerOpen = false">
            <span class="material-icons-round">close</span>
          </button>
        </div>
        <nav class="toc-nav toc-drawer-nav">
          <a
              v-for="(h, i) in headings"
              :key="'m'+i"
              :href="`#${h.slug}`"
              class="toc-link"
              :class="{
              active: activeSlug === h.slug,
              'is-h3': h.level === 3,
            }"
              @click.prevent="scrollTo(h.slug); tocDrawerOpen = false"
          >
            {{ h.text }}
          </a>
        </nav>
      </div>
    </transition>
  </Teleport>

  <Teleport to="body">
    <transition name="contact-overlay">
      <div v-if="showContact" class="contact-overlay" @click.self="showContact = false">
        <transition name="contact-modal" appear>
          <div v-if="showContact" class="contact-modal">
            <button class="contact-close-btn" @click="showContact = false">
              <span class="material-icons-round">close</span>
            </button>
            <div class="contact-body">
              <span class="material-icons-round contact-wechat-icon">chat</span>
              <h3 class="contact-title">微信联系我们</h3>
              <div class="contact-qr-wrap">
                <img
                    v-if="!imgError"
                    :src="isDark ? '/wechat-qr-dark.png' : '/wechat-qr.png'"
                    alt="WeChat QR Code"
                    class="contact-qr-img"
                    @error="imgError = true"
                />
                <div v-else class="contact-qr-placeholder">
                  <span class="material-icons-round" style="font-size:3rem;opacity:0.3">qr_code_2</span>
                  <p style="margin:0.5rem 0 0;font-size:0.75rem;opacity:0.5">
                    请将二维码放置到 public/wechat-qr{{ isDark ? '-dark' : '' }}.png
                  </p>
                </div>
              </div>
              <p class="contact-desc">扫描上方二维码添加微信</p>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </Teleport>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'

const props = defineProps({
  headings: { type: Array, default: () => [] }
})

const activeSlug = ref('')
const showContact = ref(false)
const imgError = ref(false)
const tocDrawerOpen = ref(false)

// 【新增】用于追踪深色模式状态
const isDark = ref(false)
let observer = null

function scrollTo(slug) {
  const el = document.getElementById(slug)
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 24
    window.scrollTo({ top, behavior: 'smooth' })
    activeSlug.value = slug
  }
}

function onScroll() {
  if (!props.headings.length) return

  let current = ''
  for (const h of props.headings) {
    const el = document.getElementById(h.slug)
    if (el) {
      const rect = el.getBoundingClientRect()
      if (rect.top <= 80) {
        current = h.slug
      }
    }
  }
  activeSlug.value = current
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()

  // 【新增】初始化并监听深色模式变化
  // 1. 初始化
  isDark.value = document.documentElement.classList.contains('dark')

  // 2. 使用 MutationObserver 监听 html 标签的 class 属性变化
  observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'class') {
        isDark.value = document.documentElement.classList.contains('dark')
      }
    })
  })

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  // 【新增】清理观察者
  if (observer) {
    observer.disconnect()
  }
})

watch(() => props.headings, () => {
  activeSlug.value = ''
  requestAnimationFrame(onScroll)
})
</script>

<style scoped>
.toc-aside {
  width: 14rem;
  position: sticky;
  top: 3rem;
  height: fit-content;
  flex-shrink: 0;
}

.toc-title {
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  margin: 0 0 1rem 0;
}

html.dark .toc-title { color: #64748b; }
html:not(.dark) .toc-title { color: #94a3b8; }

.toc-nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border-left: 2px solid;
}

html.dark .toc-nav { border-color: var(--color-border-dark); }
html:not(.dark) .toc-nav { border-color: var(--color-border-light); }

.toc-link {
  display: block;
  padding-left: 1rem;
  font-size: 0.8125rem;
  text-decoration: none;
  transition: all 0.15s;
  margin-left: -2px;
  border-left: 2px solid transparent;
}

.toc-link.is-h3 {
  padding-left: 1.5rem;
  font-size: 0.75rem;
}

html.dark .toc-link { color: #64748b; }
html.dark .toc-link:hover { color: var(--color-text-heading); }
html.dark .toc-link.active {
  color: var(--color-primary);
  border-left-color: var(--color-primary);
  font-weight: 500;
}

html:not(.dark) .toc-link { color: #94a3b8; }
html:not(.dark) .toc-link:hover { color: #0f172a; }
html:not(.dark) .toc-link.active {
  color: var(--color-primary);
  border-left-color: var(--color-primary);
  font-weight: 500;
}

/* Help Card */
.toc-card {
  margin-top: 2.5rem;
  padding: 1.25rem;
  border-radius: var(--radius-lg);
  border: 1px solid;
}

html.dark .toc-card {
  background: linear-gradient(135deg, oklch(from #197fe6 l c h / 0.08), transparent);
  border-color: oklch(from #197fe6 l c h / 0.15);
}

html:not(.dark) .toc-card {
  background: linear-gradient(135deg, oklch(from #197fe6 l c h / 0.05), transparent);
  border-color: oklch(from #197fe6 l c h / 0.12);
}

.toc-card-title {
  font-size: 0.875rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
}

html.dark .toc-card-title { color: var(--color-text-heading); }
html:not(.dark) .toc-card-title { color: #0f172a; }

.toc-card-text {
  font-size: 0.75rem;
  margin: 0 0 1rem 0;
  line-height: 1.5;
}

html.dark .toc-card-text { color: #64748b; }
html:not(.dark) .toc-card-text { color: #94a3b8; }

.toc-card-btn {
  width: 100%;
  padding: 0.5rem 1rem;
  background: var(--color-primary);
  color: #fff;
  border: none;
  border-radius: var(--radius-md);
  font-size: 0.75rem;
  font-weight: 700;
  font-family: var(--font-display);
  cursor: pointer;
  transition: all 0.15s;
  box-shadow: 0 4px 12px oklch(from #197fe6 l c h / 0.3);
}

.toc-card-btn:hover {
  background: var(--color-primary-hover);
  transform: translateY(-1px);
}

@media (max-width: 1280px) {
  .toc-aside {
    display: none;
  }
}

/* ============ Mobile TOC FAB ============ */
.toc-fab {
  display: none;
}

@media (max-width: 1280px) {
  .toc-fab {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: 1.5rem;
    right: 1.5rem;
    width: 3rem;
    height: 3rem;
    border-radius: var(--radius-full);
    border: none;
    cursor: pointer;
    z-index: 50;
    box-shadow: 0 4px 16px rgb(0 0 0 / 0.25);
    transition: transform 0.15s, box-shadow 0.15s;
    background: var(--color-primary);
    color: #fff;
  }

  .toc-fab:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgb(0 0 0 / 0.35);
  }
}

.toc-drawer-backdrop {
  position: fixed;
  inset: 0;
  z-index: 190;
  backdrop-filter: blur(4px);
}

html.dark .toc-drawer-backdrop { background: oklch(from #020617 l c h / 0.5); }
html:not(.dark) .toc-drawer-backdrop { background: oklch(from #0f172a l c h / 0.2); }

.toc-drawer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 18rem;
  max-width: 85vw;
  z-index: 195;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  box-shadow: -4px 0 24px rgb(0 0 0 / 0.2);
}

html.dark .toc-drawer {
  background: var(--color-bg-dark);
  border-left: 1px solid var(--color-border-dark);
}

html:not(.dark) .toc-drawer {
  background: #fff;
  border-left: 1px solid var(--color-border-light);
}

.toc-drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.25rem 1rem;
}

.toc-drawer-close {
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  background: transparent;
  transition: all 0.15s;
}

html.dark .toc-drawer-close { color: #64748b; }
html.dark .toc-drawer-close:hover { background: var(--color-surface-dark); color: var(--color-text-heading); }
html:not(.dark) .toc-drawer-close { color: #94a3b8; }
html:not(.dark) .toc-drawer-close:hover { background: #f1f5f9; color: #0f172a; }

.toc-drawer-nav {
  padding: 0 1.25rem 1.25rem;
  border-left: none;
}

/* Drawer transitions */
.toc-drawer-backdrop-enter-active { transition: opacity 0.25s ease; }
.toc-drawer-backdrop-leave-active { transition: opacity 0.2s ease; }
.toc-drawer-backdrop-enter-from, .toc-drawer-backdrop-leave-to { opacity: 0; }

.toc-drawer-enter-active { transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
.toc-drawer-leave-active { transition: transform 0.2s ease; }
.toc-drawer-enter-from { transform: translateX(100%); }
.toc-drawer-leave-to { transform: translateX(100%); }

/* ============ Contact Modal ============ */
.contact-overlay {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

html.dark .contact-overlay {
  background: oklch(from #020617 l c h / 0.65);
  backdrop-filter: blur(12px);
}

html:not(.dark) .contact-overlay {
  background: oklch(from #0f172a l c h / 0.3);
  backdrop-filter: blur(8px);
}

.contact-modal {
  position: relative;
  width: 100%;
  max-width: 22rem;
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.5);
}

html.dark .contact-modal {
  background: #0d141b;
  border: 1px solid var(--color-border-dark);
}

html:not(.dark) .contact-modal {
  background: #fff;
  border: 1px solid var(--color-border-light);
  box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.15);
}

.contact-close-btn {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  background: transparent;
  transition: all 0.15s;
  z-index: 1;
}

html.dark .contact-close-btn { color: #64748b; }
html.dark .contact-close-btn:hover { background: var(--color-surface-dark); color: var(--color-text-heading); }
html:not(.dark) .contact-close-btn { color: #94a3b8; }
html:not(.dark) .contact-close-btn:hover { background: #f1f5f9; color: #0f172a; }

.contact-close-btn .material-icons-round { font-size: 1.125rem; }

.contact-body {
  padding: 2.5rem 2rem 2rem;
  text-align: center;
}

.contact-wechat-icon {
  font-size: 2.5rem;
  color: #07c160;
  margin-bottom: 0.75rem;
}

.contact-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0 0 0.375rem 0;
}

html.dark .contact-title { color: var(--color-text-heading); }
html:not(.dark) .contact-title { color: #0f172a; }

.contact-desc {
  font-size: 0.875rem;
  margin: 0 0 1.5rem 0;
}

html.dark .contact-desc { color: #64748b; }
html:not(.dark) .contact-desc { color: #94a3b8; }

.contact-qr-wrap {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

.contact-qr-img {
  width: 200px;
  height: auto;
  border-radius: var(--radius-lg);
  object-fit: contain;
}

html.dark .contact-qr-img { border: 1px solid var(--color-border-dark); }
html:not(.dark) .contact-qr-img { border: 1px solid var(--color-border-light); }

.contact-qr-placeholder {
  width: 200px;
  height: 200px;
  border-radius: var(--radius-lg);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 1rem;
  box-sizing: border-box;
}

html.dark .contact-qr-placeholder {
  background: var(--color-surface-dark);
  border: 1px dashed var(--color-border-dark);
  color: #64748b;
}

html:not(.dark) .contact-qr-placeholder {
  background: #f8fafc;
  border: 1px dashed var(--color-border-light);
  color: #94a3b8;
}

.contact-hint {
  font-size: 0.75rem;
  margin: 0;
}

html.dark .contact-hint { color: #475569; }
html:not(.dark) .contact-hint { color: #94a3b8; }

/* Transitions */
.contact-overlay-enter-active { transition: opacity 0.25s ease; }
.contact-overlay-leave-active { transition: opacity 0.2s ease; }
.contact-overlay-enter-from, .contact-overlay-leave-to { opacity: 0; }

.contact-modal-enter-active { transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
.contact-modal-leave-active { transition: all 0.2s ease; }
.contact-modal-enter-from { opacity: 0; transform: scale(0.95) translateY(10px); }
.contact-modal-leave-to { opacity: 0; transform: scale(0.97) translateY(5px); }
</style>