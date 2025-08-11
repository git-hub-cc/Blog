好的，遵照您的要求，以下是根据官方 Google Java Style Guide 整理和分类的完整文档。本文档旨在全面覆盖该指南的核心规则和建议，并按照其原始结构进行组织，以便于理解和查阅。

---

## Google Java Style Guide 完整分类解析

### 1. 引言 (Introduction)

Google Java Style Guide 是一份定义了 Google Java 编程规范的权威文档。其核心目标是**促进代码的一致性**。通过让所有工程师遵循相同的风格和约定，可以最大限度地提高代码的可读性和可维护性。

*   **术语说明**:
    *   **类 (class)**: 指普通的类、枚举类 (`enum`)、接口 (`interface`) 或注解类型 (`@interface`)。
    *   **成员 (member)**: 指类的字段、方法、内部类、构造函数。
    *   **注释 (comment)**: 指实现注释 (`/* ... */` 或 `// ...`)，不包括 Javadoc。
*   **自动化工具**: Google 提供了 `google-java-format` 工具，可以自动格式化代码以符合本指南的大部分格式化规则。强烈建议使用此工具。

---

### 2. 源文件基础 (Source File Basics)

关于一个 Java 源文件的基本要求。

*   **2.1 文件名 (File name)**
    *   源文件名必须是其顶级类的名称（大小写敏感），并以 `.java` 为后缀。

*   **2.2 文件编码 (File encoding)**
    *   源文件编码必须是 **UTF-8**。

*   **2.3 特殊字符 (Special characters)**
    *   **空白字符**: 只使用 ASCII 空格 (0x20) 作为缩进和代码间距。这意味着：
        *   字符串或字符字面量中的其他空白字符需要转义。
        *   **不使用制表符 (Tab)** 进行缩进。
    *   **特殊转义序列**: 对于具有特殊转义序列的字符（如 `\b`, `\t`, `\n`, `\f`, `\r`, `\"`, `\'`, `\\`），应使用这些转义序列，而不是其对应的 Unicode (e.g., `\u000a`) 写法。
    *   **非 ASCII 字符**: 对于剩余的非 ASCII 字符，可以使用实际的 Unicode 字符（如 `∞`）或其等效的 Unicode 转义（如 `\u221e`）。选择哪种方式取决于哪种能让代码更易读、易懂。

---

### 3. 源文件结构 (Source File Structure)

一个源文件必须按以下顺序包含：

1.  **许可证或版权信息 (License or copyright information)** (如果存在)
2.  **`package` 语句 (Package statement)**
3.  **`import` 语句 (Import statements)**
4.  **一个顶级类 (Exactly one top-level class)**

**这几项之间必须用一个空行隔开。**

*   **3.1 `package` 语句**
    *   `package` 语句不能换行。

*   **3.2 `import` 语句**
    *   **禁止使用通配符导入 (`*`)**: 不论是静态导入还是普通导入，都不能使用通配符。
    *   **禁止换行**: `import` 语句不能换行。
    *   **顺序和间距**:
        1.  所有**静态导入** (`import static ...`) 在一个组里。
        2.  所有**普通导入** (`import ...`) 在另一个组里。
        3.  在这两个组之间用一个空行隔开。
        4.  在每个组内部，导入语句按**ASCII 码顺序**排列。
        *   **具体排序规则**：
            1.  `com.google` 开头的导入 (Google 内部代码优先)
            2.  第三方包，按顶级包名的 ASCII 顺序，如 `android`, `org`, `java`, `javax`
            3.  最后是 `java` 和 `javax`

            ```java
            // 示例
            import static com.google.common.base.Preconditions.checkNotNull;
            import static org.junit.Assert.assertEquals;
            
            import com.google.common.collect.Lists;
            import com.google.common.io.Files;
            
            import java.util.ArrayList;
            import java.util.List;
            
            import javax.annotation.Nullable;
            
            import org.myproject.common.MyClass;
            ```
            *(注：新版指南简化了排序，主要强调静态和非静态分离，并按包名 ASCII 排序即可)*

*   **3.3 类声明 (Class declaration)**
    *   **一个顶级类**: 每个源文件只能有一个顶级类。
    *   **成员顺序**: 类的成员应遵循一个逻辑顺序。没有唯一的正确答案，但推荐以下顺序：
        1.  静态字段
        2.  实例字段
        3.  构造函数
        4.  方法
        *   **重载方法不分离**: 同名重载的方法必须连续出现，中间不能有其他成员。

