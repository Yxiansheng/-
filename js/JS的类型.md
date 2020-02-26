# JS的类型

JavaScript 是一种弱类型或者说动态语言。最新的 ECMAScript 标准定义了 8 种数据类型:

## 原始值( primitive values )

我们称原始类型的值为“原始值”，在JavaScript中，原始值是不可变的，如JavaScript 中对字符串的操作一定返回了一个新字符串，原始字符串并没有被改变。

```[js]
7 种原始类型: Boolean、Null、Undefined、Number、BigInt、String、Symbol
1 种引用类型 Object
```

### 1. Boolean

布尔类型表示一个逻辑实体，可以有两个值：true 和 false。

### 2. Null

Null类型只有一个值： null，null 是一个字面量，不像 undefined，它不是全局对象的一个属性。null 是表示缺少的标识，指示变量未指向任何对象。

### 3. Undefined

Undefined类型只有一个值：undefined, 它会自动分配给已声明且尚未赋值的变量和没有传入实际参数的形参
```undefined还是全局变量的属性之一，其值就是undefined，我们常用其来判断一个变量是否为undefined：if (x === undefined)```

### 4. Number

在ECMAScript 10 前，JavaScript中只有一种数字类型：基于 IEEE 754 标准的双精度 64位二进制格式的值（-(2^53 -1) 到 2^53 -1）。Number类型除了能够表示浮点数外，还有一些带符号的值：+Infinity，-Infinity 和 NaN (非数值，Not-a-Number)。

要检查值是否大于或小于 +/-Infinity，你可以使用常量 Number.MAX_VALUE 和 Number.MIN_VALUE。另外在 ECMAScript 6 中，你也可以通过 Number.isSafeInteger() 方法还有 Number.MAX_SAFE_INTEGER 和 Number.MIN_SAFE_INTEGER 来检查值是否在双精度浮点数的取值范围内

数字类型中只有一个整数有两种表示方法： 0 可表示为 -0 和 +0（"0" 是 +0 的简写）。 在实践中，这也几乎没有影响。 例如 +0 === -0 为真。 但是，你可能要注意除以0的时候：

```[js]
42 / +0; // Infinity
42 / -0; // -Infinity
```

### 5. BigInt(ES10)

在ES10后，JavaScript中新增了BigInt类型，可以用任意精度表示整数。使用 BigInt，您可以安全地存储和操作大整数，甚至可以超过数字的安全整数限制。BigInt是通过在整数末尾附加 n 或调用构造函数来创建的。

通过使用常量Number.MAX_SAFE_INTEGER，您可以获得可以用数字递增的最安全的值。通过引入 BigInt，您可以操作超过Number.MAX_SAFE_INTEGER的数字。您可以在下面的示例中观察到这一点，其中递增Number.MAX_SAFE_INTEGER会返回预期的结果:

在将BigInt转换为Boolean时，它的行为类似于一个数字：if、||、&&、Boolean 和!。

BigInt类型需要注意的点：

1. 不能用于 Math 对象中的方法；
2. 不能和任何 Number 实例混合运算，两者必须转换成同一种类型。
3. BigInt类型与Number类型转换时要小心，因为 BigInt 变量在转换成 Number 变量时可能会丢失精度

### 6. String

JavaScript的字符串类型用于表示文本数据，在JavaScript中字符串是不可更改的。这意味着字符串一旦被创建，就不能被修改。

### 7. Symbols(ES6)

symbol 是一种基本数据类型 （primitive data type）。Symbol()函数会返回symbol类型的值，该类型具有静态属性和静态方法。它的静态属性会暴露几个内建的成员对象；它的静态方法会暴露全局的symbol注册，且类似于内建对象类，但作为构造函数来说它并不完整，因为它不支持语法："new Symbol()"。

每个从Symbol()返回的symbol值都是唯一的。一个symbol值能作为对象属性的标识符；这是该数据类型仅有的目的。

## 引用类型

### Object

在 Javascript 里，对象可以被看作是一组属性的集合。用对象字面量语法来定义一个对象时，会自动初始化一组属性。（也就是说，你定义一个var a = "Hello"，那么a本身就会有a.substring这个方法，以及a.length这个属性，以及其它；如果你定义了一个对象，var a = {}，那么a就会自动有a.hasOwnProperty及a.constructor等属性和方法。）而后，这些属性还可以被增减。属性的值可以是任意类型，包括具有复杂数据结构的对象。属性使用键来标识，它的键值可以是一个字符串或者符号值（Symbol）。
