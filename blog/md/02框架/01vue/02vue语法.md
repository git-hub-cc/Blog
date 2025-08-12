# Vue.js 语法分类大全 (Vue 3)

本文档旨在对 Vue 3 的核心语法进行系统性地分类和阐述。Vue 是一套用于构建用户界面的渐进式框架，其核心库只关注视图层，易于上手，也便于与第三方库或既有项目整合。

## 目录

1.  **基础与模板语法 (Template Syntax)**
2.  **响应式核心 (Reactivity Core)**
3.  **组件化开发 (Component-Based Development)**
4.  **生命周期 (Lifecycle Hooks)**
5.  **高级特性 (Advanced Features)**
6.  **Vue 生态系统核心 (Ecosystem Essentials)**

---

## 1. 基础与模板语法 (Template Syntax)

模板语法是 Vue 的基石，它允许我们以声明式的方式将 DOM 渲染与底层组件实例的数据相绑定。

### 1.1 插值 (Interpolations)

-   **文本插值**: 使用“Mustache”语法 (双大括号) 将数据渲染为文本。
    ```html
    <span>Message: {{ msg }}</span>
    ```
-   **原始 HTML**: 使用 `v-html` 指令输出真正的 HTML。**注意：有 XSS 安全风险，请仅在内容可信时使用。**
    ```html
    <p v-html="rawHtml"></p>
    ```
-   **Attribute 绑定**: 使用 `v-bind` 指令动态绑定 HTML Attribute。
    -   完整语法: `v-bind:href="url"`
    -   简写: `:href="url"`
    -   动态参数: `:[attributeName]="value"`
    ```html
    <a :href="dynamicUrl">...</a>
    <button :[attributeName]="'submitButton'">Submit</button>
    ```

### 1.2 指令 (Directives)

指令是带有 `v-` 前缀的特殊 attribute，当其表达式的值改变时，会产生响应式的影响。

-   **条件渲染**
    -   `v-if` / `v-else-if` / `v-else`: 根据表达式的真假值来有条件地渲染或销毁元素。
        ```html
        <div v-if="type === 'A'">A</div>
        <div v-else-if="type === 'B'">B</div>
        <div v-else>Not A/B</div>
        ```
    -   `v-show`: 根据表达式的真假值切换元素的 CSS `display` 属性。元素始终被渲染并保留在 DOM 中。
        ```html
        <h1 v-show="ok">Hello!</h1>
        ```
        **对比**: `v-if` 是“真实”的条件渲染，有更高的切换开销；`v-show` 有更高的初始渲染开销。

-   **列表渲染**
    -   `v-for`: 基于一个数组或对象来渲染一个列表。**必须使用 `:key` 提供一个唯一的标识符**。
        ```html
        <!-- 遍历数组 -->
        <li v-for="(item, index) in items" :key="item.id">
          {{ index }} - {{ item.message }}
        </li>
        
        <!-- 遍历对象 -->
        <div v-for="(value, key, index) in myObject" :key="key">
          {{ index }}. {{ key }}: {{ value }}
        </div>
        ```

-   **事件处理**
    -   `v-on`: 监听 DOM 事件，并在触发时运行一些 JavaScript 代码。
    -   完整语法: `v-on:click="handler"`
    -   简写: `@click="handler"`
    -   事件修饰符: `.stop`, `.prevent`, `.capture`, `.self`, `.once`, `.passive`
    -   按键修饰符: `.enter`, `.tab`, `.delete`, `.esc`, `.space`, `.up`, `.down`
        ```html
        <!-- 方法处理器 -->
        <button @click="greet">Greet</button>
        
        <!-- 阻止事件冒泡 -->
        <button @click.stop="doThis"></button>
        
        <!-- 按下回车键时提交 -->
        <input @keyup.enter="submit" />
        ```

-   **表单输入绑定**
    -   `v-model`: 在表单控件元素上创建双向数据绑定。它会根据控件类型自动选取正确的方法来更新值。
    -   修饰符: `.lazy` (改为在 `change` 事件中同步), `.number` (转为数字), `.trim` (去除首尾空格)
        ```html
        <!-- 文本输入 -->
        <input v-model.trim="message" placeholder="edit me" />

        <!-- 复选框 (单个) -->
        <input type="checkbox" v-model="checked" />

        <!-- 复选框 (多个，绑定到数组) -->
        <input type="checkbox" v-model="checkedNames" value="Jack" />

        <!-- 单选按钮 -->
        <input type="radio" v-model="picked" value="One" />

        <!-- 下拉选择框 -->
        <select v-model="selected">
          <option>A</option>
        </select>
        ```

-   **其他指令**
    -   `v-pre`: 跳过该元素及其所有子元素的编译。
    -   `v-once`: 只渲染元素和组件一次，随后的重新渲染将被跳过。
    -   `v-memo`: 记忆一个模板的子树。当绑定的数组中的值没有变化时，跳过更新。

