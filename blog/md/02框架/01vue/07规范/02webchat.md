好的，遵照您的要求，我将开始撰写《WebChat 项目前端规范与最佳实践》文档。

这是一个内容详尽的文档，旨在沉淀项目中的优秀实践，并为未来的开发提供指导。本次输出为第一部分，内容涵盖 **项目结构**、**文件组织**、**编码规范** 与 **代码风格**。

---

# WebChat 项目前端规范与最佳实践 (Part 1/N)

## 📖 引言

### 1. 文档目的

本文档旨在记录和标准化 `WebChat` 项目前端开发过程中的各项规范、约定和最佳实践。其核心目的在于：

*   **提升代码质量与一致性**: 确保所有团队成员产出的代码风格统一、易于理解。
*   **降低维护成本**: 结构清晰、逻辑明确的代码更易于未来的功能迭代与 Bug 修复。
*   **提高开发效率**: 明确的规范可以减少不必要的决策和沟通成本，让开发者更专注于业务逻辑。
*   **加速新人上手**: 为新加入的成员提供一份清晰的“项目地图”和“操作手册”。

### 2. 适用范围

本规范适用于 `WebChat` 项目的所有前端代码，包括但不限于 `.vue`, `.js`, `.css`, `.json` 等文件。所有参与本项目的开发者都应遵守此规范。

### 3. 核心原则

*   **可读性优先**: 代码首先是写给人看的，其次才是给机器执行的。
*   **关注点分离 (SoC)**: 保持逻辑、视图、数据和服务的清晰界限。
*   **模块化与组件化**: 拥抱可复用的代码单元，避免重复造轮子。
*   **声明式优于命令式**: 尽可能利用 Vue 的响应式系统来描述“应该是什么样”，而不是“如何一步步去做”。
*   **拥抱最佳实践**: 积极采用社区公认的最佳实践，例如性能优化、可访问性等。

---

## 📂 1. 项目结构与文件组织

清晰的文件组织是项目可维护性的基石。本项目遵循“按功能划分” (Group by feature) 和“按类型划分” (Group by type) 相结合的策略。

### 1.1. 根目录结构

```
webchat-vue-refactor/
├── dist/             # 构建输出目录
├── public/           # 静态资源目录 (详见 1.3)
├── src/              # 源码目录 (详见 1.2)
├── .gitignore        # Git 忽略配置
├── index.html        # 应用入口 HTML
├── package.json      # 项目依赖与脚本
├── res-vue.md        # (项目资源文件，非代码)
└── vite.config.js    # Vite 构建配置
```

### 1.2. `src/` 源码目录详解

`src` 目录是项目开发的核心，所有需要经过 Vite 构建处理的源码都应存放于此。

```
src/
├── assets/           # 静态资源 (会被构建)
│   └── styles/       # 全局样式
│       ├── _base.css
│       ├── _variables.css
│       └── main.css
├── components/       # Vue 组件
│   ├── ChatList/
│   ├── ChatView/
│   ├── DetailsPanel/
│   ├── Modals/
│   └── Shared/
├── config/           # 应用配置
│   ├── AppSettings.js
│   ├── EmojiList.js
│   ├── LLMProviders.js
│   ├── McpTools.js
│   ├── ThemeList.js
│   └── ttsDefaults.js
├── services/         # 业务服务与逻辑封装
│   ├── apiService.js
│   ├── dbService.js
│   ├── eventBus.js
│   ├── locationService.js
│   ├── mediaCacheService.js
│   ├── mediaService.js
│   ├── sttService.js
│   └── webrtcService.js
├── stores/           # Pinia 状态管理
│   ├── callStore.js
│   ├── chatStore.js
│   ├── groupStore.js
│   ├── mapStore.js
│   ├── memoryStore.js
│   ├── settingsStore.js
│   ├── transferStore.js
│   ├── ttsStore.js
│   ├── uiStore.js
│   └── userStore.js
├── utils.js          # 通用工具函数
├── App.vue           # 根组件
└── main.js           # 应用入口脚本
```

*   **`assets/`**: 存放需要被 Vite 处理的静态资源。
    *   `styles/`: 全局 CSS 文件。使用 `_` 前缀表示其为被 `main.css` 导入的局部文件。
*   **`components/`**: 存放所有 Vue 组件。
    *   **按功能模块划分**: 将高内聚的组件组织在同一个目录下，例如 `ChatView/` 存放聊天视图相关组件，`Modals/` 存放各类弹窗。
    *   **`Shared/` 目录**: 存放可在多个模块中复用的通用基础组件，如 `IconButton.vue`, `Avatar.vue`, `Spinner.vue`。
