import MarkdownIt from 'markdown-it'
import anchor from 'markdown-it-anchor'
import taskLists from 'markdown-it-task-lists'
import footnote from 'markdown-it-footnote'
import hljs from 'highlight.js'

/**
 * Unicode 感知的 slugify 函数。
 * 保留 CJK 字符、字母、数字和连字符。
 * 将空格替换为连字符并去除标点符号。
 */
export function slugify(s) {
    return s
        .toLowerCase()
        // 移除非: 单词字符、Unicode 字母/数字、空格、连字符的字符
        .replace(/[^\p{L}\p{N}\s_-]/gu, '')
        // 将空格/下划线折叠为单个连字符
        .replace(/[\s_]+/g, '-')
        // 折叠多个连字符
        .replace(/-+/g, '-')
        // 去除首尾连字符
        .replace(/^-+|-+$/g, '')
        .trim()
}

/**
 * 创建配置好所有插件的 markdown-it 实例。
 * 这是 DocBlog 的核心渲染引擎。
 */
export function createMarkdownRenderer() {
    const md = new MarkdownIt({
        html: true,
        linkify: true,
        typographer: true,
        highlight(str, lang) {
            // 1. 统计代码行数
            // 使用 split('\n') 获取行数，如果最后一行是空行通常不计入视觉行，但这里简化处理
            const lines = str.trim().split('\n').length
            const isCollapsible = lines > 30

            // 2. 准备高亮内容
            let highlighted = ''
            if (lang && hljs.getLanguage(lang)) {
                try {
                    highlighted = hljs.highlight(str, { language: lang, ignoreIllegals: true }).value
                } catch (_) {
                    highlighted = md.utils.escapeHtml(str)
                }
            } else {
                highlighted = md.utils.escapeHtml(str)
            }

            // 3. 构建 Wrapper 的类名
            // 如果行数超限，添加 'collapsed' 类，CSS 会根据此类控制最大高度和遮罩
            const wrapperClass = isCollapsible ? 'code-block-wrapper collapsed' : 'code-block-wrapper'

            // 4. 构建“展开/收起”按钮 HTML (仅在需要折叠时添加)
            let expandBtnHtml = ''
            if (isCollapsible) {
                expandBtnHtml = `
          <div class="code-expand-overlay">
            <button class="code-expand-btn" onclick="toggleCode(this)">
              <span class="material-icons-round expand-icon">expand_more</span>
              <span class="expand-text">展开代码 (${lines} 行)</span>
            </button>
          </div>
        `
            }

            // 5. 组装最终 HTML
            // 注意：Pre 标签内的 code 保持原样，控制逻辑在 wrapper 和 overlay 上
            return `<div class="${wrapperClass}" data-lines="${lines}">
                <div class="code-block-header">
                  <span class="code-block-lang">${lang || 'text'}</span>
                  <button class="code-copy-btn" onclick="copyCode(this)">
                    <span class="material-icons-round" style="font-size:14px">content_copy</span>
                    <span class="copy-text">Copy</span>
                  </button>
                </div>
                <pre><code class="hljs language-${lang || 'text'}">${highlighted}</code></pre>
                ${expandBtnHtml}
              </div>`
        }
    })

    // --- 插件配置 ---

    // Anchor 插件：处理标题锚点
    md.use(anchor, {
        permalink: anchor.permalink.ariaHidden({
            placement: 'after',
            symbol: '#',
            class: 'header-anchor',
        }),
        slugify,
    })

    // 任务列表
    md.use(taskLists, { enabled: true, label: true })
    // 脚注
    md.use(footnote)

    // 自定义插件：Callouts (提示框)
    // 将 > [!NOTE] 转换为带有特定样式的 div
    md.core.ruler.after('block', 'callout', state => {
        const tokens = state.tokens
        for (let i = 0; i < tokens.length; i++) {
            if (tokens[i].type !== 'blockquote_open') continue

            // 寻找以 [!TYPE] 开头的行内内容
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
            const match = content.match(/^\[!(NOTE|WARNING|TIP|DANGER|IMPORTANT|CAUTION)\]\s*\n?([\s\S]*)/)
            if (!match) continue

            const type = match[1].toLowerCase()
            const restContent = match[2]

            const iconMap = {
                note: 'info',
                warning: 'warning',
                tip: 'lightbulb',
                danger: 'error',
                important: 'priority_high',
                caution: 'warning',
            }

            const titleMap = {
                note: 'NOTE',
                warning: 'WARNING',
                tip: 'TIP',
                danger: 'DANGER',
                important: 'IMPORTANT',
                caution: 'CAUTION',
            }

            // 替换 blockquote token 为 callout
            tokens[i].type = 'callout_open'
            tokens[i].meta = { type, icon: iconMap[type] || 'info', title: titleMap[type] || type.toUpperCase() }
            tokens[inlineIdx].content = restContent

            // 寻找并标记结束 tag
            for (let j = inlineIdx + 1; j < tokens.length; j++) {
                if (tokens[j].type === 'blockquote_close') {
                    tokens[j].type = 'callout_close'
                    break
                }
            }
        }
    })

    md.renderer.rules.callout_open = (tokens, idx) => {
        const { type, icon, title } = tokens[idx].meta
        return `<div class="callout callout-${type}">
      <span class="material-icons-round" style="font-size:20px;flex-shrink:0;margin-top:2px;color:var(--callout-icon-color-${type}, var(--color-primary))">${icon}</span>
      <div>
        <div class="callout-title">${title}</div>
        <div class="callout-content">`
    }

    md.renderer.rules.callout_close = () => {
        return `</div></div></div>`
    }

    return md
}

