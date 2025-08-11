好的，这是一份关于 MySQL 语法分类的完整文档，旨在对 MySQL 的常用语法进行系统化归纳。

---

## MySQL 语法分类文档

### 概述

MySQL 是一种流行的开源关系型数据库管理系统 (RDBMS)，其语法遵循 SQL（结构化查询语言）标准，并在此基础上进行了扩展。理解 MySQL 语法分类有助于开发者和数据库管理员更高效地设计、管理和操作数据库。

SQL 语法通常被划分为几个主要类别，MySQL 也严格遵循这些分类，并在每个类别中提供了丰富的命令和功能。

### 一、 数据定义语言 (DDL - Data Definition Language)

DDL 用于创建、修改和删除数据库对象，如数据库、表、视图、索引、存储过程、函数、触发器等。DDL 操作是数据库结构层面的操作。

#### 1. 数据库 (Database/Schema) 操作

*   **创建数据库:**
    ```sql
    CREATE {DATABASE | SCHEMA} [IF NOT EXISTS] db_name
        [character_set_clause]
        [collation_clause];
    ```
    示例：`CREATE DATABASE my_database CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`
*   **修改数据库:**
    ```sql
    ALTER {DATABASE | SCHEMA} [db_name]
        [character_set_clause]
        [collation_clause];
    ```
    示例：`ALTER DATABASE my_database CHARACTER SET utf8;`
*   **删除数据库:**
    ```sql
    DROP {DATABASE | SCHEMA} [IF EXISTS] db_name;
    ```
    示例：`DROP DATABASE my_database;`
*   **选择数据库:**
    ```sql
    USE db_name;
    ```
    示例：`USE my_database;`

#### 2. 表 (Table) 操作

*   **创建表:**
    ```sql
    CREATE TABLE [IF NOT EXISTS] table_name (
        column1 data_type [column_constraints],
        column2 data_type [column_constraints],
        ...,
        [table_constraints]
    ) [table_options];
    ```
    **常用列约束 (Column Constraints):** `NOT NULL`, `DEFAULT default_value`, `AUTO_INCREMENT`, `UNIQUE`, `PRIMARY KEY`, `FOREIGN KEY`。
    **常用表约束 (Table Constraints):** `PRIMARY KEY (column1, ...)`, `UNIQUE (column1, ...)`, `FOREIGN KEY (column1) REFERENCES other_table(other_column) [ON DELETE action] [ON UPDATE action]`, `CHECK (condition)`.
    **常用表选项 (Table Options):** `ENGINE=InnoDB | MyISAM`, `DEFAULT CHARSET=charset_name`, `COLLATE=collation_name`, `AUTO_INCREMENT=N`, `COMMENT='table comment'`.
    示例：
    ```sql
    CREATE TABLE users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        email VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    ```
*   **修改表结构:**
    ```sql
    ALTER TABLE table_name
        [ADD COLUMN column_name data_type [column_constraints]]
        [DROP COLUMN column_name]
        [MODIFY COLUMN column_name data_type [column_constraints]] -- 仅修改数据类型或约束
        [CHANGE COLUMN old_column_name new_column_name data_type [column_constraints]] -- 修改列名和/或数据类型/约束
        [RENAME TO new_table_name]
        [ADD {PRIMARY KEY | UNIQUE | FOREIGN KEY} (...)]
        [DROP {PRIMARY KEY | INDEX index_name | FOREIGN KEY fk_constraint_id}]
        [ALTER COLUMN column_name {SET DEFAULT default_value | DROP DEFAULT}]
        [AUTO_INCREMENT = N]
        ...;
    ```
    示例：
    ```sql
    ALTER TABLE users ADD COLUMN age INT;
    ALTER TABLE users CHANGE COLUMN email user_email VARCHAR(120);
    ALTER TABLE users ADD INDEX idx_username (username);
    ```
*   **删除表:**
    ```sql
    DROP TABLE [IF EXISTS] table_name [, table_name2, ...];
    ```
    示例：`DROP TABLE users;`
*   **清空表 (截断表):**
    ```sql
    TRUNCATE TABLE table_name;
    ```
    (DDL操作，因为它删除并重新创建表，自增ID会重置)
    示例：`TRUNCATE TABLE logs;`

#### 3. 索引 (Index) 操作

