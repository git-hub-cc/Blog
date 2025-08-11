好的，这是一份对 Maven 命令进行分类和详细说明的完整文档。

---

# Maven 命令详解与分类

## 目录
1.  [Maven 核心概念简介](#1-maven-核心概念简介)
2.  [第一类：核心生命周期命令 (Core Lifecycle Commands)](#2-第一类核心生命周期命令-core-lifecycle-commands)
    *   [Clean 生命周期](#clean-生命周期)
    *   [Default 生命周期](#default-生命周期)
    *   [Site 生命周期](#site-生命周期)
3.  [第二类：常用插件目标命令 (Common Plugin Goals)](#3-第二类常用插件目标命令-common-plugin-goals)
    *   [依赖管理 (Dependency Plugin)](#依赖管理-dependency-plugin)
    *   [项目创建 (Archetype Plugin)](#项目创建-archetype-plugin)
    *   [信息与帮助 (Help Plugin)](#信息与帮助-help-plugin)
        4*   [其他常用插件](#其他常用插件)
4.  [第三类：实用构建选项与参数 (Practical Build Options & Parameters)](#4-第三类实用构建选项与参数-practical-build-options--parameters)
    *   [控制构建行为](#控制构建行为)
    *   [环境与配置](#环境与配置)
    *   [多模块项目控制](#多模块项目控制)
    *   [调试与日志](#调试与日志)
5.  [命令组合使用示例](#5-命令组合使用示例)

---

## 1. Maven 核心概念简介

在深入了解命令之前，先理解 Maven 的几个核心概念：

*   **POM (Project Object Model)**: `pom.xml` 文件，是 Maven 项目的核心配置文件，定义了项目信息、依赖、插件、构建方式等。
*   **生命周期 (Lifecycle)**: Maven 的构建过程被划分为一系列有序的阶段（Phase），例如 `compile`, `test`, `package`。一个完整的生命周期由多个阶段组成。
*   **阶段 (Phase)**: 生命周期中的一个步骤。执行一个阶段会自动执行其之前的所有阶段。例如，执行 `mvn install` 会依次执行 `validate`, `compile`, `test`, `package`, `install` 等阶段。
*   **插件 (Plugin)**: Maven 的实际工作是由插件完成的。每个插件提供一个或多个“目标”（Goal）。
*   **目标 (Goal)**: 插件中的一个具体任务，是 Maven 中可以执行的最小单元。一个阶段会绑定一个或多个插件目标来执行。

## 2. 第一类：核心生命周期命令 (Core Lifecycle Commands)

这是最常用的一类命令，它们直接调用 Maven 的内置生命周期阶段。Maven 主要有三个内置生命周期：`clean`, `default`, `site`。

### Clean 生命周期

用于清理上一次构建生成的文件。

| 命令 | 描述 |
| --- | --- |
| `mvn pre-clean` | 执行清理前的工作。 |
| `mvn clean` | **(最常用)** 删除 `target` 目录，即移除所有上次构建生成的文件（如 .class 文件、JAR 包等）。 |
| `mvn post-clean` | 执行清理后的工作。 |

---

### Default 生命周期

这是 Maven 最核心的生命周期，负责项目的编译、测试、打包、安装和部署。执行后面的阶段会自动触发执行前面的所有阶段。

| 命令 | 描述 |
| --- | --- |
| `mvn validate` | 验证项目是否正确，所有必要信息是否可用。 |
| `mvn compile` | 编译项目的源代码，将 `.java` 文件编译成 `.class` 文件到 `target/classes` 目录下。 |
| `mvn test` | 运行测试代码（默认在 `src/test/java` 目录下），使用合适的单元测试框架（如 JUnit）。 |
| `mvn package` | 将编译后的代码打包成可分发的格式，如 JAR、WAR 或 EAR。包文件存放在 `target` 目录下。 |
| `mvn verify` | 运行任何对打包结果的检查，例如集成测试，以确保质量。 |
| `mvn install` | **(非常常用)** 将项目打包后的构件（JAR/WAR）安装到本地 Maven 仓库 (`~/.m2/repository`)，供本机其他项目依赖。 |
| `mvn deploy` | **(CI/CD 中常用)** 将最终的包上传到远程仓库（如 Nexus, Artifactory），供其他开发人员或项目共享。 |

---

### Site 生命周期

用于生成和部署项目站点文档。

| 命令 | 描述 |
| --- | --- |
| `mvn pre-site` | 执行生成项目站点前的准备工作。 |
| `mvn site` | **(常用)** 在 `target/site` 目录下为当前项目生成站点文档。 |
| `mvn post-site` | 执行生成项目站点后的工作。 |
| `mvn site-deploy` | 将生成的站点文档部署到指定的服务器上。 |

## 3. 第二类：常用插件目标命令 (Common Plugin Goals)

这类命令直接调用特定插件的特定目标，格式为 `mvn [plugin-prefix]:[goal]`。它们不属于任何生命周期，可以独立执行。

### 依赖管理 (Dependency Plugin)

用于分析和管理项目依赖。

| 命令 | 描述 |
| --- | --- |
| `mvn dependency:tree` | **(非常常用)** 以树状结构显示项目的完整依赖关系，是解决依赖冲突的利器。 |
| `mvn dependency:analyze` | 分析项目依赖，找出“已使用但未声明”、“未使用但已声明”的依赖，帮助优化 `pom.xml`。 |
| `mvn dependency:resolve` | 解析并下载项目的所有依赖。 |
| `mvn dependency:copy-dependencies` | 将项目的所有依赖 JAR 包复制到指定目录（默认为 `target/dependency`）。 |

### 项目创建 (Archetype Plugin)

用于从模板（原型）创建新项目。

| 命令 | 描述 |
| --- | --- |
| `mvn archetype:generate` | **(非常常用)** 根据指定的原型创建一个新的 Maven 项目。它会以交互式方式提示你输入 `groupId`, `artifactId`, `version` 等信息。 |

### 信息与帮助 (Help Plugin)

用于获取 Maven 环境和项目信息。

| 命令 | 描述 |
| --- | --- |
| `mvn help:effective-pom` | **(调试利器)** 显示项目的“有效 POM”。它包含了所有父 POM、profile 和默认设置合并后的最终 POM，非常适合用来排查配置问题。 |
| `mvn help:effective-settings` | 显示生效的 `settings.xml` 文件内容，合并了全局和用户配置。 |
| `mvn help:describe -Dplugin=[plugin-prefix]` | 显示指定插件的详细信息，包括它提供的所有目标。例如 `mvn help:describe -Dplugin=dependency`。 |

### 其他常用插件

| 命令 | 描述 |
| --- | --- |
| `mvn surefire-report:report` | 生成单元测试报告。 |
| `mvn versions:set -DnewVersion=x.x.x` | 更新项目版本号。 |
| `mvn versions:display-dependency-updates` | 检查所有依赖项是否有新版本可用。 |

## 4. 第三类：实用构建选项与参数 (Practical Build Options & Parameters)

这些不是独立的命令，而是附加在 `mvn` 命令后面的参数，用于控制构建过程。

### 控制构建行为

| 选项 | 描述 |
| --- | --- |
| `-D<property>=<value>` | **(极其常用)** 指定 Java 系统属性。最常见的用法是 `-DskipTests=true` 来跳过测试阶段。 |
| `-P<profile_name>` | 激活在 `pom.xml` 中定义的特定 profile。多个 profile 用逗号分隔，如 `-Pdev,test`。 |
| `-o` 或 `--offline` | 离线模式。Maven 将不会尝试连接远程仓库，只使用本地仓库。 |
| `-U` 或 `--update-snapshots` | 强制检查远程仓库的 SNAPSHOT 版本更新，即使本地已有。 |
| `-B` 或 `--batch-mode` | 非交互模式。在 CI/CD 环境中常用，避免构建因需要用户输入而挂起。 |
| `-N` 或 `--non-recursive` | 非递归构建。只构建当前目录的项目，不构建其子模块。 |

### 环境与配置

| 选项 | 描述 |
| --- | --- |
| `-s <path>` 或 `--settings <path>` | 指定 `settings.xml` 文件的路径。 |
| `-gs <path>` 或 `--global-settings <path>` | 指定全局 `settings.xml` 文件的路径。 |

### 多模块项目控制

| 选项 | 描述 |
| --- | --- |
| `-pl <module-list>` 或 `--projects <module-list>` | 构建指定的模块列表（用逗号分隔）。例如 `-pl my-module-a,my-module-b`。 |
| `-am` 或 `--also-make` | 同时构建指定模块所依赖的其他模块。通常与 `-pl` 结合使用。 |
| `-amd` 或 `--also-make-dependents` | 同时构建依赖于指定模块的其他模块。 |
| `-rf <module>` 或 `--resume-from <module>` | 从多模块构建中的指定模块恢复。 |

### 调试与日志

| 选项 | 描述 |
| --- | --- |
| `-X` 或 `--debug` | 开启 DEBUG 级别的日志输出，提供非常详细的构建信息。 |
| `-e` 或 `--errors` | 当构建失败时，提供完整的错误堆栈信息。 |
| `-q` 或 `--quiet` | 静默模式，只显示错误信息。 |
| `-T <threads>` 或 `--threads <threads>` | **(性能优化)** 开启多线程并行构建。例如 `-T 4` 使用 4 个线程；`-T 1C` 表示每个 CPU 核心使用 1 个线程。 |

## 5. 命令组合使用示例

Maven 的强大之处在于将上述命令和选项组合使用。

1.  **最常用的构建命令：**
    ```bash
    mvn clean install
    ```
    说明：先清理 `target` 目录，然后执行从 `validate` 到 `install` 的所有阶段，最终将项目构件安装到本地仓库。

2.  **构建并跳过测试：**
    ```bash
    mvn clean install -DskipTests
    ```
    说明：与上面相同，但跳过了耗时的测试阶段，适合本地快速验证。

3.  **在多模块项目中只构建特定模块及其依赖：**
    ```bash
    mvn clean install -pl web-app -am
    ```
    说明：清理整个项目，然后只构建 `web-app` 模块以及它所依赖的其他模块。

4.  **强制更新 SNAPSHOT 依赖并进行调试：**
    ```bash
    mvn clean package -U -X
    ```
    说明：强制从远程仓库更新快照版本，并以 DEBUG 模式输出详细日志进行打包。

5.  **为 CI/CD 创建的无交互式项目生成命令：**
    ```bash
    mvn archetype:generate -B \
      -DarchetypeGroupId=org.apache.maven.archetypes \
      -DarchetypeArtifactId=maven-archetype-quickstart \
      -DarchetypeVersion=1.4 \
      -DgroupId=com.mycompany \
      -DartifactId=my-app \
      -Dversion=1.0-SNAPSHOT
    ```
    说明：使用 `-B` (batch-mode) 和多个 `-D` 参数，无需人工交互即可创建一个完整的项目结构。

---