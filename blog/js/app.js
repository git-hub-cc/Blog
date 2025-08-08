/**
 * @file app.js
 * @description 应用程序的主入口文件。
 * 负责初始化所有模块和设置全局事件监听器。
 */

import * as api from './api.js';
import * as ui from './ui.js';
import { initializeRouter } from './router.js';

// 当 DOM 内容完全加载并解析后，开始执行应用初始化。
document.addEventListener('DOMContentLoaded', () => {

    /**
     * 初始化整个应用程序。
     * 这是一个异步函数，因为它需要等待文章索引的加载。
     * @async
     */
    async function init() {
        // 1. 初始化主题（检查本地存储或系统偏好）
        ui.initializeTheme();

        // 2. 设置全局事件监听器
        initializeEventListeners();

        try {
            // 3. 获取文章数据
            let posts = await api.fetchPostsIndex();

            // 4. 按日期对文章进行降序排序
            posts.sort((a, b) => new Date(b.date) - new Date(a.date));

            // 5. 使用排序后的文章数据初始化路由器
            initializeRouter(posts);
        } catch (error) {
            console.error('初始化失败:', error);
            ui.showError(`初始化失败：无法加载文章索引。<br>请检查 ${config.postsIndex} 文件是否存在且格式正确。`);
        }
    }

    /**
     * 设置应用程序的全局事件监听器。
     * 这样可以避免在各模块中分散地添加监听器。
     */
    function initializeEventListeners() {
        const menuToggle = document.getElementById('toggle-menu');
        const sidebar = document.querySelector('.left-sidebar');
        const searchForm = document.getElementById('search-form');
        const searchInput = document.getElementById('search-input');
        const mainContentWrapper = document.getElementById('main-content-wrapper');

        // 移动端菜单切换按钮
        if (menuToggle && sidebar) {
            menuToggle.addEventListener('click', () => {
                sidebar.classList.toggle('is-active');
            });
        }

        // 搜索表单提交事件
        if (searchForm && searchInput) {
            searchForm.addEventListener('submit', (e) => {
                e.preventDefault(); // 阻止表单默认的提交行为
                const query = searchInput.value.trim();
                // 通过更新 URL hash 来触发搜索路由
                window.location.hash = query ? `#/search/${encodeURIComponent(query)}` : '#/';
            });
        }

        // 使用事件委托处理文章摘要卡片的点击事件，以提高性能。
        // 无需为每个卡片都绑定一个事件。
        if (mainContentWrapper) {
            mainContentWrapper.addEventListener('click', (event) => {
                const postSummary = event.target.closest('.post-summary');

                // 确保点击的是卡片本身，而不是卡片内的链接（如标签链接）。
                if (postSummary && event.target.tagName !== 'A') {
                    event.preventDefault();
                    const fileName = postSummary.dataset.postFile;
                    if (fileName) {
                        // 通过更新 URL hash 导航到文章详情页
                        window.location.hash = `#/post=${fileName}`;
                    }
                }
            });
        }
    }

    // --- 启动应用程序 ---
    init();
});