*   **创建索引:**
    ```sql
    CREATE [UNIQUE | FULLTEXT | SPATIAL] INDEX index_name
        ON table_name (column1 [ASC|DESC], column2 [ASC|DESC], ...);
    ```
    示例：`CREATE INDEX idx_user_email ON users (user_email);`
*   **删除索引:**
    ```sql
    DROP INDEX index_name ON table_name;
    ```
    示例：`DROP INDEX idx_user_email ON users;`
    或者 `ALTER TABLE table_name DROP INDEX index_name;`

#### 4. 视图 (View) 操作

*   **创建视图:**
    ```sql
    CREATE [OR REPLACE] VIEW view_name [(column_list)]
        AS select_statement
        [WITH [CASCADED | LOCAL] CHECK OPTION];
    ```
    示例：`CREATE VIEW active_users AS SELECT id, username FROM users WHERE status = 'active';`
*   **修改视图:**
    ```sql
    ALTER VIEW view_name [(column_list)]
        AS select_statement
        [WITH [CASCADED | LOCAL] CHECK OPTION];
    ```
    (与 CREATE OR REPLACE VIEW 类似，但用于修改现有视图)
*   **删除视图:**
    ```sql
    DROP VIEW [IF EXISTS] view_name [, view_name2, ...];
    ```
    示例：`DROP VIEW active_users;`

#### 5. 存储过程 (Stored Procedure) 和函数 (Function) 操作

*   **创建存储过程/函数:**
    ```sql
    DELIMITER //
    CREATE {PROCEDURE | FUNCTION} sp_name ([param_list])
        [characteristics]
        BEGIN
            -- SQL statements
        END //
    DELIMITER ;
    ```
    示例（存储过程）：
    ```sql
    DELIMITER //
    CREATE PROCEDURE GetUserById(IN user_id INT)
    BEGIN
        SELECT * FROM users WHERE id = user_id;
    END //
    DELIMITER ;
    ```
    示例（函数）：
    ```sql
    DELIMITER //
    CREATE FUNCTION AddNumbers(a INT, b INT) RETURNS INT
    BEGIN
        RETURN a + b;
    END //
    DELIMITER ;
    ```
*   **修改存储过程/函数:** `ALTER {PROCEDURE | FUNCTION} sp_name [characteristics];` (只能修改一些特性，不能修改主体逻辑，修改主体需先DROP后CREATE)
*   **删除存储过程/函数:**
    ```sql
    DROP {PROCEDURE | FUNCTION} [IF EXISTS] sp_name;
    ```
    示例：`DROP PROCEDURE GetUserById;`

#### 6. 触发器 (Trigger) 操作

*   **创建触发器:**
    ```sql
    DELIMITER //
    CREATE TRIGGER trigger_name
        {BEFORE | AFTER} {INSERT | UPDATE | DELETE}
        ON table_name FOR EACH ROW
        BEGIN
            -- SQL statements (can use OLD and NEW)
        END //
    DELIMITER ;
    ```
    示例：
    ```sql
    DELIMITER //
    CREATE TRIGGER after_user_insert
    AFTER INSERT ON users FOR EACH ROW
    BEGIN
        INSERT INTO user_logs (user_id, action, timestamp) VALUES (NEW.id, 'inserted', NOW());
    END //
    DELIMITER ;
    ```
*   **删除触发器:**
    ```sql
    DROP TRIGGER [IF EXISTS] trigger_name;
    ```
    示例：`DROP TRIGGER after_user_insert;`

#### 7. 事件 (Event) 操作

*   **创建事件:**
    ```sql
    DELIMITER //
    CREATE EVENT [IF NOT EXISTS] event_name
    ON SCHEDULE {
        AT timestamp [+ INTERVAL interval]
        | EVERY interval [STARTS timestamp] [ENDS timestamp]
    }
    [ON COMPLETION [NOT PRESERVE] [RECYCLE]]
    [ENABLE | DISABLE | DISABLE ON SLAVE]
    [COMMENT 'comment_string']
    DO
        BEGIN
            -- SQL statements
        END //
    DELIMITER ;
    ```
    示例：
    ```sql
    DELIMITER //
    CREATE EVENT daily_cleanup
    ON SCHEDULE EVERY 1 DAY STARTS '2023-01-01 00:00:00'
    DO
    BEGIN
        DELETE FROM old_logs WHERE log_date < CURDATE() - INTERVAL 30 DAY;
    END //
    DELIMITER ;
    ```
