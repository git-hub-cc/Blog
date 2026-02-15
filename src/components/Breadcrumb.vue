<template>
  <nav v-if="breadcrumbs.length" class="breadcrumb" aria-label="Breadcrumb">
    <ol class="breadcrumb-list">
      <li v-for="(item, i) in breadcrumbs" :key="i" class="breadcrumb-item">
        <span v-if="!item.link || i === breadcrumbs.length - 1" class="breadcrumb-current" aria-current="page">
          {{ item.label }}
        </span>

        <router-link v-else :to="item.link" class="breadcrumb-link">
          {{ item.label }}
        </router-link>

        <span v-if="i < breadcrumbs.length - 1" class="material-icons-round breadcrumb-sep" aria-hidden="true">
          chevron_right
        </span>
      </li>
    </ol>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

// 接收外部传入的 meta，用于覆盖最后一个层级的显示标题（例如文章标题）
const props = defineProps({
  meta: { type: Object, default: () => ({}) }
})

const route = useRoute()

// 格式化路径段名称 (保留扩展性，目前直接返回原名)
function formatSegment(seg) {
  return seg;
}

const breadcrumbs = computed(() => {
  // 1. 总是从 Home 开始
  const items = [{ label: 'Docs', link: '/' }]

  // 2. 分割路径
  const segments = route.path.split('/').filter(Boolean)

  segments.forEach((seg, i) => {
    const isLast = i === segments.length - 1

    // 构建直到当前段的完整路径 (保留原始编码用于链接跳转，router 会自动处理)
    // 例如: ['guide', 'api'] -> /guide/api
    const segPath = '/' + segments.slice(0, i + 1).join('/')

    // 【关键修改】解码路径片段用于显示
    // 浏览器地址栏中的中文通常被编码，需解码为可读文本
    const decodedSeg = decodeURIComponent(seg)

    // 确定显示的标签
    // 如果是最后一个节点且 props.meta.title 存在，优先使用 meta.title (文章真实标题)
    // 否则使用路径段解码并格式化后的名称 (文件夹名)
    const label = (isLast && props.meta.title)
        ? props.meta.title
        : formatSegment(decodedSeg)

    items.push({
      label,
      link: segPath
    })
  })

  return items
})
</script>

<style scoped>
.breadcrumb {
  margin-bottom: 2rem;
}

.breadcrumb-list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  margin: 0;
  gap: 0.25rem;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  font-weight: 500;
}

.breadcrumb-link {
  text-decoration: none;
  padding: 0.25rem 0.375rem;
  border-radius: 4px;
  transition: all 0.15s;
}

html.dark .breadcrumb-link { color: #94a3b8; }
html.dark .breadcrumb-link:hover {
  color: var(--color-primary);
  background: rgba(255,255,255,0.05);
}

html:not(.dark) .breadcrumb-link { color: #64748b; }
html:not(.dark) .breadcrumb-link:hover {
  color: var(--color-primary);
  background: rgba(0,0,0,0.05);
}

.breadcrumb-current {
  padding: 0.25rem 0;
  cursor: default;
}

html.dark .breadcrumb-current { color: #e2e8f0; }
html:not(.dark) .breadcrumb-current { color: #1e293b; }

.breadcrumb-sep {
  font-size: 1rem;
  margin: 0 0.125rem;
  opacity: 0.5;
}

html.dark .breadcrumb-sep { color: #64748b; }
html:not(.dark) .breadcrumb-sep { color: #94a3b8; }
</style>