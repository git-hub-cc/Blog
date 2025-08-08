/**
 * @file router.js
 * @description 处理客户端路由和页面渲染逻辑。
 * 这是单页应用（SPA）的核心，负责根据 URL hash 渲染不同内容。
 */

import { config } from './config.js';
import * as api from './api.js';
import * as ui from './ui.js';

let postsData = []; // 缓存所有文章的元数据

/**
 * 使用文章数据初始化路由器。
 * @param {Array<object>} posts - 所有文章元数据的数组。
 */
export function initializeRouter(posts) {
    postsData = posts;
    window.addEventListener('hashchange', handleRouteChange);
    handleRouteChange(); // 首次加载时处理当前路由
}

/**
 * 从给定的文章列表中计算标签及其数量。
 * @param {Array<object>} posts - 用于计算标签的文章数组。
 * @returns {Map<string, number>} - 返回一个包含标签和计数的 Map。
 */
function getTagsForPosts(posts) {
    const tagsMap = new Map();
    posts.forEach(post => {
        if (post.tags && Array.isArray(post.tags)) {
            post.tags.forEach(tag => {
                tagsMap.set(tag, (tagsMap.get(tag) || 0) + 1);
            });
        }
    });
    return tagsMap;
}


/**
 * 主路由处理函数，在 hash 变化或页面初次加载时被调用。
 */
function handleRouteChange() {
    const hash = window.location.hash || '#/';

    // 关键优化：区分应用路由和页内锚点。
    // 应用路由 (如 #/post/...) 通常包含'/'，而 TOC 锚点 (如 #toc-heading-1) 不包含。
    // 如果 hash 看起来像一个页内锚点，我们先检查目标元素是否存在。
    if (hash.length > 1 && !hash.includes('/')) {
        try {
            // 尝试在当前页面上查找锚点目标
            const targetId = decodeURIComponent(hash.substring(1));
            if (document.getElementById(targetId)) {
                // 如果元素存在，这说明是一个有效的页内链接。
                // 我们直接返回，让浏览器处理滚动，从而避免不必要的页面重渲染。
                return;
            }
        } catch (e) {
            // 如果 hash 不是一个有效的 CSS 选择器，则忽略并让它走正常的路由逻辑。
            console.warn('无效的锚点哈希:', hash);
        }
    }

    // 如果是页面导航路由，则执行 UI 重置和内容加载。
    ui.resetUI();
    // 使用 setTimeout 创建一个微小的延迟，以确保 UI 重置（如淡出效果）能够被用户看到，
    // 从而提升感知性能。
    setTimeout(() => {
        dispatchRoute(hash);
        ui.finalizeUIRendering();
    }, 150); // 调整延迟时间以获得最佳效果
}

/**
 * 根据路由哈希分发到相应的渲染函数。
 * @param {string} hash - 当前的 URL hash。
 */