---

## 2. 响应式核心 (Reactivity Core)

Vue 3 的核心是其响应式系统，主要通过 **组合式 API (Composition API)** 来使用。

### 2.1 响应式状态声明

-   `ref()`: 接受一个内部值，返回一个响应式的、可变的 ref 对象。该对象只有一个 `.value` 属性，指向该内部值。通常用于声明基本类型 (String, Number, Boolean) 的响应式状态。
    ```javascript
    import { ref } from 'vue'
    const count = ref(0)
    console.log(count.value) // 0
    count.value++
    ```
-   `reactive()`: 返回一个对象的响应式代理。通常用于声明复杂类型 (Object, Array) 的响应式状态。
    ```javascript
    import { reactive } from 'vue'
    const state = reactive({ count: 0, user: { name: 'Vue' } })
    state.count++
    ```

### 2.2 衍生状态与侦听

-   `computed()`: 声明一个计算属性，其值会根据其依赖的响应式状态自动更新。具有缓存特性，仅在依赖项改变时才重新计算。
    ```javascript
    import { ref, computed } from 'vue'
    const count = ref(1)
    const plusOne = computed(() => count.value + 1)
    console.log(plusOne.value) // 2
    ```
-   `watch()`: 侦听一个或多个响应式数据源，并在数据源变化时执行回调函数。可以精确控制侦听的目标和时机。
    ```javascript
    import { ref, watch } from 'vue'
    const question = ref('')
    watch(question, (newVal, oldVal) => {
      console.log(`Question changed from "${oldVal}" to "${newVal}"`)
    })
    ```
-   `watchEffect()`: 立即执行一个函数，并响应式地追踪其所有依赖，在依赖变更时重新运行该函数。
    ```javascript
    watchEffect(() => {
      console.log(`Current count is: ${count.value}`)
    })
    ```

---

## 3. 组件化开发 (Component-Based Development)

组件是 Vue 应用的核心构建块，允许我们将 UI 拆分为独立可复用的部分。

### 3.1 组件定义

在单文件组件 (`.vue` 文件) 中，一个组件由 `<template>`, `<script setup>`, 和 `<style>` 三部分组成。

```vue
<script setup>
// 逻辑与状态
import { ref } from 'vue'
const greeting = ref('Hello World!')
</script>

<template>
  <!-- 视图结构 -->
  <p class="greeting">{{ greeting }}</p>
</template>

<style scoped>
/* 样式 (scoped 表示样式只作用于当前组件) */
.greeting {
  color: red;
}
</style>
```

### 3.2 组件通信 (Props & Events)

-   **Props (父 -> 子)**: 父组件通过 props 向子组件传递数据。
    -   使用 `defineProps()` 宏来声明 props。
    ```javascript
    // In child component
    const props = defineProps({
      message: String,
      count: {
        type: Number,
        required: true,
        default: 0
      }
    })
    ```
    ```html
    <!-- In parent component -->
    <ChildComponent message="Hello from parent" :count="parentCount" />
    ```

-   **Events (子 -> 父)**: 子组件通过 `emits` 触发事件，将信息传递给父组件。
    -   使用 `defineEmits()` 宏来声明要触发的事件。
    ```javascript
    // In child component
    const emit = defineEmits(['update-count'])
    emit('update-count', 1)
    ```
    ```html
    <!-- In parent component -->
    <ChildComponent @update-count="handleUpdate" />
    ```

### 3.3 插槽 (Slots)

插槽是 Vue 组件中的一个内容分发 API，允许父组件向子组件的特定区域插入内容。

-   **默认插槽**: 子组件使用 `<slot></slot>` 标签作为占位符。
    ```html
    <!-- child-component.vue -->
    <button><slot>Default Text</slot></button>
    
    <!-- parent.vue -->
    <child-component>Click Me</child-component> <!-- "Click Me" 将替换 "Default Text" -->
    ```
-   **具名插槽**: 使用 `v-slot` 指令为插槽命名。
    ```html
    <!-- child-component.vue -->
    <header><slot name="header"></slot></header>
    <main><slot></slot></main>
    <footer><slot name="footer"></slot></footer>

    <!-- parent.vue -->
    <child-component>
      <template v-slot:header><h1>Header Content</h1></template>
      <template #default><p>Main Content</p></template> <!-- # 是 v-slot: 的简写 -->
      <template #footer><p>Footer Content</p></template>
    </child-component>
    ```

-   **作用域插槽**: 让插槽内容可以访问子组件的数据。
    ```html
    <!-- child-component.vue -->
    <ul>
      <li v-for="item in items">
        <slot name="item" :item-data="item"></slot>
      </li>
    </ul>

    <!-- parent.vue -->
    <child-component>
      <template #item="{ itemData }">
        <span>{{ itemData.text }}</span>
      </template>
    </child-component>
    ```

