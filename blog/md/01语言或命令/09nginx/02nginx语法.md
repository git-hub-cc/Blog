好的，这是一个对 Nginx 配置语法的完整分类和详细说明文档。本文档从基础语法、核心结构（上下文/块）、功能分类指令和完整示例等方面，对 Nginx 的配置进行了系统性的梳理。

---

### Nginx 配置语法权威指南

本文档旨在提供一份全面、易于理解的 Nginx 配置语法分类。Nginx 的配置系统以其模块化、高效和逻辑清晰而著称，其核心是指令（Directives）和块（Blocks，也称上下文 Contexts）的组合。

---

### 一、 基础语法与核心概念

在深入分类之前，首先需要理解 Nginx 配置文件的基本规则。

1.  **配置文件结构**
    *   Nginx 配置文件由一系列**指令 (Directives)** 组成。
    *   指令以**分号 (`;`)** 结尾。
    *   指令可以被组织在**块 (Blocks / Contexts)** 中，块使用**花括号 (`{}`)** 定义。
    *   块可以嵌套，形成层级结构。

2.  **注释 (Comments)**
    *   使用 `#` 符号进行单行注释。

    ```nginx
    # 这是一个注释
    worker_processes 1; # 这也是一个注释
    ```

3.  **指令 (Directives)**
    *   基本格式为：`directive_name value1 [value2 ...];`
    *   `value` 可以是字符串、数字、正则表达式或变量。

    ```nginx
    listen 80;
    server_name example.com www.example.com;
    root /var/www/html;
    ```

4.  **块/上下文 (Blocks / Contexts)**
    *   块将多个指令组织在一起，应用于特定的作用域。
    *   例如 `http` 块包含所有 HTTP 相关的配置，`server` 块定义一个虚拟主机。

    ```nginx
    http { # http 块开始
        server { # server 块开始
            # ... server 相关指令
        } # server 块结束
    } # http 块结束
    ```

5.  **文件包含 (File Inclusion)**
    *   使用 `include` 指令可以将其他文件的内容包含进来，便于组织和管理配置。支持通配符。

    ```nginx
    include mime.types;
    include /etc/nginx/conf.d/*.conf;
    ```

6.  **变量 (Variables)**
    *   Nginx 有大量内置变量，以 `$` 符号开头，用于获取请求的各种信息（如 `$request_uri`, `$remote_addr`）。
    *   也可以使用 `set` 或 `map` 指令自定义变量。

---

### 二、 核心块结构 (Contexts)

Nginx 的配置是分层级的，指令的作用域由其所在的块决定。理解这些块是掌握 Nginx 的关键。

| 块名称 | 父块 | 描述 |
| :--- | :--- | :--- |
| **`main` (全局块)** | - | 配置文件顶层，不属于任何 `{}`。用于配置 Nginx 的核心功能，如工作进程、用户、错误日志等。 |
| **`events`** | `main` | 配置网络连接处理相关的参数，如每个工作进程的最大连接数。 |
| **`http`** | `main` | **最重要的块**。配置 HTTP 服务器和反向代理相关的所有功能。 |
| **`stream`** | `main` | 用于配置 TCP/UDP 流量代理（四层代理）。与 `http` 块同级。 |
| **`server`** | `http`, `stream` | 在 `http` 块中定义一个**虚拟主机**。在 `stream` 块中定义一个 TCP/UDP 服务器。 |
| **`location`** | `server` | **核心路由块**。根据请求的 URI 匹配，应用不同的配置。 |
| **`upstream`** | `http`, `stream` | 定义一个后端服务器组，用于负载均衡。 |
| **`if`** | `server`, `location` | 提供条件判断。**（注意：应谨慎使用，推荐使用 `map` 或 `try_files` 替代）** |
| **`map`** | `http` | 创建变量映射关系，功能强大且高效。 |
| **`limit_except`** | `location` | 限制除指定方法外的其他 HTTP 请求方法。 |

---

### 三、 指令按功能分类详解

以下是 Nginx 指令按照常见功能进行的分类，并列举了最核心的指令。

#### 1. 核心与进程管理 (Main Context)

这些指令控制 Nginx 的基本行为。

*   `user`: 指定 Nginx 工作进程运行的用户和用户组。 `user www-data;`
*   `worker_processes`: Nginx 工作进程的数量，通常设置为 `auto` 或 CPU 核心数。 `worker_processes auto;`
*   `pid`: 指定存放 Nginx 主进程 ID 的文件路径。 `pid /run/nginx.pid;`
*   `error_log`: 配置全局错误日志。 `error_log /var/log/nginx/error.log warn;`
*   `daemon`: 设置 Nginx 是否以守护进程方式运行。 `daemon on;` (默认值)

#### 2. 性能与连接处理 (Events Context)

