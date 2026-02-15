好的，这是一个对 Java JDK 8 和 JDK 17 新特性进行分类和详细说明的完整文档。

---

## Java JDK 8 vs JDK 17：核心新特性演进与分类详解

### 文档导览

本文档旨在全面梳理从 Java 8 到 Java 17 的重要新特性。Java 8 和 Java 17 都是长期支持版本（LTS - Long-Term Support），它们分别代表了 Java 发展史上的两个重要里程碑。

- **Java 8 (2014年3月)**: 引入了函数式编程范式，是 Java 历史上最具革命性的版本之一。
- **Java 17 (2021年9月)**: 在 Java 8 的基础上，经历了多个版本的迭代，带来了大量语言、API 和 JVM 层面的现代化改进，极大地提升了开发效率、代码可读性和运行时性能。

我们将按照以下分类对特性进行详细介绍：

1.  **语言层面 (Language Features)**：语法糖、新关键字、新的编程范式。
2.  **API 层面 (API & Library Features)**：标准库中新增或增强的类和方法。
3.  **JVM 层面 (JVM Features)**：垃圾回收器、性能优化、运行时改进。
4.  **工具层面 (Tooling)**: JDK 附带的开发工具。

---

### 第一部分：Java 8 核心新特性

Java 8 的发布标志着 Java 进入了一个新的时代，其核心是围绕**函数式编程**和**简化代码**。

#### 1. 语言层面

**a. Lambda 表达式 (Lambda Expressions)**
这是 Java 8 最核心的特性。它允许我们将函数作为方法参数传递，或者将代码作为数据对待。极大地简化了匿名内部类的写法。

-   **语法**: `(parameters) -> expression` 或 `(parameters) -> { statements; }`
-   **示例 (之前)**:
    ```java
    Collections.sort(list, new Comparator<String>() {
        @Override
        public int compare(String a, String b) {
            return a.compareTo(b);
        }
    });
    ```
-   **示例 (之后)**:
    ```java
    Collections.sort(list, (a, b) -> a.compareTo(b));
    // 或者使用方法引用
    Collections.sort(list, String::compareTo);
    ```

**b. 函数式接口 (Functional Interfaces)**
任何只有一个抽象方法的接口都是函数式接口，可以使用 `@FunctionalInterface` 注解来强制约束。Lambda 表达式的类型就是函数式接口。

-   **示例**: `java.lang.Runnable`, `java.util.Comparator`, `java.util.function` 包下的所有接口 (如 `Predicate`, `Function`, `Consumer`, `Supplier`)。

**c. 方法引用 (Method References)**
方法引用是 Lambda 表达式的一种简化写法，当 Lambda 表达式的主体只是调用一个已存在的方法时，可以使用方法引用。

-   **语法**: `ClassName::methodName`
-   **类型**:
    -   静态方法引用: `String::valueOf`
    -   实例方法引用: `s -> s.toUpperCase()` 可以写成 `String::toUpperCase`
    -   特定对象实例方法引用: `myObject::instanceMethod`
    -   构造函数引用: `ArrayList::new`

**d. 接口的默认方法和静态方法 (Default and Static Methods in Interfaces)**
允许在接口中添加具有具体实现的方法，从而在不破坏现有实现类的情况下，为接口添加新功能。

-   **默认方法 (`default`)**: 实现类可以继承或重写。解决了接口演进的问题。
-   **静态方法 (`static`)**: 只能通过接口名调用，不能被实现类继承或重写。

#### 2. API 层面

**a. Stream API**
Stream API 是对集合（Collection）操作的重大增强。它提供了一种声明式、链式的方式来处理数据集合，支持并行处理。

-   **核心思想**: 创建流 -> 中间操作 (过滤、映射、排序等) -> 终端操作 (收集、归约、遍历等)。
-   **示例**:
    ```java
    List<String> result = widgets.stream()
                                 .filter(w -> w.getColor() == "red") // 过滤红色
                                 .map(w -> w.getName())             // 提取名称
                                 .collect(Collectors.toList());      // 收集到列表
    ```

**b. `Optional<T>` 类**
一个容器对象，可能包含也可能不包含非 `null` 值。旨在解决 `NullPointerException` 问题，鼓励开发者显式地处理可能为空的情况。

-   **常用方法**: `of()`, `ofNullable()`, `isPresent()`, `ifPresent()`, `orElse()`, `orElseGet()`, `orElseThrow()`
-   **示例**:
    ```java
    Optional<User> userOpt = findUserById("123");
    String username = userOpt.map(User::getName).orElse("Guest");
    ```

**c. 新的日期与时间 API (`java.time`)**
完全重新设计了日期和时间处理方式，解决了旧 `java.util.Date` 和 `java.util.Calendar` 的线程不安全、设计混乱等问题。

