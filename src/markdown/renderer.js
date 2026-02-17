import MarkdownIt from 'markdown-it'
import anchor from 'markdown-it-anchor'
import taskLists from 'markdown-it-task-lists'
import footnote from 'markdown-it-footnote'
import hljs from 'highlight.js'

/**
 * Unicode 感知的 slugify 函数。
 * 保持原逻辑：支持中文 ID 跳转。
 */
export function slugify(s) {
    return s
        .toLowerCase()
        .replace(/[^\p{L}\p{N}\s_-]/gu, '')
        .replace(/[\s_]+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '')
        .trim()
}

/**
 * 创建 Markdown 渲染引擎。
 * 核心修改：使用 Array.join('') 消除 HTML 模版字符串中的多余空白符。
 */
export function createMarkdownRenderer() {
    const md = new MarkdownIt({
        html: true,
        linkify: true,
        typographer: true,
        highlight(str, lang) {
            // 1. 获取语言并规范化
            let language = lang && hljs.getLanguage(lang) ? lang : 'text'

            // 2. 准备高亮内容
            let highlighted = ''
            try {
                if (language !== 'text') {
                    highlighted = hljs.highlight(str, { language, ignoreIllegals: true }).value
                } else {
                    highlighted = md.utils.escapeHtml(str)
                }
            } catch (e) {
                console.warn('Highlight parsing failed:', e)
                highlighted = md.utils.escapeHtml(str)
            }

            // 3. 计算行数，用于决定是否折叠
            // 剔除末尾的换行符干扰计算
            const rawLines = str.trimEnd().split('\n')
            const lineCount = rawLines.length
            // 设定折叠阈值
            const isCollapsible = lineCount > 40

            const wrapperClass = isCollapsible ? 'code-block-wrapper collapsed' : 'code-block-wrapper'

            // 4. 构建展开按钮 (仅当需要折叠时)
            // [修复] 使用数组 join 消除缩进产生的文本节点
            let expandBtnHtml = ''
            if (isCollapsible) {
                expandBtnHtml = [
                    '<div class="code-expand-overlay">',
                    '<button class="code-expand-btn" onclick="toggleCode(this)" title="Toggle code visibility">',
                    '<span class="material-icons-round expand-icon">unfold_more</span>',
                    `<span class="expand-text">Show All (${lineCount} lines)</span>`,
                    '</button>',
                    '</div>'
                ].join('')
            }

            // 5. 构建头部 (Header)
            // [修复] 使用数组 join 消除缩进产生的文本节点，防止 Flex 布局间隙异常
            const headerHtml = [
                '<div class="code-block-header">',
                '<div class="code-mac-dots"></div>',
                '<div class="code-actions">',
                `<span class="code-lang-tag">${language}</span>`,
                '<button class="code-copy-btn" onclick="copyCode(this)" aria-label="Copy code">',
                '<span class="material-icons-round icon-copy">content_copy</span>',
                '<span class="copy-status">Copied!</span>',
                '</button>',
                '</div>',
                '</div>'
            ].join('')

            // 6. 返回最终 HTML 结构
            // [修复] 确保 <pre> 和 <code> 之间没有任何空格或换行，否则浏览器会渲染出额外的空行
            return [
                `<div class="${wrapperClass}" data-lines="${lineCount}">`,
                headerHtml,
                '<div class="code-scroll-container">',
                `<pre><code class="hljs language-${language}">${highlighted}</code></pre>`,
                '</div>',
                expandBtnHtml,
                '</div>'
            ].join('')
        }
    })

    // --- 插件配置 ---

    md.use(anchor, {
        permalink: anchor.permalink.ariaHidden({
            placement: 'before',
            symbol: '#',
            class: 'header-anchor',
        }),
        slugify,
    })

    md.use(taskLists, { enabled: true, label: true })
    md.use(footnote)

    // --- 自定义 Callouts (提示块) ---
    md.core.ruler.after('block', 'callout', state => {
        const tokens = state.tokens
        for (let i = 0; i < tokens.length; i++) {
            if (tokens[i].type !== 'blockquote_open') continue

            let inlineIdx = -1
            for (let j = i + 1; j < tokens.length; j++) {
                if (tokens[j].type === 'inline') {
                    inlineIdx = j
                    break
                }
                if (tokens[j].type === 'blockquote_close') break
            }

            if (inlineIdx === -1) continue

            const content = tokens[inlineIdx].content
            // 匹配 [!TYPE] 语法
            const match = content.match(/^\[!(NOTE|WARNING|TIP|DANGER|IMPORTANT|CAUTION)\]\s*\n?([\s\S]*)/)
            if (!match) continue

            const type = match[1].toLowerCase()
            const restContent = match[2]

            // 映射图标
            const iconMap = {
                note: 'info',
                warning: 'warning',
                tip: 'lightbulb',
                danger: 'dangerous',
                important: 'priority_high',
                caution: 'error_outline',
            }

            tokens[i].type = 'callout_open'
            tokens[i].meta = { type, icon: iconMap[type] || 'info' }

            // 更新内容，移除 [!TYPE] 标记
            tokens[inlineIdx].content = restContent

            // 找到对应的 close 标签
            for (let j = inlineIdx + 1; j < tokens.length; j++) {
                if (tokens[j].type === 'blockquote_close') {
                    tokens[j].type = 'callout_close'
                    break
                }
            }
        }
    })

    md.renderer.rules.callout_open = (tokens, idx) => {
        const { type, icon } = tokens[idx].meta
        // [修复] 使用数组 join 消除 HTML 标签间的空白符，确保 Flex 布局紧凑
        return [
            `<div class="callout callout-${type}">`,
            '<div class="callout-icon-wrapper">',
            `<span class="material-icons-round">${icon}</span>`,
            '</div>',
            '<div class="callout-content-wrapper">'
        ].join('')
    }

    md.renderer.rules.callout_close = () => {
        return '</div></div>'
    }

    return md
}