### 3.4 依赖注入 (Provide / Inject)

用于跨越多层级的组件通信，避免了繁琐的 props 逐层传递。

-   `provide()`: 在祖先组件中提供数据。
-   `inject()`: 在后代组件中注入数据。
    ```javascript
    // In ancestor component (e.g., App.vue)
    import { provide } from 'vue'
    provide('theme', 'dark')

    // In descendant component
    import { inject } from 'vue'
    const theme = inject('theme', 'light') // 'light' is the default value
    ```

---

## 4. 生命周期 (Lifecycle Hooks)

每个 Vue 组件实例在创建时都需要经历一系列的初始化过程，生命周期钩子允许我们在特定阶段添加自己的代码。

在 **Composition API** (`<script setup>`) 中，钩子函数需要从 `vue` 中导入并使用 `on` 前缀：

-   `onBeforeMount()`: 组件挂载到 DOM 前调用。
-   `onMounted()`: 组件挂载到 DOM 后调用（适合执行 DOM 操作、请求数据）。
-   `onBeforeUpdate()`: 数据更新，DOM 重新渲染前调用。
-   `onUpdated()`: DOM 重新渲染后调用。
-   `onBeforeUnmount()`: 组件实例卸载前调用（适合清理定时器、事件监听器）。
-   `onUnmounted()`: 组件实例卸载后调用。
-   `onErrorCaptured()`: 捕获来自后代组件的错误时调用。
-   `onRenderTracked()` / `onRenderTriggered()`: 用于调试响应式依赖。

```javascript
import { onMounted, onUnmounted } from 'vue'

onMounted(() => {
  console.log('Component has been mounted.')
})

onUnmounted(() => {
  console.log('Component will be unmounted.')
})
```

---

## 5. 高级特性 (Advanced Features)

### 5.1 组合式函数 (Composables)

组合式函数是利用 Vue 组合式 API 来封装和复用 **有状态逻辑** 的函数。它是一个约定，而不是一个具体的语法。

```javascript
// composables/useMouse.js
import { ref, onMounted, onUnmounted } from 'vue'

export function useMouse() {
  const x = ref(0)
  const y = ref(0)

  function update(event) {
    x.value = event.pageX
    y.value = event.pageY
  }

  onMounted(() => window.addEventListener('mousemove', update))
  onUnmounted(() => window.removeEventListener('mousemove', update))

  return { x, y }
}

// In any component
import { useMouse } from './composables/useMouse.js'
const { x, y } = useMouse()
```

### 5.2 自定义指令 (Custom Directives)

除了核心指令，Vue 也允许注册自定义指令。

```javascript
// main.js
const app = createApp(App)

// 注册一个全局自定义指令 `v-focus`
app.directive('focus', {
  // 当被绑定的元素挂载到 DOM 中时...
  mounted(el) {
    // 聚焦元素
    el.focus()
  }
})

// 在模板中使用
<input v-focus />
```

### 5.3 过渡与动画 (Transitions & Animation)

Vue 提供了 `<Transition>` 和 `<TransitionGroup>` 组件来处理元素进入/离开 DOM 时的过渡效果。

```html
<button @click="show = !show">Toggle</button>
<Transition name="fade">
  <p v-if="show">hello</p>
</Transition>
```
```css
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
```

### 5.4 Teleport

`<Teleport>` 是一个内置组件，它可以将一个组件内部的一部分模板“传送”到该组件的 DOM 结构外的位置。常用于模态框、通知等。

```html
<Teleport to="body">
  <div class="modal">
    <!-- Modal content -->
  </div>
</Teleport>
```

---

## 6. Vue 生态系统核心 (Ecosystem Essentials)

虽然不属于 Vue 核心语法，但这些工具是构建大型应用不可或缺的部分。

-   **构建工具**:
    -   **Vite**: 新一代前端构建工具，提供极速的冷启动和热模块更新（HMR）。是当前 Vue 3 项目的 **官方推荐**。
    -   **Vue CLI**: 基于 Webpack 的官方脚手架，稳定成熟，生态丰富。

-   **路由管理**:
    -   **Vue Router**: Vue 的官方路由管理器。用于构建单页面应用 (SPA)。

-   **状态管理**:
    -   **Pinia**: Vue 的新一代官方状态管理库，轻量、类型安全、易于使用，是 Vue 3 的 **官方推荐**。
    -   **Vuex**: 之前的官方状态管理库，在大型复杂应用中仍被广泛使用。

-   **开发者工具**:
    -   **Vue Devtools**: 用于调试 Vue 应用的浏览器扩展程序，极其强大和方便。

---

这份文档覆盖了 Vue 3 开发中最常用和最重要的语法概念。掌握这些内容将为你构建高质量的 Vue 应用打下坚实的基础。