async function dispatchRoute(hash) {
    // 新增：优先处理最具体的路由（分类+标签）
    const categoryTagMatch = hash.match(/^#\/category\/(.*?)\/tag\/(.*?)(?:\/page\/(\d+))?$/);
    if (categoryTagMatch) {
        const category = decodeURIComponent(categoryTagMatch[1]);
        const tag = decodeURIComponent(categoryTagMatch[2]);
        const page = categoryTagMatch[3] ? parseInt(categoryTagMatch[3], 10) : 1;
        loadPostList({ category, tag }, page);
    } else if (hash.startsWith('#/post=')) {
        const fileName = decodeURIComponent(hash.substring(7));
        await loadSinglePost(fileName);
    } else if (hash.startsWith('#/category/')) {
        const parts = hash.substring(11).split('/page/');
        const category = decodeURIComponent(parts[0]);
        const page = parts[1] ? parseInt(parts[1], 10) : 1;
        loadPostList({ category }, page);
    } else if (hash.startsWith('#/tag/')) {
        const parts = hash.substring(6).split('/page/');
        const tag = decodeURIComponent(parts[0]);
        const page = parts[1] ? parseInt(parts[1], 10) : 1;
        loadPostList({ tag }, page);
    } else if (hash.startsWith('#/search/')) {
        const query = decodeURIComponent(hash.substring(9));
        loadSearchResults(query);
        // 搜索结果页不显示标签云
    } else if (hash === '#/about') {
        await loadAboutPage();
    } else { // 主页或主页的分页
        const pageMatch = hash.match(/#\/?page=(\d+)/);
        const page = (pageMatch && pageMatch[1]) ? parseInt(pageMatch[1], 10) : 1;
        loadPostList({}, page);
    }
}

/**
 * 根据过滤器和页码加载并渲染文章列表。
 * @param {object} filters - 过滤条件，例如 { category: 'tech' } 或 { tag: 'JavaScript' }。
 * @param {number} page - 要显示的页码。
 */
function loadPostList(filters = {}, page = 1) {
    let filteredPosts = postsData;
    let pageTitle = '所有文章';
    let baseHash = '';

    if (filters.category) {
        filteredPosts = postsData.filter(p => p.category === filters.category);
        const categoryName = document.querySelector(`.nav-link[data-nav-id="${filters.category}"]`)?.innerText || filters.category;
        pageTitle = `分类：${categoryName}`;
        baseHash = `#/category/${encodeURIComponent(filters.category)}`;
        ui.updateActiveNav(filters.category);
    }

    if (filters.tag) {
        // 在已按分类过滤的基础上，再按标签过滤
        filteredPosts = filteredPosts.filter(p => p.tags && p.tags.includes(filters.tag));

        if (filters.category) {
            pageTitle += ` | 标签：${filters.tag}`;
            baseHash += `/tag/${encodeURIComponent(filters.tag)}`;
        } else {
            pageTitle = `标签：${filters.tag}`;
            baseHash = `#/tag/${encodeURIComponent(filters.tag)}`;
        }
    }

    if (!filters.category && !filters.tag) {
        ui.updateActiveNav('home');
    } else if (filters.tag && !filters.category) {
        ui.updateActiveNav(null); // 标签页不激活任何主导航
    }

    if (filteredPosts.length === 0) {
        ui.showError('没有找到相关文章。');
        return;
    }

    const totalPosts = filteredPosts.length;
    const totalPages = Math.ceil(totalPosts / config.postsPerPage);
    const startIndex = (page - 1) * config.postsPerPage;
    const postsToShow = filteredPosts.slice(startIndex, startIndex + config.postsPerPage);

    ui.renderPostList(postsToShow, pageTitle, filters.category);
    ui.renderPagination(page, totalPages, baseHash);

    // 动态生成并渲染标签云
    const tagsForCloud = getTagsForPosts(filteredPosts);
    ui.renderTagCloud(tagsForCloud, filters.category);
}

/**
 * 加载并渲染指定查询的搜索结果。
 * @param {string} query - 搜索关键词。
 */
function loadSearchResults(query) {
    const lowerCaseQuery = query.toLowerCase();
    const results = postsData.filter(p =>
        p.title.toLowerCase().includes(lowerCaseQuery) ||
        p.summary.toLowerCase().includes(lowerCaseQuery)
    );
    ui.renderSearchResults(results, query);
    ui.updateActiveNav(null); // 搜索结果页不激活任何主导航
}

/**
 * 加载并渲染单篇文章。
 * @async
 * @param {string} fileName - 要加载的文章的文件名。
 */
async function loadSinglePost(fileName) {
    ui.showLoader('正在加载文章...');
    try {
        const markdownText = await api.fetchMarkdownFile(fileName);
        const postMeta = postsData.find(p => p.file === fileName);
        if (!postMeta) throw new Error("文章元数据未找到。");

        ui.renderSinglePost(markdownText, postMeta);
        ui.updateActiveNav(postMeta.category); // 高亮对应的分类导航
    } catch (error) {
        console.error('加载文章失败:', error);
        ui.showError(`错误：无法加载文章 "${fileName}"。<br>请检查文件是否存在。`);
    }
}

/**
 * 加载并渲染 "关于" 页面。
 * @async
 */
async function loadAboutPage() {
    ui.showLoader('正在加载页面...');
    try {
        const markdownText = await api.fetchMarkdownFile('about.md');
        ui.renderAboutPage(markdownText);
        ui.updateActiveNav('about');
    } catch (error) {
        console.error('加载 "关于" 页面失败:', error);
        ui.showError('错误：无法加载 "关于" 页面。');
    }
}