这些指令优化网络连接处理。

*   `worker_connections`: 每个工作进程允许的最大并发连接数。 `worker_connections 1024;`
*   `multi_accept`: 允许工作进程一次性接受所有新连接。 `multi_accept on;`
*   `use`: 选择网络 I/O 模型，如 `epoll`, `kqueue` 等。 `use epoll;` (Linux 上通常自动选择)

#### 3. HTTP 核心功能 (HTTP, Server, Location Contexts)

定义 HTTP 服务器的基础行为。

*   `listen`: 指定服务器监听的端口和 IP 地址。 `listen 80; listen 443 ssl;`
*   `server_name`: 定义虚拟主机的域名。 `server_name example.com www.example.com;`
*   `root`: 指定静态文件的根目录。 `root /var/www/html;`
*   `index`: 指定默认的索引文件。 `index index.html index.htm;`
*   `try_files`: 按顺序检查文件是否存在，并进行内部重定向或返回状态码。 `try_files $uri $uri/ /index.html;`
*   `alias`: 定义 `location` 块的路径别名。与 `root` 类似但更灵活。
*   `client_max_body_size`: 允许的客户端请求体的最大大小（用于文件上传）。 `client_max_body_size 10m;`
*   `keepalive_timeout`: 设置 HTTP Keep-Alive 连接的超时时间。 `keepalive_timeout 65;`

#### 4. 请求处理与路由 (Location Context)

控制如何根据 URI 匹配请求。

*   **`location` 匹配规则**:
    *   `location = /path`: **精确匹配**。
    *   `location /path`: **前缀匹配**（最长前缀优先）。
    *   `location ^~ /path`: **优先前缀匹配**。匹配成功后，不再进行正则匹配。
    *   `location ~ \.regex$`: **区分大小写的正则匹配**。
    *   `location ~* \.regex$`: **不区分大小写的正则匹配**。
*   `rewrite`: 根据正则表达式重写请求 URI。 `rewrite ^/old/(.*)$ /new/$1 permanent;`
*   `return`: 停止处理并返回指定的 HTTP 状态码或 URL。 `return 301 https://$host$request_uri;`

#### 5. 反向代理 (Reverse Proxy)

将请求转发到后端服务器。

*   `proxy_pass`: **核心指令**。将请求转发到指定的后端 URL 或 `upstream` 组。 `proxy_pass http://backend_servers;`
*   `proxy_set_header`: 修改或添加发送到后端服务器的请求头。 `proxy_set_header Host $host;`
*   `proxy_http_version`: 设置代理使用的 HTTP协议版本。 `proxy_http_version 1.1;` (使用 Keep-Alive 和 WebSocket 时必需)
*   `proxy_connect_timeout`: 与后端服务器建立连接的超时时间。 `proxy_connect_timeout 60s;`
*   `proxy_send_timeout`: 向后端服务器发送请求的超时时间。 `proxy_send_timeout 60s;`
*   `proxy_read_timeout`: 从后端服务器读取响应的超时时间。 `proxy_read_timeout 60s;`
*   `proxy_buffering`: 启用或禁用来自后端服务器的响应缓冲。 `proxy_buffering on;`

#### 6. 负载均衡 (Upstream Context)

定义后端服务器集群。

*   `upstream`: 定义一个后端服务器组。 `upstream backend_servers { ... }`
*   `server`: 在 `upstream` 块中指定一台后端服务器。 `server 192.168.1.100:8080 weight=5;`
*   **负载均衡算法**:
    *   `round-robin`: 轮询（默认）。
    *   `least_conn`: 将请求分配给当前活动连接数最少的服务器。
    *   `ip_hash`: 根据客户端 IP 地址的哈希值分配，确保同一客户端访问同一台服务器。
    *   `hash`: 基于指定键的哈希（如 `$request_uri`）。

#### 7. SSL/TLS 加密

配置 HTTPS。

*   `ssl_certificate`: 指定 PEM 格式的证书文件路径。 `ssl_certificate /etc/ssl/certs/example.com.crt;`
*   `ssl_certificate_key`: 指定 PEM 格式的私钥文件路径。 `ssl_certificate_key /etc/ssl/private/example.com.key;`
*   `ssl_protocols`: 启用指定的 TLS 协议版本。 `ssl_protocols TLSv1.2 TLSv1.3;`
*   `ssl_ciphers`: 配置允许的加密套件。 `ssl_ciphers HIGH:!aNULL:!MD5;`
*   `ssl_session_cache`: 配置 SSL 会话缓存。 `ssl_session_cache shared:SSL:10m;`

#### 8. 缓存 (Caching)

缓存后端服务器的响应，提高性能。

