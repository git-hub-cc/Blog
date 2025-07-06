document.addEventListener('DOMContentLoaded', () => {
    // --- 深色模式切换 ---
    const colorSchemeKey = 'MyBlogColorScheme';
    const toggleSwitch = document.getElementById('dark-mode-switch');
    const osDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    function applyScheme(scheme) {
        document.documentElement.setAttribute('data-scheme', scheme);
        toggleSwitch.checked = (scheme === 'dark');
        localStorage.setItem(colorSchemeKey, scheme);
    }

    function detectAndApplyScheme() {
        const savedScheme = localStorage.getItem(colorSchemeKey);
        if (savedScheme) {
            applyScheme(savedScheme);
        } else if (osDarkScheme.matches) {
            applyScheme('dark');
        } else {
            applyScheme('light');
        }
    }

    toggleSwitch.addEventListener('change', (e) => applyScheme(e.target.checked ? 'dark' : 'light'));
    osDarkScheme.addEventListener('change', (e) => {
        if (!localStorage.getItem(colorSchemeKey)) {
            applyScheme(e.matches ? 'dark' : 'light');
        }
    });

    // --- 移动端菜单 ---
    const menuToggle = document.getElementById('toggle-menu');
    const sidebar = document.querySelector('.left-sidebar');
    menuToggle.addEventListener('click', () => sidebar.classList.toggle('is-active'));

    // --- 搜索功能 ---
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = searchInput.value.trim();
        if (query) {
            window.location.hash = `#/search/${encodeURIComponent(query)}`;
        }
    });


    // --- 博客核心逻辑 ---
    const config = {
        postsPerPage: 5,
        postsIndex: 'blog/posts.json',
        mdDir: 'blog/md/'
    };

    const mainContentWrapper = document.getElementById('main-content-wrapper');
    const paginationContainer = document.getElementById('pagination-container');
    let postsData = [];

    async function init() {
        try {
            const response = await fetch(config.postsIndex);
            if (!response.ok) throw new Error('Network response was not ok.');
            postsData = await response.json();
            window.addEventListener('hashchange', handleRouteChange);
            handleRouteChange();
        } catch (error) {
            mainContentWrapper.innerHTML = `<p class="error">错误：无法加载文章索引。请检查 ${config.postsIndex} 是否存在。</p>`;
            console.error('Error fetching posts index:', error);
        }
    }

    function handleRouteChange() {
        sidebar.classList.remove('is-active');
        mainContentWrapper.classList.add('fade-out');
        setTimeout(() => {
            const hash = window.location.hash;
            if (hash.startsWith('#/post=')) {
                // --- 核心改动在此 ---
                // 解码从 URL 获取的文件名，以处理中文或特殊字符
                const fileName = decodeURIComponent(hash.substring(7));
                renderSinglePost(fileName);
            } else if (hash.startsWith('#/category/')) {
                const parts = hash.substring(11).split('/page/');
                const category = decodeURIComponent(parts[0]); // 同时为分类也加上解码，以备不时之需
                const page = parts[1] ? parseInt(parts[1], 10) : 1;
                renderPostList(category, page);
            } else if (hash.startsWith('#/search/')) {
                const query = decodeURIComponent(hash.substring(9));
                renderSearchResults(query);
            } else if (hash === '#about') {
                renderAboutPage();
            } else {
                const pageMatch = hash.match(/#page=(\d+)/);
                const page = pageMatch ? parseInt(pageMatch[1], 10) : 1;
                renderPostList(null, page); // null category means all posts
            }
            window.scrollTo(0, 0);
            mainContentWrapper.classList.remove('fade-out');
        }, 300);
    }

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

        mainContentWrapper.innerHTML = postsToShow.map(post => `
                <article class="post-summary">
                    <h2><a href="#/post=${post.file}">${post.title}</a></h2>
                    <div class="meta">发布于 ${post.date}</div>
                    <p>${post.summary}</p>
                </article>
            `).join('');

        renderPagination(page, totalPages, category);
        updateActiveNav(category || 'home');
    }

    function renderSearchResults(query) {
        paginationContainer.innerHTML = '';
        searchInput.value = query;

        const results = postsData.filter(p =>
            p.title.toLowerCase().includes(query.toLowerCase()) ||
            p.summary.toLowerCase().includes(query.toLowerCase())
        );

        let contentHTML = `<h1>搜索结果: "${query}"</h1>`;
        if (results.length > 0) {
            contentHTML += results.map(post => `
                    <article class="post-summary">
                        <h2><a href="#/post=${post.file}">${post.title}</a></h2>
                        <div class="meta">发布于 ${post.date}</div>
                        <p>${post.summary}</p>
                    </article>
                `).join('');
        } else {
            contentHTML += `<p class="loader">未找到相关文章。</p>`;
        }
        mainContentWrapper.innerHTML = contentHTML;
        updateActiveNav(null); // No active nav for search results
    }

    function renderPagination(currentPage, totalPages, category) {
        if (totalPages <= 1) return;

        const pageLink = (page) => {
            if (category) {
                return `#/category/${category}/page/${page}`;
            }
            return `#page=${page}`;
        };

        let paginationHTML = `<a href="${pageLink(currentPage - 1)}" class="${currentPage === 1 ? 'disabled' : ''}">« 上一页</a>`;
        for (let i = 1; i <= totalPages; i++) {
            paginationHTML += `<a href="${pageLink(i)}" class="${i === currentPage ? 'active' : ''}">${i}</a>`;
        }
        paginationHTML += `<a href="${pageLink(currentPage + 1)}" class="${currentPage === totalPages ? 'disabled' : ''}">下一页 »</a>`;
        paginationContainer.innerHTML = paginationHTML;
    }

    async function renderSinglePost(fileName) {
        mainContentWrapper.innerHTML = '<div class="loader">正在加载文章...</div>';
        paginationContainer.innerHTML = '';
        try {
            const response = await fetch(`${config.mdDir}${fileName}`);
            if (!response.ok) throw new Error('Article not found.');
            const markdownText = await response.text();
            const postMeta = postsData.find(p => p.file === fileName);
            mainContentWrapper.innerHTML = `
                    <article class="post-content">
                        <h1>${postMeta ? postMeta.title : '无标题'}</h1>
                        ${postMeta ? `<div class="meta">发布于 ${postMeta.date}</div>` : ''}
                        ${marked.parse(markdownText)}
                    </article>
                `;
            hljs.highlightAll();
            addCopyButtons();
            updateActiveNav(postMeta ? postMeta.category : null);
        } catch (error) {
            mainContentWrapper.innerHTML = `<p class="error">错误：无法加载文章 "${fileName}"。<br>请检查文件是否存在于 '${config.mdDir}${fileName}'</p>`;
            console.error('Error fetching post:', error);
        }
    }

    async function renderAboutPage() {
        mainContentWrapper.innerHTML = '<div class="loader">正在加载...</div>';
        paginationContainer.innerHTML = '';
        try {
            const response = await fetch(`${config.mdDir}about.md`);
            if (!response.ok) throw new Error('About page not found.');
            mainContentWrapper.innerHTML = `
                    <article class="post-content">
                        <h1>关于</h1>
                        ${marked.parse(await response.text())}
                    </article>
                `;
            updateActiveNav('about');
        } catch (error) {
            mainContentWrapper.innerHTML = `<p class="error">错误：无法加载“关于”页面。</p>`;
            console.error('Error fetching about page:', error);
        }
    }

    function addCopyButtons() {
        document.querySelectorAll('.post-content pre').forEach(block => {
            if (block.querySelector('.copy-code-button')) return; // Avoid adding multiple buttons
            const button = document.createElement('button');
            button.className = 'copy-code-button';
            button.innerText = '复制';
            button.addEventListener('click', () => {
                const code = block.querySelector('code').innerText;
                navigator.clipboard.writeText(code).then(() => {
                    button.innerText = '已复制!';
                    setTimeout(() => { button.innerText = '复制'; }, 2000);
                });
            });
            block.appendChild(button);
        });
    }

    function updateActiveNav(activeId) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.toggle('active', link.dataset.navId === activeId);
        });
    }

    detectAndApplyScheme();
    init();
});