### 一、 图片类 (Images)

这类API主要用于在UI原型或Demo中填充图片位置。

#### 1. DummyImage.com (替代 Placeholder.com)

*   **简介**：一个功能强大的占位图生成器，提供指定尺寸的纯色矩形，并支持丰富的自定义选项。
*   **特点**：非常稳定、快速，是 `placeholder.com` 的完美替代品。
*   **示例 (获取300x200的图片)**：
    ```html
    <img src="https://dummyimage.com/300x200/ccc/000">
    ```
*   **自定义**：可以自定义背景色、文字颜色、文字内容和图片格式。
    ```html
    <!-- 蓝色背景，白色文字，内容为 "Demo" -->
    <img src="https://dummyimage.com/300x200/007bff/fff&text=Demo">
    
    <!-- 生成一个 .png 格式的图片 -->
    <img src="https://dummyimage.com/300x200/ccc/000.png">
    ```

#### 2. Picsum Photos

*   **简介**：提供来自 Unsplash 的高质量、真实的随机照片。
*   **特点**：比纯色占位图更美观，能让Demo看起来更真实。支持灰度、模糊等效果。
*   **示例 (获取300x200的随机图片)**：
    ```html
    <img src="https://picsum.photos/300/200">
    ```
*   **高级用法**：
    *   **指定图片ID**：`https://picsum.photos/id/237/300/200` (获取特定的一张图)
    *   **灰度效果**：`https://picsum.photos/300/200?grayscale`
    *   **模糊效果**：`https://picsum.photos/300/200?blur=2` (模糊程度1-10)


#### 3. DiceBear

*   **简介**：一个强大的、风格多样的头像生成库，提供API服务。
*   **特点**：非常适合用于生成用户列表、评论区的头像。有数十种预设风格。
*   **示例 (生成一个基于"my-seed"的像素风格头像)**：
    ```html
    <!-- 每次使用相同的 seed 会得到相同的头像 -->
    <img src="https://api.dicebear.com/8.x/pixel-art/svg?seed=my-seed">
    ```
*   **风格**：将 `pixel-art` 替换为 `adventurer`, `bottts`, `micah` 等可切换不同风格。

---

### 二、 文本类 (Text)

### 1. Hipster Ipsum API (风格化替代)

如果你想让你的占位文本看起来更“潮”一点，这个API是绝佳选择。

*   **简介**：一个生成带有“潮人/文青”风格词汇的占位文本API。
*   **特点**：风格独特，同样稳定可靠，可以控制段落和文本类型。
*   **示例 (获取3个段落的“潮人中心”风格文本)**：
    *   **URL**: `https://hipsum.co/api/?type=hipster-centric&paras=3`

*   **高级用法**：
    *   **获取拉丁文和潮人词汇混合的文本**: `https://hipsum.co/api/?type=hipster-latin&paras=3`
    *   **获取HTML格式 (带 `<p>` 标签)**: `https://hipsum.co/api/?type=hipster-centric&paras=3&format=html`

#### 2. Bacon Ipsum

*   **简介**：一个有趣的“乱数假文”生成器，内容全是关于各种肉类（主要是培根）。
*   **特点**：为你的Demo增添一丝幽默感。API稳定且可定制。
*   **示例 (获取3段关于肉的段落)**：
    *   **URL**: `https://baconipsum.com/api/?type=all-meat&paras=3`

#### 3. Quotable

*   **简介**：一个免费的、开源的名人名言API。
*   **特点**：返回结构化的JSON数据，包含名言内容、作者等信息。非常适合做“每日一句”或引用模块。
*   **示例 (获取一条随机名言)**：
    *   **URL**: `https://api.quotable.io/random`
    *   **返回JSON**:
        ```json
        {
          "_id": "...",
          "content": "The best way to predict the future is to invent it.",
          "author": "Alan Kay",
          "tags": ["Technology", "Future"],
          ...
        }
        ```

---

### 三、 结构化数据 / 模拟交互类 (Structured Data / Mock Interactions)

这一类API用于模拟后端，测试前端的数据请求、展示和交互逻辑。

#### 1. JSONPlaceholder

*   **简介**：模拟社交应用的经典REST API，包含帖子(posts)、评论(comments)、用户(users)等资源。
*   **特点**：**极其稳定可靠**，是学习和测试前端框架的“hello world”级API。支持所有HTTP方法 (GET, POST, PUT, PATCH, DELETE)。
*   **示例 (获取前10条帖子)**：`https://jsonplaceholder.typicode.com/posts?_limit=10`

#### 2. DummyJSON

*   **简介**：一个功能更丰富的模拟API，提供商品、购物车、用户、待办事项等多种数据类型。
*   **特点**：数据类型比JSONPlaceholder更贴近真实应用场景。支持搜索、分页等高级功能。
*   **示例 (获取商品列表)**：`https://dummyjson.com/products`

#### 3. Fake Store API

*   **简介**：一个专门模拟电商网站的API。
*   **特点**：提供现成的商品、分类、购物车和用户信息，非常适合电商类Demo。
*   **示例 (获取所有商品)**：`https://fakestoreapi.com/products`

#### 4. PokéAPI

*   **简介**：一个包含了海量宝可梦游戏数据的API，从精灵、技能到道具、地点应有尽有。
*   **特点**：数据结构清晰，内容有趣，深受开发者喜爱。
*   **示例 (获取皮卡丘的数据)**：`https://pokeapi.co/api/v2/pokemon/pikachu`