*   **修改事件:**
    ```sql
    ALTER EVENT event_name
        [ON SCHEDULE ...]
        [RENAME TO new_event_name]
        [ENABLE | DISABLE | DISABLE ON SLAVE]
        [DO BEGIN ... END]
        ...;
    ```
*   **删除事件:**
    ```sql
    DROP EVENT [IF EXISTS] event_name;
    ```

### 二、 数据操作语言 (DML - Data Manipulation Language)

DML 用于查询、插入、更新和删除数据库中的数据。这些操作是数据层面的操作。

#### 1. 查询数据

*   **SELECT (数据查询语言 - DQL):**
    ```sql
    SELECT [DISTINCT] column1, column2, ... | *
    FROM table_name
    [WHERE condition]
    [GROUP BY column1, column2, ...]
    [HAVING condition]
    [ORDER BY column1 [ASC|DESC], column2 [ASC|DESC], ...]
    [LIMIT [offset,] row_count];
    ```
    **常用子句:**
    *   **WHERE:** 用于过滤行。`=`, `!=`, `>`, `<`, `>=`, `<=`, `LIKE`, `IN`, `BETWEEN`, `IS NULL`, `IS NOT NULL`, `AND`, `OR`, `NOT`。
    *   **GROUP BY:** 将结果集按一个或多个列进行分组，常与聚合函数 (`COUNT()`, `SUM()`, `AVG()`, `MIN()`, `MAX()`) 结合使用。
    *   **HAVING:** 过滤分组。
    *   **ORDER BY:** 对结果集进行排序。
    *   **LIMIT:** 限制返回的行数。
    *   **JOINs:** `INNER JOIN`, `LEFT JOIN`, `RIGHT JOIN`, `CROSS JOIN` (MySQL 8.0+ 支持 `FULL JOIN` 模拟或通过 `UNION` 实现)。
    *   **子查询 (Subqueries):** 嵌套在其他查询中的查询。
    *   **UNION | UNION ALL:** 合并多个 SELECT 语句的结果。
    *   **窗口函数 (Window Functions):** (MySQL 8.0+) `ROW_NUMBER()`, `RANK()`, `LAG()`, `LEAD()`, `NTILE()`, `NTH_VALUE()`, `FIRST_VALUE()`, `LAST_VALUE()`, `AVG() OVER(...)` 等。
    *   **CTE (Common Table Expressions - WITH 子句):** (MySQL 8.0+)
        ```sql
        WITH cte_name AS (SELECT ...)
        SELECT ... FROM cte_name ...;
        ```
    示例：
    ```sql
    SELECT username, email FROM users WHERE age > 25 ORDER BY username ASC LIMIT 10;
    SELECT department, COUNT(id) AS num_employees FROM employees GROUP BY department HAVING num_employees > 5;
    ```

#### 2. 插入数据

*   **INSERT INTO ... VALUES:**
    ```sql
    INSERT INTO table_name (column1, column2, ...)
    VALUES (value1, value2, ...);
    ```
    示例：`INSERT INTO users (username, email) VALUES ('alice', 'alice@example.com');`
*   **INSERT INTO ... SELECT:**
    ```sql
    INSERT INTO table_name (column1, column2, ...)
    SELECT columnA, columnB, ... FROM other_table WHERE condition;
    ```
    示例：`INSERT INTO archived_users SELECT * FROM users WHERE status = 'inactive';`
*   **INSERT IGNORE INTO:** 如果插入的数据导致唯一键或主键冲突，则忽略该行。
*   **REPLACE INTO:** 如果数据存在 (基于主键或唯一键)，则删除旧行并插入新行；否则直接插入。
    ```sql
    REPLACE INTO table_name (column1, ...) VALUES (value1, ...);
    ```
*   **ON DUPLICATE KEY UPDATE:** 如果插入导致唯一键或主键冲突，则执行 UPDATE 操作而不是插入新行。
    ```sql
    INSERT INTO table_name (column1, column2) VALUES (value1, value2)
    ON DUPLICATE KEY UPDATE column2 = new_value2, column1 = VALUES(column1);
    ```