/**
 * 从 Markdown 字符串解析 Frontmatter。
 * 返回 { meta: {}, content: string }
 */
export function parseFrontmatter(raw) {
    const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)/)
    if (!match) {
        return { meta: {}, content: raw }
    }

    const meta = {}
    const lines = match[1].split('\n')
    for (const line of lines) {
        const colonIdx = line.indexOf(':')
        if (colonIdx === -1) continue
        const key = line.slice(0, colonIdx).trim()
        let value = line.slice(colonIdx + 1).trim()
        // 移除周围的引号
        if ((value.startsWith('"') && value.endsWith('"')) ||
            (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1)
        }
        meta[key] = value
    }

    return { meta, content: match[2] }
}

/**
 * 提取目录 (TOC) 标题。
 * 直接读取 markdown-it-anchor 设置的 `id` 属性，
 * 确保 TOC slug 与渲染后的标题 ID 完全匹配。
 */
export function extractToc(md, content) {
    const tokens = md.parse(content, {})
    const headings = []

    for (let i = 0; i < tokens.length; i++) {
        if (tokens[i].type === 'heading_open') {
            const level = parseInt(tokens[i].tag.slice(1))
            if (level >= 2 && level <= 3) {
                const slug = tokens[i].attrGet('id') || ''
                const inlineToken = tokens[i + 1]
                let text = ''
                if (inlineToken && inlineToken.children) {
                    text = inlineToken.children
                        .filter(t => t.type === 'text' || t.type === 'code_inline')
                        .map(t => t.content)
                        .join('')
                } else if (inlineToken) {
                    text = inlineToken.content
                }
                if (slug) {
                    headings.push({ level, text, slug })
                }
            }
        }
    }

    return headings
}

// --- 浏览器端全局辅助函数 ---

if (typeof window !== 'undefined') {
    // 1. 复制代码功能
    window.copyCode = function (btn) {
        const wrapper = btn.closest('.code-block-wrapper')
        const code = wrapper.querySelector('code')
        navigator.clipboard.writeText(code.textContent).then(() => {
            const icon = btn.querySelector('.material-icons-round')
            const text = btn.querySelector('.copy-text')
            // 缓存原始状态
            const originalIcon = icon.textContent
            const originalText = text.textContent

            icon.textContent = 'check'
            text.textContent = 'Copied!'
            btn.style.color = '#22c55e'

            setTimeout(() => {
                icon.textContent = originalIcon
                text.textContent = originalText
                btn.style.color = ''
            }, 2000)
        })
    }

    // 2. 展开/收起代码功能 (新增)
    window.toggleCode = function (btn) {
        const wrapper = btn.closest('.code-block-wrapper')
        const isCollapsed = wrapper.classList.contains('collapsed')
        const icon = btn.querySelector('.expand-icon')
        const text = btn.querySelector('.expand-text')
        // 从 dataset 获取原始行数，方便显示
        const totalLines = wrapper.dataset.lines || '30+'

        if (isCollapsed) {
            // 执行展开
            wrapper.classList.remove('collapsed')
            wrapper.classList.add('expanded')
            icon.textContent = 'expand_less'
            text.textContent = '收起代码'
        } else {
            // 执行收起
            wrapper.classList.remove('expanded')
            wrapper.classList.add('collapsed')
            icon.textContent = 'expand_more'
            text.textContent = `展开代码 (${totalLines} 行)`

            // 如果收起时页面已经滚动到代码块底部下方，体验会很差
            // 这里的逻辑可选：收起时平滑滚动回代码块顶部
            const header = wrapper.querySelector('.code-block-header')
            if (header) {
                const rect = header.getBoundingClientRect()
                if (rect.top < 0) {
                    header.scrollIntoView({ behavior: 'smooth', block: 'center' })
                }
            }
        }
    }
}