<template>
  <div class="dir-view-container">
    <Breadcrumb :meta="{ title: currentDirName }" />

    <header class="dir-header">
      <div class="dir-icon-wrapper">
        <span class="material-icons-round dir-hero-icon">folder_open</span>
      </div>
      <div class="dir-info">
        <h1 class="dir-title">{{ currentDirName }}</h1>
        <p class="dir-meta">
          {{ folders.length }} 个文件夹, {{ files.length }} 篇文章
        </p>
      </div>
    </header>

    <section v-if="folders.length > 0" class="section-group">
      <h3 class="section-title">子目录</h3>
      <div class="folder-grid">
        <router-link
            v-for="folder in folders"
            :key="folder.path"
            :to="folder.path"
            class="folder-card"
        >
          <span class="material-icons-round folder-icon">folder</span>
          <span class="folder-name">{{ folder.name }}</span>
          <span class="material-icons-round folder-arrow">chevron_right</span>
        </router-link>
      </div>
    </section>

    <section v-if="files.length > 0" class="section-group">
      <h3 class="section-title">文章列表</h3>
      <div class="article-list">
        <router-link
            v-for="(doc, i) in files"
            :key="i"
            :to="doc.link"
            class="article-card"
        >
          <div class="article-main">
            <h2 class="article-title">{{ doc.title }}</h2>
            <p v-if="doc.description" class="article-desc">{{ doc.description }}</p>

            <div class="article-meta" v-if="doc.date || doc.tags.length">
              <span v-if="doc.date" class="meta-item date">
                <span class="material-icons-round meta-icon">calendar_today</span>
                {{ doc.date }}
              </span>
              <div v-if="doc.tags.length" class="meta-tags">
                <span v-for="tag in doc.tags" :key="tag" class="tag-pill">{{ tag }}</span>
              </div>
            </div>
          </div>
          <div class="article-action">
            <span class="material-icons-round action-icon">arrow_forward</span>
          </div>
        </router-link>
      </div>
    </section>

    <div v-if="folders.length === 0 && files.length === 0" class="empty-state">
      <span class="material-icons-round empty-icon">folder_off</span>
      <p>此文件夹为空</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { getFlatDocs } from '../docs/loader.js'
import Breadcrumb from './Breadcrumb.vue'

// 接收父组件(DocView)传入的当前路径 (应为已解码路径)
const props = defineProps({
  currentPath: { type: String, required: true }
})

/**
 * 辅助函数：格式化名称
 */
function formatName(rawName) {
  return rawName;
}

/**
 * 计算属性：当前目录名称
 * 用于显示在页面大标题和面包屑上
 */
const currentDirName = computed(() => {
  if (props.currentPath === '/' || props.currentPath === '') return '首页'
  const segments = props.currentPath.split('/').filter(Boolean)

  // 【关键修改】确保取出的目录名进行了解码处理
  // 防止直接刷新页面时，虽然父组件处理了，但为了鲁棒性这里再保险一次
  const rawName = segments[segments.length - 1] || '文档'
  return formatName(decodeURIComponent(rawName))
})

/**
 * 核心逻辑：分析所有文档路径，归类出当前层级的子目录和文件
 */
const dirContent = computed(() => {
  const allDocs = getFlatDocs()
  // 标准化当前路径：确保没有尾部斜杠，且不为空
  const basePath = props.currentPath === '/' ? '' : props.currentPath

  const subFoldersMap = new Map() // 用于去重子目录
  const directFiles = []

  allDocs.forEach(doc => {
    // 检查文档是否属于当前路径的下级
    // 注意：doc.link 通常由 loader 生成，若是中文路径，通常是未编码的中文字符串
    // 因此这里与 basePath (已解码) 进行比较是安全的
    if (doc.link.startsWith(basePath + '/')) {
      // 获取相对于当前路径的剩余部分
      // 例如 basePath='/guide', doc.link='/guide/advanced/intro' -> relative='advanced/intro'
      const relative = doc.link.slice(basePath.length + 1)
      const segments = relative.split('/')

      if (segments.length === 1) {
        // === 是直接文件 ===
        // 例如 relative='intro'
        directFiles.push(doc)
      } else {
        // === 是子目录 ===
        // 例如 relative='advanced/intro' -> 子目录名为 'advanced'
        const folderSlug = segments[0]
        if (!subFoldersMap.has(folderSlug)) {
          subFoldersMap.set(folderSlug, {
            // 【关键修改】子文件夹名称也进行解码，确保显示正确
            name: formatName(decodeURIComponent(folderSlug)),
            path: basePath + '/' + folderSlug
          })
        }
      }
    }
  })

  return {
    folders: Array.from(subFoldersMap.values()).sort((a, b) => a.name.localeCompare(b.name)),
    files: directFiles
  }
})

