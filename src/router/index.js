import { createRouter, createWebHistory } from 'vue-router'
import DocView from '../views/DocView.vue'

// 这里的 loader 导入是为了保留可能的扩展性，但在本文件逻辑中主要依赖组件内部处理
// import { getFlatDocs } from '../docs/loader.js'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            // [修改] 不再自动重定向到第一个文档
            // 而是让 DocView 处理根目录的显示（通常是显示根目录下的文件夹列表）
            component: DocView,
        },
        {
            // 捕获所有子路径
            path: '/:slug(.*)',
            name: 'doc',
            component: DocView,
        },
    ],
    scrollBehavior(to, from, savedPosition) {
        // 如果有哈希锚点，平滑滚动
        if (to.hash) {
            return {
                el: to.hash,
                behavior: 'smooth',
                top: 24 // 顶部偏移量，避免被吸顶 Header 遮挡
            }
        }
        // 如果是浏览器后退，保持位置
        if (savedPosition) {
            return savedPosition
        }
        // 默认滚动到顶部
        return { top: 0, behavior: 'smooth' }
    },
})

export default router