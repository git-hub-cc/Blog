好的，这是一份对 Docker Compose 语法进行分类整理的完整文档。文档从基本概念入手，对核心的 `services` 定义进行了详细的分类说明，并涵盖了网络、数据卷等顶级元素的配置，最后提供了一个综合示例。

---

# Docker Compose 语法详解

## 一、 简介

### 1. 什么是 Docker Compose?
Docker Compose 是一个用于定义和运行多容器 Docker 应用程序的工具。通过一个 YAML 文件 (`compose.yml` 或 `docker-compose.yml`) 来配置应用的服务、网络和数据卷，然后使用简单的命令，就可以创建并启动所有服务。

### 2. 核心优势
- **单文件定义多服务**：将复杂的应用架构（如 Web服务器 + 数据库 + 缓存）清晰地定义在一个文件中。
- **环境一致性**：确保开发、测试、生产环境拥有一致的运行配置。
- **简化命令**：使用 `docker compose up` 和 `docker compose down` 等简单命令即可管理整个应用生命周期。
- **服务编排**：管理服务间的依赖关系、网络通信和数据共享。

### 3. 文件结构与版本
现代的 Docker Compose 使用 **Compose Specification**，不再强制要求在文件顶部声明 `version`。文件通常命名为 `compose.yml`。

一个基本的 `compose.yml` 文件结构如下：

```yaml
# 顶级键，定义所有服务
services:
  # 服务A的名称，例如 "webapp"
  webapp:
    # 服务A的具体配置...

  # 服务B的名称，例如 "database"
  database:
    # 服务B的具体配置...

# 顶级键，定义网络
networks:
  # ...

# 顶级键，定义数据卷
volumes:
  # ...

# 顶级键，定义配置
configs:
  # ...

# 顶级键，定义密钥
secrets:
  # ...
```

---

## 二、 核心：服务定义 (`services`)

`services` 是 `compose.yml` 文件中最核心的部分，它定义了构成应用程序的各个容器。下面对服务内部的指令进行分类说明。

### A. 镜像与构建 (Image & Build)

用于指定服务使用的镜像。二者通常只选其一。

| 指令 | 描述 | 示例 |
| :--- | :--- | :--- |
| `image` | 指定要拉取的镜像，可以包含标签/版本号。如果本地不存在，Compose会尝试从 Docker Hub 或其他配置的镜像仓库拉取。 | `image: "node:18-alpine"`<br>`image: "postgres:15"` |
| `build` | 指定从 Dockerfile 构建镜像。 | **简单形式** (Dockerfile在当前目录):<br>`build: .`<br><br>**对象形式** (更详细的配置):<br>`build:`<br>`  context: ./backend`  (Dockerfile所在目录)<br>`  dockerfile: Dockerfile.prod` (指定Dockerfile文件名)<br>`  args:` (构建时参数)<br>`    - "APP_VERSION=1.2"`<br>`  cache_from:` (构建缓存来源)<br>`    - "my-registry/my-app:cache"` |

### B. 命令与入口 (Command & Entrypoint)

用于覆盖 Dockerfile 中的默认命令。

| 指令 | 描述 | 示例 |
| :--- | :--- | :--- |
| `command` | 覆盖容器启动后默认执行的命令 (Dockerfile 中的 `CMD`)。 | **字符串形式**:<br>`command: "bundle exec thin -p 3000"`<br><br>**列表形式 (推荐)**:<br>`command: ["python", "app.py"]` |
| `entrypoint` | 覆盖容器的入口点 (Dockerfile 中的 `ENTRYPOINT`)。 | `entrypoint: ["/usr/local/bin/my-entrypoint.sh"]` |

### C. 网络配置 (Networking)

定义容器如何与外界和其他容器通信。

| 指令 | 描述 | 示例 |
| :--- | :--- | :--- |
| `ports` | 将容器端口映射到主机端口。 | **短语法** (`HOST:CONTAINER`):<br>`ports:`<br>`  - "8080:80"`<br><br>**长语法** (更灵活):<br>`ports:`<br>`  - target: 80` (容器内端口)<br>`    published: 8080` (主机端口)<br>`    protocol: tcp`<br>`    mode: host` |
| `expose` | 仅将端口暴露给同一网络下的其他服务，但不映射到主机。 | `expose:`<br>`  - "3000"`<br>`  - "8000"` |
| `networks` | 将服务连接到一个或多个网络。 | `networks:`<br>`  - my_app_net` (连接到名为 my_app_net 的网络)<br><br>**指定别名和IP**:<br>`networks:`<br>`  my_app_net:`<br>`    aliases:`<br>`      - "api"`<br>`    ipv4_address: 172.16.238.10` |
| `depends_on` | 定义服务间的启动依赖关系。 | **简单形式** (只等待服务启动):<br>`depends_on:`<br>`  - db`<br>`  - redis`<br><br>**条件形式** (等待服务健康):<br>`depends_on:`<br>`  db:`<br>`    condition: service_healthy` |
| `links` | **（已废弃）** 连接到其他服务。现代Compose推荐使用自定义网络进行服务发现。 | `links:`<br>`  - "db"`<br>`  - "db:database"` |

