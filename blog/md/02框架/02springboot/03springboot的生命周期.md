好的，遵照您的要求，这是一份关于 Spring Boot 生命周期的完整分类文档。

---

# Spring Boot 应用生命周期全解析

## 引言

Spring Boot 的生命周期是指从一个 Spring Boot 应用启动（执行 `main` 方法）到最终关闭（JVM 退出）的整个过程。理解这个生命周期对于开发者进行应用监控、资源管理、自定义扩展以及问题排查至关重要。

其核心驱动类是 `org.springframework.boot.SpringApplication`，它负责创建和管理 `ApplicationContext`（应用上下文），并协调整个启动、运行和关闭流程。

Spring Boot 的生命周期可以清晰地划分为三个主要阶段：

1.  **启动阶段 (Initialization & Startup)**：准备和初始化应用所需的环境、上下文和 Bean。
2.  **运行阶段 (Running)**：应用成功启动，持续处理业务请求，对外提供服务。
3.  **关闭阶段 (Shutdown)**：应用接收到关闭信号，优雅地释放资源并终止。

下面，我们将对这三个阶段进行详细的分类和阐述。

---

## 第一阶段：启动阶段 (Initialization & Startup)

这是整个生命周期中最复杂也最重要的阶段。它涉及到环境配置的加载、`ApplicationContext` 的创建与刷新、以及所有 Bean 的实例化和配置。我们可以将其细分为以下几个核心步骤：


*(这是一个简化的流程图，用于帮助理解)*

#### 1. **`SpringApplication` 实例化**
- **触发点**：执行应用的 `main` 方法，调用 `SpringApplication.run(PrimarySource.class, args)`。
- **核心动作**：
    - `new SpringApplication(primarySources)` 构造方法被调用。
    - **推断应用类型**：根据 classpath 中是否存在特定类（如 `DispatcherServlet`）来判断应用是 `SERVLET` Web 应用、`REACTIVE` Web 应用还是 `NONE` 非 Web 应用。
    - **加载初始化器和监听器**：从 `META-INF/spring.factories` 文件中加载 `ApplicationContextInitializer` 和 `ApplicationListener` 的实现类，并将它们添加到 `SpringApplication` 实例中。这些是 Spring Boot 提供的第一批扩展点。

#### 2. **准备环境 (Environment Preparation)**
- **触发点**：`SpringApplication.run()` 方法内部调用。
- **核心动作**：
    - **创建 `Environment` 对象**：根据推断的应用类型创建相应的 `ConfigurableEnvironment` (如 `StandardServletEnvironment`)。
    - **加载配置属性**：按照**严格的优先级顺序**加载外部化配置。优先级从高到低依次为：
        1.  命令行参数 (`--server.port=9090`)
        2.  `SPRING_APPLICATION_JSON` 环境变量。
        3.  ServletConfig / ServletContext 初始化参数。
        4.  JNDI 属性。
        5.  Java 系统属性 (`System.getProperties()`)。
        6.  操作系统环境变量。
        7.  `random.*` 属性。
        8.  **Profile-specific 配置文件** (如 `application-{profile}.properties` 或 `.yml`)。
        9.  **标准配置文件** (如 `application.properties` 或 `.yml`)。
        10. `@PropertySource` 注解指定的配置文件。
        11. 默认属性 (`SpringApplication.setDefaultProperties`)。
    - **发布 `ApplicationEnvironmentPreparedEvent` 事件**：通知所有监听器，环境已准备就绪。`ConfigFileApplicationListener` 会监听此事件并加载上述配置文件。

#### 3. **创建应用上下文 (ApplicationContext Creation)**
- **核心动作**：
    - 根据第一步推断的应用类型，实例化一个具体的 `ConfigurableApplicationContext`。
        - **SERVLET**: `AnnotationConfigServletWebServerApplicationContext`
        - **REACTIVE**: `AnnotationConfigReactiveWebServerApplicationContext`
        - **NONE**: `AnnotationConfigApplicationContext`

