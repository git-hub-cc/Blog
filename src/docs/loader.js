import { parseFrontmatter } from '../markdown/renderer.js'

// 1. 自动扫描 docs 目录下所有 .md 文件
const markdownModules = import.meta.glob('/docs/**/*.md', {
    query: '?raw',
    import: 'default',
    eager: true
})

let _cachedDocs = null

/**
 * 辅助：格式化名称
 */
function formatName(raw) {
    // 将格式化逻辑去除，目录名与实际目录保持一致
    return raw;
}

/**
 * 加载并处理所有文档
 */
function loadAllDocs() {
    if (_cachedDocs) return _cachedDocs

    const docs = []

    for (const path in markdownModules) {
        const rawContent = markdownModules[path]
        const { meta } = parseFrontmatter(rawContent)

        // 生成链接: /docs/guide/intro.md -> /guide/intro
        // 同时也支持 index.md 作为目录的默认页
        // decodeURIComponent handles cases where Vite may URL-encode CJK characters
        let link
        try {
            link = decodeURIComponent(path)
                .replace(/^\/docs/, '')
                .replace(/\.md$/, '')
        } catch {
            link = path
                .replace(/^\/docs/, '')
                .replace(/\.md$/, '')
        }

        // 如果文件名是 index，通常代表它是该目录的默认页
        if (link.endsWith('/index')) {
            link = link.slice(0, -6) // 去掉 /index
        }

        if (!link.startsWith('/')) link = '/' + link

        const segments = link.split('/').filter(Boolean)
        const fileName = segments[segments.length - 1] || 'Home'

        // 优先使用 Frontmatter 中的 title，否则使用文件名格式化
        const title = meta.title || formatName(fileName)

        docs.push({
            link,
            title,
            meta,
            content: rawContent,
            segments, // 保留路径分段供树生成使用
            rawPath: path,
            date: meta.date || null,
            tags: meta.tags || []
        })
    }

    // 按路径字母顺序排序，确保目录结构稳定
    _cachedDocs = docs.sort((a, b) => a.link.localeCompare(b.link))
    return _cachedDocs
}

// === 导出 API ===

export function getFlatDocs() {
    return loadAllDocs()
}

export function getDocByRoute(routePath) {
    const docs = loadAllDocs()
    // 移除尾部斜杠 (除非是根路径)
    let cleanPath = routePath === '/' ? '/' : routePath.replace(/\/$/, '')

    // Decode in case the route path contains encoded characters
    try { cleanPath = decodeURIComponent(cleanPath) } catch { }

    // 精确匹配
    const doc = docs.find(d => d.link === cleanPath)
    return doc ? doc.content : null
}

export function getDocsInDir(dirPath) {
    const docs = loadAllDocs()
    let cleanDir = dirPath === '/' ? '' : dirPath.replace(/\/$/, '')
    try { cleanDir = decodeURIComponent(cleanDir) } catch { }

    // 逻辑：寻找所有直接位于该目录下的子项（用于 DirListView）
    // 注意：这里我们返回所有后代，DirListView 组件自己会处理层级显示
    return docs.filter(doc => doc.link.startsWith(cleanDir + '/'))
}

/**
 * [关键修复] 生成无重复的目录树
 * 结构：
 * [
 * {
 * title: 'Guide',
 * link: '/guide',
 * children: [...subDirs],
 * items: [...files]
 * }
 * ]
 */
export function getDocTree() {
    const docs = loadAllDocs()

    // 根节点容器 (模拟一个虚拟根节点)
    const root = { children: [], items: [] }

    docs.forEach(doc => {
        // 路径分段，例如: ['guide', 'advanced', 'config']
        const parts = doc.segments

        // 如果是根目录文件 (例如 /README.md -> link: /)
        if (parts.length === 0) {
            return // 通常根文件不放在侧边栏树中，或者你可以添加到 root.items
        }

        // 指针，从根节点开始
        let currentLevel = root

        // 遍历路径的前 N-1 个部分（即所有父级目录）
        // 例如 doc 是 /a/b/c.md，我们遍历 a, b
        for (let i = 0; i < parts.length - 1; i++) {
            const partName = parts[i]

            // 1. 在当前层级的 children 中寻找是否已存在该目录
            let existingDir = currentLevel.children.find(
                child => child.slug === partName
            )

            // 2. 如果不存在，创建新目录
            if (!existingDir) {
                // 构建该目录的完整链接路径
                const dirLink = '/' + parts.slice(0, i + 1).join('/')

                existingDir = {
                    title: formatName(partName),
                    slug: partName, // 用于唯一标识，防止重复
                    link: dirLink,
                    collapsible: true,
                    children: [], // 存放子目录
                    items: []     // 存放文件
                }
                currentLevel.children.push(existingDir)
            }

            // 3. 移动指针进入下一层
            currentLevel = existingDir
        }

        // 此时 currentLevel 指向该文档的直接父目录
        // 将文档作为 item 添加进去
        currentLevel.items.push({
            title: doc.title,
            link: doc.link,
            icon: 'description'
        })
    })

    // 递归清理和排序函数
    function processTree(nodes) {
        // 对目录按名称排序
        nodes.sort((a, b) => a.title.localeCompare(b.title))

        nodes.forEach(node => {
            // 递归处理子目录
            if (node.children && node.children.length > 0) {
                processTree(node.children)
            }
            // 对文件按名称排序 (可选)
            if (node.items && node.items.length > 0) {
                node.items.sort((a, b) => a.title.localeCompare(b.title))
            }
        })
        return nodes
    }

    // 返回根节点下的子目录 (因为 NavGroup 接收的是数组)
    // 如果根目录下有直接文件 (root.items)，你可能需要决定如何显示它们。
    // 目前侧边栏通常只显示一级目录。如果需要显示根文件，可以将 root.items 混入。
    return processTree(root.children)
}

export function getAllDocs() {
    const map = new Map()
    loadAllDocs().forEach(doc => {
        map.set(doc.link, doc.content)
    })
    return map
}