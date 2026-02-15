import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// 【新增】引入 Highlight.js 的核心样式文件
// 这里使用了 'atom-one-dark' 主题，它提供了高对比度的深色代码背景，
// 无论主站是亮色还是暗色模式，都能提供清晰的代码阅读体验。
import 'highlight.js/styles/atom-one-dark.css'

// 引入全局样式 (需在 highlight.js 之后引入，以便处理层叠关系)
import './style.css'

const app = createApp(App)

app.use(router)

// 等待路由解析完成再挂载应用
// 这可以防止在页面刷新时，应用先渲染 '/' 路径导致短暂的"未找到内容"闪烁，
// 确保路由钩子执行完毕后再显示正确内容。
router.isReady().then(() => {
    app.mount('#app')
})