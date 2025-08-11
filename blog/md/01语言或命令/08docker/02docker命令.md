好的，这是一份对 Docker 命令进行分类的完整文档，旨在帮助您系统地理解和使用 Docker。文档从核心概念出发，将命令划分为不同的功能类别，并对每个常用命令提供了详细的说明、常用选项和示例。

---

# Docker 命令分类大全

## 目录

1.  **引言：Docker 命令行基础**
2.  **镜像管理 (Image Management)**
    *   `docker pull`: 拉取镜像
    *   `docker images`: 列出镜像
    *   `docker rmi`: 删除镜像
    *   `docker build`: 构建镜像
    *   `docker tag`: 为镜像打标签
    *   `docker push`:推送镜像
    *   `docker save / load`: 导出/导入镜像
    *   `docker history`: 查看镜像历史
3.  **容器生命周期管理 (Container Lifecycle)**
    *   `docker run`: 创建并运行容器 (核心命令)
    *   `docker ps`: 列出容器
    *   `docker start / stop`: 启动/停止容器
    *   `docker restart`: 重启容器
    *   `docker rm`: 删除容器
    *   `docker kill`: 强制停止容器
    *   `docker pause / unpause`: 暂停/恢复容器
4.  **容器操作与监控 (Container Operations & Monitoring)**
    *   `docker exec`: 在运行的容器中执行命令
    *   `docker logs`: 查看容器日志
    *   `docker inspect`: 查看容器/镜像的详细信息
    *   `docker top`: 查看容器内运行的进程
    *   `docker stats`: 实时查看容器资源使用情况
    *   `docker cp`: 在容器和主机之间复制文件
    *   `docker attach`: 附加到正在运行的容器
5.  **网络管理 (Network Management)**
    *   `docker network ls`: 列出网络
    *   `docker network create`: 创建网络
    *   `docker network rm`: 删除网络
    *   `docker network inspect`: 查看网络详情
    *   `docker network connect / disconnect`: 连接/断开容器与网络的连接
6.  **数据卷与存储管理 (Volume & Storage Management)**
    *   `docker volume ls`: 列出数据卷
    *   `docker volume create`: 创建数据卷
    *   `docker volume rm`: 删除数据卷
    *   `docker volume inspect`: 查看数据卷详情
    *   `docker volume prune`: 清理未使用的数据卷
7.  **系统与清理 (System & Cleanup)**
    *   `docker system df`: 查看 Docker 磁盘使用情况
    *   `docker system prune`: 清理系统中的未使用资源
    *   `docker info`: 显示 Docker 系统级信息
    *   `docker version`: 显示 Docker 版本信息
8.  **Docker Compose (多容器编排)**
    *   `docker-compose up`: 创建并启动服务
    *   `docker-compose down`: 停止并移除服务、网络、卷
    *   `docker-compose ps`: 列出服务中的容器
    *   `docker-compose logs`: 查看服务日志
    *   `docker-compose exec`: 在服务容器中执行命令
    *   `docker-compose build`: 构建或重新构建服务
    *   `docker-compose pull`: 拉取服务镜像

---

### 1. 引言：Docker 命令行基础

Docker 主要通过 `docker` 这个命令行工具进行交互。其基本语法格式为：
`docker [OPTIONS] COMMAND [ARG...]`

例如，`docker run -it ubuntu bash` 中，`run` 是命令，`-it` 是选项，`ubuntu` 和 `bash` 是参数。

### 2. 镜像管理 (Image Management)

镜像是创建容器的基础，是静态的、只读的模板。

#### `docker pull`
从镜像仓库（如 Docker Hub）拉取镜像。

- **语法**: `docker pull [OPTIONS] NAME[:TAG|@DIGEST]`
- **示例**:
  ```bash
  # 拉取最新版的 Nginx 镜像
  docker pull nginx:latest

  # 拉取特定版本的 Ubuntu 镜像
  docker pull ubuntu:20.04
  ```

#### `docker images`
列出本地主机上的所有镜像。