// ... parseFrontmatter 和 extractToc 保持原样 ...
export function parseFrontmatter(raw) {
    const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)/)
    if (!match) return { meta: {}, content: raw }

    const meta = {}
    const lines = match[1].split('\n')
    for (const line of lines) {
        const colonIdx = line.indexOf(':')
        if (colonIdx === -1) continue
        const key = line.slice(0, colonIdx).trim()
        let value = line.slice(colonIdx + 1).trim()
        if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1)
        }
        meta[key] = value
    }
    return { meta, content: match[2] }
}

export function extractToc(md, content) {
    const tokens = md.parse(content, {})
    const headings = []
    for (let i = 0; i < tokens.length; i++) {
        if (tokens[i].type === 'heading_open') {
            const level = parseInt(tokens[i].tag.slice(1))
            if (level >= 2 && level <= 3) {
                const slug = tokens[i].attrGet('id') || ''
                const inlineToken = tokens[i + 1]
                const text = inlineToken ? inlineToken.content : ''
                if (slug) headings.push({ level, text, slug })
            }
        }
    }
    return headings
}

// --- 浏览器端交互脚本 ---

if (typeof window !== 'undefined') {
    window.copyCode = function (btn) {
        // 向上寻找 wrapper
        const wrapper = btn.closest('.code-block-header').nextElementSibling // .code-scroll-container
        const code = wrapper ? wrapper.querySelector('code') : null

        if (!code) return

        navigator.clipboard.writeText(code.textContent).then(() => {
            btn.classList.add('copied')
            setTimeout(() => {
                btn.classList.remove('copied')
            }, 2000)
        }).catch(err => {
            console.error('Copy failed', err)
        })
    }

    window.toggleCode = function (btn) {
        const wrapper = btn.closest('.code-block-wrapper')
        const isCollapsed = wrapper.classList.contains('collapsed')
        const icon = btn.querySelector('.expand-icon')
        const text = btn.querySelector('.expand-text')
        const lines = wrapper.dataset.lines

        if (isCollapsed) {
            wrapper.classList.remove('collapsed')
            wrapper.classList.add('expanded')
            icon.textContent = 'unfold_less'
            text.textContent = 'Hide Code'
        } else {
            wrapper.classList.remove('expanded')
            wrapper.classList.add('collapsed')
            icon.textContent = 'unfold_more'
            text.textContent = `Show All (${lines} lines)`

            // 平滑滚动回代码块顶部，避免收起时视口跳动
            wrapper.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
        }
    }
}