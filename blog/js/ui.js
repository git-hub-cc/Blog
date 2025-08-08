/**
 * @file ui.js
 * @description 管理所有 UI 渲染和 DOM 操作的模块。
 * 负责将数据渲染到页面上，并处理与用户界面相关的交互逻辑。
 */

import { colorSchemeKey } from './config.js';

// --- 元素缓存 ---
// 在模块加载时缓存常用 DOM 元素的引用，避免重复查询，提高性能。
const mainContentWrapper = document.getElementById('main-content-wrapper');
const paginationContainer = document.getElementById('pagination-container');
const tagCloudContainer = document.getElementById('tag-cloud-container');
const tocContainer = document.getElementById('toc-container');
const mainContent = document.querySelector('.main-content');
const searchInput = document.getElementById('search-input');
const toggleSwitch = document.getElementById('dark-mode-switch');
const sidebar = document.querySelector('.left-sidebar');

let tocObserver = null; // 用于 TOC 滚动监听的 IntersectionObserver 实例

// --- 辅助函数 ---

/**
 * 高亮显示文本中与查询匹配的子串。
 * 此函数对大小写不敏感，并将匹配项包裹在 <mark> 标签中。
 * 它还会对查询中的正则表达式特殊字符进行转义，以防出错。
 * @param {string} text - 需要进行高亮处理的原始文本。
 * @param {string} query - 用于搜索和高亮的关键词。
 * @returns {string} - 返回带有高亮标签的 HTML 字符串。
 */
function highlightText(text, query) {
    if (!query || !text) {
        return text;
    }
    // 转义正则表达式中的特殊字符，防止查询注入错误
    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedQuery})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}


/**
 * 应用指定的颜色主题到文档。
 * @param {string} scheme - 要应用的主题 ('dark' 或 'light')。
 */
export function applyScheme(scheme) {
    document.documentElement.setAttribute('data-scheme', scheme);
    if (toggleSwitch) {
        toggleSwitch.checked = (scheme === 'dark');
    }
    localStorage.setItem(colorSchemeKey, scheme);
}

/**
 * 初始化主题切换器功能。
 */
export function initializeTheme() {
    if (!toggleSwitch) return;

    // 根据当前主题设置切换器的初始状态
    const currentScheme = document.documentElement.getAttribute('data-scheme');
    toggleSwitch.checked = (currentScheme === 'dark');

    // 监听切换器变化
    toggleSwitch.addEventListener('change', (e) => {
        applyScheme(e.target.checked ? 'dark' : 'light');
    });

    // 监听操作系统主题变化，仅在用户未手动选择时跟随系统
    const osDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    osDarkScheme.addEventListener('change', (e) => {
        if (!localStorage.getItem(colorSchemeKey)) {
            applyScheme(e.matches ? 'dark' : 'light');
        }
    });
}

/**
 * 在渲染新内容前重置 UI 状态。
 * 这包括关闭移动端菜单、隐藏内容、清空旧的 UI 元素等。
 */
export function resetUI() {
    sidebar.classList.remove('is-active'); // 关闭移动端菜单
    mainContentWrapper.classList.add('fade-out'); // 开始淡出动画

    // 断开并清除旧的 TOC 滚动监听器
    if (tocObserver) {
        tocObserver.disconnect();
        tocObserver = null;
    }
    tocContainer.innerHTML = '';
    tocContainer.style.display = 'none';
    tagCloudContainer.style.display = 'none';
    paginationContainer.innerHTML = '';
}

/**
 * 在新内容渲染后完成 UI 的最终状态设置。
 */
export function finalizeUIRendering() {
    mainContent.scrollTo(0, 0); // 滚动到页面顶部
    mainContentWrapper.classList.remove('fade-out'); // 内容淡入
}

