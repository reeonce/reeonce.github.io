---
layout: post
title: SQLite 的主键设计
category: Database
tags: [Database, SQLite, AUTOINCREMENT]
---

- - -
*最近被公司之前的数据库操作代码整晕了，于是想通过这边文章捋捋。*

*先假设这个一张公司的员工表，有员工的姓名、生日、手机号、性别、身份证号、职位、部门这几个信息。可以这样来创建这个表：*

```SQL
CREATE TABLE Employee (
  phone_number text primary key,
  name text,
  gender integer,
  ...
);
```

看着没啥问题，于是很多人可能不经思量就开始写代码了。可是这真的符合Best practice么？

- - -

### 主键的选择

#### 可选方案

主键可以有两种选择：

- 自然键(Natural key)，指的是某些具有业务逻辑含义的属性。
- 代理键(Surrogate key)，引入的一个与表中业务逻辑不相干的虚拟键。

对于这张表，可以找出的候选键包括：

- 身份证号、手机号、姓名＋生日的组合这三种自然键
- 引入员工号的代理键

那么这几个哪个合适？主键的设计应该遵从哪些原则呢？虽然课本上没有讲到这一张，但是Google 上自有牛人的肩膀。

<!-- more -->

#### 原则

总的来说有这么几点：

+ 主键的值最好是小的整数。它比字符类型更加紧凑。当这个主键需要作为别的表的外键的时候，键越小，使用的page 也会越少。
+ 主键应该是永远不变的。在有多个索引和作为外键的时候，更改主键的值会是灾难性的。
+ 应该避免使用与逻辑相关的主键。因为这些键都是可能会改变的，比如身份证从15到18位。
+ 使用原子值，而非组合值。比如用姓名＋生日的方式作为主键，一方面这与单独的姓名和生日两列造成了数据重复；另一方面你很难对这个列的数据作出限制；再者，SELECT 代码需要做其它烦人的操作，因此极其不建议。

#### 做出选择

虽然代理主键有时会难以理解，并且可能需要客户端增加一个通过主键来获得某个员工信息的搜索列，但是这却对之后的代码设计、程序性能和维护有很大好处。我们还是应该使用一个employee_id 作为这张表的主键。

### 实现

由于我们选择了员工号作为我们的主键，对于SQLite 数据库，我们可以这样创建这张表：

```SQL
CREATE TABLE Employee (
  employee_id integer primary key AUTOINCREMENT,
  phone_number text,
  name text,
  ...
);
```

员工号应该是递增的，非常自然地加上AUTOINCREMENT 这个关键字，然而真的有必要么？

#### SQLite table 中的ROWID

当你创建一个 table 的时候，如果没有指定`WITHOUT ROWID`，SQLite 会自动给你分配一个64位的自动递增的整型列 － **rowid**，来作为这一行的唯一标识。

你可以通过`select rowid from table;` 来查看它的值。

当你通过`INTEGER PRIMARY KEY` 来指定表的主键时，这个主键列将会直接指向rowid，也不会产生多余的数据存储。

那么怎么给rowid 赋值的呢？

- 你可以直接通过`INSERT INTO table(rowid, xxx, xx, ) VALUES(123456, aaa, bb, )` 的方式来显式地给它赋值。
- 而当你没有为rowid 指定值或者值为NULL 的时候，SQLite 会自动将其赋值为`MAX(rowid) + 1`。如果表中没有数据的话，rowid 默认的值会是1。

随着数据不停地增加，如果达到最大值后，你又继续执行了插入操作，会发生什么？

SQLite 中，rowid 的最大值为`2^63 - 1`，即9223372036854775807。当继续增加时，SQLite 会尝试找到一个没有被使用过的整数作为其rowid 值。如果找不到，则会返回一个*SQLITE FULL* 错误。

> 注：这个新增的值应该是一个随机值，并不是从0开始遍历查找得到的。

#### SQLite 中的 AUTOINCREMENT 属性

SQLite 建议我们避免使用 `AUTOINCREMENT` 属性，因为：

> `AUTOINCREMENT` 关键字会导致CPU、内存、磁盘空间和磁盘I/O 开销的增加。如果不是特别需要的话，就应该避免使用，通常我们也并不需要使用它。

不仅如此，SQLite 对 AUTOINCREMENT 的列赋值的做法与rowid 并不相同。如果主键值已达到最大值，再尝试INSERT 的话，就会得到
*database or disk is full* 的错误。

所以，AUTOINCREMENT 的主要目的是防止 SQLite 重复使用之前删除的行。如果没有这个需求的话，将主键指定为 AUTOINCREMENT 是完全没有必要的。

由于2^63 足够的大，我们这里并没有理由去使用AUTOINCREMENT。于是，我们可以将这个表设计为：

```SQL
CREATE TABLE Employee (
  employee_id integer primary key,
  phone_number text,
  name text,
  ...
);
```

### 总结

数据表的结构对应用程序有着及其重要的影响，如果数据表定义的好，上层代码也会很紧凑、高效且具有良好的扩展性。所以，为了不断加班的基友们，设计数据表时请三思而后行呀！

*引用：*

[Database Skills: A Sane Approach To Choosing Primary Keys](http://database-programmer.blogspot.sg/2008/01/database-skills-sane-approach-to.html)

[SQLite AUTOINCREMENT : Why You Should Avoid Using It](http://www.sqlitetutorial.net/sqlite-autoincrement/)
