好的，这是一份对 Java 语法进行完整分类和详细解释的文档。本文档旨在为初学者和需要复习的开发者提供一个清晰、结构化的 Java 语法参考。

---

# Java 语法大全 (分类详解)

Java 是一种强类型、面向对象的编程语言，其语法严谨且功能强大。本文档将 Java 语法划分为不同类别，从基础到高级，并配以简洁的代码示例。

## 目录
1.  [基础语法](#1-基础语法)
2.  [运算符](#2-运算符)
3.  [流程控制](#3-流程控制)
4.  [面向对象编程 (OOP) - 核心](#4-面向对象编程-oop---核心)
5.  [高级面向对象概念](#5-高级面向对象概念)
6.  [数组与集合](#6-数组与集合)
7.  [异常处理](#7-异常处理)
8.  [泛型](#8-泛型)
9.  [其他重要语法](#9-其他重要语法)

---

## 1. 基础语法

这是构成任何 Java 程序的基本元素。

### 1.1. 基本结构
一个完整的 Java 程序至少包含一个类 (class) 和一个 `main` 方法，这是程序的入口。

```java
// package 语句，定义包名，可选
package com.example;

// public class 是程序的入口类，文件名必须与类名相同 (HelloWorld.java)
public class HelloWorld {
    // public static void main(String[] args) 是程序执行的起点
    public static void main(String[] args) {
        // 输出语句
        System.out.println("Hello, World!");
    }
}
```

### 1.2. 注释
用于解释代码，编译器会忽略注释。
- **单行注释**: `//`
- **多行注释**: `/* ... */`
- **文档注释**: `/** ... */` (可用于生成 Javadoc)

```java
// 这是一个单行注释

/*
  这是一个
  多行注释
*/

/**
 * 这是一个文档注释
 * @author YourName
 * @version 1.0
 */
public class CommentsExample {}
```

### 1.3. 标识符与关键字
- **标识符 (Identifier)**: 用于命名类、方法、变量等。必须以字母、美元符号 `$` 或下划线 `_` 开头，后续可以是字母、数字、`$` 或 `_`。大小写敏感，不能是关键字。
- **关键字 (Keyword)**: Java 语言预定义的、有特殊含义的单词，如 `public`, `class`, `static`, `int` 等。

### 1.4. 变量与数据类型
- **变量 (Variable)**: 内存中的一个存储区域，用于存放数据。
- **数据类型 (Data Type)**:
    - **基本数据类型 (Primitive Types)**: 8 种
        - **整数类型**: `byte` (1字节), `short` (2字节), `int` (4字节), `long` (8字节)
        - **浮点类型**: `float` (4字节), `double` (8字节)
        - **字符类型**: `char` (2字节, 存储单个 Unicode 字符)
        - **布尔类型**: `boolean` (true 或 false)
    - **引用数据类型 (Reference Types)**:
        - 类 (Class), 接口 (Interface), 数组 (Array), 枚举 (Enum), `String` 等。它们存储的是对象的内存地址。

```java
int age = 25; // 整数
double price = 19.99; // 浮点数
char grade = 'A'; // 字符
boolean isActive = true; // 布尔值
String name = "Java"; // 引用类型-字符串
```

### 1.5. 字面量 (Literals)
直接表示值的写法。
- `100` (整型), `3.14` (浮点型), `'C'` (字符型), `"Hello"` (字符串), `true` (布尔型), `null` (引用类型)。
- `long` 类型字面量后加 `L` 或 `l` (`100L`)。
- `float` 类型字面量后加 `F` 或 `f` (`3.14F`)。

### 1.6. 类型转换 (Type Casting)
- **自动类型转换 (隐式转换)**: 小范围类型到大范围类型。
  `int i = 100; long l = i;`
- **强制类型转换 (显式转换)**: 大范围类型到小范围类型，可能导致精度丢失。
  `double d = 9.99; int i = (int)d; // i 的值为 9`

---

## 2. 运算符

### 2.1. 算术运算符
`+` (加), `-` (减), `*` (乘), `/` (除), `%` (取余), `++` (自增), `--` (自减)

### 2.2. 关系运算符
`==` (等于), `!=` (不等于), `>` (大于), `<` (小于), `>=` (大于等于), `<=` (小于等于)。结果为 `boolean` 类型。

### 2.3. 逻辑运算符
`&&` (逻辑与), `||` (逻辑或), `!` (逻辑非)。用于连接布尔表达式。

### 2.4. 赋值运算符
`=` (赋值), `+=`, `-=`, `*=`, `/=`, `%=` (复合赋值)

### 2.5. 三元运算符
`condition ? expression1 : expression2`
如果 `condition` 为 true，结果为 `expression1`；否则为 `expression2`。

```java
int score = 85;
String result = score >= 60 ? "及格" : "不及格"; // "及格"
```

### 2.6. 位运算符
`&` (按位与), `|` (按位或), `^` (按位异或), `~` (按位取反), `<<` (左移), `>>` (右移), `>>>` (无符号右移)。

### 2.7. `instanceof` 运算符
检查一个对象是否是某个类或其子类的实例。
`boolean isString = "hello" instanceof String; // true`

---

## 3. 流程控制

### 3.1. 条件语句
- **`if-else`**:
  ```java
  if (condition) {
      // ...
  } else if (anotherCondition) {
      // ...
  } else {
      // ...
  }
  ```
- **`switch`**:
  ```java
  switch (variable) {
      case value1:
          // ...
          break; // break 是可选的
      case value2:
          // ...
          break;
      default: // 所有 case 都不匹配时执行
          // ...
  }
  ```
  Java 14+ 引入了更简洁的 `switch` 表达式：
  ```java
  int day = 3;
  String dayName = switch (day) {
      case 1, 2, 3, 4, 5 -> "工作日";
      case 6, 7 -> "周末";
      default -> "无效日期";
  };
  ```

### 3.2. 循环语句
- **`for` 循环**:
  ```java
  for (int i = 0; i < 5; i++) {
      System.out.println(i);
  }
  ```
- **`while` 循环**:
  ```java
  int i = 0;
  while (i < 5) {
      System.out.println(i);
      i++;
  }
  ```
- **`do-while` 循环**: 至少执行一次。
  ```java
  int i = 0;
  do {
      System.out.println(i);
      i++;
  } while (i < 5);
  ```
- **增强 `for` 循环 (For-Each)**: 用于遍历数组或集合。
  ```java
  int[] numbers = {1, 2, 3};
  for (int number : numbers) {
      System.out.println(number);
  }
  ```

### 3.3. 跳转语句
- **`break`**: 跳出当前循环或 `switch` 语句。
- **`continue`**: 跳过当前循环的本次迭代，进入下一次迭代。
- **`return`**: 从方法中返回，并可带回一个返回值。

---

## 4. 面向对象编程 (OOP) - 核心

### 4.1. 类与对象
- **类 (Class)**: 对象的蓝图或模板，描述了对象的属性 (字段) 和行为 (方法)。
- **对象 (Object)**: 类的实例。使用 `new` 关键字创建。

```java
// 定义一个类
class Dog {
    String name; // 字段

    // 方法
    void bark() {
        System.out.println(name + " says Woof!");
    }
}

// 创建和使用对象
Dog myDog = new Dog(); // 创建对象
myDog.name = "Buddy"; // 设置属性
myDog.bark(); // 调用方法
```

### 4.2. 方法
- **方法 (Method)**: 定义在类中的代码块，用于执行特定操作。
- **方法重载 (Overloading)**: 在同一个类中，方法名相同但参数列表（类型、数量、顺序）不同。

### 4.3. 构造器 (Constructor)
- 用于初始化新创建的对象。
- 方法名与类名完全相同，且没有返回类型。
- 如果不提供，编译器会提供一个默认的无参构造器。
- 构造器也可以重载。
- `this` 关键字：引用当前对象。

```java
class Car {
    String model;

    // 无参构造器
    Car() {
        this.model = "Unknown";
    }

    // 有参构造器
    Car(String model) {
        this.model = model; // 使用 this 区分字段和参数
    }
}
```

### 4.4. 封装 (Encapsulation)
- 将数据 (字段) 和操作数据的代码 (方法) 捆绑在一起。
- 通过访问修饰符（如 `private`）隐藏内部实现细节，只通过公共方法（`getter`/`setter`）暴露接口。

### 4.5. 继承 (Inheritance)
- 一个类 (子类) 可以继承另一个类 (父类) 的属性和方法。
- 使用 `extends` 关键字。
- `super` 关键字：用于调用父类的构造器或方法。
- **方法重写 (Overriding)**: 子类提供与父类方法签名完全相同的方法，以实现不同的行为。使用 `@Override` 注解是一个好习惯。

```java
class Animal {
    void eat() { System.out.println("Animal eats"); }
}

class Cat extends Animal {
    @Override // 重写父类方法
    void eat() { System.out.println("Cat eats fish"); }
}
```

### 4.6. 多态 (Polymorphism)
- 同一个接口，使用不同的实例而执行不同的操作。
- 父类引用指向子类对象：`Animal myCat = new Cat();`
- 多态性使得代码更具扩展性和灵活性。

---

## 5. 高级面向对象概念

### 5.1. 抽象类 (Abstract Class)
- 使用 `abstract` 关键字声明。
- 不能被实例化。
- 可以包含抽象方法（只有声明没有实现）和具体方法。
- 子类必须实现所有抽象方法，除非子类也是抽象类。

```java
abstract class Shape {
    abstract void draw(); // 抽象方法
    void info() { System.out.println("I am a shape."); }
}
```

### 5.2. 接口 (Interface)
- 使用 `interface` 关键字声明。
- 是行为的规范，完全抽象。
- 方法默认是 `public abstract` (Java 8 前)。
- 变量默认是 `public static final`。
- 一个类可以实现 (implements) 多个接口。
- Java 8+ 接口可以有 `default` 方法和 `static` 方法。

```java
interface Drawable {
    void draw();
}
```

### 5.3. 访问控制修饰符
- `public`: 对所有类可见。
- `protected`: 对同一包内的类和所有子类可见。
- `default` (无修饰符): 对同一包内的类可见。
- `private`: 仅对本类可见。

### 5.4. `static` 关键字
- **静态变量 (类变量)**: 属于类，所有对象共享。
- **静态方法 (类方法)**: 属于类，不依赖于对象实例，可通过 `类名.方法名()` 调用。不能访问非静态成员。

### 5.5. `final` 关键字
- **`final` 变量**: 只能被赋值一次，成为常量。
- **`final` 方法**: 不能被子类重写。
- **`final` 类**: 不能被继承。

---

## 6. 数组与集合

### 6.1. 数组 (Array)
- 存储固定大小的同类型元素的容器。
- 声明: `int[] numbers;`
- 初始化: `numbers = new int[5];` or `int[] numbers = {1, 2, 3};`
- 访问: `numbers[0]` (通过索引)
- 长度: `numbers.length`

### 6.2. 集合框架 (Collection Framework)
用于存储和操作对象组的统一架构。
- **`List`**: 有序集合，允许重复元素。
    - `ArrayList`: 基于动态数组，查询快，增删慢。
    - `LinkedList`: 基于双向链表，增删快，查询慢。
- **`Set`**: 无序集合（`TreeSet` 除外），不允许重复元素。
    - `HashSet`: 基于哈希表，无序。
    - `TreeSet`: 基于红黑树，有序。
- **`Map`**: 存储键值对 (`key-value`)，键唯一。
    - `HashMap`: 基于哈希表，无序。
    - `TreeMap`: 基于红黑树，键有序。

```java
List<String> list = new ArrayList<>();
list.add("Apple");
list.add("Banana");

Map<String, Integer> map = new HashMap<>();
map.put("One", 1);
map.put("Two", 2);
```

---

## 7. 异常处理

### 7.1. `try-catch-finally`
- **`try`**: 包含可能抛出异常的代码。
- **`catch`**: 捕获并处理异常。
- **`finally`**: 无论是否发生异常，总会执行的代码块（通常用于资源释放）。

```java
try {
    int result = 10 / 0;
} catch (ArithmeticException e) {
    System.out.println("Error: " + e.getMessage());
} finally {
    System.out.println("This will always be executed.");
}
```

### 7.2. `throw` 和 `throws`
- **`throw`**: 在方法内部主动抛出一个异常对象。
- **`throws`**: 在方法签名上声明该方法可能抛出的异常类型。

### 7.3. 异常分类
- **Checked Exception**: 编译时必须处理的异常（如 `IOException`）。
- **Unchecked Exception (Runtime Exception)**: 运行时异常，可不处理（如 `NullPointerException`）。
- **Error**: 严重问题，程序通常无法处理（如 `OutOfMemoryError`）。

---

## 8. 泛型 (Generics)

- **目的**: 提供了编译时类型安全，避免了强制类型转换。
- **语法**: 使用尖括号 `<>`。
- **应用**:
    - **泛型类**: `class Box<T> { private T t; }`
    - **泛型接口**: `interface MyInterface<T> { ... }`
    - **泛型方法**: `<T> void myMethod(T t) { ... }`

```java
List<String> stringList = new ArrayList<>(); // 只能存放 String
stringList.add("Hello");
// stringList.add(123); // 编译错误
```

---

## 9. 其他重要语法

### 9.1. 包与导入 (Package & Import)
- **`package`**: 将类组织在命名空间中，避免命名冲突。必须是源文件的第一条语句。
- **`import`**: 导入其他包中的类，以便在当前文件中直接使用。

### 9.2. 枚举 (Enum)
- 使用 `enum` 关键字定义的特殊类，表示一组固定的常量。

```java
public enum Day {
    MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY
}
```

### 9.3. 注解 (Annotation)
- 为代码提供元数据，不直接影响代码执行，但可以被编译器或框架使用。
- 常见注解: `@Override`, `@Deprecated`, `@SuppressWarnings`。

### 9.4. Lambda 表达式与函数式接口 (Java 8+)
- **Lambda 表达式**: 一种简洁的表示匿名函数的方式。
    - 语法: `(parameters) -> expression` 或 `(parameters) -> { statements; }`
- **函数式接口**: 只包含一个抽象方法的接口，可使用 `@FunctionalInterface` 注解。

```java
// 使用 Lambda 表达式对列表进行排序
List<String> names = Arrays.asList("peter", "anna", "mike");
Collections.sort(names, (a, b) -> a.compareTo(b));
```

### 9.5. I/O 流
Java 提供了 `java.io` 和 `java.nio` 包来处理输入/输出操作，如读写文件。
- **`java.io`**: 基于字节流 (`InputStream`/`OutputStream`) 和字符流 (`Reader`/`Writer`)。
- **`java.nio`**: 提供了更高效的、基于通道 (Channel) 和缓冲区 (Buffer) 的 I/O 模型。

## 10. 多线程与并发编程

Java 内置了对多线程编程的强大支持，允许程序同时执行多个任务。

### 10.1. 创建线程
主要有两种方式：
1.  **继承 `Thread` 类**:
    ```java
    class MyThread extends Thread {
        @Override
        public void run() {
            System.out.println("Thread running by extending Thread class.");
        }
    }
    // 启动线程
    MyThread t1 = new MyThread();
    t1.start();
    ```

2.  **实现 `Runnable` 接口** (推荐):
    这种方式更灵活，因为 Java 只支持单继承，实现接口可以避免占用继承名额。
    ```java
    class MyRunnable implements Runnable {
        @Override
        public void run() {
            System.out.println("Thread running by implementing Runnable interface.");
        }
    }
    // 启动线程
    Thread t2 = new Thread(new MyRunnable());
    t2.start();
    ```

### 10.2. 线程同步
当多个线程访问共享资源时，需要同步来避免数据冲突。
- **`synchronized` 关键字**:
    - **同步方法**: `public synchronized void myMethod() { ... }`
    - **同步代码块**: 提供更细粒度的控制。
      ```java
      public void myMethod() {
          synchronized(this) { // this 是锁对象
              // 需要同步的代码
          }
      }
      ```
- **`volatile` 关键字**:
  保证了变量在多线程之间的可见性，但不保证原子性。适用于“一写多读”的场景。
  `private volatile boolean running = true;`

### 10.3. `java.util.concurrent` 包
提供了更高级的并发工具。
- **Executor 框架**: 用于管理线程池，高效地执行异步任务。
  ```java
  ExecutorService executor = Executors.newFixedThreadPool(5);
  executor.submit(() -> {
      System.out.println("Task running in thread pool.");
  });
  executor.shutdown();
  ```
- **显式锁 (Lock)**: 提供了比 `synchronized` 更灵活的锁定机制，如 `ReentrantLock`。
- **原子类 (Atomic Classes)**: 如 `AtomicInteger`，提供了原子性的操作，比锁更高效。

---

## 11. Java Stream API (Java 8+)

Stream API 提供了一种声明式、函数化的方式来处理集合数据，代码更简洁、可读性更高。

### 11.1. 核心概念
- **流 (Stream)**: 不是数据结构，而是来自数据源（如集合、数组）的元素序列。
- **操作**:
    - **中间操作 (Intermediate Operation)**: 返回一个新的流，是惰性求值的（如 `filter`, `map`, `sorted`）。
    - **终端操作 (Terminal Operation)**: 触发计算并产生最终结果（如 `forEach`, `collect`, `reduce`）。

### 11.2. 创建流
```java
List<String> list = Arrays.asList("a", "b", "c");
Stream<String> stream = list.stream(); // 从集合创建

Stream<Integer> streamOfInts = Stream.of(1, 2, 3); // 从值创建
```

### 11.3. 常用操作示例
```java
List<String> myList = Arrays.asList("apple", "banana", "apricot", "cherry");

List<String> result = myList.stream() // 1. 创建流
    .filter(s -> s.startsWith("a"))  // 2. 中间操作：过滤以 "a" 开头的字符串
    .map(String::toUpperCase)        // 3. 中间操作：转换为大写
    .sorted()                        // 4. 中间操作：排序
    .collect(Collectors.toList());   // 5. 终端操作：收集结果到 List

System.out.println(result); // 输出: [APPLE, APRICOT]
```

---

## 12. 反射 (Reflection)

反射机制允许程序在运行时动态地获取任意一个类的信息（如成员变量、构造器、方法）并能动态地创建对象、调用方法。

### 12.1. 获取 `Class` 对象
有三种主要方式：
1.  `Class.forName("com.example.MyClass")`
2.  `MyClass.class`
3.  `myObject.getClass()`

### 12.2. 使用反射
```java
// 假设有 Person 类： public class Person { private String name; public void sayHello(String message){...} }
Class<?> personClass = Class.forName("com.example.Person");

// 创建实例
Object person = personClass.getDeclaredConstructor().newInstance();

// 获取并设置字段
Field nameField = personClass.getDeclaredField("name");
nameField.setAccessible(true); // 允许访问 private 字段
nameField.set(person, "Alice");

// 获取并调用方法
Method sayHelloMethod = personClass.getMethod("sayHello", String.class);
sayHelloMethod.invoke(person, "Welcome!");
```
**注意**: 反射会破坏封装性且性能较低，应谨慎使用。

---

## 13. Java 9+ 新特性选讲

Java 在 8 版本之后持续推出重要的新语法，使代码更现代化、更简洁。

### 13.1. `var` - 局部变量类型推断 (Java 10+)
编译器可以根据右侧的表达式自动推断变量类型，仅限局部变量。
```java
var name = "Java"; // 推断为 String
var numbers = new ArrayList<Integer>(); // 推断为 ArrayList<Integer>
```

### 13.2. Records (Java 16+)
用于创建不可变的、只作为数据载体的类，极大简化了代码。
```java
// 传统方式需要写很多样板代码 (constructor, getters, equals, hashCode, toString)
// record 只需要一行
public record Point(int x, int y) {}

// 使用
Point p = new Point(10, 20);
System.out.println(p.x()); // 自动生成访问器 x()
System.out.println(p);   // 自动生成 toString()
```

### 13.3. Sealed Classes (Java 17+)
允许开发者精确控制一个类或接口可以被哪些类继承或实现。
```java
public sealed class Shape permits Circle, Rectangle {
    // ...
}

public final class Circle extends Shape { /* ... */ } // final, 不能再被继承
public non-sealed class Rectangle extends Shape { /* ... */ } // non-sealed, 开放继承
```

### 13.4. Text Blocks (Java 15+)
用于轻松创建多行字符串，无需使用 `\n` 和 `+` 连接符。
```java
String html = """
              <html>
                  <body>
                      <p>Hello, World</p>
                  </body>
              </html>
              """;
```

### 13.5. Pattern Matching for `instanceof` (Java 16+)
简化了类型检查和转换。
```java
// 传统方式
if (obj instanceof String) {
    String s = (String) obj;
    // ... use s
}

// 使用模式匹配
if (obj instanceof String s) {
    // ...可以直接使用 s，它已经自动转换类型
}
```

### 13.6. 模块系统 (Project Jigsaw, Java 9+)
引入了 `module` 的概念，用于更好地组织和封装代码库。通过 `module-info.java` 文件定义模块的依赖 (`requires`) 和暴露的包 (`exports`)。

---

## 14. 核心 API 补充

### 14.1. 日期与时间 API (`java.time`, Java 8+)
全面取代了旧的 `Date` 和 `Calendar` API，提供了不可变、线程安全且设计更清晰的日期时间处理方式。
- `LocalDate`: 只含日期 (年-月-日)
- `LocalTime`: 只含时间 (时-分-秒)
- `LocalDateTime`: 日期和时间
- `ZonedDateTime`: 带时区的日期和时间
- `Duration`: 表示时间的间隔（秒，纳秒）
- `Period`: 表示日期的间隔（年，月，日）

```java
LocalDate today = LocalDate.now();
System.out.println("Today's date: " + today); // 2023-10-27

LocalDateTime specificDateTime = LocalDateTime.of(2025, 1, 1, 10, 30);
System.out.println("New Year's meeting: " + specificDateTime);
```

---

## 15. Java 虚拟机与内存模型 (概念)

这部分内容不是纯粹的语法，但对理解 Java 的运行机制至关重要。

### 15.1. JVM (Java Virtual Machine)
Java "一次编译，到处运行" 的核心。JVM 是一个虚拟的计算机，它在实际的操作系统上执行 Java 字节码 (`.class` 文件)。

### 15.2. 运行时数据区 (Runtime Data Areas)
JVM 在执行 Java 程序时会把它管理的内存划分为几个不同的数据区域。
- **程序计数器 (Program Counter Register)**: 线程私有，指向当前线程正在执行的字节码指令的地址。
- **Java 虚拟机栈 (Java Virtual Machine Stack)**: 线程私有，用于存储局部变量、方法出口等。我们常说的“栈内存”就是指这里。
- **本地方法栈 (Native Method Stack)**: 为 JVM 使用到的 Native 方法服务。
- **堆 (Heap)**: 所有线程共享，是 JVM 管理的内存中最大的一块。几乎所有的对象实例和数组都在这里分配。
- **方法区 (Method Area)**: 所有线程共享，用于存储已被虚拟机加载的类信息、常量、静态变量等数据。

### 15.3. 垃圾回收 (Garbage Collection, GC)
Java 的自动内存管理机制。GC 会自动识别并回收堆中不再被任何引用指向的对象，从而释放内存，避免了手动管理内存的复杂性和风险。

---

### 总结

这份文档从基础语法到高级并发和现代特性，对 Java 的核心语法进行了全面的分类和梳理。Java 语言本身在不断发展，理解这些核心概念是学习和使用 Spring、MyBatis 等高级框架，以及进行高效、健壮软件开发的基础。建议在掌握这些语法后，通过实际项目来加深理解和应用。