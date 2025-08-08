/**
 * @file config.js
 * @description 应用的集中化配置文件。
 * 将可配置的常量放在这里，便于统一管理和修改。
 */

/**
 * 主要应用配置对象。
 * @const {object}
 */
export const config = {
    /**
     * 每页显示的文章数量。
     * @type {number}
     */
    postsPerPage: 5,

    /**
     * 文章索引 JSON 文件的路径。
     * @type {string}
     */
    postsIndex: 'blog/posts.json',

    /**
     * Markdown 文章文件所在的目录路径。
     * @type {string}
     */
    mdDir: 'blog/md/',
};

/**
 * 用于在 localStorage 中存储用户颜色主题偏好的键名。
 * @const {string}
 */
export const colorSchemeKey = 'MyBlogColorScheme';