/**
 * 渲染文章列表。
 * @param {Array<object>} postsToShow - 当前页要显示的文章数组。
 * @param {string} pageTitle - 页面标题 (例如, "所有文章")。
 * @param {string|null} currentCategory - 当前的分类ID，用于生成上下文相关的标签链接。
 */
export function renderPostList(postsToShow, pageTitle, currentCategory = null) {
    const articlesHTML = postsToShow.map(post => {
        // 优化：标签链接现在包含其文章自身的分类上下文
        const tagsHTML = post.tags ? post.tags.map(tag => {
            const tagHref = `#/category/${encodeURIComponent(post.category)}/tag/${encodeURIComponent(tag)}`;
            return `<a href="${tagHref}" class="post-tag" onclick="event.stopPropagation()">${tag}</a>`;
        }).join('') : '';

        return `
        <article class="post-summary" data-post-file="${post.file}">
            <h2><a href="#/post=${post.file}" onclick="event.stopPropagation()">${post.title}</a></h2>
            <div class="meta">
                <span>${post.date}</span>
                ${tagsHTML ? `<div class="tags-container">${tagsHTML}</div>` : ''}
            </div>
            <p>${post.summary}</p>
        </article>`;
    }).join('');

    mainContentWrapper.innerHTML = `<h1>${pageTitle}</h1>` + articlesHTML;
}

/**
 * 渲染搜索结果。
 * @param {Array<object>} results - 匹配搜索查询的文章数组。
 * @param {string} query - 搜索关键词。
 */
export function renderSearchResults(results, query) {
    searchInput.value = query; // 将搜索词回填到输入框
    let contentHTML = `<h1>搜索结果: "${query}"</h1>`;

    if (results.length > 0) {
        contentHTML += results.map(post => {
            // 优化：标签链接现在包含其文章自身的分类上下文
            const tagsHTML = post.tags ? post.tags.map(tag => {
                const tagHref = `#/category/${encodeURIComponent(post.category)}/tag/${encodeURIComponent(tag)}`;
                return `<a href="${tagHref}" class="post-tag" onclick="event.stopPropagation()">${tag}</a>`;
            }).join('') : '';

            // 对标题和摘要中的关键词进行高亮处理
            const highlightedTitle = highlightText(post.title, query);
            const highlightedSummary = highlightText(post.summary, query);

            return `
            <article class="post-summary" data-post-file="${post.file}">
                <h2><a href="#/post=${post.file}" onclick="event.stopPropagation()">${highlightedTitle}</a></h2>
                <div class="meta">
                    <span>${post.date}</span>
                    ${tagsHTML ? `<div class="tags-container">${tagsHTML}</div>` : ''}
                </div>
                <p>${highlightedSummary}</p>
            </article>`;
        }).join('');
    } else {
        contentHTML += `<p class="loader">未找到与 "${query}" 匹配的文章。</p>`;
    }
    mainContentWrapper.innerHTML = contentHTML;
}

/**
 * 渲染分页控件。
 * @param {number} currentPage - 当前页码。
 * @param {number} totalPages - 总页数。
 * @param {string} baseHash - 分页链接的基础 hash (例如, "#/category/tech")。
 */
