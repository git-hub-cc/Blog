好的，这是一份对 Rust 语法进行完整分类的文档。文档从基础概念开始，逐步深入到高级和复杂的特性，旨在为初学者和有经验的开发者提供一个清晰、结构化的参考。

---

# Rust 语法分类大全

## 目录
1.  [基础概念与变量](#1-基础概念与变量)
2.  [数据类型](#2-数据类型)
3.  [函数](#3-函数)
4.  [控制流](#4-控制流)
5.  [所有权系统（Rust 核心）](#5-所有权系统rust-核心)
6.  [复合数据结构](#6-复合数据结构)
7.  [常用集合类型](#7-常用集合类型)
8.  [错误处理](#8-错误处理)
9.  [泛型、Trait 与生命周期](#9-泛型trait-与生命周期)
10. [模块化系统](#10-模块化系统)
11. [智能指针](#11-智能指针)
12. [并发编程](#12-并发编程)
13. [宏（Macros）](#13-宏macros)
14. [Unsafe Rust](#14-unsafe-rust)
15. [其他重要语法与概念](#15-其他重要语法与概念)

---

### 1. 基础概念与变量

#### 1.1 注释 (Comments)
- **行注释**: `//` 之后到行尾的内容。
- **块注释**: `/* ... */` 之间的内容，可以跨越多行。
- **文档注释**: `///` (用于外部文档) 和 `//!` (用于模块内部文档)。

```rust
// 这是一个行注释

/*
  这是一个
  多行块注释
*/

/// 为函数或结构体生成文档
fn my_function() {}
```

#### 1.2 变量绑定与可变性 (Variable Bindings & Mutability)
- `let`: 声明一个不可变变量（默认）。
- `let mut`: 声明一个可变变量。

```rust
let x = 5;       // 不可变
// x = 6;        // 编译错误！
let mut y = 10;  // 可变
y = 11;          // OK
```

#### 1.3 常量与静态变量 (Constants & Statics)
- `const`: 编译时常量，必须显式声明类型，值在编译期间确定。
- `static`: 静态变量，具有 `'static` 生命周期，在整个程序运行期间存在。

```rust
const MAX_POINTS: u32 = 100_000;
static mut COUNTER: u32 = 0; // 修改静态变量需要 unsafe 块
```

#### 1.4 遮蔽 (Shadowing)
允许使用相同的名字声明一个新的变量，这个新变量会“遮蔽”掉旧的变量。

```rust
let spaces = "   ";
let spaces = spaces.len(); // spaces 现在是数字 3，类型也变了
```

### 2. 数据类型

#### 2.1 标量类型 (Scalar Types)
- **整型 (Integers)**: `i8`, `u8`, `i16`, `u16`, `i32`, `u32`, `i64`, `u64`, `i128`, `u128`, `isize`, `usize`。
- **浮点型 (Floating-Point)**: `f32`, `f64`。
- **布尔型 (Boolean)**: `bool` (`true` 或 `false`)。
- **字符型 (Character)**: `char` (4 字节 Unicode 标量值)。

#### 2.2 复合类型 (Compound Types)
- **元组 (Tuple)**: 固定长度的、可以包含多种类型值的集合。

```rust
let tup: (i32, f64, u8) = (500, 6.4, 1);
let (x, y, z) = tup; // 解构
let five_hundred = tup.0; // 通过索引访问
```

- **数组 (Array)**: 固定长度的、所有元素类型相同的集合，数据存储在栈上。

```rust
let a = [1, 2, 3, 4, 5];
let first = a[0];
let same = [3; 5]; // [3, 3, 3, 3, 3]
```

- **切片 (Slice)**: 对数组或 `String` 等集合中一部分的引用，没有所有权。

```rust
let arr = [1, 2, 3, 4, 5];
let slice: &[i32] = &arr[1..3]; // &[2, 3]
```

### 3. 函数

- 使用 `fn` 关键字定义。
- 参数必须声明类型。
- 返回值类型在 `->` 之后声明。
- 函数体中最后一个表达式的值将作为返回值（无需 `return` 关键字和分号）。

```rust
fn add(x: i32, y: i32) -> i32 {
    x + y // 这是一个表达式，作为返回值
}
```

### 4. 控制流

#### 4.1 `if-else` 条件表达式
`if` 的条件必须是 `bool` 类型。

```rust
let number = 6;
if number % 4 == 0 {
    println!("number is divisible by 4");
} else if number % 3 == 0 {
    println!("number is divisible by 3");
} else {
    println!("number is not divisible by 4 or 3");
}

// if 是一个表达式，可以用于 let 绑定
let condition = true;
let num = if condition { 5 } else { 6 };
```

#### 4.2 循环 (Loops)
- `loop`: 无限循环，通过 `break` 退出。
- `while`: 条件循环。
- `for`: 遍历一个迭代器，是 Rust中最常用的循环。

```rust
// loop
let mut counter = 0;
let result = loop {
    counter += 1;
    if counter == 10 {
        break counter * 2; // break 可以返回值
    }
};

// while
let mut number = 3;
while number != 0 {
    println!("{}!", number);
    number -= 1;
}

// for
let a = [10, 20, 30, 40, 50];
for element in a.iter() {
    println!("the value is: {}", element);
}

// for (Range)
for number in 1..4 { // 不包含 4
    println!("{}!", number);
}
```

### 5. 所有权系统（Rust 核心）

#### 5.1 所有权 (Ownership)
1.  Rust 中的每一个值都有一个被称为其**所有者**（owner）的变量。
2.  值在任一时刻有且只有一个所有者。
3.  当所有者（变量）离开作用域，这个值将被**丢弃**（drop）。

```rust
{
    let s = String::from("hello"); // s 是 "hello" 的所有者
    // ... 对 s 进行操作
} // s 离开作用域，"hello" 被释放
```

#### 5.2 移动 (Move) 与 克隆 (Clone)
对于存储在堆上的数据（如 `String`），赋值操作会转移所有权（移动）。

```rust
let s1 = String::from("hello");
let s2 = s1; // s1 的所有权移动到 s2
// println!("{}", s1); // 编译错误！s1 已失效
```

如果需要深拷贝，使用 `clone()` 方法。

```rust
let s1 = String::from("hello");
let s2 = s1.clone();
println!("s1 = {}, s2 = {}", s1, s2); // OK
```

#### 5.3 借用与引用 (Borrowing & References)
- `&T`: 不可变引用（共享借用）。
- `&mut T`: 可变引用（独占借用）。

**借用规则**：
1.  在任何给定时间，要么只能有一个可变引用，要么只能有任意数量的不可变引用。
2.  引用必须总是有效的。

```rust
fn calculate_length(s: &String) -> usize { // s 是一个对 String 的引用
    s.len()
} // s 离开作用域，但它不拥有所有权，所以什么也不会发生

fn change(s: &mut String) {
    s.push_str(", world");
}
```

#### 5.4 生命周期 (Lifetimes)
生命周期是 Rust 编译器用来确保所有引用都有效的机制，它是一种泛型参数。

- `'a`: 生命周期注解语法。

```rust
// 这个函数返回的引用，其生命周期与传入的两个引用中较短的那个一样长
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() {
        x
    } else {
        y
    }
}
```

### 6. 复合数据结构

#### 6.1 结构体 (Structs)
- **命名字段结构体**: `struct User { ... }`
- **元组结构体**: `struct Color(i32, i32, i32);`
- **单元结构体**: `struct AlwaysEqual;`

```rust
struct User {
    username: String,
    email: String,
    active: bool,
}

let user1 = User {
    email: String::from("someone@example.com"),
    username: String::from("someusername123"),
    active: true,
};
```

#### 6.2 枚举 (Enums)
一个枚举可以有多个变体，每个变体可以关联不同类型和数量的数据。

```rust
enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(i32, i32, i32),
}
```

`Option<T>` 和 `Result<T, E>` 是标准库中极其重要的枚举。

#### 6.3 `match` 模式匹配
`match` 提供了强大的控制流，可以根据值的模式执行不同的代码。它必须是穷尽的（exhaustive）。

```rust
fn process_message(msg: Message) {
    match msg {
        Message::Quit => println!("Quit"),
        Message::Move { x, y } => {
            println!("Move to x: {}, y: {}", x, y);
        },
        Message::Write(text) => println!("Text message: {}", text),
        Message::ChangeColor(r, g, b) => {
            println!("Change color to R:{}, G:{}, B:{}", r, g, b);
        }
    }
}
```

#### 6.4 `if let` 和 `while let`
用于处理只关心一种 `match` 模式的情况。

```rust
let some_u8_value = Some(3u8);
if let Some(3) = some_u8_value {
    println!("three");
}
```

### 7. 常用集合类型

#### 7.1 `String` 与 `&str`
- `String`: 堆上分配、可增长、拥有所有权的 UTF-8 编码字符串。
- `&str`: 字符串切片，是对 `String` 或字符串字面量某部分的不可变引用。

#### 7.2 `Vec<T>`
动态数组（Vector），在堆上分配，可以存储任意数量的同类型值。

```rust
let mut v: Vec<i32> = Vec::new();
v.push(5);
v.push(6);
```

#### 7.3 `HashMap<K, V>`
哈希映射，存储键值对。

```rust
use std::collections::HashMap;

let mut scores = HashMap::new();
scores.insert(String::from("Blue"), 10);
```

### 8. 错误处理

#### 8.1 `panic!`
用于不可恢复的错误。当 `panic!` 宏被调用时，程序会立即停止执行并展开（unwind）或终止（abort）线程。

```rust
panic!("crash and burn");
```

#### 8.2 `Result<T, E>`
用于可恢复的错误。这是一个枚举，有两个变体：`Ok(T)` 表示成功并包含一个值，`Err(E)` 表示失败并包含一个错误值。

```rust
enum Result<T, E> {
    Ok(T),
    Err(E),
}
```

#### 8.3 `?` 运算符
用于简化错误传播。如果 `Result` 的值是 `Ok`，它会取出其中的值；如果是 `Err`，它会立即从当前函数返回这个 `Err`。

```rust
use std::fs::File;
use std::io::Read;

fn read_username_from_file() -> Result<String, std::io::Error> {
    let mut f = File::open("hello.txt")?;
    let mut s = String::new();
    f.read_to_string(&mut s)?;
    Ok(s)
}
```

### 9. 泛型、Trait 与生命周期

#### 9.1 泛型 (Generics)
用于创建可处理多种数据类型的函数、结构体、枚举等。

```rust
fn largest<T: PartialOrd + Copy>(list: &[T]) -> T {
    // ...
}

struct Point<T> {
    x: T,
    y: T,
}
```

#### 9.2 Trait
Trait 定义了某种类型必须提供的功能，类似于其他语言中的接口。

```rust
pub trait Summary {
    fn summarize(&self) -> String;
}

// 为类型实现 Trait
pub struct Tweet { /* ... */ }
impl Summary for Tweet {
    fn summarize(&self) -> String {
        // ...
    }
}
```

#### 9.3 Trait 约束 (Trait Bounds)
使用 `+` 语法来指定泛型参数必须实现多个 Trait。

```rust
fn some_function<T: Display + Clone, U: Clone + Debug>(t: &T, u: &U) -> i32 {
    // ...
}
```

### 10. 模块化系统

- **包 (Package)**: 一个或多个 crate 的集合，提供一组功能。一个包包含一个 `Cargo.toml` 文件。
- **Crate**: Rust 的编译单元，可以是一个库（library）或一个可执行文件（binary）。
- **模块 (Module)**: 在一个 crate 中组织代码、控制作用域和私有性的方式。
- `mod`: 定义一个模块。
- `use`: 将路径引入作用域。
- `pub`: 将项（函数、结构体等）标记为公共的，使其在模块外可见。

```rust
// lib.rs
mod front_of_house {
    pub mod hosting {
        pub fn add_to_waitlist() {}
    }
}

pub fn eat_at_restaurant() {
    // 绝对路径
    crate::front_of_house::hosting::add_to_waitlist();
    // 相对路径
    front_of_house::hosting::add_to_waitlist();
}

// 使用 use 简化
use crate::front_of_house::hosting;
pub fn eat_at_restaurant_v2() {
    hosting::add_to_waitlist();
}
```

### 11. 智能指针

智能指针是行为像指针但还拥有额外元数据和功能的数据结构。

- `Box<T>`: 在堆上分配值，用于创建递归类型或转移大量数据的所有权。
- `Rc<T>`: 引用计数（Reference Counting）智能指针，允许多个所有者。**非线程安全**。
- `Arc<T>`: 原子引用计数（Atomically Reference Counted），`Rc<T>` 的线程安全版本。
- `RefCell<T>`: 在运行时而不是编译时检查借用规则，允许在拥有不可变引用的同时修改数据（内部可变性）。**非线程安全**。
- `Mutex<T>`: 互斥锁，用于在多线程中实现对数据的独占访问。

### 12. 并发编程

- **线程**: 使用 `std::thread::spawn` 创建新线程。
- **消息传递**: 使用通道（Channel）在线程间安全地传递数据。
- **共享状态**: 使用 `Mutex` 和 `Arc` 在线程间共享数据。
- **`async`/`.await`**: 用于编写异步、非阻塞的代码，通常与 `tokio` 或 `async-std` 等运行时一起使用。

```rust
use std::thread;
use std::time::Duration;

let handle = thread::spawn(|| {
    for i in 1..10 {
        println!("hi number {} from the spawned thread!", i);
        thread::sleep(Duration::from_millis(1));
    }
});

handle.join().unwrap();
```

### 13. 宏（Macros）

宏是一种编写可以生成其他代码的代码的方式（元编程）。

- **声明式宏 (Declarative Macros)**: 使用 `macro_rules!` 创建，类似于 `match` 表达式。`println!`, `vec!` 都是声明式宏。
- **过程宏 (Procedural Macros)**: 接收 Rust 代码作为输入，操作这些代码，然后产生另一些 Rust 代码作为输出。
    - 自定义 `#[derive]` 宏。
    - 类属性宏。
    - 类函数宏。

### 14. Unsafe Rust

`unsafe` 关键字可以让你绕过 Rust 的一些安全检查，提供了五个“超能力”：
1.  解引用裸指针。
2.  调用 `unsafe` 函数或方法。
3.  访问或修改可变静态变量。
4.  实现 `unsafe` Trait。
5.  访问 `union` 的字段。

主要用于与底层硬件交互、调用 FFI（外部函数接口）或进行性能极致的优化。

```rust
let mut num = 5;
let r1 = &num as *const i32;
let r2 = &mut num as *mut i32;

unsafe {
    println!("r1 is: {}", *r1);
    *r2 = 6;
    println!("num is now: {}", num);
}
```

### 15. 其他重要语法与概念

- **闭包 (Closures)**: 可以捕获其环境的匿名函数。语法为 `|param1, param2| { body }`。
- **迭代器 (Iterators)**: Trait `Iterator` 提供了一种处理序列的方式。`for` 循环就是迭代器的语法糖。
- **类型别名 (Type Aliases)**: 使用 `type` 关键字为现有类型创建别名，以减少重复。`type Kilometers = i32;`
- **FFI (Foreign Function Interface)**: 与其他语言（通常是 C）编写的代码进行交互。

---