<template>
  <div class="doc-view">
    <div class="doc-container">

      <DirListView
          v-if="isDir && !hasDirectContent"
          :current-path="currentPath"
      />

      <article v-else-if="hasDirectContent" class="doc-article">
        <Breadcrumb :meta="meta" />

        <header v-if="meta.title" class="doc-header">
          <h1 class="doc-title">{{ meta.title }}</h1>
          <p v-if="meta.description" class="doc-description">{{ meta.description }}</p>
        </header>

        <div class="markdown-body" v-html="renderedHtml"></div>

        <Pagination :current-path="currentPath" />
      </article>

      <div v-else class="not-found-state">
        <span class="material-icons-round not-found-icon">folder_off</span>
        <h2 class="not-found-title">未找到内容</h2>
        <p class="not-found-text">该路径下不存在文档或目录。</p>
        <router-link to="/" class="back-home-btn">返回首页</router-link>
      </div>

      <TocAside v-if="hasDirectContent && headings.length" :headings="headings" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getDocByRoute, getDocsInDir } from '../docs/loader.js'
import config from '../config.js'
import { createMarkdownRenderer, parseFrontmatter, extractToc } from '../markdown/renderer.js'
import Breadcrumb from '../components/Breadcrumb.vue'
import TocAside from '../components/TocAside.vue'
import Pagination from '../components/Pagination.vue'
import DirListView from '../components/DirListView.vue'

const route = useRoute()
const md = createMarkdownRenderer()

// --- 状态定义 ---
const rawContent = ref('')
const meta = ref({})
const renderedHtml = ref('')
const headings = ref([])
const hasDirectContent = ref(false) // 是否有直接对应的 .md 文件
const isDir = ref(false)            // 是否是一个包含文件的目录

/**
 * 计算属性：规范化当前路径
 * * 【重要修改】
 * 浏览器地址栏中的中文路径会自动被编码（如 %E6%96%...），
 * 这里必须使用 decodeURIComponent 进行解码，否则会导致：
 * 1. 无法在 loader 中匹配到正确的文件名
 * 2. 页面标题和面包屑显示乱码
 */
const currentPath = computed(() => {
  // 1. 解码路径 (处理中文)
  let path = decodeURIComponent(route.path)

  // 2. 去除尾部斜杠 (统一格式，根路径除外)
  if (path.endsWith('/') && path !== '/') {
    path = path.slice(0, -1)
  }

  return path
})

/**
 * 加载文档逻辑
 * 根据解码后的 path 查找文件或目录
 */
function loadDoc(path) {
  // 1. 尝试获取直接对应的文档内容
  const raw = getDocByRoute(path)

  if (raw) {
    // === 是文件 ===
    hasDirectContent.value = true
    const parsed = parseFrontmatter(raw)
    meta.value = parsed.meta

    // 如果 Markdown 内容中包含一级标题且与 Frontmatter 标题重复，则移除内容中的标题
    let contentToRender = parsed.content
    if (parsed.meta.title) {
      const h1Match = contentToRender.match(/^\s*#\s+(.+)/)
      if (h1Match && h1Match[1].trim() === parsed.meta.title.trim()) {
        contentToRender = contentToRender.replace(/^\s*#\s+.+\n?/, '')
      }
    }

    rawContent.value = contentToRender
    renderedHtml.value = md.render(contentToRender)
    headings.value = extractToc(md, contentToRender)

    document.title = parsed.meta.title
        ? `${parsed.meta.title} - ${config.title}`
        : config.title
  } else {
    // === 不是文件，重置文件相关状态 ===
    hasDirectContent.value = false
    renderedHtml.value = ''
    headings.value = []
    meta.value = {}
  }

  // 2. 检测是否为目录
  // 逻辑：如果该路径下能找到子文档，或者它是根路径，则视为目录
  const children = getDocsInDir(path)
  isDir.value = children.length > 0 || path === '/'

  // 3. 设置页面标题 (SEO)
  if (!hasDirectContent.value && !isDir.value) {
    document.title = `未找到页面 - ${config.title}`
  } else if (!hasDirectContent.value && isDir.value) {
    // 如果是纯目录视图，显示目录名
    const segments = path.split('/').filter(Boolean)
    const dirName = segments.length ? segments[segments.length - 1] : '首页'
    document.title = `${dirName} - ${config.title}`
  }
}

// 监听计算后的路径变化 (解码后的)，立即执行加载
watch(currentPath, (newPath) => {
  loadDoc(newPath)
}, { immediate: true })
</script>

<style scoped>
.doc-view {
  max-width: 80rem;
  margin: 0 auto;
  padding: 3rem 2rem 3rem 3rem;
  /* 确保最小高度，防止 footer 上浮 */
  min-height: calc(100vh - 4rem);
}

.doc-container {
  display: flex;
  gap: 3rem;
  position: relative;
}

.doc-article {
  flex: 1;
  min-width: 0;
  max-width: 52rem;
}

.doc-header {
  margin-bottom: 2.5rem;
  border-bottom: 1px solid transparent;
  padding-bottom: 1rem;
}

/* 标题样式增强 */
.doc-title {
  font-size: 2.5rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.2;
  margin: 0 0 0.75rem 0;
}

html.dark .doc-title { color: var(--color-text-heading); }
html:not(.dark) .doc-title { color: #0f172a; }

.doc-description {
  font-size: 1.125rem;
  line-height: 1.6;
  margin: 0;
  font-weight: 300;
}

html.dark .doc-description { color: #94a3b8; }
html:not(.dark) .doc-description { color: #64748b; }

/* === 404 状态样式 === */
.not-found-state {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 4rem 0;
  color: var(--color-text-muted);
}

.not-found-icon {
  font-size: 4rem;
  opacity: 0.3;
  margin-bottom: 1rem;
}

.not-found-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  color: var(--color-text-heading);
}

.back-home-btn {
  margin-top: 1.5rem;
  color: var(--color-primary);
  font-weight: 600;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-primary-border);
  border-radius: var(--radius-md);
  transition: all 0.2s;
}

.back-home-btn:hover {
  background: var(--color-primary-light);
}

/* === 响应式调整 === */
@media (max-width: 1280px) {
  .doc-view { padding: 2rem 1.5rem; }
}

@media (max-width: 768px) {
  .doc-view { padding: 1.5rem 1rem; }
  .doc-title { font-size: 2rem; }
  .doc-container { flex-direction: column; }
}
</style>