export function renderPagination(currentPage, totalPages, baseHash) {
    if (totalPages <= 1) {
        paginationContainer.innerHTML = '';
        return;
    }

    const pageLink = (page) => {
        if (baseHash) {
            return page > 1 ? `${baseHash}/page/${page}` : baseHash;
        }
        return page > 1 ? `#/page=${page}` : '#/';
    };

    let paginationHTML = `<a href="${currentPage > 1 ? pageLink(currentPage - 1) : '#'}" class="page-nav ${currentPage === 1 ? 'disabled' : ''}">« 上一页</a>`;

    const pages = [];
    if (totalPages <= 7) { // 如果总页数不多，全部显示
        for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else { // 否则，使用 '...' 省略部分页码
        pages.push(1, 2);
        if (currentPage > 4) pages.push('...');
        for (let i = Math.max(3, currentPage - 1); i <= Math.min(totalPages - 2, currentPage + 1); i++) {
            pages.push(i);
        }
        if (currentPage < totalPages - 3) pages.push('...');
        pages.push(totalPages - 1, totalPages);
    }

    pages.forEach(p => {
        if (p === '...') {
            paginationHTML += `<span class="page-num-ellipsis">...</span>`;
        } else {
            paginationHTML += `<a href="${pageLink(p)}" class="page-num ${p === currentPage ? 'active' : ''}">${p}</a>`;
        }
    });

    paginationHTML += `<a href="${currentPage < totalPages ? pageLink(currentPage + 1) : '#'}" class="page-nav ${currentPage === totalPages ? 'disabled' : ''}">下一页 »</a>`;
    paginationContainer.innerHTML = paginationHTML;
}

/**
 * 渲染单篇文章页面。
 * @param {string} markdownText - 文章的 Markdown 内容。
 * @param {object} postMeta - 文章的元数据。
 */
export function renderSinglePost(markdownText, postMeta) {
    const tagsHTML = postMeta.tags ? postMeta.tags.map(tag =>
        `<a href="#/tag/${encodeURIComponent(tag)}" class="post-tag">${tag}</a>`
    ).join('') : '';

    mainContentWrapper.innerHTML = `
        <article class="post-content">
            <h1>${postMeta ? postMeta.title : '无标题'}</h1>
            ${postMeta ? `<div class="meta"><span>${postMeta.date}</span>${tagsHTML ? `<div class="tags-container">${tagsHTML}</div>` : ''}</div>` : ''}
            ${marked.parse(markdownText)}
        </article>
    `;

    // 渲染完成后执行
    hljs.highlightAll(); // 应用代码高亮
    addCopyButtons();    // 为代码块添加复制按钮
    generateAndRenderTOC(); // 生成并渲染文章目录
}

/**
 * 渲染 "关于" 页面。
 * @param {string} markdownText - "关于" 页面的 Markdown 内容。
 */
export function renderAboutPage(markdownText) {
    mainContentWrapper.innerHTML = `
        <article class="post-content">
            <h1>关于</h1>
            ${marked.parse(markdownText)}
        </article>
    `;
}

/**
 * 渲染标签云。
 * @param {Map<string, number>} tags - 一个包含要显示的标签及其数量的 Map 对象。
 * @param {string|null} currentCategory - 当前的分类ID，用于生成上下文相关的标签链接。
 */
export function renderTagCloud(tags, currentCategory = null) {
    if (!tagCloudContainer || tags.size === 0) return;

    // 按标签数量降序排序
    const sortedTags = Array.from(tags.entries()).sort((a, b) => b[1] - a[1]);
    const maxCount = sortedTags.length > 0 ? sortedTags[0][1] : 1;
    const minCount = sortedTags.length > 0 ? sortedTags[sortedTags.length - 1][1] : 1;

    // 根据标签数量计算样式（字体大小和不透明度）
    const getStyle = (count) => {
        const factor = (count - minCount) / (maxCount - minCount || 1);
        const fontSize = 0.9 + factor * 0.6; // 字体大小从 0.9em 到 1.5em
        const opacity = 0.7 + factor * 0.3;  // 不透明度从 0.7 到 1.0
        return `font-size: ${fontSize.toFixed(2)}em; opacity: ${opacity.toFixed(2)};`;
    };

    let tagsHTML = `<h2>标签云</h2><div class="tag-cloud-list">`;
    // 确定标签链接的基础路径
    const baseHref = currentCategory
        ? `#/category/${encodeURIComponent(currentCategory)}/tag/`
        : '#/tag/';
    sortedTags.forEach(([tag, count]) => {
        tagsHTML += `<a href="${baseHref}${encodeURIComponent(tag)}" class="tag-cloud-item" style="${getStyle(count)}">${tag} <span>${count}</span></a>`;
    });
    tagsHTML += '</div>';

    tagCloudContainer.innerHTML = tagsHTML;
    tagCloudContainer.style.display = 'block';
}


/**
 * 更新导航链接的激活状态。
 * @param {string|null} activeId - 要激活的链接的 data-nav-id。如果为 null，则不激活任何链接。
 */
export function updateActiveNav(activeId) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.dataset.navId === activeId);
    });
}

