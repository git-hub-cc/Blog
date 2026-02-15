<template>
  <div class="nav-group" :style="{ '--depth': depth }">
    <div
        class="nav-group-header"
        :class="{
        'active': isGroupActive,
        'clickable': hasLink
      }"
        @dblclick="handleDoubleClick"
    >
      <component
          :is="hasLink ? 'router-link' : 'div'"
          :to="hasLink ? group.link : undefined"
          class="group-label"
          @click="handleLabelClick"
      >
        <span
            class="material-icons-round group-icon"
            :class="{ 'folder-open': !isCollapsed }"
        >
          {{ getIcon() }}
        </span>
        <span class="group-title-text">{{ group.title }}</span>
      </component>

      <button
          v-if="group.collapsible"
          class="collapse-btn"
          :class="{ rotated: !isCollapsed }"
          @click.stop.prevent="toggle"
          aria-label="Toggle folder"
      >
        <span class="material-icons-round collapse-icon">expand_more</span>
      </button>

      <span v-else-if="group.items" class="group-count">{{ totalCount }}</span>
    </div>

    <div
        class="nav-group-content"
        ref="contentRef"
        :style="contentStyle"
    >
      <ul v-if="group.items && group.items.length" class="nav-list">
        <li v-for="(item, ii) in group.items" :key="ii">
          <router-link
              :to="item.link"
              class="nav-item"
              :class="{ active: isActive(item.link) }"
          >
            <span class="material-icons-round nav-icon">{{ item.icon || 'description' }}</span>
            <span class="nav-item-text">{{ item.title }}</span>
          </router-link>
        </li>
      </ul>

      <NavGroup
          v-for="(child, ci) in group.children"
          :key="'child-' + ci"
          :group="child"
          :depth="depth + 1"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, watch } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  group: { type: Object, required: true },
  depth: { type: Number, default: 0 },
})

const route = useRoute()
const isCollapsed = ref(false)
const contentRef = ref(null)
const contentHeight = ref('auto')
const isAnimating = ref(false)

// 判断是否有链接（通常自动生成的目录树节点会有 link 属性）
const hasLink = computed(() => !!props.group.link)

// 判断当前组本身是否处于激活状态（用户正好点击了该目录）
const isGroupActive = computed(() => {
  // 移除尾部斜杠比较
  const current = route.path.replace(/\/$/, '')
  const link = (props.group.link || '').replace(/\/$/, '')
  return hasLink.value && current === link
})

// 获取图标：展开时显示打开的文件夹，折叠时显示闭合文件夹
function getIcon() {
  if (props.group.collapsible) {
    return isCollapsed.value ? 'folder' : 'folder_open'
  }
  return 'inventory_2'
}

// 判断子项目是否激活
function isActive(link) {
  return route.path === link || route.path === link + '/'
}

// 递归检查当前路由是否在组内（用于自动展开）
function isRouteInGroup(group) {
  // 1. 检查当前路径是否就是该组的路径
  if (group.link && isActive(group.link)) return true

  // 2. 检查子文件
  if (group.items) {
    for (const item of group.items) {
      if (isActive(item.link)) return true
    }
  }
  // 3. 递归检查子目录
  if (group.children) {
    for (const child of group.children) {
      if (isRouteInGroup(child)) return true
    }
  }
  return false
}

const totalCount = computed(() => {
  function count(g) {
    let n = (g.items ? g.items.length : 0)
    if (g.children) {
      for (const c of g.children) n += count(c)
    }
    return n
  }
  return count(props.group)
})

const contentStyle = computed(() => {
  if (!props.group.collapsible) return {}
  if (isCollapsed.value) {
    return { maxHeight: '0px', opacity: '0', overflow: 'hidden' }
  }
  return {
    maxHeight: isAnimating.value ? contentHeight.value : 'none',
    opacity: '1',
    overflow: isAnimating.value ? 'hidden' : 'visible',
  }
})

// 如果没有链接，点击标签也触发展开/折叠
function handleLabelClick(e) {
  if (!hasLink.value && props.group.collapsible) {
    toggle()
  }
}

// === 新增：处理双击事件 ===
function handleDoubleClick(e) {
  // 仅针对可折叠的组生效
  if (props.group.collapsible) {
    e.preventDefault() // 阻止浏览器默认的“选中文字”行为
    toggle()           // 执行折叠/展开逻辑
  }
}

