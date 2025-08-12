好的，这是一个对 Nginx 命令进行完整分类和详细解释的文档。

---

# Nginx 命令大全与分类详解

## 摘要

本文档旨在全面、系统地介绍 Nginx 的命令行工具。Nginx 不仅仅是一个 Web 服务器，它还提供了一套强大的命令行接口来管理其生命周期、测试配置和获取信息。掌握这些命令对于任何使用 Nginx 的开发者或系统管理员都至关重要。

本文档将 Nginx 命令分为以下几大类：

1.  **核心控制命令**：用于启动、停止和重载 Nginx 服务。
2.  **配置文件与语法检查**：用于测试配置文件的正确性。
3.  **信息查询与版本**：用于查看 Nginx 版本和编译参数。
4.  **信号控制 (高级)**：通过操作系统信号直接控制 Nginx 进程。
5.  **实用场景与最佳实践**：结合实际应用场景，展示命令的组合使用方法。

---

## 1. 核心控制命令

这些是日常管理 Nginx 服务最常用的命令，通过 `-s` 参数向 Nginx 主进程（Master Process）发送信号。

| 命令 | 完整形式 | 描述 |
| :--- | :--- | :--- |
| **启动 Nginx** | `nginx` | 默认情况下，此命令会读取 `conf/nginx.conf` 配置文件并启动 Nginx。如果已经有一个 Nginx 实例在运行，此命令会失败。 |
| **指定配置启动** | `nginx -c /path/to/nginx.conf` | 使用 `-c` 参数指定一个特定的配置文件来启动 Nginx。 |
| **快速停止** | `nginx -s stop` | 强制、快速地关闭 Nginx。无论当前是否有正在处理的连接，都会立即终止所有 Nginx 进程。 |
| **优雅停止** | `nginx -s quit` | 平滑、优雅地关闭 Nginx。主进程会等待所有工作进程（Worker Processes）处理完当前请求后再关闭。这是推荐的停止方式。 |
| **重载配置** | `nginx -s reload` | **(最常用)** 在不中断服务的情况下，重新加载配置文件。主进程会启动新的工作进程来处理新请求，并优雅地关闭旧的工作进程。实现零停机更新配置。 |
| **重新打开日志文件** | `nginx -s reopen` | 重新打开日志文件。常用于日志切割（Log Rotation）后，让 Nginx 向新的日志文件写入，而不是旧的、已被重命名的文件。 |

**示例:**

```bash
# 启动 Nginx
sudo nginx

# 检查配置无误后，平滑地重载配置
sudo nginx -s reload

# 优雅地停止 Nginx 服务
sudo nginx -s quit
```

---

## 2. 配置文件与语法检查

在应用新配置之前，进行检查是防止服务中断的关键步骤。

| 命令 | 完整形式 | 描述 |
| :--- | :--- | :--- |
| **测试配置** | `nginx -t` | 检查配置文件的语法是否正确，并测试配置中引用的文件路径是否存在。这是应用任何配置更改前的**必做操作**。 |
| **测试并打印配置** | `nginx -T` | 与 `-t` 类似，但在测试成功后，会将完整的、解析后的配置（包括所有 `include` 的文件）打印到标准输出。这对于调试复杂的配置结构非常有用。 |

**示例:**

```bash
# 仅仅测试配置文件的语法和路径
sudo nginx -t
# 如果成功，会输出:
# nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
# nginx: configuration file /etc/nginx/nginx.conf test is successful

# 测试并查看最终生效的所有配置项
sudo nginx -T
```

---

## 3. 信息查询与版本

了解当前运行的 Nginx 版本及其编译时所包含的模块，对于排查问题和确认功能支持至关重要。

| 命令 | 完整形式 | 描述 |
| :--- | :--- | :--- |
| **显示版本号** | `nginx -v` | 仅显示 Nginx 的版本号。 |
| **显示版本和编译信息** | `nginx -V` | **(非常重要)** 显示 Nginx 版本号、编译器版本以及所有编译时启用的模块和参数（`--with-` 和 `--add-module=` 等）。当遇到某个模块（如 `http_ssl_module`）不工作时，首先应使用此命令确认该模块是否已编译进去。 |

**示例:**