- **语法**: `docker images [OPTIONS] [REPOSITORY[:TAG]]`
- **常用选项**:
    - `-a`, `--all`: 显示所有镜像（包括中间层镜像）。
    - `-q`, `--quiet`: 只显示镜像 ID。
- **示例**:
  ```bash
  # 列出所有顶级镜像
  docker images

  # 列出所有镜像的 ID
  docker images -q
  ```

#### `docker rmi`
删除一个或多个本地镜像。

- **语法**: `docker rmi [OPTIONS] IMAGE [IMAGE...]`
- **常用选项**:
    - `-f`, `--force`: 强制删除（即使有容器正在使用它）。
- **示例**:
  ```bash
  # 删除指定镜像
  docker rmi nginx:latest

  # 强制删除一个镜像
  docker rmi -f my-custom-app:1.0
  ```

#### `docker build`
根据 Dockerfile 构建一个新的镜像。

- **语法**: `docker build [OPTIONS] PATH | URL | -`
- **常用选项**:
    - `-t`, `--tag`: 为镜像指定名称和标签（格式 `name:tag`）。
    - `-f`, `--file`: 指定 Dockerfile 的路径。
    - `--no-cache`: 构建过程中不使用缓存。
- **示例**:
  ```bash
  # 在当前目录下，使用 Dockerfile 构建一个名为 my-app:1.0 的镜像
  docker build -t my-app:1.0 .
  ```

#### `docker tag`
为本地镜像创建一个新的标签（别名）。

- **语法**: `docker tag SOURCE_IMAGE[:TAG] TARGET_IMAGE[:TAG]`
- **示例**:
  ```bash
  # 为 my-app:1.0 打上 "latest" 标签
  docker tag my-app:1.0 my-app:latest

  # 为推送到私有仓库准备标签
  docker tag my-app:1.0 myregistry.com/username/my-app:1.0
  ```

#### `docker push`
将本地镜像推送到镜像仓库。

- **语法**: `docker push [OPTIONS] NAME[:TAG]`
- **示例**:
  ```bash
  # 推送镜像到 Docker Hub
  docker push username/my-app:1.0
  ```

#### `docker save / load`
将镜像保存为 tar 归档文件或从归档文件中加载。

- **`docker save`**:
    - **语法**: `docker save [OPTIONS] IMAGE [IMAGE...] > output.tar`
    - **示例**: `docker save nginx:latest > nginx.tar`
- **`docker load`**:
    - **语法**: `docker load [OPTIONS] < input.tar`
    - **示例**: `docker load < nginx.tar`

#### `docker history`
查看镜像的构建历史。

- **语法**: `docker history [OPTIONS] IMAGE`
- **示例**:
  ```bash
  docker history ubuntu:20.04
  ```

### 3. 容器生命周期管理 (Container Lifecycle)

容器是镜像的运行实例。

#### `docker run`
从镜像创建一个新的容器并运行它。这是最核心、最复杂的命令之一。

- **语法**: `docker run [OPTIONS] IMAGE [COMMAND] [ARG...]`
- **常用选项**:
    - `-d`, `--detach`: 后台运行容器。
    - `-it`: 以交互模式运行容器（`-i` 保持 STDIN 打开，`-t` 分配一个伪终端）。
    - `-p`, `--publish`: 端口映射（`主机端口:容器端口`）。
    - `-v`, `--volume`: 挂载数据卷（`主机路径:容器路径` 或 `卷名:容器路径`）。
    - `--name`:为容器指定一个名称。
    - `--rm`: 容器退出时自动删除。
    - `-e`, `--env`: 设置环境变量。
    - `--network`: 连接到指定网络。
- **示例**:
  ```bash
  # 后台运行一个 Nginx 容器，并将主机的 8080 端口映射到容器的 80 端口
  docker run -d -p 8080:80 --name my-nginx nginx

  # 交互式地进入 Ubuntu 容器的 bash shell
  docker run -it --rm ubuntu bash
  ```

#### `docker ps`
列出正在运行的容器。

- **语法**: `docker ps [OPTIONS]`
- **常用选项**:
    - `-a`, `--all`: 列出所有容器（包括已停止的）。
    - `-q`, `--quiet`: 只显示容器 ID。
