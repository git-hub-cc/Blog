好的，遵照您的要求，以下是一份关于 Maven 依赖范围（Dependency Scope）的完整分类文档。

---

## Maven 依赖范围 (Dependency Scope) 详解

### 1. 什么是依赖范围 (Dependency Scope)？

在 Maven 项目中，我们通过 `pom.xml` 文件中的 `<dependencies>` 标签来引入项目所需的外部库（JAR 包）。每一个 `<dependency>` 标签内部都可以指定一个 `<scope>` 元素，这个 **scope** 就被称为**依赖范围**。

依赖范围的核心作用是**控制依赖在不同构建阶段（如编译、测试、运行）的可用性（Classpath），以及它是否会被打包到最终的产物（如 JAR, WAR）中**。

一个常见的误解是将其称为“依赖生命周期”。Maven 的生命周期（Lifecycle）是指 `clean`, `default` (包含 `compile`, `test`, `package` 等阶段), `site` 这些构建流程。而依赖范围（Scope）是作用于依赖本身，决定其在这些生命周期阶段中如何表现。

正确地使用依赖范围，可以帮助我们：
*   避免不必要的依赖被打包，减小最终产物体积。
*   解决类路径冲突，隔离编译、测试和运行环境。
*   提高项目的可维护性和清晰度。

### 2. Maven 的六种主要依赖范围

Maven 定义了六种标准的依赖范围：`compile`, `provided`, `runtime`, `test`, `system`, 和 `import`。

下面我们对每一种进行详细的分类说明。

---

### A. 核心依赖范围

这三种是最常用且最重要的范围，覆盖了绝大部分开发场景。

#### 2.1 `compile` (编译范围)

这是**默认的依赖范围**，如果不指定 `<scope>`，则默认为 `compile`。

*   **简述**: 依赖对项目的编译、测试、运行三个阶段都有效，并且会被打包到最终的产物中。
*   **作用范围**:
    *   **编译**: 可用（参与项目主代码的编译）。
    *   **测试**: 可用（参与项目测试代码的编译和执行）。
    *   **运行**: 可用（包含在运行时 Classpath 中）。
    *   **打包**: **会**被打包进最终的构件（如 WAR 包的 `WEB-INF/lib/` 或可执行 JAR 的 `BOOT-INF/lib/`）。
*   **是否具有传递性**: **是**。该依赖所依赖的 `compile` 和 `runtime` 范围的库也会被传递性地引入到当前项目中。
*   **典型应用场景**:
    *   项目代码在任何时候都需要用到的库，例如 Spring Framework (`spring-core`), Apache Commons Lang (`commons-lang3`), 日志库 (`log4j2-core`) 等。
*   **示例**:
    ```xml
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
        <!-- <scope>compile</scope>  <-- 无需显式声明 -->
    </dependency>
    ```

#### 2.2 `provided` (已提供范围)

*   **简述**: 依赖在编译和测试阶段有效，但在运行阶段被认为是“已提供”的，因此不会被打包。
*   **作用范围**:
    *   **编译**: 可用。
    *   **测试**: 可用。
    *   **运行**: 不可用（由 JDK 或容器在运行时提供）。
    *   **打包**: **不会**被打包。
*   **是否具有传递性**: **否**。该依赖所依赖的任何库都不会被传递。
*   **典型应用场景**:
    *   **Web 应用**: `servlet-api`, `jsp-api` 等，因为这些 JAR 包由 Tomcat, Jetty 等 Web 容器在运行时提供。如果打包进去，可能会导致版本冲突。
    *   **日志实现**: 当项目作为一个库给其他项目使用时，可以把具体的日志实现（如 `logback-classic`）设为 `provided`，让最终的应用程序来决定使用哪个日志实现。
*   **示例**:
    ```xml
    <dependency>
        <groupId>javax.servlet</groupId>
        <artifactId>javax.servlet-api</artifactId>
        <version>4.0.1</version>
        <scope>provided</scope>
    </dependency>
    ```

#### 2.3 `runtime` (运行时范围)

*   **简述**: 依赖在编译阶段不需要，但在测试和运行阶段需要。它会被打包到最终产物中。
*   **作用范围**:
    *   **编译**: 不可用（主代码编译时看不到这个库）。
    *   **测试**: 可用。
    *   **运行**: 可用。
    *   **打包**: **会**被打包。
*   **是否具有传递性**: **是**。
*   **典型应用场景**:
    *   **JDBC 驱动**: 项目代码通常是基于标准的 `java.sql.Connection` 等接口进行编程（这些接口在 JDK 中），只有在运行时才需要具体的数据库驱动实现（如 `mysql-connector-java`）。
    *   **基于接口的插件化实现**: 你的代码依赖某个 API（`compile` 范围），但在运行时需要一个具体的实现（`runtime` 范围）。
*   **示例**:
    ```xml
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <scope>runtime</scope>
    </dependency>
    ```

### B. 特定场景依赖范围

#### 2.4 `test` (测试范围)

*   **简述**: 依赖仅在测试编译和测试运行阶段有效，不会参与主代码的编译，也不会被打包。
*   **作用范围**:
    *   **编译**: 不可用。
    *   **测试**: 可用。
    *   **运行**: 不可用。
    *   **打包**: **不会**被打包。
*   **是否具有传递性**: **否**。
*   **典型应用场景**:
    *   所有用于测试的库，如单元测试框架 (`JUnit`, `TestNG`)，模拟框架 (`Mockito`)，断言库 (`AssertJ`) 等。