*   **`config/`**: 存放应用的静态配置信息。这有助于将“易变”的配置与“稳定”的业务逻辑分离。
*   **`services/`**: 存放核心业务逻辑的封装。这些服务通常是单例的，并处理特定的领域问题（如 WebRTC 通信、API 请求、数据库交互）。
*   **`stores/`**: 存放所有 Pinia Store。每个 Store 负责管理应用的一个特定状态切片。
*   **`utils.js`**: 存放无副作用、与具体业务无关的纯函数工具，如日期格式化、ID 生成、防抖等。

### 1.3. `public/` 静态资源目录详解

`public` 目录下的文件不会被 Vite 构建处理，它们会被直接复制到输出目录 `dist` 的根路径下。

*   **适用场景**:
    1.  需要保持原始文件名和路径的资源（如 `hash.worker.js`）。
    2.  体积较大，不希望被 Base64 内联的图片或字体。
    3.  需要通过 `fetch` 动态加载的外部数据（如 `data/` 和 `themes/`）。
*   **目录内容**:
    *   `data/`: 存放主题相关的角色、课程等 `.json` 数据。实现了数据与视图的彻底解耦。
    *   `themes/`: 存放主题相关的 `.css` 文件，由 `settingsStore` 动态加载。
    *   `icons/`: 存放应用图标，如 `favicon.svg` 和地图标记图标。
    *   `hash.worker.js`: Web Worker 脚本必须放在 `public` 中，以便主线程能通过 URL 实例化它。

### 1.4. 文件命名规范

*   **Vue 组件**: 使用帕斯卡命名法（`PascalCase`），例如 `ChatList.vue`。
*   **JS/TS 文件**:
    *   服务、Store、配置文件等：使用驼峰命名法（`camelCase`），例如 `webrtcService.js`, `userStore.js`。
*   **CSS 文件**:
    *   使用烤肉串命名法（`kebab-case`），例如 `btth-dark.css`。
    *   被导入的局部样式文件使用下划线前缀，例如 `_variables.css`。
*   **JSON 数据文件**: 使用烤肉串命名法（`kebab-case`）或与主题/模块名保持一致，例如 `原神.json`。

---

## 🎨 2. 编码规范与代码风格

一致的编码风格是团队协作的润滑剂，能极大提升代码的可读性和可维护性。

### 2.1. Vue.js 编码风格

*   **组合式 API**: 项目统一使用 `<script setup>` 语法，它提供了更简洁、更高效的组合式 API 体验。
*   **Props 定义**:
    *   总是为 `props` 提供明确的类型定义。
    *   对于非布尔类型的 `props`，应提供合理的 `default` 值。
    *   使用 `required: true` 明确标示必需的 `props`。

    ```vue
    <!-- Good Example (from Avatar.vue) -->
    <script setup>
    defineProps({
      entity: {
        type: Object,
        required: true,
      },
      size: {
        type: String,
        default: 'medium', // 'small', 'medium', 'large', 'xl'
      },
    });
    </script>
    ```

*   **Emits 定义**: 使用 `defineEmits` 明确声明组件会触发的所有事件。

    ```vue
    <!-- Good Example (from CommentModal.vue) -->
    <script setup>
    const emit = defineEmits(['close']);
    </script>
    ```

*   **模板语法**:
    *   **指令缩写**: 使用 `:` 代替 `v-bind:`，使用 `@` 代替 `v-on:`。
    *   **`v-for` 与 `key`**: 总是为 `v-for` 提供一个唯一的 `key`。
    *   **布尔属性**: 属性值为 `true` 时，可省略其值。例如，使用 `<MyComponent disabled />` 而不是 `<MyComponent :disabled="true" />`。
    *   **组件命名**: 在模板中使用帕斯卡命名法（`PascalCase`），例如 `<ChatListItem />`。

### 2.2. JavaScript 风格

*   **模块化**:
    *   遵循 ES6 模块规范，使用 `import` 和 `export`。
    *   `import` 语句应按以下顺序组织和分组，以提高可读性：
        1.  外部依赖 (e.g., `vue`, `pinia`)
        2.  `@/` 路径的内部模块 (e.g., stores, services, utils)
        3.  `@/` 路径的组件
        4.  相对路径的本地模块 (e.g., `./ChildComponent.vue`)
        5.  样式导入
*   **命名**:
    *   **变量与函数**: 使用驼峰命名法 (`camelCase`)。
    *   **常量**: 使用大写蛇形命名法 (`UPPER_SNAKE_CASE`)，例如 `EMOJI_LIST`。
*   **异步操作**: 优先使用 `async/await` 语法处理 `Promise`，使异步代码更易读。
*   **函数**: 优先使用函数声明或 `const` 箭头函数，避免使用 `var`。

### 2.3. 注释规范

清晰的注释是理解代码意图的关键。

*   **文件头注释**: 对于核心的 `services`, `config`, `utils` 等文件，应添加文件头注释，说明其职责和作用。

    ```javascript
    /**
     * @file McpTools.js
     * @description (Vue Refactor) 定义 MCP (Meta Call Protocol) 可用的工具集。
     * @module McpTools
     * @exports {object} MCP_TOOLS - 全局可用的工具定义对象。
     */
    ```