- **示例**:
  ```bash
  # 列出所有状态的容器
  docker ps -a
  ```

#### `docker start / stop`
启动/停止一个或多个已存在的容器。

- **语法**: `docker start|stop [OPTIONS] CONTAINER [CONTAINER...]`
- **示例**:
  ```bash
  # 启动名为 my-nginx 的容器
  docker start my-nginx

  # 停止容器
  docker stop my-nginx
  ```

#### `docker restart`
重启容器。

- **语法**: `docker restart [OPTIONS] CONTAINER [CONTAINER...]`
- **示例**: `docker restart my-nginx`

#### `docker rm`
删除一个或多个容器。

- **语法**: `docker rm [OPTIONS] CONTAINER [CONTAINER...]`
- **常用选项**:
    - `-f`, `--force`: 强制删除正在运行的容器。
    - `-v`, `--volumes`: 同时删除与容器关联的卷。
- **示例**:
  ```bash
  # 删除已停止的容器
  docker rm my-nginx

  # 强制删除并移除其卷
  docker rm -fv my-nginx
  ```

#### `docker kill`
立即强制停止一个或多个容器（发送 SIGKILL 信号）。

- **语法**: `docker kill [OPTIONS] CONTAINER [CONTAINER...]`
- **示例**: `docker kill my-nginx`

#### `docker pause / unpause`
暂停/恢复容器内的所有进程。

- **语法**: `docker pause|unpause CONTAINER [CONTAINER...]`
- **示例**:
  ```bash
  docker pause my-nginx
  docker unpause my-nginx
  ```

### 4. 容器操作与监控 (Container Operations & Monitoring)

#### `docker exec`
在正在运行的容器中执行命令。

- **语法**: `docker exec [OPTIONS] CONTAINER COMMAND [ARG...]`
- **常用选项**:
    - `-it`: 进入交互式 Shell。
- **示例**:
  ```bash
  # 在 my-nginx 容器中查看 /etc/nginx 目录
  docker exec my-nginx ls /etc/nginx

  # 进入 my-nginx 容器的交互式 shell
  docker exec -it my-nginx bash
  ```

#### `docker logs`
获取容器的日志。

- **语法**: `docker logs [OPTIONS] CONTAINER`
- **常用选项**:
    - `-f`, `--follow`: 实时跟踪日志输出。
    - `--tail`: 只显示末尾的 N 行日志。
- **示例**:
  ```bash
  # 实时查看 my-nginx 的日志
  docker logs -f my-nginx
  ```

#### `docker inspect`
获取容器或镜像的底层详细信息（JSON 格式）。

- **语法**: `docker inspect [OPTIONS] NAME|ID [NAME|ID...]`
- **示例**:
  ```bash
  # 查看 my-nginx 容器的详细配置
  docker inspect my-nginx

  # 获取容器的 IP 地址
  docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' my-nginx
  ```

#### `docker top`
显示一个容器内正在运行的进程。

- **语法**: `docker top CONTAINER [ps OPTIONS]`
- **示例**: `docker top my-nginx`

#### `docker stats`
实时显示容器的资源使用情况（CPU, 内存, 网络 I/O 等）。

- **语法**: `docker stats [OPTIONS] [CONTAINER...]`
- **示例**: `docker stats`

#### `docker cp`
在容器和主机文件系统之间复制文件/文件夹。

- **语法**:
    - `docker cp [OPTIONS] CONTAINER:SRC_PATH DEST_PATH`
    - `docker cp [OPTIONS] SRC_PATH CONTAINER:DEST_PATH`
- **示例**:
  ```bash
  # 从容器复制文件到主机
  docker cp my-nginx:/etc/nginx/nginx.conf ./nginx.conf

  # 从主机复制文件到容器
  docker cp ./index.html my-nginx:/usr/share/nginx/html/
  ```

### 5. 网络管理 (Network Management)

#### `docker network ls`
列出所有网络。

- **语法**: `docker network ls [OPTIONS]`
- **示例**: `docker network ls`

#### `docker network create`
创建一个新的 Docker 网络。

