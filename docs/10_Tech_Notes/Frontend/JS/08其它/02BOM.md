好的，这是一份关于浏览器对象模型（BOM）的完整文档，严格遵循您的要求，仅包含 BOM 相关内容，不涉及 DOM。

---

# BOM (Browser Object Model) 综合文档

## 摘要

BOM（Browser Object Model - 浏览器对象模型）是 Web API 的一部分，它允许 JavaScript 与浏览器窗口本身进行交互，而不是与页面内容（DOM）进行交互。BOM 没有一个正式的标准，但现代浏览器都实现了一套相似的核心对象、属性和方法。BOM 的核心是 `window` 对象，所有全局的 JavaScript 对象、函数和变量都自动成为 `window` 对象的成员。

本文档将详细介绍 BOM 的核心概念，包括其核心对象、属性方法、现代 API、交互机制、存储方案以及多页面通信技术。

---

## 1. BOM 核心对象

BOM 的所有对象都源于 `window` 对象。`window` 对象代表了整个浏览器窗口。

| 对象 | 描述 |
| :--- | :--- |
| **`window`** | BOM 的顶层和核心对象。它代表浏览器窗口。在全局作用域中声明的所有变量和函数都是 `window` 对象的属性和方法。 |
| **`navigator`** | 包含有关浏览器的信息，如名称、版本、用户代理字符串、语言等。 |
| **`screen`** | 包含有关用户屏幕的信息，如分辨率、色彩深度等。 |
| **`history`** | 包含浏览器的会话历史记录，允许脚本在用户的历史记录中向后和向前移动。 |
| **`location`** | 包含有关当前页面 URL 的信息，并提供了导航和重载页面的方法。 |

---

## 2. 核心对象的属性与方法

### 2.1 `window` 对象

`window` 对象是全局对象，因此其属性和方法可以被直接调用，无需 `window.` 前缀。

#### 属性

*   `window.innerWidth` / `window.innerHeight`: 浏览器窗口的视口（viewport）宽度和高度（不包括滚动条、菜单栏）。
*   `window.outerWidth` / `window.outerHeight`: 整个浏览器窗口的宽度和高度。
*   `window.scrollX` / `window.scrollY`: 页面在水平和垂直方向上已滚动的像素值。
*   `window.screenX` / `window.screenY`: 浏览器窗口左上角相对于屏幕左上角的 X 和 Y 坐标。
*   `window.location`: 指向 `location` 对象的引用。
*   `window.history`: 指向 `history` 对象的引用。
*   `window.navigator`: 指向 `navigator` 对象的引用。
*   `window.screen`: 指向 `screen` 对象的引用。
*   `window.self`: 对 `window` 对象自身的引用，等同于 `window`。
*   `window.top`: 返回最顶层的窗口对象（在多框架页面中非常有用）。
*   `window.parent`: 返回当前窗口的父窗口对象。
*   `window.opener`: 返回打开当前窗口的那个窗口的引用。

#### 方法

*   **定时器 (Timers)**
    *   `setTimeout(callback, delay, ...args)`: 在指定的延迟（毫秒）后执行一次回调函数。返回一个 ID，可用于 `clearTimeout`。
    *   `clearTimeout(timeoutID)`: 取消由 `setTimeout` 设置的定时器。
    *   `setInterval(callback, delay, ...args)`: 每隔指定的延迟（毫秒）重复执行回调函数。返回一个 ID，可用于 `clearInterval`。
    *   `clearInterval(intervalID)`: 取消由 `setInterval` 设置的重复定时器。

*   **窗口控制 (Window Control)**
    *   `open(url, target, features)`: 打开一个新的浏览器窗口或标签页。
    *   `close()`: 关闭由 `window.open()` 打开的窗口。
    *   `moveTo(x, y)` / `moveBy(dx, dy)`: 移动窗口到指定坐标或相对移动。
    *   `resizeTo(w, h)` / `resizeBy(dw, dh)`: 调整窗口到指定尺寸或相对调整。
    *   `scrollTo(x, y)` / `scrollBy(x, y)`: 将页面滚动到指定坐标或相对滚动。

*   **焦点控制 (Focus Control)**
    *   `focus()`: 使当前窗口获得焦点。
    *   `blur()`: 使当前窗口失去焦点。

### 2.2 `navigator` 对象