#### 4. **准备应用上下文 (ApplicationContext Preparation)**
- **核心动作**：
    - **设置 `Environment`**：将第二步准备好的 `Environment` 对象设置到上下文中。
    - **执行 `ApplicationContextInitializer`**：调用所有已注册的 `ApplicationContextInitializer` 的 `initialize` 方法，允许在上下文刷新前对其进行编程方式的配置。
    - **发布 `ApplicationContextInitializedEvent` 事件**：通知监听器，上下文已完成初始化，但 Bean 定义尚未加载。
    - **加载 Bean 定义**：Spring 开始扫描 `@SpringBootApplication` 注解所在包及其子包下的所有组件（`@Component`, `@Service`, `@Repository`, `@Controller` 等），并将它们注册为 `BeanDefinition`。
    - **发布 `ApplicationPreparedEvent` 事件**：通知监听器，上下文已准备就绪，Bean 定义已加载，但上下文尚未刷新。

#### 5. **刷新应用上下文 (ApplicationContext Refresh)**
- **触发点**：调用 `context.refresh()`。这是**Spring 框架的核心**，也是 Spring Boot 启动流程的心脏。
- **核心动作**（高度概括）：
    1.  `prepareRefresh()`: 准备刷新，设置启动日期、激活标志等。
    2.  `obtainFreshBeanFactory()`: 创建或获取内部的 `BeanFactory`。
    3.  `prepareBeanFactory()`: 配置 `BeanFactory`，添加 `BeanPostProcessor`、设置类加载器等。
    4.  `postProcessBeanFactory()`: 子类扩展点，允许对 `BeanFactory` 进行后处理。
    5.  `invokeBeanFactoryPostProcessors()`: **执行所有 `BeanFactoryPostProcessor`**，它们可以修改 Bean 定义（例如，`PropertySourcesPlaceholderConfigurer` 替换 `${...}` 占位符）。
    6.  `registerBeanPostProcessors()`: 注册所有 `BeanPostProcessor`，它们将在 Bean 实例化前后进行干预。
    7.  `initMessageSource()`: 初始化国际化消息源。
    8.  `initApplicationEventMulticaster()`: 初始化事件广播器。
    9.  `onRefresh()`: **一个关键的模板方法**。对于 Web 应用，此步骤会**创建并启动内嵌的 Web 服务器**（如 Tomcat, Jetty, Undertow）。
    10. `registerListeners()`: 注册所有 `ApplicationListener` 类型的 Bean。
    11. `finishBeanFactoryInitialization()`: **实例化所有剩余的非懒加载单例 Bean**。这是依赖注入（DI）发生的地方。
    12. `finishRefresh()`: 完成刷新过程，发布 `ContextRefreshedEvent` 事件。

#### 6. **启动后处理 (Post-Refresh Processing)**
- **核心动作**：
    - **发布 `ApplicationStartedEvent` / `ApplicationReadyEvent` 事件**：
        - `ApplicationStartedEvent` 在 `ContextRefreshedEvent` 后立即发布。
        - `ApplicationReadyEvent`（更常用）在所有 Runner 执行完毕后发布，标志着应用已完全准备好接收请求。
    - **执行 Runner**：调用所有实现了 `ApplicationRunner` 和 `CommandLineRunner` 接口的 Bean。这是一个非常重要的扩展点，常用于执行应用启动后需要立即运行的一次性任务（如数据初始化、缓存预热等）。
        - `CommandLineRunner`: 接收原始的命令行参数。
        - `ApplicationRunner`: 接收封装好的 `ApplicationArguments` 对象。

至此，启动阶段完成，应用进入运行状态。

---

## 第二阶段：运行阶段 (Running)

这是应用生命周期中最长的阶段。

