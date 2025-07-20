# Windows Subsystem for Linux (WSL) 安装与配置指南

本文档旨在为用户提供一个清晰、完整的指南，用于在 Windows 10/11 系统上安装和配置适用于 Linux 的 Windows 子系统 (WSL)，并涵盖常用工具如 SSH 和 Docker 的配置方法。

## 1. WSL 安装

WSL 的安装分为两种方式：推荐使用**自动化安装命令**，它能一步到位完成所有操作；如果命令不可用或希望手动控制，也可以使用**手动安装步骤**。

### 推荐方式：自动化安装 (Windows 10 2004 及以上 / Windows 11)

这是最简单快捷的方式。只需一个命令即可完成所有设置。

1.  以 **管理员身份** 打开 PowerShell 或 Windows 命令提示符。
2.  执行以下命令，它会自动启用所需功能、下载最新的 Linux 内核、将 WSL2 设置为默认版本，并安装 Ubuntu 发行版：
    ```powershell
    wsl --install
    ```
3.  安装完成后，**重启计算机**。重启后，Ubuntu 将会自动开始安装。

---

### 备用方式：手动分步安装

如果 `wsl --install` 命令无效，或者您想手动完成每一步，请按以下流程操作。

#### 步骤一：启用 Windows 功能

1.  打开 **控制面板** -> **程序** -> **启用或关闭 Windows 功能**。
2.  勾选以下三个选项：
   *   **Hyper-V** (确保虚拟化技术在 BIOS/UEFI 中已开启)
   *   **虚拟机平台 (Virtual Machine Platform)**
   *   **适用于 Linux 的 Windows 子系统 (Windows Subsystem for Linux)**
3.  点击“确定”，然后根据提示**重启计算机**。

#### 步骤二：从 Microsoft Store 安装 Linux 发行版

1.  打开 **Microsoft Store**。
2.  搜索您想要的 Linux 发行版，例如 **Ubuntu** (推荐选择最新的 LTS 版本，如 Ubuntu 22.04 LTS)。
3.  点击“获取”或“安装”进行下载。

## 2. Ubuntu 首次启动与基础配置

安装完成后，您可以从“开始”菜单找到并启动 Ubuntu。

1.  **创建用户**：首次启动时，系统会提示您创建一个新的 UNIX 用户名和密码。这个用户是您的日常操作账户，并且会自动加入 `sudo` 组，拥有管理员权限。
   *   **注意**：这里设置的密码在终端中输入时不会显示任何字符，这是正常的安全机制。

2.  **更新软件包**：进入系统后，首先应该更新软件包列表和已安装的软件。这是保持系统安全和稳定的重要一步。
    ```bash
    sudo apt update && sudo apt upgrade -y
    ```

3.  **(可选) 设置 root 用户密码**：默认情况下，root 用户没有密码，所有管理员操作都通过 `sudo` 完成。这是更安全的做法。如果您确实有特殊需求需要直接使用 root 登录，可以为其设置密码。
    ```bash
    # 为 root 用户设置新密码
    sudo passwd root
    ```
    之后，系统会提示您输入并确认 root 的新密码。

## 3. 配置 SSH 服务 (用于 FinalShell/MobaXterm/Xshell 等工具远程连接)

WSL 默认不开启 SSH 服务。如果想通过 SSH 客户端连接，需要手动安装和配置。

1.  **安装 OpenSSH 服务器**：
    ```bash
    # 如果之前有旧的或损坏的安装，可以先卸载清理
    sudo apt-get remove --purge openssh-server
    
    # 安装新的 OpenSSH 服务器
    sudo apt-get install openssh-server
    ```

2.  **配置 SSH 服务**：
    编辑 SSH 服务器的配置文件 `/etc/ssh/sshd_config`。
    ```bash
    sudo nano /etc/ssh/sshd_config
    ```
    在配置文件中，找到并确认或修改以下几项，以允许密码登录和指定端口（默认 22）：
    ```ini
    # 推荐修改默认端口，提高安全性，例如改为 2222
    Port 2222

    # 允许使用密码进行身份验证
    PasswordAuthentication yes
    
    # (可选) 如果只想允许特定用户登录，可以添加此行
    # AllowUsers your_username
    ```
    修改完成后，按 `Ctrl+X`，然后按 `Y` 保存，再按 `Enter` 确认。

3.  **启动 SSH 服务**：
    ```bash
    sudo service ssh --full-restart
    ```

4.  **获取 WSL 的 IP 地址**：
    在 Ubuntu 终端中执行以下命令查看 IP 地址：
    ```bash
    hostname -I
    ```
    您会得到一个类似于 `172.x.x.x` 的地址。

