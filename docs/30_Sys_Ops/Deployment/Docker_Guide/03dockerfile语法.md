好的，这是一个对 Dockerfile 语法进行完整分类和详细解释的文档。

---

# Dockerfile 语法分类详解

## 目录
1.  [引言：什么是 Dockerfile？](#1)
2.  [基本语法与格式](#2)
    *   指令与参数
    *   注释
    *   转义与换行
    *   解析器指令
3.  [指令分类详解](#3)
    *   [3.1 基础镜像指令 (Base Image)](#3.1)
    *   [3.2 构建上下文与文件操作指令 (Build Context & File Operations)](#3.2)
    *   [3.3 构建时命令指令 (Build-time Commands)](#3.3)
    *   [3.4 镜像元数据与配置指令 (Image Metadata & Configuration)](#3.4)
    *   [3.5 容器运行时指令 (Container Runtime)](#3.5)
    *   [3.6 构建控制指令 (Build Control)](#3.6)
4.  [高级主题：多阶段构建 (Multi-stage Builds)](#4)
5.  [最佳实践 (Best Practices)](#5)
6.  [完整示例：构建一个 Node.js 应用](#6)
7.  [总结](#7)

---

<a name="1"></a>
## 1. 引言：什么是 Dockerfile？

Dockerfile 是一个用来构建 Docker 镜像的文本文件，它包含了一系列用户可以调用来组建镜像的指令和参数。Docker 通过读取 Dockerfile 中的指令，自动地、一步步地执行这些操作，最终创建一个新的、自定义的镜像。

理解 Dockerfile 的核心在于理解**分层**的概念。Dockerfile 中的每一条指令（除少数例外）都会创建一个新的镜像层（Layer）。这些层被堆叠起来，并且每一层都是前一层变化的增量。这种分层结构使得镜像的构建、存储和分发变得高效，因为 Docker 可以重用未改变的层（缓存）。

<a name="2"></a>
## 2. 基本语法与格式

#### 指令与参数
Dockerfile 的基本格式是 `指令 参数`。指令不区分大小写，但为了与参数区分，习惯上将指令**大写**。
```dockerfile
# 示例
FROM ubuntu:22.04
```

#### 注释
以 `#` 开头的行被视为注释，会被 Docker 构建器忽略。
```dockerfile
# 这是一个注释
RUN apt-get update
```

#### 转义与换行
对于过长的指令（如 `RUN`），可以使用反斜杠 `\` 来换行。
```dockerfile
RUN apt-get update && apt-get install -y \
    package-one \
    package-two
```
> **注意**：注释行不支持 `\` 换行。

#### 解析器指令 (Parser Directives)
解析器指令是可选的，必须位于 Dockerfile 的**第一行**。它以 `# directive=value` 的形式出现，用于影响 Docker 构建器后续处理 Dockerfile 的方式。
*   `# syntax=docker/dockerfile:1`：指定用于构建的 Dockerfile 构建器的版本。这允许你使用最新的 Dockerfile 功能，而无需升级 Docker 守护进程。
*   `# escape=\``：更改默认的转义字符。在 Windows 上，`\` 是路径分隔符，此时可以将其更改为反引号 `` ` ``。

<a name="3"></a>
## 3. 指令分类详解

我们将 Dockerfile 的指令按其功能和作用域进行分类。

<a name="3.1"></a>
### 3.1 基础镜像指令 (Base Image)

这类指令定义了新镜像所基于的起点。

| 指令 | 描述 | 示例 |
| :--- | :--- | :--- |
| **`FROM`** | 指定基础镜像。它**必须是 Dockerfile 中的第一条非注释指令**。`FROM scratch` 表示创建一个完全空白的、不基于任何镜像的镜像。 | `FROM ubuntu:22.04`<br>`FROM golang:1.19 AS builder`<br>`FROM scratch` |

<a name="3.2"></a>
### 3.2 构建上下文与文件操作指令 (Build Context & File Operations)

这类指令用于将文件从构建上下文（通常是 Dockerfile 所在的目录）复制到镜像的文件系统中。

| 指令 | 描述 | 示例 |
| :--- | :--- | :--- |
| **`COPY`** | 将文件或目录从构建上下文复制到镜像中。功能直接，是**首选**的文件复制指令。支持 `--chown=<user>:<group>` 来改变文件所有权，以及 `--from=<stage_name>` 用于多阶段构建。 | `COPY . /app`<br>`COPY package.json /app/`<br>`COPY --chown=app:app ./src /app/src` |
| **`ADD`** | 功能上是 `COPY` 的超集。除了复制文件，它还有两个额外功能：1. 如果源是 URL，它会下载文件。2. 如果源是本地的 tar 压缩包（如 `.tar.gz`, `.tar.bz2`），它会自动解压到目标路径。**由于其行为不确定性（特别是自动解压），通常推荐使用 `COPY`**。 | `ADD http://example.com/file.txt /`<br>`ADD rootfs.tar.gz /` |

<a name="3.3"></a>
### 3.3 构建时命令指令 (Build-time Commands)

这类指令在**镜像构建过程**中执行命令，用于安装软件、编译代码、创建目录等。

| 指令 | 描述 | 示例 |
| :--- | :--- | :--- |
| **`RUN`** | 在当前镜像的顶层执行命令，并提交结果作为新的镜像层。它有两种形式：<br>1. **Shell 格式**: `RUN <command>` (在 `/bin/sh -c` 中运行)<br>2. **Exec 格式**: `RUN ["executable", "param1", "param2"]` (直接运行，不通过 shell) <br>为了减少镜像层数，通常使用 `&&` 连接多个命令。 | `RUN apt-get update && apt-get install -y nginx`<br>`RUN ["/bin/bash", "-c", "echo hello"]` |

<a name="3.4"></a>
### 3.4 镜像元数据与配置指令 (Image Metadata & Configuration)

这些指令不执行命令，而是为镜像设置元数据或定义构建/运行时的默认配置。

| 指令 | 描述 | 示例 |
| :--- | :--- | :--- |
| **`LABEL`** | 为镜像添加键值对形式的元数据，如维护者、版本号等。 | `LABEL maintainer="support@example.com"`<br>`LABEL version="1.0" description="My App"` |
| **`ENV`** | 设置环境变量。这些变量在构建过程（`RUN`）和容器运行（`CMD`, `ENTRYPOINT`）时都可用。 | `ENV APP_VERSION=1.0`<br>`ENV JAVA_HOME=/usr/lib/jvm/java-11-openjdk` |
| **`ARG`** | 定义构建时变量。用户可以在 `docker build` 命令中使用 `--build-arg <varname>=<value>` 来传递。`ARG` 定义的变量在 `FROM` 指令之前也有效。**注意**：`ARG` 变量在镜像构建完成后不可用，除非它被 `ENV` 指令使用。 | `ARG USER_ID=1000`<br>`RUN useradd -u ${USER_ID} myuser` |
| **`WORKDIR`** | 设置后续指令（`RUN`, `CMD`, `ENTRYPOINT`, `COPY`, `ADD`）的工作目录。如果目录不存在，`WORKDIR` 会自动创建它。 | `WORKDIR /app` |
| **`USER`** | 设置运行后续指令（`RUN`, `CMD`, `ENTRYPOINT`）以及容器启动时的用户和用户组。为了安全，推荐创建并使用非 root 用户。 | `USER myuser`<br>`USER myuser:mygroup` |
| **`EXPOSE`** | 声明容器在运行时监听的网络端口。这**仅仅是元数据**，起到文档作用，并不会实际发布端口。在 `docker run` 时使用 `-p` 或 `-P` 才会真正将端口映射到主机。 | `EXPOSE 80/tcp`<br>`EXPOSE 8080` |
| **`VOLUME`** | 创建一个具有指定名称的挂载点，并将其标记为持有外部挂载的卷。用于数据持久化。 | `VOLUME /var/log`<br`VOLUME ["/data"]` |

<a name="3.5"></a>
### 3.5 容器运行时指令 (Container Runtime)

这些指令定义容器启动时默认执行的命令。

| 指令 | 描述 | 示例 |
| :--- | :--- | :--- |
| **`CMD`** | 为执行容器提供默认命令。一个 Dockerfile 中只能有一条 `CMD` 指令，多条只有最后一条生效。其值可以被 `docker run` 后面的命令覆盖。有三种形式：<br>1. **Exec 格式（推荐）**: `CMD ["executable", "param1"]`<br>2. **Shell 格式**: `CMD command param1`<br>3. **参数格式**: `CMD ["param1", "param2"]` (作为 `ENTRYPOINT` 的默认参数) | `CMD ["nginx", "-g", "daemon off;"]`<br>`CMD ["/usr/bin/executable"]` |
| **`ENTRYPOINT`** | 配置容器使其作为可执行程序运行。它的命令**不会**被 `docker run` 后面的命令轻易覆盖，而是将 `docker run` 的参数附加到 `ENTRYPOINT` 命令之后。一个 Dockerfile 中也只能有一条 `ENTRYPOINT`。 | `ENTRYPOINT ["java", "-jar", "app.jar"]` |
| **`HEALTHCHECK`** | 定义如何检查容器的健康状态。Docker 会定期运行这个命令来判断容器是否仍在正常工作。 | `HEALTHCHECK --interval=5m --timeout=3s CMD curl -f http://localhost/ || exit 1` |
| **`STOPSIGNAL`** | 设置发送到容器以使其退出的系统调用信号。默认是 `SIGTERM`。 | `STOPSIGNAL SIGQUIT` |
| **`SHELL`** | 覆盖用于 `shell` 格式命令的默认 shell。Linux 默认是 `["/bin/sh", "-c"]`，Windows 是 `["cmd", "/S", "/C"]`。 | `SHELL ["/bin/bash", "-c"]` |

#### `ENTRYPOINT` 与 `CMD` 的交互

`ENTRYPOINT` 和 `CMD` 的组合使用非常普遍，可以创建灵活且易于使用的镜像。

| `ENTRYPOINT` | `CMD` | 运行效果 |
| :--- | :--- | :--- |
| 未定义 | `["cmd", "p1"]` | 运行 `cmd p1`。`docker run <image> new_cmd` 会运行 `new_cmd`。 |
| `["ep", "p1"]` | 未定义 | 运行 `ep p1`。`docker run <image> new_p` 会运行 `ep p1 new_p`。 |
| `["ep", "p1"]` | `["cmd", "p2"]` | 运行 `ep p1 cmd p2`。`docker run <image> new_p` 会运行 `ep p1 new_p`。 |

**最佳实践组合**：使用 `ENTRYPOINT` 定义主命令，使用 `CMD` 定义默认参数。
```dockerfile
ENTRYPOINT ["/usr/bin/ping"]
CMD ["localhost"]
# docker run my-ping          -> /usr/bin/ping localhost
# docker run my-ping google.com -> /usr/bin/ping google.com
```

<a name="3.6"></a>
### 3.6 构建控制指令 (Build Control)

| 指令 | 描述 | 示例 |
| :--- | :--- | :--- |
| **`ONBUILD`** | 添加一个“触发器”指令。当一个镜像A被用作另一个镜像B的**基础镜像**时，镜像A中的 `ONBUILD` 指令才会在构建镜像B时被执行。常用于创建可复用的、通用的基础镜像。 | `ONBUILD COPY . /app/src` |


<a name="4"></a>
## 4. 高级主题：多阶段构建 (Multi-stage Builds)

多阶段构建是一个强大的功能，它允许你在一个 Dockerfile 中使用多个 `FROM` 指令。每个 `FROM` 指令都可以开始一个新的构建阶段，并且可以给它命名（`AS <name>`）。

**主要目的**：减小最终镜像的体积。你可以将编译、测试等重量级操作放在一个包含完整构建环境的“构建阶段”，然后只将最终的产物（如可执行文件、静态资源）复制到一个轻量级的“运行阶段”镜像中。

**语法**：
1.  使用 `FROM <image> AS <stage_name>` 来命名一个阶段。
2.  使用 `COPY --from=<stage_name> <source> <destination>` 从之前的阶段复制文件。

**示例（编译一个 Go 应用）**：
```dockerfile
# ---- 构建阶段 ----
FROM golang:1.19 AS builder

WORKDIR /app
COPY . .
# 编译 Go 应用，生成静态链接的可执行文件
RUN CGO_ENABLED=0 GOOS=linux go build -o myapp .

# ---- 运行阶段 ----
FROM scratch

# 从 builder 阶段复制编译好的可执行文件
COPY --from=builder /app/myapp /myapp

# 定义容器启动命令
ENTRYPOINT ["/myapp"]
```
这个例子中，最终的镜像只包含 `myapp` 这个可执行文件，体积非常小，而包含 Go 编译器等工具的 `golang:1.19` 镜像则被丢弃。

<a name="5"></a>
## 5. 最佳实践 (Best Practices)

1.  **使用 `.dockerignore` 文件**：在构建上下文的根目录创建 `.dockerignore` 文件，排除不需要发送到 Docker 守护进程的文件（如 `.git`, `node_modules`, `*.log`, `secrets`），可以加快构建速度并提高安全性。
2.  **利用构建缓存**：合理安排指令顺序。将不经常变化的指令（如 `FROM`, `LABEL`, 安装基础依赖的 `RUN`）放在前面，将经常变化的指令（如 `COPY . .`）放在后面。
3.  **合并 `RUN` 指令**：使用 `&&` 将多个 `RUN` 命令合并为一条，以减少镜像层数。同时，在安装包后及时清理缓存（如 `apt-get clean`）。
4.  **优先使用 `COPY`**：`COPY` 比 `ADD` 更透明、更可预测。只有在需要自动解压或下载 URL 时才考虑 `ADD`。
5.  **使用多阶段构建**：对于编译型语言（Go, Java, C++）或需要构建步骤（Node.js, Python with compiled extensions）的应用，务必使用多阶段构建来保持最终镜像的精简。
6.  **使用非 root 用户**：通过 `USER` 指令切换到非 root 用户运行应用，遵循最小权限原则，提高安全性。
7.  **使用明确的镜像标签**：避免使用 `latest` 标签，应使用具体的版本号（如 `ubuntu:22.04`），以保证构建的可重复性。
8.  **`CMD` 和 `ENTRYPOINT` 使用 Exec 格式**：Exec 格式 (`["executable", "param"]`) 是首选，因为它不会调用 shell，可以避免 shell 的解析问题，并且能正确处理信号。

<a name="6"></a>
## 6. 完整示例：构建一个 Node.js 应用

这个例子展示了多阶段构建、缓存利用和安全最佳实践。

假设目录结构如下：
```
.
├── .dockerignore
├── Dockerfile
├── package.json
├── package-lock.json
└── src/
    └── index.js
```

`.dockerignore` 文件内容：
```
node_modules
npm-debug.log
.git
```

`Dockerfile` 文件内容：
```dockerfile
# ---- 1. 依赖安装阶段 ----
# 使用一个明确版本的 Node.js 镜像作为构建环境
FROM node:18-alpine AS deps

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 lock 文件
# 这一步单独复制，以便利用 Docker 缓存。只有当这两个文件变化时，npm install 才会重新运行。
COPY package.json package-lock.json ./

# 安装生产环境依赖
RUN npm ci --only=production


# ---- 2. 构建阶段 (如果需要编译，例如 TypeScript) ----
# 这里可以添加一个构建阶段，例如 `npm run build`
# FROM deps AS builder
# WORKDIR /app
# COPY . .
# RUN npm run build


# ---- 3. 最终运行阶段 ----
# 使用一个更小的、安全的官方 Node.js 镜像
FROM node:18-alpine AS final

# 设置环境变量
ENV NODE_ENV=production

# 创建一个非 root 用户来运行应用
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# 设置工作目录
WORKDIR /app

# 从 deps 阶段复制 node_modules
COPY --from=deps --chown=appuser:appgroup /app/node_modules ./node_modules

# 复制应用源代码
COPY --chown=appuser:appgroup . .

# 暴露应用端口
EXPOSE 3000

# 定义容器启动命令
CMD ["node", "src/index.js"]
```

<a name="7"></a>
## 7. 总结

Dockerfile 是 Docker 镜像自动化构建的基石。掌握其语法、指令分类和最佳实践，对于创建高效、安全、可维护的 Docker 镜像至关重要。理解其分层和缓存机制是优化构建过程的关键，而采用多阶段构建和非 root 用户等安全措施则是生产环境中不可或缺的一环。