function toggle() {
  if (!props.group.collapsible) return
  isAnimating.value = true

  if (!isCollapsed.value) {
    // 折叠逻辑
    if (contentRef.value) {
      contentHeight.value = contentRef.value.scrollHeight + 'px'
    }
    requestAnimationFrame(() => {
      isCollapsed.value = true
      setTimeout(() => { isAnimating.value = false }, 250)
    })
  } else {
    // 展开逻辑
    isCollapsed.value = false
    nextTick(() => {
      if (contentRef.value) {
        contentHeight.value = contentRef.value.scrollHeight + 'px'
      }
      setTimeout(() => { isAnimating.value = false }, 250)
    })
  }
}

onMounted(() => {
  if (props.group.collapsible) {
    // 如果当前路由在组内，则初始保持展开
    isCollapsed.value = !isRouteInGroup(props.group)
  }
})

watch(() => route.path, () => {
  if (props.group.collapsible && isRouteInGroup(props.group)) {
    isCollapsed.value = false
  }
})
</script>

<style scoped>
.nav-group {
  margin-bottom: 0.25rem;
}

/* === 头部布局 === */
.nav-group-header {
  display: flex;
  align-items: stretch; /* 让子元素高度填满 */
  width: 100%;
  margin: 0 0 0.125rem 0;
  border-radius: var(--radius-md);
  transition: background 0.15s;
  padding-left: calc(0.5rem + var(--depth, 0) * 0.75rem); /* 缩进控制 */
  min-height: 2rem;
  user-select: none; /* 建议添加：防止双击时选中文字（虽然js阻止了，但css双重保险） */
}

/* 悬停效果 */
html.dark .nav-group-header:hover { background: rgba(255,255,255,0.03); }
html:not(.dark) .nav-group-header:hover { background: rgba(0,0,0,0.03); }

/* 激活状态 (当前选中的目录) */
html.dark .nav-group-header.active {
  background: oklch(from var(--color-primary) l c h / 0.15);
  color: var(--color-primary);
}
html:not(.dark) .nav-group-header.active {
  background: oklch(from var(--color-primary) l c h / 0.1);
  color: var(--color-primary);
}

/* === 左侧标签 (Icon + Text) === */
.group-label {
  flex: 1;
  display: flex;
  align-items: center;
  padding: 0.375rem 0;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  font-size: 0.875rem;
  font-weight: 500;
  min-width: 0; /* 防止文本溢出撑开 */
}

/* 如果没有链接，鼠标指针改为默认 */
.nav-group-header:not(.clickable) .group-label {
  cursor: default;
}

.group-icon {
  font-size: 1.125rem;
  margin-right: 0.5rem;
  flex-shrink: 0;
  transition: color 0.15s;
}

/* 普通状态下的图标颜色 */
html.dark .nav-group-header:not(.active) .group-icon { color: #64748b; }
html:not(.dark) .nav-group-header:not(.active) .group-icon { color: #94a3b8; }

.group-title-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* === 右侧折叠按钮 === */
.collapse-btn {
  width: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  cursor: pointer;
  color: inherit;
  border-radius: var(--radius-sm);
  margin-left: 0.25rem;
}

html.dark .collapse-btn { color: #64748b; }
html:not(.dark) .collapse-btn { color: #94a3b8; }

.collapse-btn:hover {
  background: rgba(128,128,128, 0.1);
}

.active .collapse-btn {
  color: currentColor; /* 激活时跟随文字颜色 */
}

.collapse-icon {
  font-size: 1.125rem;
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.collapse-btn.rotated .collapse-icon {
  transform: rotate(-90deg);
}

.group-count {
  font-size: 0.625rem;
  padding: 0 0.5rem;
  opacity: 0.5;
  display: flex;
  align-items: center;
}

/* === 内容区动画 === */
.nav-group-content {
  transition: max-height 0.25s cubic-bezier(0.4, 0, 0.2, 1),
  opacity 0.2s ease;
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-list li {
  margin-bottom: 0.125rem;
}

/* 针对子项目的简单样式修正 */
.nav-item {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.375rem 0.75rem;
  padding-left: calc(0.75rem + var(--depth, 0) * 0.75rem + 1rem); /* 子项比父项多缩进 */
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  text-decoration: none;
  transition: all 0.15s;
}

html.dark .nav-item { color: #94a3b8; }
html.dark .nav-item:hover {
  background: rgba(255,255,255,0.03);
  color: var(--color-text-heading);
}
html.dark .nav-item.active {
  background: oklch(from var(--color-primary) l c h / 0.15);
  color: var(--color-primary);
  font-weight: 500;
}

html:not(.dark) .nav-item { color: #64748b; }
html:not(.dark) .nav-item:hover {
  background: rgba(0,0,0,0.03);
  color: #0f172a;
}
html:not(.dark) .nav-item.active {
  background: oklch(from var(--color-primary) l c h / 0.1);
  color: var(--color-primary);
  font-weight: 500;
}
</style>