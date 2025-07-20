# Linux 常用下载工具对比与使用

在 Linux 环境下，命令行下载工具是高效工作的利器。本文主要对比和介绍三个最主流的下载工具：`wget`、`curl` 和 `aria2`。

## 功能特性对比

| 特性 | `wget` | `curl` | `aria2` |
| :--- | :--- | :--- | :--- |
| **主要用途** | 文件下载、网站镜像 | 数据传输、API 测试 | 高速文件下载 |
| **多线程下载** | ❌ 不支持 | ❌ 不支持 | ✅ 支持 |
| **断点续传** | ✅ 支持 | ✅ 支持 | ✅ 支持 |
| **协议支持** | HTTP, HTTPS, FTP | HTTP, HTTPS, FTP, SMB, SCP 等 | HTTP, HTTPS, FTP, BitTorrent, Metalink |
| **BT/磁力链** | ❌ 不支持 | ❌ 不支持 | ✅ 支持 |
| **RPC 远程控制**| ❌ 不支持 | ❌ 不支持 | ✅ 支持 |
| **系统预装** | 通常预装 | 通常预装 | 需手动安装 |

---

## 各工具使用详解

### 1. Wget

`wget` 是一个简单而强大的文件下载工具，特别适合直接下载文件或递归下载整个网站。

#### 常用命令

-   **基本下载**
    ```bash
    wget [下载链接]
    ```

-   **下载并重命名文件**
    ```bash
    wget -O new_filename.zip [下载链接]
    ```

-   **断点续传**（如果下载中断，使用此命令继续）
    ```bash
    wget -c [下载链接]
    ```

-   **后台下载**
    ```bash
    wget -b [下载链接]
    ```

### 2. cURL

`curl` 是一个功能极其丰富的“瑞士军刀”，主要用于数据传输。它不仅能下载文件，还广泛用于 API 请求和调试。

#### 常用命令

-   **基本下载**（默认输出到标准输出，即打印在终端）
    ```bash
    curl [下载链接]
    ```

-   **下载并保存到文件**（`-o` 指定文件名，`-O` 使用远程文件名）
    ```bash
    # 指定文件名
    curl -o new_filename.zip [下载链接]
    
    # 使用服务器上的文件名
    curl -O [下载链接]
    ```

-   **断点续传**
    ```bash
    curl -C - -O [下载链接]
    ```

### 3. Aria2

`aria2` 被誉为“下载神器”，其最大优点是支持多线程、多来源和多协议下载，可以显著提升大文件的下载速度。

#### 3.1 安装

-   **CentOS / RHEL / Fedora (yum/dnf)**
    ```bash
    sudo yum -y install aria2
    # 或者
    sudo dnf -y install aria2
    ```

-   **Debian / Ubuntu (apt)**
    ```bash
    sudo apt update
    sudo apt -y install aria2
    ```

#### 3.2 使用命令

-   **多线程下载**（`-x` 参数指定单服务器连接数，`-s` 指定总连接数）
    ```bash
    # 使用 4 个线程下载
    aria2c -x4 [下载链接]
    
    # 使用最多 16 个线程下载（更强力）
    aria2c -s16 -x16 [下载链接]
    ```

-   **断点续传**
    `aria2c` 默认开启断点续传。如果下载中断，只需重新执行相同的下载命令即可。也可以显式指定：
    ```bash
    aria2c -c [下载链接]
    ```

-   **下载 Torrent 文件或磁力链接**
    > **注意**：下载 BT 内容时，请确保遵守当地法律法规。

    ```bash
    # 从 Torrent 种子文件下载
    aria2c /path/to/your/file.torrent
    
    # 从磁力链接下载 (建议用引号包裹链接)
    aria2c "magnet:?xt=urn:btih:..."
    ```

-   **从文本文件批量下载**
    创建一个 `urls.txt` 文件，每行一个下载链接，然后执行：
    ```bash
    aria2c -i urls.txt
    ```

## 如何选择？

-   **简单下载**：使用 `wget`，命令简单直接。
-   **脚本或API交互**：首选 `curl`，功能强大，是自动化脚本的黄金搭档。
-   **追求速度/下载大文件**：`aria2` 是不二之选，其多线程能力能榨干你的带宽。
-   **下载BT/磁力链**：只能使用 `aria2`。

## 参考资料

1.  [CSDN - Linux断点续传工具](https://blog.csdn.net/weixin_34080903/article/details/85504081)