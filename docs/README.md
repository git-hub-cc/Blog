# 知识库结构与导航指南

欢迎来到本知识库！为了保持信息的高效检索与整洁，本工作区采用模块化的目录架构。所有的笔记、代码片段、项目文档和资源都被划分为五个核心主目录。

## 📂 核心目录说明

### 1. `00_Growth/` (个人成长与思维沉淀)
**定位：** 软技能、方法论、灵感孵化以及个人生活管理。
* **Inspiration/**: 灵感库。存放 AI 提示词（Prompts）、多角色设定、产品 MVP 规划（如 Webchat 的蓝图）等创新想法。
* **Life_Social/**: 生活与社交。涵盖英语学习（音标、交流技巧）、人脉管理、以及个人形象塑造等。
* **Management/**: 个人管理。习惯养成、戒瘾、计划制定与自我复盘。
* **Methodology/**: 方法论。思维框架、系统学习法、信息流处理与记忆技巧。

### 2. `10_Tech_Notes/` (技术硬核笔记)
**定位：** 计算机科学与软件开发的沉淀，按技术栈或领域严格分类。
* **Architecture/**: 架构设计。包含高级设计（DDD、微服务、CI/CD）与常见设计模式。
* **CS_Basics/**: 计算机基础。算法、数据结构、网络协议等底层核心理论。
* **Dev_Tools/**: 开发工具。Git、Maven 工作流及代码混淆等工具的常见命令与排错。
* **Frontend/ & Java_Core/**: 前后端语言与框架基础。如 HTML/CSS/JS、Vue、Electron，以及 Java 生命周期、并发、底层 API 等。
* **Lang_Framework/ & Middleware/**: 语言框架与中间件。SpringBoot 生态、Rust，以及 MySQL、Nginx、Redis、消息队列的部署与调优指北。
* **Troubleshooting/**: 踩坑与排错记录。按技术栈分类的 Error 解决文档。

### 3. `20_Workspace/` (当前工作区与实战库)
**定位：** 正在进行的项目、脚本工具和高频使用的代码片段。
* **Business_Docs/**: 业务演示与汇报文档。
* **Projects/**: 独立运行的工程代码或 Demo（如 Mybatis、Redis 测试工程，以及各类自动化辅助项目）。
* **Scripts/**: 提效自动化脚本。包括 Python 数据处理脚本、Shell/Bat 批处理、代理规则配置等。
* **Snippets/**: 代码片段。前后端的高频 Utils（如跨域、加密算法、多线程池封装）及 UML 绘图模板。

### 4. `30_Sys_Ops/` (系统运维与环境配置)
**定位：** 基础设施建设、操作系统配置与软件使用说明。
* **Deployment/**: 部署实战。Docker-compose 配置文件及各类服务（Gitlab, MySQL, Nginx）的容器化部署指南。
* **OS_Config/**: 操作系统。Linux 高级命令、Windows 注册表配置，以及双系统/虚拟机的环境搭建记录。
* **Software_Manual/**: 软件配置与快捷键。IDEA 偏好设置、各类云盘、内网穿透、AIGC 工具的使用说明。

### 5. `99_Assets/` (静态资产与参考资料)
**定位：** 不需要频繁修改的“只读”材料与大型文件。
* **Media_Files/**: 多媒体文件（影视、图片等流媒体相关资源）。
* **Reference_Data/**: 字典项、公开 API 接口、CDN 链接、状态码汇总以及各类参考物料。

---

## 🧭 新文档归档思路 (Decision Tree)

当你准备创建或保存一份新文档时，请按照以下思路判断它的归属：

**第一步：它是代码/实战项目，还是知识笔记？**
* 👉 **如果是独立项目、Demo、临时写的一个 Python/Bat 脚本**：放入 `20_Workspace/Projects` 或 `20_Workspace/Scripts`。
* 👉 **如果是一段可以直接 Copy 的高频工具类代码**：放入 `20_Workspace/Snippets`。
* 👉 **如果是知识点、笔记或说明文档**：继续往下看。

**第二步：这份知识笔记属于哪个大类？**
* **选项 A：技术原理与语言特性**
    * *例如：Vue 组件的生命周期、Java 多线程的底层实现、算法解析。*
    * 👉 放入 `10_Tech_Notes/` 下对应的技术栈目录。
    * *如果是开发过程中遇到的报错记录（如解决 `PrematureCloseException`）*，放 `10_Tech_Notes/Troubleshooting/Errors`。
* **选项 B：环境搭建、部署与软件配置**
    * *例如：如何配置 Ubuntu 的输入法、IDEA 的快捷键导出、Docker 部署 Redis 的 yml 文件。*
    * 👉 放入 `30_Sys_Ops/` (环境/配置 -> `OS_Config`；部署 -> `Deployment`；软件说明 -> `Software_Manual`)。
* **选项 C：个人想法、方法论与产品设计**
    * *例如：为新开发的跨平台聊天应用写的 AI 提示词、MVP 功能规划、或是学习英语的计划。*
    * 👉 放入 `00_Growth/` 下对应的分类（灵感/方法论/生活）。
* **选项 D：不怎么会修改的参考资料**
    * *例如：一份全国城市 JSON 字典、收集的开源 API 列表。*
    * 👉 放入 `99_Assets/Reference_Data/`。