- **语法**: `docker network create [OPTIONS] NETWORK`
- **常用选项**:
    - `--driver`: 指定网络驱动（如 `bridge`, `overlay`）。
- **示例**: `docker network create --driver bridge my-bridge-net`

#### `docker network rm`
删除一个或多个网络。

- **语法**: `docker network rm NETWORK [NETWORK...]`
- **示例**: `docker network rm my-bridge-net`

#### `docker network inspect`
显示一个或多个网络的详细信息。

- **语法**: `docker network inspect [OPTIONS] NETWORK [NETWORK...]`
- **示例**: `docker network inspect my-bridge-net`

#### `docker network connect / disconnect`
将容器连接到网络或从网络断开。

- **语法**:
    - `docker network connect [OPTIONS] NETWORK CONTAINER`
    - `docker network disconnect [OPTIONS] NETWORK CONTAINER`
- **示例**:
  ```bash
  docker network connect my-bridge-net another-container
  docker network disconnect my-bridge-net another-container
  ```

### 6. 数据卷与存储管理 (Volume & Storage Management)

#### `docker volume ls`
列出所有数据卷。

- **语法**: `docker volume ls [OPTIONS]`

#### `docker volume create`
创建一个新的数据卷。

- **语法**: `docker volume create [OPTIONS] [VOLUME]`
- **示例**: `docker volume create my-data-volume`

#### `docker volume rm`
删除一个或多个数据卷。

- **语法**: `docker volume rm [OPTIONS] VOLUME [VOLUME...]`
- **示例**: `docker volume rm my-data-volume`

#### `docker volume inspect`
显示一个或多个数据卷的详细信息。

- **语法**: `docker volume inspect [OPTIONS] VOLUME [VOLUME...]`
- **示例**: `docker volume inspect my-data-volume`

#### `docker volume prune`
删除所有未被任何容器使用的本地数据卷。

- **语法**: `docker volume prune [OPTIONS]`
- **示例**: `docker volume prune`

### 7. 系统与清理 (System & Cleanup)

#### `docker system df`
显示 Docker 的磁盘使用情况。

- **语法**: `docker system df [OPTIONS]`

#### `docker system prune`
清理系统中未使用的资源，是维护 Docker 环境整洁的关键命令。

- **语法**: `docker system prune [OPTIONS]`
- **常用选项**:
    - `-a`, `--all`: 删除所有未使用的镜像（不仅仅是悬空的）。
    - `--volumes`: 同时清理未使用的卷。
- **示例**:
  ```bash
  # 清理所有停止的容器、未使用的网络、悬空的镜像和构建缓存
  docker system prune

  # (危险操作) 清理所有未使用的镜像和卷
  docker system prune -a --volumes
  ```

#### `docker info`
显示 Docker 系统范围的信息。

- **语法**: `docker info [OPTIONS]`

#### `docker version`
显示 Docker 的版本信息。

- **语法**: `docker version [OPTIONS]`

### 8. Docker Compose (多容器编排)

`docker-compose` (或新版 `docker compose`) 是一个用于定义和运行多容器 Docker 应用程序的工具。它使用 YAML 文件来配置应用的服务。

#### `docker-compose up`
根据 `docker-compose.yml` 文件创建、构建并启动所有服务。

- **常用选项**:
    - `-d`: 后台运行。
    - `--build`: 在启动前强制重新构建镜像。
- **示例**: `docker-compose up -d`

#### `docker-compose down`
停止并移除由 `up` 命令创建的容器、网络、卷。

- **常用选项**:
    - `-v`, `--volumes`: 同时移除在 `volumes` 中定义的命名卷。
- **示例**: `docker-compose down -v`

#### `docker-compose ps`
列出 Compose 项目中的所有容器。

#### `docker-compose logs`
查看服务的日志。

- **常用选项**:
    - `-f`: 实时跟踪日志。
- **示例**: `docker-compose logs -f web_server`

#### `docker-compose exec`
在指定服务的容器中执行命令。

- **示例**: `docker-compose exec db psql -U user -d database`

#### `docker-compose build`
构建或重新构建服务中定义的镜像。

#### `docker-compose pull`
拉取服务所需的所有镜像。