该对象主要用于获取浏览器和操作系统的基本信息。

*   `navigator.userAgent`: 返回由浏览器发送到服务器的用户代理（User Agent）字符串。**注意：** 此值易被篡改，不推荐用于功能检测。
*   `navigator.language` / `navigator.languages`: 返回浏览器的首选语言或语言数组。
*   `navigator.platform`: 返回浏览器运行的操作系统的字符串（例如 "Win32", "MacIntel", "Linux x86_64"）。
*   `navigator.onLine`: 返回一个布尔值，表示浏览器当前是否连接到网络。
*   `navigator.geolocation`: 返回一个 `Geolocation` 对象，用于访问设备的地理位置（现代 API）。
*   `navigator.mediaDevices`: 返回一个 `MediaDevices` 对象，用于访问摄像头、麦克风等媒体设备（现代 API）。

### 2.3 `location` 对象

用于处理当前页面的 URL。

#### 属性

*   `location.href`: 完整的 URL 字符串。修改此属性会导航到新的 URL。
*   `location.protocol`: URL 的协议部分（例如 "http:", "https:"）。
*   `location.host`: 主机名和端口号（例如 "www.example.com:8080"）。
*   `location.hostname`: 主机名（例如 "www.example.com"）。
*   `location.port`: 端口号。
*   `location.pathname`: URL 的路径部分（例如 "/path/to/page.html"）。
*   `location.search`: URL 的查询字符串部分（以 "?" 开头）。
*   `location.hash`: URL 的锚点/哈希部分（以 "#" 开头）。

#### 方法

*   `location.assign(url)`: 加载新的 URL，与直接修改 `location.href` 效果相同。
*   `location.replace(url)`: 用新的 URL 替换当前页面，新页面不会在 `history` 中留下记录，用户无法点击“后退”返回。
*   `location.reload(forceReload)`: 重新加载当前页面。`forceReload` 为 `true` 时会从服务器强制加载，绕过浏览器缓存。

### 2.4 `history` 对象

提供对浏览器会话历史的访问。

#### 属性

*   `history.length`: 返回会话历史中的 URL 数量。

#### 方法

*   `history.back()`: 导航到历史记录中的上一个页面，等同于点击浏览器的“后退”按钮。
*   `history.forward()`: 导航到历史记录中的下一个页面，等同于“前进”按钮。
*   `history.go(delta)`: 导航到历史记录中相对于当前页面的指定位置。`go(-1)` 等同于 `back()`，`go(1)` 等同于 `forward()`。

---

## 3. 现代 BOM API

随着 Web 技术的发展，BOM 增加了许多强大的现代 API。

*   **Fetch API**:
    *   `window.fetch(url, options)`: 一个现代的、基于 Promise 的网络请求 API，用于替代传统的 `XMLHttpRequest`。它提供了更强大、灵活的功能来获取网络资源。

*   **History API (用于 SPA)**:
    *   `history.pushState(state, title, url)`: 向会话历史栈中添加一个条目，但**不**会加载页面。这使得单页应用（SPA）可以改变 URL 而不刷新页面。
    *   `history.replaceState(state, title, url)`: 修改当前的历史记录条目，而不是添加新的。
    *   `popstate` 事件: 当用户通过浏览器按钮（后退/前进）或调用 `history.back()` / `history.forward()` / `history.go()` 导航时，会在 `window` 上触发 `popstate` 事件。

*   **URL API**:
    *   `new URL(urlString)`: 提供了一个构造函数，用于方便地解析和操作 URL。返回一个 URL 对象，包含 `protocol`, `hostname`, `searchParams` 等属性。
    *   `URLSearchParams`: 一个接口，提供了处理 URL 查询字符串的实用方法，如 `get()`, `set()`, `append()`, `delete()`。

*   **Web Workers**:
    *   允许脚本在后台线程中运行，而不会阻塞主线程（UI 线程）。这对于执行计算密集型任务非常有用，可以防止页面卡顿。
    *   `new Worker('worker.js')` 创建一个新的 Worker。

*   **Page Visibility API**:
    *   允许你检测页面当前是否对用户可见。这对于节省资源非常有用，例如当页面不可见时暂停视频播放或停止动画。
    *   `document.hidden` (属性): 返回一个布尔值，`true` 表示页面不可见。
    *   `visibilitychange` (事件): 当页面可见性改变时在 `document` 上触发。