---

### 4. 格式化 (Formatting)

这是指南中篇幅最大、规则最具体的部分。

*   **4.1 大括号 (Braces `{}`)**
    *   **必须使用**: 即使 `if`, `else`, `for`, `do`, `while` 的主体只有一行代码或为空，也必须使用大括号 `{}`。
    *   **K&R 风格**:
        *   左大括号 (`{`) 前不换行。
        *   左大括号 (`{`) 后换行。
        *   右大括号 (`}`) 前换行。
        *   右大括号 (`}`) 后，如果它结束了一个语句或方法/构造函数/类的主体，则换行。如果后面紧跟 `else` 或逗号等，则不换行。
        ```java
        // 正确
        if (condition) {
          doSomething();
        }
        
        // 错误
        if (condition) doSomething();
        ```

*   **4.2 块缩进 (Block indentation)**
    *   **2 个空格**: 每次创建新块时，缩进增加 **2 个空格**。当块结束时，缩进回到上一级。

*   **4.3 每行一个语句 (One statement per line)**
    *   每个语句后都必须换行。

*   **4.4 行长度 (Column limit)**
    *   行长度限制为 **100 个字符**。
    *   **例外**:
        *   无法满足此限制的行（例如，Javadoc 中的长 URL）。
        *   `package` 和 `import` 语句。
        *   可以被复制粘贴到 shell 中执行的命令行。

*   **4.5 换行 (Line-wrapping)**
    *   **换行时机**: 在高层级的语法处断开，而不是低层级。
        *   推荐在非赋值运算符 (`+`, `*`) 之前换行。
        *   在赋值运算符 (`=`) 之后换行。
        *   在方法链式调用的 `.` 之前换行。
        *   在 `extends` 或 `implements` 等关键字之前换行。
    *   **续行缩进**: 换行后的续行至少缩进 **4 个空格**。

*   **4.6 空白 (Whitespace)**
    *   **垂直空白 (空行)**:
        *   在类的成员（字段、构造函数、方法、内部类）之间使用一个空行。
        *   例外：两个连续的字段之间可以没有空行。
        *   在方法内部，根据逻辑分组代码，组之间用一个空行。
        *   不应在文件开头或结尾有多个空行。
    *   **水平空白**:
        *   在任何保留字 (`if`, `for`, `catch`) 和其后的括号 `(` 之间加一个空格。
        *   在任何保留字 (`else`, `catch`) 和其前面的 `}` 之间加一个空格。
        *   在 `{` 前加一个空格。
        *   在二元或三元运算符两侧加空格 (`+`, `-`, `=`, `==`, `?:`)。
        *   在逗号 `,`、分号 `;`、冒号 `:`、类型转换的 `)` 之后加空格。
        *   在行尾注释 `//` 的两侧加空格。
        *   在泛型尖括号 `< >` 内部不加空格，例如 `List<String>`。

*   **4.7 特定结构 (Specific constructs)**
    *   **枚举类 (`enum`)**:
        *   枚举常量之间用逗号隔开，如果常量后面有方法或文档，则需要换行。
        *   如果枚举类没有方法，可以写成单行。
    *   **变量声明**:
        *   每次只声明一个变量 (`int a, b;` 是不允许的)。
    *   **数组**:
        *   中括号 `[]` 必须和类型写在一起，而不是变量名 (`String[] args`, 而不是 `String args[]`)。
    *   **Switch 语句**:
        *   `case` 块需要缩进 2 个空格。
        *   每个 `case` 块都必须以 `break`, `continue`, `return` 或抛出异常结束。
        *   如果需要贯穿 (fall-through)，必须有明确的注释 `// fall through`。
        *   必须包含 `default` 块，即使它为空。
    *   **注解 (Annotations)**:
        *   注解单独占一行，位于其修饰的结构之前。
    *   **修饰符 (Modifiers)**:
        *   类和成员的修饰符按 Java 语言规范推荐的顺序排列：
            `public protected private abstract default static final transient volatile synchronized native strictfp`

---

### 5. 命名约定 (Naming)

*   **5.1 通用规则 (Rules common to all identifiers)**
    *   只使用 ASCII 字母和数字，在少数情况下使用下划线 `_`（仅限于常量）。
    *   不使用特殊的前缀或后缀（如 `m_` 或 `s_`）。