*   **函数/方法注释**: 对外暴露的、逻辑复杂的函数应使用 JSDoc 风格进行注释，说明其功能、参数和返回值。

    ```javascript
    /**
     * 从视频 Blob 生成一张预览图 (Data URL)。
     * @param {Blob} videoBlob - 视频的 Blob 对象。
     * @returns {Promise<string>} - 返回一个包含预览图的 Data URL 字符串。
     */
    export const generateVideoThumbnail = (videoBlob) => { ... };
    ```

*   **逻辑块注释**: 对复杂的代码块或“魔法数字”，应添加行内或块级注释解释其目的。

    ```css
    /* ✅ FIX: Set a fixed height to match the real modal, preventing jumps during transition */
    height: 378px;
    ```

*   **装饰性注释**: 在 CSS 主题文件等位置，可以使用大型块注释来分隔区域、声明版权或设计理念，增强文件的可读性和美感。

    ```css
    /*
    ================================================================================
    |                                                                              |
    |           🔥 斗破苍穹 - 魔焰夜行 (深色主题) - REFACTORED V2 🔥              |
    |              - 设计理念: 异火辉光, 灵魂深邃, 斗气涌动 -                     |
    |                                                                              |
    ================================================================================
    */
    ```

### 2.4. CSS 架构与风格

*   **作用域样式**: **默认使用 `<style scoped>`**，以避免组件间的样式污染。
*   **:deep() 选择器**: 仅在需要修改子组件内部样式时谨慎使用。
*   **CSS 变量 (Design Tokens)**:
    *   **两层变量体系**:
        1.  **基础语义层 (`_variables.css`)**: 定义与主题无关的语义化变量，如 `--color-brand-primary`, `--font-size-base`, `--shadow-md`。这层变量在应用中直接使用。
        2.  **主题实现层 (`themes/*.css`)**: 针对特定主题，定义具体的色值、字体等“原始令牌”（如 `--dq-dark-heavenly-flame-red-rgb`），然后用这些令牌去**覆盖**基础语义层的变量。
    *   **好处**: 这种结构极大地解耦了 UI 组件和具体的主题样式。组件只关心“品牌主色”，而不需要知道这个颜色具体是红色还是蓝色。
    *   **示例**:

        ```css
        /* themes/动漫/btth-dark.css */
        body.theme-斗破苍穹-深色 {
            /* 1. 定义主题原始令牌 */
            --dq-dark-heavenly-flame-red-rgb: 210, 70, 40;
            
            /* 2. 覆盖基础语义变量 */
            --color-brand-primary: rgb(var(--dq-dark-heavenly-flame-red-rgb));
        }
        ```

*   **主题文件结构**: 所有主题 CSS 文件都应遵循以下结构，以保持一致性：
    1.  文件头装饰性注释
    2.  `1. Theme-specific Design Tokens` (定义主题原始令牌和覆盖语义变量)
    3.  `2. Global Style Overrides for this Theme` (全局的、非角色特定的样式调整)
    4.  `3. Character-specific Variable Application` (为特定角色 class 应用 `--character-*` 变量)
    5.  `4. Theme-specific Character Style Enhancements` (针对角色的更具体的样式增强)
*   **类名命名**:
    *   遵循一种类似 BEM 的块-元素（Block-Element）命名风格，例如 `.chat-list-root` (块), `.chat-list-header` (元素)。
    *   状态类使用 `is-` 或 `.active` 前缀，例如 `.is-open`, `.active`。

---
*(文档第一部分结束，后续将继续输出组件化开发、状态管理、性能优化等部分的规范...)*

好的，我们继续撰写《WebChat 项目前端规范与最佳实践》文档的第二部分。

这部分将深入探讨 **组件化开发**、**状态管理** 和 **性能优化**。这些是构建一个现代化、可扩展且高性能 Vue 应用的核心。

---

# WebChat 项目前端规范与最佳实践 (Part 2/N)

## 🧩 3. 组件化开发与设计模式

组件是 Vue 应用的原子单元。良好的组件设计是项目可维护性和可复用性的关键。本项目采用“组件驱动开发” (Component-Driven Development) 的思想，将 UI 拆分为独立、可组合的部件。

### 3.1. 组件拆分原则

*   **单一职责原则 (SRP)**: 每个组件应只关注一件事情，并把它做好。
    *   **正面范例**: `IconButton.vue` 只负责渲染一个带图标的按钮；`Avatar.vue` 只负责展示用户/群组的头像。
    *   **反面范例**: 避免创建一个包罗万象的“巨型”组件，例如一个同时处理用户列表、群组信息和 AI 设置的 `DetailsPanel.vue`。正确的做法是将其拆分为 `UserProfile.vue`, `GroupInfo.vue`, `AiSettings.vue` 等子组件。