const folders = computed(() => dirContent.value.folders)
const files = computed(() => dirContent.value.files)
</script>

<style scoped>
.dir-view-container {
  max-width: 60rem;
  padding-bottom: 4rem;
}

/* === 头部样式 === */
.dir-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--color-border-light);
}

html.dark .dir-header { border-bottom-color: var(--color-border-dark); }

.dir-icon-wrapper {
  width: 4rem;
  height: 4rem;
  background: oklch(from var(--color-primary) l c h / 0.1);
  color: var(--color-primary);
  border-radius: var(--radius-xl);
  display: flex;
  align-items: center;
  justify-content: center;
}

.dir-hero-icon { font-size: 2rem; }

.dir-title {
  font-size: 2rem;
  font-weight: 800;
  margin: 0 0 0.5rem 0;
  line-height: 1.2;
}

html.dark .dir-title { color: var(--color-text-heading); }
html:not(.dark) .dir-title { color: #0f172a; }

.dir-meta {
  margin: 0;
  font-size: 0.875rem;
  color: var(--color-text-muted);
}

/* === 分区通用样式 === */
.section-group { margin-bottom: 3rem; }

.section-title {
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 1rem;
  color: var(--color-text-muted);
}

/* === 子目录 (Folders) Grid 样式 === */
.folder-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.folder-card {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  border-radius: var(--radius-md);
  text-decoration: none;
  border: 1px solid transparent;
  transition: all 0.2s ease;
  background: var(--color-surface-light);
}

html.dark .folder-card {
  background: rgba(255, 255, 255, 0.03);
  border-color: rgba(255, 255, 255, 0.05);
}

html:not(.dark) .folder-card {
  background: #ffffff;
  border-color: #e2e8f0;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}

.folder-card:hover {
  transform: translateY(-2px);
  border-color: var(--color-primary);
}

html.dark .folder-card:hover { background: rgba(255, 255, 255, 0.06); }
html:not(.dark) .folder-card:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.05); }

.folder-icon {
  color: #fbbf24; /* 经典的文件夹黄色 */
  font-size: 1.5rem;
}

html.dark .folder-icon { color: #fcd34d; }

.folder-name {
  flex: 1;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--color-text-heading);
}

html:not(.dark) .folder-name { color: #334155; }

.folder-arrow {
  font-size: 1.25rem;
  color: var(--color-text-muted);
  opacity: 0;
  transition: opacity 0.2s, transform 0.2s;
}

.folder-card:hover .folder-arrow {
  opacity: 1;
  transform: translateX(4px);
}

/* === 文件 (Files) List 样式 === */
.article-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.article-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-radius: var(--radius-lg);
  text-decoration: none;
  border: 1px solid transparent;
  transition: all 0.2s ease;
}

html.dark .article-card {
  background: rgba(255, 255, 255, 0.02);
  border-color: var(--color-border-dark);
}

html:not(.dark) .article-card {
  background: #ffffff;
  border-color: #e2e8f0;
}

.article-card:hover {
  border-color: var(--color-primary);
  transform: translateX(4px);
}

html.dark .article-card:hover { background: rgba(255, 255, 255, 0.04); }

.article-main { flex: 1; min-width: 0; padding-right: 1rem; }

.article-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 0.375rem 0;
  color: var(--color-text-heading);
}

html:not(.dark) .article-title { color: #0f172a; }

.article-card:hover .article-title { color: var(--color-primary); }

.article-desc {
  font-size: 0.875rem;
  color: var(--color-text-muted);
  margin: 0 0 0.75rem 0;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 元数据行 */
.article-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
  font-size: 0.75rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: var(--color-text-muted);
}

.meta-icon { font-size: 0.875rem; }

.meta-tags {
  display: flex;
  gap: 0.5rem;
}

.tag-pill {
  background: oklch(from var(--color-primary) l c h / 0.1);
  color: var(--color-primary);
  padding: 0 0.5rem;
  border-radius: 99px;
  font-weight: 600;
}

.article-action {
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.2s;
  color: var(--color-primary);
}

.article-card:hover .article-action {
  opacity: 1;
  transform: translateX(0);
}

/* === Empty State === */
.empty-state {
  text-align: center;
  padding: 4rem 0;
  color: var(--color-text-muted);
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 0.5rem;
  opacity: 0.5;
}

/* === 移动端适配 === */
@media (max-width: 640px) {
  .folder-grid { grid-template-columns: 1fr; }
  .article-card { padding: 1rem; }
  .article-action { display: none; }
}
</style>