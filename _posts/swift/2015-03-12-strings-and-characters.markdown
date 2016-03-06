---
layout: post
title: "字符串"
category: swift
tags: String swift
---

> 注：
>
> 本文由 *“The Swift Programming Language”* 中的*Strings and Characters* 一节译得， [Github](https://github.com/numbbbbb/the-swift-programming-language-in-chinese) 上已经有了全书的翻译。但是我还是自己翻译了一下，算是练练手，并加深自己的理解。

*字符串（string）*是一个有序的字符集合，比如 *"Hello, world"* 或者 "信天翁"。Swift 中字符串由 `String` 类型表示，`String` 也表示为一个 `Character` 类型的集合。

在 Swift 中，`String` 和 `Character` 为开发者在代码中操作文本提供了一个快速的、兼容Unicode 的方式。创建和维护字符串的语法轻量且可读，包括像C 语言一样的字面值语法。连接两个字符串简单到只需要使用 `+` 操作符将两个字符餐相加，还可以像Swift 中的其他值一样通过定义为常量或者变量来控制字符串的可变性。

`String` 类型不仅拥有如此简单的语法，而且有着非常快速和现代的实现。每一个字符串都是由独立编码的 Unicode 字符组成，并且支持在无数Unicode 描述中访问这些字符。

你可以通过在字符串中插入常量、变量、字面值和表达式来获得更长的字符串，也就是所谓的*字符串插值（string interpolation）*。这使得创建专门用来显示、存储或者打印的字符串变的极其简单。

> 注:
>
> Swift 中的 `String` 类型是桥接到 Foundation 的 `NSString` 类型的。如果你在使用Cocoa 中的Foundation 框架，所有使用 `NSString` 的API 都可以通过将 `String` 转换到 `NSString` 后使用，同时所有使用到 `NSString` 的API 也可以用 `String` 来替代。

#### 字符串字面值

你能够将预定义的 `String` 的值作为*字符串字面值（string literals）* 包含在代码中。一个字符串字面值是一个由一对双引号（""）包围的固定的文字序列。

将一个字符串字面值作为一个常量或者变量的初始值：

```swift
let someString = "Some string literals value"
```

注意Swift 会自动判断 `someString` 为一个 `String` 类型，因为它使用一个字符串字面值来初始化。

<!-- more -->
#### 初始化一个空字符串

要创建一个空的 `String` 值作为建立一个长字符串的起点，可以通过将一个空的字符串字面值赋值给一个变量，或者是使用初始化器语法来初始化一个 `String` 实例。

```swift
var emptyString = ""               // empty string literal
var anotherEmptyString = String()  // initializer syntax
// these two strings are both empty, and are equivalent to each other
```

为了判断一个字符串是否为空可以通过检查它的 `isEmpty` 属性：

```swift
if emptyString.isEmpty {
    println("Nothing to see here")
}
// prints "Nothing to see here
```

#### 字符串的可变性

你可以通过将一个字符串赋值给一个变量来暗示这字符串是可以修改的，反之，赋值给常量则是不可修改的。

```swift
var variableString = "Horse"
variableString += " and carriage"
// variableString is now "Horse and carriage"

let constantString = "Highlander"
constantString += " and another Highlander"
// this reports a compile-time error - a constant string cannot be modified
```

> 注:
>
> 这种跟Objective-C 和 Cocoa 中字符串可变形的方法是不同的。在Objective-C 和 Cocoa 中，你通过选择 `NSString` 和 `NSMutableString` 来暗示字符串的可变性。

#### 字符串是值类型

Swift 中的 `String` 类型是一个*值类型（value type）*。如果你创建了一个新的 `String`，那么当这个字符串被传入到一个函数或者方法中或者赋值给一个变量或者常量的时候，实际上传入（或者赋值）的是这个字符串的一个拷贝。也就是，在这种情况下，一个新字符串会作为当前字符串的拷贝而被创建，然后传入到函数中或者是赋值给变量，而不是那个原始的字符串。更多的关于*值类型* 的内容可以查看*Structures and Enumerations Are Value Types* 一节。

> 注:
>
> 这种跟Cocoa 中 `NSString` 的行为是不同的。在Cocoa 中，当一个字符串被传入到函数中时，传入的总是这个 `NSString` 实例的引用。如果你没有刻意请求拷贝字符串，程序不会使用拷贝来替代。

Swift 的这种对字符串的默认拷贝行为确保了当一个函数或方法传入了一个 `String` 的参数时，不管它从哪里传来，你都将完全地拥有这个字符串。原始的字符串将永远不会在这个函数里面得到修改。

在后台，Swift 的编译器会优化字符串的用法，只有当真正需要的时候才进行对字符串的拷贝。这意味着把字符串作为值类型能够获得非常不错的性能。

#### 使用字符

Swift 的 `String` 类型表示的是 `Character` 值的一个有序集合。你可以通过 `for-in` 语句遍历字符串来获得单个字符的值。

```swift
for character in "Dog!🐶" {
    println(character)
}
// D
// o
// g
// !
// 🐶
```

或者，你可以通过标注一个单字符字面值为 `Character` 来创建一个独立的 `Character` 变量或常量：

```swift
let exclamationMark: Character = "!"
```

`String` 可以通过在传入一个 `Character` 的数组到初始化器中来构建：

```swift
let catCharacters: [Character] = ["C", "a", "t", "!", "🐱"]
let catString = String(catCharacters)
println(catString)
// prints "Cat!🐱
```

#### 连接字符串和字符

可以通过 `+` 操作符来将 `String` 的值相加（或者说连接）而得到一个新的 `String` 值。

```swift
let string1 = "hello"
let string2 = " there"
var welcome = string1 + string2
// welcome now equals "hello there
```

你也可以通过 `+=` 操作符将一个字符串附加到一个已经存在的字符串上:

```swift
var instruction = "look over"
instruction += string2
// instruction now equals "look over there
```

你还可以通过 `String` 的 `append` 方法将一个 `Character` 值附加到一个 `String` 上：

```swift
let exclamationMark: Character = "!"
welcome.append(exclamationMark)
// welcome now equals "hello there!
```

> 注:
>
> 你不能将 `String` 或者 `Character` 的值附加到一个 `Character` 变量上，因为一个 `Character` 的值必须只包含一个字符。

#### 字符串插值

*字符串插值* 是一种构建一个全新字符串的方式，它通过将混合的常量、变量、字面值和表达式包含在一个字符串字面值内来实现。这些被包含的每一项外层是一对圆括号，并且前面是一个反斜线：

```swift
let multiplier = 3
let message = "\(multiplier) times 2.5 is \(Double(multiplier) * 2.5)"
// message is "3 times 2.5 is 7.5
```

在上述例子中，`multiplier` 的值以 `\(multiplier)` 被插入到了字符串字面值中。当字符串字面值要被作为一个新的 `String` 的值时，这个占位符会被替换成 `multiplier` 的值。

`multiplier` 的值同样作为之后表达式的一部分，这个表达式计算出 `Double(multiplier) * 2.5` 的值并将结果 `7.5` 插入到字符串中。在这里，当表达式被包含在字符串字面值中时，被写成 `\(Double(multiplier) * 2.5)`。

> 注:
>
> 当表达式用圆括号包起来出现在字符串插值里时，它里面不能包含非转译的双引号(")和反斜线(\\)，同时也不能有回车和换行符。

### Unicode

*Unicode* 作为在不同文字系统中编码、表示和操作文本的国际标准，它使你能够以一个标准的形式表示几乎所有语言的所有字符，并从一个外部文件（text 或者 html 文件）中读写这些字符。Swift 的 `String` 和 `Character` 都是完全 Unicode 兼容的。

#### Unicode 标量

在后台，Swift 的 `String` 类型是通过 *Unicode 标量值* 构建的。一个 Unicode 标量通过一个唯一的 21 位的数字表示一个字符或修饰符。比如 `U+0061` 表示拉丁小字母 a，`U+1F425` 表示表情符号 🐥

> 注:
>
> 一个 Unicode 标量可以是 U+0000 到 U+D7FF 或者是 U+E000 到 U+10FFFF 范围内的任意数字，但是不包括他们之间的区域，即不包括 U+D800 到 U+DFFF 的数字。

注意并不是所有的21 位的 Unicode 标量都被赋予了某个字符，其中还包含了不少保留字符以便以后使用。所有的被赋予字符的标量都会有一个名称，例如小写的拉丁字符 a 或者是 正面的小鸡(FRONT-FACING BABY CHICK)这种。

#### 在字符串字面值中的特殊字符

转译的特殊字符: `\0`(空字符), `\\`(反斜线), `\t`(tab), `\n`(换行), `\r`(回车), `\"`(双引号), `\'`(单引号)

任意的 Unicode 标量，写成 `\u{n}` ，n 是任意的等于 Unicode 数值的八进制数。

下面的代码展示了四个特殊字符的例子。 `wiseWords` 变量包含了两个转译的双引号， `dollarSign`, `blackHeart`, 和 `sparklingHeart` 包含了示范了 Unicode 标量格式：

```swift
let wiseWords = "\"Imagination is more important than knowledge\" - Einstein"
// "Imagination is more important than knowledge" - Einstein
let dollarSign = "\u{24}"        // $,  Unicode scalar U+0024
let blackHeart = "\u{2665}"      // ♥,  Unicode scalar U+2665
let sparklingHeart = "\u{1F496}" // 💖, Unicode scalar U+1F496
```

#### 扩展的字形集群

Swift 中每一个 `Character` 实例表示的是一个*扩展字形集群*。一个扩展字符集是一个或多个 Unicode 标量的有序组合而成的人们可读的文字。

比如，字母 é 可以表示为单一的 Unicode 标量 é（带重音的拉丁小写字母 E, 或者 U+00E9）。然而，这个字符同样可以表示为一对标量，即标准字母 e（U+0065）和组合重音标量(COMBINING ACUTE ACCENT)（U+0301）的组合。这里，组合重音标量是以图形形式应用到了它之前的字符，使 e 在 Unicode 文字渲染系统中转为 é。

在这两种情况下，字符 é 都被作为Swift 中扩展字形集群的一个 `Character` 值。在第一种情况，这个字形集群包含一个标量，第二种情况则是两个标量。

```swift
let eAcute: Character = "\u{E9}"                         // é
let combinedEAcute: Character = "\u{65}\u{301}"          // e followed by ́
// eAcute is é, combinedEAcute is é
```

扩展的字形集群能够很灵活地表示许多复杂的脚本字符，比如韩语字母的韩语音节(Hangul syllables)能够被表示成一个预构的或分解的序列。这两种表示形式都等于一个 `Character` 值:

```swift
let precomposed: Character = "\u{D55C}"                  // 한
let decomposed: Character = "\u{1112}\u{1161}\u{11AB}"   // ᄒ, ᅡ, ᆫ
// precomposed is 한, decomposed is 한
```

可拓展的字符群集可以使组合包围记号(例如COMBINING ENCLOSING CIRCLE或者U+20DD)的标量包围其他 Unicode 标量，作为一个单一的字符：

```swift
let enclosedEAcute: Character = "\u{E9}\u{20DD}"
// enclosedEAcute is é⃝
```

地区指示符号的 Unicode 标量能够被组合成一个单一的 `Character` 值，比如 地区指示符号U (U+1F1FA) 和 地区指示符号S (U+1F1F8)的组合：

```swift
let regionalIndicatorForUS: Character = "\u{1F1FA}\u{1F1F8}"
// regionalIndicatorForUS is 🇺🇸
```

#### 计算字符数量(Swift 2 不适用)

为了取得一个字符串中字符的数量，调用全局函数 `count(_:)`，并且将字符串作为参数传入：

```swift
let unusualMenagerie = "Koala 🐨, Snail 🐌, Penguin 🐧, Dromedary 🐪"
println("unusualMenagerie has \(count(unusualMenagerie)) characters")
// prints "unusualMenagerie has 40 characters"
```

注意由于 Swift 对拓展字符群集的使用，字符串的连接或者修改不一定总是会改变字符串的长度。

比如，你用四个字符的单词 cafe 初始化了一个字符串，并且在最后添加了*组合重音(U+0301)* ，所得的字符串的字符数量仍然是四个，因为第四个字符是 é，而不是 e:

```swift
var word = "cafe"
println("the number of characters in \(word) is \(count(word))")
// prints "the number of characters in cafe is 4"

word += "\u{301}"    // COMBINING ACUTE ACCENT, U+0301

println("the number of characters in \(word) is \(count(word))")
// prints "the number of characters in café is 4"
```

> 注:
>
> 拓展字符群集可以是由一个或多个 Unicode 标量构建的。这意味着不同的字符或者是具有不同表示的相同字符可能需要不同的存储内存。
因此，在 Swift 中，一个字符串中的每个字符不会使用相同大小的内存。所以要计算字符串中字符的数量，必须要遍历整个字符串找出所有的拓展字符群集。如果你在程序中使用了非常长的字符串的话，请谨慎使用 `count(_:)` 方法。
> `count(_:)` 函数的返回值并不总是与具有相同值的 `NSString` 的 `length` 属性一致的。`NSString` 的 `length` 计算的是字符串作为 UTF-16 表示时这些 16位编码单元的数量，而不是字符串拓展字符群集的长度。为了映射这个事实，当一个NSString的length属性被一个Swift的String值访问时，实际上是调用了utf16Count。