*   **高内聚，低耦合**:
    *   **高内聚**: 将实现同一功能的 HTML、CSS 和 JavaScript 逻辑封装在同一个 `.vue` 文件中。
    *   **低耦合**: 组件应尽可能减少对外部状态的直接依赖，优先通过 `props` 接收数据，通过 `emits` 通知外部变化。这使得组件更易于测试和复用。

*   **通用性 vs. 业务性**:
    *   **通用组件 (`src/components/Shared/`)**: 这些组件不包含任何特定的业务逻辑，可以在项目的任何地方使用。它们通常通过 `props` 和 `slots` 高度可配置。
        *   **示例**: `Avatar.vue`, `Spinner.vue`, `ModalWrapper.vue`。
    *   **业务组件 (e.g., `src/components/ChatView/`)**: 这些组件与特定的业务场景紧密相关，直接与 Pinia Store 或 Service 交互。
        *   **示例**: `MessageBubble.vue` 包含了处理消息类型、状态的复杂逻辑；`ChatHeader.vue` 依赖 `chatStore` 和 `userStore` 来获取当前聊天信息。

### 3.2. 组件通信模式

选择合适的通信方式对于构建清晰的数据流至关重要。

*   **父子通信 (`props` / `emits`)**: 这是最主要、最推荐的通信方式。
    *   **Props down**: 父组件通过 `props`向子组件传递数据。
    *   **Events up**: 子组件通过 `emits` 向父组件发送事件，通知其状态变化或用户交互。
    *   **示例**: `ModalWrapper.vue` 通过 `title` prop 接收标题，通过 `close` emit 通知父组件关闭弹窗。

*   **全局状态管理 (Pinia)**: 对于跨多个组件、需要持久化的全局状态，应使用 Pinia Store。
    *   **适用场景**: 用户信息 (`userStore`)、聊天数据 (`chatStore`)、全局 UI 状态 (`uiStore`)。
    *   **规范**: 组件应优先通过 Getter (`computed`) 从 Store 读取数据，通过 Action (`function`) 修改数据。**严禁直接修改 Store 的 state**。

*   **全局事件总线 (`eventBus`)**: `eventBus` 作为一种补充，用于解耦非父子关系的模块之间的通信，尤其是在 Service 层和 UI 层之间。
    *   **适用场景**:
        1.  **Service -> UI**: `webrtcService` 收到消息后，通过 `eventBus.emit('webrtc:message', ...)` 通知 `chatStore`。
        2.  **UI -> Service (触发动作)**: 例如，在一个深层嵌套的组件中触发全局通知 `eventBus.emit('showNotification', ...)`，由 `NotificationContainer.vue` 监听并显示。
    *   **规范**:
        *   事件名应采用 `namespace:event-name` 的格式，例如 `webrtc:connected`, `file:dropped`。
        *   在组件的 `onMounted` 中监听事件，在 `onUnmounted` 中解绑事件，防止内存泄漏。

### 3.3. 插槽 (Slots)

插槽是创建可复用布局组件的强大工具。

*   **默认插槽**: 用于将不确定的内容分发到子组件中。
    *   **示例**: `ModalWrapper.vue` 的 `<main class="modal-body"><slot></slot></main>` 允许任何内容被放置在模态框的主体区域。
*   **具名插槽**: 用于将内容分发到子组件的特定位置。
    *   **示例**: `ModalWrapper.vue` 的 `<slot name="footer"></slot>` 允许父组件自定义模态框的脚部按钮区域。

### 3.4. 异步组件

为了优化首屏加载性能，非首屏立即需要的、或者体积较大的组件应使用异步加载。

*   **使用 `defineAsyncComponent`**: 它可以将组件的代码分割成一个单独的 chunk，只在需要时才进行网络请求和加载。
*   **结合 `Suspense` 或加载状态**: 为异步组件提供 `loadingComponent` 和 `delay` 选项，可以避免在快速网络下的加载闪烁，并提供更好的用户体验。
    *   **示例 (`DetailsPanel.vue`)**:

    ```javascript
    const UserProfile = defineAsyncComponent({
      loader: () => import('./sections/UserProfile.vue'),
      loadingComponent: SmoothSkeletonLoader, // 自定义带过渡的骨架屏
      delay: 200, // 200ms 内加载完成则不显示 loading
      suspensible: false
    });
    ```

---

## 🏬 4. 状态管理 (Pinia)

Pinia 是本项目官方的状态管理库，它提供了类型安全、模块化和对 Vue DevTools 的出色支持。

### 4.1. Store 职责划分

每个 Store 都是一个独立的模块，负责管理应用状态的一个特定领域。