#### 3. 更新数据

*   **UPDATE:**
    ```sql
    UPDATE table_name
    SET column1 = value1, column2 = value2, ...
    [WHERE condition]
    [ORDER BY column]
    [LIMIT row_count];
    ```
    示例：`UPDATE users SET email = 'new_email@example.com' WHERE username = 'alice';`

#### 4. 删除数据

*   **DELETE FROM:**
    ```sql
    DELETE FROM table_name
    [WHERE condition]
    [ORDER BY column]
    [LIMIT row_count];
    ```
    示例：`DELETE FROM users WHERE status = 'inactive';`
    注意：不带 WHERE 条件的 DELETE FROM 会删除表中所有数据，但不会重置自增ID。

### 三、 数据控制语言 (DCL - Data Control Language)

DCL 用于管理数据库用户的权限和访问控制。

#### 1. 用户管理

*   **创建用户:**
    ```sql
    CREATE USER 'username'@'host' IDENTIFIED BY 'password' [password_options];
    ```
    示例：`CREATE USER 'dev_user'@'localhost' IDENTIFIED BY 'dev_password';`
    `CREATE USER 'remote_user'@'%' IDENTIFIED BY 'remote_password';`
*   **修改用户:**
    ```sql
    ALTER USER 'username'@'host' IDENTIFIED BY 'new_password' [password_options];
    ```
    示例：`ALTER USER 'dev_user'@'localhost' IDENTIFIED BY 'new_dev_password';`
*   **删除用户:**
    ```sql
    DROP USER 'username'@'host';
    ```
    示例：`DROP USER 'dev_user'@'localhost';`

#### 2. 权限管理

*   **授予权限:**
    ```sql
    GRANT privilege_type [, privilege_type] ...
    ON {object_type} object_name
    TO 'username'@'host' [IDENTIFIED BY 'password']
    [WITH GRANT OPTION];
    ```
    **常用权限类型:** `SELECT`, `INSERT`, `UPDATE`, `DELETE`, `CREATE`, `ALTER`, `DROP`, `INDEX`, `ALL PRIVILEGES`。
    **常用对象类型:** `*.*` (所有数据库所有表), `db_name.*` (指定数据库所有表), `db_name.table_name` (指定表)。
    示例：
    ```sql
    GRANT SELECT, INSERT ON my_database.users TO 'dev_user'@'localhost';
    GRANT ALL PRIVILEGES ON my_database.* TO 'admin'@'localhost' WITH GRANT OPTION;
    ```
*   **撤销权限:**
    ```sql
    REVOKE privilege_type [, privilege_type] ...
    ON {object_type} object_name
    FROM 'username'@'host';
    ```
    示例：`REVOKE INSERT ON my_database.users FROM 'dev_user'@'localhost';`
*   **刷新权限:**
    ```sql
    FLUSH PRIVILEGES;
    ```
    (在修改用户权限后，有时需要刷新权限使其生效，尽管 MySQL 新版本中许多 DCL 操作会自动刷新)

### 四、 事务控制语言 (TCL - Transaction Control Language)

TCL 用于管理数据库中的事务，确保数据的一致性和完整性。MySQL 默认是自动提交事务的 (autocommit=1)。

*   **开始事务:**
    ```sql
    START TRANSACTION;
    ```
    或者
    ```sql
    BEGIN;
    ```
    或者
    ```sql
    SET autocommit = 0; -- 关闭自动提交
    ```
*   **提交事务:**
    ```sql
    COMMIT;
    ```
*   **回滚事务:**
    ```sql
    ROLLBACK;
    ```
*   **设置保存点 (Savepoint):**
    ```sql
    SAVEPOINT savepoint_name;
    ```
*   **回滚到保存点:**
    ```sql
    ROLLBACK TO SAVEPOINT savepoint_name;
    ```
*   **释放保存点:**
    ```sql
    RELEASE SAVEPOINT savepoint_name;
    ```

### 五、 其他常用语法和命令

除了标准的 DDL/DML/DCL/TCL 外，MySQL 还提供了许多实用的命令和功能，用于信息查询、服务器管理和优化等。

#### 1. 信息查询类

*   **显示数据库:**
    ```sql
    SHOW DATABASES;
    ```
