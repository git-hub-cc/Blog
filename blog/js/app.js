document.addEventListener('DOMContentLoaded', () => {
    // --- 元素获取 ---
    const toggleSwitch = document.getElementById('dark-mode-switch');
    const menuToggle = document.getElementById('toggle-menu');
    const sidebar = document.querySelector('.left-sidebar');
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const mainContentWrapper = document.getElementById('main-content-wrapper');
    const paginationContainer = document.getElementById('pagination-container');

    // --- 全局配置 ---
    const config = {
        postsPerPage: 5,
        postsIndex: 'blog/posts.json',
        mdDir: 'blog/md/'
    };
    const colorSchemeKey = 'MyBlogColorScheme';
    let postsData = []; // 存储所有文章元数据

    // --- 深色模式切换 ---
    const osDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // applyScheme 函数现在只负责应用变更和更新 UI/localStorage
    function applyScheme(scheme) {
        document.documentElement.setAttribute('data-scheme', scheme);
        toggleSwitch.checked = (scheme === 'dark');
        localStorage.setItem(colorSchemeKey, scheme);
    }

    // 优化：这个函数现在只在页面加载时同步 UI，而不是决定和应用主题
    function initializeTheme() {
        // 从 HTML 标签读取已经由内联脚本设置好的主题
        const currentScheme = document.documentElement.getAttribute('data-scheme');
        // 同步开关的状态
        toggleSwitch.checked = (currentScheme === 'dark');

        // 为后续的用户交互和系统变化添加监听器
        toggleSwitch.addEventListener('change', (e) => applyScheme(e.target.checked ? 'dark' : 'light'));
        osDarkScheme.addEventListener('change', (e) => {
            // 仅在用户没有手动设置过主题时，才跟随系统变化
            if (!localStorage.getItem(colorSchemeKey)) {
                applyScheme(e.matches ? 'dark' : 'light');
            }
        });
    }


    // --- 移动端菜单 ---
    menuToggle.addEventListener('click', () => sidebar.classList.toggle('is-active'));

    // ... (从这里开始到文件末尾的所有其他代码保持不变) ...

    // --- 搜索功能 ---
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = searchInput.value.trim();
        if (query) {
            // 如果有搜索词，则跳转到搜索结果页
            window.location.hash = `#/search/${encodeURIComponent(query)}`;
        } else {
            // 如果搜索词为空，则跳转回首页
            window.location.hash = '#';
        }
    });

    // --- 文章列表点击处理（事件委托） ---
    // 将点击事件监听器添加到父容器，而不是每个文章摘要上，以提高性能。
    mainContentWrapper.addEventListener('click', (event) => {
        // event.target 是实际点击的元素
        // .closest('.post-summary') 查找最近的 class 为 post-summary 的祖先元素
        const postSummary = event.target.closest('.post-summary');
        if (postSummary) {
            // 阻止 <a> 标签的默认跳转行为，统一由 JS 处理哈希路由
            event.preventDefault();
            const fileName = postSummary.dataset.postFile;
            if (fileName) {
                window.location.hash = `#/post=${fileName}`;
            }
        }
    });

    // --- 博客核心逻辑 ---

    // 初始化函数，获取文章索引并设置路由监听
    async function init() {
        try {
            const response = await fetch(config.postsIndex);
            if (!response.ok) throw new Error(`网络响应错误，状态码: ${response.status}`);
            postsData = await response.json();
            // 首次加载和后续哈希变化时，都由 handleRouteChange 处理
            window.addEventListener('hashchange', handleRouteChange);
            handleRouteChange();
        } catch (error) {
            mainContentWrapper.innerHTML = `<p class="error">错误：无法加载文章索引。请检查 ${config.postsIndex} 是否存在且格式正确。</p>`;
            console.error('初始化失败:', error);
        }
    }

    // 路由处理函数，根据 URL 哈希值渲染不同内容
    function handleRouteChange() {
        sidebar.classList.remove('is-active'); // 关闭移动端菜单
        mainContentWrapper.classList.add('fade-out'); // 添加淡出效果

        // 延迟执行内容替换，让淡出动画有时间播放
        setTimeout(() => {
            const hash = window.location.hash;

            if (hash.startsWith('#/post=')) {
                const fileName = decodeURIComponent(hash.substring(7));
                renderSinglePost(fileName);
            } else if (hash.startsWith('#/category/')) {
                const parts = hash.substring(11).split('/page/');
                const category = decodeURIComponent(parts[0]);
                const page = parts[1] ? parseInt(parts[1], 10) : 1;
                renderPostList(category, page);
            } else if (hash.startsWith('#/search/')) {
                const query = decodeURIComponent(hash.substring(9));
                renderSearchResults(query);
            } else if (hash === '#/about') {
                renderAboutPage();
            } else {
                const pageMatch = hash.match(/#page=(\d+)/);
                const page = pageMatch ? parseInt(pageMatch[1], 10) : 1;
                renderPostList(null, page); // null 表示所有分类，即首页
            }
            window.scrollTo(0, 0); // 切换页面后滚动到顶部
            mainContentWrapper.classList.remove('fade-out'); // 移除淡出效果，内容变为可见
        }, 200);
    }

    // 渲染文章列表（首页或分类页）
    function renderPostList(category = null, page = 1) {
        paginationContainer.innerHTML = '';

        const filteredPosts = category ? postsData.filter(p => p.category === category) : postsData;

        if (filteredPosts.length === 0) {
            const categoryName = document.querySelector(`.nav-link[data-nav-id="${category}"]`)?.innerText || category;
            mainContentWrapper.innerHTML = `<p class="loader">分类“${categoryName}”下暂无文章。</p>`;
            updateActiveNav(category);
            return;
        }

        const totalPosts = filteredPosts.length;
        const totalPages = Math.ceil(totalPosts / config.postsPerPage);
        const startIndex = (page - 1) * config.postsPerPage;
        const postsToShow = filteredPosts.slice(startIndex, startIndex + config.postsPerPage);

        // 生成文章摘要的 HTML，不再需要 data-prevent-default 属性
        mainContentWrapper.innerHTML = postsToShow.map(post => `
            <article class="post-summary" data-post-file="${post.file}">
                <h2><a href="#/post=${post.file}">${post.title}</a></h2>
                <div class="meta">发布于 ${post.date}</div>
                <p>${post.summary}</p>
            </article>
        `).join('');

        renderPagination(page, totalPages, category);
        updateActiveNav(category || 'home');
    }

    // 渲染搜索结果
    function renderSearchResults(query) {
        paginationContainer.innerHTML = '';
        searchInput.value = query; // 同步搜索框内容

        const results = postsData.filter(p =>
            p.title.toLowerCase().includes(query.toLowerCase()) ||
            p.summary.toLowerCase().includes(query.toLowerCase())
        );

        let contentHTML = `<h1>搜索结果: "${query}"</h1>`;
        if (results.length > 0) {
            contentHTML += results.map(post => `
                <article class="post-summary" data-post-file="${post.file}">
                    <h2><a href="#/post=${post.file}">${post.title}</a></h2>
                    <div class="meta">发布于 ${post.date}</div>
                    <p>${post.summary}</p>
                </article>
            `).join('');
        } else {
            contentHTML += `<p class="loader">未找到与“${query}”相关的文章。</p>`;
        }
        mainContentWrapper.innerHTML = contentHTML;

        updateActiveNav(null); // 搜索结果页不激活任何导航链接
    }

    // 渲染分页组件
    function renderPagination(currentPage, totalPages, category) {
        if (totalPages <= 1) return;

        const pageLink = (page) => {
            if (category) {
                return `#/category/${category}/page/${page}`;
            }
            return `#page=${page}`;
        };

        let paginationHTML = `<a href="${pageLink(currentPage - 1)}" class="page-nav ${currentPage === 1 ? 'disabled' : ''}">« 上一页</a>`;
        for (let i = 1; i <= totalPages; i++) {
            paginationHTML += `<a href="${pageLink(i)}" class="page-num ${i === currentPage ? 'active' : ''}">${i}</a>`;
        }
        paginationHTML += `<a href="${pageLink(currentPage + 1)}" class="page-nav ${currentPage === totalPages ? 'disabled' : ''}">下一页 »</a>`;
        paginationContainer.innerHTML = paginationHTML;
    }

    // 渲染单篇文章
    async function renderSinglePost(fileName) {
        mainContentWrapper.innerHTML = '<div class="loader">正在加载文章...</div>';
        paginationContainer.innerHTML = '';
        try {
            const response = await fetch(`${config.mdDir}${fileName}`);
            if (!response.ok) throw new Error('文章未找到');
            const markdownText = await response.text();
            const postMeta = postsData.find(p => p.file === fileName);

            mainContentWrapper.innerHTML = `
                <article class="post-content">
                    <h1>${postMeta ? postMeta.title : '无标题'}</h1>
                    ${postMeta ? `<div class="meta">发布于 ${postMeta.date}</div>` : ''}
                    ${marked.parse(markdownText)}
                </article>
            `;
            hljs.highlightAll(); // 应用代码高亮
            addCopyButtons();    // 为代码块添加复制按钮
            updateActiveNav(postMeta ? postMeta.category : null);
        } catch (error) {
            mainContentWrapper.innerHTML = `<p class="error">错误：无法加载文章 "${fileName}"。<br>请检查文件是否存在于 '${config.mdDir}${fileName}'</p>`;
            console.error('加载文章失败:', error);
        }
    }

    // 渲染“关于”页面
    async function renderAboutPage() {
        mainContentWrapper.innerHTML = '<div class="loader">正在加载...</div>';
        paginationContainer.innerHTML = '';
        try {
            const response = await fetch(`${config.mdDir}about.md`);
            if (!response.ok) throw new Error('“关于”页面未找到');
            const markdownText = await response.text();
            mainContentWrapper.innerHTML = `
                <article class="post-content">
                    <h1>关于</h1>
                    ${marked.parse(markdownText)}
                </article>
            `;
            updateActiveNav('about');
        } catch (error) {
            mainContentWrapper.innerHTML = `<p class="error">错误：无法加载“关于”页面。</p>`;
            console.error('加载“关于”页面失败:', error);
        }
    }

    // 为代码块添加复制按钮
    function addCopyButtons() {
        document.querySelectorAll('.post-content pre').forEach(block => {
            // 如果已存在按钮，则不再添加
            if (block.querySelector('.copy-code-button')) return;
            const button = document.createElement('button');
            button.className = 'copy-code-button';
            button.innerText = '复制';
            button.title = '复制到剪贴板';
            button.addEventListener('click', () => {
                const code = block.querySelector('code').innerText;
                navigator.clipboard.writeText(code).then(() => {
                    button.innerText = '已复制!';
                    setTimeout(() => { button.innerText = '复制'; }, 2000);
                }).catch(err => {
                    console.error('复制失败:', err);
                    button.innerText = '失败';
                    setTimeout(() => { button.innerText = '复制'; }, 2000);
                });
            });
            block.appendChild(button);
        });
    }

    // 更新导航链接的激活状态
    function updateActiveNav(activeId) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.toggle('active', link.dataset.navId === activeId);
        });
    }


    // --- 初始化执行 ---
    // 原来的 detectAndApplyScheme() 替换为 initializeTheme()
    initializeTheme();
    init();
});