*   **`userStore`**: 负责当前用户信息、联系人列表、全网在线用户状态。
*   **`chatStore`**: 负责所有聊天的消息数据、当前激活的聊天等。
*   **`groupStore`**: 负责群组信息、成员管理。
*   **`uiStore`**: 负责所有与 UI 相关的临时状态，如弹窗的显示/隐藏、详情面板状态、上下文菜单等。**此 Store 中的状态通常不进行持久化**。
*   **`settingsStore`**: 负责用户可配置的持久化设置，如主题、API 配置等。
*   **`callStore`**: 负责 WebRTC 通话的完整状态机，包括媒体流、通话状态、计时等。
*   **`transferStore`**: (新增) 专门处理文件传输的实时进度，将其与 `chatStore` 分离，避免高频更新导致 `chatStore` 的性能问题。
*   ... 其他 Store 类似。

### 4.2. Store 结构规范

每个 Store 文件应遵循 `State -> Getters -> Actions` 的结构。

*   **State (状态)**:
    *   使用 `ref()` 或 `reactive()` 定义。
    *   这是 Store 的唯一数据源。

*   **Getters (计算属性)**:
    *   使用 `computed()` 定义。
    *   用于从 State 派生出新的状态，例如排序、过滤后的列表。
    *   组件应优先使用 Getter 来读取和展示数据。
    *   **示例 (`chatStore.js`)**: `filteredChatList` getter 结合了 `uiStore` 的搜索词和过滤条件，对 `sortedChatList` getter 的结果进行二次处理。

*   **Actions (方法)**:
    *   使用 `function` 定义。
    *   是唯一可以修改 State 的地方。
    *   可以是异步的 (`async`)，可以包含复杂的业务逻辑。
    *   Action 内部可以调用其他 Action，也可以调用其他 Store 的 Action。
    *   **示例 (`chatStore.js`)**: `sendMessage` action 包含了创建消息、判断目标类型（AI/群组/P2P）、调用相应 Service、更新本地状态等一系列复杂逻辑。

### 4.3. 数据流与持久化

*   **单向数据流**:
    1.  **View (组件)**: 用户交互触发一个 Action。
    2.  **Action (Store)**: 执行业务逻辑，可能会调用 Service，然后修改 State。
    3.  **State (Store)**: 状态变更。
    4.  **View (组件)**: 依赖该 State 的 Getter 会自动重新计算，从而更新视图。

*   **数据持久化**:
    *   **统一入口**: 所有与 IndexedDB 的交互都必须通过 `dbService.js` 进行。
    *   **时机**: 数据持久化操作应在相关的 Action 内部完成。通常是在 State 修改之后。
    *   **示例 (`userStore.js`)**: `addContact` action 在更新 `contacts.value` 之后，会调用 `await dbService.setItem('contacts', newContact)`。

---

## ⚡ 5. 性能优化

性能是用户体验的生命线。项目中已集成了多种性能优化策略。

### 5.1. 渲染性能

*   **虚拟滚动**:
    *   **场景**: 聊天列表 (`ChatList.vue`) 和消息区域 (`MessageArea.vue`) 这类可能包含大量项目的长列表。
    *   **方案**: 使用 `vue-virtual-scroller` 库。它只渲染可视区域内的 DOM 元素，极大地减少了渲染开销和内存占用。
    *   **实践**:
        *   `RecycleScroller` 用于等高列表项（如聊天列表）。
        *   `DynamicScroller` 用于不等高列表项（如消息气泡）。

*   **防抖/节流**:
    *   **场景**: 对于高频触发的事件，如输入框 `input` (`ChatList.vue`)、窗口 `resize` (`App.vue`)。
    *   **方案**: 使用 `debounce`（防抖）函数（`utils.js`）延迟函数执行，直到事件停止触发一段时间后。使用 `throttle` (节流) 保证函数在一定时间间隔内最多执行一次。
    *   **示例**: `ChatList.vue` 中的搜索输入处理使用了 250ms 的防抖。`webrtcService.js` 中的传输统计计算使用了 500ms 的节流。

*   **动画优化**:
    *   **`v-auto-animate`**: 用于简单的列表增删改动画，提供了开箱即用的平滑过渡。
    *   **`@vueuse/motion`**: 用于更精细的、基于物理的动画，如弹窗的 `v-motion-pop` 效果。
    *   **CSS Transitions & Animations**: 优先使用 `transform` 和 `opacity` 属性来创建动画，因为它们能触发 GPU 加速，性能更高。
    *   **`will-change`**: 对即将发生变换的元素（如 `details-panel-container`）使用 `will-change` 属性，提示浏览器进行优化。

### 5.2. 加载性能

*   **防主题切换闪烁**:
    *   **方案**: 在 `index.html` 的 `<head>` 中内联一段阻塞式 JavaScript 脚本。
    *   **原理**: 该脚本在页面渲染任何内容之前执行，它会从 `localStorage` 读取用户保存的主题和配色方案设置，计算出最终应采用的 class（如 `theme-原神-深色`, `colorscheme-dark`），并立即应用到 `<html>` 标签上。同时，它还会为 `<html>` 设置一个近似的背景色，防止在 CSS 加载完成前出现白屏。
    *   **重要性**: 这是确保无缝主题切换、提升首屏体验的关键实践。

