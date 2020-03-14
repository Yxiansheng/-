# JS 的类型

JavaScript 是一种弱类型或者说动态语言。最新的 ECMAScript 标准定义了 8 种数据类型:

## 原始值( primitive values )

我们称原始类型的值为“原始值”，在 JavaScript 中，原始值是不可变的，如 JavaScript 中对字符串的操作一定返回了一个新字符串，原始字符串并没有被改变。

```[js]
7 种原始类型: Boolean、Null、Undefined、Number、BigInt、String、Symbol
1 种引用类型 Object
```

### 1. Boolean

布尔类型表示一个逻辑实体，可以有两个值：true 和 false。

### 2. Null

Null 类型只有一个值： null，null 是一个字面量，不像 undefined，它不是全局对象的一个属性。null 是表示缺少的标识，指示变量未指向任何对象。

### 3. Undefined

Undefined 类型只有一个值：undefined, 它会自动分配给已声明且尚未赋值的变量和没有传入实际参数的形参
`undefined还是全局变量的属性之一，其值就是undefined，我们常用其来判断一个变量是否为undefined：if (x === undefined)`

### 4. Number

在 ECMAScript 10 前，JavaScript 中只有一种数字类型：基于 IEEE 754 标准的双精度 64 位二进制格式的值（-(2^53 -1) 到 2^53 -1）。Number 类型除了能够表示浮点数外，还有一些带符号的值：+Infinity，-Infinity 和 NaN (非数值，Not-a-Number)。

要检查值是否大于或小于 +/-Infinity，你可以使用常量 Number.MAX_VALUE 和 Number.MIN_VALUE。另外在 ECMAScript 6 中，你也可以通过 Number.isSafeInteger() 方法还有 Number.MAX_SAFE_INTEGER 和 Number.MIN_SAFE_INTEGER 来检查值是否在双精度浮点数的取值范围内

数字类型中只有一个整数有两种表示方法： 0 可表示为 -0 和 +0（"0" 是 +0 的简写）。 在实践中，这也几乎没有影响。 例如 +0 === -0 为真。 但是，你可能要注意除以 0 的时候：

```[js]
42 / +0; // Infinity
42 / -0; // -Infinity
```

### 5. BigInt(ES10)

在 ES10 后，JavaScript 中新增了 BigInt 类型，可以用任意精度表示整数。使用 BigInt，您可以安全地存储和操作大整数，甚至可以超过数字的安全整数限制。BigInt 是通过在整数末尾附加 n 或调用构造函数来创建的。

通过使用常量 Number.MAX_SAFE_INTEGER，您可以获得可以用数字递增的最安全的值。通过引入 BigInt，您可以操作超过 Number.MAX_SAFE_INTEGER 的数字。您可以在下面的示例中观察到这一点，其中递增 Number.MAX_SAFE_INTEGER 会返回预期的结果:

在将 BigInt 转换为 Boolean 时，它的行为类似于一个数字：if、||、&&、Boolean 和!。

BigInt 类型需要注意的点：

1. 不能用于 Math 对象中的方法；
2. 不能和任何 Number 实例混合运算，两者必须转换成同一种类型。
3. BigInt 类型与 Number 类型转换时要小心，因为 BigInt 变量在转换成 Number 变量时可能会丢失精度

### 6. String

JavaScript 的字符串类型用于表示文本数据，在 JavaScript 中字符串是不可更改的。这意味着字符串一旦被创建，就不能被修改。

### 7. Symbols(ES6)

symbol 是一种基本数据类型 （primitive data type）。Symbol()函数会返回 symbol 类型的值，该类型具有静态属性和静态方法。它的静态属性会暴露几个内建的成员对象；它的静态方法会暴露全局的 symbol 注册，且类似于内建对象类，但作为构造函数来说它并不完整，因为它不支持语法："new Symbol()"。

每个从 Symbol()返回的 symbol 值都是唯一的。一个 symbol 值能作为对象属性的标识符；这是该数据类型仅有的目的。

## 引用类型

### Object

在 Javascript 里，对象可以被看作是一组属性的集合。用对象字面量语法来定义一个对象时，会自动初始化一组属性。（也就是说，你定义一个 var a = "Hello"，那么 a 本身就会有 a.substring 这个方法，以及 a.length 这个属性，以及其它；如果你定义了一个对象，var a = {}，那么 a 就会自动有 a.hasOwnProperty 及 a.constructor 等属性和方法。）而后，这些属性还可以被增减。属性的值可以是任意类型，包括具有复杂数据结构的对象。属性使用键来标识，它的键值可以是一个字符串或者符号值（Symbol）。

---

## “==”运算符的隐式类型转换规则

- 如果两值的类型相同，则直接全等比较两个值
- 如果一个值是 null，另一个值是 undefined，则它们相等
- 如果一个值是数字，另一个值是字符串，先将字符串转换为数学，然后使用转换后的值进行比较。
- 如果其中一个操作数为布尔类型，那么布尔操作数如果为 true，那么会转换为 1，如果为 false，会转换为整数 0，即 0。
- 如果一个对象与数字或字符串相比较，JavaScript 会尝试返回对象的默认值。操作符会尝试通过方法 valueOf 和 toString 将对象转换为其原始值（一个字符串或数字类型的值）。如果尝试转换失败，会产生一个运行时错误。

---

## valueOf()与 toString()

所有的对象继承了 Object.prototype 的两个转换方法：

- toString(): 返回一个反映这个对象的字符串, "[object ObjectName]"
- valueOf(): 返回传入值相应的原始值;

一些内置对象重写了这两个方法
对象 | valueOf | toString  
-|-|-
Number | 数字值 | 返回数值的字符串表示。还可返回以指定进制表示的字符串 |
String | 字符串值 | 返回 String 对象的值 |
Boolean | 布尔值 | "true"/"false" |
Array | 数组本身 | 将 Array 的每个元素转换为字符串，并将它们依次连接起来，两个元素之间用英文逗号作为分隔符进行拼接
Date | 存储的时间是从 1970 年 1 月 1 日午夜开始计的毫秒数 UTC | 返回日期的文本表示("Wed Oct 09 2019 08:00:00 GMT+0800 (中国标准时间)")。
Function | 函数本身 | 返回如下格式的字符串，其中 functionname 是一个函数的名称，此函数的 toString 方法被调用： "function functionname() { [native code] }"
