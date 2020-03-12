# js 的模块化随着前端技术的发展一共有以下几种方案

## 参考

[JavaScript 模块化发展](https://segmentfault.com/a/1190000015302578)

## 1. IFFE(立即执行函数表达式)

通过在每个 js 文件中，包裹一个立即执行函数，使该文件的函数执行、变量都在一个单独的词法作用域中。减少不同文件之间的影响，同时还可暴露变量，函数供全局使用。

```[js]
var fun = (function () {
  var msg = 'Hello world'
  return function temp () {
    console.log(msg)
  }
})()
```

## 2. 面向对象开发

模块文件输出内容为一个对象或者一个构造函数，可直接使用模块输出对象或实例化构造函数来使用。

```[js]
var obj = {
  msg: 'Hello world'
}
或者
var Fun = (function() {
  var f = function () {
    this.msg = 'Hello world'
  }
  f.prototype.con = function () {
    console.log(this.msg)
  }
  return f
})()
```

## 3. CommonJs

2009 年 Nodejs 发布，其中 Commonjs 是作为 Node 中模块化规范以及原生模块面世的。

### 特点

- 原生 Module 对象，每个文件都是一个 Module 实例,文件内通过 require 对象引入指定模块
- 所有文件加载均是同步完成
- 通过 module 关键字暴露内容
- 每个模块加载一次之后就会被缓存
- 模块编译本质上是沙箱编译
- 由于使用了 Node 的 api，只能在服务端环境上运行

### require()加载顺序

1. 如果 X 是内置模块，则直接返回内置模块
2. 如果 X 是一个相对路径('./')，以该相对路径加载文件  
    a. 将 X 当成文件，依次查找下面文件，只要其中有一个存在，就返回该文件，不再继续执行。  
    `X、 X.js、X.json、X.node`  
    b. 将 X 当成目录，依次查找下面文件，只要其中有一个存在，就返回该文件，不再继续执行。  
   `X/package.json（main 字段）、X/index.js、X/index.json、X/index.node`
3. 如果 X 不带路径  
   a. 根据 X 所在的父模块，确定 X 可能的安装目录。
   b. 依次在每个目录中，将 X 当成文件名或目录名加载。
4. not Found

### 使用

```[js]
a.js
module.exports = {
  msg: 'Hello world',
  con: function() {
    console.log(this.msg)
  }
}
b.js
var a = require('./a')
a.con()
```

## 4. AMD(Async Modules Definition)

Commonjs 的诞生给 js 模块化发展有了重要的启发，Commonjs 非常受欢迎，但是局限性很明显：Commonjs 基于 Node 原生 api 在服务端可以实现模块同步加载，但是仅仅局限于服务端，客户端如果同步加载依赖的话时间消耗非常大，所以需要一个在客户端上基于 Commonjs 但是对于加载模块做改进的方案，于是 AMD 规范诞生了。

### AMD 特点

1. 异步加载：AMD 规范采用异步方式加载模块，模块的加载不影响它后面语句的运行。所有依赖这个模块的语句，都定义在一个回调函数中，等到所有依赖加载完成之后（前置依赖），这个回调函数才会运行。

### RequireJS

AMD 方案的代表实现者是 RequireJS，通过 define 方法定义模块，通过 require 方法加载模块。

#### RequireJS 特点

- 依赖前置：动态创建 script 标签引入依赖，在 script 标签的 onload 事件监听文件加载完毕；一个模块的回调函数必须得等到所有依赖都加载完毕之后，才可执行，类似 Promise.all。
- 配置文件：有一个 main 文件，配置不同模块的路径，以及 shim 不满足 AMD 规范的 js 文件。

#### 优点

- 动态并行加载 js，依赖前置，无需再考虑 js 加载顺序问题。
- 核心还是注入变量的沙箱编译，解决模块化问题。
- 规范化输入输出，使用起来方便。
- 对于不满足 AMD 规范的文件可以很好地兼容。

## 5. CMD

同样是受到 Commonjs 的启发，国内（阿里）诞生了一个 CMD（Common Module Definition）规范。该规范借鉴了 Commonjs 的规范与 AMD 规范，在两者基础上做了改进。

### CMD 规范特点

- 依赖就近：不同于 AMD 的依赖前置，CMD 推崇依赖就近（需要的时候再加载）
- 推崇 api 功能单一，一个模块干一件事。

### SeaJs

需要配置模块对应的 url。
入口文件执行之后，根据文件内的依赖关系整理出依赖树，然后通过插入 script 标签加载依赖。

## 6. ES6 中的模块化

之前的各种方法和框架，都出自于各个大公司或者社区，都是民间出台的结局方法。到了 2015 年，ES6 规范中，终于将模块化纳入 JavaScript 标准，从此 js 模块化被官方扶正，也是未来 js 的标准。