*   **显示表:**
    ```sql
    SHOW TABLES [FROM db_name] [LIKE 'pattern'];
    ```
*   **显示表结构:**
    ```sql
    DESCRIBE table_name;
    ```
    或者
    ```sql
    DESC table_name;
    ```
    或者
    ```sql
    SHOW COLUMNS FROM table_name;
    ```
*   **显示创建表的语句:**
    ```sql
    SHOW CREATE TABLE table_name;
    ```
*   **显示索引:**
    ```sql
    SHOW INDEX FROM table_name;
    ```
*   **显示视图:**
    ```sql
    SHOW FULL TABLES WHERE Table_type = 'VIEW';
    ```
*   **显示存储过程/函数:**
    ```sql
    SHOW {PROCEDURE | FUNCTION} STATUS [LIKE 'pattern'];
    ```
*   **显示触发器:**
    ```sql
    SHOW TRIGGERS [FROM db_name] [LIKE 'pattern'];
    ```
*   **显示事件:**
    ```sql
    SHOW EVENTS [FROM db_name] [LIKE 'pattern'];
    ```
*   **显示用户权限:**
    ```sql
    SHOW GRANTS FOR 'username'@'host';
    ```
*   **显示进程列表:**
    ```sql
    SHOW PROCESSLIST;
    ```
    或者 `SHOW FULL PROCESSLIST;`
*   **显示状态信息:**
    ```sql
    SHOW STATUS;
    ```
*   **显示系统变量:**
    ```sql
    SHOW {GLOBAL | SESSION} VARIABLES [LIKE 'pattern'];
    ```
*   **显示警告/错误:**
    ```sql
    SHOW WARNINGS;
    SHOW ERRORS;
    ```

#### 2. 优化与维护类

*   **分析表:**
    ```sql
    ANALYZE TABLE table_name;
    ```
*   **优化表:**
    ```sql
    OPTIMIZE TABLE table_name;
    ```
*   **检查表:**
    ```sql
    CHECK TABLE table_name;
    ```
*   **修复表:**
    ```sql
    REPAIR TABLE table_name;
    ```
*   **刷新操作 (FLUSH):**
    ```sql
    FLUSH {TABLES | HOSTS | LOGS | PRIVILEGES | STATUS | ALL};
    ```
*   **锁定/解锁表:**
    ```sql
    LOCK TABLES table_name {READ | WRITE};
    UNLOCK TABLES;
    ```
*   **解释执行计划:**
    ```sql
    EXPLAIN SELECT ...;
    EXPLAIN ANALYZE SELECT ...; -- (MySQL 8.0+)
    ```

#### 3. 系统变量设置

*   **设置会话变量:**
    ```sql
    SET @var_name = value;
    SET SESSION var_name = value;
    ```
*   **设置全局变量:**
    ```sql
    SET GLOBAL var_name = value;
    ```
    示例：`SET GLOBAL event_scheduler = ON;`

#### 4. 导入/导出数据 (通常通过客户端工具如 `mysql` 或 `mysqldump` 进行，但这里提及相关概念)

*   **导入数据 (LOAD DATA):**
    ```sql
    LOAD DATA [LOCAL] INFILE 'file_name'
    INTO TABLE table_name
    [FIELDS TERMINATED BY 'string']
    [ENCLOSED BY 'char']
    [ESCAPED BY 'char']
    [LINES TERMINATED BY 'string']
    [IGNORE number LINES]
    [(col_name_or_user_var, ...)];
    ```
*   **选择数据导出到文件:**
    ```sql
    SELECT ... INTO OUTFILE 'file_name'
    [FIELDS TERMINATED BY 'string']
    [ENCLOSED BY 'char']
    [ESCAPED BY 'char']
    [LINES TERMINATED BY 'string'];
    ```

### 总结

这份文档对 MySQL 的核心语法进行了分类和详细说明。掌握这些分类和其中的具体命令，是高效使用 MySQL 数据库的关键。

*   **DDL** 关注数据库结构。
*   **DML** 关注数据内容。
*   **DCL** 关注权限和安全。
*   **TCL** 关注事务的原子性、一致性、隔离性和持久性。
*   其他命令则提供了强大的查询、维护、优化和管理功能。

通过深入理解这些分类，可以更好地组织数据库操作，提高开发和管理效率。

---