```bash
# 查看版本号
nginx -v
# 输出: nginx/1.22.0

# 查看详细的编译信息
nginx -V
# 可能的输出:
# nginx version: nginx/1.22.0
# built by gcc 9.4.0 (Ubuntu 9.4.0-1ubuntu1~20.04.1)
# built with OpenSSL 1.1.1f  31 Mar 2020
# TLS SNI support enabled
# configure arguments: --prefix=/etc/nginx --sbin-path=/usr/sbin/nginx ... --with-http_ssl_module --with-http_v2_module ...
```

---

## 4. 信号控制 (高级)

`nginx -s <signal>` 命令本质上是查找 Nginx 主进程的 PID（通常记录在 `/var/run/nginx.pid` 文件中），然后使用 `kill` 命令向该进程发送一个信号。你也可以手动执行此操作，这在编写自动化脚本时非常有用。

首先，找到主进程的 PID：
`cat /var/run/nginx.pid`
或者
`ps -ef | grep "nginx: master process"`

然后，使用 `kill` 命令发送信号：

| 信号名 | 等效的 `nginx -s` 命令 | 描述 |
| :--- | :--- | :--- |
| `TERM`, `INT` | `nginx -s stop` | 快速关闭。 |
| `QUIT` | `nginx -s quit` | 优雅关闭。 |
| `HUP` | `nginx -s reload` | 重载配置。 |
| `USR1` | `nginx -s reopen` | 重新打开日志文件，用于日志切割。 |
| `USR2` | 无 | 用于 Nginx 的在线二进制升级（非常高级的功能）。它会启动一个新的主进程和工作进程，与旧进程共存，实现平滑升级。 |
| `WINCH` | 无 | 优雅地关闭工作进程。 |

**示例:**

```bash
# 获取主进程 PID
NGINX_PID=$(cat /var/run/nginx.pid)

# 使用 kill 命令重载配置 (等同于 nginx -s reload)
sudo kill -HUP $NGINX_PID

# 使用 kill 命令重新打开日志 (等同于 nginx -s reopen)
sudo kill -USR1 $NGINX_PID
```

---

## 5. 实用场景与最佳实践

### 场景一：更新网站配置

这是最常见的操作流程，确保服务稳定。

1.  **编辑配置文件**：
    ```bash
    sudo nano /etc/nginx/sites-available/your-site.conf
    ```
2.  **测试新配置**：
    在应用之前，务必检查语法。
    ```bash
    sudo nginx -t
    ```
    如果看到 `...test is successful`，则可以继续。否则，根据错误提示修改配置。
3.  **平滑重载服务**：
    使用 `reload` 实现零停机更新。
    ```bash
    sudo nginx -s reload
    ```

### 场景二：日志切割

当 `access.log` 或 `error.log` 文件过大时，需要进行切割归档。

1.  **移动旧的日志文件**：
    ```bash
    sudo mv /var/log/nginx/access.log /var/log/nginx/access.log.old
    ```
2.  **通知 Nginx 创建新文件**：
    发送 `USR1` 信号或使用 `reopen` 命令。
    ```bash
    sudo nginx -s reopen
    # 或者
    # sudo kill -USR1 $(cat /var/run/nginx.pid)
    ```
    Nginx 会用与启动时相同的权限重新创建一个 `access.log` 文件，并开始向其中写入日志。

### 场景三：问题排查

当发现 Nginx 某个功能不生效时（例如，反向代理、SSL 配置等）。

1.  **检查模块是否编译**：
    怀疑 SSL 配置有问题？先确认 `http_ssl_module` 是否存在。
    ```bash
    nginx -V
    ```
    在输出的 `configure arguments` 中查找 `--with-http_ssl_module`。
2.  **检查最终配置**：
    你的配置文件可能包含多个 `include`，导致配置被意外覆盖。使用 `-T` 查看 Nginx 最终“看到”的完整配置。
    ```bash
    sudo nginx -T | less
    ```
    这可以帮助你理清复杂的配置逻辑，找到问题的根源。

---
## 总结

理解并熟练使用这些 Nginx 命令是高效、安全地管理 Nginx 服务的基石。从简单的启动、停止到复杂的配置调试和零停机更新，这些命令覆盖了 Nginx 运维的方方面面。养成**“先测试 (`-t`)，后重载 (`-s reload`)”** 的习惯，可以最大程度地避免因配置错误导致的服务中断。