*   **5.2 具体规则 (Rules by identifier type)**
    *   **包名 (Package names)**: 全小写，连续的单词直接连接，不使用下划线或连字符。例如：`com.example.deepspace`。
    *   **类名 (Class names)**: **大驼峰命名法 (UpperCamelCase)**。适用于类、接口、枚举、注解。例如：`MyClass`, `ActionRequest`。
    *   **方法名 (Method names)**: **小驼峰命名法 (lowerCamelCase)**。例如：`sendMessage`, `calculateTotal`。
    *   **常量名 (Constant names)**: **`CONSTANT_CASE`**，全大写，单词间用下划线分隔。常量是指 `static final` 字段，其内容深度不可变。例如：`MAX_CONNECTIONS`, `DEFAULT_TIMEOUT`。
    *   **非常量字段名 (Non-constant field names)**: **小驼峰命名法 (lowerCamelCase)**。包括静态和非静态字段。例如：`userName`, `requestCount`。
    *   **参数名 (Parameter names)**: **小驼峰命名法 (lowerCamelCase)**。
    *   **局部变量名 (Local variable names)**: **小驼峰命名法 (lowerCamelCase)**。
    *   **类型变量名 (Type variable names)**:
        *   单个大写字母，有时后面跟一个数字。
        *   例如：`T`, `E`, `K`, `V`, `X`, `T2`。

---

### 6. 编程实践 (Programming Practices)

*   **6.1 `@Override`**:
    *   只要是重写超类或实现接口的方法，**总是**使用 `@Override` 注解。

*   **6.2 `catch` 块**:
    *   **不能捕获并忽略异常**。空的 `catch` 块是绝对禁止的，除非有充分的理由并附上注释说明为什么可以安全地忽略它。
    *   如果确实不需要任何操作，合理的做法是命名异常变量为 `ignored`。
      ```java
      try {
        int i = Integer.parseInt(s);
      } catch (NumberFormatException ignored) {
        // an acceptable way to ignore
      }
      ```

*   **6.3 静态成员 (Static members)**:
    *   使用类名来调用静态成员，而不是通过类的实例对象。例如：`Foo.bar()` 而不是 `foo.bar()`。

*   **6.4 `Finalizers`**:
    *   **避免使用** `finalize()` 方法。它不可靠且可能导致性能问题和资源泄露。应使用 `try-with-resources` 或其他明确的清理机制。

*   **6.5 `var` 的使用**:
    *   `var` 可用于局部变量声明，但仅当它能**提高代码可读性**时才使用。
    *   如果初始化器（右侧表达式）的类型对读者不明显，则应明确写出类型。
    *   不应用于 API 的返回类型或字段类型。

---

### 7. Javadoc

*   **7.1 格式化 (Formatting)**
    *   **基本格式**:
      ```java
      /**
       * 这是一个多行 Javadoc 示例。
       * 每一行都以星号开头。
       */
      public int method(String p1) { ... }
      ```
    *   **单行格式**:
      ```java
      /** 一个特别简短的 Javadoc。 */
      ```

*   **7.2 在哪里使用 Javadoc (Where Javadoc is used)**
    *   **必须**为每个 `public` 类以及每个 `public` 或 `protected` 的成员提供 Javadoc。
    *   **例外**:
        *   简单、明显的 get/set 方法，如 `getFoo()`，如果其含义就是 "返回 foo"，则可省略。
        *   重写超类型中已有 Javadoc 的方法，除非需要提供额外信息。

*   **7.3 内容 (The summary fragment and block tags)**
    *   **摘要片段 (Summary fragment)**: 每个 Javadoc 的第一行（或第一段）是一个简短的摘要。它应该是一个完整的句子，通常以动词开始的祈使句（如 `Returns the user name.`）。
    *   **块标签 (Block tags)**:
        *   标准的块标签按以下顺序出现：`@param`, `@return`, `@throws`, `@deprecated`。
        *   `@param`: 描述方法的参数。
        *   `@return`: 描述方法的返回值。如果方法返回 `void`，则不能有此标签。
        *   `@throws`: 描述方法可能抛出的异常。
        *   `@deprecated`: 标记方法或类为已废弃，并提供替代方案。

---
### 总结

Google Java Style Guide 的核心理念是**通过严格的规则实现代码的高度一致性**。虽然有些规则可能看起来过于严苛，但其最终目的是为了在大型团队和长期项目中，让代码库像是由一个人编写的一样，从而提升协作效率和代码质量。在实际开发中，结合自动化工具 `google-java-format` 可以轻松遵循大部分格式化规则。