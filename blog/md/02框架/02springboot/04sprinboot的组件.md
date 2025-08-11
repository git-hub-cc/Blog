## 一、 核心与开发者工具 (Core & Developer Tools)

这类组件构成了Spring Boot应用的基础，并提供了强大的开发时支持，能显著提升开发效率和体验。

### 1. Spring Boot Actuator
*   **启动器**: `spring-boot-starter-actuator`
*   **简介**: 提供生产级的应用监控和管理功能。通过HTTP端点（Endpoints）或JMX，可以实时查看应用健康状况、度量指标（Metrics）、环境信息、Bean列表、线程快照等。它是构建可观测性（Observability）系统的基石，是微服务运维的必备组件。

### 2. Spring Boot DevTools
*   **启动器**: `spring-boot-devtools`
*   **简介**: 一套专注于提升开发效率的工具集。它能实现应用程序的自动重启（LiveReload），当代码变更时，应用会快速重启以加载新代码。此外，它还集成了LiveReload服务器，支持浏览器端自动刷新，并为Thymeleaf等模板引擎提供了禁用缓存的默认配置。

### 3. Lombok
*   **依赖**: `org.projectlombok:lombok`
*   **简介**: 一个非常流行的Java库，通过注解在编译期自动生成样板代码，如构造函数、Getter/Setter、`toString()`、`equals()`和`hashCode()`等。它能极大简化实体类（Entity）、DTO等数据对象的编写，让代码更整洁、更易读。在Spring Boot项目中被广泛使用。

### 4. Spring Configuration Processor
*   **依赖**: `spring-boot-configuration-processor`
*   **简介**: 该处理器用于生成元数据文件（`spring-configuration-metadata.json`），IDE（如IntelliJ IDEA, VS Code）可以利用这些元数据，为`application.properties`或`application.yml`文件中的自定义配置项提供智能提示和自动补全功能，极大提升了配置文件的编写体验。

### 5. Spring Boot Starter Validation
*   **启动器**: `spring-boot-starter-validation`
*   **简介**: 提供对Java Bean Validation API（JSR-380）的支持，并默认集成了Hibernate Validator作为实现。通过在DTO或实体类的字段上添加`@NotNull`, `@Size`, `@Email`等注解，可以在Controller层自动对请求参数进行校验，简化了数据验证逻辑。

---

## 二、 Web开发 (Web Development)

Spring Boot在Web开发领域提供了强大的支持，无论是传统的服务端渲染还是现代的RESTful API和响应式编程。

### 1. Spring Web (MVC)
*   **启动器**: `spring-boot-starter-web`
*   **简介**: 构建Web应用（包括RESTful API）的核心启动器。它集成了Spring MVC框架，并默认内嵌了Tomcat作为Servlet容器，让Web应用的开发和部署变得极其简单。它还包含了数据绑定、类型转换、JSON序列化（默认使用Jackson）等构建Web服务所需的全套功能。

### 2. Spring WebFlux
*   **启动器**: `spring-boot-starter-webflux`
*   **简介**: 用于构建完全异步、非阻塞的响应式Web应用。它基于Project Reactor，提供了函数式编程模型和传统的基于注解的控制器模型。默认使用Netty作为嵌入式服务器，适用于高并发、低延迟的场景，是构建响应式微服务系统的首选。

### 3. Jersey (JAX-RS)
*   **启动器**: `spring-boot-starter-jersey`
*   **简介**: 如果你倾向于使用JAX-RS（Java API for RESTful Web Services）标准来开发REST服务，可以使用此启动器。它集成了Jersey框架作为JAX-RS的实现，替代了Spring Boot默认的Spring MVC，让你可以在Spring环境中使用标准的JAX-RS注解和API。

### 4. Spring HATEOAS
*   **启动器**: `spring-boot-starter-hateoas`
*   **简介**: 帮助你轻松实现HATEOAS（Hypermedia as the Engine of Application State）原则的REST服务。它提供了一套API，用于创建包含链接（Links）的资源表示模型，使客户端可以根据服务端返回的链接来发现和导航API，增强了服务的自描述性和演进能力。

### 5. WebSocket
*   **启动器**: `spring-boot-starter-websocket`
*   **简介**: 为Spring Boot应用添加WebSocket支持，用于构建需要实时、双向通信的应用，例如在线聊天、实时数据推送、在线协作工具等。它提供了高级的STOMP（Simple Text Oriented Messaging Protocol）协议支持，简化了客户端与服务端的消息处理。

### 6. RSocket
*   **启动器**: `spring-boot-starter-rsocket`
*   **简介**: 集成RSocket协议，这是一种面向字节流的、异步的、多路复用的二进制协议。它支持多种交互模型（如请求/响应、请求/流、即发即忘），适用于需要高性能、跨网络通信的微服务场景，是对传统HTTP/REST的一种现代补充或替代。

### 7. GraphQL
*   **启动器**: `spring-boot-starter-graphql`
*   **简介**: 提供对GraphQL的全面支持，允许你构建GraphQL API。客户端可以精确地请求所需的数据，避免了REST中常见的数据冗余（over-fetching）或数据不足（under-fetching）问题。该启动器集成了GraphQL Java引擎，并与Spring Web/WebFlux无缝协作。

### 8. Web Services (SOAP)
*   **启动器**: `spring-boot-starter-web-services`
*   **简介**: 主要用于支持基于SOAP协议的Web服务开发，它集成了Spring Web Services项目。如果你需要与遗留系统交互或在企业环境中提供符合WSDL（Web Services Description Language）规范的SOAP服务，这个启动器提供了便捷的契约优先（contract-first）开发模式。

---

## 三、 模板引擎 (Template Engines)

用于服务端渲染动态HTML页面，适用于构建传统的MVC网站。

### 1. Thymeleaf
*   **启动器**: `spring-boot-starter-thymeleaf`
*   **简介**: Spring Boot官方推荐的现代服务端Java模板引擎。其最大的特点是“自然模板”，即模板文件可以直接在浏览器中打开并正确显示，便于UI/UX设计师独立工作。它与Spring MVC集成良好，提供了丰富的方言（Dialects）来展示动态数据和处理表单。

### 2. FreeMarker
*   **启动器**: `spring-boot-starter-freemarker`
*   **简介**: 一款成熟且功能强大的Java模板引擎。它拥有自己的模板语言（FTL），支持宏、函数以及复杂的逻辑处理。在很多历史悠久或对模板功能要求较高的项目中仍然非常流行。Spring Boot为其提供了完善的自动配置，使用起来非常方便。

### 3. Mustache
*   **启动器**: `spring-boot-starter-mustache`
*   **简介**: 一种“逻辑无关”的模板引擎，意味着模板中几乎不包含任何业务逻辑，强制实现了视图和逻辑的分离。它的语法极其简单，并且在多种编程语言中都有实现，适合需要跨技术栈共享模板的场景。Spring Boot集成了JMustache作为其实现。

### 4. Groovy Templates
*   **启动器**: `spring-boot-starter-groovy-templates`
*   **简介**: 利用Groovy语言本身作为模板引擎。它提供了类似JSP/GSP的语法，支持在模板中嵌入Groovy代码，灵活性非常高。对于熟悉Groovy的开发者来说，这是一种自然且强大的选择。Spring Boot为其提供了视图解析器和模板加载的自动配置。

---

## 四、 数据访问 - SQL

Spring Boot为关系型数据库的访问提供了无与伦比的支持，涵盖了从底层JDBC到高级ORM框架的方方面面。

### 1. JDBC API
*   **启动器**: `spring-boot-starter-jdbc`
*   **简介**: 提供了使用原生JDBC进行数据库操作的基础支持。它自动配置了`DataSource`（数据源）和`JdbcTemplate`。`JdbcTemplate`是Spring对JDBC的经典封装，它简化了资源管理（如连接的打开与关闭）、异常处理，让开发者能更专注于SQL本身。

### 2. Spring Data JPA
*   **启动器**: `spring-boot-starter-data-jpa`
*   **简介**: 提供了基于JPA（Java Persistence API）规范的对象关系映射（ORM）支持，是Java世界中最主流的数据持久化方案。它默认使用Hibernate作为JPA实现，通过`Repository`接口，开发者只需定义方法名就能自动生成SQL查询，极大地简化了数据访问层的开发。

### 3. Spring Data JDBC
*   **启动器**: `spring-boot-starter-data-jdbc`
*   **简介**: Spring Data家族的一员，它提供了一种比JPA更简单、更贴近SQL的持久化方案。它不提供缓存、懒加载等复杂的ORM特性，而是专注于将领域实体与数据库表进行直接映射。它旨在保持ORM的便利性，同时让开发者对SQL有更强的控制力。

### 4. jOOQ
*   **启动器**: `spring-boot-starter-jooq`
*   **简介**: 一款强大的数据库映射和SQL构建工具。它能根据数据库Schema生成Java类，让你可以在Java中以类型安全的方式编写SQL查询，避免了拼接字符串带来的语法错误和SQL注入风险。对于需要编写大量复杂、动态SQL的场景，jOOQ是一个绝佳选择。

### 5. MyBatis
*   **启动器**: `mybatis-spring-boot-starter` (由MyBatis社区维护)
*   **简介**: 一款非常流行的半自动ORM框架。它将Java方法与SQL语句直接映射在XML文件或注解中，让开发者可以完全掌控SQL，同时又免去了手动处理JDBC的繁琐细节。因其灵活性和对复杂SQL的良好支持，在中国及许多亚洲国家有着广泛的应用。

### 6. 数据库驱动与连接池 (Embedded)

Spring Boot不仅支持外部数据库，还内置了对多种数据库驱动和连接池的管理。

#### 数据库驱动

*   **H2 Database**: `com.h2database:h2`，一个轻量级的内存/文件型Java数据库，常用于开发、测试和快速原型验证。
*   **HSQLDB**: `org.hsqldb:hsqldb`，另一个流行的嵌入式Java数据库，功能与H2类似。
*   **Apache Derby**: `org.apache.derby:derby`，由Apache软件基金会支持的纯Java关系数据库。
*   **MySQL**: `mysql:mysql-connector-java` 或 `com.mysql:mysql-connector-j`，连接MySQL数据库的官方JDBC驱动。
*   **PostgreSQL**: `org.postgresql:postgresql`，连接PostgreSQL数据库的官方JDBC驱动。
*   **Microsoft SQL Server**: `com.microsoft.sqlserver:mssql-jdbc`，微软官方提供的用于连接SQL Server的JDBC驱动。
*   **Oracle**: `com.oracle.database.jdbc:ojdbc*`，连接Oracle数据库的驱动。通常需要手动配置或从Oracle仓库获取。

#### 数据库连接池

*   **HikariCP**: Spring Boot 2.0及以后版本的默认连接池。以其高性能、高可靠性和轻量级而著称，是生产环境的首选。
*   **Tomcat JDBC Pool**: 在Spring Boot 2.0之前是默认连接池，依然是一个稳定可靠的选择。
*   **Commons DBCP2**: Apache Commons项目提供的连接池，也是一个历史悠久且广泛使用的选项。

### 7. 数据库迁移工具 (Database Migration)

*   **Flyway**: `org.flywaydb:flyway-core`，一个流行的数据库迁移工具。它通过版本化的SQL脚本来管理数据库Schema的演进，支持自动化、可重复的数据库变更。Spring Boot检测到Flyway在classpath上时会自动执行迁移。
*   **Liquibase**: `org.liquibase:liquibase-core`，另一个功能强大的数据库迁移工具。与Flyway不同，它支持使用XML、YAML、JSON或SQL等多种格式来定义数据库变更集（Changesets），并提供了更丰富的重构和回滚功能。


## 五、 数据访问 - NoSQL (Data Access - NoSQL)

Spring Boot对NoSQL数据库的支持同样非常出色，通过Spring Data项目提供了统一的编程模型，让开发者能够以相似的方式操作不同类型的NoSQL数据库。

### 1. Redis
*   **启动器**: `spring-boot-starter-data-redis`
*   **简介**: 集成Redis，一个高性能的内存键值数据库。常被用作缓存、分布式锁、会话存储和简单的消息代理。Spring Boot自动配置了连接工厂（支持Jedis和Lettuce客户端，Lettuce为默认），并提供了`RedisTemplate`和`StringRedisTemplate`用于方便地操作各种数据结构（String, Hash, List, Set, ZSet）。

### 2. MongoDB
*   **启动器**: `spring-boot-starter-data-mongodb`
*   **简介**: 集成MongoDB，一个领先的面向文档的NoSQL数据库。它以类JSON的BSON格式存储数据，具有灵活的模式和强大的查询能力，非常适合内容管理、物联网和大数据等场景。Spring Boot提供了`MongoTemplate`进行复杂操作，并支持通过Spring Data Repositories进行便捷的CRUD。

### 3. Cassandra
*   **启动器**: `spring-boot-starter-data-cassandra`
*   **简介**: 集成Apache Cassandra，一个高度可扩展、高可用的分布式宽列存储数据库。它为大规模数据集提供了无单点故障的线性扩展能力，适用于需要处理海量写入和高可用性要求的场景。Spring Boot自动配置了`CqlSession`和`CqlTemplate`，并支持响应式API。

### 4. Couchbase
*   **启动器**: `spring-boot-starter-data-couchbase`
*   **简介**: 集成Couchbase，一个分布式的多模型NoSQL数据库，结合了键值存储的速度和文档数据库的灵活性。它提供了强大的N1QL（发音为"nickel"）查询语言，类似于SQL，并内置了缓存层和全文搜索功能。Spring Boot为Couchbase提供了全面的自动配置支持。

### 5. Neo4j
*   **启动器**: `spring-boot-starter-data-neo4j`
*   **简介**: 集成Neo4j，一个原生的图数据库。它专门用于存储、查询和管理实体及其之间的复杂关系，是构建社交网络、推荐引擎、欺诈检测和知识图谱等应用的理想选择。Spring Boot通过Spring Data Neo4j，让开发者能以面向对象的方式操作图数据。

### 6. In-Memory Data Grids
*   **Apache Ignite**: `ignite-spring-boot-starter` (由Ignite社区维护)
    *   **简介**: 集成Apache Ignite，一个内存计算平台。它不仅仅是数据网格，还提供了分布式数据库、缓存和处理能力，支持SQL查询和键值操作。它旨在通过在内存中处理数据和计算来大幅提升应用性能。
*   **Hazelcast**: `hazelcast-spring-boot-starter`
    *   **简介**: 集成Hazelcast IMDG（In-Memory Data Grid），一个提供分布式数据结构和计算能力的开源平台。你可以用它来创建分布式Map、Queue、Topic等，常用于分布式缓存、集群和微服务间的数据共享。

---

## 六、 搜索技术 (Search Technologies)

对于需要强大全文搜索能力的应用，Spring Boot集成了主流的搜索引擎。

### 1. Elasticsearch
*   **启动器**: `spring-boot-starter-data-elasticsearch`
*   **简介**: 集成Elasticsearch，一个基于Apache Lucene的分布式搜索和分析引擎。它能提供近乎实时的搜索、聚合和分析功能，广泛用于全文搜索、日志分析（ELK Stack）、应用性能监控（APM）等领域。Spring Boot为其配置了客户端，并提供`ElasticsearchRestTemplate`和Repository支持。

### 2. Apache Solr
*   **启动器**: `spring-boot-starter-data-solr`
*   **简介**: 集成Apache Solr，另一个成熟的、功能丰富的开源搜索平台，同样基于Lucene。它提供了强大的全文搜索、分面搜索、动态集群等功能。虽然近年来Elasticsearch在微服务生态中更受关注，但Solr依然是企业级搜索的有力选择。Spring Boot为其提供了`SolrTemplate`和自动配置。

---

## 七、 消息队列与集成 (Messaging & Integration)

构建异步、解耦和弹性的系统离不开消息中间件。Spring Boot简化了与主流消息系统的集成。

### 1. RabbitMQ (AMQP)
*   **启动器**: `spring-boot-starter-amqp`
*   **简介**: 集成RabbitMQ，一个实现了AMQP（高级消息队列协议）的强大消息代理。它支持多种消息模式（如点对点、发布/订阅、路由），并以其可靠性和灵活性著称。Spring Boot自动配置了`RabbitTemplate`用于发送消息，以及`@RabbitListener`注解用于声明式地消费消息。

### 2. Apache Kafka
*   **启动器**: `spring-boot-starter-kafka` (通常依赖`spring-kafka`)
*   **简介**: 集成Apache Kafka，一个分布式事件流平台。它不仅仅是消息队列，更是为处理实时数据流而设计的，具有极高的吞吐量、持久性和可扩展性。常用于日志聚合、事件溯源和流处理。Spring Boot提供了`KafkaTemplate`和`@KafkaListener`简化了与Kafka的交互。

### 3. JMS (Java Message Service)
*   **启动器**: `spring-boot-starter-activemq` (用于ActiveMQ "Classic")
*   **简介**: 为Java消息服务（JMS）API提供支持，这是Java EE中定义的消息传递标准。`spring-boot-starter-activemq`默认集成了Apache ActiveMQ "Classic"作为消息代理。Spring Boot会自动配置`JmsTemplate`和连接工厂，使得遵循JMS标准的消息收发变得简单。
*   **启动器**: `spring-boot-starter-artemis` (用于ActiveMQ Artemis)
*   **简介**: 集成ActiveMQ Artemis，这是Apache的下一代高性能异步消息代理。它支持JMS 2.0以及AMQP、MQTT等多种协议，拥有非阻塞的核心架构。对于追求更高性能和现代特性的新项目，Artemis是一个优秀的选择。

### 4. Spring Integration
*   **启动器**: `spring-boot-starter-integration`
*   **简介**: 集成Spring Integration框架，它实现了经典的“企业集成模式”（EIP）。该框架提供了一套轻量级的消息驱动架构，通过各种适配器（Adapter）、通道（Channel）、转换器（Transformer）等组件，可以轻松地将异构系统连接起来，非常适合构建复杂的数据管道和集成流程。

---

## 八、 安全 (Security)

安全是任何生产级应用不可或缺的一部分。Spring Boot通过Spring Security提供了全面且可扩展的安全解决方案。

### 1. Spring Security
*   **启动器**: `spring-boot-starter-security`
*   **简介**: 这是为Spring应用添加认证（Authentication）和授权（Authorization）支持的核心启动器。一旦引入，它会默认启用HTTP Basic认证并保护所有端点。它高度可配置，支持表单登录、OAuth2、JWT、LDAP等多种安全机制，是保护Web应用和API的首选。

### 2. OAuth2 Client
*   **启动器**: `spring-boot-starter-oauth2-client`
*   **简介**: 让你的应用能够作为一个OAuth2/OpenID Connect 1.0 (OIDC)客户端。这主要用于实现第三方登录功能，例如“使用Google/GitHub/Okta登录”。它封装了所有繁琐的重定向和令牌交换流程，让开发者可以轻松地集成外部身份提供商。

### 3. OAuth2 Resource Server
*   **启动器**: `spring-boot-starter-oauth2-resource-server`
*   **简介**: 将你的应用配置为一个OAuth2资源服务器。其核心职责是保护API端点，要求客户端在请求时必须提供一个有效的访问令牌（Access Token）。它支持对不透明令牌（Opaque Tokens）的内省和对JWT（JSON Web Tokens）的本地校验，是构建受保护微服务的关键。

### 4. LDAP
*   **启动器**: `spring-boot-starter-data-ldap`
*   **简介**: 提供与LDAP（轻量级目录访问协议）服务器的集成。这在企业环境中非常常见，用于将应用的认证和用户管理委托给中央目录服务，如Microsoft Active Directory或OpenLDAP。Spring Boot可以自动配置LDAP认证和`LdapTemplate`。

### 5. SAML 2.0
*   **依赖**: `spring-security-saml2-service-provider`
*   **简介**: Spring Security 提供了对 SAML 2.0 的支持，允许你的应用作为一个服务提供商（SP）与身份提供商（IdP）进行集成，实现企业级的单点登录（SSO）。虽然没有专门的`starter`，但与Spring Boot的集成非常顺畅，配置后即可实现企业联合身份认证。

## 九、 云原生与微服务 (Cloud Native & Microservices)

Spring Boot诞生于云时代，对云原生架构和微服务模式提供了顶级的支持，这主要通过Spring Cloud项目族实现。

### 1. Spring Cloud Config
*   **启动器**: `spring-cloud-starter-config` (客户端)
*   **简介**: 提供分布式应用的外部化配置支持。Config Server是一个独立的微服务，用于集中管理所有环境的配置文件（通常存储在Git、SVN或本地文件系统）。客户端应用在启动时会从Config Server拉取自己的配置，从而实现配置与代码的分离、动态刷新和统一管理。

### 2. Spring Cloud Gateway
*   **启动器**: `spring-cloud-starter-gateway`
*   **简介**: 一个基于Spring WebFlux和Project Reactor构建的API网关。作为微服务架构的入口，它负责请求路由、负载均衡、安全认证、限流熔断和监控日志等横切关注点。它采用响应式编程模型，性能高、扩展性强，是现代微服务体系中的关键组件。

### 3. Spring Cloud OpenFeign
*   **启动器**: `spring-cloud-starter-openfeign`
*   **简介**: 一个声明式的REST客户端。它让微服务间的调用变得像调用本地方法一样简单。你只需创建一个Java接口，并使用注解（如`@FeignClient`和`@RequestMapping`）来定义HTTP请求的模板。Feign会自动为你生成实现类，并集成了服务发现和负载均衡能力。

### 4. 服务发现 (Service Discovery)
*   **Eureka**: `spring-cloud-starter-netflix-eureka-client`
    *   **简介**: 集成Netflix Eureka，一个REST风格的服务注册与发现组件。服务实例在启动时将自己注册到Eureka Server，客户端可以通过服务名（而不是硬编码的IP和端口）来发现和调用服务。Eureka Server本身也可以高可用部署，是经典的微服务注册中心之一。
*   **Consul**: `spring-cloud-starter-consul-discovery`
    *   **简介**: 集成HashiCorp Consul，一个功能更全面的服务网格解决方案，包含了服务发现、健康检查、键值存储和多数据中心支持。Spring Cloud提供了与Consul的无缝集成，使其可以作为Eureka的替代品。
*   **Zookeeper**: `spring-cloud-starter-zookeeper-discovery`
    *   **简介**: 集成Apache Zookeeper，一个高可用的分布式协调服务。除了服务发现，Zookeeper也常用于分布式锁、配置管理等场景。Spring Cloud利用其临时节点特性来实现服务的注册与发现。

### 5. 熔断器 (Circuit Breaker)
*   **Resilience4j**: `spring-cloud-starter-circuitbreaker-resilience4j`
    *   **简介**: 集成Resilience4j，一个轻量级、功能强大的容错库。它提供了熔断、限流、重试、隔板等多种弹性模式。当某个下游服务出现故障时，熔断器可以快速失败，防止故障蔓延（雪崩效应），从而保护整个系统的稳定性。这是目前Spring Cloud推荐的熔断器实现。

### 6. 分布式追踪 (Distributed Tracing)
*   **Spring Cloud Sleuth (已进入维护模式，推荐Micrometer Tracing)**
    *   **启动器**: `spring-cloud-starter-sleuth`
    *   **简介**: 为Spring Cloud应用添加分布式追踪能力。它会自动在服务调用链中传播Trace ID和Span ID，使得你可以追踪一个请求在多个微服务之间的完整路径。通常与Zipkin或Jaeger等追踪系统后端配合使用，用于性能分析和故障排查。
*   **Micrometer Tracing**: `io.micrometer:micrometer-tracing-bridge-*`
    *   **简介**: 作为Sleuth的继任者，Micrometer Tracing提供了一个厂商中立的分布式追踪API，并能桥接到OpenTelemetry或Brave (Zipkin)等具体实现。这是Spring Boot 3.x及以后版本推荐的追踪方案，提供了更现代和标准化的方式来集成追踪系统。

---

## 十、 批处理 (Batch Processing)

对于需要处理大量数据、可离线运行的定时任务，Spring Boot提供了强大的批处理支持。

### 1. Spring Batch
*   **启动器**: `spring-boot-starter-batch`
*   **简介**: 集成Spring Batch框架，一个专为健壮、可扩展的批处理应用而设计的轻量级框架。它提供了可重用、可扩展的读（Reader）、处理（Processor）、写（Writer）组件，以及任务调度、事务管理、失败重试、跳过和重启等高级功能。非常适合ETL、数据迁移、报表生成等场景。

---

## 十一、 缓存 (Caching)

通过缓存可以显著提升应用性能，Spring Boot对此提供了抽象和多种实现支持。

### 1. Caching Abstraction
*   **启动器**: `spring-boot-starter-cache`
*   **简介**: 提供了一套缓存抽象API，通过`@Cacheable`, `@CachePut`, `@CacheEvict`等注解，可以声明式地为方法添加缓存逻辑，而无需关心底层的缓存实现。这使得应用代码与具体的缓存技术解耦，可以轻松切换不同的缓存提供商。

### 2. 缓存实现 (Cache Providers)

Spring Boot检测到classpath中存在以下缓存库时，会自动配置相应的`CacheManager`。

*   **Caffeine**: `com.github.ben-manes.caffeine:caffeine`，一个高性能的Java 8本地（进程内）缓存库，是目前Spring Boot推荐的默认本地缓存实现。
*   **EhCache**: `org.ehcache:ehcache`，一个广泛使用的、功能丰富的Java本地缓存库，支持堆内、堆外和磁盘存储。
*   **JCache (JSR-107)**: `javax.cache:cache-api`，Java缓存的官方标准。如果classpath中有实现了JSR-107的缓存库（如EhCache 3, Hazelcast），Spring Boot会自动配置它。
*   **Infinispan**: `org.infinispan:infinispan-spring-boot-starter-cache`，Infinispan是一个开源的分布式内存数据网格/键值NoSQL数据存储，也提供了强大的缓存功能。
*   **Redis**: 使用`spring-boot-starter-data-redis`时，Redis也可以作为Spring缓存抽象的后端实现，从而实现分布式缓存。
*   **Hazelcast**: 使用`hazelcast-spring-boot-starter`时，Hazelcast也可以配置为分布式缓存的提供者。

---

## 十二、 测试 (Testing)

Spring Boot极大地简化了单元测试和集成测试的编写。

### 1. Spring Boot Test
*   **启动器**: `spring-boot-starter-test`
*   **简介**: 这是进行Spring Boot应用测试的核心依赖。它聚合了多个强大的测试库，包括：
    *   **JUnit 5**: Java世界中最主流的测试框架。
    *   **Spring Test & Spring Boot Test**: 提供了`@SpringBootTest`, `@WebMvcTest`等注解，用于加载Spring上下文进行集成测试。
    *   **AssertJ**: 一个流式断言库，提供了比标准JUnit断言更丰富、更易读的API。
    *   **Hamcrest**: 一个用于编写匹配器（Matcher）对象的框架。
    *   **Mockito**: 最流行的Java Mocking框架，用于创建和配置模拟对象。
    *   **JsonPath / XmlUnit**: 用于测试JSON和XML响应的工具库。

### 2. Testcontainers
*   **依赖**: `org.testcontainers:*`
*   **简介**: 一个革命性的Java测试库，它允许你在JUnit测试中以编程方式启动和管理Docker容器。这意味着你可以为测试动态创建真实的数据库（如PostgreSQL, MySQL）、消息队列（如Kafka, RabbitMQ）或其他任何可以在Docker中运行的服务。Spring Boot 3.1+ 提供了对Testcontainers的深度集成，可以自动管理容器生命周期。

---

## 十三、 其他集成 (Miscellaneous Integrations)

### 1. Mail
*   **启动器**: `spring-boot-starter-mail`
*   **简介**: 集成JavaMail API，用于发送电子邮件。通过在`application.properties`中配置SMTP服务器信息，Spring Boot会自动创建一个`JavaMailSender` Bean，你可以直接注入并使用它来发送简单文本邮件或带附件的复杂HTML邮件。

### 2. Quartz Scheduler
*   **启动器**: `spring-boot-starter-quartz`
*   **简介**: 集成Quartz，一个功能强大的企业级开源作业调度框架。与Spring自带的`@Scheduled`相比，Quartz提供了更高级的功能，如持久化任务（即使应用重启也不会丢失）、集群调度和更灵活的触发器配置（Cron表达式、简单触发器等）。

### 3. AOP (Aspect-Oriented Programming)
*   **启动器**: `spring-boot-starter-aop`
*   **简介**: 提供对面向切面编程的支持，底层依赖于AspectJ。通过AOP，你可以将横切关注点（如日志记录、事务管理、安全检查）从业务逻辑代码中分离出来，定义成独立的“切面”（Aspect），从而提高代码的模块化程度和可维护性。


## 十四、 可观测性 (Observability)

可观测性是现代云原生应用运维的核心，它由三大支柱构成：度量（Metrics）、追踪（Tracing）和日志（Logging）。Spring Boot Actuator是基础，而以下组件则提供了具体的实现和集成。

### 1. Micrometer (Metrics)
*   **核心依赖**: `io.micrometer:micrometer-core` (由`spring-boot-starter-actuator`自动引入)
*   **简介**: 一个厂商中立的应用度量（Metrics）门面（Facade），可以理解为度量领域的SLF4J。它允许你的应用代码使用统一的API来记录度量指标（如计数器、计时器、仪表），然后可以无缝地将这些指标导出到多种监控系统。Spring Boot深度集成了Micrometer，使其成为度量收集的标准。

### 2. Prometheus (Metrics Backend)
*   **依赖**: `io.micrometer:micrometer-registry-prometheus`
*   **简介**: Prometheus是一个开源的监控和告警系统，已成为云原生监控的事实标准。当引入此依赖后，Spring Boot Actuator会自动暴露一个`/actuator/prometheus`端点，该端点提供符合Prometheus格式的度量数据。Prometheus服务器可以定期抓取这个端点的数据，用于存储、查询（使用PromQL）和告警。

### 3. Zipkin / Jaeger (Tracing Backend)
*   **依赖**: `io.micrometer:micrometer-tracing-bridge-brave` (for Zipkin), `io.micrometer:micrometer-tracing-bridge-otel` (for Jaeger via OpenTelemetry)
*   **简介**: 分布式追踪系统后端。当你的微服务通过Micrometer Tracing（或旧版的Spring Cloud Sleuth）生成了追踪数据后，需要将这些数据发送到一个后端进行聚合、存储和可视化。Zipkin和Jaeger就是两个最流行的开源选择。它们可以展示请求的完整调用链、服务拓扑和各个环节的耗时，是排查分布式系统延迟和错误的利器。

### 4. Logging Frameworks
*   **启动器**: `spring-boot-starter-logging` (默认包含在`spring-boot-starter`等核心启动器中)
*   **简介**: Spring Boot提供了一套统一的日志抽象，默认使用SLF4J作为门面，Logback作为实现。开发者无需任何配置即可获得结构化的、彩色的控制台日志输出。通过`application.properties`文件，可以轻松地配置日志级别（如`logging.level.com.example=DEBUG`）、日志文件输出以及日志分组，极大地简化了日志管理。

---

## 十五、 响应式编程栈 (Reactive Stack)

除了`spring-boot-starter-webflux`，构建一个完整的响应式应用还需要响应式数据访问和底层库的支持。

### 1. Project Reactor
*   **核心依赖**: `io.projectreactor:reactor-core` (由`spring-boot-starter-webflux`等响应式启动器引入)
*   **简介**: 这是Spring响应式编程栈的基石。Project Reactor是一个实现了Reactive Streams规范的Java库，提供了两种核心的发布者类型：`Mono`（代表0或1个元素）和`Flux`（代表0到N个元素）。它提供了一套极其丰富的操作符（类似Java Stream API），用于以声明式、非阻塞的方式处理异步数据流。

### 2. R2DBC (Reactive Relational Database Connectivity)
*   **启动器**: `spring-boot-starter-data-r2dbc`
*   **简介**: R2DBC定义了一套用于异步、非阻塞地访问关系型数据库的API规范，是JDBC的响应式替代品。当你构建一个完全响应式的应用（如使用WebFlux）时，为了避免在数据访问层阻塞线程，就应该使用R2DBC。Spring Boot为其提供了自动配置，并支持通过Spring Data R2DBC进行便捷的数据库操作。

### 3. 响应式NoSQL驱动
*   **简介**: 许多现代NoSQL数据库的Java驱动本身就是响应式的，或提供了响应式的API。例如，`spring-boot-starter-data-mongodb-reactive`, `spring-boot-starter-data-redis-reactive`, `spring-boot-starter-data-cassandra-reactive` 等启动器就是专门为这些数据库的响应式操作而设计的，它们与Project Reactor无缝集成。

---

## 十六、 其他RPC与API协议

虽然REST over HTTP是主流，但在特定场景下，其他协议可能更具优势。

### 1. gRPC
*   **启动器**: `grpc-spring-boot-starter` (由社区`yidongnan/grpc-spring-boot-starter`维护)
*   **简介**: gRPC是Google开发的一个高性能、开源的通用RPC框架。它使用HTTP/2作为传输协议，并使用Protocol Buffers作为接口定义语言和序列化格式，具有高效、跨语言、支持流式传输等优点。这个社区维护的启动器极大地简化了在Spring Boot中创建和消费gRPC服务的过程。

### 2. Apache Avro / Thrift
*   **简介**: 除了gRPC的Protocol Buffers，Apache Avro和Thrift也是流行的RPC和数据序列化框架，尤其在Hadoop等大数据生态中非常常见。虽然Spring Boot没有为它们提供官方的启动器，但通过Spring的自定义配置，可以很容易地将它们集成到应用中，通常与Kafka或自定义的RPC服务结合使用。

---

## 十七、 应用功能与工具 (Application Features & Utilities)

这些是Spring框架自身提供，但由Spring Boot极大简化了配置和使用的核心功能。

### 1. 异步方法执行 (@Async)
*   **注解**: `@EnableAsync`
*   **简介**: Spring Boot允许你通过简单的`@Async`注解，让一个方法在后台线程池中异步执行。这对于执行耗时但不需要立即返回结果的任务（如发送通知邮件、生成报表）非常有用，可以避免阻塞主线程，提升应用的响应性。Spring Boot会自动配置一个合适的`TaskExecutor`线程池。

### 2. 任务调度 (@Scheduled)
*   **注解**: `@EnableScheduling` (默认情况下，如果找到`@Scheduled`注解，Spring Boot会自动启用)
*   **简介**: Spring Boot提供了对定时任务的轻量级支持。只需在一个方法上添加`@Scheduled`注解，并指定cron表达式、固定速率（fixedRate）或固定延迟（fixedDelay），该方法就会被自动地周期性调用。这对于执行简单的定时清理、数据同步等任务非常方便，无需引入Quartz等重型框架。

### 3. 国际化 (i18n)
*   **自动配置支持**: `MessageSource`
*   **简介**: Spring Boot遵循Spring框架的国际化支持。默认情况下，它会自动配置一个`MessageSource` Bean，该Bean会从classpath根目录下的`messages.properties`文件中加载消息。通过创建不同语言环境的变体文件（如`messages_de.properties`, `messages_zh_CN.properties`），可以轻松实现应用文本内容的多语言切换。

### 4. 序列化格式支持
*   **JSON (Jackson & Gson)**: `spring-boot-starter-json` (默认由`starter-web`引入)
    *   **简介**: Spring Boot默认使用Jackson进行JSON的序列化和反序列化。它提供了强大的功能和灵活的定制选项。如果想换用Google的Gson，只需在依赖中排除Jackson并引入Gson即可，Spring Boot会自动切换。
*   **XML (JAXB)**: `jakarta.xml.bind:jakarta.xml.bind-api`
    *   **简介**: 对于需要处理XML数据的场景（如SOAP Web服务或旧系统集成），Spring Boot支持使用JAXB（Java Architecture for XML Binding）进行对象和XML之间的映射。引入相应依赖后，Spring MVC可以自动处理XML格式的请求和响应。

### 5. 容器化支持 (Containerization Support)
*   **特性**: Layered JARs & Cloud Native Buildpacks
*   **简介**: Spring Boot为将应用打包成高效的Docker镜像提供了专门支持。它能生成“分层JAR”，将不常变化的依赖库和常变的业务代码分到不同层，从而大幅提升Docker镜像的构建和推送效率。此外，通过Buildpacks插件（`spring-boot-maven-plugin`的`build-image`目标），开发者甚至无需编写Dockerfile就能构建出优化过的、生产级的容器镜像。



## 十八、 Web服务器 (Web Servers)

Spring Boot Web启动器默认内嵌了Web服务器，使得应用可以打包成一个自包含的、可执行的JAR文件。开发者可以根据需要轻松切换不同的服务器实现。

### 1. Tomcat (默认)
*   **启动器**: `spring-boot-starter-web` (默认包含`spring-boot-starter-tomcat`)
*   **简介**: Apache Tomcat是Java Servlet和JSP规范的最知名的开源实现，也是Spring Boot `starter-web`的默认内嵌服务器。它成熟、稳定、功能全面，拥有庞大的社区和丰富的文档，是绝大多数传统Web应用和REST API的可靠选择。

### 2. Jetty
*   **启动器**: `spring-boot-starter-jetty`
*   **简介**: Eclipse Jetty是一个轻量级、高性能的HTTP服务器和Servlet容器。与Tomcat相比，它的架构更为模块化，内存占用通常更小。如果你的应用对启动速度和资源消耗有更高的要求，Jetty是一个非常好的替代方案。要使用它，只需在`starter-web`中排除Tomcat并添加此启动器即可。

### 3. Undertow
*   **启动器**: `spring-boot-starter-undertow`
*   **简介**: Undertow是来自JBoss/Red Hat的高性能Web服务器。它完全由Java编写，支持HTTP/2，并提供了阻塞和非阻塞（NIO）两种API。Undertow以其极高的性能和灵活性而闻名，特别是在处理大量短连接时表现出色。同样，通过替换依赖即可轻松集成。

### 4. Netty (用于WebFlux)
*   **启动器**: `spring-boot-starter-webflux` (默认包含)
*   **简介**: Netty是一个基于NIO的客户端-服务器端框架，用于快速开发可维护的高性能网络应用。它不是一个传统的Servlet容器，而是响应式编程栈`WebFlux`的默认服务器。它为Spring WebFlux提供了底层的事件驱动、非阻塞I/O能力，是构建高并发响应式系统的基石。

---

## 十九、 UI框架集成 (UI Framework Integration)

除了服务端模板引擎，Spring Boot也良好地支持了集成一些Java后端UI框架。

### 1. Vaadin
*   **启动器**: `com.vaadin:vaadin-spring-boot-starter`
*   **简介**: Vaadin是一个独特的Java Web框架，它允许开发者完全使用Java语言来构建现代、动态的Web用户界面，而无需编写HTML、CSS或JavaScript。它提供了一套丰富的UI组件，并通过启动器与Spring Boot深度集成，使得依赖注入、路由管理和安全集成变得非常简单，极大地提升了全栈Java开发的效率。

---

## 二十、 云服务商特定集成 (Cloud Provider Specific Integrations)

Spring Cloud项目为各大主流云服务商提供了专门的启动器，极大地简化了应用与云平台原生服务的集成。

### 1. Amazon Web Services (AWS)
*   **项目**: Spring Cloud AWS
*   **启动器**: `io.awspring.cloud:spring-cloud-aws-starter-*` (例如: `...-s3`, `...-sqs`)
*   **简介**: Spring Cloud AWS旨在简化Spring应用与AWS服务的集成。它为多种AWS服务（如S3对象存储、SQS消息队列、SNS通知服务、Parameter Store配置管理等）提供了自动配置。开发者无需手动配置AWS SDK客户端和凭证，只需通过Spring的注解和标准接口即可与云服务交互。

### 2. Microsoft Azure
*   **项目**: Spring Cloud Azure
*   **启动器**: `com.azure.spring:spring-cloud-azure-starter-*` (例如: `...-servicebus`, `...-storage-blob`)
*   **简介**: 该项目为Spring Boot应用接入Microsoft Azure生态系统提供了全面的支持。它涵盖了身份认证、配置管理（App Configuration）、消息服务（Service Bus, Event Hubs）、存储（Blob Storage）、数据库（Cosmos DB）等关键服务。通过这些启动器，可以轻松地将Azure服务作为应用的后端。

### 3. Google Cloud Platform (GCP)
*   **项目**: Spring Cloud GCP
*   **启动器**: `com.google.cloud:spring-cloud-gcp-starter-*` (例如: `...-pubsub`, `...-storage`)
*   **简介**: Spring Cloud GCP让Java开发者可以方便地利用Google Cloud的强大功能。它提供了与GCP身份和访问管理（IAM）、日志（Stackdriver Logging）、追踪（Trace）、消息传递（Pub/Sub）、数据库（Spanner, Datastore）和存储（Cloud Storage）等服务的无缝集成，遵循Spring Boot的自动配置和属性绑定原则。

---

## 二十一、 大数据生态系统 (Big Data Ecosystem)

Spring也为大数据处理框架提供了集成方案，使得Spring Boot应用可以作为大数据管道的一部分。

### 1. Spring for Apache Hadoop
*   **依赖**: `org.springframework.data:spring-data-hadoop`
*   **简介**: 该项目旨在简化基于Apache Hadoop的应用程序开发。它提供了统一的配置模型、模板类（如`HdfsTemplate`, `HiveTemplate`）来简化与HDFS、MapReduce、Hive和HBase的交互。虽然不是一个典型的启动器，但可以与Spring Boot结合使用，以声明式的方式配置和运行Hadoop作业。

### 2. Spring Cloud Data Flow
*   **简介**: Spring Cloud Data Flow是一个用于构建和编排数据密集型应用的工具包，其核心是基于Spring Boot的微服务。它定义了Source（数据源）、Processor（处理器）和Sink（数据汇）等概念，允许你通过简单的DSL或图形界面将这些独立的Spring Boot应用连接起来，构建复杂的实时流处理和批处理数据管道。


---

## 1. Spring Boot Actuator

*   **官方文档**: [https://docs.spring.io/spring-boot/docs/current/reference/html/actuator.html](https://docs.spring.io/spring-boot/docs/current/reference/html/actuator.html)
*   **简介**: 提供生产级的应用监控和管理功能。通过HTTP端点（Endpoints）或JMX，可以实时查看应用健康状况、度量指标（Metrics）、环境信息、Bean列表、线程快照等。它是构建可观测性（Observability）系统的基石，是微服务运维的必备组件。

### 完整案例

#### a. Maven 依赖 (`pom.xml`)
一个基本的Web应用需要 `spring-boot-starter-web`，然后我们添加 `spring-boot-starter-actuator`。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.0</version> <!-- 请使用最新的稳定版本 -->
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>com.example</groupId>
    <artifactId>actuator-demo</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>actuator-demo</name>
    <description>Demo project for Spring Boot Actuator</description>

    <properties>
        <java.version>17</java.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>
```

#### b. 配置文件 (`src/main/resources/application.properties`)
默认情况下，出于安全考虑，Actuator只暴露 `/health` 端点。为了演示，我们暴露所有HTTP端点。我们还可以添加一些应用信息，这些信息会显示在 `/info` 端点。

```properties
# 暴露所有Web端点 (* 表示所有, 也可以指定具体的端点，如 health,info,beans)
management.endpoints.web.exposure.include=*

# (可选) 暴露 JMX 端点
management.endpoints.jmx.exposure.include=*

# (可选) 关闭健康检查的详细信息显示，可以设置为 always 来总是显示
management.endpoint.health.show-details=always

# (可选) 为 /info 端点添加自定义信息
info.app.name=Actuator Demo Application
info.app.version=1.0.0
info.app.description=A simple demo to showcase Spring Boot Actuator
```

#### c. 主应用类 (`src/main/java/com/example/actuatordemo/ActuatorDemoApplication.java`)
一个标准的Spring Boot应用入口即可，无需额外代码。

```java
package com.example.actuatordemo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class ActuatorDemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(ActuatorDemoApplication.class, args);
    }

    @GetMapping("/")
    public String home() {
        return "Welcome to the Actuator Demo! Check out the /actuator endpoints.";
    }
}
```

#### d. 如何运行和测试
1.  运行 `ActuatorDemoApplication` 的 `main` 方法启动应用。
2.  打开浏览器或使用 `curl` 访问以下地址：
    *   **健康检查**: `curl http://localhost:8080/actuator/health`
        ```json
        {"status":"UP","components":{"diskSpace":{"status":"UP",...},"ping":{"status":"UP"}}}
        ```
    *   **应用信息**: `curl http://localhost:8080/actuator/info`
        ```json
        {"app":{"name":"Actuator Demo Application","version":"1.0.0","description":"A simple demo to showcase Spring Boot Actuator"}}
        ```
    *   **查看所有Bean**: `curl http://localhost:8080/actuator/beans`
    *   **查看环境属性**: `curl http://localhost:8080/actuator/env`
    *   **查看所有端点**: `curl http://localhost:8080/actuator`

---

## 2. Spring Boot DevTools

*   **官方文档**: [https://docs.spring.io/spring-boot/docs/current/reference/html/using.html#using.devtools](https://docs.spring.io/spring-boot/docs/current/reference/html/using.html#using.devtools)
*   **GitHub**: (作为Spring Boot的一部分) [https://github.com/spring-projects/spring-boot](https://github.com/spring-projects/spring-boot)
*   **简介**: 一套专注于提升开发效率的工具集。它能实现应用程序的自动重启（LiveReload），当代码变更时，应用会快速重启以加载新代码。此外，它还集成了LiveReload服务器，支持浏览器端自动刷新，并为Thymeleaf等模板引擎提供了禁用缓存的默认配置。

### 完整案例

#### a. Maven 依赖 (`pom.xml`)
只需在已有项目中添加 `spring-boot-devtools` 依赖。`optional=true` 是推荐做法，这样该依赖不会被打包到生产环境的包中。

```xml
        <!-- ... 其他依赖 ... -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>
```

#### b. 配置文件 (`src/main/resources/application.properties`)
通常不需要为DevTools进行配置，其默认行为已经足够好。这里展示如何禁用重启功能（一般不这么做）。

```properties
# (可选) 如果你想临时禁用自动重启
# spring.devtools.restart.enabled=false
```

#### c. 主应用类和控制器
使用一个简单的Web控制器来观察变化。

```java
package com.example.devtoolsdemo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class DevtoolsDemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DevtoolsDemoApplication.class, args);
    }

    @GetMapping("/greeting")
    public String greeting() {
        // 步骤 3: 修改这里的文本
        return "Hello, DevTools World!";
    }
}
```

#### d. 如何运行和测试
1.  **启动应用**: 在IDE中运行 `DevtoolsDemoApplication` 的 `main` 方法。观察控制台日志。
2.  **首次访问**: 打开浏览器访问 `http://localhost:8080/greeting`。你会看到 "Hello, DevTools World!"。
3.  **修改代码**: 在IDE中，将 `greeting` 方法返回的字符串修改为 `"Hello, Automatic Restart!"` 并保存文件。
4.  **观察控制台**: 你会立刻看到IDE的控制台输出了类似重新启动的日志，但速度非常快。这是DevTools在工作。
5.  **刷新浏览器**: 再次刷新 `http://localhost:8080/greeting` 页面。你会看到页面内容已经更新为 "Hello, Automatic Restart!"，无需手动重启整个应用。

---

## 3. Lombok

*   **官方网站**: [https://projectlombok.org/](https://projectlombok.org/)
*   **GitHub**: [https://github.com/projectlombok/lombok](https://github.com/projectlombok/lombok)
*   **简介**: 一个非常流行的Java库，通过注解在编译期自动生成样板代码，如构造函数、Getter/Setter、`toString()`、`equals()`和`hashCode()`等。它能极大简化实体类（Entity）、DTO等数据对象的编写，让代码更整洁、更易读。
*   **重要提示**: 使用Lombok需要在你的IDE中安装Lombok插件才能获得正常的编译支持和代码提示。

### 完整案例

#### a. Maven 依赖 (`pom.xml`)

```xml
        <!-- ... 其他依赖 ... -->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
```

#### b. Java 实体类 (`User.java`)
这个类没有手动编写任何getter, setter, 构造函数或 `toString` 方法，完全由Lombok注解生成。

```java
package com.example.lombokdemo.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

/**
 * @Data: 一个方便的快捷注解，它捆绑了 @ToString, @EqualsAndHashCode, @Getter, @Setter 和 @RequiredArgsConstructor 的功能。
 * @NoArgsConstructor: 生成一个无参构造函数。
 * @AllArgsConstructor: 生成一个包含所有字段的构造函数。
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    private Long id;
    private String username;
    private String email;
}
```

#### c. 使用Lombok生成的方法
在应用的任何地方（如控制器或服务），你都可以像使用手写的代码一样使用Lombok生成的代码。

```java
package com.example.lombokdemo;

import com.example.lombokdemo.model.User;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class LombokDemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(LombokDemoApplication.class, args);
    }

    @GetMapping("/user")
    public User getUser() {
        // 使用 @AllArgsConstructor 创建对象
        User user = new User(1L, "john.doe", "john.doe@example.com");

        // 使用 @Setter 设置值 (虽然构造函数已设置)
        user.setUsername("John Doe Updated");

        // @Getter 和 @ToString 将在 Spring MVC 序列化为 JSON 时被隐式调用
        // 打印到控制台时，@ToString 会生效
        System.out.println("User object: " + user);

        return user;
    }
}
```

#### d. 如何运行和测试
1.  **安装IDE插件**: 确保你的IntelliJ IDEA或Eclipse已安装Lombok插件。
2.  **运行应用**: 启动 `LombokDemoApplication`。
3.  **访问接口**: 使用 `curl http://localhost:8080/user` 或在浏览器中访问。
4.  **查看结果**:
    *   浏览器会显示JSON: `{"id":1,"username":"John Doe Updated","email":"john.doe@example.com"}`。这证明 `@Getter` 方法被JSON序列化库（如Jackson）正确调用。
    *   控制台会打印: `User object: User(id=1, username=John Doe Updated, email=john.doe@example.com)`。这证明 `@ToString` 方法已生效。

---

## 4. Spring Configuration Processor

*   **官方文档**: [https://docs.spring.io/spring-boot/docs/current/reference/html/configuration-metadata.html#configuration-metadata.annotation-processor](https://docs.spring.io/spring-boot/docs/current/reference/html/configuration-metadata.html#configuration-metadata.annotation-processor)
*   **简介**: 该处理器用于生成元数据文件（`spring-configuration-metadata.json`），IDE（如IntelliJ IDEA, VS Code）可以利用这些元数据，为`application.properties`或`application.yml`文件中的自定义配置项提供智能提示和自动补全功能，极大提升了配置文件的编写体验。

### 完整案例

#### a. Maven 依赖 (`pom.xml`)
该处理器是一个注解处理器，通常只在编译时需要。

```xml
        <!-- ... 其他依赖 ... -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-configuration-processor</artifactId>
            <optional>true</optional>
        </dependency>
```

#### b. 创建一个配置属性类 (`MyAppProperties.java`)
这个类用于映射我们自定义的配置。

```java
package com.example.configprocessordemo.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

/**
 * @ConfigurationProperties 将这个类的字段与指定前缀的配置项绑定。
 * IDE 会利用生成的元数据，在你输入 "myapp." 时提供提示。
 */
@Configuration
@ConfigurationProperties(prefix = "myapp")
public class MyAppProperties {

    /**
     * 应用的名称。这个JavaDoc会成为IDE中的提示信息。
     */
    private String name = "DefaultAppName";

    /**
     * 应用的API地址。
     */
    private String apiUrl;

    private final Security security = new Security();

    // Standard getters and setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getApiUrl() { return apiUrl; }
    public void setApiUrl(String apiUrl) { this.apiUrl = apiUrl; }
    public Security getSecurity() { return security; }

    /**
     * 嵌套的配置类
     */
    public static class Security {
        /**
         * 是否启用安全特性。
         */
        private boolean enabled;
        private String token;

        // Standard getters and setters
        public boolean isEnabled() { return enabled; }
        public void setEnabled(boolean enabled) { this.enabled = enabled; }
        public String getToken() { return token; }
        public void setToken(String token) { this.token = token; }
    }
}
```

#### c. 配置文件 (`src/main/resources/application.properties`)
在这里使用我们定义的配置项。

```properties
# 自定义的应用配置
myapp.name=My Awesome Application
myapp.api-url=https://api.example.com
myapp.security.enabled=true
myapp.security.token=ABC-XYZ-123
```

#### d. 如何运行和测试
1.  **编译项目**: 在项目根目录下运行 `mvn clean install`。
2.  **检查元数据文件**: 编译后，检查 `target/classes/META-INF/spring-configuration-metadata.json` 文件。你会看到类似下面的内容，它描述了你的配置属性：
    ```json
    {
      "groups": [
        {
          "name": "myapp",
          "type": "com.example.configprocessordemo.config.MyAppProperties",
          "sourceType": "com.example.configprocessordemo.config.MyAppProperties"
        },
        // ...
      ],
      "properties": [
        {
          "name": "myapp.api-url",
          "type": "java.lang.String",
          "description": "应用的API地址。",
          "sourceType": "com.example.configprocessordemo.config.MyAppProperties"
        },
        {
          "name": "myapp.name",
          "type": "java.lang.String",
          "description": "应用的名称。这个JavaDoc会成为IDE中的提示信息。",
          "sourceType": "com.example.configprocessordemo.config.MyAppProperties",
          "defaultValue": "DefaultAppName"
        },
        // ...
      ]
    }
    ```
3.  **体验IDE智能提示**:
    *   打开 `src/main/resources/application.properties` 文件。
    *   删除 `myapp.name` 这一行。
    *   重新输入 `myapp.`，你的IDE（如IntelliJ IDEA）应该会弹出一个自动补全列表，其中包含 `name`, `api-url`, 和 `security`。
    *   将鼠标悬停在 `myapp.name` 上，IDE会显示你在JavaDoc中编写的注释 "应用的名称。..."。

---

## 5. Spring Boot Starter Validation

*   **官方文档 (Jakarta Bean Validation)**: [https://beanvalidation.org/](https://beanvalidation.org/)
*   **实现 (Hibernate Validator)**: [https://hibernate.org/validator/](https://hibernate.org/validator/)
*   **简介**: 提供对Java Bean Validation API（JSR-380）的支持，并默认集成了Hibernate Validator作为实现。通过在DTO或实体类的字段上添加`@NotNull`, `@Size`, `@Email`等注解，可以在Controller层自动对请求参数进行校验，简化了数据验证逻辑。

### 完整案例

#### a. Maven 依赖 (`pom.xml`)
`spring-boot-starter-web` 提供了Web环境，`spring-boot-starter-validation` 提供了校验能力。

```xml
        <!-- ... 其他依赖 ... -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-validation</artifactId>
        </dependency>
```

#### b. 创建一个带校验注解的DTO (`CreateUserInput.java`)

```java
package com.example.validationdemo.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class CreateUserInput {

    @NotBlank(message = "Username cannot be blank.")
    @Size(min = 3, max = 20, message = "Username must be between 3 and 20 characters.")
    private String username;

    @NotBlank(message = "Password cannot be blank.")
    @Size(min = 8, message = "Password must be at least 8 characters long.")
    private String password;

    @NotBlank(message = "Email cannot be blank.")
    @Email(message = "Email should be valid.")
    private String email;

    // Standard Getters and Setters
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}
```

#### c. 创建一个控制器来处理请求 (`UserController.java`)
在控制器方法中，使用 `@Valid` 注解来触发对`CreateUserInput`对象的校验。

```java
package com.example.validationdemo.controller;

import com.example.validationdemo.dto.CreateUserInput;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @PostMapping
    public ResponseEntity<Map<String, String>> createUser(@Valid @RequestBody CreateUserInput userInput) {
        // 如果校验通过，这里的代码才会执行
        System.out.println("User created: " + userInput.getUsername());
        return ResponseEntity.ok(Map.of("message", "User created successfully!"));
    }
}
```

#### d. 如何运行和测试
1.  **运行应用**: 启动主应用类。
2.  **测试校验失败**: 使用 `curl` 发送一个不符合规则的请求。
    *   **请求 (用户名太短)**:
        ```bash
        curl -X POST http://localhost:8080/api/users \
        -H "Content-Type: application/json" \
        -d '{"username": "us", "password": "password123", "email": "test@example.com"}'
        ```
    *   **响应 (HTTP 400 Bad Request)**: Spring Boot会自动捕获 `MethodArgumentNotValidException` 并返回一个包含错误信息的JSON响应。
        ```json
        {
          "timestamp": "...",
          "status": 400,
          "error": "Bad Request",
          "errors": [
            {
              "codes": [...],
              "arguments": [...],
              "defaultMessage": "Username must be between 3 and 20 characters.",
              "objectName": "createUserInput",
              "field": "username",
              "rejectedValue": "us",
              ...
            }
          ],
          "path": "/api/users"
        }
        ```
3.  **测试校验成功**: 发送一个合法的请求。
    *   **请求**:
        ```bash
        curl -X POST http://localhost:8080/api/users \
        -H "Content-Type: application/json" \
        -d '{"username": "validuser", "password": "a-strong-password", "email": "valid@example.com"}'
        ```
    *   **响应 (HTTP 200 OK)**:
        ```json
        {"message":"User created successfully!"}
        ```

---

## 6. Spring Web (MVC)

*   **官方文档**: [https://docs.spring.io/spring-framework/docs/current/reference/html/web.html#spring-web](https://docs.spring.io/spring-framework/docs/current/reference/html/web.html#spring-web)
*   **简介**: 构建Web应用（包括RESTful API）的核心启动器。它集成了Spring MVC框架，并默认内嵌了Tomcat作为Servlet容器，让Web应用的开发和部署变得极其简单。它还包含了数据绑定、类型转换、JSON序列化（默认使用Jackson）等构建Web服务所需的全套功能。

### 完整案例

#### a. Maven 依赖 (`pom.xml`)
`spring-boot-starter-web` 是唯一必须的依赖。

```xml
        <!-- ... 其他依赖 ... -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
```

#### b. 配置文件 (`src/main/resources/application.properties`)
可以配置服务器端口等基本属性。

```properties
# 设置Web服务器端口
server.port=8080
# (可选) 设置应用上下文路径
# server.servlet.context-path=/myapp
```

#### c. 创建一个REST控制器 (`GreetingController.java`)
这个控制器展示了如何处理不同的HTTP请求和路径变量。

```java
package com.example.webdemo.controller;

import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

@RestController
@RequestMapping("/api/greetings")
public class GreetingController {

    private final Map<Long, String> greetings = new ConcurrentHashMap<>();
    private final AtomicLong counter = new AtomicLong();

    // GET: 获取所有问候
    @GetMapping
    public Map<Long, String> getAllGreetings() {
        return greetings;
    }

    // GET: 根据ID获取单个问候
    // http://localhost:8080/api/greetings/1
    @GetMapping("/{id}")
    public String getGreetingById(@PathVariable Long id) {
        return greetings.getOrDefault(id, "Greeting not found!");
    }

    // POST: 创建一个新的问候
    @PostMapping
    public Map<String, Object> createGreeting(@RequestBody Map<String, String> payload) {
        long id = counter.incrementAndGet();
        String message = payload.get("message");
        greetings.put(id, message);
        return Map.of("id", id, "message", "Greeting created: " + message);
    }

    // 初始化一些数据
    public GreetingController() {
        greetings.put(counter.incrementAndGet(), "Hello, World!");
        greetings.put(counter.incrementAndGet(), "Hola, Mundo!");
    }
}
```

#### d. 如何运行和测试
1.  **运行应用**: 启动主应用类。
2.  **测试GET请求 (获取全部)**:
    *   `curl http://localhost:8080/api/greetings`
    *   响应: `{"1":"Hello, World!","2":"Hola, Mundo!"}`
3.  **测试GET请求 (按ID)**:
    *   `curl http://localhost:8080/api/greetings/1`
    *   响应: `Hello, World!`
4.  **测试POST请求 (创建)**:
    *   `curl -X POST http://localhost:8080/api/greetings -H "Content-Type: application/json" -d '{"message": "Bonjour, le Monde!"}'`
    *   响应: `{"id":3,"message":"Greeting created: Bonjour, le Monde!"}`
5.  **再次测试GET请求 (获取全部)**:
    *   `curl http://localhost:8080/api/greetings`
    *   响应: `{"1":"Hello, World!","2":"Hola, Mundo!","3":"Bonjour, le Monde!"}`



## 7. Spring WebFlux

*   **官方文档**: [https://docs.spring.io/spring-framework/docs/current/reference/html/web-reactive.html#spring-webflux](https://docs.spring.io/spring-framework/docs/current/reference/html/web-reactive.html#spring-webflux)
*   **简介**: 用于构建完全异步、非阻塞的响应式Web应用。它基于Project Reactor，提供了函数式编程模型和传统的基于注解的控制器模型。默认使用Netty作为嵌入式服务器，适用于高并发、低延迟的场景，是构建响应式微服务系统的首选。
*   **注意**: `spring-boot-starter-web` (MVC) 和 `spring-boot-starter-webflux` 通常不应同时使用。选择其中一个作为你的Web技术栈。

### 完整案例

本案例将同时展示**基于注解的控制器**和**函数式路由**两种风格。

#### a. Maven 依赖 (`pom.xml`)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.0</version>
        <relativePath/>
    </parent>
    <groupId>com.example</groupId>
    <artifactId>webflux-demo</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>webflux-demo</name>
    <description>Demo project for Spring WebFlux</description>
    <properties>
        <java.version>17</java.version>
    </properties>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-webflux</artifactId>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>
    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>
```

#### b. 配置文件 (`src/main/resources/application.properties`)
通常不需要特殊配置，但可以指定端口。

```properties
server.port=8080
```

#### c. 创建一个简单的实体类 (`Event.java`)

```java
package com.example.webfluxdemo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Event {
    private long id;
    private String message;
}
```

#### d. 【风格一】基于注解的控制器 (`AnnotatedEventController.java`)
这种风格与Spring MVC非常相似，但返回类型是 `Mono` (0或1个元素) 或 `Flux` (0到N个元素)。

```java
package com.example.webfluxdemo.controller;

import com.example.webfluxdemo.model.Event;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.Duration;
import java.util.stream.Stream;

@RestController
@RequestMapping("/annotated/events")
public class AnnotatedEventController {

    @GetMapping("/{id}")
    public Mono<Event> getEventById(@PathVariable long id) {
        return Mono.just(new Event(id, "Event " + id));
    }

    /**
     * Server-Sent Events (SSE) 端点。
     * 每秒产生一个事件，并以流的形式发送给客户端。
     * produces = MediaType.TEXT_EVENT_STREAM_VALUE 指定了内容类型。
     */
    @GetMapping(produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<Event> getEventsStream() {
        Flux<Long> interval = Flux.interval(Duration.ofSeconds(1));
        Flux<Event> events = Flux.fromStream(Stream.generate(() -> new Event(System.currentTimeMillis(), "Live Event")));

        return Flux.zip(interval, events)
                .map(tuple -> tuple.getT2());
    }
}
```

#### e. 【风格二】函数式路由 (`FunctionalRoutesConfig.java` 和 `EventHandler.java`)
这种风格将路由定义和处理逻辑分离开来，更符合函数式编程的思想。

**处理逻辑 (`EventHandler.java`)**

```java
package com.example.webfluxdemo.handler;

import com.example.webfluxdemo.model.Event;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

@Component
public class EventHandler {

    public Mono<ServerResponse> getEvent(ServerRequest request) {
        long eventId = Long.parseLong(request.pathVariable("id"));
        Mono<Event> eventMono = Mono.just(new Event(eventId, "Functional Event " + eventId));
        return ServerResponse.ok().body(eventMono, Event.class);
    }

    public Mono<ServerResponse> listEvents(ServerRequest request) {
        // 在实际应用中，这里会从数据库或服务中获取一个 Flux<Event>
        return ServerResponse.ok().body(
                Mono.just("List of events from functional endpoint."),
                String.class
        );
    }
}
```

**路由配置 (`FunctionalRoutesConfig.java`)**

```java
package com.example.webfluxdemo.config;

import com.example.webfluxdemo.handler.EventHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.ServerResponse;

import static org.springframework.web.reactive.function.server.RequestPredicates.GET;
import static org.springframework.web.reactive.function.server.RouterFunctions.route;

@Configuration
public class FunctionalRoutesConfig {

    @Bean
    public RouterFunction<ServerResponse> functionalRoutes(EventHandler eventHandler) {
        return route(GET("/functional/events/{id}"), eventHandler::getEvent)
                .andRoute(GET("/functional/events"), eventHandler::listEvents);
    }
}
```

#### f. 如何运行和测试
1.  **运行应用**: 启动主应用类。
2.  **测试注解控制器 (单个事件)**:
    *   `curl http://localhost:8080/annotated/events/101`
    *   响应: `{"id":101,"message":"Event 101"}`
3.  **测试注解控制器 (事件流)**:
    *   `curl http://localhost:8080/annotated/events`
    *   你将看到每秒钟服务器都会推送一条新的JSON数据，连接保持打开状态。
        ```
        data:{"id":1670835492042,"message":"Live Event"}

        data:{"id":1670835493043,"message":"Live Event"}

        data:{"id":1670835494044,"message":"Live Event"}
        ...
        ```
4.  **测试函数式路由 (单个事件)**:
    *   `curl http://localhost:8080/functional/events/202`
    *   响应: `{"id":202,"message":"Functional Event 202"}`
5.  **测试函数式路由 (列表)**:
    *   `curl http://localhost:8080/functional/events`
    *   响应: `List of events from functional endpoint.`

---

## 8. Spring HATEOAS

*   **官方文档**: [https://spring.io/projects/spring-hateoas](https://spring.io/projects/spring-hateoas)
*   **GitHub**: [https://github.com/spring-projects/spring-hateoas](https://github.com/spring-projects/spring-hateoas)
*   **简介**: 帮助你轻松实现HATEOAS（Hypermedia as the Engine of Application State）原则的REST服务。它提供了一套API，用于创建包含链接（Links）的资源表示模型，使客户端可以根据服务端返回的链接来发现和导航API，增强了服务的自描述性和演进能力。

### 完整案例

#### a. Maven 依赖 (`pom.xml`)
HATEOAS是建立在Web栈之上的，所以需要 `starter-web`。

```xml
        <!-- ... -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-hateoas</artifactId>
        </dependency>
        <!-- ... -->
```

#### b. 创建一个实体类 (`Book.java`)
这个类不需要特殊处理。

```java
package com.example.hateoasdemo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Book {
    private long id;
    private String title;
    private String author;
}
```

#### c. 创建控制器 (`BookController.java`)
这是HATEOAS的核心。我们将使用`EntityModel`和`CollectionModel`来包装我们的实体，并使用`WebMvcLinkBuilder`来创建链接。

```java
package com.example.hateoasdemo.controller;

import com.example.hateoasdemo.model.Book;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.Link;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

@RestController
@RequestMapping("/api/books")
public class BookController {

    private final Map<Long, Book> bookStore = Map.of(
            1L, new Book(1L, "1984", "George Orwell"),
            2L, new Book(2L, "The Lord of the Rings", "J.R.R. Tolkien")
    );

    @GetMapping
    public ResponseEntity<CollectionModel<EntityModel<Book>>> getAllBooks() {
        List<EntityModel<Book>> books = bookStore.values().stream()
                .map(book -> {
                    try {
                        // 为每本书添加一个指向其自身的链接
                        Link selfLink = linkTo(methodOn(BookController.class).getBookById(book.getId())).withSelfRel();
                        return EntityModel.of(book, selfLink);
                    } catch (Exception e) {
                        throw new RuntimeException(e);
                    }
                })
                .collect(Collectors.toList());

        // 为整个集合添加一个指向自身的链接
        Link selfLink = linkTo(methodOn(BookController.class).getAllBooks()).withSelfRel();

        return ResponseEntity.ok(CollectionModel.of(books, selfLink));
    }

    @GetMapping("/{id}")
    public ResponseEntity<EntityModel<Book>> getBookById(@PathVariable Long id) throws Exception {
        return Optional.ofNullable(bookStore.get(id))
                .map(book -> {
                    // 创建指向自身的链接
                    Link selfLink = linkTo(methodOn(BookController.class).getBookById(id)).withSelfRel();
                    // 创建指向所有书籍列表的链接
                    Link allBooksLink = linkTo(methodOn(BookController.class).getAllBooks()).withRel("all-books");
                    // 包装成EntityModel并返回
                    return ResponseEntity.ok(EntityModel.of(book, selfLink, allBooksLink));
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
```

#### d. 如何运行和测试
1.  **运行应用**: 启动主应用类。
2.  **测试获取单个资源**:
    *   `curl http://localhost:8080/api/books/1`
    *   **响应**: 注意JSON中的 `_links` 部分，它告诉客户端如何获取资源本身（self）以及如何导航到“所有书籍”的列表（all-books）。
        ```json
        {
          "id": 1,
          "title": "1984",
          "author": "George Orwell",
          "_links": {
            "self": {
              "href": "http://localhost:8080/api/books/1"
            },
            "all-books": {
              "href": "http://localhost:8080/api/books"
            }
          }
        }
        ```
3.  **测试获取资源集合**:
    *   `curl http://localhost:8080/api/books`
    *   **响应**: 集合本身有`_links`，集合中的每个元素也有自己的 `_links`。客户端可以从这个响应中发现每一本书的详细信息URL。
        ```json
        {
          "_embedded": {
            "bookList": [
              {
                "id": 1,
                "title": "1984",
                "author": "George Orwell",
                "_links": {
                  "self": {
                    "href": "http://localhost:8080/api/books/1"
                  }
                }
              },
              {
                "id": 2,
                "title": "The Lord of the Rings",
                "author": "J.R.R. Tolkien",
                "_links": {
                  "self": {
                    "href": "http://localhost:8080/api/books/2"
                  }
                }
              }
            ]
          },
          "_links": {
            "self": {
              "href": "http://localhost:8080/api/books"
            }
          }
        }
        ```

---

## 9. WebSocket

*   **官方文档**: [https://docs.spring.io/spring-framework/docs/current/reference/html/web.html#websocket](https://docs.spring.io/spring-framework/docs/current/reference/html/web.html#websocket)
*   **简介**: 为Spring Boot应用添加WebSocket支持，用于构建需要实时、双向通信的应用，例如在线聊天、实时数据推送、在线协作工具等。它提供了高级的STOMP（Simple Text Oriented Messaging Protocol）协议支持，简化了客户端与服务端的消息处理。

### 完整案例
本案例将构建一个简单的广播消息系统：客户端发送消息到服务器的一个地址，服务器处理后将消息广播给所有订阅了另一个地址的客户端。

#### a. Maven 依赖 (`pom.xml`)

```xml
        <!-- ... -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-websocket</artifactId>
        </dependency>
        <!-- ... -->
```

#### b. 创建消息模型 (`ChatMessage.java`)

```java
package com.example.websocketdemo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessage {
    private String from;
    private String text;
}
```

#### c. 配置WebSocket和STOMP (`WebSocketConfig.java`)
这个配置类启用了STOMP消息代理，并定义了消息端点。

```java
package com.example.websocketdemo.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker // 启用WebSocket消息代理
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        // 启用一个简单的内存消息代理，并设置目标前缀为 "/topic"
        // 任何目的地以 "/topic" 开头的消息都将被路由到消息代理
        config.enableSimpleBroker("/topic");
        // 设置应用的目的地前缀。客户端发送消息到服务器时，需要加上这个前缀
        // 例如，一个消息的目的地是 "/app/chat"，那么处理该消息的控制器方法是 @MessageMapping("/chat")
        config.setApplicationDestinationPrefixes("/app");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // 注册一个STOMP端点，客户端将使用它来连接到我们的WebSocket服务器
        // "/ws-chat" 是连接的URL。withSockJS() 是为不支持WebSocket的浏览器提供备用选项
        registry.addEndpoint("/ws-chat").withSockJS();
    }
}
```

#### d. 创建消息控制器 (`ChatController.java`)

```java
package com.example.websocketdemo.controller;

import com.example.websocketdemo.model.ChatMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

@Controller
public class ChatController {

    /**
     * 处理发送到 "/app/chat" 的消息
     * @param message 客户端发送的 ChatMessage 对象
     * @return 处理后的 ChatMessage 对象
     *
     * @SendTo("/topic/messages") 注解会将此方法的返回值广播到 "/topic/messages" 目的地，
     * 所有订阅了该主题的客户端都会收到消息。
     */
    @MessageMapping("/chat")
    @SendTo("/topic/messages")
    public ChatMessage handleMessage(ChatMessage message) throws Exception {
        // 模拟处理延迟
        Thread.sleep(500);
        // 对消息内容进行HTML转义，防止XSS攻击
        return new ChatMessage(
            HtmlUtils.htmlEscape(message.getFrom()),
            HtmlUtils.htmlEscape(message.getText())
        );
    }
}
```

#### e. 创建一个简单的前端页面 (`src/main/resources/static/index.html`)
这个页面使用`SockJS`和`Stomp.js`来与WebSocket服务器交互。

```html
<!DOCTYPE html>
<html>
<head>
    <title>Spring WebSocket Chat</title>
    <script src="https://cdn.jsdelivr.net/npm/sockjs-client@1.5.1/dist/sockjs.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/stompjs@2.3.3/lib/stomp.min.js"></script>
    <style>
        body { font-family: sans-serif; }
        #messages { border: 1px solid #ccc; padding: 10px; height: 300px; overflow-y: scroll; }
        .message { margin-bottom: 5px; }
        .user { font-weight: bold; }
    </style>
</head>
<body>
    <h1>WebSocket Chat</h1>
    <div>
        <label for="name">Your Name:</label>
        <input type="text" id="name" placeholder="Enter your name"/>
        <button id="connect" onclick="connect();">Connect</button>
        <button id="disconnect" onclick="disconnect();" disabled>Disconnect</button>
    </div>
    <div id="chat-room" style="display:none;">
        <div id="messages"></div>
        <input type="text" id="message" placeholder="Type a message..."/>
        <button id="send" onclick="sendMessage();">Send</button>
    </div>

    <script type="text/javascript">
        let stompClient = null;

        function setConnected(connected) {
            document.getElementById('connect').disabled = connected;
            document.getElementById('disconnect').disabled = !connected;
            document.getElementById('chat-room').style.display = connected ? 'block' : 'none';
            document.getElementById('messages').innerHTML = '';
        }

        function connect() {
            const name = document.getElementById('name').value;
            if (!name) {
                alert('Please enter your name.');
                return;
            }
            const socket = new SockJS('/ws-chat');
            stompClient = Stomp.over(socket);
            stompClient.connect({}, function (frame) {
                setConnected(true);
                console.log('Connected: ' + frame);
                // 订阅广播主题
                stompClient.subscribe('/topic/messages', function (message) {
                    showMessage(JSON.parse(message.body));
                });
            });
        }

        function disconnect() {
            if (stompClient !== null) {
                stompClient.disconnect();
            }
            setConnected(false);
            console.log("Disconnected");
        }

        function sendMessage() {
            const from = document.getElementById('name').value;
            const text = document.getElementById('message').value;
            stompClient.send("/app/chat", {}, JSON.stringify({'from': from, 'text': text}));
            document.getElementById('message').value = '';
        }

        function showMessage(message) {
            const messagesDiv = document.getElementById('messages');
            const p = document.createElement('p');
            p.className = 'message';
            p.innerHTML = `<span class="user">${message.from}:</span> ${message.text}`;
            messagesDiv.appendChild(p);
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        }
    </script>
</body>
</html>
```

#### f. 如何运行和测试
1.  **运行应用**: 启动主应用类。
2.  **测试交互**:
    *   在浏览器中打开 `http://localhost:8080`。
    *   在 "Your Name" 输入框中输入一个名字，比如 "Alice"，然后点击 "Connect"。
    *   **打开另一个浏览器窗口或标签页**，访问 `http://localhost:8080`。
    *   在新窗口中，输入另一个名字，比如 "Bob"，然后点击 "Connect"。
    *   现在，在任一窗口的输入框中输入消息并点击 "Send"。你会看到消息几乎同时出现在两个窗口的聊天框中。

---

## 10. Thymeleaf

*   **官方网站**: [https://www.thymeleaf.org/](https://www.thymeleaf.org/)
*   **GitHub**: [https://github.com/thymeleaf/thymeleaf](https://github.com/thymeleaf/thymeleaf)
*   **简介**: Spring Boot官方推荐的现代服务端Java模板引擎。其最大的特点是“自然模板”，即模板文件可以直接在浏览器中打开并正确显示，便于UI/UX设计师独立工作。它与Spring MVC集成良好，提供了丰富的方言（Dialects）来展示动态数据和处理表单。

### 完整案例

#### a. Maven 依赖 (`pom.xml`)
Thymeleaf需要Web环境，所以需要 `starter-web`。

```xml
        <!-- ... -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-thymeleaf</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <!-- ... -->
```

#### b. 配置文件 (`src/main/resources/application.properties`)
可以配置Thymeleaf的缓存策略等。在开发时，禁用缓存非常有用。

```properties
# 在开发时禁用Thymeleaf缓存，这样修改模板后刷新浏览器即可看到效果
spring.thymeleaf.cache=false
```

#### c. 创建一个模型类 (`Product.java`)

```java
package com.example.thymeleafdemo.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Product {
    private int id;
    private String name;
    private double price;
}
```

#### d. 创建一个控制器 (`ProductController.java`)
这个控制器准备数据并将其传递给Thymeleaf模板。

```java
package com.example.thymeleafdemo.controller;

import com.example.thymeleafdemo.model.Product;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
public class ProductController {

    @GetMapping("/products")
    public String listProducts(Model model) {
        List<Product> products = List.of(
            new Product(1, "Laptop Pro", 1200.50),
            new Product(2, "Wireless Mouse", 25.00),
            new Product(3, "Mechanical Keyboard", 150.75)
        );

        // 将数据添加到Model中，Thymeleaf模板可以访问这些数据
        model.addAttribute("pageTitle", "Product Catalog");
        model.addAttribute("products", products);

        // 返回模板的名称。Spring Boot会自动查找 src/main/resources/templates/products.html
        return "products";
    }
}
```

#### e. 创建Thymeleaf模板 (`src/main/resources/templates/products.html`)
这个HTML文件使用了Thymeleaf的特定属性（如 `th:text`, `th:each`）来动态生成内容。

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <!-- 使用 th:text 来动态设置标题 -->
    <title th:text="${pageTitle}">Default Title</title>
    <style>
        table { border-collapse: collapse; width: 50%; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
    </style>
</head>
<body>
    <!-- 使用 th:text 来动态设置H1标题 -->
    <h1 th:text="${pageTitle}">Product List</h1>

    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
            </tr>
        </thead>
        <tbody>
            <!-- 使用 th:each 来遍历产品列表 -->
            <tr th:each="product : ${products}">
                <td th:text="${product.id}">1</td>
                <td th:text="${product.name}">Product Name</td>
                <!-- 使用 #numbers 工具类来格式化价格 -->
                <td th:text="${#numbers.formatCurrency(product.price)}">$0.00</td>
            </tr>
        </tbody>
    </table>

</body>
</html>
```

#### f. 如何运行和测试
1.  **运行应用**: 启动主应用类。
2.  **访问页面**: 在浏览器中打开 `http://localhost:8080/products`。
3.  **查看结果**: 你会看到一个动态生成的HTML表格，其中包含了你在控制器中准备的所有产品数据，并且价格被格式化为了货币形式。页面标题和H1标题也都变成了"Product Catalog"。

---

## 11. FreeMarker

*   **官方网站**: [https://freemarker.apache.org/](https://freemarker.apache.org/)
*   **简介**: 一款成熟且功能强大的Java模板引擎。它拥有自己的模板语言（FTL），支持宏、函数以及复杂的逻辑处理。在很多历史悠久或对模板功能要求较高的项目中仍然非常流行。Spring Boot为其提供了完善的自动配置，使用起来非常方便。

### 完整案例

#### a. Maven 依赖 (`pom.xml`)

```xml
        <!-- ... -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-freemarker</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <!-- ... -->
```

#### b. 配置文件 (`src/main/resources/application.properties`)
与Thymeleaf类似，开发时禁用缓存是个好主意。

```properties
# 禁用FreeMarker缓存
spring.freemarker.cache=false
```

#### c. 创建一个控制器 (`WelcomeController.java`)
这个控制器准备数据并将其传递给FreeMarker模板。

```java
package com.example.freemarkerdemo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
public class WelcomeController {

    @GetMapping("/welcome")
    public String welcome(
        @RequestParam(name = "user", required = false, defaultValue = "Guest") String userName,
        Model model
    ) {
        model.addAttribute("user", userName);
        model.addAttribute("features", List.of("Fast", "Powerful", "Template-based"));
        return "welcome"; // 返回模板名，Spring Boot会查找 src/main/resources/templates/welcome.ftlh
    }
}
```

#### d. 创建FreeMarker模板 (`src/main/resources/templates/welcome.ftlh`)
FreeMarker使用自己的`FTL`（FreeMarker Template Language）语法，如 `<#if>`, `<#list>`, `${...}`。

```freemarker
<!DOCTYPE html>
<html>
<head>
    <title>Welcome to FreeMarker Demo</title>
    <style>
        body { font-family: Arial, sans-serif; }
        .highlight { color: #007bff; }
    </style>
</head>
<body>
    <h1>Hello, <span class="highlight">${user}!</span></h1>

    <p>Welcome to our application powered by FreeMarker.</p>

    <#-- 这是一个FreeMarker注释 -->
    <#-- 检查 features 列表是否存在且不为空 -->
    <#if features?? && features?has_content>
        <h2>Key Features:</h2>
        <ul>
            <#-- 使用 <#list> 指令遍历列表 -->
            <#list features as feature>
                <li>${feature}</li>
            </#list>
        </ul>
    <#else>
        <p>No features to display.</p>
    </#if>

</body>
</html>
```

#### e. 如何运行和测试
1.  **运行应用**: 启动主应用类。
2.  **访问页面**:
    *   在浏览器中打开 `http://localhost:8080/welcome`。你会看到 "Hello, Guest!" 和一个功能列表。
    *   在浏览器中打开 `http://localhost:8080/welcome?user=Alice`。你会看到 "Hello, Alice!" 和同样的功能列表。
3.  **查看结果**: 页面内容根据URL参数动态变化，并正确地渲染了列表，证明FreeMarker模板引擎正在正常工作。



## 12. Mustache

*   **官方网站**: [https://mustache.github.io/](https://mustache.github.io/)
*   **Java 实现 (JMustache)**: [https://github.com/samskivert/jmustache](https://github.com/samskivert/jmustache)
*   **简介**: 一种“逻辑无关”的模板引擎，意味着模板中几乎不包含任何业务逻辑，强制实现了视图和逻辑的分离。它的语法极其简单，并且在多种编程语言中都有实现，适合需要跨技术栈共享模板的场景。Spring Boot集成了JMustache作为其实现。

### 完整案例

#### a. Maven 依赖 (`pom.xml`)

```xml
        <!-- ... -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-mustache</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <!-- ... -->
```

#### b. 配置文件 (`src/main/resources/application.properties`)
开发时禁用缓存是个好习惯。

```properties
# 禁用Mustache模板缓存
spring.mustache.cache=false
```

#### c. 创建一个控制器 (`ArticleController.java`)
这个控制器准备数据模型，Mustache模板将直接使用这个模型进行渲染。

```java
package com.example.mustachedemo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Controller
public class ArticleController {

    @GetMapping("/articles")
    public String listArticles(Model model) {
        // Mustache可以直接使用Map或POJO作为数据模型
        var article1 = Map.of(
            "title", "Understanding Mustache",
            "author", "John Doe",
            "publishDate", LocalDate.of(2023, 1, 15),
            "isNew", true
        );
        var article2 = Map.of(
            "title", "Logic-less Templates",
            "author", "Jane Smith",
            "publishDate", LocalDate.of(2022, 11, 20),
            "isNew", false
        );

        model.addAttribute("pageTitle", "Tech Blog");
        model.addAttribute("articles", List.of(article1, article2));

        // 返回模板名，Spring Boot会自动查找 src/main/resources/templates/articles.mustache
        return "articles";
    }
}
```

#### d. 创建Mustache模板 (`src/main/resources/templates/articles.mustache`)
Mustache的语法非常简洁，主要使用 `{{...}}` 标签。

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>{{pageTitle}}</title>
    <style>
        .article { border: 1px solid #ccc; padding: 15px; margin-bottom: 10px; }
        .new-badge { background-color: #28a745; color: white; padding: 2px 5px; border-radius: 3px; font-size: 0.8em; }
    </style>
</head>
<body>
    <h1>Welcome to our {{pageTitle}}</h1>

    {{#articles}}
        <div class="article">
            // 双大括号`{{}}`用于变量插值，它会进行HTML转义
            <h2>{{title}}</h2>
            <p>By <em>{{author}}</em> on {{publishDate}}
               // `{{#isNew}}` 类似于if语句。如果isNew为true且不为null/false，则渲染内部内容
               {{#isNew}}
                   <span class="new-badge">NEW!</span>
               {{/isNew}}
            </p>
        </div>
    {{/articles}}

    {{^articles}}
        // `{{^articles}}` 类似于if-not语句。如果articles列表为空或不存在，则渲染内部内容
        <p>No articles found.</p>
    {{/articles}}
</body>
</html>
```

#### e. 如何运行和测试
1.  **运行应用**: 启动主应用类。
2.  **访问页面**: 在浏览器中打开 `http://localhost:8080/articles`。
3.  **查看结果**: 你会看到一个由Mustache模板动态生成的页面，其中包含两篇文章的列表。第一篇文章因为`"isNew": true`，所以会显示 "NEW!" 徽章，而第二篇则不会。这展示了Mustache的条件渲染和列表迭代功能。

---

## 13. JDBC API (`JdbcTemplate`)

*   **官方文档 (Spring Framework)**: [https://docs.spring.io/spring-framework/docs/current/reference/html/data-access.html#jdbc](https://docs.spring.io/spring-framework/docs/current/reference/html/data-access.html#jdbc)
*   **简介**: 提供了使用原生JDBC进行数据库操作的基础支持。它自动配置了`DataSource`（数据源）和`JdbcTemplate`。`JdbcTemplate`是Spring对JDBC的经典封装，它简化了资源管理（如连接的打开与关闭）、异常处理，让开发者能更专注于SQL本身。

### 完整案例
本案例将使用H2内存数据库，展示如何使用`JdbcTemplate`进行增删改查操作。

#### a. Maven 依赖 (`pom.xml`)

```xml
        <!-- ... -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-jdbc</artifactId>
        </dependency>
        <dependency>
            <groupId>com.h2database</groupId>
            <artifactId>h2</artifactId>
            <scope>runtime</scope>
        </dependency>
        <!-- ... -->
```

#### b. 配置文件 (`src/main/resources/application.properties`)
配置H2数据库连接信息。`spring.h2.console.enabled=true`可以让我们通过浏览器访问H2的数据库控制台。

```properties
# H2 数据库配置
spring.datasource.url=jdbc:h2:mem:jdbcdemo
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=

# 启用 H2 Web 控制台
spring.h2.console.enabled=true
# 设置 H2 控制台的访问路径
spring.h2.console.path=/h2-console
```

#### c. 创建数据库初始化脚本 (`src/main/resources/schema.sql`)
Spring Boot在启动时会自动执行这个脚本，创建我们需要的表。

```sql
CREATE TABLE employees (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
);
```

#### d. 创建模型类 (`Employee.java`)

```java
package com.example.jdbcdemo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Employee {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
}
```

#### e. 创建数据访问仓库 (`EmployeeRepository.java`)
这个类封装了所有使用`JdbcTemplate`的数据库操作。

```java
package com.example.jdbcdemo.repository;

import com.example.jdbcdemo.model.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class EmployeeRepository {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public EmployeeRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private static final class EmployeeRowMapper implements RowMapper<Employee> {
        @Override
        public Employee mapRow(ResultSet rs, int rowNum) throws SQLException {
            return new Employee(
                rs.getLong("id"),
                rs.getString("first_name"),
                rs.getString("last_name"),
                rs.getString("email")
            );
        }
    }

    public List<Employee> findAll() {
        return jdbcTemplate.query("SELECT * FROM employees", new EmployeeRowMapper());
    }

    public int save(Employee employee) {
        return jdbcTemplate.update(
            "INSERT INTO employees (first_name, last_name, email) VALUES (?, ?, ?)",
            employee.getFirstName(), employee.getLastName(), employee.getEmail()
        );
    }

    public Employee findById(Long id) {
        return jdbcTemplate.queryForObject(
            "SELECT * FROM employees WHERE id = ?",
            new EmployeeRowMapper(),
            id
        );
    }
    
    public int deleteById(Long id) {
        return jdbcTemplate.update("DELETE FROM employees WHERE id = ?", id);
    }
}
```

#### f. 创建一个命令行运行器来演示 (`CommandLineAppStartupRunner.java`)
这个类在应用启动后执行，演示了仓库的用法。

```java
package com.example.jdbcdemo;

import com.example.jdbcdemo.model.Employee;
import com.example.jdbcdemo.repository.EmployeeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class CommandLineAppStartupRunner implements CommandLineRunner {
    private static final Logger logger = LoggerFactory.getLogger(CommandLineAppStartupRunner.class);

    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public void run(String... args) throws Exception {
        logger.info("----> Inserting new employees...");
        employeeRepository.save(new Employee(null, "John", "Doe", "john.doe@example.com"));
        employeeRepository.save(new Employee(null, "Jane", "Smith", "jane.smith@example.com"));

        logger.info("----> Finding all employees:");
        employeeRepository.findAll().forEach(emp -> logger.info(emp.toString()));

        logger.info("----> Finding employee with ID 1:");
        Employee emp = employeeRepository.findById(1L);
        logger.info(emp.toString());
        
        logger.info("----> Deleting employee with ID 2:");
        employeeRepository.deleteById(2L);
        
        logger.info("----> Finding all employees after deletion:");
        employeeRepository.findAll().forEach(e -> logger.info(e.toString()));
    }
}
```

#### g. 如何运行和测试
1.  **运行应用**: 启动主应用类。
2.  **查看控制台日志**: 应用启动后，你会看到`CommandLineAppStartupRunner`打印的日志，清晰地展示了增、查、删的全过程。
3.  **访问H2控制台**: 在浏览器中打开 `http://localhost:8080/h2-console`。
    *   在登录页面，确保 "JDBC URL" 字段的值是 `jdbc:h2:mem:jdbcdemo`。
    *   点击 "Connect"。
    *   在控制台中，你可以执行SQL查询，如 `SELECT * FROM employees;`，来验证程序运行后的最终数据状态。

---

## 14. Spring Data JPA

*   **官方网站**: [https://spring.io/projects/spring-data-jpa](https://spring.io/projects/spring-data-jpa)
*   **简介**: 提供了基于JPA（Java Persistence API）规范的对象关系映射（ORM）支持，是Java世界中最主流的数据持久化方案。它默认使用Hibernate作为JPA实现，通过`Repository`接口，开发者只需定义方法名就能自动生成SQL查询，极大地简化了数据访问层的开发。

### 完整案例

#### a. Maven 依赖 (`pom.xml`)

```xml
        <!-- ... -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>
        <dependency>
            <groupId>com.h2database</groupId>
            <artifactId>h2</artifactId>
            <scope>runtime</scope>
        </dependency>
        <!-- ... -->
```

#### b. 配置文件 (`src/main/resources/application.properties`)
配置与JDBC示例类似，但可以额外配置JPA和Hibernate的行为。

```properties
# H2 数据库配置
spring.datasource.url=jdbc:h2:mem:jpademo
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=

# 启用 H2 Web 控制台
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console

# JPA/Hibernate 配置
# 让Hibernate根据实体类自动创建/更新数据库表结构
spring.jpa.hibernate.ddl-auto=update
# 在控制台显示Hibernate生成的SQL语句，便于调试
spring.jpa.show-sql=true
```

#### c. 创建JPA实体类 (`Customer.java`)
使用JPA注解（如`@Entity`, `@Id`, `@GeneratedValue`）来映射数据库表。

```java
package com.example.jpademo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;

    public Customer(String name, String email) {
        this.name = name;
        this.email = email;
    }
}
```

#### d. 创建Spring Data JPA仓库接口 (`CustomerRepository.java`)
这是Spring Data JPA的魔力所在。只需继承`JpaRepository`，你就能免费获得一套完整的CRUD方法。你还可以通过定义符合特定命名规范的方法，让Spring Data自动为你生成查询实现。

```java
package com.example.jpademo.repository;

import com.example.jpademo.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {

    /**
     * Spring Data JPA会根据方法名自动生成查询。
     * 这个方法会生成类似 "SELECT c FROM Customer c WHERE c.email = ?1" 的JPQL查询。
     * @param email The email to search for.
     * @return The customer with the given email, or null if not found.
     */
    Customer findByEmail(String email);

    /**
     * 查找姓名包含特定字符串的客户列表。
     * 会生成类似 "SELECT c FROM Customer c WHERE c.name LIKE ?1" 的查询。
     * @param name The substring to search for in the customer's name.
     * @return A list of matching customers.
     */
    List<Customer> findByNameContaining(String name);
}
```

#### e. 创建一个命令行运行器来演示 (`JpaDemoRunner.java`)

```java
package com.example.jpademo;

import com.example.jpademo.entity.Customer;
import com.example.jpademo.repository.CustomerRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class JpaDemoRunner implements CommandLineRunner {
    private static final Logger logger = LoggerFactory.getLogger(JpaDemoRunner.class);

    @Autowired
    private CustomerRepository customerRepository;

    @Override
    public void run(String... args) throws Exception {
        logger.info("----> Saving new customers...");
        customerRepository.save(new Customer("Alice", "alice@example.com"));
        customerRepository.save(new Customer("Bob", "bob@example.com"));
        customerRepository.save(new Customer("Charlie", "charlie@example.com"));

        logger.info("----> Finding all customers:");
        customerRepository.findAll().forEach(customer -> logger.info(customer.toString()));

        logger.info("----> Finding customer by ID 1:");
        customerRepository.findById(1L).ifPresent(customer -> logger.info(customer.toString()));

        logger.info("----> Finding customer by email 'bob@example.com':");
        Customer bob = customerRepository.findByEmail("bob@example.com");
        logger.info(bob.toString());
        
        logger.info("----> Finding customers with name containing 'li':");
        customerRepository.findByNameContaining("li").forEach(c -> logger.info(c.toString()));
    }
}
```

#### f. 如何运行和测试
1.  **运行应用**: 启动主应用类。
2.  **查看控制台日志**: 你会看到Hibernate创建表的SQL语句，以及`JpaDemoRunner`中每个操作对应的SQL查询日志，最后是查询结果。
3.  **访问H2控制台**: 在浏览器中打开 `http://localhost:8080/h2-console`，使用`jdbc:h2:mem:jpademo`连接，可以查看到`CUSTOMER`表及其中的数据。

---

## 15. Spring Data JDBC

*   **官方网站**: [https://spring.io/projects/spring-data-jdbc](https://spring.io/projects/spring-data-jdbc)
*   **简介**: Spring Data家族的一员，它提供了一种比JPA更简单、更贴近SQL的持久化方案。它不提供缓存、懒加载等复杂的ORM特性，而是专注于将领域实体与数据库表进行直接映射。它旨在保持ORM的便利性，同时让开发者对SQL有更强的控制力。

### 完整案例

#### a. Maven 依赖 (`pom.xml`)

```xml
        <!-- ... -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jdbc</artifactId>
        </dependency>
        <dependency>
            <groupId>com.h2database</groupId>
            <artifactId>h2</artifactId>
            <scope>runtime</scope>
        </dependency>
        <!-- ... -->
```

#### b. 配置文件 (`src/main/resources/application.properties`)
配置与`JdbcTemplate`示例完全相同。Spring Data JDBC不负责DDL，所以我们需要手动提供`schema.sql`。

```properties
spring.datasource.url=jdbc:h2:mem:sdjdbcdemo
spring.datasource.username=sa
spring.datasource.password=
spring.h2.console.enabled=true
```

#### c. 创建数据库初始化脚本 (`src/main/resources/schema.sql`)
Spring Data JDBC约定了表名和列名，通常是实体类的蛇形命名法（snake_case）。

```sql
CREATE TABLE car (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    make VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    year INT NOT NULL
);
```

#### d. 创建实体类 (`Car.java`)
实体类非常简单，没有JPA注解。`@Id`来自`org.springframework.data.annotation`包。

```java
package com.example.datajdbcdemo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;
// 注意：没有 @Entity 注解

@Data
@AllArgsConstructor
public class Car {
    @Id
    private Long id;
    private String make;
    private String model;
    private int year;
}
```

#### e. 创建Spring Data JDBC仓库接口 (`CarRepository.java`)
与Spring Data JPA类似，继承`CrudRepository`或`ListCrudRepository`。Spring Data JDBC也支持通过方法名派生查询。

```java
package com.example.datajdbcdemo.repository;

import com.example.datajdbcdemo.model.Car;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarRepository extends ListCrudRepository<Car, Long> {

    // 通过方法名派生查询
    List<Car> findByMake(String make);

    // 使用 @Query 注解自定义查询
    @Query("SELECT * FROM car WHERE year > :minYear")
    List<Car> findCarsNewerThan(@Param("minYear") int year);
}
```

#### f. 创建一个命令行运行器来演示 (`DataJdbcDemoRunner.java`)

```java
package com.example.datajdbcdemo;

import com.example.datajdbcdemo.model.Car;
import com.example.datajdbcdemo.repository.CarRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataJdbcDemoRunner implements CommandLineRunner {
    private static final Logger logger = LoggerFactory.getLogger(DataJdbcDemoRunner.class);
    
    private final CarRepository carRepository;

    public DataJdbcDemoRunner(CarRepository carRepository) {
        this.carRepository = carRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        logger.info("----> Saving new cars...");
        carRepository.save(new Car(null, "Toyota", "Camry", 2022));
        carRepository.save(new Car(null, "Honda", "Civic", 2021));
        carRepository.save(new Car(null, "Toyota", "RAV4", 2023));

        logger.info("----> Finding all cars:");
        carRepository.findAll().forEach(car -> logger.info(car.toString()));

        logger.info("----> Finding all Toyota cars:");
        carRepository.findByMake("Toyota").forEach(car -> logger.info(car.toString()));

        logger.info("----> Finding cars newer than 2021:");
        carRepository.findCarsNewerThan(2021).forEach(car -> logger.info(car.toString()));
    }
}
```

#### g. 如何运行和测试
1.  **运行应用**: 启动主应用类。
2.  **查看控制台日志**: 控制台会打印出执行的SQL语句和查询结果，与`JpaDemoRunner`类似，但没有Hibernate的额外日志。
3.  **访问H2控制台**: 在浏览器中打开 `http://localhost:8080/h2-console`，使用`jdbc:h2:mem:sdjdbcdemo`连接，可以查看到`CAR`表及其中的数据。



---

## 16. jOOQ

*   **官方网站**: [https://www.jooq.org/](https://www.jooq.org/)
*   **GitHub**: [https://github.com/jOOQ/jOOQ](https://github.com/jOOQ/jOOQ)
*   **简介**: 一款强大的数据库映射和SQL构建工具。它能根据数据库Schema生成Java类，让你可以在Java中以类型安全的方式编写SQL查询，避免了拼接字符串带来的语法错误和SQL注入风险。对于需要编写大量复杂、动态SQL的场景，jOOQ是一个绝佳选择。

### 完整案例
jOOQ的核心工作流是“代码生成”。我们将配置Maven插件，让它根据数据库Schema生成Java代码，然后使用这些生成的代码来执行查询。

#### a. Maven 依赖与插件配置 (`pom.xml`)
这是jOOQ配置中最复杂的部分，因为它涉及到代码生成。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.0</version>
        <relativePath/>
    </parent>
    <groupId>com.example</groupId>
    <artifactId>jooq-demo</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>jooq-demo</name>
    <description>Demo project for jOOQ</description>
    <properties>
        <java.version>17</java.version>
    </properties>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-jooq</artifactId>
        </dependency>
        <dependency>
            <groupId>com.h2database</groupId>
            <artifactId>h2</artifactId>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>

            <!-- jOOQ 代码生成插件 -->
            <plugin>
                <groupId>org.jooq</groupId>
                <artifactId>jooq-codegen-maven</artifactId>
                <version>${jooq.version}</version> <!-- 由 spring-boot-starter-parent 管理 -->

                <executions>
                    <execution>
                        <id>generate-h2</id>
                        <phase>generate-sources</phase>
                        <goals>
                            <goal>generate</goal>
                        </goals>
                    </execution>
                </executions>

                <configuration>
                    <!-- JDBC 连接信息，用于连接数据库以读取Schema -->
                    <jdbc>
                        <driver>org.h2.Driver</driver>
                        <url>jdbc:h2:mem:jooqdemo;DB_CLOSE_DELAY=-1</url>
                        <user>sa</user>
                        <password></password>
                    </jdbc>

                    <!-- 代码生成器配置 -->
                    <generator>
                        <!-- 数据库方言 -->
                        <database>
                            <name>org.jooq.meta.h2.H2Database</name>
                            <includes>.*</includes>
                            <excludes></excludes>
                            <!-- 数据库Schema -->
                            <inputSchema>PUBLIC</inputSchema>
                        </database>

                        <!-- 生成的目标配置 -->
                        <target>
                            <!-- 生成代码的包名 -->
                            <packageName>com.example.jooqdemo.db.gen</packageName>
                            <!-- 生成代码的存放目录 -->
                            <directory>target/generated-sources/jooq</directory>
                        </target>
                    </generator>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>
```

#### b. 配置文件 (`src/main/resources/application.properties`)
配置H2数据库，确保jOOQ插件和Spring Boot应用连接的是同一个数据库。

```properties
# H2 数据库配置
spring.datasource.url=jdbc:h2:mem:jooqdemo;DB_CLOSE_DELAY=-1
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=

# 启用 H2 Web 控制台
spring.h2.console.enabled=true
```

#### c. 创建数据库初始化脚本 (`src/main/resources/schema.sql`)
这个脚本会在应用启动时执行，创建表结构。

```sql
CREATE TABLE author (
    id INT NOT NULL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50) NOT NULL
);

CREATE TABLE book (
    id INT NOT NULL PRIMARY KEY,
    author_id INT NOT NULL,
    title VARCHAR(400) NOT NULL,
    published_in INT NOT NULL,

    FOREIGN KEY (author_id) REFERENCES author(id)
);

INSERT INTO author VALUES (1, 'George', 'Orwell');
INSERT INTO author VALUES (2, 'J.R.R.', 'Tolkien');

INSERT INTO book VALUES (1, 1, '1984', 1949);
INSERT INTO book VALUES (2, 1, 'Animal Farm', 1945);
INSERT INTO book VALUES (3, 2, 'The Lord of the Rings', 1954);
```

#### d. 生成jOOQ代码
1.  **启动一个临时的H2实例**: 为了让jOOQ代码生成插件能连接到数据库，我们需要先启动一个包含Schema的H2实例。最简单的方法是先运行一次Spring Boot应用，`schema.sql`会初始化数据库。应用启动后不要关闭它。
2.  **运行Maven生成命令**: 在项目根目录下打开一个新的终端，运行 `mvn generate-sources`。
3.  **检查生成结果**: 命令成功后，查看 `target/generated-sources/jooq` 目录。你会看到jOOQ为你生成了 `com.example.jooqdemo.db.gen.tables` 等包，里面包含了 `Author.java`, `Book.java` 等类型安全的表和记录类。

#### e. 创建一个服务来使用jOOQ (`BookService.java`)
`DSLContext`是jOOQ的核心，由Spring Boot自动配置并注入。我们使用它来构建和执行类型安全的SQL查询。

```java
package com.example.jooqdemo.service;

import org.jooq.DSLContext;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

// 引入生成的代码
import static com.example.jooqdemo.db.gen.Tables.AUTHOR;
import static com.example.jooqdemo.db.gen.Tables.BOOK;

@Service
public class BookService {

    private final DSLContext dsl;

    public BookService(DSLContext dsl) {
        this.dsl = dsl;
    }

    public List<Map<String, Object>> getBooksAndAuthors() {
        // 使用类型安全的方式构建一个JOIN查询
        return dsl.select(
                    BOOK.TITLE,
                    BOOK.PUBLISHED_IN,
                    AUTHOR.FIRST_NAME,
                    AUTHOR.LAST_NAME
                )
                .from(BOOK)
                .join(AUTHOR).on(BOOK.AUTHOR_ID.eq(AUTHOR.ID))
                .where(BOOK.PUBLISHED_IN.gt(1950))
                .orderBy(BOOK.PUBLISHED_IN.desc())
                .fetch()
                .intoMaps(); // 将结果转换为Map列表
    }
}
```

#### f. 创建一个控制器来暴露服务 (`BookController.java`)

```java
package com.example.jooqdemo.controller;

import com.example.jooqdemo.service.BookService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class BookController {

    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping("/books")
    public List<Map<String, Object>> getBooks() {
        return bookService.getBooksAndAuthors();
    }
}
```

#### g. 如何运行和测试
1.  **确保代码已生成**: 按照步骤d生成代码。
2.  **运行应用**: 启动主应用类。
3.  **访问接口**: 使用`curl http://localhost:8080/books`或在浏览器中访问。
4.  **查看结果**: 你会看到一个JSON数组，其中包含了1950年后出版的书籍及其作者信息，按出版年份降序排列。
    ```json
    [
      {
        "title": "The Lord of the Rings",
        "published_in": 1954,
        "first_name": "J.R.R.",
        "last_name": "Tolkien"
      }
    ]
    ```
    这个过程完全是类型安全的，如果在`BookService`中写错了字段名（如`BOOK.TITL`），代码在编译时就会报错。

---

## 17. MyBatis

*   **官方网站**: [https://mybatis.org/mybatis-3/](https://mybatis.org/mybatis-3/)
*   **Spring Boot Starter GitHub**: [https://github.com/mybatis/mybatis-spring-boot-starter](https://github.com/mybatis/mybatis-spring-boot-starter)
*   **简介**: 一款非常流行的半自动ORM框架。它将Java方法与SQL语句直接映射在XML文件或注解中，让开发者可以完全掌控SQL，同时又免去了手动处理JDBC的繁琐细节。因其灵活性和对复杂SQL的良好支持，在中国及许多亚洲国家有着广泛的应用。

### 完整案例
我们将创建一个简单的用户管理功能，使用XML映射文件来定义SQL。

#### a. Maven 依赖 (`pom.xml`)
注意，启动器是由MyBatis社区维护的。

```xml
        <!-- ... -->
        <dependency>
            <groupId>org.mybatis.spring.boot</groupId>
            <artifactId>mybatis-spring-boot-starter</artifactId>
            <version>3.0.3</version> <!-- 使用最新的稳定版本 -->
        </dependency>
        <dependency>
            <groupId>com.h2database</groupId>
            <artifactId>h2</artifactId>
            <scope>runtime</scope>
        </dependency>
        <!-- ... -->
```

#### b. 配置文件 (`src/main/resources/application.properties`)
配置数据库连接，并告诉MyBatis去哪里查找XML映射文件。

```properties
# H2 数据库配置
spring.datasource.url=jdbc:h2:mem:mybatisdemo
spring.datasource.username=sa
spring.datasource.password=

# MyBatis 配置
# 指定XML映射文件的位置
mybatis.mapper-locations=classpath:mappers/*.xml
# (可选) 为实体类指定别名，这样在XML中就不需要写完整的类名
mybatis.type-aliases-package=com.example.mybatisdemo.model
```

#### c. 创建数据库初始化脚本 (`src/main/resources/schema.sql`)

```sql
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
);
```

#### d. 创建模型类 (`User.java`)

```java
package com.example.mybatisdemo.model;

import lombok.Data;

@Data
public class User {
    private Long id;
    private String name;
    private String email;
}
```

#### e. 创建Mapper接口 (`UserMapper.java`)
这个接口定义了需要实现的数据库操作方法。`@Mapper`注解让Spring Boot能够扫描并创建它的代理实现。

```java
package com.example.mybatisdemo.mapper;

import com.example.mybatisdemo.model.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface UserMapper {
    User findById(Long id);
    List<User> findAll();
    void insert(User user);
    void update(User user);
    void delete(Long id);
}
```

#### f. 创建XML映射文件 (`src/main/resources/mappers/UserMapper.xml`)
这个文件是MyBatis的核心，它将SQL语句与Mapper接口中的方法绑定起来。

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.example.mybatisdemo.mapper.UserMapper">

    <!-- 开启二级缓存 (可选) -->
    <!-- <cache/> -->

    <select id="findById" resultType="User">
        SELECT * FROM users WHERE id = #{id}
    </select>

    <select id="findAll" resultType="User">
        SELECT * FROM users
    </select>

    <insert id="insert" useGeneratedKeys="true" keyProperty="id">
        INSERT INTO users(name, email) VALUES(#{name}, #{email})
    </insert>

    <update id="update">
        UPDATE users SET name = #{name}, email = #{email} WHERE id = #{id}
    </update>

    <delete id="delete">
        DELETE FROM users WHERE id = #{id}
    </delete>

</mapper>
```

#### g. 创建一个命令行运行器来演示 (`MyBatisDemoRunner.java`)

```java
package com.example.mybatisdemo;

import com.example.mybatisdemo.mapper.UserMapper;
import com.example.mybatisdemo.model.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class MyBatisDemoRunner implements CommandLineRunner {
    private static final Logger logger = LoggerFactory.getLogger(MyBatisDemoRunner.class);

    private final UserMapper userMapper;

    public MyBatisDemoRunner(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    @Override
    public void run(String... args) throws Exception {
        logger.info("----> Inserting a new user...");
        User newUser = new User();
        newUser.setName("MyBatis User");
        newUser.setEmail("mybatis@example.com");
        userMapper.insert(newUser);
        logger.info("Generated user ID: {}", newUser.getId());
        
        logger.info("----> Finding user with ID {}:", newUser.getId());
        User foundUser = userMapper.findById(newUser.getId());
        logger.info(foundUser.toString());

        logger.info("----> Updating user...");
        foundUser.setName("MyBatis User Updated");
        userMapper.update(foundUser);
        
        logger.info("----> Finding user after update:");
        logger.info(userMapper.findById(foundUser.getId()).toString());
        
        logger.info("----> Deleting user...");
        userMapper.delete(foundUser.getId());
        
        logger.info("----> Finding all users after deletion (should be empty):");
        logger.info("Total users: {}", userMapper.findAll().size());
    }
}
```

#### h. 如何运行和测试
1.  **运行应用**: 启动主应用类。
2.  **查看控制台日志**: 控制台会清晰地展示插入、查询、更新和删除用户的过程。你可以看到MyBatis执行的SQL语句（如果开启了相关日志级别）。
3.  **H2控制台**: 访问 `http://localhost:8080/h2-console`（如果启用）并连接到 `jdbc:h2:mem:mybatisdemo`，可以验证数据库的最终状态。

---

## 18. Flyway

*   **官方网站**: [https://flywaydb.org/](https://flywaydb.org/)
*   **GitHub**: [https://github.com/flyway/flyway](https://github.com/flyway/flyway)
*   **简介**: 一个流行的数据库迁移工具。它通过版本化的SQL脚本来管理数据库Schema的演进，支持自动化、可重复的数据库变更。Spring Boot检测到Flyway在classpath上时会自动执行迁移。

### 完整案例
我们将使用Flyway来创建并演进一个简单的数据库表。

#### a. Maven 依赖 (`pom.xml`)
Flyway需要一个JDBC驱动，这里我们使用PostgreSQL。

```xml
        <!-- ... -->
        <dependency>
            <groupId>org.flywaydb</groupId>
            <artifactId>flyway-core</artifactId>
        </dependency>
        <!-- Flyway 需要一个数据库驱动 -->
        <dependency>
            <groupId>org.postgresql</groupId>
            <artifactId>postgresql</artifactId>
            <scope>runtime</scope>
        </dependency>
        <!-- 引入JDBC starter 以便应用可以使用数据源 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-jdbc</artifactId>
        </dependency>
        <!-- ... -->
```

#### b. 配置文件 (`src/main/resources/application.properties`)
配置数据库连接信息。Flyway会自动使用Spring Boot配置的`DataSource`。

```properties
# PostgreSQL 数据库连接信息
# 请确保你有一个正在运行的PostgreSQL实例，并已创建名为 "flywaydemo" 的数据库
spring.datasource.url=jdbc:postgresql://localhost:5432/flywaydemo
spring.datasource.username=postgres # 替换为你的用户名
spring.datasource.password=password # 替换为你的密码

# Flyway 配置 (可选，通常默认值即可)
# 默认情况下，Flyway 会扫描 classpath:/db/migration 目录下的脚本
# spring.flyway.locations=classpath:db/migration
```

#### c. 创建迁移脚本
Flyway通过脚本的文件名来确定版本和执行顺序。文件名格式为 `V<VERSION>__<DESCRIPTION>.sql`。

**脚本1: `src/main/resources/db/migration/V1__Create_person_table.sql`**
这个脚本是我们的第一个数据库版本。

```sql
CREATE TABLE person (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);
```

**脚本2: `src/main/resources/db/migration/V2__Add_email_column_to_person.sql`**
这是第二个版本，对表结构进行了修改。

```sql
ALTER TABLE person ADD COLUMN email VARCHAR(100);
```

**脚本3: `src/main/resources/db/migration/V3__Add_initial_data.sql`**
第三个版本，插入一些初始数据。

```sql
INSERT INTO person (name, email) VALUES ('John Doe', 'john.doe@flyway.org');
INSERT INTO person (name, email) VALUES ('Jane Smith', 'jane.smith@flyway.org');
```

#### d. 如何运行和测试
1.  **准备数据库**: 确保你的PostgreSQL服务正在运行，并且已经创建了一个名为 `flywaydemo` 的空数据库。
2.  **第一次运行应用**:
    *   启动主应用类。
    *   **观察控制台日志**: 你会看到Flyway的日志，它会发现并按顺序执行 `V1`, `V2`, `V3` 三个脚本。
        ```
        ... Migrating schema "public" to version "1 - Create person table"
        ... Migrating schema "public" to version "2 - Add email column to person"
        ... Migrating schema "public" to version "3 - Add initial data"
        ... Migration of schema "public" to version "3 - Add initial data" completed successfully.
        ```
    *   **检查数据库**: 连接到你的PostgreSQL数据库，你会发现除了`person`表，还多了一个`flyway_schema_history`表。这个表记录了所有已执行的迁移，防止重复执行。`person`表也已经有了`email`列和两条数据。
3.  **第二次运行应用**:
    *   再次启动应用。
    *   **观察控制台日志**: Flyway会检查`flyway_schema_history`表，发现数据库已经是最新版本，所以不会执行任何迁移。
        ```
        ... Schema "public" is up to date. No migration necessary.
        ```
4.  **添加新的迁移**:
    *   在`src/main/resources/db/migration/`目录下创建一个新文件 `V4__Add_phone_column.sql`。
        ```sql
        ALTER TABLE person ADD COLUMN phone VARCHAR(20);
        ```
    *   重新启动应用。Flyway会发现新的V4脚本，并执行它，将数据库更新到最新状态。


---

## 19. Liquibase

*   **官方网站**: [https://www.liquibase.org/](https://www.liquibase.org/)
*   **GitHub**: [https://github.com/liquibase/liquibase](https://github.com/liquibase/liquibase)
*   **简介**: 另一个功能强大的数据库迁移工具。与Flyway不同，它支持使用XML、YAML、JSON或SQL等多种格式来定义数据库变更集（Changesets），并提供了更丰富的重构和回滚功能。Spring Boot检测到Liquibase在classpath上时会自动执行迁移。

### 完整案例
我们将使用Liquibase的XML格式来定义数据库的演进，这在企业级应用中非常常见，因为它提供了更强的结构化和更多的功能（如前提条件检查、回滚定义等）。

#### a. Maven 依赖 (`pom.xml`)
与Flyway类似，Liquibase也需要一个JDBC驱动。

```xml
        <!-- ... -->
        <dependency>
            <groupId>org.liquibase</groupId>
            <artifactId>liquibase-core</artifactId>
        </dependency>
        <dependency>
            <groupId>org.postgresql</groupId>
            <artifactId>postgresql</artifactId>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-jdbc</artifactId>
        </dependency>
        <!-- ... -->
```

#### b. 配置文件 (`src/main/resources/application.properties`)
配置数据库连接。Liquibase会自动使用Spring Boot的`DataSource`。

```properties
# PostgreSQL 数据库连接信息
# 请确保你有一个正在运行的PostgreSQL实例，并已创建名为 "liquibasedemo" 的数据库
spring.datasource.url=jdbc:postgresql://localhost:5432/liquibasedemo
spring.datasource.username=postgres # 替换为你的用户名
spring.datasource.password=password # 替换为你的密码

# Liquibase 配置 (可选，通常默认值即可)
# 默认情况下，Liquibase会扫描 classpath:/db/changelog/db.changelog-master.yaml 或 .xml, .json
spring.liquibase.change-log=classpath:/db/changelog/db.changelog-master.xml
```

#### c. 创建Liquibase变更日志文件
Liquibase使用一个主`changelog`文件来组织所有的变更。

**主文件: `src/main/resources/db/changelog/db.changelog-master.xml`**
这个文件包含了对其他变更日志文件的引用。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<databaseChangeLog
        xmlns="http://www.liquibase.org/xml/ns/dbchangelog"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.liquibase.org/xml/ns/dbchangelog
        http://www.liquibase.org/xml/ns/dbchangelog/dbchangelog-latest.xsd">

    <!-- 包含第一个变更集文件 -->
    <include file="db/changelog/001-create-initial-tables.xml"/>
    
    <!-- 包含第二个变更集文件 -->
    <include file="db/changelog/002-add-initial-data.xml"/>

</databaseChangeLog>
```

**变更集1: `src/main/resources/db/changelog/001-create-initial-tables.xml`**
这个文件定义了创建表的变更集。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<databaseChangeLog
        xmlns="http://www.liquibase.org/xml/ns/dbchangelog"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.liquibase.org/xml/ns/dbchangelog
        http://www.liquibase.org/xml/ns/dbchangelog/dbchangelog-latest.xsd">

    <changeSet id="1" author="app-dev">
        <createTable tableName="products">
            <column name="id" type="SERIAL">
                <constraints primaryKey="true" nullable="false"/>
            </column>
            <column name="name" type="VARCHAR(255)">
                <constraints nullable="false"/>
            </column>
            <column name="price" type="DECIMAL(10, 2)"/>
        </createTable>
    </changeSet>

    <changeSet id="2" author="app-dev">
        <addColumn tableName="products">
            <column name="description" type="TEXT"/>
        </addColumn>
    </changeSet>

</databaseChangeLog>
```

**变更集2: `src/main/resources/db/changelog/002-add-initial-data.xml`**
这个文件定义了插入数据的变更集，并包含了一个回滚操作的定义。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<databaseChangeLog
        xmlns="http://www.liquibase.org/xml/ns/dbchangelog"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.liquibase.org/xml/ns/dbchangelog
        http://www.liquibase.org/xml/ns/dbchangelog/dbchangelog-latest.xsd">

    <changeSet id="3" author="data-admin">
        <insert tableName="products">
            <column name="name" value="Laptop"/>
            <column name="price" value="1299.99"/>
            <column name="description" value="A powerful laptop for professionals."/>
        </insert>
        <insert tableName="products">
            <column name="name" value="Smartphone"/>
            <column name="price" value="799.50"/>
        </insert>
        
        <!-- 定义回滚操作，如果需要回滚这个变更集，将执行下面的SQL -->
        <rollback>
            <delete tableName="products">
                <where>name IN ('Laptop', 'Smartphone')</where>
            </delete>
        </rollback>
    </changeSet>

</databaseChangeLog>
```

#### d. 如何运行和测试
1.  **准备数据库**: 确保你的PostgreSQL服务正在运行，并且已经创建了一个名为 `liquibasedemo` 的空数据库。
2.  **第一次运行应用**:
    *   启动主应用类。
    *   **观察控制台日志**: 你会看到Liquibase的日志，它会读取`db.changelog-master.xml`，然后按顺序执行每个`changeSet`。
    *   **检查数据库**: 连接到你的PostgreSQL数据库。你会发现除了`products`表，还多了两个Liquibase的管理表：`databasechangelog`和`databasechangeloglock`。`databasechangelog`表记录了每个已执行的变更集，类似于Flyway的`flyway_schema_history`表。
3.  **第二次运行应用**:
    *   再次启动应用。Liquibase会检查`databasechangelog`表，发现数据库 schema 是最新的，不会执行任何操作。
4.  **添加新的变更**:
    *   在`db/changelog/`目录下创建一个新文件`003-add-sku-column.xml`，并在`db.changelog-master.xml`中引用它。
        ```xml
        <!-- 003-add-sku-column.xml -->
        <changeSet id="4" author="app-dev">
            <addColumn tableName="products">
                <column name="sku" type="VARCHAR(50)"/>
            </addColumn>
        </changeSet>
        ```
    *   重新启动应用。Liquibase会发现并执行这个新的变更集。

---

## 20. Redis

*   **官方网站**: [https://redis.io/](https://redis.io/)
*   **Spring Data Redis 文档**: [https://spring.io/projects/spring-data-redis](https://spring.io/projects/spring-data-redis)
*   **简介**: 集成Redis，一个高性能的内存键值数据库。常被用作缓存、分布式锁、会话存储和简单的消息代理。Spring Boot自动配置了连接工厂（支持Jedis和Lettuce客户端，Lettuce为默认），并提供了`RedisTemplate`和`StringRedisTemplate`用于方便地操作各种数据结构。

### 完整案例
本案例将展示如何使用`StringRedisTemplate`进行基本的字符串操作，以及如何使用`RedisTemplate`来存储Java对象。

#### a. Maven 依赖 (`pom.xml`)

```xml
        <!-- ... -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-redis</artifactId>
        </dependency>
        <!-- 引入web starter以便创建REST接口来演示 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <!-- ... -->
```

#### b. 配置文件 (`src/main/resources/application.properties`)
配置Redis服务器的连接信息。

```properties
# Redis 服务器配置
spring.redis.host=localhost
spring.redis.port=6379
# spring.redis.password= # 如果你的Redis有密码，在这里设置
```

#### c. 创建一个可序列化的模型类 (`SessionData.java`)
为了让`RedisTemplate`能够存储这个对象，它需要实现`Serializable`接口。

```java
package com.example.redisdemo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SessionData implements Serializable {
    // 确保 serialVersionUID 存在，以保证序列化兼容性
    private static final long serialVersionUID = 1L;

    private String userId;
    private List<String> permissions;
    private long lastAccessTime;
}
```

#### d. 创建一个服务来与Redis交互 (`RedisExampleService.java`)
这个服务演示了`StringRedisTemplate`和`RedisTemplate`的不同用法。

```java
package com.example.redisdemo.service;

import com.example.redisdemo.model.SessionData;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.List;

@Service
public class RedisExampleService {

    private final StringRedisTemplate stringRedisTemplate;
    private final RedisTemplate<String, Object> redisTemplate;

    public RedisExampleService(StringRedisTemplate stringRedisTemplate, RedisTemplate<String, Object> redisTemplate) {
        this.stringRedisTemplate = stringRedisTemplate;
        this.redisTemplate = redisTemplate;
    }

    // --- 使用 StringRedisTemplate (操作字符串) ---
    public void setPageView(String pageId) {
        // 使用 INCR 命令，原子性地增加一个key的值
        stringRedisTemplate.opsForValue().increment("page:views:" + pageId);
    }

    public String getPageView(String pageId) {
        return stringRedisTemplate.opsForValue().get("page:views:" + pageId);
    }

    // --- 使用 RedisTemplate (操作对象) ---
    public void saveSession(SessionData session) {
        String key = "session:" + session.getUserId();
        // opsForValue() 可以存取任何可序列化的对象
        redisTemplate.opsForValue().set(key, session);
        // 设置过期时间为30分钟
        redisTemplate.expire(key, Duration.ofMinutes(30));
    }

    public SessionData getSession(String userId) {
        String key = "session:" + userId;
        return (SessionData) redisTemplate.opsForValue().get(key);
    }
}
```

#### e. 创建一个控制器来暴露功能 (`DemoController.java`)

```java
package com.example.redisdemo.controller;

import com.example.redisdemo.model.SessionData;
import com.example.redisdemo.service.RedisExampleService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class DemoController {

    private final RedisExampleService redisService;

    public DemoController(RedisExampleService redisService) {
        this.redisService = redisService;
    }

    @GetMapping("/pageview/{pageId}")
    public Map<String, String> pageView(@PathVariable String pageId) {
        redisService.setPageView(pageId);
        String views = redisService.getPageView(pageId);
        return Map.of("page", pageId, "views", views);
    }

    @GetMapping("/session/save/{userId}")
    public String saveSession(@PathVariable String userId) {
        SessionData session = new SessionData(userId, List.of("READ", "WRITE"), System.currentTimeMillis());
        redisService.saveSession(session);
        return "Session for user " + userId + " saved.";
    }

    @GetMapping("/session/get/{userId}")
    public SessionData getSession(@PathVariable String userId) {
        return redisService.getSession(userId);
    }
}
```

#### f. 如何运行和测试
1.  **准备Redis**: 确保你的Redis服务器正在运行，并且可以通过`localhost:6379`访问。
2.  **运行应用**: 启动主应用类。
3.  **测试页面浏览计数**:
    *   在浏览器中多次访问 `http://localhost:8080/pageview/home`。每次访问，返回的`views`值都会增加1。
4.  **测试对象存储**:
    *   访问 `http://localhost:8080/session/save/user123`。这会创建一个`SessionData`对象并存入Redis。
    *   访问 `http://localhost:8080/session/get/user123`。你会看到之前保存的session对象的JSON表示。
5.  **使用`redis-cli`检查**:
    *   打开终端，运行 `redis-cli`。
    *   执行 `KEYS *`，你会看到类似 `page:views:home` 和 `session:user123` 的键。
    *   执行 `GET "page:views:home"`，会返回计数值。
    *   执行 `GET "session:user123"`，你会看到一串二进制数据，这是Java序列化后的结果。

---

## 21. MongoDB

*   **官方网站**: [https://www.mongodb.com/](https://www.mongodb.com/)
*   **Spring Data MongoDB 文档**: [https://spring.io/projects/spring-data-mongodb](https://spring.io/projects/spring-data-mongodb)
*   **简介**: 集成MongoDB，一个领先的面向文档的NoSQL数据库。它以类JSON的BSON格式存储数据，具有灵活的模式和强大的查询能力，非常适合内容管理、物联网和大数据等场景。Spring Boot提供了`MongoTemplate`进行复杂操作，并支持通过Spring Data Repositories进行便捷的CRUD。

### 完整案例
本案例将创建一个简单的产品目录，使用Spring Data MongoDB的Repository模式来操作数据。

#### a. Maven 依赖 (`pom.xml`)

```xml
        <!-- ... -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-mongodb</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <!-- ... -->
```

#### b. 配置文件 (`src/main/resources/application.properties`)
配置MongoDB的连接URI。

```properties
# MongoDB 连接URI
# 格式: mongodb://[username:password@]host1[:port1][,...hostN[:portN]][/[database][?options]]
# 对于本地默认安装的MongoDB，通常是下面这样
spring.data.mongodb.uri=mongodb://localhost:27017/mongodbdemo
```

#### c. 创建文档模型 (`Product.java`)
使用`@Document`注解将这个类标记为一个MongoDB文档。`@Id`注解标记主键，MongoDB会自动生成一个ObjectId类型的值。

```java
package com.example.mongodbdemo.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.math.BigDecimal;
import java.util.List;

@Document(collection = "products")
@Data
public class Product {
    @Id
    private String id;

    private String name;
    private String description;
    
    // 使用 @Field 注解可以指定在数据库中存储的字段名
    @Field("price_in_usd")
    private BigDecimal price;

    private List<String> tags;
}
```

#### d. 创建Spring Data仓库接口 (`ProductRepository.java`)
继承`MongoRepository`，即可获得CRUD和分页排序功能。同样支持通过方法名派生查询。

```java
package com.example.mongodbdemo.repository;

import com.example.mongodbdemo.model.Product;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface ProductRepository extends MongoRepository<Product, String> {

    // 通过方法名派生查询：查找所有包含特定标签的产品
    List<Product> findByTagsContains(String tag);

    // 使用 @Query 注解进行更复杂的查询 (使用MongoDB的JSON查询语法)
    // 查找价格在指定范围内的产品
    @Query("{ 'price_in_usd' : { $gte: ?0, $lte: ?1 } }")
    List<Product> findByPriceBetween(BigDecimal minPrice, BigDecimal maxPrice);
}
```

#### e. 创建一个控制器来暴露CRUD操作 (`ProductController.java`)

```java
package com.example.mongodbdemo.controller;

import com.example.mongodbdemo.model.Product;
import com.example.mongodbdemo.repository.ProductRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductRepository productRepository;

    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @PostMapping
    public Product createProduct(@RequestBody Product product) {
        return productRepository.save(product);
    }

    @GetMapping
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable String id) {
        return productRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }



    @GetMapping("/search/by-tag")
    public List<Product> searchByTag(@RequestParam String tag) {
        return productRepository.findByTagsContains(tag);
    }

    @GetMapping("/search/by-price")
    public List<Product> searchByPriceRange(
            @RequestParam BigDecimal min, @RequestParam BigDecimal max) {
        return productRepository.findByPriceBetween(min, max);
    }
}
```

#### f. 如何运行和测试
1.  **准备MongoDB**: 确保你的MongoDB服务器正在运行，并且可以通过`localhost:27017`访问。你不需要预先创建数据库或集合，MongoDB会在第一次插入数据时自动创建它们。
2.  **运行应用**: 启动主应用类。
3.  **使用`curl`测试**:
    *   **创建产品**:
        ```bash
        curl -X POST http://localhost:8080/api/products \
        -H "Content-Type: application/json" \
        -d '{"name": "Super Keyboard", "description": "Mechanical gaming keyboard", "price_in_usd": 150.0, "tags": ["electronics", "gaming", "pc"]}'
        ```
    *   **获取所有产品**: `curl http://localhost:8080/api/products`
    *   **按标签搜索**: `curl "http://localhost:8080/api/products/search/by-tag?tag=gaming"`
    *   **按价格范围搜索**: `curl "http://localhost:8080/api/products/search/by-price?min=100&max=200"`
4.  **使用MongoDB Shell或Compass检查**:
    *   连接到你的MongoDB实例，切换到`mongodbdemo`数据库。
    *   执行`db.products.find()`，你可以看到通过API插入的所有文档。


---

## 22. Cassandra

*   **官方网站**: [https://cassandra.apache.org/](https://cassandra.apache.org/)
*   **Spring Data Cassandra 文档**: [https://spring.io/projects/spring-data-for-apache-cassandra](https://spring.io/projects/spring-data-for-apache-cassandra)
*   **简介**: 集成Apache Cassandra，一个高度可扩展、高可用的分布式宽列存储数据库。它为大规模数据集提供了无单点故障的线性扩展能力，适用于需要处理海量写入和高可用性要求的场景。
*   **重要提示**: 使用Cassandra需要你对它的数据模型（特别是分区键和集群键）有一定的了解，因为这直接影响查询性能。

### 完整案例
本案例将创建一个简单的视频元数据存储系统，演示如何定义Cassandra表实体和使用Spring Data Cassandra Repository。

#### a. Maven 依赖 (`pom.xml`)

```xml
        <!-- ... -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-cassandra</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <!-- ... -->
```

#### b. 配置文件 (`src/main/resources/application.properties`)
配置Cassandra的连接点和本地数据中心。Keyspace是Cassandra中数据库的等价物。

```properties
# Cassandra 连接配置
# 连接点 (contact-points) 可以是多个，用逗号分隔
spring.cassandra.contact-points=127.0.0.1
# Cassandra 监听的端口
spring.cassandra.port=9042
# 本地数据中心名称，这对于生产环境的多数据中心部署至关重要
spring.cassandra.local-datacenter=datacenter1
# 要连接的Keyspace名称
spring.cassandra.keyspace-name=cassandrademo
# 当Keyspace不存在时，应执行的操作 (Create, CreateIfNotExists, None)
spring.cassandra.schema-action=CreateIfNotExists
```

#### c. 创建实体类 (`Video.java`)
Cassandra实体使用`@Table`注解。`@PrimaryKey`可以由多个`@PrimaryKeyColumn`组成，定义了数据如何分区和排序。

```java
package com.example.cassandrademo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.cassandra.core.cql.Ordering;
import org.springframework.data.cassandra.core.cql.PrimaryKeyType;
import org.springframework.data.cassandra.core.mapping.PrimaryKeyColumn;
import org.springframework.data.cassandra.core.mapping.Table;

import java.time.Instant;
import java.util.Set;
import java.util.UUID;

@Table("videos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Video {

    @PrimaryKeyColumn(name = "video_id", ordinal = 0, type = PrimaryKeyType.PARTITIONED)
    private UUID videoId;

    private String title;
    private String description;
    private Set<String> tags;

    @PrimaryKeyColumn(name = "upload_timestamp", ordinal = 1, type = PrimaryKeyType.CLUSTERED, ordering = Ordering.DESCENDING)
    private Instant uploadTimestamp;
}
```
**数据模型说明**:
*   `videoId`是**分区键** (`PARTITIONED`)。所有具有相同`videoId`的记录都会存储在Cassandra集群的同一个节点上。
*   `uploadTimestamp`是**集群键** (`CLUSTERED`)。在同一个分区内，记录会根据这个键进行排序（这里是降序）。
*   Cassandra的查询通常必须提供分区键。

#### d. 创建仓库接口 (`VideoRepository.java`)
继承`CassandraRepository`。Spring Data Cassandra也支持方法名派生查询，但查询条件受到数据模型的严格限制。

```java
package com.example.cassandrademo.repository;

import com.example.cassandrademo.model.Video;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.data.cassandra.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface VideoRepository extends CassandraRepository<Video, UUID> {

    // Cassandra查询通常需要提供完整的主键或其前缀
    // 这个方法名派生查询是无效的，因为 title 不是主键的一部分
    // List<Video> findByTitle(String title); // 这会抛出异常

    // 有效的查询：根据分区键查找
    List<Video> findByVideoId(UUID videoId);

    // 可以使用@Query注解编写自定义CQL查询
    @Query("SELECT * FROM videos WHERE video_id = ?0 LIMIT 1")
    Video findLatestByVideoId(UUID videoId);
}
```

#### e. 创建一个控制器来演示 (`VideoController.java`)

```java
package com.example.cassandrademo.controller;

import com.example.cassandrademo.model.Video;
import com.example.cassandrademo.repository.VideoRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@RestController
@RequestMapping("/api/videos")
public class VideoController {

    private final VideoRepository videoRepository;

    public VideoController(VideoRepository videoRepository) {
        this.videoRepository = videoRepository;
    }

    @PostMapping
    public Video uploadVideo() {
        Video video = new Video(
            UUID.randomUUID(),
            "My Awesome Video",
            "A video about Spring Boot and Cassandra",
            Set.of("spring", "cassandra", "java"),
            Instant.now()
        );
        return videoRepository.save(video);
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<Video>> getVideosById(@PathVariable UUID id) {
        List<Video> videos = videoRepository.findByVideoId(id);
        if (videos.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(videos);
    }
}
```

#### f. 如何运行和测试
1.  **准备Cassandra**: 确保你的Cassandra实例正在运行。最简单的方法是使用Docker:
    ```bash
    docker run --name cassandra-db -p 9042:9042 -d cassandra:latest
    ```
2.  **运行应用**: 启动主应用类。由于 `spring.cassandra.schema-action=CreateIfNotExists`，应用在启动时会自动创建 `cassandrademo` keyspace和`videos`表。
3.  **测试API**:
    *   **上传视频**: `curl -X POST http://localhost:8080/api/videos`。记下返回的`videoId`。
    *   **获取视频**: 使用上一步返回的`videoId`替换下面的`{VIDEO_ID}`，然后执行:
        `curl http://localhost:8080/api/videos/{VIDEO_ID}`
4.  **使用`cqlsh`检查**:
    *   `docker exec -it cassandra-db cqlsh`
    *   `USE cassandrademo;`
    *   `SELECT * FROM videos;` 你会看到通过API插入的数据。

---

## 23. Couchbase

*   **官方网站**: [https://www.couchbase.com/](https://www.couchbase.com/)
*   **Spring Data Couchbase 文档**: [https://spring.io/projects/spring-data-couchbase](https://spring.io/projects/spring-data-couchbase)
*   **简介**: 集成Couchbase，一个分布式的多模型NoSQL数据库，结合了键值存储的速度和文档数据库的灵活性。它提供了强大的N1QL（发音为"nickel"）查询语言，类似于SQL，并内置了缓存层和全文搜索功能。

### 完整案例
本案例将创建一个用户个人资料系统，演示Couchbase的文档存储和N1QL查询能力。

#### a. Maven 依赖 (`pom.xml`)

```xml
        <!-- ... -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-couchbase</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <!-- ... -->
```

#### b. 配置文件 (`src/main/resources/application.properties`)
配置Couchbase的连接字符串、用户名和密码。

```properties
# Couchbase 连接配置
# 连接字符串，可以包含多个节点
spring.couchbase.connection-string=couchbase://127.0.0.1
# 连接的用户名
spring.couchbase.username=Administrator
# 连接的密码
spring.couchbase.password=password
# 要操作的Bucket名称
spring.couchbase.bucket-name=couchbasedemo
```

#### c. 创建实体类 (`UserProfile.java`)
Couchbase实体使用`@Document`注解。`@Id`和`@Field`与MongoDB类似。`@GeneratedValue`可以用于生成文档ID。

```java
package com.example.couchbasedemo.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.couchbase.core.mapping.Document;
import org.springframework.data.couchbase.core.mapping.Field;
import org.springframework.data.couchbase.core.mapping.id.GeneratedValue;
import org.springframework.data.couchbase.core.mapping.id.GenerationStrategy;

import java.util.Date;
import java.util.List;

@Document
@Data
public class UserProfile {

    @Id
    @GeneratedValue(strategy = GenerationStrategy.UNIQUE)
    private String id;

    @Field
    private String username;

    @Field
    private String email;

    @Field
    private Date lastLogin;

    @Field
    private List<String> interests;
}
```

#### d. 创建仓库接口 (`UserProfileRepository.java`)
继承`CouchbaseRepository`。Spring Data Couchbase支持方法名派生查询和使用`@Query`注解的N1QL查询。

```java
package com.example.couchbasedemo.repository;

import com.example.couchbasedemo.model.UserProfile;
import org.springframework.data.couchbase.repository.CouchbaseRepository;
import org.springframework.data.couchbase.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserProfileRepository extends CouchbaseRepository<UserProfile, String> {

    // 方法名派生查询
    Optional<UserProfile> findByUsername(String username);

    // N1QL查询。`#{#n1ql.bucket}` 是一个SpEL表达式，代表当前配置的bucket名。
    // `#{#n1ql.filter}` 会自动添加一个用于区分不同文档类型的字段 (e.g., `_class = "..."`)
    @Query("#{#n1ql.selectEntity} WHERE #{#n1ql.filter} AND $1 IN interests")
    List<UserProfile> findByInterest(String interest);
}
```

#### e. 创建一个控制器 (`UserProfileController.java`)

```java
package com.example.couchbasedemo.controller;

import com.example.couchbasedemo.model.UserProfile;
import com.example.couchbasedemo.repository.UserProfileRepository;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserProfileController {

    private final UserProfileRepository repository;

    public UserProfileController(UserProfileRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public UserProfile createUser(@RequestBody UserProfile userProfile) {
        userProfile.setLastLogin(new Date());
        return repository.save(userProfile);
    }

    @GetMapping("/by-username/{username}")
    public UserProfile getByUsername(@PathVariable String username) {
        return repository.findByUsername(username).orElse(null);
    }

    @GetMapping("/by-interest/{interest}")
    public List<UserProfile> getByInterest(@PathVariable String interest) {
        return repository.findByInterest(interest);
    }
}
```

#### f. 如何运行和测试
1.  **准备Couchbase**:
    *   使用Docker启动Couchbase: `docker run -d --name couchbase-db -p 8091-8096:8091-8096 -p 11210:11210 couchbase`
    *   打开浏览器访问 `http://127.0.0.1:8091` 进行初始化设置。设置集群名称，管理员用户名为 `Administrator`，密码为 `password`。
    *   在"Buckets"标签页，创建一个名为 `couchbasedemo` 的Bucket。
    *   在"Query"标签页，为`couchbasedemo` bucket创建一个主索引: `CREATE PRIMARY INDEX ON `couchbasedemo`;`。这是执行N1QL查询所必需的。
2.  **运行应用**: 启动主应用类。
3.  **测试API**:
    *   **创建用户**:
        ```bash
        curl -X POST http://localhost:8080/api/users \
        -H "Content-Type: application/json" \
        -d '{"username": "cb_user", "email": "cb@example.com", "interests": ["java", "nosql"]}'
        ```
    *   **按用户名查询**: `curl http://localhost:8080/api/users/by-username/cb_user`
    *   **按兴趣查询**: `curl http://localhost:8080/api/users/by-interest/java`
4.  **在Couchbase UI中检查**: 在Couchbase Web UI的"Documents"或"Query"标签页，你可以看到并查询通过API创建的数据。

---

## 24. Neo4j

*   **官方网站**: [https://neo4j.com/](https://neo4j.com/)
*   **Spring Data Neo4j 文档**: [https://spring.io/projects/spring-data-neo4j](https://spring.io/projects/spring-data-neo4j)
*   **简介**: 集成Neo4j，一个原生的图数据库。它专门用于存储、查询和管理实体及其之间的复杂关系，是构建社交网络、推荐引擎、欺诈检测和知识图谱等应用的理想选择。

### 完整案例
我们将构建一个简单的电影和演员关系图谱，演示如何定义节点和关系，并使用Cypher查询语言进行图遍历。

#### a. Maven 依赖 (`pom.xml`)

```xml
        <!-- ... -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-neo4j</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <!-- ... -->
```

#### b. 配置文件 (`src/main/resources/application.properties`)
配置Neo4j的Bolt协议URI和认证信息。

```properties
# Neo4j 连接配置
# Bolt协议URI
spring.neo4j.uri=bolt://localhost:7687
# 用户名
spring.neo4j.authentication.username=neo4j
# 密码
spring.neo4j.authentication.password=password
```

#### c. 创建实体类 (节点和关系)
在Spring Data Neo4j中，实体分为节点（Node）和关系（Relationship）。

**节点: `MovieNode.java`**

```java
package com.example.neo4jdemo.model;

import lombok.Data;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Property;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.util.HashSet;
import java.util.Set;

@Node("Movie")
@Data
public class MovieNode {
    @Id
    private final String title;

    @Property("tagline")
    private String description;

    private Integer released;

    @Relationship(type = "ACTED_IN", direction = Relationship.Direction.INCOMING)
    private Set<PersonNode> actors = new HashSet<>();
}
```

**节点: `PersonNode.java`**

```java
package com.example.neo4jdemo.model;

import lombok.Data;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.util.HashSet;
import java.util.Set;

@Node("Person")
@Data
public class PersonNode {
    @Id
    private final String name;
    private int born;

    @Relationship(type = "ACTED_IN")
    private Set<MovieNode> actedIn = new HashSet<>();
}
```
**关系注解说明**:
*   `@Relationship`定义了节点间的关系。
*   `type`是关系在图中的类型名 (e.g., `ACTED_IN`)。
*   `direction`指定关系的方向。`INCOMING`表示关系指向当前节点。

#### d. 创建仓库接口
分别创建`MovieRepository`和`PersonRepository`。

```java
package com.example.neo4jdemo.repository;

import com.example.neo4jdemo.model.MovieNode;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;

import java.util.List;

public interface MovieRepository extends Neo4jRepository<MovieNode, String> {
    MovieNode findByTitle(String title);
}

//---

package com.example.neo4jdemo.repository;

import com.example.neo4jdemo.model.PersonNode;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;

import java.util.List;

public interface PersonRepository extends Neo4jRepository<PersonNode, String> {
    
    // 使用Cypher查询语言进行复杂的图查询
    @Query("MATCH (p:Person)-[:ACTED_IN]->(m:Movie) WHERE m.title = $movieTitle RETURN p")
    List<PersonNode> findActorsByMovieTitle(String movieTitle);
}
```

#### e. 创建一个服务来初始化图数据 (`GraphDataInitializer.java`)

```java
package com.example.neo4jdemo.service;

import com.example.neo4jdemo.model.MovieNode;
import com.example.neo4jdemo.model.PersonNode;
import com.example.neo4jdemo.repository.MovieRepository;
import com.example.neo4jdemo.repository.PersonRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class GraphDataInitializer {

    private final MovieRepository movieRepository;
    private final PersonRepository personRepository;

    public GraphDataInitializer(MovieRepository movieRepository, PersonRepository personRepository) {
        this.movieRepository = movieRepository;
        this.personRepository = personRepository;
    }

    @PostConstruct
    public void initialize() {
        movieRepository.deleteAll();
        personRepository.deleteAll();

        PersonNode tomHanks = new PersonNode("Tom Hanks");
        tomHanks.setBorn(1956);

        MovieNode forrestGump = new MovieNode("Forrest Gump");
        forrestGump.setDescription("Life is like a box of chocolates...");
        forrestGump.setReleased(1994);

        // 创建关系
        tomHanks.getActedIn().add(forrestGump);
        
        personRepository.save(tomHanks);
        // 由于关系是从Person到Movie，保存Person时会自动级联保存Movie和关系
    }
}
```

#### f. 创建一个控制器 (`MovieController.java`)

```java
package com.example.neo4jdemo.controller;

import com.example.neo4jdemo.model.MovieNode;
import com.example.neo4jdemo.model.PersonNode;
import com.example.neo4jdemo.repository.MovieRepository;
import com.example.neo4jdemo.repository.PersonRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/graph")
public class MovieController {

    private final MovieRepository movieRepository;
    private final PersonRepository personRepository;

    public MovieController(MovieRepository movieRepository, PersonRepository personRepository) {
        this.movieRepository = movieRepository;
        this.personRepository = personRepository;
    }

    @GetMapping("/movie/{title}")
    public MovieNode getMovieByTitle(@PathVariable String title) {
        return movieRepository.findByTitle(title);
    }

    @GetMapping("/actors/{movieTitle}")
    public List<PersonNode> getActorsInMovie(@PathVariable String movieTitle) {
        return personRepository.findActorsByMovieTitle(movieTitle);
    }
}
```

#### g. 如何运行和测试
1.  **准备Neo4j**:
    *   使用Docker启动Neo4j: `docker run --name neo4j-db -p 7474:7474 -p 7687:7687 -d -e NEO4J_AUTH=neo4j/password neo4j`
2.  **运行应用**: 启动主应用类。`GraphDataInitializer`会清空数据库并插入一个电影和一个演员，以及它们之间的关系。
3.  **测试API**:
    *   `curl http://localhost:8080/api/graph/movie/Forrest%20Gump`
    *   `curl http://localhost:8080/api/graph/actors/Forrest%20Gump`
4.  **使用Neo4j Browser检查**:
    *   访问 `http://localhost:7474`，使用用户名`neo4j`和密码`password`登录。
    *   在查询框中输入 `MATCH (n) RETURN n`，你会看到一个可视化的图，其中一个`Person`节点通过`ACTED_IN`关系连接到一个`Movie`节点。


---

## 25. Elasticsearch

*   **官方网站**: [https://www.elastic.co/](https://www.elastic.co/)
*   **Spring Data Elasticsearch 文档**: [https://docs.spring.io/spring-data/elasticsearch/reference/](https://docs.spring.io/spring-data/elasticsearch/reference/)
*   **简介**: 集成Elasticsearch，一个基于Apache Lucene的分布式搜索和分析引擎。它能提供近乎实时的搜索、聚合和分析功能，广泛用于全文搜索、日志分析（ELK Stack）、应用性能监控（APM）等领域。Spring Boot为其配置了客户端，并提供`ElasticsearchRestTemplate`和Repository支持。
*   **注意**: Spring Boot 3.x 使用新的 Elasticsearch Java Client，配置和依赖与旧版本有较大不同。本案例基于Spring Boot 3.x。

### 完整案例
本案例将创建一个文章索引系统，演示如何创建索引、存入文档、进行全文搜索和短语匹配。

#### a. Maven 依赖 (`pom.xml`)
Spring Boot 3.x 不再有 `spring-boot-starter-data-elasticsearch`，而是需要直接依赖 `spring-data-elasticsearch` 并手动管理ES客户端。但为了简化，我们依然可以像下面这样配置。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.0</version>
        <relativePath/>
    </parent>
    <groupId>com.example</groupId>
    <artifactId>elasticsearch-demo</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>elasticsearch-demo</name>
    <description>Demo project for Elasticsearch</description>
    <properties>
        <java.version>17</java.version>
    </properties>
    <dependencies>
        <!-- Spring Data Elasticsearch 核心依赖 -->
        <dependency>
            <groupId>org.springframework.data</groupId>
            <artifactId>spring-data-elasticsearch</artifactId>
        </dependency>
        <!-- Web starter 用于创建API -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <!-- Elasticsearch Java Client (新版) -->
        <dependency>
            <groupId>co.elastic.clients</groupId>
            <artifactId>elasticsearch-java</artifactId>
        </dependency>
        <!-- Jackson for JSON processing (needed by ES client) -->
        <dependency>
            <groupId>com.fasterxml.jackson.core</groupId>
            <artifactId>jackson-databind</artifactId>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>
    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>
```

#### b. 配置文件 (`src/main/resources/application.properties`)
配置Elasticsearch服务器的连接信息。

```properties
# Elasticsearch 服务器地址
spring.elasticsearch.uris=http://localhost:9200
# 如果有用户名和密码
# spring.elasticsearch.username=elastic
# spring.elasticsearch.password=changeme
```

#### c. 创建文档实体 (`Article.java`)
使用 `@Document` 注解标记这是一个ES文档，并指定索引名。`@Field` 注解可以定义字段的类型和分析器（analyzer）。

```java
package com.example.elasticsearchdemo.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import java.util.List;

@Data
@Document(indexName = "blog_articles")
public class Article {

    @Id
    private String id;

    // `text`类型适用于全文搜索，它会被分析器处理（分词、小写等）
    @Field(type = FieldType.Text, name = "title")
    private String title;

    @Field(type = FieldType.Text, name = "content")
    private String content;

    // `keyword`类型适用于精确匹配、排序和聚合
    @Field(type = FieldType.Keyword, name = "author")
    private String author;

    @Field(type = FieldType.Keyword, name = "tags")
    private List<String> tags;
}
```

#### d. 创建仓库接口 (`ArticleRepository.java`)
继承 `ElasticsearchRepository`。

```java
package com.example.elasticsearchdemo.repository;

import com.example.elasticsearchdemo.model.Article;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArticleRepository extends ElasticsearchRepository<Article, String> {

    // 方法名派生查询：查找特定作者的所有文章
    List<Article> findByAuthor(String author);

    // 查找标题或内容中包含特定词语的文章
    List<Article> findByTitleContainingOrContentContaining(String title, String content);
}
```

#### e. 创建一个服务来封装复杂的查询 (`SearchService.java`)
对于更复杂的搜索，如多字段匹配、高亮等，通常使用`ElasticsearchOperations`（或其实现`ElasticsearchRestTemplate`）。

```java
package com.example.elasticsearchdemo.service;

import com.example.elasticsearchdemo.model.Article;
import org.springframework.data.elasticsearch.client.elc.NativeQuery;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.core.query.Query;
import org.springframework.stereotype.Service;

@Service
public class SearchService {

    private final ElasticsearchOperations elasticsearchOperations;

    public SearchService(ElasticsearchOperations elasticsearchOperations) {
        this.elasticsearchOperations = elasticsearchOperations;
    }

    public SearchHits<Article> multiMatchSearch(String query) {
        // 使用 NativeQuery 构建一个原生的ES查询
        Query esQuery = NativeQuery.builder()
                .withQuery(q -> q
                        .multiMatch(mm -> mm
                                .query(query)
                                .fields("title", "content") // 在title和content字段中搜索
                        )
                )
                .build();
        
        return elasticsearchOperations.search(esQuery, Article.class);
    }
}
```

#### f. 创建一个控制器 (`ArticleController.java`)

```java
package com.example.elasticsearchdemo.controller;

import com.example.elasticsearchdemo.model.Article;
import com.example.elasticsearchdemo.repository.ArticleRepository;
import com.example.elasticsearchdemo.service.SearchService;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/articles")
public class ArticleController {

    private final ArticleRepository articleRepository;
    private final SearchService searchService;

    public ArticleController(ArticleRepository articleRepository, SearchService searchService) {
        this.articleRepository = articleRepository;
        this.searchService = searchService;
    }

    @PostMapping
    public Article createArticle(@RequestBody Article article) {
        return articleRepository.save(article);
    }

    @GetMapping("/author/{name}")
    public List<Article> getByAuthor(@PathVariable String name) {
        return articleRepository.findByAuthor(name);
    }
    
    @GetMapping("/search/simple")
    public List<Article> searchSimple(@RequestParam String term) {
        return articleRepository.findByTitleContainingOrContentContaining(term, term);
    }
    
    @GetMapping("/search/advanced")
    public List<Article> searchAdvanced(@RequestParam String term) {
        return searchService.multiMatchSearch(term).stream()
                .map(SearchHit::getContent)
                .collect(Collectors.toList());
    }
}
```

#### g. 如何运行和测试
1.  **准备Elasticsearch**:
    *   使用Docker启动Elasticsearch: `docker run -d --name elasticsearch-db -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" -e "xpack.security.enabled=false" docker.elastic.co/elasticsearch/elasticsearch:8.11.1` (请使用与你客户端兼容的版本)
2.  **运行应用**: 启动主应用类。Spring Data Elasticsearch会在启动时检查索引是否存在，如果不存在，会自动创建（基于`@Document`和`@Field`注解）。
3.  **测试API**:
    *   **创建文章**:
        ```bash
        curl -X POST http://localhost:8080/api/articles \
        -H "Content-Type: application/json" \
        -d '{"title": "Spring Boot with Elasticsearch", "content": "Elasticsearch is a powerful search engine. Spring Data makes it easy to use.", "author": "John Doe", "tags": ["spring", "search"]}'

        curl -X POST http://localhost:8080/api/articles \
        -H "Content-Type: application/json" \
        -d '{"title": "Getting Started with Java", "content": "Java is a versatile programming language.", "author": "Jane Smith", "tags": ["java", "programming"]}'
        ```
    *   **按作者查询**: `curl http://localhost:8080/api/articles/author/John%20Doe`
    *   **简单全文搜索**: `curl "http://localhost:8080/api/articles/search/simple?term=powerful"`
    *   **高级多字段搜索**: `curl "http://localhost:8080/api/articles/search/advanced?term=spring%20java"` (这个查询会匹配包含 "spring" 或 "java" 的所有文档)

---

## 26. Apache Solr

*   **官方网站**: [https://solr.apache.org/](https://solr.apache.org/)
*   **Spring Data Solr 文档**: [https://docs.spring.io/spring-data/solr/reference/](https://docs.spring.io/spring-data/solr/reference/)
*   **简介**: 集成Apache Solr，另一个成熟的、功能丰富的开源搜索平台，同样基于Lucene。它提供了强大的全文搜索、分面搜索、动态集群等功能。虽然近年来Elasticsearch在微服务生态中更受关注，但Solr依然是企业级搜索的有力选择。
*   **注意**: Spring Data Solr 项目目前处于社区维护状态，更新可能不如其他Spring Data项目频繁。

### 完整案例
本案例将创建一个产品搜索引擎，演示如何定义Solr Schema，索引数据并进行查询。

#### a. Maven 依赖 (`pom.xml`)

```xml
        <!-- ... -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-solr</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <!-- ... -->
```

#### b. 配置文件 (`src/main/resources/application.properties`)
配置Solr服务器的地址和要操作的"核"（core）或"集合"（collection）。

```properties
# Solr 服务器地址
spring.data.solr.host=http://localhost:8983/solr

# 如果Solr开启了Zookeeper，需要配置zk-host
# spring.data.solr.zk-host=localhost:2181/solr
```

#### c. 创建Solr Core并定义Schema
与Elasticsearch不同，Solr通常需要预先定义Schema。
1.  **启动Solr**: `docker run -d --name solr-db -p 8983:8983 solr`
2.  **创建Core**: `docker exec -it solr-db bin/solr create -c solrdemo`
3.  **定义Schema**: Solr 9.x 默认使用"Schema-less"模式，可以根据第一次提交的文档动态添加字段。为了演示，我们假设有以下字段：`id` (string), `name_s` (string, for exact match), `description_t` (text_general, for full-text search), `category_s` (string), `price_f` (float)。

#### d. 创建文档实体 (`ProductDoc.java`)
使用 `@SolrDocument` 注解标记这是一个Solr文档。`@Id` 和 `@Field` 注解用于映射Solr Schema中的字段。

```java
package com.example.solrdemo.model;

import lombok.Data;
import org.apache.solr.client.solrj.beans.Field;
import org.springframework.data.annotation.Id;
import org.springframework.data.solr.core.mapping.SolrDocument;

import java.util.List;

@Data
@SolrDocument(collection = "solrdemo") // 对应Solr中的core/collection名
public class ProductDoc {
    @Id
    @Field("id")
    private String id;

    @Field("name_s") // _s 后缀通常表示string类型
    private String name;

    @Field("description_t") // _t 后缀通常表示text类型
    private String description;

    @Field("category_s")
    private String category;

    @Field("price_f") // _f 后缀通常表示float类型
    private float price;
}
```

#### e. 创建仓库接口 (`ProductDocRepository.java`)
继承`SolrCrudRepository`。

```java
package com.example.solrdemo.repository;

import com.example.solrdemo.model.ProductDoc;
import org.springframework.data.domain.Pageable;
import org.springframework.data.solr.repository.Query;
import org.springframework.data.solr.repository.SolrCrudRepository;

import java.util.List;

public interface ProductDocRepository extends SolrCrudRepository<ProductDoc, String> {

    // 方法名派生查询
    List<ProductDoc> findByCategory(String category);

    // 使用 @Query 注解编写Solr查询
    // 查找描述中包含某个词，并且价格在指定范围内的产品
    @Query("description_t:*?0* AND price_f:[?1 TO ?2]")
    List<ProductDoc> findByDescriptionAndPriceRange(String searchTerm, float minPrice, float maxPrice, Pageable page);
}
```

#### f. 创建一个控制器 (`ProductController.java`)

```java
package com.example.solrdemo.controller;

import com.example.solrdemo.model.ProductDoc;
import com.example.solrdemo.repository.ProductDocRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductDocRepository repository;

    public ProductController(ProductDocRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public ProductDoc createProduct(@RequestBody ProductDoc product) {
        // Solr需要一个唯一的ID
        if (product.getId() == null) {
            product.setId(UUID.randomUUID().toString());
        }
        return repository.save(product);
    }

    @GetMapping("/category/{category}")
    public List<ProductDoc> getByCategory(@PathVariable String category) {
        return repository.findByCategory(category);
    }

    @GetMapping("/search")
    public List<ProductDoc> search(
            @RequestParam String term,
            @RequestParam float minPrice,
            @RequestParam float maxPrice
    ) {
        return repository.findByDescriptionAndPriceRange(term, minPrice, maxPrice, PageRequest.of(0, 10));
    }
}
```

#### g. 如何运行和测试
1.  **准备Solr**: 按照步骤c启动Solr并创建`solrdemo` core。
2.  **运行应用**: 启动主应用类。
3.  **测试API**:
    *   **创建产品**:
        ```bash
        curl -X POST http://localhost:8080/api/products \
        -H "Content-Type: application/json" \
        -d '{"name": "High-Quality Laptop", "description": "A fast and reliable laptop for everyday use.", "category": "Electronics", "price": 1200.0}'

        curl -X POST http://localhost:8080/api/products \
        -H "Content-Type: application/json" \
        -d '{"name": "Comfortable T-Shirt", "description": "A soft cotton t-shirt, reliable and durable.", "category": "Apparel", "price": 25.50}'
        ```
    *   **按分类查询**: `curl http://localhost:8080/api/products/category/Electronics`
    *   **复杂查询**: `curl "http://localhost:8080/api/products/search?term=reliable&minPrice=100&maxPrice=1500"` (这个查询会找到Laptop)
4.  **在Solr UI中检查**:
    *   访问 `http://localhost:8093/solr`，选择`solrdemo` core。
    *   在"Query"页面，你可以执行查询并看到索引中的数据。


---

## 27. RabbitMQ (AMQP)

*   **官方网站**: [https://www.rabbitmq.com/](https://www.rabbitmq.com/)
*   **Spring AMQP 文档**: [https://spring.io/projects/spring-amqp](https://spring.io/projects/spring-amqp)
*   **简介**: 集成RabbitMQ，一个实现了AMQP（高级消息队列协议）的强大消息代理。它支持多种消息模式（如点对点、发布/订阅、路由），并以其可靠性和灵活性著称。Spring Boot自动配置了`RabbitTemplate`用于发送消息，以及`@RabbitListener`注解用于声明式地消费消息。

### 完整案例
本案例将演示一个典型的“主题交换机（Topic Exchange）”使用场景。我们将发送带有不同“路由键（routing key）”的消息，并设置多个队列根据路由键的模式来接收消息。

#### a. Maven 依赖 (`pom.xml`)

```xml
        <!-- ... -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-amqp</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <!-- ... -->
```

#### b. 配置文件 (`src/main/resources/application.properties`)
配置RabbitMQ服务器的连接信息。

```properties
# RabbitMQ 服务器连接配置
spring.rabbitmq.host=localhost
spring.rabbitmq.port=5672
spring.rabbitmq.username=guest
spring.rabbitmq.password=guest
```

#### c. 创建AMQP配置类 (`RabbitMQConfig.java`)
虽然Spring Boot可以自动创建`RabbitTemplate`，但声明交换机（Exchange）、队列（Queue）和绑定（Binding）通常需要一个配置类。这使得基础设施的定义与业务逻辑分离。

```java
package com.example.rabbitmqdemo.config;

import org.springframework.amqp.core.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    public static final String TOPIC_EXCHANGE_NAME = "app.topic.exchange";
    public static final String LOGS_QUEUE_NAME = "app.logs.queue";
    public static final String ERRORS_QUEUE_NAME = "app.errors.queue";
    public static final String ALL_MESSAGES_QUEUE_NAME = "app.all.queue";

    @Bean
    TopicExchange topicExchange() {
        return new TopicExchange(TOPIC_EXCHANGE_NAME);
    }

    @Bean
    Queue logsQueue() {
        return new Queue(LOGS_QUEUE_NAME, false); // durable=false
    }

    @Bean
    Queue errorsQueue() {
        return new Queue(ERRORS_QUEUE_NAME, false);
    }

    @Bean
    Queue allMessagesQueue() {
        return new Queue(ALL_MESSAGES_QUEUE_NAME, false);
    }

    @Bean
    Binding logsBinding(Queue logsQueue, TopicExchange exchange) {
        // 将 logsQueue 绑定到交换机，只接收路由键为 "app.logs.*" 的消息
        return BindingBuilder.bind(logsQueue).to(exchange).with("app.logs.#");
    }

    @Bean
    Binding errorsBinding(Queue errorsQueue, TopicExchange exchange) {
        // 将 errorsQueue 绑定到交换机，只接收路由键为 "app.errors.*" 的消息
        return BindingBuilder.bind(errorsQueue).to(exchange).with("app.errors.#");
    }

    @Bean
    Binding allBinding(Queue allMessagesQueue, TopicExchange exchange) {
        // 将 allMessagesQueue 绑定到交换机，接收所有以 "app." 开头的消息
        return BindingBuilder.bind(allMessagesQueue).to(exchange).with("app.#");
    }
}
```
**路由键模式说明**:
*   `#` (hash) 匹配一个或多个词（用`.`分隔）。
*   `*` (star) 匹配一个词。

#### d. 创建消息生产者 (`MessageProducer.java`)
这个服务使用`RabbitTemplate`来发送消息。

```java
package com.example.rabbitmqdemo.producer;

import com.example.rabbitmqdemo.config.RabbitMQConfig;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

@Service
public class MessageProducer {

    private static final Logger log = LoggerFactory.getLogger(MessageProducer.class);
    private final RabbitTemplate rabbitTemplate;

    public MessageProducer(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    public void sendLogMessage(String message) {
        String routingKey = "app.logs.info";
        log.info("Sending message with routing key [{}]: {}", routingKey, message);
        rabbitTemplate.convertAndSend(RabbitMQConfig.TOPIC_EXCHANGE_NAME, routingKey, message);
    }
    
    public void sendErrorMessage(String message) {
        String routingKey = "app.errors.critical";
        log.info("Sending message with routing key [{}]: {}", routingKey, message);
        rabbitTemplate.convertAndSend(RabbitMQConfig.TOPIC_EXCHANGE_NAME, routingKey, message);
    }
}
```

#### e. 创建消息消费者 (`MessageConsumer.java`)
使用`@RabbitListener`注解来声明一个方法作为消息监听器。

```java
package com.example.rabbitmqdemo.consumer;

import com.example.rabbitmqdemo.config.RabbitMQConfig;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class MessageConsumer {

    private static final Logger log = LoggerFactory.getLogger(MessageConsumer.class);

    @RabbitListener(queues = RabbitMQConfig.LOGS_QUEUE_NAME)
    public void receiveLogMessage(String message) {
        log.info("[Listener for Logs] Received message: {}", message);
    }

    @RabbitListener(queues = RabbitMQConfig.ERRORS_QUEUE_NAME)
    public void receiveErrorMessage(String message) {
        log.info("[Listener for Errors] Received message: {}", message);
    }

    @RabbitListener(queues = RabbitMQConfig.ALL_MESSAGES_QUEUE_NAME)
    public void receiveAllMessage(String message) {
        log.info("[Listener for All Messages] Received message: {}", message);
    }
}
```

#### f. 创建一个控制器来触发消息发送 (`MessageController.java`)

```java
package com.example.rabbitmqdemo.controller;

import com.example.rabbitmqdemo.producer.MessageProducer;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class MessageController {

    private final MessageProducer messageProducer;

    public MessageController(MessageProducer messageProducer) {
        this.messageProducer = messageProducer;
    }

    @PostMapping("/log")
    public String sendLog(@RequestBody Map<String, String> payload) {
        messageProducer.sendLogMessage(payload.get("message"));
        return "Log message sent.";
    }

    @PostMapping("/error")
    public String sendError(@RequestBody Map<String, String> payload) {
        messageProducer.sendErrorMessage(payload.get("message"));
        return "Error message sent.";
    }
}
```

#### g. 如何运行和测试
1.  **准备RabbitMQ**:
    *   使用Docker启动RabbitMQ: `docker run -d --name rabbitmq-db -p 5672:5672 -p 15672:15672 rabbitmq:3-management`
2.  **运行应用**: 启动主应用类。应用启动后，你可以访问RabbitMQ管理界面 (`http://localhost:15672`，用户名密码都是`guest`)，在"Exchanges"和"Queues"标签页看到我们用代码声明的组件。
3.  **测试API并观察日志**:
    *   **发送日志消息**:
        ```bash
        curl -X POST http://localhost:8080/log -H "Content-Type: application/json" -d '{"message": "User logged in successfully"}'
        ```
        **观察控制台**: 你会看到两条接收日志：一条来自`[Listener for Logs]`，另一条来自`[Listener for All Messages]`。
    *   **发送错误消息**:
        ```bash
        curl -X POST http://localhost:8080/error -H "Content-Type: application/json" -d '{"message": "Database connection failed"}'
        ```
        **观察控制台**: 你会看到两条接收日志：一条来自`[Listener for Errors]`，另一条来自`[Listener for All Messages]`。
    *   这证明了Topic Exchange和路由键绑定正在按预期工作。

---

## 28. Apache Kafka

*   **官方网站**: [https://kafka.apache.org/](https://kafka.apache.org/)
*   **Spring for Apache Kafka 文档**: [https://spring.io/projects/spring-kafka](https://spring.io/projects/spring-kafka)
*   **简介**: 集成Apache Kafka，一个分布式事件流平台。它不仅仅是消息队列，更是为处理实时数据流而设计的，具有极高的吞吐量、持久性和可扩展性。常用于日志聚合、事件溯源和流处理。Spring Boot提供了`KafkaTemplate`和`@KafkaListener`简化了与Kafka的交互。

### 完整案例
本案例将演示如何发送和接收简单的字符串消息，以及如何发送和接收JSON格式的复杂对象消息。

#### a. Maven 依赖 (`pom.xml`)

```xml
        <!-- ... -->
        <dependency>
            <groupId>org.springframework.kafka</groupId>
            <artifactId>spring-kafka</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <!-- ... -->
```

#### b. 配置文件 (`src/main/resources/application.properties`)
配置Kafka的bootstrap服务器地址和消费者的默认组ID。

```properties
# Kafka Bootstrap 服务器地址
spring.kafka.bootstrap-servers=localhost:9092

# 消费者配置
spring.kafka.consumer.group-id=my-group
# 当没有初始偏移量或当前偏移量不存在时，从最早的记录开始消费
spring.kafka.consumer.auto-offset-reset=earliest
# 为JSON反序列化配置信任的包
spring.kafka.consumer.properties.spring.json.trusted.packages=*

# 生产者配置
# Key和Value的序列化器
spring.kafka.producer.key-serializer=org.apache.kafka.common.serialization.StringSerializer
spring.kafka.producer.value-serializer=org.springframework.kafka.support.serializer.JsonSerializer
```

#### c. 创建一个消息模型 (`Order.java`)

```java
package com.example.kafkademo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Order {
    private UUID orderId;
    private String customerId;
    private BigDecimal amount;
}
```

#### d. 创建消息生产者 (`OrderProducer.java`)
使用`KafkaTemplate`发送消息。

```java
package com.example.kafkademo.producer;

import com.example.kafkademo.model.Order;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class OrderProducer {

    private static final Logger log = LoggerFactory.getLogger(OrderProducer.class);
    public static final String TOPIC_NAME = "orders";

    private final KafkaTemplate<String, Order> kafkaTemplate;

    public OrderProducer(KafkaTemplate<String, Order> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void sendOrder(Order order) {
        log.info("Sending order to Kafka: {}", order);
        // 发送消息。第一个参数是Topic，第二个是Key（用于分区），第三个是Value。
        kafkaTemplate.send(TOPIC_NAME, order.getCustomerId(), order);
    }
}
```

#### e. 创建消息消费者 (`OrderConsumer.java`)
使用`@KafkaListener`注解来监听一个或多个Topic。

```java
package com.example.kafkademo.consumer;

import com.example.kafkademo.model.Order;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Component;

import static com.example.kafkademo.producer.OrderProducer.TOPIC_NAME;

@Component
public class OrderConsumer {

    private static final Logger log = LoggerFactory.getLogger(OrderConsumer.class);

    /**
     * 监听 "orders" topic
     * @param order 反序列化后的 Order 对象
     * @param key 消息的Key
     * @param partition 消息所在的分区
     * @param offset 消息的偏移量
     */
    @KafkaListener(topics = TOPIC_NAME, groupId = "order-processing-group")
    public void consumeOrder(
            @Payload Order order,
            @Header(KafkaHeaders.RECEIVED_KEY) String key,
            @Header(KafkaHeaders.RECEIVED_PARTITION) int partition,
            @Header(KafkaHeaders.OFFSET) long offset) {

        log.info("Received Order: {} | Key: {} | Partition: {} | Offset: {}",
                order, key, partition, offset);
        
        // 在这里处理订单业务逻辑...
    }
}
```

#### f. 创建一个控制器来触发消息发送 (`OrderController.java`)

```java
package com.example.kafkademo.controller;

import com.example.kafkademo.model.Order;
import com.example.kafkademo.producer.OrderProducer;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OrderController {

    private final OrderProducer orderProducer;

    public OrderController(OrderProducer orderProducer) {
        this.orderProducer = orderProducer;
    }

    @PostMapping("/orders")
    public String createOrder(@RequestBody Order order) {
        orderProducer.sendOrder(order);
        return "Order received and sent to Kafka.";
    }
}
```

#### g. 如何运行和测试
1.  **准备Kafka**:
    *   最简单的方法是使用Docker Compose。创建一个`docker-compose.yml`文件：
        ```yaml
        version: '3'
        services:
          zookeeper:
            image: confluentinc/cp-zookeeper:latest
            environment:
              ZOOKEEPER_CLIENT_PORT: 2181
              ZOOKEEPER_TICK_TIME: 2000
          kafka:
            image: confluentinc/cp-kafka:latest
            depends_on:
              - zookeeper
            ports:
              - 9092:9092
            environment:
              KAFKA_BROKER_ID: 1
              KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
              KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://kafka:29092,PLAINTEXT_HOST://localhost:9092
              KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: PLAINTEXT:PLAINTEXT,PLAINTEXT_HOST:PLAINTEXT
              KAFKA_INTER_BROKER_LISTENER_NAME: PLAINTEXT
              KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
        ```
    *   在文件所在目录运行 `docker-compose up -d`。
2.  **运行应用**: 启动主应用类。
3.  **测试API并观察日志**:
    *   **发送订单消息**:
        ```bash
        curl -X POST http://localhost:8080/orders \
        -H "Content-Type: application/json" \
        -d '{"orderId": "a1b2c3d4-e5f6-7890-1234-567890abcdef", "customerId": "customer-123", "amount": 99.99}'
        ```
    *   **观察控制台**: 你会立即看到生产者发送消息的日志，以及消费者接收并处理消息的日志，其中包含了消息内容、Key、Partition和Offset等详细信息。

---

## 29. JMS (Java Message Service) with ActiveMQ "Classic"

*   **官方网站 (ActiveMQ)**: [https://activemq.apache.org/](https://activemq.apache.org/)
*   **JMS 2.0 Spec**: [https://javaee.github.io/jms-spec/](https://javaee.github.io/jms-spec/)
*   **简介**: 为Java消息服务（JMS）API提供支持，这是Java EE中定义的消息传递标准。`spring-boot-starter-activemq`默认集成了Apache ActiveMQ "Classic"作为消息代理。Spring Boot会自动配置`JmsTemplate`和连接工厂，使得遵循JMS标准的消息收发变得简单。

### 完整案例
本案例将演示如何向一个JMS队列发送和接收文本消息。

#### a. Maven 依赖 (`pom.xml`)
`spring-boot-starter-activemq` 会自动引入JMS API和ActiveMQ客户端。

```xml
        <!-- ... -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-activemq</artifactId>
        </dependency>
        <!-- ... -->
```

#### b. 配置文件 (`src/main/resources/application.properties`)
配置ActiveMQ的Broker URL。Spring Boot的ActiveMQ starter非常智能，如果它在classpath中找到了ActiveMQ broker，并且没有配置`broker-url`，它甚至会自动启动一个嵌入式的Broker。

```properties
# ActiveMQ Broker URL
spring.activemq.broker-url=tcp://localhost:61616

# 如果你想让Spring Boot启动一个嵌入式Broker
# spring.activemq.in-memory=true
```

#### c. 创建消息生产者 (`JmsMessageProducer.java`)
使用`JmsTemplate`发送消息。

```java
package com.example.jmsdemo.producer;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@EnableScheduling
public class JmsMessageProducer {

    private static final Logger log = LoggerFactory.getLogger(JmsMessageProducer.class);
    public static final String DESTINATION_NAME = "mailbox-queue";
    
    private final JmsTemplate jmsTemplate;

    public JmsMessageProducer(JmsTemplate jmsTemplate) {
        this.jmsTemplate = jmsTemplate;
    }

    // 每5秒发送一条消息
    @Scheduled(fixedRate = 5000)
    public void sendMessage() {
        String message = "Hello from JMS at " + LocalDateTime.now();
        log.info("Sending message: '{}' to destination: {}", message, DESTINATION_NAME);
        // convertAndSend 会自动将Java对象转换为JMS Message
        jmsTemplate.convertAndSend(DESTINATION_NAME, message);
    }
}
```

#### d. 创建消息消费者 (`JmsMessageConsumer.java`)
使用`@JmsListener`注解来监听一个JMS目的地（队列或主题）。

```java
package com.example.jmsdemo.consumer;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.stereotype.Component;

import static com.example.jmsdemo.producer.JmsMessageProducer.DESTINATION_NAME;

@Component
public class JmsMessageConsumer {
    private static final Logger log = LoggerFactory.getLogger(JmsMessageConsumer.class);

    @JmsListener(destination = DESTINATION_NAME)
    public void receiveMessage(String message) {
        log.info("Received message from JMS queue: '{}'", message);
    }
}
```

#### e. 如何运行和测试
1.  **准备ActiveMQ**:
    *   使用Docker启动ActiveMQ "Classic": `docker run -d --name activemq-db -p 61616:61616 -p 8161:8161 rmohr/activemq`
2.  **运行应用**: 启动主应用类。
3.  **观察控制台日志**: 应用启动后，你会看到`JmsMessageProducer`每隔5秒发送一条消息，`JmsMessageConsumer`几乎同时就会接收到并打印出来。
4.  **访问ActiveMQ Web控制台**:
    *   打开浏览器访问 `http://localhost:8161/`，点击 "Manage ActiveMQ broker"。
    *   用户名和密码都是`admin`。
    *   点击 "Queues"，你会看到一个名为`mailbox-queue`的队列。你可以看到消息的数量、入队和出队的速率等信息。


---

## 30. ActiveMQ Artemis

*   **官方网站 (ActiveMQ Artemis)**: [https://activemq.apache.org/components/artemis/](https://activemq.apache.org/components/artemis/)
*   **简介**: 集成ActiveMQ Artemis，这是Apache的下一代高性能异步消息代理。它支持JMS 2.0以及AMQP、MQTT等多种协议，拥有非阻塞的核心架构。对于追求更高性能和现代特性的新项目，Artemis是一个优秀的选择。
*   **注意**: Spring Boot 通过 `spring-boot-starter-artemis` 提供对 Artemis 的集成。它同样实现了JMS标准，所以代码层面与使用 ActiveMQ "Classic" 非常相似，但性能和特性更优。

### 完整案例
本案例将演示如何使用JMS 2.0 API（通过Artemis实现）发送和接收消息，并利用Artemis的特性自动创建队列。

#### a. Maven 依赖 (`pom.xml`)

```xml
        <!-- ... -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-artemis</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <!-- ... -->
```

#### b. 配置文件 (`src/main/resources/application.properties`)
配置Artemis的连接模式和Broker地址。Artemis支持`native`（核心协议）和`embedded`模式。

```properties
# Artemis 连接模式，可以是 native 或 embedded
spring.artemis.mode=native
# Broker URL
spring.artemis.broker-url=tcp://localhost:61616
# 用户名和密码
spring.artemis.user=admin
spring.artemis.password=admin

# (可选) Artemis的一个强大特性：自动创建队列
# spring.jms.template.default-destination=example.queue
# spring.artemis.embedded.queues=example.queue
```

#### c. 创建一个JMS配置类 (`ArtemisConfig.java`)
虽然Artemis可以自动创建队列，但通过配置类显式声明更符合基础设施即代码的理念。这里我们使用`JmsComponent`来创建一个JMS队列Bean。

```java
package com.example.artemisdemo.config;

import jakarta.jms.Queue;
import org.apache.activemq.artemis.jms.client.ActiveMQQueue;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ArtemisConfig {

    public static final String NOTIFICATION_QUEUE = "notification.queue";

    @Bean
    public Queue notificationQueue() {
        // 创建一个指向特定队列的JMS Queue对象
        return new ActiveMQQueue(NOTIFICATION_QUEUE);
    }
}
```

#### d. 创建消息生产者 (`NotificationProducer.java`)
使用标准的`JmsTemplate`来发送消息。

```java
package com.example.artemisdemo.producer;

import com.example.artemisdemo.config.ArtemisConfig;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Service;

@Service
public class NotificationProducer {

    private static final Logger log = LoggerFactory.getLogger(NotificationProducer.class);
    private final JmsTemplate jmsTemplate;

    public NotificationProducer(JmsTemplate jmsTemplate) {
        this.jmsTemplate = jmsTemplate;
    }

    public void sendNotification(String notification) {
        log.info("Sending notification: '{}'", notification);
        jmsTemplate.convertAndSend(ArtemisConfig.NOTIFICATION_QUEUE, notification);
    }
}
```

#### e. 创建消息消费者 (`NotificationConsumer.java`)
使用标准的`@JmsListener`注解来监听队列。

```java
package com.example.artemisdemo.consumer;

import com.example.artemisdemo.config.ArtemisConfig;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.stereotype.Component;

@Component
public class NotificationConsumer {

    private static final Logger log = LoggerFactory.getLogger(NotificationConsumer.class);

    @JmsListener(destination = ArtemisConfig.NOTIFICATION_QUEUE)
    public void receiveNotification(String notification) {
        log.info("Received notification: '{}'. Processing...", notification);
        // 模拟处理耗时
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        log.info("Notification processed.");
    }
}
```

#### f. 创建一个控制器来触发消息发送 (`NotificationController.java`)

```java
package com.example.artemisdemo.controller;

import com.example.artemisdemo.producer.NotificationProducer;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class NotificationController {

    private final NotificationProducer producer;

    public NotificationController(NotificationProducer producer) {
        this.producer = producer;
    }

    @PostMapping("/notify")
    public String notify(@RequestBody Map<String, String> payload) {
        producer.sendNotification(payload.get("message"));
        return "Notification sent.";
    }
}
```

#### g. 如何运行和测试
1.  **准备Artemis**:
    *   使用Docker启动Artemis: `docker run -d --name artemis-db -e ARTEMIS_USER=admin -e ARTEMIS_PASSWORD=admin -p 61616:61616 -p 8161:8161 apache/activemq-artemis`
2.  **运行应用**: 启动主应用类。
3.  **测试API**:
    *   **发送通知**:
        ```bash
        curl -X POST http://localhost:8080/notify -H "Content-Type: application/json" -d '{"message": "Your order #123 has shipped!"}'
        ```
    *   **观察控制台日志**: 你会看到生产者发送消息的日志，一秒钟后，消费者会打印出接收和处理完成的日志。
4.  **访问Artemis Web控制台**:
    *   打开浏览器访问 `http://localhost:8161/`。
    *   使用用户名`admin`和密码`admin`登录。
    *   在控制台中，你可以看到名为`notification.queue`的队列及其状态。

---

## 31. Spring Integration

*   **官方网站**: [https://spring.io/projects/spring-integration](https://spring.io/projects/spring-integration)
*   **GitHub**: [https://github.com/spring-projects/spring-integration](https://github.com/spring-projects/spring-integration)
*   **简介**: 集成Spring Integration框架，它实现了经典的“企业集成模式”（EIP）。该框架提供了一套轻量级的消息驱动架构，通过各种适配器（Adapter）、通道（Channel）、转换器（Transformer）等组件，可以轻松地将异构系统连接起来，非常适合构建复杂的数据管道和集成流程。

### 完整案例
本案例将构建一个文件处理管道：
1.  **文件输入适配器**: 监控一个输入目录。
2.  **通道**: 当新文件出现时，消息（包含文件内容）被发送到通道。
3.  **服务激活器**: 消费通道中的消息，将文件内容转换为大写。
4.  **文件输出适配器**: 将转换后的内容写入一个输出目录。

#### a. Maven 依赖 (`pom.xml`)
Spring Integration有许多模块，我们按需引入。

```xml
        <!-- ... -->
        <!-- 核心Spring Integration依赖 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-integration</artifactId>
        </dependency>
        <!-- 文件集成模块，提供了文件输入/输出适配器 -->
        <dependency>
            <groupId>org.springframework.integration</groupId>
            <artifactId>spring-integration-file</artifactId>
        </dependency>
        <!-- ... -->
```

#### b. 配置文件 (`src/main/resources/application.properties`)
定义文件处理的输入和输出目录。

```properties
# 文件处理目录
file.processing.input-dir=data/input
file.processing.output-dir=data/output
```

#### c. 创建Spring Integration流程 (`FileProcessingIntegrationFlow.java`)
Spring Integration 5+ 推荐使用Java DSL（领域特定语言）来定义集成流程，这比XML配置更简洁、更类型安全。

```java
package com.example.integrationdemo.flow;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.integration.dsl.IntegrationFlow;
import org.springframework.integration.dsl.Pollers;
import org.springframework.integration.file.dsl.Files;
import org.springframework.integration.file.support.FileExistsMode;

import java.io.File;

@Configuration
public class FileProcessingIntegrationFlow {

    @Value("${file.processing.input-dir}")
    private String inputDirectory;

    @Value("${file.processing.output-dir}")
    private String outputDirectory;

    @Bean
    public IntegrationFlow fileProcessingFlow() {
        return IntegrationFlow
                // 1. Inbound Channel Adapter: 从文件系统读取文件
                .from(Files.inboundAdapter(new File(inputDirectory))
                                .autoCreateDirectory(true) // 如果目录不存在则创建
                                .preventDuplicates(true), // 防止处理重复的文件
                        // 设置轮询器，每5秒检查一次目录
                        e -> e.poller(Pollers.fixedDelay(5000)))
                
                // 2. Transformer: 将文件内容（默认为byte[]）转换为字符串
                .transform(Files.toStringTransformer())

                // 3. Service Activator: 对消息负载（即文件内容）进行处理
                //    这里使用Lambda表达式，将字符串转换为大写
                .<String, String>transform(String::toUpperCase)

                // 4. Outbound Channel Adapter: 将处理后的内容写入文件系统
                .handle(Files.outboundAdapter(new File(outputDirectory))
                        .autoCreateDirectory(true)
                        .fileExistsMode(FileExistsMode.REPLACE) // 如果文件已存在则替换
                        .fileNameGenerator(message ->
                                // 自定义输出文件名，在原文件名后加上 ".processed"
                                message.getHeaders().get("file_originalFile", File.class).getName() + ".processed"
                        ))
                .get(); // 构建并返回IntegrationFlow
    }
}
```

#### d. 如何运行和测试
1.  **运行应用**: 启动主应用类。
2.  **准备目录**: 在你的项目根目录下，手动创建 `data/input` 目录。`data/output` 目录会在第一次写入时自动创建。
3.  **创建测试文件**:
    *   在 `data/input` 目录下，创建一个名为 `test.txt` 的文本文件。
    *   在文件中输入一些内容，例如: `Hello Spring Integration!`
    *   保存文件。
4.  **观察结果**:
    *   在最多5秒内（由轮询器间隔决定），Spring Integration会检测到新文件。
    *   **控制台日志**: 你可能会看到一些关于文件处理的日志。
    *   **检查输出目录**: 查看 `data/output` 目录。你会发现一个名为 `test.txt.processed` 的新文件。
    *   **检查文件内容**: 打开 `test.txt.processed`，你会看到内容已经被转换为了大写：`HELLO SPRING INTEGRATION!`
    *   **检查输入目录**: `test.txt` 文件已经被从 `data/input` 目录中删除（这是文件输入适配器的默认行为，表示文件已被处理）。
5.  **重复测试**: 你可以不断地向 `data/input` 目录中放入新的文本文件，它们都会被自动地处理并输出到 `data/output` 目录。

---

## 32. Spring Security

*   **官方网站**: [https://spring.io/projects/spring-security](https://spring.io/projects/spring-security)
*   **简介**: 这是为Spring应用添加认证（Authentication）和授权（Authorization）支持的核心启动器。一旦引入，它会默认启用HTTP Basic认证并保护所有端点。它高度可配置，支持表单登录、OAuth2、JWT、LDAP等多种安全机制，是保护Web应用和API的首选。

### 完整案例
本案例将演示如何配置一个简单的、基于内存用户的Spring Security，包含以下特性：
*   一个公共API (`/api/public`)
*   一个需要用户登录后才能访问的API (`/api/user`)
*   一个只有`ADMIN`角色的用户才能访问的API (`/api/admin`)
*   使用基于表单的登录页面。

#### a. Maven 依赖 (`pom.xml`)

```xml
        <!-- ... -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-security</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <!-- ... -->
```

#### b. 创建一个安全配置类 (`SecurityConfig.java`)
这是配置Spring Security的核心。我们使用`@Configuration`和`@EnableWebSecurity`注解，并定义一个`SecurityFilterChain` Bean来定制安全规则。

```java
package com.example.securitydemo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // 配置请求授权规则
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/api/public/**").permitAll() // /api/public下的所有路径都允许访问
                        .requestMatchers("/api/user/**").hasAnyRole("USER", "ADMIN") // /api/user需要USER或ADMIN角色
                        .requestMatchers("/api/admin/**").hasRole("ADMIN") // /api/admin需要ADMIN角色
                        .anyRequest().authenticated() // 其他所有请求都需要认证
                )
                // 启用基于表单的登录，使用默认的登录页面
                .formLogin(Customizer.withDefaults())
                // 启用HTTP Basic认证
                .httpBasic(Customizer.withDefaults());

        return http.build();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        // 创建一个普通用户
        UserDetails user = User.builder()
                .username("user")
                .password(passwordEncoder().encode("password"))
                .roles("USER")
                .build();

        // 创建一个管理员用户
        UserDetails admin = User.builder()
                .username("admin")
                .password(passwordEncoder().encode("adminpass"))
                .roles("ADMIN", "USER") // 管理员通常也拥有普通用户的角色
                .build();

        // 使用内存用户详情管理器
        return new InMemoryUserDetailsManager(user, admin);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        // 使用BCrypt进行密码加密，这是目前推荐的密码编码器
        return new BCryptPasswordEncoder();
    }
}
```

#### c. 创建一些受保护的控制器 (`ApiController.java`)

```java
package com.example.securitydemo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/api")
public class ApiController {

    @GetMapping("/public")
    public String publicEndpoint() {
        return "This is a public endpoint, anyone can access it.";
    }

    @GetMapping("/user")
    public String userEndpoint(Principal principal) {
        // Principal对象包含了当前登录用户的信息
        return "Hello, " + principal.getName() + "! You have access to the USER endpoint.";
    }

    @GetMapping("/admin")
    public String adminEndpoint(Principal principal) {
        return "Welcome, " + principal.getName() + "! You have access to the ADMIN endpoint.";
    }
}
```

#### d. 如何运行和测试
1.  **运行应用**: 启动主应用类。
2.  **测试公共端点**:
    *   在浏览器或使用`curl`访问 `http://localhost:8080/api/public`。
    *   你会直接看到成功响应，无需登录。
3.  **测试受保护的用户端点**:
    *   访问 `http://localhost:8080/api/user`。
    *   你会自动被重定向到Spring Security默认的登录页面。
    *   输入用户名`user`和密码`password`，点击登录。
    *   登录成功后，你会看到 "Hello, user!..." 的响应。
4.  **测试受保护的管理员端点 (作为普通用户)**:
    *   保持`user`用户的登录状态，尝试访问 `http://localhost:8080/api/admin`。
    *   你会看到一个HTTP 403 Forbidden（禁止访问）的错误页面，因为`user`没有`ADMIN`角色。
5.  **测试受保护的管理员端点 (作为管理员)**:
    *   首先需要注销。默认的注销URL是 `/logout`。访问 `http://localhost:8080/logout`。
    *   再次访问 `http://localhost:8080/api/admin`。
    *   在登录页面，输入用户名`admin`和密码`adminpass`。
    *   登录成功后，你会看到 "Welcome, admin!..." 的响应。


---

## 33. OAuth2 Client

*   **官方文档**: [https://docs.spring.io/spring-security/reference/servlet/oauth2/client/index.html](https://docs.spring.io/spring-security/reference/servlet/oauth2/client/index.html)
*   **简介**: 让你的应用能够作为一个OAuth2/OpenID Connect 1.0 (OIDC)客户端。这主要用于实现第三方登录功能，例如“使用Google/GitHub/Okta登录”。它封装了所有繁琐的重定向和令牌交换流程，让开发者可以轻松地集成外部身份提供商。

### 完整案例
本案例将演示如何配置Spring Boot应用，以允许用户通过GitHub账号进行登录。

#### a. 在GitHub上创建OAuth2 App
1.  登录你的GitHub账号。
2.  进入 **Settings** -> **Developer settings** -> **OAuth Apps**。
3.  点击 **New OAuth App**。
4.  填写表单：
    *   **Application name**: `Spring Boot OAuth2 Demo` (或任何你喜欢的名字)
    *   **Homepage URL**: `http://localhost:8080`
    *   **Authorization callback URL**: `http://localhost:8080/login/oauth2/code/github`
        *   这个URL非常重要，格式是 `{baseUrl}/login/oauth2/code/{registrationId}`。`github`是Spring Security为GitHub提供的默认`registrationId`。
5.  点击 **Register application**。
6.  在应用页面，你会看到 **Client ID**。点击 **Generate a new client secret** 生成一个 **Client Secret**。**请务必妥善保管Client Secret，不要泄露。**

#### b. Maven 依赖 (`pom.xml`)

```xml
        <!-- ... -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-oauth2-client</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-security</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <!-- Thymeleaf用于创建简单的登录和主页 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-thymeleaf</artifactId>
        </dependency>
        <!-- ... -->
```

#### c. 配置文件 (`src/main/resources/application.properties`)
将你在GitHub上获取的Client ID和Client Secret配置在这里。

```properties
# OAuth2 Client 配置
spring.security.oauth2.client.registration.github.client-id=YOUR_GITHUB_CLIENT_ID
spring.security.oauth2.client.registration.github.client-secret=YOUR_GITHUB_CLIENT_SECRET
```

#### d. 创建一个安全配置类 (`SecurityConfig.java`)
这个配置非常简单，我们只需告诉Spring Security启用OAuth2登录即可。

```java
package com.example.oauth2clientdemo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/", "/login**", "/error**").permitAll() // 允许访问首页、登录相关和错误页面
                        .anyRequest().authenticated() // 其他所有请求都需要认证
                )
                // 启用OAuth2登录，并使用默认配置
                .oauth2Login(withDefaults());
        
        return http.build();
    }
}
```

#### e. 创建一个控制器和视图 (`HomeController.java` 和 `home.html`)
**HomeController.java**

```java
package com.example.oauth2clientdemo.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/")
    public String home(Model model, @AuthenticationPrincipal OAuth2User principal) {
        if (principal != null) {
            // 如果用户已登录，从principal中获取属性并添加到Model
            model.addAttribute("name", principal.getAttribute("name"));
            model.addAttribute("avatar_url", principal.getAttribute("avatar_url"));
        }
        return "home"; // 返回home.html模板
    }
}
```

**`src/main/resources/templates/home.html`**

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org" xmlns:sec="http://www.thymeleaf.org/extras/spring-security">
<head>
    <title>OAuth2 Client Demo</title>
</head>
<body>
    <h1>Welcome to the OAuth2 Client Demo</h1>

    <!-- sec:authorize="isAnonymous()" 表示只有匿名用户能看到这部分 -->
    <div sec:authorize="isAnonymous()">
        <p>To access secured content, please log in.</p>
        <!-- Spring Security会自动生成这个登录链接 -->
        <a href="/oauth2/authorization/github">Log in with GitHub</a>
    </div>

    <!-- sec:authorize="isAuthenticated()" 表示只有认证用户能看到这部分 -->
    <div sec:authorize="isAuthenticated()">
        <p>You are logged in!</p>
        <p>Name: <b th:text="${name}"></b></p>
        <p>Avatar: <img th:src="${avatar_url}" width="50" height="50"/></p>
        
        <!-- 注销表单 -->
        <form th:action="@{/logout}" method="post">
            <input type="submit" value="Log Out"/>
        </form>
    </div>

</body>
</html>
```

#### f. 如何运行和测试
1.  **运行应用**: 启动主应用类。
2.  **访问首页**: 在浏览器中打开 `http://localhost:8080`。
    *   你会看到欢迎信息和一个 "Log in with GitHub" 的链接。
3.  **点击登录链接**:
    *   你会被重定向到GitHub的授权页面，要求你授权`Spring Boot OAuth2 Demo`应用访问你的个人信息。
    *   点击 **Authorize**。
4.  **重定向回应用**:
    *   GitHub会把你重定向回之前配置的回调URL (`http://localhost:8080/login/oauth2/code/github`)。
    *   Spring Security的OAuth2客户端会自动处理`code`，用它向GitHub交换access token，然后再用token获取用户信息。
    *   最终，你会回到首页，但这次页面会显示你的GitHub用户名和头像，以及一个 "Log Out" 按钮。

---

## 34. OAuth2 Resource Server

*   **官方文档**: [https://docs.spring.io/spring-security/reference/servlet/oauth2/resource-server/index.html](https://docs.spring.io/spring-security/reference/servlet/oauth2/resource-server/index.html)
*   **简介**: 将你的应用配置为一个OAuth2资源服务器。其核心职责是保护API端点，要求客户端在请求时必须提供一个有效的访问令牌（Access Token）。它支持对不透明令牌（Opaque Tokens）的内省和对JWT（JSON Web Tokens）的本地校验，是构建受保护微服务的关键。

### 完整案例
本案例将创建一个受保护的API资源服务器，它将使用JWT（JSON Web Token）作为访问令牌。我们将使用一个外部的认证服务器（如Okta、Keycloak或Auth0）来签发JWT。为了简化，我们假设已经从认证服务器获得了一个有效的JWT。

#### a. 准备认证服务器和JWT
你需要一个支持OIDC的认证服务器来签发JWT。一个简单的方法是使用[Okta的免费开发者账号](https://developer.okta.com/)。
1.  注册并登录Okta。
2.  在左侧菜单，进入 **Applications** -> **Applications**，点击 **Create App Integration**。
3.  选择 **OIDC - OpenID Connect**，应用类型选择 **Single-Page Application**。
4.  配置应用，记下 **Client ID**。
5.  进入 **Security** -> **API**，在`default`授权服务器的 **Settings** 标签页，记下 **Issuer URI**。这个URI通常是 `https://<your-okta-domain>/oauth2/default`。

#### b. Maven 依赖 (`pom.xml`)

```xml
        <!-- ... -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-oauth2-resource-server</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-security</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <!-- ... -->
```

#### c. 配置文件 (`src/main/resources/application.properties`)
配置JWT签发者的URI。Spring Security会使用这个URI去获取公钥（JWKS），用于验证JWT的签名。

```properties
# OAuth2 Resource Server 配置
# 配置JWT签发者的URI，这是验证JWT签名的关键
spring.security.oauth2.resourceserver.jwt.issuer-uri=https://<your-okta-domain>/oauth2/default
```

#### d. 创建一个安全配置类 (`ResourceServerConfig.java`)
配置非常简洁。我们定义哪些端点需要什么样的权限（scope）。

```java
package com.example.resourceserverdemo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class ResourceServerConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(authorize -> authorize
                        // 访问 /api/messages 需要 'read' 权限 (scope)
                        .requestMatchers("/api/messages").hasAuthority("SCOPE_read")
                        // 访问 /api/admin/messages 需要 'admin' 权限 (scope)
                        .requestMatchers("/api/admin/messages").hasAuthority("SCOPE_admin")
                        .anyRequest().authenticated()
                )
                // 启用JWT作为资源服务器的认证机制
                .oauth2ResourceServer(oauth2 -> oauth2.jwt());
        
        return http.build();
    }
}
```
**权限说明**:
*   `hasAuthority("SCOPE_read")`检查JWT中的`scp`（scope）声明是否包含`read`。

#### e. 创建一个受保护的控制器 (`MessagesController.java`)

```java
package com.example.resourceserverdemo.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class MessagesController {

    @GetMapping("/api/messages")
    public Map<String, String> getMessages() {
        return Map.of("message", "This is a protected message for users with 'read' scope.");
    }

    @GetMapping("/api/admin/messages")
    public Map<String, String> getAdminMessages(@AuthenticationPrincipal Jwt jwt) {
        // @AuthenticationPrincipal可以注入解析后的Jwt对象，从中获取声明
        return Map.of(
            "message", "This is a protected message for admins.",
            "user_id", jwt.getClaimAsString("sub")
        );
    }
}
```

#### f. 如何运行和测试
1.  **获取一个有效的JWT**: 这是测试中最棘手的一步。
    *   **方法一 (使用工具)**: 可以使用像 [oidcdebugger.com](https://oidcdebugger.com/) 这样的在线工具，输入你的Okta认证服务器信息（Issuer URI, Client ID等），完成授权流程后，它会给你一个access token (JWT)。
    *   **方法二 (自己构建客户端)**: 创建一个简单的客户端应用（如上一个OAuth2 Client案例），登录后从网络请求中捕获access token。
2.  **运行资源服务器应用**: 启动主应用类。
3.  **使用`curl`测试API**:
    *   **不带令牌的请求 (会失败)**:
        `curl http://localhost:8080/api/messages`
        响应会是 `HTTP 401 Unauthorized`。
    *   **带有效令牌的请求 (会成功)**:
        将你获取到的JWT替换下面的`YOUR_JWT_TOKEN`。
        ```bash
        curl -H "Authorization: Bearer YOUR_JWT_TOKEN" http://localhost:8080/api/messages
        ```
        如果你的JWT包含了`read` scope，你会看到成功的JSON响应。
    *   **访问需要admin权限的端点**:
        ```bash
        curl -H "Authorization: Bearer YOUR_JWT_TOKEN" http://localhost:8080/api/admin/messages
        ```
        这个请求只有在你的JWT包含了`admin` scope时才会成功，否则会返回 `HTTP 403 Forbidden`。

---

## 35. LDAP

*   **官方网站 (Spring Security LDAP)**: [https://docs.spring.io/spring-security/reference/servlet/authentication/passwords/ldap.html](https://docs.spring.io/spring-security/reference/servlet/authentication/passwords/ldap.html)
*   **简介**: 提供与LDAP（轻量级目录访问协议）服务器的集成。这在企业环境中非常常见，用于将应用的认证和用户管理委托给中央目录服务，如Microsoft Active Directory或OpenLDAP。Spring Boot可以自动配置LDAP认证和`LdapTemplate`。

### 完整案例
本案例将配置Spring Security，使其通过一个嵌入式的内存LDAP服务器进行用户认证。这避免了需要搭建一个真实的LDAP服务器来进行开发和测试。

#### a. Maven 依赖 (`pom.xml`)

```xml
        <!-- ... -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-security</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <!-- LDAP集成核心依赖 -->
        <dependency>
            <groupId>org.springframework.ldap</groupId>
            <artifactId>spring-ldap-core</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.security</groupId>
            <artifactId>spring-security-ldap</artifactId>
        </dependency>
        <!-- 嵌入式内存LDAP服务器 -->
        <dependency>
            <groupId>com.unboundid</groupId>
            <artifactId>unboundid-ldapsdk</artifactId>
            <scope>test</scope> <!-- 通常只在测试时使用 -->
        </dependency>
        <!-- ... -->
```

#### b. 配置文件 (`src/main/resources/application.properties`)
配置LDAP服务器的URL和用户/组的搜索基准DN（Distinguished Name）。

```properties
# LDAP 配置
spring.ldap.urls=ldap://localhost:8389
spring.ldap.base=dc=springframework,dc=org
# 以下配置用于连接LDAP服务器进行搜索，如果LDAP允许匿名绑定，则可以不配
# spring.ldap.username=cn=admin,dc=...
# spring.ldap.password=...
```

#### c. 创建一个安全配置类 (`SecurityConfig.java`)
这里我们将配置Spring Security使用LDAP进行认证，并定义用户搜索和组搜索的规则。

```java
package com.example.ldapdemo.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    protected void configure(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(authorize -> authorize.anyRequest().fullyAuthenticated())
            .formLogin();
    }
    
    // Spring Boot 2.x风格的配置，在3.x中需要通过 UserDetailsService 和 LdapAuthenticationProvider Bean 来实现
    // 这里为了演示清晰，使用旧的配置风格
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth
            .ldapAuthentication()
                // 用户搜索配置
                .userDnPatterns("uid={0},ou=people") // {0} 会被替换为用户输入的用户名
                // 组搜索配置
                .groupSearchBase("ou=groups")
                // 密码编码器
                .passwordCompare()
                    .passwordEncoder(new BCryptPasswordEncoder())
                    .passwordAttribute("userPassword");
    }
}
```
**注意**: 上述 `configure(AuthenticationManagerBuilder auth)` 的配置方式在Spring Boot 3.x中已被弃用。在3.x中，你需要创建 `LdapAuthenticationProvider` Bean。但为了演示LDAP的核心概念，这种方式更直观。

#### d. 创建一个嵌入式LDAP服务器配置 (`src/main/resources/schema.ldif`)
这个`ldif`文件定义了我们的LDAP目录结构和数据，Spring Boot会自动加载它来初始化嵌入式LDAP服务器。

```ldif
# Base
dn: dc=springframework,dc=org
objectclass: top
objectclass: domain

# Groups
dn: ou=groups,dc=springframework,dc=org
objectclass: top
objectclass: organizationalUnit
ou: groups

# People
dn: ou=people,dc=springframework,dc=org
objectclass: top
objectclass: organizationalUnit
ou: people

# Group: users
dn: cn=users,ou=groups,dc=springframework,dc=org
objectclass: top
objectclass: groupOfNames
cn: users
member: uid=ben,ou=people,dc=springframework,dc=org

# User: ben
dn: uid=ben,ou=people,dc=springframework,dc=org
objectclass: top
objectclass: person
objectclass: organizationalPerson
objectclass: inetOrgPerson
cn: Ben Alex
sn: Alex
uid: ben
userPassword: {bcrypt}$2a$10$3s4UjUnm/2y4n0Yf8p4e9eP0adUeDHY.p2b1DILN5z5.cKz4Zq2oO
# 上面的密码是 "benspassword" 的BCrypt哈希值
```

#### e. 创建一个简单的受保护控制器 (`HomeController.java`)

```java
package com.example.ldapdemo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {
    @GetMapping("/")
    public String index() {
        return "Welcome to the LDAP-secured page!";
    }
}
```

#### f. 如何运行和测试
1.  **运行应用**: 启动主应用类。由于`unboundid-ldapsdk`在classpath上，Spring Boot会自动启动一个嵌入式的LDAP服务器，监听在8389端口，并加载`schema.ldif`文件。
2.  **访问首页**: 在浏览器中打开 `http://localhost:8080/`。
3.  **登录**: 你会被重定向到登录页面。
    *   输入用户名 `ben` 和密码 `benspassword`。
    *   点击登录。
4.  **查看结果**: 登录成功后，你会看到 "Welcome to the LDAP-secured page!" 的消息。这证明Spring Security成功地连接到LDAP服务器，找到了`ben`用户，并验证了他提供的密码。



## 九、 云原生与微服务 (Cloud Native & Microservices)

### 1. Spring Cloud Config

*   **简介**: 提供分布式应用的外部化配置支持。Config Server是一个独立的微服务，用于集中管理所有环境的配置文件（通常存储在Git、SVN或本地文件系统）。客户端应用在启动时会从Config Server拉取自己的配置。
*   **官网/源码地址**:
    *   **Spring Cloud Config 项目主页**: [https://spring.io/projects/spring-cloud-config](https://spring.io/projects/spring-cloud-config)
    *   **GitHub 源码**: [https://github.com/spring-cloud/spring-cloud-config](https://github.com/spring-cloud/spring-cloud-config)

*   **完整案例**:
    我们将创建一个配置中心（Config Server）和一个客户端应用（Config Client）。

    **步骤 1: 创建配置存储的 Git 仓库**
    在 GitHub 或 Gitee 上创建一个公开的 Git 仓库。在该仓库的根目录下，创建一个名为 `config-client-dev.yml` 的文件，内容如下：
    ```yaml
    message:
      from: git-repository
      content: "Hello from the development profile in Git!"
    ```
    这个文件代表了名为 `config-client` 的应用在 `dev` 环境下的配置。

    **步骤 2: 创建 Config Server 应用**
    创建一个新的 Spring Boot 项目 `config-server`。

    *   **`pom.xml` 依赖**:
        ```xml
        <dependencies>
            <dependency>
                <groupId>org.springframework.cloud</groupId>
                <artifactId>spring-cloud-config-server</artifactId>
            </dependency>
            <!-- Spring Cloud 依赖管理 -->
            <dependencyManagement>
                <dependencies>
                    <dependency>
                        <groupId>org.springframework.cloud</groupId>
                        <artifactId>spring-cloud-dependencies</artifactId>
                        <version>2022.0.4</version> <!-- 请使用与你的Spring Boot版本兼容的版本 -->
                        <type>pom</type>
                        <scope>import</scope>
                    </dependency>
                </dependencies>
            </dependencyManagement>
        </dependencies>
        ```

    *   **`src/main/java/.../ConfigServerApplication.java`**:
        ```java
        import org.springframework.boot.SpringApplication;
        import org.springframework.boot.autoconfigure.SpringBootApplication;
        import org.springframework.cloud.config.server.EnableConfigServer;

        @SpringBootApplication
        @EnableConfigServer // 启用配置中心功能
        public class ConfigServerApplication {
            public static void main(String[] args) {
                SpringApplication.run(ConfigServerApplication.class, args);
            }
        }
        ```

    *   **`src/main/resources/application.yml`**:
        ```yaml
        server:
          port: 8888 # 配置中心端口

        spring:
          cloud:
            config:
              server:
                git:
                  uri: https://github.com/your-username/your-config-repo.git # 替换为你的Git仓库地址
                  clone-on-start: true
        ```

    **步骤 3: 创建 Config Client 应用**
    创建另一个 Spring Boot 项目 `config-client`。

    *   **`pom.xml` 依赖**:
        ```xml
        <dependencies>
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-starter-web</artifactId>
            </dependency>
            <dependency>
                <groupId>org.springframework.cloud</groupId>
                <artifactId>spring-cloud-starter-config</artifactId>
            </dependency>
            <!-- 同样需要 Spring Cloud 依赖管理 -->
        </dependencies>
        ```

    *   **`src/main/resources/application.yml`**:
        此文件用于指定应用名和环境，但连接配置服务器的信息现在推荐放在`spring.config.import`中。
        ```yaml
        spring:
          application:
            name: config-client # 应用名，需要匹配Git仓库中的配置文件名
          profiles:
            active: dev # 激活dev环境
          config:
            import: "configserver:http://localhost:8888" # 从配置中心导入配置
        ```

    *   **`src/main/java/.../ConfigClientApplication.java`**:
        ```java
        import org.springframework.beans.factory.annotation.Value;
        import org.springframework.boot.SpringApplication;
        import org.springframework.boot.autoconfigure.SpringBootApplication;
        import org.springframework.web.bind.annotation.GetMapping;
        import org.springframework.web.bind.annotation.RestController;

        @SpringBootApplication
        @RestController
        public class ConfigClientApplication {

            // 从配置中心注入属性
            @Value("${message.content}")
            private String messageContent;

            @Value("${message.from}")
            private String messageFrom;

            public static void main(String[] args) {
                SpringApplication.run(ConfigClientApplication.class, args);
            }

            @GetMapping("/message")
            public String getMessage() {
                return String.format("Message from '%s': %s", messageFrom, messageContent);
            }
        }
        ```

    **步骤 4: 运行与测试**
    1.  启动 `ConfigServerApplication`。
    2.  启动 `ConfigClientApplication`。
    3.  在浏览器或使用 curl 访问 `http://localhost:8080/message` (假设客户端运行在8080端口)。
    4.  你应该会看到响应: `Message from 'git-repository': Hello from the development profile in Git!`，证明客户端成功从配置中心拉取了配置。

---

### 2. Spring Cloud Gateway

*   **简介**: 一个基于Spring WebFlux和Project Reactor构建的API网关。负责请求路由、负载均衡、安全认证、限流熔断等。
*   **官网/源码地址**:
    *   **Spring Cloud Gateway 项目主页**: [https://spring.io/projects/spring-cloud-gateway](https://spring.io/projects/spring-cloud-gateway)
    *   **GitHub 源码**: [https://github.com/spring-cloud/spring-cloud-gateway](https://github.com/spring-cloud/spring-cloud-gateway)

*   **完整案例**:
    我们将创建一个API网关，将请求路由到一个下游的"商品服务"。

    **步骤 1: 创建下游服务 (Product Service)**
    创建一个简单的 Spring Boot Web 应用 `product-service`。
    *   **`pom.xml`**: 只需 `spring-boot-starter-web`。
    *   **`ProductController.java`**:
        ```java
        @RestController
        @RequestMapping("/products")
        public class ProductController {
            @GetMapping("/{id}")
            public String getProduct(@PathVariable String id) {
                return "Product details for ID: " + id;
            }
        }
        ```
    *   **`application.properties`**:
        ```properties
        server.port=8081
        ```

    **步骤 2: 创建 API Gateway 应用**
    创建一个新的 Spring Boot 项目 `api-gateway`。
    *   **`pom.xml` 依赖**:
        ```xml
        <dependencies>
            <dependency>
                <groupId>org.springframework.cloud</groupId>
                <artifactId>spring-cloud-starter-gateway</artifactId>
            </dependency>
            <!-- Spring Cloud 依赖管理 -->
        </dependencies>
        ```
    *   **`GatewayApplication.java`**:
        ```java
        import org.springframework.boot.SpringApplication;
        import org.springframework.boot.autoconfigure.SpringBootApplication;

        @SpringBootApplication
        public class GatewayApplication {
            public static void main(String[] args) {
                SpringApplication.run(GatewayApplication.class, args);
            }
        }
        ```
    *   **`src/main/resources/application.yml`**:
        ```yaml
        server:
          port: 8080 # 网关端口

        spring:
          cloud:
            gateway:
              routes:
                - id: product_service_route # 路由的唯一ID
                  uri: http://localhost:8081 # 目标服务的地址
                  predicates: # 断言，即匹配条件
                    - Path=/api/products/** # 当请求路径匹配此模式时，该路由生效
                  filters: # 过滤器，对请求进行修改
                    - RewritePath=/api(?<segment>/?.*), $\{segment} # 重写路径，去掉/api前缀
        ```

    **步骤 3: 运行与测试**
    1.  启动 `product-service` (监听 8081 端口)。
    2.  启动 `api-gateway` (监听 8080 端口)。
    3.  通过网关访问下游服务。使用 curl 或浏览器访问 `http://localhost:8080/api/products/123`。
    4.  网关会接收到请求，因为它匹配了 `Path=/api/products/**` 断言。
    5.  `RewritePath` 过滤器会将路径 `/api/products/123` 修改为 `/products/123`。
    6.  网关将修改后的请求转发到 `http://localhost:8081/products/123`。
    7.  你将收到 `product-service` 的响应: `Product details for ID: 123`。

---

### 3. Spring Cloud OpenFeign

*   **简介**: 一个声明式的REST客户端，让微服务间的调用像调用本地方法一样简单。
*   **官网/源码地址**:
    *   **Spring Cloud OpenFeign 项目主页**: [https://spring.io/projects/spring-cloud-openfeign](https://spring.io/projects/spring-cloud-openfeign)
    *   **GitHub 源码 (OpenFeign 核心)**: [https://github.com/OpenFeign/feign](https://github.com/OpenFeign/feign)

*   **完整案例**:
    我们将创建一个"订单服务"，它通过 Feign 调用之前创建的"商品服务"来获取商品信息。

    **步骤 1: 确保下游服务 (Product Service) 正在运行**
    同上一个案例，确保 `product-service` 正在 `http://localhost:8081` 上运行。

    **步骤 2: 创建订单服务 (Order Service)**
    创建一个新的 Spring Boot 项目 `order-service`。
    *   **`pom.xml` 依赖**:
        ```xml
        <dependencies>
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-starter-web</artifactId>
            </dependency>
            <dependency>
                <groupId>org.springframework.cloud</groupId>
                <artifactId>spring-cloud-starter-openfeign</artifactId>
            </dependency>
            <!-- Spring Cloud 依赖管理 -->
        </dependencies>
        ```
    *   **`OrderServiceApplication.java`**:
        ```java
        import org.springframework.boot.SpringApplication;
        import org.springframework.boot.autoconfigure.SpringBootApplication;
        import org.springframework.cloud.openfeign.EnableFeignClients;

        @SpringBootApplication
        @EnableFeignClients // 启用Feign客户端扫描
        public class OrderServiceApplication {
            public static void main(String[] args) {
                SpringApplication.run(OrderServiceApplication.class, args);
            }
        }
        ```
    *   **创建 Feign 客户端接口 (`ProductClient.java`)**:
        这个接口定义了如何调用 `product-service`。
        ```java
        import org.springframework.cloud.openfeign.FeignClient;
        import org.springframework.web.bind.annotation.GetMapping;
        import org.springframework.web.bind.annotation.PathVariable;

        // name: 用于服务发现，url: 用于直接指定地址
        @FeignClient(name = "product-service", url = "http://localhost:8081")
        public interface ProductClient {

            @GetMapping("/products/{id}")
            String getProductById(@PathVariable("id") String id);
        }
        ```
    *   **创建 `OrderController.java`**:
        这个 Controller 注入并使用 `ProductClient`。
        ```java
        import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.web.bind.annotation.GetMapping;
        import org.springframework.web.bind.annotation.PathVariable;
        import org.springframework.web.bind.annotation.RestController;

        @RestController
        public class OrderController {

            @Autowired
            private ProductClient productClient;

            @GetMapping("/orders/create/{productId}")
            public String createOrder(@PathVariable String productId) {
                // 调用远程服务
                String productDetails = productClient.getProductById(productId);
                return "Order created for product: [" + productDetails + "]";
            }
        }
        ```
    *   **`application.properties`**:
        ```properties
        server.port=8082
        ```

    **步骤 3: 运行与测试**
    1.  确保 `product-service` (端口 8081) 正在运行。
    2.  启动 `order-service` (端口 8082)。
    3.  使用 curl 或浏览器访问 `http://localhost:8082/orders/create/456`。
    4.  `OrderController`会调用 `productClient.getProductById("456")`。
    5.  Feign 会自动构造一个 HTTP GET 请求发送到 `http://localhost:8081/products/456`。
    6.  你将收到响应: `Order created for product: [Product details for ID: 456]`。

---

### 4. 服务发现 (Service Discovery - Eureka)

*   **简介**: 集成Netflix Eureka，一个REST风格的服务注册与发现组件。服务实例注册到Eureka Server，客户端通过服务名来发现和调用服务。
*   **官网/源码地址**:
    *   **Spring Cloud Netflix 项目主页**: [https://spring.io/projects/spring-cloud-netflix](https://spring.io/projects/spring-cloud-netflix)
    *   **GitHub 源码 (Eureka 核心)**: [https://github.com/Netflix/eureka](https://github.com/Netflix/eureka)

*   **完整案例**:
    我们将创建一个 Eureka Server，并将 `product-service` 和 `order-service` 注册上去。然后修改 `order-service` 的 Feign 客户端，让它通过服务名而不是硬编码的 URL 来调用 `product-service`。

    **步骤 1: 创建 Eureka Server**
    创建一个新的 Spring Boot 项目 `eureka-server`。
    *   **`pom.xml` 依赖**: `spring-cloud-starter-netflix-eureka-server`。
    *   **`EurekaServerApplication.java`**:
        ```java
        import org.springframework.boot.SpringApplication;
        import org.springframework.boot.autoconfigure.SpringBootApplication;
        import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

        @SpringBootApplication
        @EnableEurekaServer // 启用Eureka服务器
        public class EurekaServerApplication {
            public static void main(String[] args) {
                SpringApplication.run(EurekaServerApplication.class, args);
            }
        }
        ```
    *   **`application.yml`**:
        ```yaml
        server:
          port: 8761

        eureka:
          client:
            register-with-eureka: false # 服务器自身不注册
            fetch-registry: false # 服务器自身不拉取注册信息
          server:
            wait-time-in-ms-when-sync-empty: 0 # 开发环境快速启动
        ```

    **步骤 2: 修改 `product-service` 作为 Eureka Client**
    *   **`pom.xml`**: 添加 `spring-cloud-starter-netflix-eureka-client` 依赖。
    *   **`application.yml`** (替换原来的 `application.properties`):
        ```yaml
        server:
          port: 8081
        spring:
          application:
            name: product-service # 定义服务名
        eureka:
          client:
            service-url:
              defaultZone: http://localhost:8761/eureka/ # 注册到Eureka Server
        ```

    **步骤 3: 修改 `order-service` 作为 Eureka Client 并使用服务发现**
    *   **`pom.xml`**: 添加 `spring-cloud-starter-netflix-eureka-client` 依赖。
    *   **`application.yml`**:
        ```yaml
        server:
          port: 8082
        spring:
          application:
            name: order-service
        eureka:
          client:
            service-url:
              defaultZone: http://localhost:8761/eureka/
        ```
    *   **修改 `ProductClient.java`**:
        移除 `url` 属性，让 Feign 通过 Eureka 使用 `name` 属性进行服务发现和负载均衡。
        ```java
        // @FeignClient(name = "product-service", url = "http://localhost:8081") // 旧的方式
        @FeignClient(name = "product-service") // 新的方式，通过服务名调用
        public interface ProductClient {
             // ... 方法定义不变
        }
        ```

    **步骤 4: 运行与测试**
    1.  启动 `EurekaServerApplication`。
    2.  等待 Eureka Server 启动完成后，启动 `product-service`。
    3.  启动 `order-service`。
    4.  打开浏览器访问 Eureka Dashboard `http://localhost:8761`。你应该能看到 `PRODUCT-SERVICE` 和 `ORDER-SERVICE` 都已注册。
    5.  访问 `http://localhost:8082/orders/create/789`。
    6.  请求依然成功，但这次 `order-service` 是通过向 Eureka Server 查询 `product-service` 的地址，然后由 Feign 内置的负载均衡器（Ribbon/Spring Cloud LoadBalancer）选择一个实例进行调用的。

---

### 5. 熔断器 (Circuit Breaker - Resilience4j)

*   **简介**: 集成Resilience4j，一个轻量级、功能强大的容错库。当某个下游服务出现故障时，熔断器可以快速失败，防止故障蔓延。
*   **官网/源码地址**:
    *   **Resilience4j 官网**: [https://resilience4j.readme.io/](https://resilience4j.readme.io/)
    *   **GitHub 源码**: [https://github.com/resilience4j/resilience4j](https://github.com/resilience4j/resilience4j)

*   **完整案例**:
    我们将为 `order-service` 中的 Feign 客户端添加一个熔断器。当 `product-service` 不可用时，它将返回一个预设的降级响应。

    **步骤 1: 修改 `order-service` 添加 Resilience4j**
    *   **`pom.xml`**: 添加 `spring-cloud-starter-circuitbreaker-resilience4j` 依赖。
    *   **`application.yml`**:
        添加 Resilience4j 的配置，并启用 Feign 的熔断功能。
        ```yaml
        # ... (之前的 order-service 配置) ...

        feign:
          circuitbreaker:
            enabled: true # 为Feign启用熔断器

        resilience4j:
          circuitbreaker:
            instances:
              product-service: # 熔断器实例名，默认是 FeignClient 的 name
                sliding-window-size: 10 # 滑动窗口大小
                failure-rate-threshold: 50 # 失败率阈值，超过50%则打开断路器
                wait-duration-in-open-state: 10s # 断路器打开后等待10秒再进入半开状态
                permitted-number-of-calls-in-half-open-state: 2 # 半开状态下允许的测试请求数
        ```
    *   **创建 Fallback 类 (`ProductClientFallback.java`)**:
        这个类实现了 `ProductClient` 接口，并提供了降级逻辑。
        ```java
        import org.springframework.stereotype.Component;

        @Component
        public class ProductClientFallback implements ProductClient {
            @Override
            public String getProductById(String id) {
                // 这是降级逻辑
                return "Fallback: Product service is currently unavailable. Please try again later.";
            }
        }
        ```
    *   **修改 `ProductClient.java` 接口**:
        将 `fallback` 属性指向我们创建的 Fallback 类。
        ```java
        import org.springframework.cloud.openfeign.FeignClient;
        // ...

        @FeignClient(name = "product-service", fallback = ProductClientFallback.class)
        public interface ProductClient {
            // ... 方法定义不变
        }
        ```

    **步骤 2: 运行与测试**
    1.  启动 `eureka-server` (如果还在使用)。
    2.  启动 `product-service` 和 `order-service`。
    3.  访问 `http://localhost:8082/orders/create/101`，应该会正常返回商品信息。
    4.  **现在，手动停止 `product-service`**。
    5.  再次访问 `http://localhost:8082/orders/create/101`。
    6.  由于 `product-service` 已不可用，Feign 调用会失败。Resilience4j 的熔断器会捕获这个失败，并调用 `ProductClientFallback` 中的方法。
    7.  你将看到降级响应: `Fallback: Product service is currently unavailable. Please try again later.`。连续几次失败后，熔断器会进入“打开”状态，后续请求会直接执行降级逻辑，而不会再尝试调用 `product-service`，从而保护了系统。

---

## 十、 批处理 (Batch Processing)

### 1. Spring Batch

*   **简介**: 一个专为健壮、可扩展的批处理应用而设计的轻量级框架。非常适合ETL、数据迁移、报表生成等场景。
*   **官网/源码地址**:
    *   **Spring Batch 项目主页**: [https://spring.io/projects/spring-batch](https://spring.io/projects/spring-batch)
    *   **GitHub 源码**: [https://github.com/spring-projects/spring-batch](https://github.com/spring-projects/spring-batch)

*   **完整案例**:
    我们将创建一个批处理作业，从一个 CSV 文件中读取用户数据，将用户名转换为大写，然后将结果写入内存数据库 (H2)。

    **步骤 1: 创建项目 `batch-processing-demo`**
    *   **`pom.xml` 依赖**:
        ```xml
        <dependencies>
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-starter-batch</artifactId>
            </dependency>
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-starter-data-jpa</artifactId>
            </dependency>
            <dependency>
                <groupId>com.h2database</groupId>
                <artifactId>h2</artifactId>
                <scope>runtime</scope>
            </dependency>
        </dependencies>
        ```
    *   **`src/main/resources/application.properties`**:
        ```properties
        # H2数据库配置
        spring.datasource.url=jdbc:h2:mem:testdb
        spring.datasource.driverClassName=org.h2.Driver
        spring.datasource.username=sa
        spring.datasource.password=
        spring.jpa.database-platform=org.hibernate.dialect.H2Dialect

        # Spring Batch配置
        spring.batch.job.enabled=true # 默认在启动时运行所有找到的Job
        spring.batch.jdbc.initialize-schema=always # 自动创建Spring Batch所需的元数据表
        ```
    *   **创建输入数据文件 `src/main/resources/users.csv`**:
        ```csv
        firstName,lastName
        john,doe
        jane,doe
        peter,jones
        susan,smith
        ```
    *   **创建数据模型 (`User.java`)**:
        ```java
        import jakarta.persistence.Entity;
        import jakarta.persistence.Id;
        import jakarta.persistence.Table;

        @Entity
        @Table(name = "USERS")
        public class User {
            @Id
            private String firstName;
            private String lastName;

            // Getters and Setters ...
            // toString() ...
        }
        ```
    *   **创建 `ItemProcessor` (`UserItemProcessor.java`)**:
        ```java
        import org.slf4j.Logger;
        import org.slf4j.LoggerFactory;
        import org.springframework.batch.item.ItemProcessor;

        public class UserItemProcessor implements ItemProcessor<User, User> {

            private static final Logger log = LoggerFactory.getLogger(UserItemProcessor.class);

            @Override
            public User process(final User user) throws Exception {
                final String firstName = user.getFirstName().toUpperCase();
                final String lastName = user.getLastName().toUpperCase();

                final User transformedUser = new User();
                transformedUser.setFirstName(firstName);
                transformedUser.setLastName(lastName);

                log.info("Converting (" + user + ") into (" + transformedUser + ")");
                return transformedUser;
            }
        }
        ```
    *   **创建批处理配置 (`BatchConfiguration.java`)**:
        ```java
        import org.springframework.batch.core.Job;
        import org.springframework.batch.core.Step;
        import org.springframework.batch.core.job.builder.JobBuilder;
        import org.springframework.batch.core.repository.JobRepository;
        import org.springframework.batch.core.step.builder.StepBuilder;
        import org.springframework.batch.item.database.JpaItemWriter;
        import org.springframework.batch.item.file.FlatFileItemReader;
        import org.springframework.batch.item.file.builder.FlatFileItemReaderBuilder;
        import org.springframework.context.annotation.Bean;
        import org.springframework.context.annotation.Configuration;
        import org.springframework.core.io.ClassPathResource;
        import org.springframework.transaction.PlatformTransactionManager;
        import jakarta.persistence.EntityManagerFactory;

        @Configuration
        public class BatchConfiguration {

            @Bean
            public FlatFileItemReader<User> reader() {
                return new FlatFileItemReaderBuilder<User>()
                        .name("userItemReader")
                        .resource(new ClassPathResource("users.csv"))
                        .delimited()
                        .names("firstName", "lastName")
                        .linesToSkip(1) // 跳过CSV头
                        .targetType(User.class)
                        .build();
            }

            @Bean
            public UserItemProcessor processor() {
                return new UserItemProcessor();
            }

            @Bean
            public JpaItemWriter<User> writer(EntityManagerFactory entityManagerFactory) {
                JpaItemWriter<User> writer = new JpaItemWriter<>();
                writer.setEntityManagerFactory(entityManagerFactory);
                return writer;
            }

            @Bean
            public Job importUserJob(JobRepository jobRepository, Step step1) {
                return new JobBuilder("importUserJob", jobRepository)
                        .flow(step1)
                        .end()
                        .build();
            }

            @Bean
            public Step step1(JobRepository jobRepository, PlatformTransactionManager transactionManager, FlatFileItemReader<User> reader, UserItemProcessor processor, JpaItemWriter<User> writer) {
                return new StepBuilder("step1", jobRepository)
                        .<User, User>chunk(3, transactionManager) // 每3条记录提交一次事务
                        .reader(reader)
                        .processor(processor)
                        .writer(writer)
                        .build();
            }
        }
        ```
    *   **创建日志监听器 (`JobCompletionNotificationListener.java`)** (可选，但推荐):
        ```java
        import org.slf4j.Logger;
        import org.slf4j.LoggerFactory;
        import org.springframework.batch.core.BatchStatus;
        import org.springframework.batch.core.JobExecution;
        import org.springframework.batch.core.JobExecutionListener;
        import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.jdbc.core.JdbcTemplate;
        import org.springframework.stereotype.Component;

        @Component
        public class JobCompletionNotificationListener implements JobExecutionListener {

            private static final Logger log = LoggerFactory.getLogger(JobCompletionNotificationListener.class);
            private final JdbcTemplate jdbcTemplate;

            @Autowired
            public JobCompletionNotificationListener(JdbcTemplate jdbcTemplate) {
                this.jdbcTemplate = jdbcTemplate;
            }

            @Override
            public void afterJob(JobExecution jobExecution) {
                if (jobExecution.getStatus() == BatchStatus.COMPLETED) {
                    log.info("!!! JOB FINISHED! Time to verify the results");
                    jdbcTemplate.query("SELECT first_name, last_name FROM users",
                            (rs, row) -> new User(rs.getString(1), rs.getString(2))
                    ).forEach(user -> log.info("Found <" + user + "> in the database."));
                }
            }
        }
        ```
        为了让这个 Listener 生效，需要在 `importUserJob` Bean 的定义中添加 `.listener(listener)`。

    **步骤 2: 运行与测试**
    1.  直接运行 `BatchProcessingDemoApplication`。
    2.  由于 `spring.batch.job.enabled=true`，应用启动后会自动运行 `importUserJob`。
    3.  查看控制台日志，你会看到：
        *   Spring Batch 启动作业的日志。
        *   `UserItemProcessor` 的处理日志，显示小写变大写。
        *   作业完成后，`JobCompletionNotificationListener` 的日志会查询数据库并打印出已写入的、大写的用户信息，验证作业成功。



## 九、 云原生与微服务 (Cloud Native & Microservices) - 续

### 7. 分布式追踪 (Distributed Tracing - Micrometer Tracing with Zipkin)

*   **简介**: 作为Sleuth的继任者，Micrometer Tracing提供了一个厂商中立的分布式追踪API。我们将使用它与Brave桥接，并将追踪数据发送到Zipkin后端进行可视化。
*   **官网/源码地址**:
    *   **Micrometer Tracing**: [https://micrometer.io/docs/tracing](https://micrometer.io/docs/tracing)
    *   **Zipkin**: [https://zipkin.io/](https://zipkin.io/)
    *   **GitHub 源码 (Micrometer)**: [https://github.com/micrometer-metrics/micrometer](https://github.com/micrometer-metrics/micrometer)
    *   **GitHub 源码 (Zipkin)**: [https://github.com/openzipkin/zipkin](https://github.com/openzipkin/zipkin)

*   **完整案例**:
    我们将继续使用之前的 `order-service` 和 `product-service`，并为它们添加分布式追踪能力，然后通过Zipkin UI查看完整的调用链。

    **步骤 1: 启动 Zipkin 服务器**
    最简单的方式是使用 Docker。在终端运行以下命令：
    ```bash
    docker run -d -p 9411:9411 openzipkin/zipkin
    ```
    这将在后台启动一个Zipkin实例，监听 `9411` 端口。你可以通过访问 `http://localhost:9411` 来查看Zipkin UI。

    **步骤 2: 为 `product-service` 添加追踪能力**
    *   **`pom.xml`**: 添加以下依赖。`micrometer-tracing-bridge-brave` 会引入Micrometer Tracing和Brave（Zipkin的Java客户端）。`zipkin-reporter-brave` 负责将追踪数据发送到Zipkin服务器。
        ```xml
        <dependencies>
            <!-- ... 其他依赖 ... -->
            <dependency>
                <groupId>io.micrometer</groupId>
                <artifactId>micrometer-tracing-bridge-brave</artifactId>
            </dependency>
            <dependency>
                <groupId>io.zipkin.reporter2</groupId>
                <artifactId>zipkin-reporter-brave</artifactId>
            </dependency>
        </dependencies>
        ```
    *   **`application.yml`**: 配置Zipkin服务器地址和采样率。
        ```yaml
        # ... (之前的 product-service 配置) ...
        management:
          tracing:
            sampling:
              probability: 1.0 # 采样率设为1.0，表示所有请求都进行追踪（生产环境应适当调低）
        spring:
          zipkin:
            base-url: http://localhost:9411/ # Zipkin 服务器地址
        ```
    *   **可选：添加自定义日志**
        修改`ProductController`，注入`Tracer`并记录当前的 Trace ID。
        ```java
        import org.slf4j.Logger;
        import org.slf4j.LoggerFactory;
        import io.micrometer.tracing.Tracer;
        // ...

        @RestController
        @RequestMapping("/products")
        public class ProductController {

            private static final Logger log = LoggerFactory.getLogger(ProductController.class);
            private final Tracer tracer;

            public ProductController(Tracer tracer) { // 通过构造函数注入
                this.tracer = tracer;
            }

            @GetMapping("/{id}")
            public String getProduct(@PathVariable String id) {
                log.info("Fetching product with id: {}. Trace ID: {}", id, tracer.currentSpan().context().traceId());
                return "Product details for ID: " + id;
            }
        }
        ```

    **步骤 3: 为 `order-service` 添加追踪能力**
    重复与 `product-service` 完全相同的步骤：
    1.  在 `order-service` 的 `pom.xml` 中添加 `micrometer-tracing-bridge-brave` 和 `zipkin-reporter-brave` 依赖。
    2.  在 `order-service` 的 `application.yml` 中添加 `management.tracing` 和 `spring.zipkin` 配置。
    3.  （可选）在`OrderController`中也注入`Tracer`并打印Trace ID。

    **步骤 4: 运行与测试**
    1.  确保Zipkin容器正在运行。
    2.  启动（或重启）`product-service` 和 `order-service`。
    3.  访问 `order-service` 的接口: `http://localhost:8082/orders/create/123`。
    4.  请求成功后，打开Zipkin UI: `http://localhost:9411`。
    5.  点击 "Run Query" 按钮，你应该能看到一条新的追踪记录。
    6.  点击这条记录，你将看到一个详细的瀑布图，清晰地展示了请求从 `order-service` 发起，经过Feign调用，最终到达 `product-service` 的整个过程，包括每个环节的耗时。两个服务的日志中打印出的 Trace ID 应该是相同的。

---

## 十一、 缓存 (Caching)

### 8. 缓存抽象与Caffeine (本地缓存)

*   **简介**: Spring Boot提供了一套缓存抽象API (`@Cacheable`, `@CachePut`, `@CacheEvict`)，Caffeine是一个高性能的Java 8本地（进程内）缓存库，是Spring Boot推荐的默认本地缓存实现。
*   **官网/源码地址**:
    *   **Spring Caching**: [https://docs.spring.io/spring-framework/docs/current/reference/html/integration.html#cache](https://docs.spring.io/spring-framework/docs/current/reference/html/integration.html#cache)
    *   **Caffeine GitHub**: [https://github.com/ben-manes/caffeine](https://github.com/ben-manes/caffeine)

*   **完整案例**:
    我们将创建一个`BookService`，并对查询书籍的方法使用`@Cacheable`注解，以Caffeine作为缓存实现。

    **步骤 1: 创建项目 `caching-demo`**
    *   **`pom.xml` 依赖**:
        ```xml
        <dependencies>
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-starter-web</artifactId>
            </dependency>
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-starter-cache</artifactId> <!-- 缓存抽象 -->
            </dependency>
            <dependency>
                <groupId>com.github.ben-manes.caffeine</groupId>
                <artifactId>caffeine</artifactId> <!-- Caffeine 实现 -->
            </dependency>
        </dependencies>
        ```
    *   **`CachingDemoApplication.java`**:
        在主类上启用缓存。
        ```java
        import org.springframework.boot.SpringApplication;
        import org.springframework.boot.autoconfigure.SpringBootApplication;
        import org.springframework.cache.annotation.EnableCaching;

        @SpringBootApplication
        @EnableCaching // 启用Spring的缓存功能
        public class CachingDemoApplication {
            public static void main(String[] args) {
                SpringApplication.run(CachingDemoApplication.class, args);
            }
        }
        ```
    *   **创建 `Book` 实体和 `BookService`**:
        ```java
        // Book.java (一个简单的POJO)
        public class Book {
            private String isbn;
            private String title;
            // constructor, getters, setters, toString
        }

        // BookService.java
        import org.slf4j.Logger;
        import org.slf4j.LoggerFactory;
        import org.springframework.cache.annotation.Cacheable;
        import org.springframework.stereotype.Service;

        @Service
        public class BookService {
            private static final Logger log = LoggerFactory.getLogger(BookService.class);

            @Cacheable("books") // 核心注解
            public Book getBookByIsbn(String isbn) {
                log.info("--- Fetching book from slow source for ISBN: {}", isbn);
                // 模拟一个耗时的操作，比如数据库查询或远程调用
                try {
                    Thread.sleep(2000L);
                } catch (InterruptedException e) {
                    throw new RuntimeException(e);
                }
                return new Book(isbn, "Some Book Title");
            }
        }
        ```
        `@Cacheable("books")` 表示此方法的返回值将被缓存。缓存的`key`默认是方法的参数（这里是`isbn`），`value`是方法的返回值。`"books"`是缓存的名称（Cache Name）。

    *   **创建 `BookController.java`**:
        ```java
        import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.web.bind.annotation.GetMapping;
        import org.springframework.web.bind.annotation.PathVariable;
        import org.springframework.web.bind.annotation.RestController;

        @RestController
        public class BookController {
            @Autowired
            private BookService bookService;

            @GetMapping("/books/{isbn}")
            public Book findBook(@PathVariable String isbn) {
                return bookService.getBookByIsbn(isbn);
            }
        }
        ```

    **步骤 2: 运行与测试**
    1.  启动 `CachingDemoApplication`。
    2.  第一次访问 `http://localhost:8080/books/12345`。你会发现请求需要大约2秒才能返回，控制台会打印 "--- Fetching book from slow source for ISBN: 12345"。
    3.  立即再次访问 `http://localhost:8080/books/12345`。你会发现请求几乎是瞬间返回，并且控制台**不会**打印任何日志。这证明第二次请求命中了Caffeine缓存，`getBookByIsbn` 方法体没有被执行。
    4.  访问 `http://localhost:8080/books/67890`。请求会再次变慢，因为这是一个新的`key`，缓存中不存在。

### 9. 缓存提供商 - Redis (分布式缓存)

*   **简介**: 使用Redis作为Spring缓存抽象的后端实现，从而实现分布式缓存，让多个服务实例可以共享同一个缓存。
*   **官网/源码地址**:
    *   **Spring Data Redis**: [https://spring.io/projects/spring-data-redis](https://spring.io/projects/spring-data-redis)
    *   **Redis**: [https://redis.io/](https://redis.io/)

*   **完整案例**:
    我们将修改上一个 `caching-demo` 项目，将缓存从本地的Caffeine切换到分布式的Redis。

    **步骤 1: 修改项目 `caching-demo`**
    *   **启动一个 Redis 实例**:
        同样，最简单的方式是使用 Docker:
        ```bash
        docker run -d -p 6379:6379 redis
        ```
    *   **`pom.xml`**:
        移除Caffeine依赖，添加Spring Data Redis启动器。
        ```xml
        <!-- <dependency>
            <groupId>com.github.ben-manes.caffeine</groupId>
            <artifactId>caffeine</artifactId>
        </dependency> -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-redis</artifactId>
        </dependency>
        ```
    *   **`src/main/resources/application.properties`**:
        添加Redis的连接配置。
        ```properties
        spring.redis.host=localhost
        spring.redis.port=6379

        # (可选) 配置Redis缓存的过期时间
        spring.cache.redis.time-to-live=60000 # 60秒
        ```
    *   **修改`Book.java`**:
        为了能被Redis序列化，实体类需要实现`Serializable`接口。
        ```java
        import java.io.Serializable;
        public class Book implements Serializable {
            // ... 内容不变
        }
        ```
    *   **其他代码 (`CachingDemoApplication`, `BookService`, `BookController`)**:
        **完全不需要任何修改！** 这就是Spring缓存抽象的强大之处。

    **步骤 2: 运行与测试**
    1.  确保Redis实例正在运行。
    2.  启动 `CachingDemoApplication`。
    3.  第一次访问 `http://localhost:8080/books/12345`。请求耗时2秒，控制台打印日志。此时，你可以用Redis客户端（如`redis-cli`）查看，会发现一个key（类似`books::12345`）被创建了。
    4.  再次访问 `http://localhost:8080/books/12345`。请求瞬间返回，控制台无日志。
    5.  **分布式特性验证**: 如果你将此应用打包并启动第二个实例（例如，在不同端口 `server.port=8081`），然后用第二个实例访问 `/books/12345`，你会发现它也是瞬间返回的，因为两个实例共享了同一个Redis缓存。

---

## 十二、 测试 (Testing)

### 10. Spring Boot Test

*   **简介**: `spring-boot-starter-test`是进行Spring Boot应用测试的核心依赖，聚合了JUnit 5, Spring Test, AssertJ, Mockito等库。
*   **官网/源码地址**:
    *   **Spring Boot Testing**: [https://docs.spring.io/spring-boot/docs/current/reference/html/features.html#features.testing](https://docs.spring.io/spring-boot/docs/current/reference/html/features.html#features.testing)

*   **完整案例**:
    我们将为之前的 `caching-demo` 项目编写单元测试和集成测试。

    **测试目标**:
    1.  **单元测试**: 测试 `BookController` 是否正确调用了 `BookService`，这里使用 Mockito 模拟 `BookService`。
    2.  **集成测试**: 测试从HTTP请求到Controller再到Service的完整流程。

    **步骤 1: 准备测试环境**
    `spring-boot-starter-test` 默认已经包含在由 `start.spring.io` 生成的项目中。

    **步骤 2: 编写单元测试 (`BookControllerTest.java`)**
    使用 `@WebMvcTest`，它只加载Web层的组件（如Controller, Filter等），而不加载整个Spring上下文，速度更快。
    ```java
    import org.junit.jupiter.api.Test;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
    import org.springframework.boot.test.mock.mockito.MockBean;
    import org.springframework.test.web.servlet.MockMvc;

    import static org.mockito.BDDMockito.given;
    import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
    import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
    import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
    import static org.hamcrest.Matchers.is;

    @WebMvcTest(BookController.class) // 只测试BookController
    public class BookControllerTest {

        @Autowired
        private MockMvc mockMvc; // 用于模拟HTTP请求

        @MockBean // 使用Mockito创建一个BookService的模拟Bean
        private BookService bookService;

        @Test
        public void whenFindBook_thenReturnBook() throws Exception {
            String isbn = "12345";
            Book book = new Book(isbn, "Test Book");

            // Given: 当bookService.getBookByIsbn被调用时，返回我们预设的book对象
            given(bookService.getBookByIsbn(isbn)).willReturn(book);

            // When & Then: 执行GET请求，并断言结果
            mockMvc.perform(get("/books/{isbn}", isbn))
                   .andExpect(status().isOk())
                   .andExpect(jsonPath("$.isbn", is(isbn)))
                   .andExpect(jsonPath("$.title", is("Test Book")));
        }
    }
    ```

    **步骤 3: 编写集成测试 (`CachingDemoApplicationTests.java`)**
    使用 `@SpringBootTest`，它会加载完整的Spring应用上下文，模拟真实环境。
    ```java
    import org.junit.jupiter.api.Test;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.boot.test.context.SpringBootTest;
    import org.springframework.boot.test.web.client.TestRestTemplate;
    import org.springframework.boot.test.web.server.LocalServerPort;
    import org.springframework.http.ResponseEntity;

    import static org.assertj.core.api.Assertions.assertThat;

    @SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT) // 启动一个随机端口的Web服务器
    public class CachingDemoApplicationTests {

        @LocalServerPort
        private int port;

        @Autowired
        private TestRestTemplate restTemplate; // 用于发送真实的HTTP请求

        @Test
        public void contextLoads() {
            // 一个简单的测试，确保Spring上下文能成功加载
        }

        @Test
        public void testBookEndpoint() {
            String isbn = "98765";
            String url = "http://localhost:" + port + "/books/" + isbn;

            // 发起真实HTTP请求
            ResponseEntity<Book> response = restTemplate.getForEntity(url, Book.class);

            // 使用AssertJ进行断言
            assertThat(response.getStatusCode().is2xxSuccessful()).isTrue();
            assertThat(response.getBody()).isNotNull();
            assertThat(response.getBody().getIsbn()).isEqualTo(isbn);
        }
    }
    ```

    **步骤 4: 运行测试**
    在IDE中右键点击测试类或测试方法，选择 "Run"。或者使用Maven命令 `mvn test`。所有测试都应该通过。

### 11. Testcontainers

*   **简介**: 一个革命性的Java测试库，允许在JUnit测试中以编程方式启动和管理Docker容器，为测试提供真实的依赖服务。
*   **官网/源码地址**:
    *   **Testcontainers 官网**: [https://www.testcontainers.org/](https://www.testcontainers.org/)
    *   **GitHub 源码**: [https://github.com/testcontainers/testcontainers-java](https://github.com/testcontainers/testcontainers-java)

*   **完整案例**:
    我们将为使用了Redis缓存的 `caching-demo` 项目编写一个集成测试。这个测试将使用Testcontainers自动启动一个临时的Redis容器，而不是依赖于手动启动的外部Redis实例。

    **步骤 1: 添加 Testcontainers 依赖**
    *   **`pom.xml`**:
        ```xml
        <dependency>
            <groupId>org.testcontainers</groupId>
            <artifactId>testcontainers</artifactId>
            <version>1.19.7</version> <!-- 使用最新版本 -->
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.testcontainers</groupId>
            <artifactId>junit-jupiter</artifactId> <!-- JUnit 5 集成 -->
            <version>1.19.7</version>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.testcontainers</groupId>
            <artifactId>redis</artifactId> <!-- Redis 模块 -->
            <version>1.19.7</version>
            <scope>test</scope>
        </dependency>
        ```

    **步骤 2: 编写使用 Testcontainers 的集成测试**
    我们修改 `CachingDemoApplicationTests.java`。
    ```java
    import org.junit.jupiter.api.Test;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.boot.test.context.SpringBootTest;
    import org.springframework.boot.test.web.client.TestRestTemplate;
    import org.springframework.context.ApplicationContextInitializer;
    import org.springframework.context.ConfigurableApplicationContext;
    import org.springframework.test.context.ContextConfiguration;
    import org.springframework.test.context.support.TestPropertySourceUtils;
    import org.testcontainers.containers.GenericContainer;
    import org.testcontainers.junit.jupiter.Container;
    import org.testcontainers.junit.jupiter.Testcontainers;

    import static org.assertj.core.api.Assertions.assertThat;

    @Testcontainers // 启用Testcontainers JUnit 5扩展
    @SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
    @ContextConfiguration(initializers = CachingDemoApplicationTests.RedisInitializer.class) // 使用初始化器动态设置属性
    public class CachingDemoApplicationTests {

        // ... TestRestTemplate 和 port 的注入保持不变 ...

        // @Container注解会自动管理容器的生命周期（启动和停止）
        @Container
        public static GenericContainer<?> redis = new GenericContainer<>("redis:6-alpine")
                .withExposedPorts(6379);

        // 初始化器，在Spring上下文刷新前，将容器的动态端口设置到Spring环境中
        static class RedisInitializer implements ApplicationContextInitializer<ConfigurableApplicationContext> {
            @Override
            public void initialize(ConfigurableApplicationContext applicationContext) {
                TestPropertySourceUtils.addInlinedPropertiesToEnvironment(
                        applicationContext,
                        "spring.redis.host=" + redis.getHost(),
                        "spring.redis.port=" + redis.getMappedPort(6379)
                );
            }
        }

        @Test
        public void testBookEndpointWithRedisCache() {
            String isbn = "98765";
            String url = "http://localhost:" + port + "/books/" + isbn;

            // 第一次调用，应该很慢，并将结果存入Testcontainers启动的Redis中
            long startTime = System.currentTimeMillis();
            restTemplate.getForEntity(url, Book.class);
            long firstCallDuration = System.currentTimeMillis() - startTime;

            // 第二次调用，应该非常快，因为命中了缓存
            startTime = System.currentTimeMillis();
            restTemplate.getForEntity(url, Book.class);
            long secondCallDuration = System.currentTimeMillis() - startTime;

            System.out.println("First call duration: " + firstCallDuration + "ms");
            System.out.println("Second call duration: " + secondCallDuration + "ms");

            assertThat(firstCallDuration).isGreaterThan(1500); // 应该大于模拟的延迟
            assertThat(secondCallDuration).isLessThan(500); // 应该远小于第一次调用
        }
    }
    ```

    **步骤 3: 运行与测试**
    1.  确保你的机器上安装并运行了Docker。
    2.  运行这个测试。在测试开始前，Testcontainers会自动从Docker Hub拉取`redis:6-alpine`镜像（如果本地没有），然后启动一个容器。
    3.  `RedisInitializer`会获取到这个容器的随机映射端口，并覆盖`application.properties`中的Redis配置。
    4.  测试逻辑会与这个临时的Redis容器交互。
    5.  测试结束后，Testcontainers会自动停止并移除这个Redis容器，保持环境清洁。
        这个测试是完全自包含的，不依赖任何外部环境，非常适合CI/CD流水线。

---

## 十三、 其他集成 (Miscellaneous Integrations)

### 12. Mail

*   **简介**: 集成JavaMail API，用于发送电子邮件。
*   **官网/源码地址**:
    *   **Spring Boot Mail**: [https://docs.spring.io/spring-boot/docs/current/reference/html/io.html#io.email](https://docs.spring.io/spring-boot/docs/current/reference/html/io.html#io.email)
    *   **Jakarta Mail (原JavaMail)**: [https://eclipse-ee4j.github.io/mail/](https://eclipse-ee4j.github.io/mail/)

*   **完整案例**:
    我们将创建一个服务来发送简单的文本邮件。为了方便测试，我们将使用**MailHog**，一个开源的邮件测试工具，它能捕获所有发出的邮件并在Web界面上显示，而无需配置真实的SMTP服务器。

    **步骤 1: 启动 MailHog**
    使用 Docker:
    ```bash
    docker run -d -p 1025:1025 -p 8025:8025 mailhog/mailhog
    ```
    *   SMTP服务器将在 `localhost:1025` 上运行。
    *   Web UI将在 `http://localhost:8025` 上可用。

    **步骤 2: 创建项目 `mail-demo`**
    *   **`pom.xml` 依赖**:
        ```xml
        <dependencies>
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-starter-web</artifactId>
            </dependency>
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-starter-mail</artifactId>
            </dependency>
        </dependencies>
        ```
    *   **`src/main/resources/application.properties`**:
        配置Spring Mail以连接到MailHog。
        ```properties
        spring.mail.host=localhost
        spring.mail.port=1025
        # 对于MailHog，不需要用户名和密码
        # spring.mail.username=
        # spring.mail.password=
        ```
    *   **创建 `EmailService.java`**:
        ```java
        import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.mail.SimpleMailMessage;
        import org.springframework.mail.javamail.JavaMailSender;
        import org.springframework.stereotype.Service;

        @Service
        public class EmailService {

            @Autowired
            private JavaMailSender mailSender;

            public void sendSimpleMessage(String to, String subject, String text) {
                SimpleMailMessage message = new SimpleMailMessage();
                message.setFrom("noreply@example.com"); // 发件人
                message.setTo(to);
                message.setSubject(subject);
                message.setText(text);
                mailSender.send(message);
            }
        }
        ```
    *   **创建 `EmailController.java`**:
        ```java
        import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.web.bind.annotation.PostMapping;
        import org.springframework.web.bind.annotation.RequestParam;
        import org.springframework.web.bind.annotation.RestController;

        @RestController
        public class EmailController {

            @Autowired
            private EmailService emailService;

            @PostMapping("/send-email")
            public String sendEmail(@RequestParam String to) {
                try {
                    emailService.sendSimpleMessage(to, "Test Email from Spring Boot", "Hello! This is a test email.");
                    return "Email sent successfully to " + to;
                } catch (Exception e) {
                    return "Error sending email: " + e.getMessage();
                }
            }
        }
        ```

    **步骤 3: 运行与测试**
    1.  确保MailHog容器正在运行。
    2.  启动 `mail-demo` 应用。
    3.  使用 curl 或 Postman 发送一个 POST 请求:
        `curl -X POST http://localhost:8080/send-email?to=testuser@example.com`
    4.  你应该会收到 "Email sent successfully..." 的响应。
    5.  打开MailHog的Web UI `http://localhost:8025`。
    6.  你会看到收件箱中有一封新邮件，发给 `testuser@example.com`，内容正是我们发送的。这证明邮件发送功能配置正确并成功工作。



## 十三、 其他集成 (Miscellaneous Integrations) - 续

### 13. Quartz Scheduler

*   **简介**: 集成Quartz，一个功能强大的企业级开源作业调度框架。与Spring自带的`@Scheduled`相比，Quartz提供了更高级的功能，如持久化任务和集群调度。
*   **官网/源码地址**:
    *   **Quartz Scheduler 官网**: [http://www.quartz-scheduler.org/](http://www.quartz-scheduler.org/)
    *   **GitHub 源码**: [https://github.com/quartz-scheduler/quartz](https://github.com/quartz-scheduler/quartz)

*   **完整案例**:
    我们将创建一个使用Quartz调度的任务，该任务每5秒打印一次当前时间。我们将配置Quartz将任务数据持久化到H2数据库中，这样即使应用重启，任务调度信息也不会丢失。

    **步骤 1: 创建项目 `quartz-demo`**
    *   **`pom.xml` 依赖**:
        ```xml
        <dependencies>
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-starter-quartz</artifactId>
            </dependency>
            <!-- 为了持久化，我们需要一个数据库 -->
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-starter-data-jpa</artifactId>
            </dependency>
            <dependency>
                <groupId>com.h2database</groupId>
                <artifactId>h2</artifactId>
                <scope>runtime</scope>
            </dependency>
        </dependencies>
        ```
    *   **`src/main/resources/application.properties`**:
        配置Quartz使用JDBC JobStore进行持久化，并指定数据源。
        ```properties
        # Quartz 配置
        spring.quartz.job-store-type=jdbc # 指定使用JDBC存储
        spring.quartz.jdbc.initialize-schema=always # 应用启动时自动创建Quartz所需的表

        # H2数据库配置 (Quartz将使用此数据源)
        spring.datasource.url=jdbc:h2:file:./quartz-db # 持久化到文件，重启后数据仍在
        spring.datasource.driverClassName=org.h2.Driver
        spring.datasource.username=sa
        spring.datasource.password=
        ```
    *   **创建 Quartz Job (`SimpleJob.java`)**:
        一个Quartz `Job`是一个实现了`org.quartz.Job`接口的类，其`execute`方法包含任务的实际逻辑。
        ```java
        import org.quartz.JobExecutionContext;
        import org.quartz.JobExecutionException;
        import org.slf4j.Logger;
        import org.slf4j.LoggerFactory;
        import org.springframework.scheduling.quartz.QuartzJobBean;
        import java.time.LocalDateTime;

        // 继承QuartzJobBean可以方便地将Job数据映射到成员变量
        public class SimpleJob extends QuartzJobBean {

            private static final Logger log = LoggerFactory.getLogger(SimpleJob.class);

            @Override
            protected void executeInternal(JobExecutionContext context) throws JobExecutionException {
                log.info("SimpleJob executed at: {}", LocalDateTime.now());
            }
        }
        ```
    *   **创建 Quartz 配置类 (`QuartzConfig.java`)**:
        在这里，我们以编程方式定义`JobDetail`（任务的定义）和`Trigger`（触发器，即何时运行）。
        ```java
        import org.quartz.*;
        import org.springframework.context.annotation.Bean;
        import org.springframework.context.annotation.Configuration;

        @Configuration
        public class QuartzConfig {

            @Bean
            public JobDetail simpleJobDetail() {
                // 定义一个JobDetail，关联我们的SimpleJob类
                // JobBuilder是Quartz提供的流式API
                return JobBuilder.newJob(SimpleJob.class)
                        .withIdentity("simpleJob") // Job的唯一标识
                        .storeDurably() // 即使没有关联的Trigger，也持久化JobDetail
                        .build();
            }

            @Bean
            public Trigger simpleJobTrigger(JobDetail simpleJobDetail) {
                // 定义一个Trigger
                // SimpleScheduleBuilder用于创建简单的重复调度
                SimpleScheduleBuilder scheduleBuilder = SimpleScheduleBuilder.simpleSchedule()
                        .withIntervalInSeconds(5) // 每5秒执行一次
                        .repeatForever();

                // TriggerBuilder用于创建Trigger实例
                return TriggerBuilder.newTrigger()
                        .forJob(simpleJobDetail) // 关联到simpleJobDetail
                        .withIdentity("simpleJobTrigger") // Trigger的唯一标识
                        .withSchedule(scheduleBuilder)
                        .build();
            }
        }
        ```

    **步骤 2: 运行与测试**
    1.  启动 `quartz-demo` 应用。
    2.  查看控制台日志，你会看到每隔5秒打印一次 "SimpleJob executed at: ..."。
    3.  应用启动后，会在项目根目录下创建一个`quartz-db.mv.db`文件，这是H2数据库文件。里面包含了Quartz创建的以`QRTZ_`开头的表，存储了我们的Job和Trigger信息。
    4.  **持久化验证**:
        a. 让应用运行一段时间，然后停止它。
        b. **修改代码**：在`QuartzConfig.java`中，将`withIntervalInSeconds(5)`改为`withIntervalInSeconds(10)`。
        c. 重新启动应用。
        d. 你会发现，控制台仍然是**每5秒**打印一次日志，而不是10秒！这是因为Quartz从数据库中加载了已经存在的Trigger定义，它不会被你修改后的代码覆盖（除非你配置了`spring.quartz.overwrite-existing-jobs=true`）。这证明了持久化是有效的。

---

### 14. AOP (Aspect-Oriented Programming)

*   **简介**: 提供对面向切面编程的支持。通过AOP，可以将横切关注点（如日志记录、性能监控）从业务逻辑代码中分离出来。
*   **官网/源码地址**:
    *   **Spring AOP**: [https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#aop](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#aop)
    *   **AspectJ (Spring AOP 底层使用其部分功能)**: [https://www.eclipse.org/aspectj/](https://www.eclipse.org/aspectj/)

*   **完整案例**:
    我们将创建一个切面，用于记录所有Controller方法的执行时间。

    **步骤 1: 创建项目 `aop-demo`**
    *   **`pom.xml` 依赖**:
        ```xml
        <dependencies>
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-starter-web</artifactId>
            </dependency>
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-starter-aop</artifactId> <!-- AOP启动器 -->
            </dependency>
        </dependencies>
        ```
    *   **创建 `MyService.java` 和 `MyController.java`**:
        ```java
        // MyService.java
        import org.springframework.stereotype.Service;

        @Service
        public class MyService {
            public String doSomething() {
                // 模拟耗时操作
                try {
                    Thread.sleep(150);
                } catch (InterruptedException e) {}
                return "Done.";
            }
        }

        // MyController.java
        import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.web.bind.annotation.GetMapping;
        import org.springframework.web.bind.annotation.RestController;

        @RestController
        public class MyController {
            @Autowired
            private MyService myService;

            @GetMapping("/hello")
            public String hello() {
                return "Hello, AOP!";
            }

            @GetMapping("/work")
            public String work() {
                return myService.doSomething();
            }
        }
        ```
    *   **创建切面 (`LoggingAspect.java`)**:
        ```java
        import org.aspectj.lang.ProceedingJoinPoint;
        import org.aspectj.lang.annotation.Around;
        import org.aspectj.lang.annotation.Aspect;
        import org.aspectj.lang.annotation.Pointcut;
        import org.slf4j.Logger;
        import org.slf4j.LoggerFactory;
        import org.springframework.stereotype.Component;

        @Aspect // 声明这是一个切面类
        @Component // 将其作为Bean交由Spring管理
        public class LoggingAspect {

            private static final Logger log = LoggerFactory.getLogger(LoggingAspect.class);

            // 定义一个切点 (Pointcut)
            // 匹配 com.example.aopdemo.MyController包下的所有类的所有方法
            @Pointcut("within(com.example.aopdemo.MyController)")
            public void controllerMethods() {}

            // 定义一个环绕通知 (Around advice)
            @Around("controllerMethods()")
            public Object logExecutionTime(ProceedingJoinPoint joinPoint) throws Throwable {
                long start = System.currentTimeMillis();

                // 执行目标方法
                Object proceed = joinPoint.proceed();

                long executionTime = System.currentTimeMillis() - start;

                log.info("{} executed in {} ms", joinPoint.getSignature(), executionTime);
                return proceed;
            }
        }
        ```
        *   `@Aspect`: 标记这是一个切面。
        *   `@Pointcut`: 定义了“在哪里”应用通知的表达式。`within(...)`表示匹配指定包或类下的所有连接点（方法执行）。
        *   `@Around`: 环绕通知，功能最强大，可以在方法执行前后都进行操作，甚至可以阻止原方法的执行。`ProceedingJoinPoint`参数是必须的，通过调用其`proceed()`方法来执行目标方法。

    **步骤 2: 运行与测试**
    1.  启动 `aop-demo` 应用。
    2.  访问 `http://localhost:8080/hello`。
    3.  访问 `http://localhost:8080/work`。
    4.  查看控制台日志，你会看到类似以下的输出：
        ```
        INFO --- [nio-8080-exec-1] c.e.aopdemo.LoggingAspect : String com.example.aopdemo.MyController.hello() executed in 5 ms
        INFO --- [nio-8080-exec-2] c.e.aopdemo.LoggingAspect : String com.example.aopdemo.MyController.work() executed in 153 ms
        ```
    这表明我们的切面成功地拦截了`MyController`中方法的执行，并记录了它们的执行时间，而我们没有修改任何`MyController`的业务代码。

---

## 十四、 可观测性 (Observability)

### 15. Micrometer Metrics with Prometheus

*   **简介**: Micrometer是一个应用度量门面，Prometheus是一个开源的监控和告警系统。Spring Boot通过Micrometer将应用指标暴露为Prometheus格式，供其抓取。
*   **官网/源码地址**:
    *   **Micrometer**: [https://micrometer.io/](https://micrometer.io/)
    *   **Prometheus**: [https://prometheus.io/](https://prometheus.io/)

*   **完整案例**:
    我们将创建一个应用，暴露一个自定义的业务指标（例如，订单创建计数器），并通过Actuator的Prometheus端点展示出来。

    **步骤 1: 启动 Prometheus**
    创建一个 `prometheus.yml` 配置文件：
    ```yaml
    global:
      scrape_interval: 15s # 每15秒抓取一次

    scrape_configs:
      - job_name: 'spring-boot-app'
        metrics_path: '/actuator/prometheus' # Spring Boot暴露的端点
        static_configs:
          - targets: ['host.docker.internal:8080'] # 对于Docker容器，这是访问宿主机的方式
    ```
    使用 Docker 启动 Prometheus，并将配置文件挂载进去：
    ```bash
    docker run -d -p 9090:9090 -v /path/to/your/prometheus.yml:/etc/prometheus/prometheus.yml prom/prometheus
    ```
    (请将`/path/to/your/prometheus.yml`替换为你的实际路径)。Prometheus UI将在 `http://localhost:9090`。

    **步骤 2: 创建项目 `metrics-demo`**
    *   **`pom.xml` 依赖**:
        ```xml
        <dependencies>
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-starter-web</artifactId>
            </dependency>
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-starter-actuator</artifactId>
            </dependency>
            <dependency>
                <groupId>io.micrometer</groupId>
                <artifactId>micrometer-registry-prometheus</artifactId> <!-- Prometheus注册表 -->
            </dependency>
        </dependencies>
        ```
    *   **`src/main/resources/application.properties`**:
        暴露Actuator的端点。
        ```properties
        management.endpoints.web.exposure.include=health,info,prometheus
        management.endpoint.health.show-details=always
        ```
    *   **创建自定义指标 (`OrderController.java`)**:
        ```java
        import io.micrometer.core.instrument.Counter;
        import io.micrometer.core.instrument.MeterRegistry;
        import org.springframework.web.bind.annotation.PostMapping;
        import org.springframework.web.bind.annotation.RequestParam;
        import org.springframework.web.bind.annotation.RestController;

        @RestController
        public class OrderController {

            private final Counter orderSuccessCounter;
            private final Counter orderFailedCounter;

            public OrderController(MeterRegistry registry) {
                // 创建一个名为 "orders.counter" 的计数器
                // 并带有 "status" 标签，用于区分成功和失败
                this.orderSuccessCounter = Counter.builder("orders.counter")
                        .tag("status", "success")
                        .description("The number of successful orders")
                        .register(registry);

                this.orderFailedCounter = Counter.builder("orders.counter")
                        .tag("status", "failed")
                        .description("The number of failed orders")
                        .register(registry);
            }

            @PostMapping("/orders")
            public String createOrder(@RequestParam boolean success) {
                if (success) {
                    orderSuccessCounter.increment();
                    return "Order created successfully!";
                } else {
                    orderFailedCounter.increment();
                    return "Failed to create order.";
                }
            }
        }
        ```
        我们注入`MeterRegistry`（Micrometer的核心），并用它来创建两个`Counter`。

    **步骤 3: 运行与测试**
    1.  启动 `metrics-demo` 应用。
    2.  访问Prometheus端点 `http://localhost:8080/actuator/prometheus`。在返回的文本中，你应该能找到我们的自定义指标，初始值为0：
        ```
        # HELP orders_counter_total The number of successful orders
        # TYPE orders_counter_total counter
        orders_counter_total{status="success",} 0.0
        # HELP orders_counter_total The number of failed orders
        # TYPE orders_counter_total counter
        orders_counter_total{status="failed",} 0.0
        ```
    3.  使用curl模拟创建几个订单：
        ```bash
        curl -X POST http://localhost:8080/orders?success=true
        curl -X POST http://localhost:8080/orders?success=true
        curl -X POST http://localhost:8080/orders?success=false
        ```
    4.  再次刷新 `http://localhost:8080/actuator/prometheus`，你会看到指标值已经更新：
        ```
        orders_counter_total{status="success",} 2.0
        orders_counter_total{status="failed",} 1.0
        ```
    5.  打开Prometheus UI `http://localhost:9090`。在查询框中输入`orders_counter_total`并执行，你就能看到Prometheus已经抓取到了这些数据，并可以对其进行图表展示和告警设置。

---

## 十五、 响应式编程栈 (Reactive Stack)

### 16. Project Reactor

*   **简介**: Spring响应式编程栈的基石，提供`Mono`和`Flux`两种发布者类型来处理异步数据流。
*   **官网/源码地址**:
    *   **Project Reactor 官网**: [https://projectreactor.io/](https://projectreactor.io/)
    *   **GitHub 源码**: [https://github.com/reactor/reactor-core](https://github.com/reactor/reactor-core)

*   **完整案例**:
    我们将创建一个简单的非Web应用，来演示`Flux`和`Mono`的基本用法和操作符。

    **步骤 1: 创建项目 `reactor-demo`**
    *   **`pom.xml` 依赖**:
        ```xml
        <dependencies>
            <dependency>
                <groupId>io.projectreactor</groupId>
                <artifactId>reactor-core</artifactId>
            </dependency>
            <!-- 用于测试 -->
            <dependency>
                <groupId>io.projectreactor</groupId>
                <artifactId>reactor-test</artifactId>
                <scope>test</scope>
            </dependency>
            <dependency>
                <groupId>org.junit.jupiter</groupId>
                <artifactId>junit-jupiter-api</artifactId>
                <scope>test</scope>
            </dependency>
        </dependencies>
        ```
    *   **创建 `ReactorExamples.java`**:
        ```java
        import reactor.core.publisher.Flux;
        import reactor.core.publisher.Mono;
        import java.time.Duration;

        public class ReactorExamples {

            public static void main(String[] args) throws InterruptedException {
                // --- Flux 示例 (0-N个元素) ---
                System.out.println("--- Flux Example ---");
                Flux<String> fruitFlux = Flux.just("Apple", "Orange", "Grape", "Banana", "Strawberry")
                        .filter(f -> f.length() > 5)
                        .map(String::toUpperCase)
                        .delayElements(Duration.ofMillis(500)); // 每个元素延迟500ms发出

                // 订阅并处理数据流
                fruitFlux.subscribe(
                        fruit -> System.out.println("Consumed: " + fruit), // onNext
                        error -> System.err.println("Error: " + error),   // onError
                        () -> System.out.println("Flux Completed!")      // onComplete
                );

                // --- Mono 示例 (0-1个元素) ---
                System.out.println("\n--- Mono Example ---");
                Mono<String> userMono = Mono.just("john.doe")
                        .map(name -> "@" + name);

                // 阻塞式获取结果 (仅用于演示，实际应用中应避免)
                String user = userMono.block();
                System.out.println("Blocked to get user: " + user);


                // 保持主线程存活以观察异步结果
                Thread.sleep(4000);
            }
        }
        ```
        *   `Flux.just(...)`: 创建一个包含多个元素的Flux。
        *   `.filter()`, `.map()`: 类似于Java Stream API的操作符，对数据流进行转换。
        *   `.delayElements()`: 这是一个异步操作符，它会让每个元素的发出都延迟一段时间。
        *   `.subscribe()`: 启动数据流的处理。响应式流是"懒"的，没有订阅者就不会有任何事情发生。
        *   `Mono.just(...)`: 创建一个只包含一个元素的Mono。
        *   `.block()`: 阻塞当前线程，直到Mono发出元素或完成。**在生产代码（尤其是WebFlux中）应极力避免使用！**

    **步骤 2: 运行与测试**
    1.  直接运行`ReactorExamples`的`main`方法。
    2.  观察控制台输出。你会先看到"Mono Example"的结果被立即打印出来，因为我们使用了`block()`。
    3.  然后，"Flux Example"的结果会每隔半秒打印一个，展示了异步数据流的特性。
        ```
        --- Flux Example ---

        --- Mono Example ---
        Blocked to get user: @john.doe
        Consumed: ORANGE
        Consumed: GRAPE
        Consumed: BANANA
        Consumed: STRAWBERRY
        Flux Completed!
        ```

### 17. R2DBC (Reactive Relational Database Connectivity)

*   **简介**: R2DBC是JDBC的响应式替代品，定义了一套用于异步、非阻塞地访问关系型数据库的API。
*   **官网/源码地址**:
    *   **R2DBC 官网**: [https://r2dbc.io/](https://r2dbc.io/)
    *   **Spring Data R2DBC**: [https://spring.io/projects/spring-data-r2dbc](https://spring.io/projects/spring-data-r2dbc)

*   **完整案例**:
    我们将创建一个使用WebFlux和R2DBC的应用，实现对H2数据库的完全非阻塞的CRUD操作。

    **步骤 1: 创建项目 `r2dbc-demo`**
    *   **`pom.xml` 依赖**:
        ```xml
        <dependencies>
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-starter-webflux</artifactId> <!-- 响应式Web -->
            </dependency>
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-starter-data-r2dbc</artifactId> <!-- R2DBC -->
            </dependency>
            <dependency>
                <groupId>io.r2dbc</groupId>
                <artifactId>r2dbc-h2</artifactId> <!-- H2的R2DBC驱动 -->
                <scope>runtime</scope>
            </dependency>
        </dependencies>
        ```
    *   **`src/main/resources/application.properties`**:
        R2DBC的连接URL格式是`r2dbc:`开头的。
        ```properties
        spring.r2dbc.url=r2dbc:h2:mem:///testdb?options=DB_CLOSE_DELAY=-1
        spring.r2dbc.username=sa
        spring.r2dbc.password=
        ```
    *   **`src/main/resources/schema.sql`**:
        在应用启动时，Spring Boot会自动执行这个文件来初始化数据库。
        ```sql
        CREATE TABLE customer (id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255));
        ```
    *   **创建实体 (`Customer.java`)**:
        使用`@Table`和`@Id`注解，类似于JPA，但来自`org.springframework.data.relational.core.mapping`。
        ```java
        import org.springframework.data.annotation.Id;
        import org.springframework.data.relational.core.mapping.Table;

        @Table("customer")
        public class Customer {
            @Id
            private Integer id;
            private String name;
            // constructor, getters, setters, toString
        }
        ```
    *   **创建响应式仓库 (`CustomerRepository.java`)**:
        继承`ReactiveCrudRepository`，它提供了一系列返回`Flux`和`Mono`的CRUD方法。
        ```java
        import org.springframework.data.repository.reactive.ReactiveCrudRepository;
        import reactor.core.publisher.Flux;

        public interface CustomerRepository extends ReactiveCrudRepository<Customer, Integer> {
            Flux<Customer> findByName(String name);
        }
        ```
    *   **创建Handler和Router (`CustomerRouter.java`)**:
        在WebFlux中，除了使用`@RestController`，还可以使用函数式路由来定义端点。
        ```java
        import org.springframework.context.annotation.Bean;
        import org.springframework.context.annotation.Configuration;
        import org.springframework.web.reactive.function.server.RouterFunction;
        import org.springframework.web.reactive.function.server.ServerResponse;
        import static org.springframework.web.reactive.function.server.RequestPredicates.*;
        import static org.springframework.web.reactive.function.server.RouterFunctions.route;

        @Configuration
        public class CustomerRouter {

            @Bean
            public RouterFunction<ServerResponse> customerRoutes(CustomerRepository repository) {
                return route(GET("/customers"),
                        request -> ServerResponse.ok().body(repository.findAll(), Customer.class))
                        .andRoute(GET("/customers/{id}"),
                                request -> repository.findById(Integer.valueOf(request.pathVariable("id")))
                                        .flatMap(customer -> ServerResponse.ok().bodyValue(customer))
                                        .switchIfEmpty(ServerResponse.notFound().build()))
                        .andRoute(POST("/customers"),
                                request -> request.bodyToMono(Customer.class)
                                        .flatMap(repository::save)
                                        .flatMap(savedCustomer -> ServerResponse.ok().bodyValue(savedCustomer)));
            }
        }
        ```

    **步骤 2: 运行与测试**
    1.  启动 `r2dbc-demo` 应用。
    2.  使用curl进行测试：
        *   **创建用户**:
            ```bash
            curl -X POST -H "Content-Type: application/json" -d '{"name":"Alice"}' http://localhost:8080/customers
            # 响应: {"id":1,"name":"Alice"}
            curl -X POST -H "Content-Type: application/json" -d '{"name":"Bob"}' http://localhost:8080/customers
            # 响应: {"id":2,"name":"Bob"}
            ```
        *   **查询所有用户**:
            ```bash
            curl http://localhost:8080/customers
            # 响应: [{"id":1,"name":"Alice"},{"id":2,"name":"Bob"}]
            ```
        *   **按ID查询用户**:
            ```bash
            curl http://localhost:8080/customers/1
            # 响应: {"id":1,"name":"Alice"}
            ```
        *   **查询不存在的用户**:
            ```bash
            curl -i http://localhost:8080/customers/99
            # 响应状态码: HTTP/1.1 404 Not Found
            ```
    整个请求处理链路，从WebFlux接收请求到R2DBC访问数据库，都是完全非阻塞的，能够用少量线程处理大量并发连接。



## 十五、 响应式编程栈 (Reactive Stack) - 续

### 18. 响应式 NoSQL 驱动 (MongoDB Reactive)

*   **简介**: 许多现代NoSQL数据库的Java驱动本身就是响应式的。`spring-boot-starter-data-mongodb-reactive` 启动器为MongoDB的响应式操作提供了无缝集成。
*   **官网/源码地址**:
    *   **Spring Data MongoDB**: [https://spring.io/projects/spring-data-mongodb](https://spring.io/projects/spring-data-mongodb)
    *   **MongoDB Java Driver**: [https://www.mongodb.com/docs/drivers/java/sync/current/](https://www.mongodb.com/docs/drivers/java/sync/current/)

*   **完整案例**:
    我们将创建一个完全响应式的WebFlux应用，用于对MongoDB中的`Product`文档进行CRUD操作。

    **步骤 1: 启动 MongoDB 实例**
    使用 Docker 是最便捷的方式：
    ```bash
    docker run -d -p 27017:27017 --name my-mongo mongo
    ```

    **步骤 2: 创建项目 `mongodb-reactive-demo`**
    *   **`pom.xml` 依赖**:
        ```xml
        <dependencies>
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-starter-webflux</artifactId>
            </dependency>
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-starter-data-mongodb-reactive</artifactId>
            </dependency>
        </dependencies>
        ```
    *   **`src/main/resources/application.properties`**:
        配置MongoDB的连接信息。响应式和非响应式使用相同的配置属性。
        ```properties
        spring.data.mongodb.uri=mongodb://localhost:27017/testdb
        ```
    *   **创建文档模型 (`Product.java`)**:
        使用`@Document`注解标记这是一个MongoDB文档。`@Id`会自动映射到MongoDB的`_id`字段。
        ```java
        import org.springframework.data.annotation.Id;
        import org.springframework.data.mongodb.core.mapping.Document;

        @Document(collection = "products")
        public class Product {
            @Id
            private String id;
            private String name;
            private double price;
            // Constructors, getters, setters, toString
        }
        ```
    *   **创建响应式仓库 (`ProductRepository.java`)**:
        继承`ReactiveMongoRepository`，它提供了丰富的响应式查询方法。
        ```java
        import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
        import reactor.core.publisher.Flux;

        public interface ProductRepository extends ReactiveMongoRepository<Product, String> {
            Flux<Product> findByPriceLessThan(double price);
        }
        ```
    *   **创建 `ProductController.java`**:
        使用`@RestController`风格来定义响应式端点。
        ```java
        import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.http.HttpStatus;
        import org.springframework.http.ResponseEntity;
        import org.springframework.web.bind.annotation.*;
        import reactor.core.publisher.Flux;
        import reactor.core.publisher.Mono;

        @RestController
        @RequestMapping("/products")
        public class ProductController {

            @Autowired
            private ProductRepository repository;

            @GetMapping
            public Flux<Product> getAllProducts() {
                return repository.findAll();
            }

            @GetMapping("/{id}")
            public Mono<ResponseEntity<Product>> getProductById(@PathVariable String id) {
                return repository.findById(id)
                        .map(ResponseEntity::ok) // 如果找到，返回 200 OK 和产品
                        .defaultIfEmpty(ResponseEntity.notFound().build()); // 如果没找到，返回 404 Not Found
            }

            @PostMapping
            @ResponseStatus(HttpStatus.CREATED)
            public Mono<Product> createProduct(@RequestBody Product product) {
                return repository.save(product);
            }

            @PutMapping("/{id}")
            public Mono<ResponseEntity<Product>> updateProduct(@PathVariable String id, @RequestBody Product product) {
                return repository.findById(id)
                        .flatMap(existingProduct -> {
                            existingProduct.setName(product.getName());
                            existingProduct.setPrice(product.getPrice());
                            return repository.save(existingProduct);
                        })
                        .map(ResponseEntity::ok)
                        .defaultIfEmpty(ResponseEntity.notFound().build());
            }

            @DeleteMapping("/{id}")
            public Mono<ResponseEntity<Void>> deleteProduct(@PathVariable String id) {
                return repository.findById(id)
                        .flatMap(existingProduct ->
                                repository.delete(existingProduct)
                                        .then(Mono.just(ResponseEntity.ok().<Void>build()))
                        )
                        .defaultIfEmpty(ResponseEntity.notFound().build());
            }
        }
        ```

    **步骤 3: 运行与测试**
    1.  确保MongoDB容器正在运行。
    2.  启动 `mongodb-reactive-demo` 应用。
    3.  使用curl进行测试：
        *   **创建产品**: `curl -X POST -H "Content-Type: application/json" -d '{"name":"Laptop", "price":1200.0}' http://localhost:8080/products`
        *   **查询所有产品**: `curl http://localhost:8080/products`
        *   **按ID查询**: `curl http://localhost:8080/products/{id}` (将`{id}`替换为上一步返回的ID)
        *   **更新产品**: `curl -X PUT -H "Content-Type: application/json" -d '{"name":"Gaming Laptop", "price":1500.0}' http://localhost:8080/products/{id}`
        *   **删除产品**: `curl -X DELETE http://localhost:8080/products/{id}`

    这个案例展示了如何利用Spring Data Reactive MongoDB构建一个从Web层到数据层完全非阻塞的应用，这对于需要高吞吐量的I/O密集型服务非常有利。

---

## 十六、 其他RPC与API协议

### 19. gRPC

*   **简介**: gRPC是Google开发的高性能RPC框架，使用HTTP/2和Protocol Buffers。`yidongnan/grpc-spring-boot-starter` 是一个广受欢迎的社区项目，极大地简化了集成。
*   **官网/源码地址**:
    *   **gRPC 官网**: [https://grpc.io/](https://grpc.io/)
    *   **grpc-spring-boot-starter GitHub**: [https://github.com/yidongnan/grpc-spring-boot-starter](https://github.com/yidongnan/grpc-spring-boot-starter)

*   **完整案例**:
    我们将创建一个gRPC服务（`GreeterService`）和一个调用该服务的gRPC客户端。

    **步骤 1: 项目设置**
    创建一个Maven多模块项目 `grpc-demo`，包含三个模块：
    1.  `grpc-interface`: 定义 `.proto` 文件和生成的Java代码。
    2.  `grpc-server`: Spring Boot应用，实现gRPC服务。
    3.  `grpc-client`: Spring Boot应用，调用gRPC服务。

    **步骤 1a: `grpc-interface` 模块**
    *   **`pom.xml`**: 配置 `protobuf-maven-plugin` 来从 `.proto` 文件生成Java代码。
        ```xml
        <properties>
            <grpc.version>1.58.0</grpc.version>
            <protobuf.version>3.24.3</protobuf.version>
        </properties>
        <dependencies>
            <dependency>
                <groupId>io.grpc</groupId>
                <artifactId>grpc-stub</artifactId>
                <version>${grpc.version}</version>
            </dependency>
            <dependency>
                <groupId>io.grpc</groupId>
                <artifactId>grpc-protobuf</artifactId>
                <version>${grpc.version}</version>
            </dependency>
            <dependency>
                <groupId>jakarta.annotation</groupId>
                <artifactId>jakarta.annotation-api</artifactId>
                <version>2.1.1</version>
                <optional>true</optional>
            </dependency>
        </dependencies>
        <build>
            <extensions>
                <extension>
                    <groupId>kr.motd.maven</groupId>
                    <artifactId>os-maven-plugin</artifactId>
                    <version>1.7.1</version>
                </extension>
            </extensions>
            <plugins>
                <plugin>
                    <groupId>org.xolstice.maven.plugins</groupId>
                    <artifactId>protobuf-maven-plugin</artifactId>
                    <version>0.6.1</version>
                    <configuration>
                        <protocArtifact>com.google.protobuf:protoc:${protobuf.version}:exe:${os.detected.classifier}</protocArtifact>
                        <pluginId>grpc-java</pluginId>
                        <pluginArtifact>io.grpc:protoc-gen-grpc-java:${grpc.version}:exe:${os.detected.classifier}</pluginArtifact>
                    </configuration>
                    <executions>
                        <execution>
                            <goals>
                                <goal>compile</goal>
                                <goal>compile-custom</goal>
                            </goals>
                        </execution>
                    </executions>
                </plugin>
            </plugins>
        </build>
        ```
    *   **`src/main/proto/Greeter.proto`**: 定义服务接口。
        ```proto
        syntax = "proto3";
        option java_multiple_files = true;
        option java_package = "com.example.grpc.api";
        option java_outer_classname = "GreeterProto";

        service Greeter {
          rpc SayHello (HelloRequest) returns (HelloReply) {}
        }

        message HelloRequest {
          string name = 1;
        }

        message HelloReply {
          string message = 1;
        }
        ```
    运行 `mvn clean install` 在这个模块上，它会在 `target/generated-sources` 目录下生成Java代码。

    **步骤 1b: `grpc-server` 模块**
    *   **`pom.xml`**: 添加 `grpc-spring-boot-starter` 和对 `grpc-interface` 模块的依赖。
        ```xml
        <dependencies>
            <dependency>
                <groupId>net.devh</groupId>
                <artifactId>grpc-server-spring-boot-starter</artifactId>
                <version>2.15.0.RELEASE</version>
            </dependency>
            <dependency>
                <groupId>com.example</groupId>
                <artifactId>grpc-interface</artifactId>
                <version>0.0.1-SNAPSHOT</version>
            </dependency>
        </dependencies>
        ```
    *   **`application.properties`**: 配置gRPC服务器端口。
        ```properties
        grpc.server.port=9090
        ```
    *   **`GreeterServiceImpl.java`**: 实现生成的服务基类，并使用`@GrpcService`注解。
        ```java
        import com.example.grpc.api.GreeterGrpc;
        import com.example.grpc.api.HelloReply;
        import com.example.grpc.api.HelloRequest;
        import io.grpc.stub.StreamObserver;
        import net.devh.boot.grpc.server.service.GrpcService;

        @GrpcService
        public class GreeterServiceImpl extends GreeterGrpc.GreeterImplBase {
            @Override
            public void sayHello(HelloRequest request, StreamObserver<HelloReply> responseObserver) {
                String message = "Hello, " + request.getName();
                HelloReply reply = HelloReply.newBuilder().setMessage(message).build();
                responseObserver.onNext(reply);
                responseObserver.onCompleted();
            }
        }
        ```

    **步骤 1c: `grpc-client` 模块**
    *   **`pom.xml`**: 添加 `grpc-client-spring-boot-starter` 和对 `grpc-interface` 的依赖。
        ```xml
        <dependencies>
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-starter-web</artifactId>
            </dependency>
            <dependency>
                <groupId>net.devh</groupId>
                <artifactId>grpc-client-spring-boot-starter</artifactId>
                <version>2.15.0.RELEASE</version>
            </dependency>
            <dependency>
                <groupId>com.example</groupId>
                <artifactId>grpc-interface</artifactId>
                <version>0.0.1-SNAPSHOT</version>
            </dependency>
        </dependencies>
        ```
    *   **`application.properties`**: 配置要连接的gRPC服务器地址。
        ```properties
        grpc.client.greeter-service.address=static://localhost:9090
        grpc.client.greeter-service.negotiation-type=plaintext
        ```
    *   **`GreetingController.java`**: 使用 `@GrpcClient` 注解注入一个gRPC stub，并创建REST端点来触发调用。
        ```java
        import com.example.grpc.api.GreeterGrpc;
        import com.example.grpc.api.HelloRequest;
        import net.devh.boot.grpc.client.inject.GrpcClient;
        import org.springframework.web.bind.annotation.GetMapping;
        import org.springframework.web.bind.annotation.RequestParam;
        import org.springframework.web.bind.annotation.RestController;

        @RestController
        public class GreetingController {

            @GrpcClient("greeter-service") // 对应于配置文件中的 "greeter-service"
            private GreeterGrpc.GreeterBlockingStub greeterStub;

            @GetMapping("/greet")
            public String greet(@RequestParam String name) {
                HelloRequest request = HelloRequest.newBuilder().setName(name).build();
                return greeterStub.sayHello(request).getMessage();
            }
        }
        ```

    **步骤 2: 运行与测试**
    1.  运行 `grpc-server` 应用。
    2.  运行 `grpc-client` 应用。
    3.  访问 `http://localhost:8080/greet?name=World`。
    4.  浏览器将显示响应 `Hello, World`。这个响应是通过 `grpc-client` 向 `grpc-server` 发起了一次gRPC调用后获得的。

---

## 十七、 应用功能与工具 (Application Features & Utilities)

### 20. 异步方法执行 (@Async)

*   **简介**: 通过`@Async`注解，让一个方法在后台线程池中异步执行，避免阻塞主线程。
*   **官网/源码地址**: [https://docs.spring.io/spring-framework/docs/current/reference/html/integration.html#async](https://docs.spring.io/spring-framework/docs/current/reference/html/integration.html#async)

*   **完整案例**:
    我们将创建一个`NotificationService`，它的`sendNotification`方法是耗时的，我们使用`@Async`使其异步执行。

    **步骤 1: 创建项目 `async-demo`**
    *   **`pom.xml`**: 只需 `spring-boot-starter-web`。
    *   **`AsyncDemoApplication.java`**:
        在主类上使用`@EnableAsync`启用异步功能。
        ```java
        import org.springframework.boot.SpringApplication;
        import org.springframework.boot.autoconfigure.SpringBootApplication;
        import org.springframework.scheduling.annotation.EnableAsync;

        @SpringBootApplication
        @EnableAsync
        public class AsyncDemoApplication {
            public static void main(String[] args) {
                SpringApplication.run(AsyncDemoApplication.class, args);
            }
        }
        ```
    *   **创建`NotificationService.java`**:
        ```java
        import org.slf4j.Logger;
        import org.slf4j.LoggerFactory;
        import org.springframework.scheduling.annotation.Async;
        import org.springframework.stereotype.Service;

        @Service
        public class NotificationService {
            private static final Logger log = LoggerFactory.getLogger(NotificationService.class);

            @Async // 核心注解
            public void sendNotification(String message) {
                log.info("Sending notification: '{}' on thread: {}", message, Thread.currentThread().getName());
                try {
                    // 模拟耗时的网络调用
                    Thread.sleep(3000);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
                log.info("Notification sent successfully!");
            }
        }
        ```
    *   **创建`OrderController.java`**:
        ```java
        import org.slf4j.Logger;
        import org.slf4j.LoggerFactory;
        import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.web.bind.annotation.PostMapping;
        import org.springframework.web.bind.annotation.RestController;

        @RestController
        public class OrderController {
            private static final Logger log = LoggerFactory.getLogger(OrderController.class);

            @Autowired
            private NotificationService notificationService;

            @PostMapping("/orders")
            public String createOrder() {
                log.info("Creating order on thread: {}", Thread.currentThread().getName());
                notificationService.sendNotification("Your order has been placed!");
                log.info("Order creation process finished. HTTP response sent.");
                return "Order created! Notification will be sent in the background.";
            }
        }
        ```

    **步骤 2: 运行与测试**
    1.  启动 `async-demo` 应用。
    2.  使用curl发送请求: `curl -X POST http://localhost:8080/orders`。
    3.  观察结果：
        *   你会几乎**立即**收到响应 `"Order created! Notification will be sent in the background."`。
        *   查看控制台日志，你会看到类似这样的输出，顺序很重要：
        ```
        INFO --- [nio-8080-exec-1] c.e.ad.OrderController   : Creating order on thread: http-nio-8080-exec-1
        INFO --- [nio-8080-exec-1] c.e.ad.OrderController   : Order creation process finished. HTTP response sent.
        INFO --- [   task-1      ] c.e.ad.NotificationService : Sending notification: 'Your order has been placed!' on thread: task-1
        # ... 3秒后 ...
        INFO --- [   task-1      ] c.e.ad.NotificationService : Notification sent successfully!
        ```
    日志清晰地显示，`OrderController`在`http-nio`线程上快速完成了它的工作并返回了HTTP响应。而`sendNotification`方法则在Spring管理的另一个线程池（`task-1`）中独立运行，没有阻塞控制器。

### 21. 任务调度 (@Scheduled)

*   **简介**: 使用`@Scheduled`注解，以固定速率或cron表达式周期性地执行方法。
*   **官网/源码地址**: [https://docs.spring.io/spring-framework/docs/current/reference/html/integration.html#scheduling](https://docs.spring.io/spring-framework/docs/current/reference/html/integration.html#scheduling)

*   **完整案例**:
    我们将创建一个`ScheduledTasks`类，包含几个不同类型的定时任务。

    **步骤 1: 创建项目 `scheduling-demo`**
    *   **`pom.xml`**: 只需 `spring-boot-starter`。
    *   **`SchedulingDemoApplication.java`**:
        虽然Spring Boot 2.x以后常常会自动检测`@Scheduled`并启用调度，但显式添加`@EnableScheduling`是最佳实践。
        ```java
        import org.springframework.boot.SpringApplication;
        import org.springframework.boot.autoconfigure.SpringBootApplication;
        import org.springframework.scheduling.annotation.EnableScheduling;

        @SpringBootApplication
        @EnableScheduling
        public class SchedulingDemoApplication {
            public static void main(String[] args) {
                SpringApplication.run(SchedulingDemoApplication.class, args);
            }
        }
        ```
    *   **创建`ScheduledTasks.java`**:
        ```java
        import org.slf4j.Logger;
        import org.slf4j.LoggerFactory;
        import org.springframework.scheduling.annotation.Scheduled;
        import org.springframework.stereotype.Component;
        import java.time.LocalDateTime;
        import java.util.concurrent.TimeUnit;

        @Component
        public class ScheduledTasks {

            private static final Logger log = LoggerFactory.getLogger(ScheduledTasks.class);

            // fixedRate: 每隔3秒执行一次，从任务开始时计时
            @Scheduled(fixedRate = 3000)
            public void reportCurrentTime() {
                log.info("[Fixed Rate] The time is now {}", LocalDateTime.now());
            }

            // fixedDelay: 上次任务结束后，延迟5秒再执行下一次
            @Scheduled(fixedDelay = 5000)
            public void longRunningTask() throws InterruptedException {
                log.info("[Fixed Delay] Starting a long task...");
                TimeUnit.SECONDS.sleep(2); // 模拟任务执行耗时2秒
                log.info("[Fixed Delay] Long task finished at {}", LocalDateTime.now());
            }

            // cron: 使用cron表达式，每分钟的第15秒执行
            @Scheduled(cron = "15 * * * * ?")
            public void reportAtFifteenSeconds() {
                log.warn("[Cron] It's the 15th second of a minute: {}", LocalDateTime.now());
            }
        }
        ```

    **步骤 2: 运行与测试**
    1.  启动 `scheduling-demo` 应用。
    2.  观察控制台日志：
        *   你会看到 `[Fixed Rate]` 日志大约每3秒出现一次。
        *   `[Fixed Delay]` 任务会先执行2秒，然后等待5秒，所以它的日志大约每7秒出现一次。
        *   `[Cron]` 任务只会在你的系统时间的秒针走到15时才会打印日志。

### 22. 国际化 (i18n)

*   **简介**: Spring Boot遵循Spring框架的国际化支持，通过`MessageSource`自动从`messages*.properties`文件中加载消息。
*   **官网/源码地址**: [https://docs.spring.io/spring-boot/docs/current/reference/html/features.html#features.internationalization](https://docs.spring.io/spring-boot/docs/current/reference/html/features.html#features.internationalization)

*   **完整案例**:
    我们将创建一个REST端点，它根据HTTP请求头中的`Accept-Language`返回不同语言的欢迎消息。

    **步骤 1: 创建项目 `i18n-demo`**
    *   **`pom.xml`**: 只需 `spring-boot-starter-web`。
    *   **创建消息属性文件**:
        在 `src/main/resources` 目录下创建以下文件：
        *   **`messages.properties`** (默认，英文):
            ```properties
            welcome.message=Hello and welcome!
            ```
        *   **`messages_es.properties`** (西班牙语):
            ```properties
            welcome.message=¡Hola y bienvenido!
            ```
        *   **`messages_de.properties`** (德语):
            ```properties
            welcome.message=Hallo und herzlich willkommen!
            ```
    *   **创建 `GreetingController.java`**:
        ```java
        import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.context.MessageSource;
        import org.springframework.context.i18n.LocaleContextHolder;
        import org.springframework.web.bind.annotation.GetMapping;
        import org.springframework.web.bind.annotation.RestController;

        @RestController
        public class GreetingController {

            @Autowired
            private MessageSource messageSource;

            @GetMapping("/welcome")
            public String getWelcomeMessage() {
                // LocaleContextHolder会自动从请求中解析出Locale
                return messageSource.getMessage("welcome.message", null, LocaleContextHolder.getLocale());
            }
        }
        ```
        Spring Boot会自动配置一个`MessageSource` Bean。`LocaleContextHolder`是一个线程安全的持有器，Spring MVC会自动将请求的`Locale`（通常从`Accept-Language`头解析）设置进去。

    **步骤 2: 运行与测试**
    1.  启动 `i18n-demo` 应用。
    2.  使用curl进行测试，通过`-H`参数设置不同的`Accept-Language`头：
        *   **请求英文 (或不指定，使用默认)**:
            ```bash
            curl http://localhost:8080/welcome
            # 响应: Hello and welcome!
            ```
        *   **请求西班牙语**:
            ```bash
            curl -H "Accept-Language: es" http://localhost:8080/welcome
            # 响应: ¡Hola y bienvenido!
            ```
        *   **请求德语**:
            ```bash
            curl -H "Accept-Language: de-DE" http://localhost:8080/welcome
            # 响应: Hallo und herzlich willkommen!
            ```
    这个例子展示了如何轻松地利用Spring Boot的自动配置实现国际化，而无需手动配置`MessageSource`。



## 十七、 应用功能与工具 (Application Features & Utilities) - 续

### 23. 序列化格式支持 (JSON - Jackson 定制)

*   **简介**: Spring Boot 默认使用 Jackson 进行 JSON 序列化和反序列化。我们可以通过多种方式轻松定制其行为，例如通过`application.properties`或自定义`Jackson2ObjectMapperBuilderCustomizer`。
*   **官网/源码地址**:
    *   **Spring Boot Jackson Support**: [https://docs.spring.io/spring-boot/docs/current/reference/html/features.html#features.json](https://docs.spring.io/spring-boot/docs/current/reference/html/features.html#features.json)
    *   **Jackson Project**: [https://github.com/FasterXML/jackson](https://github.com/FasterXML/jackson)

*   **完整案例**:
    我们将创建一个返回`User`对象的API，并定制Jackson的行为：
    1.  忽略值为`null`的字段。
    2.  将日期格式化为`yyyy-MM-dd HH:mm:ss`。
    3.  启用美化输出（pretty-printing）。

    **步骤 1: 创建项目 `jackson-custom-demo`**
    *   **`pom.xml`**: `spring-boot-starter-web` (默认已包含`spring-boot-starter-json`)。
    *   **创建`User.java`**:
        ```java
        import java.time.LocalDateTime;

        public class User {
            private String username;
            private String email; // This can be null
            private LocalDateTime registrationDate;

            public User(String username, String email, LocalDateTime registrationDate) {
                this.username = username;
                this.email = email;
                this.registrationDate = registrationDate;
            }
            // Getters and Setters
        }
        ```
    *   **创建`UserController.java`**:
        ```java
        import org.springframework.web.bind.annotation.GetMapping;
        import org.springframework.web.bind.annotation.RestController;
        import java.time.LocalDateTime;
        import java.util.Arrays;
        import java.util.List;

        @RestController
        public class UserController {
            @GetMapping("/users")
            public List<User> getUsers() {
                return Arrays.asList(
                    new User("alice", "alice@example.com", LocalDateTime.now()),
                    new User("bob", null, LocalDateTime.now().minusDays(1))
                );
            }
        }
        ```

    **方法一：通过 `application.properties` 定制**
    这是最简单的方式，支持常见的定制选项。
    *   **`src/main/resources/application.properties`**:
        ```properties
        # 忽略null字段
        spring.jackson.default-property-inclusion=non_null
        # 美化输出
        spring.jackson.serialization.indent_output=true
        # 全局日期格式化
        spring.jackson.date-format=yyyy-MM-dd HH:mm:ss
        ```
    *   **运行与测试**:
        启动应用并访问 `http://localhost:8080/users`。你会看到如下格式的响应，`bob`的`email`字段被忽略了，日期格式正确，且JSON是格式化的。
        ```json
        [ {
          "username" : "alice",
          "email" : "alice@example.com",
          "registrationDate" : "2023-10-27 10:30:00"
        }, {
          "username" : "bob",
          "registrationDate" : "2023-10-26 10:30:00"
        } ]
        ```

    **方法二：通过 `Jackson2ObjectMapperBuilderCustomizer` Bean (更灵活)**
    如果需要更高级的定制（比如注册自定义模块），可以使用这个方法。
    *   **首先，移除或注释掉 `application.properties` 中的Jackson配置**。
    *   **创建配置类 `JacksonConfig.java`**:
        ```java
        import com.fasterxml.jackson.annotation.JsonInclude;
        import com.fasterxml.jackson.databind.SerializationFeature;
        import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
        import org.springframework.boot.autoconfigure.jackson.Jackson2ObjectMapperBuilderCustomizer;
        import org.springframework.context.annotation.Bean;
        import org.springframework.context.annotation.Configuration;
        import java.time.format.DateTimeFormatter;

        @Configuration
        public class JacksonConfig {

            @Bean
            public Jackson2ObjectMapperBuilderCustomizer jsonCustomizer() {
                return builder -> {
                    // 忽略null字段
                    builder.serializationInclusion(JsonInclude.Include.NON_NULL);
                    // 美化输出
                    builder.featuresToEnable(SerializationFeature.INDENT_OUTPUT);
                    // 自定义LocalDateTime序列化格式
                    builder.serializers(new LocalDateTimeSerializer(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
                };
            }
        }
        ```
    *   **运行与测试**:
        启动应用并访问 `http://localhost:8080/users`，你会得到与方法一完全相同的结果。这种方式提供了编程的全部灵活性。

---

### 24. 容器化支持 (Cloud Native Buildpacks)

*   **简介**: 通过Buildpacks插件 (`spring-boot-maven-plugin`的`build-image`目标)，无需编写Dockerfile就能构建出优化过的、生产级的容器镜像。
*   **官网/源码地址**:
    *   **Spring Boot Container Images**: [https://docs.spring.io/spring-boot/docs/current/reference/html/container-images.html](https://docs.spring.io/spring-boot/docs/current/reference/html/container-images.html)
    *   **Buildpacks.io**: [https://buildpacks.io/](https://buildpacks.io/)

*   **完整案例**:
    我们将使用Maven命令直接将任何一个之前的Spring Boot项目（例如 `jackson-custom-demo`）打包成Docker镜像。

    **前提条件**:
    *   你的机器上必须安装并运行 Docker。

    **步骤 1: 确保`spring-boot-maven-plugin`存在**
    通常，由`start.spring.io`生成的项目`pom.xml`中已经包含了这个插件。
    ```xml
    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
    ```

    **步骤 2: 执行构建命令**
    在`jackson-custom-demo`项目的根目录下，打开终端，执行以下命令：
    ```bash
    mvn spring-boot:build-image
    ```
    这个过程会需要一些时间，特别是第一次执行时，因为它需要下载`builder`和`run image`。你会看到类似以下的日志：
    ```
    ...
    [INFO] --- spring-boot-maven-plugin:3.x.x:build-image (default-cli) @ jackson-custom-demo ---
    [INFO] Building image 'docker.io/library/jackson-custom-demo:0.0.1-SNAPSHOT'
    [INFO]
    [INFO] > Executing lifecycle version v0.17.6
    [INFO] > Using build cache volume 'pack-cache-e26b1c97a76c.build'
    ...
    [INFO] > Builder's lifecycle version: 0.17.6
    [INFO] > Building image 'docker.io/library/jackson-custom-demo:0.0.1-SNAPSHOT'
    ...
    [INFO] Successfully built image 'docker.io/library/jackson-custom-demo:0.0.1-SNAPSHOT'
    ```

    **步骤 3: 验证和运行镜像**
    1.  **查看本地镜像**:
        ```bash
        docker images
        ```
        你应该能看到一个名为 `jackson-custom-demo`，标签为 `0.0.1-SNAPSHOT` 的新镜像。

    2.  **运行容器**:
        ```bash
        docker run -p 8080:8080 jackson-custom-demo:0.0.1-SNAPSHOT
        ```
        容器会启动，并且Spring Boot应用开始运行。

    3.  **测试**:
        在浏览器或使用curl访问 `http://localhost:8080/users`，你会得到和之前一样的JSON响应。

    **定制镜像名称**:
    你可以在`pom.xml`中配置插件来定制镜像的名称。
    ```xml
    <plugin>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-maven-plugin</artifactId>
        <configuration>
            <image>
                <name>my-registry/my-app:${project.version}</name>
            </image>
        </configuration>
    </plugin>
    ```
    再次运行`mvn spring-boot:build-image`，生成的镜像名就会变成 `my-registry/my-app:0.0.1-SNAPSHOT`。

---

## 十八、 Web服务器 (Web Servers)

### 25. 切换内嵌Web服务器 (从Tomcat到Undertow)

*   **简介**: Spring Boot允许轻松切换内嵌的Web服务器。Undertow是一个来自JBoss/Red Hat的高性能Web服务器，以其高性能和灵活性著称。
*   **官网/源码地址**:
    *   **Undertow**: [https://undertow.io/](https://undertow.io/)

*   **完整案例**:
    我们将修改`jackson-custom-demo`项目，将其默认的Tomcat服务器替换为Undertow。

    **步骤 1: 修改`pom.xml`**
    在`spring-boot-starter-web`依赖中，排除默认的Tomcat，然后添加Undertow的启动器。
    ```xml
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
        <exclusions>
            <exclusion>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-starter-tomcat</artifactId>
            </exclusion>
        </exclusions>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-undertow</artifactId>
    </dependency>
    ```

    **步骤 2: (可选) 定制Undertow**
    你可以在`application.properties`中为Undertow添加特定的配置。
    ```properties
    # 例如，配置IO线程数和工作线程数
    server.undertow.threads.io=4
    server.undertow.threads.worker=256
    ```

    **步骤 3: 运行与测试**
    1.  重新构建并启动`jackson-custom-demo`应用。
    2.  观察启动日志。你会发现日志中不再出现Tomcat的信息，而是Undertow的启动信息：
        ```
        INFO --- [           main] o.s.b.w.e.u.UndertowServletWebServer : Undertow started on port(s) 8080 (http)
        ```
    3.  访问 `http://localhost:8080/users`。应用的行为和功能与之前完全一样，但底层的Web服务器已经换成了Undertow。这展示了Spring Boot对Web服务器的完美抽象。

---

## 十九、 UI框架集成 (UI Framework Integration)

### 26. Vaadin

*   **简介**: Vaadin是一个Java Web框架，允许开发者完全使用Java语言来构建现代Web UI，无需编写HTML、CSS或JavaScript。
*   **官网/源码地址**:
    *   **Vaadin 官网**: [https://vaadin.com/](https://vaadin.com/)
    *   **Vaadin Spring Starter GitHub**: [https://github.com/vaadin/spring](https://github.com/vaadin/spring)

*   **完整案例**:
    我们将创建一个简单的Vaadin应用，包含一个文本框和一个按钮。当用户输入名字并点击按钮时，页面会显示一条欢迎消息。

    **步骤 1: 创建项目 `vaadin-demo`**
    使用 `start.spring.io` 创建项目时，可以直接搜索并添加 "Vaadin" 依赖。
    *   **`pom.xml` 依赖**:
        `vaadin-spring-boot-starter`会管理所有必要的Vaadin依赖。
        ```xml
        <dependency>
            <groupId>com.vaadin</groupId>
            <artifactId>vaadin-spring-boot-starter</artifactId>
        </dependency>
        <dependencyManagement>
          <dependencies>
            <dependency>
              <groupId>com.vaadin</groupId>
              <artifactId>vaadin-bom</artifactId>
              <version>24.2.2</version> <!-- 使用与starter兼容的BOM版本 -->
              <type>pom</type>
              <scope>import</scope>
            </dependency>
          </dependencies>
        </dependencyManagement>
        ```

    **步骤 2: 创建Vaadin视图**
    在Vaadin中，UI是通过Java类来构建的。创建一个`MainView.java`。
    ```java
    import com.vaadin.flow.component.button.Button;
    import com.vaadin.flow.component.notification.Notification;
    import com.vaadin.flow.component.orderedlayout.VerticalLayout;
    import com.vaadin.flow.component.textfield.TextField;
    import com.vaadin.flow.router.Route;

    @Route("") // 将这个视图映射到应用的根路径 ("/")
    public class MainView extends VerticalLayout { // VerticalLayout将组件垂直排列

        public MainView() {
            // 创建UI组件
            TextField nameField = new TextField("Your name");
            Button greetButton = new Button("Greet");

            // 添加组件到布局中
            add(nameField, greetButton);

            // 为按钮添加点击事件监听器
            greetButton.addClickListener(event -> {
                String name = nameField.getValue();
                Notification.show("Hello, " + name + "!");
            });
        }
    }
    ```
    *   `@Route("")`: Vaadin的路由注解，类似于Spring MVC的`@RequestMapping`。
    *   `VerticalLayout`, `TextField`, `Button`, `Notification`: 这些都是Vaadin提供的UI组件类。
    *   `add(...)`: 将组件添加到布局中。
    *   `addClickListener(...)`: 为组件添加事件处理逻辑。

    **步骤 3: 运行与测试**
    1.  启动 `vaadin-demo` 应用。
    2.  打开浏览器并访问 `http://localhost:8080`。
    3.  你会看到一个包含输入框和按钮的网页。
    4.  在输入框中输入你的名字，例如 "Spring Boot"。
    5.  点击 "Greet" 按钮。
    6.  页面上会弹出一个通知，显示 "Hello, Spring Boot!"。

    这个过程完全没有涉及手写任何前端代码，所有UI逻辑都在Java中完成，并且Vaadin与Spring Boot的依赖注入和生命周期管理无缝集成。

---

## 二十、 云服务商特定集成 (Cloud Provider Specific Integrations)

### 27. Spring Cloud AWS (Amazon S3)

*   **简介**: Spring Cloud AWS旨在简化Spring应用与AWS服务的集成。这里我们以对象存储服务S3为例。
*   **官网/源码地址**:
    *   **Spring Cloud AWS**: [https://awspring.io/](https://awspring.io/)
    *   **GitHub**: [https://github.com/awspring/spring-cloud-aws](https://github.com/awspring/spring-cloud-aws)

*   **完整案例**:
    我们将创建一个API，用于向AWS S3存储桶上传文件和下载文件。

    **前提条件**:
    1.  拥有一个AWS账户。
    2.  创建一个S3存储桶（例如，`my-spring-boot-test-bucket`）。
    3.  配置好AWS凭证。最简单的方式是在你的用户主目录下创建 `~/.aws/credentials` 文件：
        ```ini
        [default]
        aws_access_key_id = YOUR_ACCESS_KEY
        aws_secret_access_key = YOUR_SECRET_KEY
        ```
    4.  确保你的IAM用户有访问该S3存储桶的权限。

    **步骤 1: 创建项目 `aws-s3-demo`**
    *   **`pom.xml` 依赖**:
        ```xml
        <dependencies>
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-starter-web</artifactId>
            </dependency>
            <dependency>
                <groupId>io.awspring.cloud</groupId>
                <artifactId>spring-cloud-aws-starter-s3</artifactId>
            </dependency>
        </dependencies>
        <dependencyManagement>
            <dependencies>
                <dependency>
                    <groupId>io.awspring.cloud</groupId>
                    <artifactId>spring-cloud-aws-dependencies</artifactId>
                    <version>3.0.2</version> <!-- 使用最新版本 -->
                    <type>pom</type>
                    <scope>import</scope>
                </dependency>
            </dependencies>
        </dependencyManagement>
        ```
    *   **`src/main/resources/application.properties`**:
        配置S3存储桶的名称和区域。
        ```properties
        cloud.aws.s3.bucket=my-spring-boot-test-bucket # 替换为你的存储桶名称
        cloud.aws.region.static=us-east-1 # 替换为你的存储桶所在区域
        ```
    *   **创建 `S3Controller.java`**:
        Spring Cloud AWS会自动配置一个`S3Template` Bean，它封装了S3的常用操作。
        ```java
        import io.awspring.cloud.s3.S3Template;
        import org.springframework.beans.factory.annotation.Value;
        import org.springframework.core.io.Resource;
        import org.springframework.http.HttpHeaders;
        import org.springframework.http.ResponseEntity;
        import org.springframework.web.bind.annotation.*;
        import org.springframework.web.multipart.MultipartFile;
        import java.io.IOException;

        @RestController
        @RequestMapping("/s3")
        public class S3Controller {

            private final S3Template s3Template;

            @Value("${cloud.aws.s3.bucket}")
            private String bucketName;

            public S3Controller(S3Template s3Template) {
                this.s3Template = s3Template;
            }

            @PostMapping("/upload")
            public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) throws IOException {
                s3Template.upload(bucketName, file.getOriginalFilename(), file.getInputStream());
                return ResponseEntity.ok("File uploaded successfully: " + file.getOriginalFilename());
            }

            @GetMapping("/download/{fileName}")
            public ResponseEntity<Resource> downloadFile(@PathVariable String fileName) {
                Resource resource = s3Template.download(bucketName, fileName);
                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileName + "\"")
                        .body(resource);
            }
        }
        ```

    **步骤 2: 运行与测试**
    1.  启动 `aws-s3-demo` 应用。
    2.  **上传文件**:
        使用curl上传一个名为`test.txt`的文件（确保该文件存在于你的当前目录）。
        ```bash
        curl -X POST -F "file=@test.txt" http://localhost:8080/s3/upload
        ```
        你会收到成功上传的响应。登录AWS S3控制台，你应该能在你的存储桶中看到`test.txt`文件。

    3.  **下载文件**:
        在浏览器中访问 `http://localhost:8080/s3/download/test.txt`，浏览器会提示你下载这个文件。
        或者使用curl：
        ```bash
        curl -o downloaded_test.txt http://localhost:8080/s3/download/test.txt
        ```
        `downloaded_test.txt`文件的内容应该和原始的`test.txt`一样。

    这个案例展示了Spring Cloud AWS如何将复杂的SDK配置和操作简化为几行代码和一个简单的`S3Template`。



## 二十一、 大数据生态系统 (Big Data Ecosystem)

### 28. Spring Cloud Data Flow

*   **简介**: Spring Cloud Data Flow (SCDF) 是一个用于构建和编排数据密集型应用的工具包。它本身不是一个库，而是一个独立的服务器，用于部署和管理由Spring Boot和Spring Cloud Stream构建的流处理微服务。
*   **官网/源码地址**:
    *   **Spring Cloud Data Flow 官网**: [https://dataflow.spring.io/](https://dataflow.spring.io/)
    *   **GitHub**: [https://github.com/spring-cloud/spring-cloud-dataflow](https://github.com/spring-cloud/spring-cloud-dataflow)

*   **完整案例**:
    我们将演示一个经典的`http | log`流。我们将创建一个HTTP源(source)应用，它接收POST请求的数据，并通过消息中间件（使用RabbitMQ）发送出去。然后，我们将使用一个预置的日志接收器(sink)应用来消费这些数据并打印到控制台。整个流程将通过SCDF的本地服务器来编排。

    **前提条件**:
    1.  安装并运行 Docker。
    2.  安装 Java (JDK 17+)。

    **步骤 1: 启动依赖服务 (RabbitMQ 和 SCDF)**
    我们将使用Docker Compose来一次性启动SCDF服务器及其依赖（数据库和消息队列）。
    1.  下载`docker-compose.yml`文件：
        ```bash
        curl -O https://dataflow.spring.io/docker-compose.yml
        ```
    2.  启动服务：
        ```bash
        docker-compose up -d
        ```
        这个命令会启动：
        *   Skipper (SCDF的部署平台)
        *   Data Flow Server (SCDF主服务器)
        *   MariaDB (用于存储元数据)
        *   RabbitMQ (作为消息总线)

    **步骤 2: 访问 Data Flow Dashboard**
    等待所有容器启动后，在浏览器中访问 `http://localhost:9393/dashboard`。

    **步骤 3: 注册预置的应用**
    SCDF社区已经提供了许多常用的源、处理器和接收器应用。我们直接注册它们。
    1.  在左侧导航栏点击 **Applications**。
    2.  点击 **ADD APPLICATION(S)**。
    3.  选择 **Import application(s) from a properties file**。
    4.  粘贴以下URL：
        ```
        https://dataflow.spring.io/rabbitmq-maven-latest
        ```
    5.  点击 **IMPORT APPLICATION(S)**。稍等片刻，你会看到列表中出现了`http`, `log`, `transform`等多种应用。

    **步骤 4: 创建和部署流 (Stream)**
    1.  在左侧导航栏点击 **Streams**。
    2.  点击 **CREATE STREAM(S)**。
    3.  在文本框中输入我们的流定义DSL (Domain Specific Language):
        ```
        http-source | log-sink
        ```
        这个DSL的意思是：将一个名为`http-source`的流的输出，通过管道连接到名为`log-sink`的流的输入。
    4.  点击 **CREATE STREAM(S)**。
    5.  给流起一个名字，比如`my-http-log-stream`，然后点击 **CREATE THE STREAM**。
    6.  现在你回到了Streams列表，会看到新创建的流。点击流名称右侧的"播放"按钮（▶️ Deploy Stream）。
    7.  在部署页面，你可以为每个应用设置属性。这里我们保持默认值，直接点击 **DEPLOY STREAM**。
    8.  SCDF和Skipper现在会在后台启动两个独立的Spring Boot应用（`http-source`和`log-sink`）作为Docker容器。你可以在 **Runtime** 页面看到它们的状态，或者通过`docker ps`命令查看。

    **步骤 5: 测试流**
    1.  `http-source`应用默认会监听`8080`端口，但由于它运行在Docker网络中，端口可能被映射。我们可以通过SCDF获取其运行时地址。或者，我们可以直接向SCDF的代理端点发送数据，SCDF会自动路由到正确的应用。
    2.  打开一个终端，使用curl向`http-source`应用发送数据。SCDF将`http-source`应用的端口映射到了宿主机的随机端口上。我们可以通过`docker ps`找到`http-source`容器的端口映射。假设它映射到了 `32768` 端口：
        ```bash
        docker ps
        # 找到类似 '... 0.0.0.0:32768->8080/tcp ... my-http-log-stream-http-source-v1' 的行
        ```
    3.  发送POST请求：
        ```bash
        curl -X POST -H "Content-Type: text/plain" -d "Hello from SCDF!" http://localhost:32768
        ```
    4.  查看`log-sink`应用的日志。`log-sink`应用的作用就是将接收到的消息打印出来。
        ```bash
        docker logs -f <log-sink-container-id>
        # 将 <log-sink-container-id> 替换为 log-sink 容器的实际ID或名称
        ```
        你应该能在日志中看到：
        ```
        ... I... [           main] log.sink                               : Hello from SCDF!
        ```
    这证明了数据成功地从`http-source`，经过RabbitMQ，被`log-sink`消费和处理。整个复杂的分布式数据流的定义、部署和管理都通过SCDF的图形界面和简单DSL完成了。

    **清理**:
    ```bash
    docker-compose down
    ```

---

## 十八、 Web服务器 (Web Servers) - 补遗

### 29. Tomcat (默认行为)

*   **简介**: Apache Tomcat是`spring-boot-starter-web`默认内嵌的服务器。无需任何额外配置，即可获得一个功能齐全的Servlet容器。
*   **官网/源码地址**: [https://tomcat.apache.org/](https://tomcat.apache.org/)

*   **完整案例**:
    任何一个使用`spring-boot-starter-web`且没有排除Tomcat的项目，都在使用Tomcat。我们以一个最简单的"Hello World"项目为例来展示其默认行为和配置。

    **步骤 1: 创建项目 `tomcat-default-demo`**
    *   **`pom.xml`**:
        ```xml
        <dependencies>
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-starter-web</artifactId>
            </dependency>
        </dependencies>
        ```
    *   **创建`HelloController.java`**:
        ```java
        import org.springframework.web.bind.annotation.GetMapping;
        import org.springframework.web.bind.annotation.RestController;

        @RestController
        public class HelloController {
            @GetMapping("/")
            public String hello() {
                return "Hello from default Tomcat server!";
            }
        }
        ```
    *   **`src/main/resources/application.properties`**:
        我们可以通过`server.tomcat.*`命名空间来定制Tomcat。
        ```properties
        # 修改服务器端口 (通用配置)
        server.port=8090

        # 定制Tomcat最大线程数
        server.tomcat.threads.max=150
        # 定制Tomcat连接超时时间 (毫秒)
        server.tomcat.connection-timeout=20000
        # 开启访问日志
        server.tomcat.accesslog.enabled=true
        server.tomcat.accesslog.directory=logs # 日志存储目录
        server.tomcat.accesslog.prefix=access_log
        server.tomcat.accesslog.suffix=.log
        server.tomcat.accesslog.pattern=%h %l %u %t "%r" %s %b
        ```

    **步骤 2: 运行与测试**
    1.  启动`tomcat-default-demo`应用。
    2.  观察启动日志，你会看到Tomcat的初始化信息：
        ```
        INFO --- [           main] o.s.b.w.e.tomcat.TomcatWebServer     : Tomcat initialized with port(s): 8090 (http)
        INFO --- [           main] o.apache.catalina.core.StandardService   : Starting service [Tomcat]
        ...
        INFO --- [           main] o.s.b.w.e.tomcat.TomcatWebServer     : Tomcat started on port(s): 8090 (http)
        ```
    3.  访问 `http://localhost:8090/`，你会得到响应 "Hello from default Tomcat server!"。
    4.  查看项目根目录，会发现一个`logs`文件夹被创建，里面包含了`access_log.log`文件，记录了你的访问信息。这证明了Tomcat的特定配置已生效。

### 30. Jetty

*   **简介**: Eclipse Jetty是一个轻量级、高性能的HTTP服务器和Servlet容器，是Tomcat的流行替代品。
*   **官网/源码地址**: [https://www.eclipse.org/jetty/](https://www.eclipse.org/jetty/)

*   **完整案例**:
    我们将之前的`tomcat-default-demo`项目切换为使用Jetty服务器。

    **步骤 1: 修改`pom.xml`**
    与切换到Undertow类似，我们需要在`spring-boot-starter-web`中排除Tomcat，并添加Jetty的启动器。
    ```xml
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
        <exclusions>
            <exclusion>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-starter-tomcat</artifactId>
            </exclusion>
        </exclusions>
    </dependency>
    <!-- 添加Jetty启动器 -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-jetty</artifactId>
    </dependency>
    ```

    **步骤 2: (可选) 定制Jetty**
    *   **`src/main/resources/application.properties`**:
        移除`server.tomcat.*`配置，添加`server.jetty.*`配置。
        ```properties
        # 服务器端口
        server.port=8091

        # 定制Jetty线程池
        server.jetty.threads.max=100
        server.jetty.threads.min=10
        server.jetty.threads.idle-timeout=60000

        # 定制Jetty访问日志
        server.jetty.accesslog.enabled=true
        server.jetty.accesslog.filename=./logs/jetty_access.log
        server.jetty.accesslog.file-date-format=yyyy-MM-dd
        server.jetty.accesslog.retain-days=30
        ```
    *   **修改`HelloController.java`**:
        为了清晰地区分，我们修改一下返回的文本。
        ```java
        @RestController
        public class HelloController {
            @GetMapping("/")
            public String hello() {
                return "Hello from lightweight Jetty server!";
            }
        }
        ```

    **步骤 3: 运行与测试**
    1.  启动应用。
    2.  观察启动日志，这次将显示Jetty的启动信息：
        ```
        INFO --- [           main] o.s.b.w.e.j.JettyServletWebServer    : Jetty started on port(s) 8091 (http/1.1)
        ```
    3.  访问 `http://localhost:8091/`，你会得到响应 "Hello from lightweight Jetty server!"。
    4.  查看项目根目录下的`logs`文件夹，会发现`jetty_access.log`文件，证明Jetty的配置生效。

---