*   **代码分割**:
    *   Vite 默认会进行基于模块的代码分割。
    *   通过 `defineAsyncComponent` 手动进行组件级别的代码分割，将非核心组件（如所有 `Modals`）分离出去。

*   **构建优化**:
    *   `vite.config.js` 中配置 `terserOptions` 在生产构建时移除 `console.log` 和 `debugger`，减小打包体积。
    *   使用 `rollup-plugin-visualizer` 可以生成打包分析报告，帮助开发者识别并优化过大的模块。

### 5.3. 资源与计算性能

*   **Web Worker**:
    *   **场景**: 文件哈希计算是一个同步且计算密集型的操作，在主线程执行会阻塞 UI。
    *   **方案**: 创建 `hash.worker.js`，将文件 `Blob` 发送给 Worker 线程进行计算，并通过 `postMessage` 将结果返回。
    *   **好处**: 保持了界面的流畅响应，即使用户在上传大文件。

*   **图片优化**:
    *   **格式**: 优先使用 `.webp` 格式，因为它在同等质量下体积通常更小。通过 `settingsStore` 中的 `isWebPSupported` 标志位和 `Avatar.vue` 中的 `computed` 属性，实现了对不支持 WebP 的浏览器的优雅降级（回退到 `.png`）。
    *   **压缩**: 在用户上传自定义图片（如头像、地图分享图片）时，使用 Canvas 进行前端压缩（`utils.js` 中的 `compressImage`），控制上传文件的大小。
    *   **懒加载**: 对列表中的图片（如 `ResourceGridItem.vue`）添加 `loading="lazy"` 属性，让浏览器决定何时加载。

*   **视频优化**:
    *   **缩略图**: 对于视频文件，不在列表中直接渲染 `<video>` 元素（成本高昂）。而是在首次需要时，通过 `generateVideoThumbnail` 函数在前端生成一帧图像作为缩略图，并将其与原视频一同缓存在 IndexedDB 中，极大提升了资源列表的加载和滚动性能。

---
*(文档第二部分结束，下一部分将涵盖代码质量、可维护性、构建部署以及特色功能架构等内容...)*

好的，我们继续撰写《WebChat 项目前端规范与最佳实践》文档的最后一部分。

这部分将聚焦于 **代码质量与可维护性**、**构建与部署**，并对项目中几个 **特色功能的架构设计** 进行深入剖-析，将隐式的设计思想显式化。

---

# WebChat 项目前端规范与最佳实践 (Part 3/3)

## 🏆 6. 代码质量与可维护性

高质量、易于维护的代码是项目能够长期健康发展的保障。本节总结了确保代码健壮性和清晰度的实践。

### 6.1. 错误处理

健壮的错误处理机制能防止应用崩溃，并为用户提供清晰的反馈。

*   **全局错误捕获**:
    *   在 `main.js` 中配置 `app.config.errorHandler`，作为捕获 Vue 组件渲染和生命周期中未被捕获错误的最后一道防线。所有在此处捕获的错误都应被详细记录，以便于调试。

*   **异步操作错误处理**:
    *   所有 `async` 函数，特别是涉及网络请求 (`fetch`)、数据库操作 (`dbService`) 或 WebRTC 信令的，都必须包裹在 `try...catch` 块中。
    *   在 `catch` 块中，应至少执行以下操作：
        1.  使用 `log()` 工具函数记录详细的错误信息（`log(..., 'ERROR')`）。
        2.  向用户显示一个友好的错误提示，通常通过 `eventBus.emit('showNotification', { ... })`。
        3.  将应用状态恢复到一个安全的状态（例如，重置 `isLoading` 标志）。

*   **用户反馈**:
    *   **通知系统**: `NotificationContainer.vue` 作为一个全局监听 `showNotification` 事件的组件，为整个应用提供了一致、非阻塞的用户反馈方式（成功、失败、警告、信息）。
    *   **确认对话框**: 对于危险操作（如删除联系人、清空聊天记录），必须使用 `uiStore.showConfirmationModal` 弹出确认框，防止用户误操作。

### 6.2. 工具函数与配置

