import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// 【修改说明】
// 移除了 'highlight.js/styles/atom-one-dark.css' 的引入。
// 我们将在 src/style.css 中通过 CSS 变量手动定义两套高亮主题（Github Light / One Dark），
// 以便完美支持亮色/深色模式切换，呈现 Typora 般的无缝体验。

import './style.css'

const app = createApp(App)

app.use(router)

// 等待路由准备就绪后挂载，避免页面闪烁
router.isReady().then(() => {
    app.mount('#app')
})