### D. 数据持久化 (Data Persistence)

用于在容器生命周期之外保存数据。

| 指令 | 描述 | 示例 |
| :--- | :--- | :--- |
| `volumes` | 挂载主机路径或命名数据卷到容器内。 | **命名数据卷 (推荐)**:<br>`volumes:`<br>`  - "db_data:/var/lib/postgresql/data"`<br><br>**绑定挂载 (主机路径)**:<br>`volumes:`<br>`  - "./my-app:/app"`<br><br>**只读挂载**:<br>`volumes:`<br>`  - "./config.json:/app/config.json:ro"`<br><br>**长语法**:<br>`volumes:`<br>`  - type: volume`<br>`    source: mydata` (命名卷)<br>`    target: /data`<br>`  - type: bind`<br>`    source: ./static`<br>`    target: /app/static` |

### E. 环境变量与配置 (Environment & Configuration)

向容器传递配置信息。

| 指令 | 描述 | 示例 |
| :--- | :--- | :--- |
| `environment` | 设置环境变量。 | **列表形式**:<br>`environment:`<br>`  - "RACK_ENV=development"`<br>`  - "SHOW=true"`<br><br>**字典形式**:<br>`environment:`<br>`  POSTGRES_USER: myuser`<br>`  POSTGRES_PASSWORD: mypassword` |
| `env_file` | 从文件导入环境变量。 | **单个文件**:<br>`env_file: .env`<br><br>**多个文件 (先读的优先)**:<br>`env_file:`<br>`  - ./common.env`<br>`  - ./prod.env` |
| `configs` | 将 Compose `configs` 顶级元素中定义的配置文件挂载到容器中。 | `configs:`<br>`  - source: my_config`<br>`    target: /etc/my_config.conf`<br>`    uid: '103'`<br>`    gid: '103'`<br>`    mode: 0440` |
| `secrets` | 将 Compose `secrets` 顶级元素中定义的密钥挂载到容器中。密钥在容器中显示为文件。 | `secrets:`<br>`  - source: db_password`<br>`    target: /run/secrets/db_password` |

### F. 资源与部署 (Resources & Deployment)

控制容器的资源限制和行为。

| 指令 | 描述 | 示例 |
| :--- | :--- | :--- |
| `deploy` | **（主要用于Swarm模式）** 定义与服务部署和运行相关的配置。 | `deploy:`<br>`  replicas: 3` (副本数)<br>`  restart_policy:` (重启策略)<br>`    condition: on-failure`<br>`  resources:` (资源限制)<br>`    limits:`<br>`      cpus: '0.50'`<br>`      memory: 512M`<br>`    reservations:`<br>`      cpus: '0.25'`<br>`      memory: 256M`<br>`  placement:` (放置约束)<br>`    constraints:`<br>`      - "node.role==worker"`|
| `restart` | **（非Swarm模式）** 定义容器的重启策略。 | `restart: always` (总是重启)<br>`restart: on-failure` (失败时重启)<br>`restart: unless-stopped` (除非手动停止) |
| `mem_limit` | **（已废弃）** 内存限制。推荐使用 `deploy.resources`。 | `mem_limit: 512m` |
| `cpus` | **（非Swarm模式）** CPU数量限制。 | `cpus: 0.5` |

### G. 健康检查 (Healthcheck)

定义容器的健康检查，用于确定容器是否正常工作。

| 指令 | 描述 | 示例 |
| :--- | :--- | :--- |
| `healthcheck` | 配置容器健康检查。 | `healthcheck:`<br>`  test: ["CMD", "curl", "-f", "http://localhost"]` (检查命令)<br>`  interval: 1m30s` (间隔)<br>`  timeout: 10s` (超时)<br>`  retries: 3` (重试次数)<br>`  start_period: 40s` (启动宽限期) |

### H. 其他常用配置

