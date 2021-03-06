# parseInt

parseInt(string, radix), 将字符串 string 使用 radix 进制来解析成一个十进制整数或者 NaN， radix 为介于 2-36 之间的数

注意：

1. radix 在 ECMAScript5 中规定，不传或者传 0 都默认为 10，而实际上有一些浏览器并没有遵循这个规则，所以 mdn 官方文档推荐不管任何情况，都必传 radix，以免出现异常。
2. 字符串为'0x'开头，会默认指定 radix 为 16，此时传入除 16 外其他数字输出都为 0

```[js]
例子：
// 无法解析为数字的字符串都会返回NaN
Number.parseInt('Hello', 10) => NaN

// 这个例子中，由于radix指定了5，即采用5进制来解析字符串，而字符串中出现了5.于是结果为NaN;
Number.parseInt('50', 5) => NaN

// 字符串中指定了16进制，又传入了15作为解析基数，输出为0
Number.parseInt('0x16', 15) => 0

// 正常情况
Number.parseInt('10', 2) => 2
Number.parseInt('10', 3) => 3
```