- **核心状态**：
    - `ApplicationContext` 保持活跃状态。
    - 所有非懒加载的单例 Bean 都已创建并注入完成。
    - 对于 Web 应用，内嵌的 Web 服务器（如 Tomcat）正在运行，监听指定端口，并准备处理 HTTP 请求。
    - `DispatcherServlet` (或 `WebFlux` 的 `HttpHandler`) 将收到的请求分发给相应的 `@Controller` / `@RestController` 中的处理方法。
    - 应用内的定时任务（`@Scheduled`）、消息队列监听器（`@RabbitListener`, `@KafkaListener`）等开始按计划工作。
- **主要活动**：
    - 响应外部请求（HTTP, RPC 等）。
    - 执行业务逻辑。
    - 与数据库、缓存、消息队列等外部系统交互。
    - 生成日志、监控指标等。

---

## 第三阶段：关闭阶段 (Shutdown)

当应用需要终止时，会进入一个有序的、优雅的关闭流程，以确保资源被正确释放，正在处理的任务能尽可能完成。

- **触发方式**：
    1.  **接收到 `SIGINT` 信号**：例如在控制台按下 `Ctrl+C`。
    2.  **通过 Actuator 的 `/shutdown` 端点**（需要显式开启和授权）。
    3.  **程序化关闭**：调用 `SpringApplication.exit()` 或 `ConfigurableApplicationContext.close()`。
    4.  **JVM 关闭钩子 (Shutdown Hook)**：Spring Boot 默认会注册一个 JVM Shutdown Hook，以响应标准的 JVM 关闭事件。

- **核心动作**：
    1.  **发布 `ContextClosedEvent` 事件**：通知所有监听器，应用上下文即将关闭。
    2.  **销毁 Bean**：
    - 调用所有实现了 `DisposableBean` 接口的 Bean 的 `destroy()` 方法。
    - 调用所有用 `@PreDestroy` 注解标记的方法。
    - 这是释放 Bean 所持有的资源（如数据库连接池、线程池、文件句柄等）的关键步骤。
    3.  **关闭内嵌服务器**：优雅地停止 Web 服务器，不再接受新请求，并等待现有请求处理完成（在超时时间内）。
    4.  **关闭 `ApplicationContext`**：清理上下文本身的所有资源。
    5.  **JVM 退出**。

### 生命周期扩展点总结

下表总结了在 Spring Boot 生命周期各个阶段可供开发者使用的主要扩展点：

| 阶段         | 扩展点/钩子                                | 用途说明                                                     |
| ------------ | ------------------------------------------ | ------------------------------------------------------------ |
| **启动阶段** | `ApplicationListener`                      | 监听生命周期事件（如 `ApplicationStartingEvent`, `ApplicationReadyEvent`）并执行自定义逻辑。 |
|              | `ApplicationContextInitializer`            | 在上下文刷新前，以编程方式配置 `ApplicationContext`。        |
|              | `BeanFactoryPostProcessor`                 | 在 Bean 实例化前，修改 Bean 的定义元数据。                 |
|              | `BeanPostProcessor`                        | 在 Bean 实例化和依赖注入后，初始化前后进行干预。             |
|              | `CommandLineRunner` / `ApplicationRunner`  | 应用完全启动后，执行一次性任务，如数据初始化。             |
| **关闭阶段** | `@PreDestroy` 注解                         | 在 Bean 销毁前，执行资源释放逻辑。                           |
|              | `DisposableBean` 接口                      | 功能同 `@PreDestroy`，是其接口形式的替代。                   |
|              | `ContextClosedEvent` 监听器                | 在应用上下文关闭时执行最终清理工作。                         |

---

## 结论

Spring Boot 的生命周期是一个设计精良、层次分明且高度可扩展的流程。通过将整个过程划分为**启动、运行、关闭**三个阶段，并对每个阶段的步骤进行细分，我们可以清晰地看到从代码到可运行服务背后的每一步。掌握这些知识，不仅能帮助我们更好地利用 Spring Boot 的自动配置和扩展机制，还能在遇到复杂问题时，有能力深入到框架内部进行诊断和解决。