/**
 * 为所有代码块添加 "复制" 按钮。
 */
function addCopyButtons() {
    document.querySelectorAll('.post-content pre').forEach(block => {
        if (block.querySelector('.copy-code-button')) return; // 如果已存在则跳过
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
                button.innerText = '复制失败';
                setTimeout(() => { button.innerText = '复制'; }, 2000);
            });
        });
        block.appendChild(button);
    });
}

/**
 * 从文章内容中生成并渲染目录（TOC）。
 */
function generateAndRenderTOC() {
    const postContent = document.querySelector('.post-content');
    if (!postContent || !tocContainer) return;

    const headings = postContent.querySelectorAll('h2, h3');
    if (headings.length < 2) return; // 如果标题少于2个，则不显示目录

    let tocHTML = '<h2>目录</h2><ul>';
    let currentLevel = 2; // 假设从 h2 开始

    headings.forEach((heading, index) => {
        const level = parseInt(heading.tagName.substring(1), 10);
        const text = heading.textContent.trim();
        const slug = `toc-heading-${index}-${text.toLowerCase().replace(/[\s\W]+/g, '-')}`;
        heading.id = slug; // 为标题设置 ID 以便锚点跳转

        if (level > currentLevel) tocHTML += '<ul>'; // 降级，开始新的子列表
        else if (level < currentLevel) tocHTML += '</ul>'.repeat(currentLevel - level); // 升级，闭合列表

        currentLevel = level;
        tocHTML += `<li><a href="#${slug}">${text}</a></li>`;
    });
    tocHTML += '</ul>'.repeat(currentLevel - 1); // 闭合所有剩余的列表

    tocContainer.innerHTML = tocHTML;
    tocContainer.style.display = 'block';

    setupTocScrollSpy();
}

/**
 * 设置 IntersectionObserver 来实现 TOC 滚动监听（高亮当前章节）。
 */
function setupTocScrollSpy() {
    if (tocObserver) tocObserver.disconnect();

    const tocLinks = tocContainer.querySelectorAll('a');
    const headings = Array.from(document.querySelectorAll('.post-content h2, .post-content h3'));

    if (tocLinks.length === 0 || headings.length === 0) return;

    // `rootMargin` 的 '-80%' 意味着标题进入视口顶部 20% 的区域时即被视为 "可见"，
    // 这使得高亮效果在用户滚动时更加自然。
    const observerOptions = {
        root: mainContent,
        rootMargin: '0px 0px -80% 0px',
        threshold: 1.0,
    };

    tocObserver = new IntersectionObserver((entries) => {
        let latestVisibleEntry = null;
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                latestVisibleEntry = entry;
            }
        });

        if (latestVisibleEntry) {
            const id = latestVisibleEntry.target.id;
            tocLinks.forEach(link => {
                link.classList.remove('is-active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('is-active');
                }
            });
        }
    }, observerOptions);

    headings.forEach(heading => tocObserver.observe(heading));
}

/**
 * 在主内容区域显示加载指示器。
 * @param {string} [message='正在加载...'] - 要显示的加载信息。
 */
export function showLoader(message = '正在加载...') {
    mainContentWrapper.innerHTML = `<div class="loader">${message}</div>`;
}

/**
 * 在主内容区域显示错误信息。
 * @param {string} message - 要显示的错误信息 (支持 HTML)。
 */
export function showError(message) {
    mainContentWrapper.innerHTML = `<div class="loader error">${message}</div>`;
}