-   **核心类**:
    -   `LocalDate`: 日期 (年-月-日)
    -   `LocalTime`: 时间 (时-分-秒)
    -   `LocalDateTime`: 日期和时间
    -   `ZonedDateTime`: 带时区的日期和时间
    -   `Instant`: 时间戳
    -   `Duration`: 两个时间点之间的时间量 (秒、纳秒)
    -   `Period`: 两个日期之间的时间量 (年、月、日)

#### 3. JVM 层面

**a. Metaspace (元空间)**
移除了永久代（PermGen），取而代之的是元空间。元空间使用的是本地内存（Native Memory），而不是 JVM 堆内存，从而解决了 `PermGen` 空间不足的问题。

---

### 第二部分：从 Java 9 到 Java 16 的关键演进

为了理解 Java 17 的全貌，必须了解中间版本引入的关键特性。

#### 1. 语言层面

-   **`var` - 局部变量类型推断 (JDK 10)**: 简化变量声明，编译器会自动推断类型。
    ```java
    // 之前: Map<String, List<Integer>> map = new HashMap<>();
    var map = new HashMap<String, List<Integer>>(); // 可读性更高
    ```
-   **Switch 表达式 (JDK 14 标准化)**: `switch` 可以作为表达式返回值，语法更简洁，避免了 `break` 和 `fall-through` 错误。
    ```java
    int numLetters = switch (day) {
        case MONDAY, FRIDAY, SUNDAY -> 6;
        case TUESDAY                -> 7;
        default                     -> throw new IllegalStateException("Invalid day: " + day);
    };
    ```
-   **Text Blocks - 文本块 (JDK 15 标准化)**: 使用 `"""` 来定义多行字符串，无需大量转义符，非常适合嵌入 JSON、SQL 或 HTML。
    ```java
    String json = """
    {
        "name": "John Doe",
        "age": 30
    }
    """;
    ```
-   **Records (JDK 16 标准化)**: 一种简洁的类声明，用于创建不可变的数据载体。编译器会自动生成构造函数、`getter`、`equals()`、`hashCode()` 和 `toString()`。
    ```java
    // 替代了需要写很多样板代码的普通类
    public record Point(int x, int y) {}
    ```
-   **Pattern Matching for `instanceof` (JDK 16 标准化)**: 简化了 `instanceof` 类型检查和转换。
    ```java
    // 之前
    if (obj instanceof String) {
        String s = (String) obj;
        // ... use s
    }
    // 之后
    if (obj instanceof String s) {
        // ... use s directly
    }
    ```

#### 2. API & JVM & 工具层面

-   **模块化系统 (JPMS - Project Jigsaw) (JDK 9)**: 引入 `module-info.java`，实现了更强的封装和可靠性，并允许创建更小的运行时镜像。
-   **JShell: REPL 工具 (JDK 9)**: Java 拥有了交互式编程环境。
-   **不可变集合的工厂方法 (JDK 9)**: `List.of()`, `Set.of()`, `Map.of()`。
-   **新的 HttpClient API (JDK 11 标准化)**: 支持 HTTP/2 和 WebSocket，提供同步和异步 API。
-   **ZGC (JDK 11 实验性, JDK 15 标准化)**: 可扩展、低延迟的垃圾回收器，GC 停顿时间通常不超过 10ms。
-   **Shenandoah GC (JDK 12 实验性)**: 另一个低停顿时间的 GC。
-   **有用的 NullPointerExceptions (JDK 14)**: `NullPointerException` 的错误信息会精确到哪个变量是 `null`。

---

### 第三部分：Java 17 核心新特性

作为新的 LTS 版本，Java 17 继承了 9-16 的所有特性，并带来了一些新的稳定和预览特性。

#### 1. 语言层面

**a. Sealed Classes - 密封类 (JDK 17 标准化)**
密封类和接口限制了哪些其他类或接口可以扩展或实现它们。这提供了更强的封装性，并允许编译器对代码进行更全面的分析。

-   **关键字**: `sealed`, `permits`, `non-sealed`
-   **作用**: 与模式匹配结合使用，可以确保 `switch` 语句覆盖了所有可能的子类型，无需 `default` 分支。
-   **示例**:
    ```java
    // Shape 只能被 Circle, Square, Rectangle 继承
    public abstract sealed class Shape permits Circle, Square, Rectangle { ... }

    public final class Circle extends Shape { ... } // final，不能再被继承
    public final class Square extends Shape { ... }
    public non-sealed class Rectangle extends Shape { ... } // non-sealed，可以被任意继承

    // 在 switch 中使用时，编译器知道所有可能的类型
    double getArea(Shape shape) {
        return switch (shape) {
            case Circle c -> Math.PI * c.radius() * c.radius();
            case Square s -> s.side() * s.side();
            case Rectangle r -> r.length() * r.width();
            // 无需 default，因为所有 permits 的类型都已覆盖
        };
    }
    ```

