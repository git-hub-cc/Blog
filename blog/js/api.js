/**
 * @file api.js
 * @description 处理所有数据获取（API 调用）的模块。
 * 负责与服务器或本地文件系统进行数据交互。
 */

import { config } from './config.js';

/**
 * 异步获取主文章索引文件 (posts.json)。
 * @async
 * @returns {Promise<Array<object>>} 一个解析为文章元数据对象数组的 Promise。
 * @throws {Error} 如果网络响应不成功 (如 404 Not Found)，则抛出错误。
 */
export async function fetchPostsIndex() {
    const response = await fetch(config.postsIndex);
    if (!response.ok) {
        throw new Error(`网络响应错误，状态码: ${response.status}`);
    }
    return response.json();
}

/**
 * 异步获取指定 Markdown 文件的内容。
 * @async
 * @param {string} fileName - 要获取的 Markdown 文件的名称 (例如 "post.md")。
 * @returns {Promise<string>} 一个解析为 Markdown 文本内容的 Promise。
 * @throws {Error} 如果找不到指定的文章文件，则抛出错误。
 */
export async function fetchMarkdownFile(fileName) {
    const response = await fetch(`${config.mdDir}${fileName}`);
    if (!response.ok) {
        throw new Error(`Markdown 文件未找到: ${fileName}`);
    }
    return response.text();
}