5.  **连接**：
    现在可以在 FinalShell 或其他 SSH 客户端中使用上一步获取的 IP 地址、您修改的端口（如 2222）以及您在 Ubuntu 中创建的用户名和密码进行连接了。

## 4. 网络代理配置

如果您的 WSL 需要通过代理访问网络（例如，加速 `apt`、`git`、`docker pull` 等）。

*   **临时代理**：在当前终端会话中设置代理。
    ```bash
    # 将 127.0.0.1:7890 替换为您的代理服务器地址和端口
    export http_proxy="http://127.0.0.1:7890"
    export https_proxy="http://127.0.0.1:7890"
    export all_proxy="socks5://127.0.0.1:7890" # 部分应用支持 all_proxy
    ```
*   **永久代理**：将上述 `export` 命令添加到您的 shell 配置文件（如 `~/.bashrc` 或 `~/.zshrc`）的末尾，这样每次打开新的终端时都会自动生效。
    ```bash
    echo 'export http_proxy="http://127.0.0.1:7890"' >> ~/.bashrc
    echo 'export https_proxy="http://127.0.0.1:7890"' >> ~/.bashrc
    source ~/.bashrc # 使其立即生效
    ```
*   **Clash for Windows 的 TUN 模式**：这是一个更优的方案。开启 TUN 模式后，它会创建一个虚拟网卡来接管系统的网络流量，WSL 的网络请求会自动通过代理，无需在 WSL 内部进行任何配置。

    **注意**：使用代理时，请确保 Windows 防火墙允许 WSL 与代理应用之间的通信。

## 5. Docker 使用指南

**强烈推荐使用 WSL2 运行 Docker**，因为它提供了完整的 Linux 内核，性能和兼容性远超 WSL1。

### 推荐方式：WSL2 + Docker Desktop

这是目前最流行、最无缝的集成方案。

1.  确保您的 WSL 已设置为 WSL2 版本。
    ```powershell
    # 在 PowerShell 中查看 WSL 版本
    wsl -l -v
    
    # 如果您的 Ubuntu 是 WSL1，可以执行以下命令转换为 WSL2
    wsl --set-version Ubuntu 2 # 将 "Ubuntu" 替换为您的发行版名称
    ```
2.  在 Windows 上安装 **Docker Desktop**。
3.  打开 Docker Desktop，进入 **Settings** -> **Resources** -> **WSL Integration**。
4.  确保 **"Enable integration with my default WSL distro"** 已开启。
5.  在下方的列表中，找到您的 Ubuntu 发行版，并**开启**它旁边的开关。
6.  点击 **"Apply & Restart"**。

设置完成后，您就可以直接在 Ubuntu 终端中使用 `docker` 和 `docker-compose` 命令了，它们会通过一个高效的 socket 直接与 Windows 上的 Docker 引擎通信，无需任何额外配置。

```bash
# 在 Ubuntu 终端中直接运行
docker version
docker run hello-world
```

---

### 传统方式：WSL1 + Docker Client (不推荐)

此方法适用于因特殊原因必须使用 WSL1 的场景。它通过在 WSL1 中安装 Docker 客户端，并使其连接到 Windows 上的 Docker 引擎。

1.  **在 Docker Desktop 中配置**：
   *   打开 Docker Desktop -> **Settings** -> **General**。
   *   勾选 **"Expose daemon on tcp://localhost:2375 without TLS"**。
   *   **安全警告**：此选项会暴露一个未加密的 Docker API 端口，任何能访问您本地网络的应用都可能控制您的 Docker。请仅在受信任的网络环境中使用。

2.  **在 WSL1 (Ubuntu) 中安装 Docker 客户端**：
    ```bash
    # 1. 更新 apt 包索引
    sudo apt-get update

    # 2. 安装必要的软件包
    sudo apt-get install -y apt-transport-https ca-certificates curl software-properties-common

    # 3. 添加 Docker 官方 GPG 密钥 (推荐使用 Docker 官方源而非阿里云)
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

    # 4. 设置稳定版仓库
    echo \
      "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
      $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

    # 5. 再次更新并安装 Docker CE CLI (客户端)
    sudo apt-get update
    sudo apt-get install docker-ce-cli
    ```

3.  **配置 DOCKER_HOST 环境变量**：
    为了让 WSL 中的 Docker 客户端知道去哪里找 Docker 引擎，需要设置环境变量。
    ```bash
    # 将此行添加到 ~/.bashrc 文件末尾
    echo 'export DOCKER_HOST=tcp://localhost:2375' >> ~/.bashrc

    # 使配置立即生效
    source ~/.bashrc
    ```
4.  **验证**：
    重新打开一个 Ubuntu 终端，执行 `docker version`，您应该能看到 Client (在 WSL 中) 和 Server (在 Windows 上) 的信息。