*   `proxy_cache_path`: 定义缓存的路径和参数。 `proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=my_cache:10m;`
*   `proxy_cache`: 在 `location` 中启用一个已定义的缓存区域。 `proxy_cache my_cache;`
*   `proxy_cache_key`: 定义用于生成缓存键的字符串。 `proxy_cache_key $scheme$proxy_host$request_uri;`
*   `proxy_cache_valid`: 为不同状态码的响应设置缓存时间。 `proxy_cache_valid 200 302 10m;`
*   `proxy_cache_bypass`: 定义不从缓存中获取响应的条件。

#### 9. 日志 (Logging)

记录访问和错误信息。

*   `access_log`: 配置访问日志。 `access_log /var/log/nginx/access.log main;`
*   `log_format`: 定义日志的格式。 `log_format main '$remote_addr - $remote_user [$time_local] "$request" ' ...;`

#### 10. 压缩 (Compression)

减小传输数据的大小。

*   `gzip`: 启用或禁用 Gzip 压缩。 `gzip on;`
*   `gzip_types`: 指定需要进行 Gzip 压缩的 MIME 类型。 `gzip_types text/plain text/css application/json;`
*   `gzip_min_length`: 启用压缩的最小文件大小。 `gzip_min_length 1024;`
*   `gzip_comp_level`: 压缩级别（1-9）。 `gzip_comp_level 5;`

#### 11. 安全与访问控制

限制对资源的访问。

*   `allow`: 允许指定的 IP 或网段访问。 `allow 192.168.1.0/24;`
*   `deny`: 拒绝指定的 IP 或网段访问。 `deny all;`
*   `auth_basic`: 启用 HTTP Basic Authentication。 `auth_basic "Restricted Area";`
*   `auth_basic_user_file`: 指定包含用户名和密码的文件。 `auth_basic_user_file /etc/nginx/.htpasswd;`

---

### 四、 完整配置示例

下面是一个综合了上述多个功能的典型 Nginx 配置文件，作为反向代理和静态文件服务器。

```nginx
# 全局配置
user www-data;
worker_processes auto;
pid /run/nginx.pid;
error_log /var/log/nginx/error.log;

# 事件驱动模型配置
events {
    worker_connections 1024;
}

# HTTP 服务器配置
http {
    # 包含 MIME 类型定义文件
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    # 日志格式
    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    # 访问日志
    access_log /var/log/nginx/access.log main;

    # 性能优化
    sendfile on;
    tcp_nopush on;
    keepalive_timeout 65;
    client_max_body_size 20m;

    # Gzip 压缩
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # 定义后端应用服务器集群
    upstream my_app_backend {
        # 负载均衡策略
        least_conn; 

        # 后端服务器列表
        server 127.0.0.1:8080;
        server 127.0.0.1:8081;
    }

    # HTTP 到 HTTPS 的重定向服务器
    server {
        listen 80;
        server_name example.com www.example.com;
        return 301 https://$host$request_uri;
    }

    # HTTPS 虚拟主机
    server {
        # 监听 443 端口并启用 SSL
        listen 443 ssl http2;
        server_name example.com www.example.com;

        # SSL/TLS 配置
        ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers 'TLS_AES_128_GCM_SHA256:TLS_AES_256_GCM_SHA384:ECDHE-RSA-AES128-GCM-SHA256';
        ssl_prefer_server_ciphers on;

        # 静态文件根目录
        root /var/www/example.com/public;
        index index.html index.php;

        # 处理静态文件
        location / {
            try_files $uri $uri/ =404;
        }

        # 反向代理到后端应用
        location /api/ {
            proxy_pass http://my_app_backend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # 处理 PHP 文件 (通过 FastCGI)
        location ~ \.php$ {
            include snippets/fastcgi-php.conf;
            fastcgi_pass unix:/var/run/php/php7.4-fpm.sock;
        }

        # 拒绝访问隐藏文件
        location ~ /\.ht {
            deny all;
        }
    }
}
```

---
### 五、 总结与最佳实践

1.  **分层结构**：始终牢记 `main` -> `http` -> `server` -> `location` 的层级关系。
2.  **指令继承**：子块会继承父块的指令，但如果在子块中重新定义，则会覆盖父块的设置。
3.  **使用 `include`**：对于大型配置，使用 `include` 将不同的虚拟主机或功能模块拆分到独立文件中，保持主配置文件的整洁。
4.  **`try_files` 优于 `if`**：在 `location` 中判断文件是否存在时，`try_files` 更高效、更安全。
5.  **测试配置**：在重新加载配置前，务必使用 `nginx -t` 命令检查语法是否正确。
6.  **查阅官方文档**：Nginx 的指令非常丰富，当遇到不确定的指令时，查阅官方文档是最佳选择。

这份文档覆盖了 Nginx 配置的绝大部分常用场景和核心概念，可以作为学习和日常工作的参考。