| 指令 | 描述 | 示例 |
| :--- | :--- | :--- |
| `container_name` | 指定一个自定义的容器名称，而不是默认生成的。**注意**：这会失去伸缩性。 | `container_name: my-web-container` |
| `labels` | 为容器添加元数据标签。 | `labels:`<br>`  - "com.example.project=my-app"`<br>`  - "com.example.department=finance"` |
| `user` | 指定运行容器内进程的用户名或UID。 | `user: "1000:1000"` |
| `working_dir` | 指定容器内的工作目录。 | `working_dir: /app` |
| `extends` | 从另一个文件或同一文件中的另一个服务继承配置，用于实现配置复用。 | `extends:`<br>`  file: common-services.yml`<br>`  service: base-app` |
| `profiles` | 将服务分配到特定的配置文件中，只有激活该配置文件时服务才会启动。 | `profiles: ["dev", "debug"]` (使用 `docker compose --profile dev up` 启动) |

---

## 三、 顶级元素定义 (Top-Level Definitions)

这些元素与 `services` 同级，用于定义可被多个服务共享的资源。

| 元素 | 描述 | 示例 |
| :--- | :--- | :--- |
| `networks` | 定义自定义网络，服务可以连接到这些网络。 | **桥接网络 (默认)**:<br>`networks:`<br>`  app_net:`<br>`    driver: bridge`<br><br>**覆盖网络 (Swarm)**:<br>`networks:`<br>`  overlay_net:`<br>`    driver: overlay`<br><br>**外部网络**:<br>`networks:`<br>`  default:`<br>`    external: true`<br>`    name: my-pre-existing-network` |
| `volumes` | 定义命名数据卷，用于数据持久化。 | **简单定义**:<br>`volumes:`<br>`  postgres_data:`<br><br>**详细定义**:<br>`volumes:`<br>`  my_data:`<br>`    driver: local`<br>`    driver_opts:`<br>`      type: 'none'`<br>`      o: 'bind'`<br>`      device: '/tmp/my_data'`<br><br>**外部数据卷**:<br>`volumes:`<br>`  db_data:`<br>`    external: true` |
| `configs` | 定义配置文件，可以被服务挂载。适合非敏感配置。 | **从文件创建**:<br>`configs:`<br>`  nginx_config:`<br>`    file: ./nginx.conf`<br><br>**外部配置 (Swarm)**:<br>`configs:`<br>`  my_external_config:`<br>`    external: true` |
| `secrets` | 定义密钥，可以被服务安全地挂载。适合密码、API密钥等敏感数据。 | **从文件创建**:<br>`secrets:`<br>`  db_password:`<br>`    file: ./db_password.txt`<br><br>**外部密钥 (Swarm)**:<br>`secrets:`<br>`  my_external_secret:`<br>`    external: true` |

---

## 四、 综合示例

以下是一个包含 Web 应用、数据库和 Redis 缓存的典型 `compose.yml` 文件，展示了多种语法的应用。

**文件结构:**
```
.
├── compose.yml
├── backend/
│   ├── Dockerfile
│   └── ... (应用代码)
├── .env
└── nginx.conf
```

**.env 文件:**
```
POSTGRES_USER=admin
POSTGRES_PASSWORD=supersecret
```

**compose.yml 文件:**
```yaml
services:
  # Web服务器后端服务
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: my_app_backend
    restart: unless-stopped
    env_file:
      - .env # 加载.env文件中的环境变量
    environment:
      - REDIS_HOST=cache # 使用服务名作为主机名
      - DB_HOST=db
    volumes:
      - ./backend:/app # 绑定挂载，方便开发时代码同步
    networks:
      - app-network # 连接到自定义网络
    depends_on:
      db:
        condition: service_healthy # 依赖于数据库健康
      cache:
        condition: service_started # 依赖于Redis启动

  # Nginx反向代理
  proxy:
    image: "nginx:stable-alpine"
    container_name: my_app_proxy
    ports:
      - "80:80" # 将主机的80端口映射到Nginx的80端口
    volumes:
      - ./nginx.conf:/etc/nginx/conf.d/default.conf:ro # 挂载Nginx配置，只读
    networks:
      - app-network
    depends_on:
      - backend # 依赖于后端服务

  # PostgreSQL数据库服务
  db:
    image: "postgres:15-alpine"
    container_name: my_app_db
    restart: always
    env_file:
      - .env
    volumes:
      - postgres-data:/var/lib/postgresql/data # 使用命名数据卷持久化数据库数据
    networks:
      - app-network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U $$POSTGRES_USER -d postgres"] # 健康检查
      interval: 10s
      timeout: 5s
      retries: 5

  # Redis缓存服务
  cache:
    image: "redis:7-alpine"
    container_name: my_app_cache
    restart: always
    networks:
      - app-network

# 顶级元素定义
networks:
  app-network:
    driver: bridge # 定义一个桥接网络

volumes:
  postgres-data: # 定义一个命名数据卷
    driver: local
```