**b. Pattern Matching for `switch` (JDK 17 预览特性)**
这是 `instanceof` 模式匹配的自然延伸，极大地增强了 `switch` 的能力，使其可以对对象的类型和属性进行匹配。

-   **示例**:
    ```java
    static String formatter(Object o) {
        return switch (o) {
            case Integer i -> String.format("int %d", i);
            case Long l    -> String.format("long %d", l);
            case Double d  -> String.format("double %f", d);
            case String s  -> String.format("String %s", s);
            // 支持 null case
            case null      -> "null";
            default        -> o.toString();
        };
    }
    ```

#### 2. API 层面

**a. Foreign Function & Memory API (孵化阶段)**
这是一个用于替代 JNI (Java Native Interface) 的新 API。它提供了更安全、更高效、纯 Java 的方式来调用本地代码（如 C 库）和操作本地内存。

-   **目标**: 替代 JNI 的脆弱性和复杂性。
-   **状态**: 在 JDK 17 中仍处于孵化阶段，但代表了 Java 与本地代码互操作的未来方向。

**b. Vector API (二次孵化)**
该 API 旨在利用现代 CPU 的 SIMD (Single Instruction, Multiple Data) 指令，以并行方式执行向量计算，从而在科学计算、机器学习等领域获得显著的性能提升。

#### 3. JVM 层面

**a. 强封装 JDK 内部 API (Strongly Encapsulate JDK Internals)**
从 JDK 9 开始的模块化工作在 JDK 17 得到了最终的强化。默认情况下，用户代码无法再通过反射等手段访问 JDK 的内部 API（如 `sun.misc.Unsafe`）。

-   **影响**: 提高了平台的安全性和可维护性。一些依赖内部 API 的旧库可能需要升级。如果必须访问，需要通过命令行参数 `--add-opens` 显式授权。

**b. 弃用 Applet API 和 Security Manager**
-   **Applet API**: 因早已过时而被标记为弃用，准备在未来版本移除。
-   **Security Manager**: 由于其复杂性和维护成本，也被弃用，并计划在未来移除。现代安全模型更多地依赖于容器、模块化等外部机制。

**c. 增强型伪随机数生成器**
提供了一个新的接口 `RandomGenerator` 和多个实现，使得选择和使用不同的伪随机数算法（PRNG）变得更加容易和统一。

---

### 总结与对比

| 特性类别 | Java 8 (代表特性) | Java 17 (代表特性及演进) | 演进趋势 |
| :--- | :--- | :--- | :--- |
| **语言** | - Lambda 表达式<br>- 函数式接口<br>- 方法引用 | - **Sealed Classes** (密封类)<br>- **Records** (记录类)<br>- **Pattern Matching** (`instanceof` & `switch`)<br>- `var` (类型推断)<br>- **Text Blocks** (文本块)<br>- **Switch Expressions** (Switch 表达式) | - **更少的样板代码** (Brevity)<br>- **更强的数据建模能力** (Data Modeling)<br>- **更安全、更富表现力的模式匹配** |
| **API** | - Stream API<br>- `Optional<T>`<br>- 新的日期时间 API (`java.time`) | - **新的 HttpClient**<br>- **不可变集合工厂**<br>- **Foreign Function & Memory API** (孵化)<br>- **Vector API** (孵化) | - **现代化** (Modernization)<br>- **易用性** (Usability)<br>- **与本地代码/硬件的更优集成** |
| **JVM** | - 移除 PermGen，引入 Metaspace | - **ZGC** 和 **Shenandoah GC** (低延迟 GC)<br>- **强封装内部 API**<br>- **有用的 NullPointerExceptions**<br>- 弃用 Security Manager | - **性能** (Performance)<br>- **安全性** (Security)<br>- **可维护性** (Maintainability) |
| **工具** | - Nashorn JS 引擎 (后被弃用) | - **JShell (REPL)**<br>- **jpackage** (打包工具)<br>- 单文件源码程序启动 | - **提升开发体验和效率** |

**结论**:

从 Java 8 到 Java 17，Java 语言和平台经历了深刻的现代化转型。

-   **对于开发者**: 代码变得更加简洁、可读、安全。`record`, `var`, 模式匹配等特性极大地提升了日常开发幸福感。
-   **对于应用**: 性能、安全性和稳定性得到了显著增强。新的 GC、模块化系统和对内部 API 的强封装，使得构建和维护大型、高性能系统变得更加可靠。

对于仍在 使用 Java 8 的项目，**升级到 Java 17 将会带来质的飞跃**，无论是开发效率还是运行性能。