将通用逻辑和配置抽离出来，是保持代码整洁和“DRY” (Don't Repeat Yourself) 原则的关键。

*   **`utils.js` 工具函数库**:
    *   **职责**: 该文件是项目的“瑞士军刀”，存放所有与具体业务逻辑无关、可跨项目复用的纯函数。
    *   **规范**:
        *   函数必须是**纯函数**，即给定相同的输入，总是返回相同的输出，且没有副作用。
        *   每个函数都应有清晰的 JSDoc 注释，说明其功能、参数和返回值。
    *   **示例**: `log`, `debounce`, `generateId`, `formatDate`, `compressImage` 等。

*   **`config/` 配置中心**:
    *   **职责**: 将所有“魔法数字”、固定列表、API 端点等配置信息集中存放在 `src/config/` 目录下。
    *   **好处**:
        1.  **易于修改**: 当需要调整超时时间、API 地址或 Emoji 列表时，只需修改一个文件。
        2.  **代码清晰**: 业务代码中使用具名常量（如 `AppSettings.timeouts.callRequest`）代替了硬编码的数字 `30000`，使代码意图更明确。
    *   **示例**: `AppSettings.js`, `EmojiList.js`, `ThemeList.js`, `LLMProviders.js`, `McpTools.js`。

### 6.3. 可访问性 (Accessibility - a11y)

虽然项目目前在这方面还处于初级阶段，但已有的实践应被记录并推广。

*   **语义化 HTML**: 尽可能使用正确的 HTML 标签，如 `<header>`, `<nav>`, `<main>`, `<aside>`, `<button>` 等，来描述内容的结构和功能。
*   **`aria-label`**: 为没有可见文本标签的交互元素（尤其是 `IconButton`）提供 `aria-label` 或 `title` 属性，以帮助屏幕阅读器用户理解其功能。
*   **键盘导航**: 确保所有可点击的元素（`<button>`, `<a>`）都是可通过键盘 `Tab` 键聚焦并操作的。

### 6.4. 代码审查 (Code Review) - 建议

虽然未在文件中直接体现，但作为最佳实践，建议团队引入 Code Review 流程：

*   **目标**: 知识共享、发现潜在问题、保持代码风格一致。
*   **流程**: 所有新功能和重要修复都应通过 Pull Request (PR) 提交，并至少需要一名其他成员审查通过后才能合并。
*   **关注点**:
    *   是否遵循了本文档中的规范？
    *   逻辑是否清晰、健壮？是否存在边界情况未处理？
    *   是否存在潜在的性能问题？
    *   代码是否易于理解和维护？

---

## 🚀 7. 构建与部署

这部分内容主要围绕 `vite.config.js` 和 `package.json`。

### 7.1. Vite 配置

*   **`base: './'`**: 设置为相对路径，使得构建后的应用可以被部署在任意路径下（例如，通过 `file://` 协议直接打开，或部署到子目录）。
*   **`resolve.alias`**: 配置 `@` 别名指向 `src` 目录，简化了模块导入路径，提高了可维护性。
*   **`plugins`**:
    *   `@vitejs/plugin-vue`: 必须的 Vue 插件。
    *   `vite-plugin-node-polyfills`: 为前端项目提供了 Node.js 的核心模块 Polyfill（如 `Buffer`），这是 `simple-peer` 等库正常运行所必需的。
    *   `rollup-plugin-visualizer`: 在执行 `build` 命令时，会自动打开一个打包分析报告页面，帮助开发者直观地看到哪些依赖或模块占用了过大的体积。
*   **`build` 选项**:
    *   `chunkSizeWarningLimit`: 提高了分包大小警告的阈值，以适应项目中可能引入的较大第三方库。
    *   `terserOptions`: 在生产构建中自动移除 `console` 和 `debugger` 语句，减小代码体积并提高安全性。

### 7.2. 依赖管理

*   **`package.json`**:
    *   **`dependencies`**: 存放应用在生产环境下运行时必需的库，如 `vue`, `pinia`, `simple-peer`。
    *   **`devDependencies`**: 存放仅在开发过程中需要的工具，如 `vite`, `@vitejs/plugin-vue`, `rollup-plugin-visualizer`。
*   **版本锁定**: 建议使用 `package-lock.json` 文件来锁定依赖的具体版本，以确保团队成员和部署环境中的依赖一致性，避免“在我电脑上是好的”问题。
*   **依赖更新**: 定期（例如每季度）审查并更新项目依赖，以获取最新的功能、性能改进和安全补丁。推荐使用 `npm outdated` 命令检查过时依赖。

---

## 🏛️ 8. 特色功能与架构决策

本节深入剖-析项目中几个核心功能的架构设计，阐明其背后的设计思想。

### 8.1. WebRTC 通信架构

WebRTC 是本项目实现 P2P 通信的核心。其架构设计围绕 `webrtcService.js` 展开。

*   **职责分离**:
    *   **`webrtcService.js`**: 封装了所有 WebRTC 的复杂性。它负责：
        1.  **信令 (Signaling)**: 通过 WebSocket 与信令服务器交互，交换 SDP (Offer/Answer) 和 ICE Candidate。
        2.  **连接管理**: 创建 (`SimplePeer`)、维护和清理 `RTCPeerConnection`。
        3.  **数据通道 (DataChannel)**: 封装消息和文件的收发逻辑，包括分块传输、进度更新等。
        4.  **媒体流 (MediaStream)**: 处理音频、视频、屏幕共享流的添加和移除。
    *   **`callStore.js`**: 作为 WebRTC 的“状态机”和 UI 接口。它管理通话的整个生命周期状态（`isCallActive`, `isCallPending` 等），处理用户交互（如接听、挂断），并为 Vue 组件提供响应式的数据。
*   **数据流**:
    1.  **发起呼叫**: `callStore.startVideoCall()` -> `webrtcService.sendMessage()` (发送 `call-request`) -> 信令服务器。
    2.  **接收信令**: `webrtcService` 监听到 WebSocket 消息 -> `eventBus.emit()` -> `callStore` 监听事件并更新 UI (显示来电弹窗)。
    3.  **数据传输**: `chatStore.sendMessage()` -> `webrtcService.sendMessage()`/`sendFile()` -> `SimplePeer` 处理数据通道 -> 对方 `webrtcService` 监听到 `data` 事件 -> `eventBus.emit()` -> `chatStore` 处理接收到的消息。
*   **连接健壮性**:
    *   **ICE Restart**: 当检测到连接状态变为 `failed` 时，`webrtcService.restartIce` 会尝试重新进行 ICE 协商，以恢复可能中断的连接。
    *   **网络诊断**: `webrtcService.testNetwork` 和 `_diagnoseConnectionType` 提供了诊断工具，帮助判断连接是通过 P2P 还是 TURN 中继建立，便于排查问题。

### 8.2. 动态主题系统

项目实现了一套高度灵活、易于扩展的动态主题系统。

*   **核心驱动**: `settingsStore.js` 是主题系统的大脑。
*   **实现原理**:
    1.  **配置驱动**: `config/ThemeList.js` 定义了所有可用主题的元信息，包括主题名、CSS 文件路径和关联的角色数据 (`.json`) 路径。
    2.  **CSS 变量**: 系统大量使用 CSS 自定义属性（变量）。`_variables.css` 定义了基础的、语义化的变量。每个主题的 CSS 文件（`themes/**/*.css`）则负责**覆盖**这些基础变量的值，从而改变整个应用的视觉表现。
    3.  **动态加载**:
        *   当用户切换主题时，`settingsStore.applyTheme` 方法会更新 `<link id="theme-stylesheet" ...>` 元素的 `href` 属性，让浏览器动态加载新的主题 CSS 文件。
        *   同时，它会异步 `fetch` 该主题关联的 `.json` 数据文件，并更新 `specialContacts` 状态，从而动态改变“特殊联系人”列表。
    4.  **浅色/深色模式联动**: `settingsStore` 会监听系统配色方案的变化。当用户设置为“自动”时，它会自动切换到当前主题对应的浅色或深色版本（例如，从 `原神-浅色` 切换到 `原神-深色`），确保体验一致。

### 8.3. MCP (Meta Call Protocol) 架构

MCP 是项目中一个创新的设计，它赋予了 AI “调用外部工具”的能力，极大地扩展了其功能边界。

*   **架构组件**:
    1.  **工具定义 (`config/McpTools.js`)**: 这是一个“工具清单”，以结构化的 JSON 格式定义了每个可用工具的名称、描述、URL 模板和所需参数。这是 AI 理解“我能做什么”的基础。
    2.  **意图分析 (`apiService.js`)**: 当与启用了 MCP 的 AI 对话时，`apiService` 会构造一个特殊的“分析 Prompt”。这个 Prompt 包含了用户的原始问题和完整的工具清单，要求大模型 (LLM) 判断是否需要调用工具，如果需要，则返回一个特定格式的 JSON 对象 `{"tool_call": ...}`。
    3.  **工具执行 (`apiService.js`)**: 如果收到了 `tool_call` 指令，`_executeMcpTool` 函数会根据指令中的工具名和参数，解析 `url_template` 并发起一个真实的 `fetch` 请求。
    4.  **结果整合 (`apiService.js`)**: 工具执行的结果（成功或失败）会被再次格式化，并与用户的原始问题一起，构成一个新的“最终 Prompt”发送给 LLM。这个 Prompt 指示 AI：“你刚刚调用了 XX 工具，得到了 XX 结果，请基于这个结果，用自然语言回答用户。”
    5.  **流式输出**: 最终的回复以流式方式返回给用户，整个过程对用户来说是无缝的。

*   **优点**:
    *   **解耦**: AI 模型本身不需要知道如何查询天气或搜索网页，它只需要学会“生成正确的 JSON 指令”。工具的实现可以随时修改或替换，而无需改变 AI 模型。
    *   **可扩展性**: 增加新功能就像在 `McpTools.js` 中添加一个新的工具定义一样简单。
    *   **事实性**: 让 AI 能够获取实时、准确的外部信息，解决了其知识截止和“一本正经胡说八道”的问题。

---
*(文档全文结束)*