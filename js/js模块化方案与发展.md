## js 的模块化随着前端技术的发展一共有以下几种方案

### 参考

[https://segmentfault.com/a/1190000015302578](https://segmentfault.com/a/1190000015302578)

### 1. IFFE(立即执行函数表达式)

#### 原理：

通过在每个 js 文件中，包裹一个立即执行函数，使该文件的函数执行、变量都在一个单独的词法作用域中。减少不同文件之间的影响，同时还可暴露变量，函数供全局使用。

```
a.js
var a = (function () {
  var temp = 'aaa'
})()

b.js
var b = (function () {
  return function temp () {
    console.log('hello world')
  }
})()
```

#### 使用方式：

通过 script 标签进行引入，不过各个模块的依赖关系仍然要通过加装 script 的顺序来保证。

```
<script src="a.js"></script>
```

2. 面向对象开发
   一开始一些人在闭包的解决方案上做出了规范约束：每个 js 文件始终返回一个 object，将内容作为 object 的属性。

比如上面的例子中 b.js

// b.js
var b = (function(a){
var bStr = a.aStr + ' bb';

return {
bStr: bStr
};
})(a);
及时返回的是个值，也要用 object 包裹。后来很多人开始使用面向对象的方式开发插件：

;(function($){
    var LightBox = function(){
        // ...
    };
    
    LightBox.prototype = {
        // ....
    };
    
    window['LightBox'] = LightBox;
})($);
使用的时候：

var lightbox = new LightBox();
当年很多人都喜欢这样开发插件，并且认为能写出这种插件的水平至少不低。这种方法只是闭包方式的小改进，约束 js 文件返回必须是对象，对象其实就是一些个方法和属性的集合。这样的优点：

规范化输出，更加统一的便于相互依赖和引用。
使用‘类’的方式开发，便于后面的依赖进行扩展。
本质上这种方法只是对闭包方法的规范约束，并没有做什么根本改动。

3. YUI
   早期雅虎出品的一个工具，模块化管理只是一部分，其还具有 JS 压缩、混淆、请求合并（合并资源需要 server 端配合）等性能优化的工具，说其是现有 JS 模块化的鼻祖一点都不过分。

// YUI - 编写模块
YUI.add('dom', function(Y) {
Y.DOM = { ... }
})

// YUI - 使用模块
YUI().use('dom', function(Y) {
Y.DOM.doSomeThing();
// use some methods DOM attach to Y
})

// hello.js
YUI.add('hello', function(Y){
Y.sayHello = function(msg){
Y.DOM.set(el, 'innerHTML', 'Hello!');
}
},'3.0.0',{
requires:['dom']
})

// main.js
YUI().use('hello', function(Y){
Y.sayHello("hey yui loader");
})
YUI 的出现令人眼前一新，他提供了一种模块管理方式：通过 YUI 全局对象去管理不同模块，所有模块都只是对象上的不同属性，相当于是不同程序运行在操作系统上。YUI 的核心实现就是闭包，不过好景不长，具有里程碑式意义的模块化工具诞生了。

4. CommonJs
   2009 年 Nodejs 发布，其中 Commonjs 是作为 Node 中模块化规范以及原生模块面世的。Node 中提出的 Commonjs 规范具有以下特点：

原生 Module 对象，每个文件都是一个 Module 实例
文件内通过 require 对象引入指定模块
所有文件加载均是同步完成
通过 module 关键字暴露内容
每个模块加载一次之后就会被缓存
模块编译本质上是沙箱编译
由于使用了 Node 的 api，只能在服务端环境上运行
基本上 Commonjs 发布之后，就成了 Node 里面标准的模块化管理工具。同时 Node 还推出了 npm 包管理工具，npm 平台上的包均满足 Commonjs 规范，随着 Node 与 npm 的发展，Commonjs 影响力也越来越大，并且促进了后面模块化工具的发展，具有里程碑意义的模块化工具。之前的例子我们这样改写：

a.js

// a.js
var c = require('./c');

module.exports = {
aStr: 'aa',
aNum: c.cNum + 1
};
b.js

// b.js
var a = require('./a');

exports.bStr = a.aStr + ' bb';
c.js

// c.js
exports.cNum = 0;
入口文件就是 index.js

var a = require('./a');
var b = require('./b');

console.log(a.aNum, b.bStr);
可以直观的看到，使用 Commonjs 管理模块，十分方便。Commonjs 优点在于：

强大的查找模块功能，开发十分方便
标准化的输入输出，非常统一
每个文件引入自己的依赖，最终形成文件依赖树
模块缓存机制，提高编译效率
利用 node 实现文件同步读取
依靠注入变量的沙箱编译实现模块化
这里补充一点沙箱编译：require 进来的 js 模块会被 Module 模块注入一些变量，使用立即执行函数编译，看起来就好像：

(function (exports, require, module, **filename, **dirname) {
//原始文件内容
})();
看起来 require 和 module 好像是全局对象，其实只是闭包中的入参，并不是真正的全局对象。之前专门整理探究过 Node 中的 Module 源码分析，也可以看看阮一峰老师的 require()源码解读，或者廖雪峰老师的 CommonJS 规范。

5. AMD
   Commonjs 的诞生给 js 模块化发展有了重要的启发，Commonjs 非常受欢迎，但是局限性很明显：Commonjs 基于 Node 原生 api 在服务端可以实现模块同步加载，但是仅仅局限于服务端，客户端如果同步加载依赖的话时间消耗非常大，所以需要一个在客户端上基于 Commonjs 但是对于加载模块做改进的方案，于是 AMD 规范诞生了。

AMD 是"Asynchronous Module Definition"的缩写，意思就是"异步模块定义"。它采用异步方式加载模块，模块的加载不影响它后面语句的运行。所有依赖这个模块的语句，都定义在一个回调函数中，等到所有依赖加载完成之后（前置依赖），这个回调函数才会运行。

AMD 规范
AMD 与 Commonjs 一样都是 js 模块化规范，是一套抽象的约束，与 2009 年诞生。文档这里。该约束规定采用 require 语句加载模块，但是不同于 CommonJS，它要求两个参数：该方案的代表实现者是 RequireJS，通过 define 方法定义模块，通过 require 方法加载模块。

require([module], callback);
第一个参数[module]，是一个数组，里面的成员就是要加载的模块；第二个参数 callback，则是加载成功之后的回调函数。如果将前面的代码改写成 AMD 形式，就是下面这样：

require(['math'], function (math) {

    math.add(2, 3);

});
定义了一个文件，该文件依赖 math 模块，当 math 模块加载完毕之后执行回调函数，这里并没有暴露任何变量。不同于 Commonjs，在定义模块的时候需要使用 define 函数定义：

define(id?, dependencies?, factory);
define 方法与 require 类似，id 是定义模块的名字，仍然会在所有依赖加载完毕之后执行 factory。

RequireJs 有两个最鲜明的特点：

依赖前置：动态创建<script>引入依赖，在<script>标签的 onload 事件监听文件加载完毕；一个模块的回调函数必须得等到所有依赖都加载完毕之后，才可执行，类似 Promise.all。
配置文件：有一个 main 文件，配置不同模块的路径，以及 shim 不满足 AMD 规范的 js 文件。
还是上面那个例子：

配置文件 main.js

requirejs.config({
shim: {
// ...
},
paths: {
a: '/a.js',
b: '/b.js',
c: '/c.js',
index: '/index.js'
}
});

require(['index'], function(index){
index();
});
a.js

define('a', ['c'], function(c){
return {
aStr: 'aa',
aNum: c.cNum + 1
}
});
b.js

define('b', ['a'], function(a){
return {
bStr = a.aStr + ' bb';
}
});
c.js

define('c', function(){
return {
cNum: 0
}
});
index.js

define('index', ['a', 'b'], function(a, b){
return function(){
console.log(a.aNum, b.bStr);
}
});
页面中嵌入

<script src="/require.js" data-main="/main" async="async" defer></script>

RequireJs 当年在国内非常受欢迎，主要是以下优点：

动态并行加载 js，依赖前置，无需再考虑 js 加载顺序问题。
核心还是注入变量的沙箱编译，解决模块化问题。
规范化输入输出，使用起来方便。
对于不满足 AMD 规范的文件可以很好地兼容。
不过个人觉得 RequireJs 配置还是挺麻烦的，但是当年已经非常方便了。

6. CMD 和 SeaJs
   CMD 规范
   同样是受到 Commonjs 的启发，国内（阿里）诞生了一个 CMD（Common Module Definition）规范。该规范借鉴了 Commonjs 的规范与 AMD 规范，在两者基础上做了改进。

define(id?, dependencies?, factory);
与 AMD 相比非常类似，CMD 规范（2011）具有以下特点：

define 定义模块，require 加载模块，exports 暴露变量。
不同于 AMD 的依赖前置，CMD 推崇依赖就近（需要的时候再加载）
推崇 api 功能单一，一个模块干一件事。
SeaJs
SeaJs 是 CMD 规范的实现，跟 RequireJs 类似，CMD 也是 SeaJs 推广过程中诞生的规范。CMD 借鉴了很多 AMD 和 Commonjs 优点，同样 SeaJs 也对 AMD 和 Commonjs 做出了很多兼容。

SeaJs 核心特点：

需要配置模块对应的 url。
入口文件执行之后，根据文件内的依赖关系整理出依赖树，然后通过插入<script>标签加载依赖。
依赖加载完毕之后，执行根 factory。
在 factory 中遇到 require，则去执行对应模块的 factory，实现就近依赖。
类似 Commonjs，对所有模块进行缓存（模块的 url 就是 id）。
类似 Commonjs，可以使用相对路径加载模块。
可以向 RequireJs 一样前置依赖，但是推崇就近依赖。
exports 和 return 都可以暴露变量。
修改下上面那个例子：

a.js

console.log('a1');
define(function(require,exports,module){
console.log('inner a1');
require('./c.js')
});
console.log('a2')
b.js

console.log('b1');
define(function(require,exports,module){
console.log('inner b1');
});
console.log('b2')
c.js

console.log('c1');
define(function(require,exports,module){
console.log('inner c1');
});
console.log('c2')
页面引入

<body>
    <script src="/sea.js"></script>
    <script>
    seajs.use(['./a.js','./b.js'],function(a,b){
        console.log('index1');
    })    
    </script>
</body>
对于seaJs中的就近依赖，有必要单独说一下。来看一下上面例子中的log顺序：

seaJs 执行入口文件，入口文件依赖 a 和 b，a 内部则依赖 c。
依赖关系梳理完毕，开始动态 script 标签下载依赖，控制台输出：

a1
a2
b1
b2
c1
c2
依赖加载之后，按照依赖顺序开始解析模块内部的 define：inner a1
在 a 模块中遇到了 require('./c')，就近依赖这时候才去执行 c 模块的 factory：inner c1
然后解析 b 模块：inner b1
全部依赖加载完毕，执行最后的 factory：index
完整的顺序就是：

a1
a2
b1
b2
c1
c2
inner a1
inner c1
inner b1
index
这是一个可以很好理解 SeaJs 的例子。

7. ES6 中的模块化
   之前的各种方法和框架，都出自于各个大公司或者社区，都是民间出台的结局方法。到了 2015 年，ES6 规范中，终于将模块化纳入 JavaScript 标准，从此 js 模块化被官方扶正，也是未来 js 的标准。

之前那个例子再用 ES6 的方式实现一次：

a.js

import {cNum} from './c';

export default {
aStr: 'aa',
aNum: cNum + 1
};
b.js

import {aStr} from './a';

export const bStr = aStr + ' bb';
c.js

export const bNum = 0;
index.js

import {aNum} from './a';
import {bStr} from './b';

console.log(aNum, bStr);
可以看到，ES6 中的模块化在 Commonjs 的基础上有所不同，增加了关键字 import，export，default，as，from，而不是全局对象。另外深入理解的话，有两点主要的区别：

CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
一个经典的例子：

// counter.js
exports.count = 0
setTimeout(function () {
console.log('increase count to', ++exports.count, 'in counter.js after 500ms')
}, 500)

// commonjs.js
const {count} = require('./counter')
setTimeout(function () {
console.log('read count after 1000ms in commonjs is', count)
}, 1000)

//es6.js
import {count} from './counter'
setTimeout(function () {
console.log('read count after 1000ms in es6 is', count)
}, 1000)
分别运行 commonjs.js 和 es6.js：

➜ test node commonjs.js
increase count to 1 in counter.js after 500ms
read count after 1000ms in commonjs is 0
➜ test babel-node es6.js
increase count to 1 in counter.js after 500ms
read count after 1000ms in es6 is 1
这个例子解释了 CommonJS 模块输出的是值的拷贝，也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。ES6 模块的运行机制与 CommonJS 不一样。JS 引擎对脚本静态分析的时候，遇到模块加载命令 import，就会生成一个只读引用。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。换句话说，ES6 的 import 有点像 Unix 系统的“符号连接”，原始值变了，import 加载的值也会跟着变。因此，ES6 模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。