---

## 4. 交互 (Interaction)

BOM 提供了多种与用户进行基本交互的方式。

*   **对话框 (Dialogs)**
    *   `alert(message)`: 显示一个带有一条消息和“确定”按钮的警告框。
    *   `confirm(message)`: 显示一个带有消息、“确定”和“取消”按钮的对话框。用户点击“确定”返回 `true`，点击“取消”返回 `false`。
    *   `prompt(message, defaultValue)`: 显示一个提示用户输入的对话框。返回用户输入的字符串，如果用户点击取消则返回 `null`。

*   **动画帧 (Animation Frames)**
    *   `requestAnimationFrame(callback)`: 请求浏览器在下一次重绘之前执行一个动画更新函数。这是实现平滑、高效 Web 动画的首选方法，它会根据浏览器的刷新率自动调整。
    *   `cancelAnimationFrame(id)`: 取消之前通过 `requestAnimationFrame` 注册的回调。

*   **事件 (Events)**
    *   `window.addEventListener('resize', callback)`: 当浏览器窗口大小改变时触发。
    *   `window.addEventListener('scroll', callback)`: 当页面滚动时触发。
    *   `window.addEventListener('online', callback)`: 当浏览器从离线状态变为在线状态时触发。
    *   `window.addEventListener('offline', callback)`: 当浏览器从在线状态变为离线状态时触发。

---

## 5. 存储 (Storage)

BOM 提供了在客户端浏览器中存储数据的机制。

| 机制 | 描述 | 生命周期 | 存储大小 | 通信 |
| :--- | :--- | :--- | :--- | :--- |
| **Cookies** | 存储在用户计算机上的小文本文件。每次 HTTP 请求都会将其发送到服务器。 | 可设置过期时间。 | 约 4KB | 与服务器通信 |
| **`sessionStorage`** | `window.sessionStorage`，仅在当前浏览器会话期间存储数据。 | 窗口或标签页关闭后清除。 | 约 5-10MB | 仅限同源的当前窗口 |
| **`localStorage`** | `window.localStorage`，在浏览器中永久存储数据，除非被手动清除。 | 永久，除非手动或通过代码清除。 | 约 5-10MB | 同源的所有窗口/标签页共享 |
| **IndexedDB** | 一个功能强大的客户端事务型数据库，用于存储大量结构化数据。 | 永久，除非手动或通过代码清除。 | 无明确上限（通常很大） | 同源的所有窗口/标签页共享 |

#### `localStorage` 和 `sessionStorage` 的 API

这两个对象的 API 完全相同：

*   `setItem(key, value)`: 存储一个键值对（值会自动转换为字符串）。
*   `getItem(key)`: 根据键获取值。
*   `removeItem(key)`: 删除指定的键值对。
*   `clear()`: 清除所有存储的项。
*   `key(index)`: 获取指定索引位置的键名。
*   `length`: 存储的项的数量。

---

## 6. 多页面通信

BOM 提供了多种在同一来源（origin）的不同浏览器标签页或窗口之间进行通信的机制。

*   **`localStorage` + `storage` 事件**:
    *   当一个页面的 `localStorage` 被修改时（通过 `setItem`, `removeItem`, `clear`），**其他**同源的页面会触发 `window` 上的 `storage` 事件。
    *   `window.addEventListener('storage', event => { ... })`
    *   `event` 对象包含 `key`, `oldValue`, `newValue`, `url` 等信息。

*   **Broadcast Channel API**:
    *   这是现代浏览器中专门用于跨页面通信的 API。
    *   `const bc = new BroadcastChannel('my_channel');` 创建或加入一个频道。
    *   `bc.postMessage(data);` 向频道内的所有监听者广播消息。
    *   `bc.onmessage = event => { console.log(event.data); };` 接收消息。
    *   `bc.close();` 关闭频道连接。

*   **Shared Workers**:
    *   一个可以被来自同源的多个浏览上下文（如窗口、标签页、iframe）共享的 Worker。所有这些上下文都可以与这个共享的 Worker 通信。

*   **`window.open` 和 `window.opener`**:
    *   当一个页面通过 `const childWindow = window.open(...)` 打开一个新窗口时，父页面可以通过 `childWindow` 对象引用子窗口，子窗口可以通过 `window.opener` 引用父窗口，从而实现双向通信。

---