*   **示例**:
    ```xml
    <dependency>
        <groupId>org.junit.jupiter</groupId>
        <artifactId>junit-jupiter-api</artifactId>
        <scope>test</scope>
    </dependency>
    <dependency>
        <groupId>org.mockito</groupId>
        <artifactId>mockito-core</artifactId>
        <scope>test</scope>
    </dependency>
    ```

### C. 特殊且不常用的依赖范围

#### 2.5 `system` (系统范围)

*   **简述**: 与 `provided` 类似，但需要你**手动指定本地系统上的 JAR 文件路径**。
*   **注意**: **强烈不推荐使用！**
    *   **破坏可移植性**: 构建过程依赖于本地文件系统的特定布局，其他开发者或 CI/CD 服务器上可能无法构建。
    *   **脱离仓库管理**: 该 JAR 包无法从 Maven 中央仓库或私服下载，管理困难。
*   **作用范围**:
    *   与 `provided` 相同（编译、测试可用，不打包）。
*   **是否具有传递性**: **否**。
*   **替代方案**: 更好的做法是将这个 JAR 安装到本地仓库 (`mvn install:install-file`) 或部署到私服（如 Nexus, Artifactory）。
*   **示例 (仅作了解)**:
    ```xml
    <dependency>
        <groupId>com.example</groupId>
        <artifactId>custom-lib</artifactId>
        <version>1.0</version>
        <scope>system</scope>
        <systemPath>${project.basedir}/libs/custom-lib.jar</systemPath>
    </dependency>
    ```

#### 2.6 `import` (导入范围)

*   **简述**: 这是一种非常特殊的范围，它**只在 `<dependencyManagement>` 部分使用**。它的作用是**从其他 Maven 项目（通常是一个 POM 文件）中导入依赖管理配置**。
*   **注意**: 它不直接引入 JAR 依赖，而是导入版本号等管理信息。
*   **作用范围**:
    *   仅在 `<dependencyManagement>` 块中有效。
*   **典型应用场景**:
    *   **Spring Boot Bill of Materials (BOM)**: 当使用 Spring Boot 时，我们通常会导入 `spring-boot-dependencies` 这个 POM。它在 `<dependencyManagement>` 中定义了所有 Spring Boot 兼容的依赖版本。这样，我们在自己的 `<dependencies>` 中引入 `spring-boot-starter-web` 等依赖时，就无需指定版本号，Maven 会自动采用 BOM 中定义的版本，从而保证了版本兼容性。
*   **示例**:
    ```xml
    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-dependencies</artifactId>
                <version>2.7.5</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>

    <!-- 在下方 dependencies 中使用时，无需指定版本 -->
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
            <!-- 版本号由上面的 BOM 管理 -->
        </dependency>
    </dependencies>
    ```

### 3. 依赖范围总结速查表

| 依赖范围 (`<scope>`) | 编译 Classpath | 测试 Classpath | 运行 Classpath | 是否打包 | 是否传递 | 典型用途 |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **`compile` (默认)** |  ✔️  |  ✔️  |  ✔️  |  ✔️  |  ✔️  | 项目核心库 (Spring) |
| **`provided`** |  ✔️  |  ✔️  |  ❌  |  ❌  |  ❌  | 容器提供的库 (Servlet API) |
| **`runtime`** |  ❌  |  ✔️  |  ✔️  |  ✔️  |  ✔️  | 运行时实现 (JDBC 驱动) |
| **`test`** |  ❌  |  ✔️  |  ❌  |  ❌  |  ❌  | 测试框架 (JUnit, Mockito) |
| **`system`** |  ✔️  |  ✔️  |  ❌  |  ❌  |  ❌  | **不推荐**，本地 JAR |
| **`import`** |  -  |  -  |  -  |  -  |  -  | 在 `dependencyManagement` 中导入 BOM |

### 4. 依赖传递与范围继承规则

当你的项目 A 依赖 B，而 B 又依赖 C 时，C 是否会成为 A 的依赖，以及以何种范围存在，遵循以下规则：

*   **第二列的范围** 是 A 对 B 的依赖范围。
*   **第一行的范围** 是 B 对 C 的依赖范围。
*   **交叉点** 是 C 在 A 中的最终范围。如果为空，则表示 C 不会成为 A 的依赖。

|  ↓ B->C \ A->B → | `compile` | `provided` | `runtime` | `test` |
| :---: | :---: | :---: | :---: | :---: |
| **`compile`** | `compile` | `provided` | `runtime` | `test` |
| **`provided`** | - | - | - | - |
| **`runtime`** | `runtime` | `provided` | `runtime` | `test` |
| **`test`** | - | - | - | - |

**核心记忆点**:
1.  左边（B->C）的范围如果为 `test` 或 `provided`，则不会传递。
2.  右边（A->B）的范围决定了传递链条的最大范围。`test` 和 `provided` 链条上的依赖基本不会被传递。

### 5. 最佳实践

1.  **最小范围原则**: 始终为依赖选择最严格、最精确的范围。例如，如果一个库只在测试时用到，就必须使用 `<scope>test</scope>`。
2.  **避免 `system` 范围**: 寻找更好的替代方案，如部署到私服。
3.  **善用 `import` 范围**: 在多模块项目或使用大型框架（如 Spring Boot）时，使用 BOM 来统一管理版本，避免冲突。
4.  **定期审查依赖**: 使用 `mvn dependency:tree` 命令可以清晰地看到项目的完整依赖树和每个依赖的范围，有助于排查冲突和优化依赖结构。

---