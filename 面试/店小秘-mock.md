# 店小秘-mock

## 常见块级元素和行内元素，区别是啥，怎么互相转换

- 块级元素：
  - 特性：独占一行（默认宽度为父元素 100%）；可通过width/height设置宽高；margin/padding上下左右都有效；可包含块级元素和行内元素（部分例外如p标签不能包含块级元素）。
  - 常见元素：div、p、h1-h6、ul、ol、li、dl、dt、dd、form、header、footer等。
- 行内元素（内联元素）：
  - 特性：不独占一行，相邻元素在同一行显示；默认宽高由内容决定，width/height设置无效；margin/padding仅左右有效，上下无效；只能包含行内元素或文本（部分例外如a标签可包含块级元素）。
  - 常见元素：span、a、strong、em、i、b、label等。
- 特殊类型：行内块元素（inline-block）：
  - 兼具两者特性：不独占一行；可设置width/height；margin/padding全有效。
  - 常见元素：img、input、button、select等。
- 转换方式：
通过display属性切换：
块级 → 行内：display: inline
行内 → 块级：display: block
转为行内块：display: inline-block

## 数组去重有哪些方法

```[js]
/**
 * Set + 数组构造（最简洁，推荐基本类型数组）
 * 优点：简洁高效（O(n)）；缺点：无法去重对象数组（如 [{a:1}, {a:1}] 视为不同）
 */
function unique1(arr) {
  return [...new Set(arr)]; // 或 Array.from(new Set(arr))
}
```

```[js]
/**
 * filter + indexOf（基本类型数组）
 * 原理：保留首次出现的元素（indexOf返回第一个匹配索引）；缺点：O(n²)复杂度，不适合大数据
 */
function unique2 (arr) {
  return arr.filter((item, index) => arr.indexOf(item) === index);
}
```

```[js]
/**
 * 对象键值对（支持基本类型和部分对象，需处理类型差异）
 * 优点：可去重简单对象数组；缺点：复杂对象（含函数、循环引用）无法序列化
 */
function unique3 (arr) {
  const obj = {};
  return arr.filter(item => {
    // 用 JSON.stringify 处理对象，避免类型混淆（如 1 和 '1'）
    const key = typeof item + JSON.stringify(item);
    if (!obj[key]) {
      obj[key] = true;
      return true;
    }
    return false;
  });
}
```

```[js]
/**
 * reduce + 数组（兼容性好）
 * 原理：累计器中不存在则添加；缺点：O(n²)复杂度
 */
function unique4 (arr) {
  return arr.reduce((acc, item) => {
    if (!acc.includes(item)) acc.push(item);
    return acc;
  }, []);
}
```

## 这一个正则，校验邮箱

```[js]
const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
```

## 手写节流函数

```[js]
function throttle(fn, wait, options = {}) {
  let timer = null;
  let lastTime = 0; // 上次执行时间
  const { leading = true, trailing = true } = options; 
  // leading：是否允许首次立即执行；trailing：是否允许末次延迟执行

  return function(...args) {
    const now = Date.now();
    
    // 若不允许首次执行，且是第一次触发，更新lastTime
    if (!leading && !lastTime) {
      lastTime = now;
    }

    const remaining = wait - (now - lastTime); // 剩余时间
    if (remaining <= 0) {
      // 时间到，执行函数
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      fn.apply(this, args);
      lastTime = now;
    } else if (trailing && !timer) {
      // 时间未到，设置定时器执行末次调用
      timer = setTimeout(() => {
        fn.apply(this, args);
        lastTime = leading ? Date.now() : 0; // 重置lastTime
        timer = null;
      }, remaining);
    }
  };
}
```

## 有一个函数，接受了一个参数，根据参数的不同用if 和if else分别来返回不同的结果，根据设计模式来简化时间复杂度

```[js]
// 策略对象：条件 → 处理逻辑的映射
const strategies = {
  'a': () => 1,
  'b': () => 2,
  // 可扩展更多条件
  'default': () => 0
};

// 缓存结果（闭包保存缓存）
function cachedFn(condition) {
  const cache = {}; // 缓存结果，避免重复计算
  if (cache[condition] !== undefined) {
    return cache[condition];
  }
  // 从策略对象获取逻辑，默认走default
  const result = strategies[condition] ? strategies[condition]() : strategies.default();
  cache[condition] = result; // 缓存结果
  return result;
}
```

## 说一下js原型链，原型链最顶端是什么

原型链概念：
JS 中，每个对象都有__proto__（隐式原型），每个函数都有prototype（显式原型）。对象的__proto__指向其构造函数的prototype，通过这种链式引用形成原型链，用于实现属性和方法的继承。
原型链结构：
实例对象 → __proto__ → 构造函数.prototype → __proto__ → 父构造函数.prototype → ... → 顶端
例：const arr = [] → arr.__proto__ === Array.prototype → Array.prototype.__proto__ === Object.prototype → Object.prototype.__proto__ === null
原型链顶端：
原型链的顶端是Object.prototype，而Object.prototype.__proto__ === null（null表示没有原型，是原型链的终点）。

## 平时工作中用到哪些原型上的属性或者api，怎么判断该属性是实例的还是原型对象上的

- 常见原型上的 API：

```[js]
Object.prototype：toString()、valueOf()、hasOwnProperty()、isPrototypeOf()等。
Array.prototype：push()、pop()、map()、filter()等。
Function.prototype：apply()、call()、bind()等。
```

- 判断属性归属：
  - 实例自身属性：obj.hasOwnProperty('prop') → 返回true表示是实例自身属性，false可能是原型属性或不存在。
  - 原型属性：'prop' in obj && !obj.hasOwnProperty('prop') → 存在于原型链中但非实例自身。

## 说一下浏览器事件循环，哪些是宏任务，微任务有哪些，js为什么要用这种执行机制，vue中更新dom是同步还是异步的

- 事件循环（Event Loop）：

JS 是单线程，通过事件循环实现非阻塞。流程：

1. 执行同步代码（进入调用栈）。
2. 同步代码执行完，清空所有微任务（优先级高于宏任务）。
3. 执行一个宏任务，然后重复清空微任务，循环往复。

- 宏任务（Macrotask）：

优先级较低，包括：script（整体代码）、setTimeout、setInterval、I/O（文件 / 网络操作）、UI渲染、requestAnimationFrame等。

- 微任务（Microtask）：
优先级较高，包括：Promise.then/catch/finally、async/await（本质是 Promise）、queueMicrotask()、MutationObserver（DOM 变化监听）等。

- JS 使用事件循环的原因：
单线程模型下，避免因耗时操作（如网络请求）阻塞主线程，通过异步任务队列实现非阻塞，保证 UI 渲染和交互响应。

- Vue DOM 更新：
是异步的。Vue 通过 “队列” 收集数据更新触发的 DOM 操作，在本轮事件循环的微任务阶段批量执行（避免频繁 DOM 操作导致性能问题）。可通过this.$nextTick(cb)获取更新后的 DOM（cb在 DOM 更新后执行）。

## 浏览器有哪些缓存机制，怎么设置缓存时间有效期

浏览器缓存分强缓存和协商缓存，优先级：强缓存 > 协商缓存。

- 强缓存：客户端直接从缓存读取，不发送请求到服务器。

  1. 控制字段（HTTP1.1）：Cache-Control（优先级高于Expires）

  ```[js]
    max-age=3600：缓存 3600 秒（从请求时间开始计算）。
    no-cache：不使用强缓存，需走协商缓存。
    no-store：完全不缓存。
  ```
  
  2. 控制字段（HTTP1.0）：Expires（绝对时间，如Expires: Wed, 20 Aug 2025 12:00:00 GMT），易受本地时间影响，已被Cache-Control替代。

- 协商缓存：客户端发送请求到服务器，由服务器判断是否使用缓存（返回 304 则用缓存，200 则更新缓存）。
  1. Last-Modified（服务器返回资源最后修改时间） + If-Modified-Since（客户端请求时携带，对比是否修改）。
  2. ETag（服务器返回资源唯一标识，如哈希值） + If-None-Match（客户端请求时携带，对比标识是否变化）。

优先级：ETag > Last-Modified（解决文件内容未变但修改时间变的问题）。

## 有哪些本地缓存api，分别用来存哪些数据，有什么区别吗

1. cookie, 用来存放需要传递给服务端的数据
2. localStorage, 用来存放需要永久保留到本地的数据
3. sessionStorage，用来存放需要在当前 tab 下使用，且 tab 页关闭即清除的数据
4. indexedDB，js 本地数据库，需要存放大量结构化数据（如离线数据库）时使用

## 说一下浏览器垃圾回收机制

垃圾回收（GC）：自动释放不再使用的内存（无引用的对象）。主流算法：

- 标记 - 清除算法（Mark and Sweep）：  
  标记：从根对象（如window）出发，遍历所有可达对象（被引用的对象），标记为 “活跃”。  
  清除：未被标记的对象视为垃圾，释放其内存。  
  缺点：清除后内存碎片化。
- 标记 - 整理算法（Mark and Compact）：  
  标记阶段同标记 - 清除。
  整理：将活跃对象向内存一端移动，集中释放另一端的内存，解决碎片化问题（主要用于老生代）。
- 分代回收（Generational Collection）：  
  基于 “大部分对象存活时间短” 的假设，将内存分为：  
    新生代（Young Generation）：存放新创建的对象，用Scavenge 算法（复制存活对象到新空间，释放旧空间，高效但空间开销大）。  
    老生代（Old Generation）：存放存活久的对象（多次回收未被释放），用标记 - 清除 + 标记 - 整理算法。
- 工作原理：  
浏览器定期执行 GC，暂停 JS 执行（“GC 停顿”），现代浏览器通过增量标记、并发回收等优化减少停顿时间。

## 哪些操作会造成内存泄露问题，怎么避免

内存泄露：不再使用的内存未被释放，导致内存占用持续升高。

常见场景及避免：

1. 意外全局变量：未声明的变量（如a = 1）会挂在window上，长期占用内存。  
  避免：使用let/const声明变量，避免未声明赋值。
2. 未清除的事件监听：如window.addEventListener('scroll', fn)，组件销毁后未移除，导致监听函数及关联对象无法回收。
避免：组件卸载时用removeEventListener移除，或使用框架的自动解绑（如 Vue 的@scroll在组件销毁时自动移除）。
3. 未清除的定时器 / 计时器：setInterval(fn, 1000)在不需要时未用clearInterval清除，导致回调函数持续执行。  
避免：组件销毁或任务完成后及时清除。
4. 闭包引用：闭包长期持有父作用域的变量（如缓存数据未清理）。  
避免：不需要时手动释放引用（如parentVar = null）。
5. DOM 引用未释放：删除 DOM 节点后，仍保留其引用（如const el = document.getElementById('box'); document.body.removeChild(el);但el仍被引用）。  
避免：删除 DOM 后，将引用设为null（el = null）。
6. 第三方库 / 插件：不当使用可能导致内存泄露（如未销毁的实例）。
避免：按文档正确销毁实例（如echarts.dispose(chart)）。

## web安全方面了解过吗，有哪些攻击方式，怎么避免

- XSS（跨站脚本攻击）：
攻击者注入恶意脚本（JS、HTML 等），在用户浏览器执行（窃取 cookie、篡改页面等）。  
  - 类型：
    - 存储型：恶意脚本存入服务器（如评论区），所有访问者加载时执行。
    - 反射型：恶意脚本通过 URL 参数传入，服务器直接返回给客户端执行。
    - DOM 型：恶意脚本修改页面 DOM（不经过服务器）。  
  - 防御：  
    - 输入过滤：过滤`<script>`、`onclick`等危险标签 / 属性。
    - 输出编码：展示用户输入时进行 HTML 编码（如&→&amp;，<→&lt;）。
    - CSP（内容安全策略）：通过 HTTP 头Content-Security-Policy限制脚本来源（如只允许同源脚本）。
    - 使用HttpOnly标记 cookie：防止 JS 读取 cookie（Set-Cookie: token=xxx; HttpOnly）。

- CSRF（跨站请求伪造）：
攻击者诱导用户在已登录的目标网站上执行非本意的操作（如转账），利用用户的身份凭证（cookie）。
  - 防御：
    - Token 验证：服务器生成随机 Token，请求时携带（如表单隐藏域、请求头），服务器验证 Token 有效性。
    - SameSite Cookie：设置Set-Cookie: token=xxx; SameSite=Strict（仅同源请求携带 cookie）。
    - 验证 Referer/Origin：检查请求来源是否为可信域名。
    - 二次验证：敏感操作（如转账）需输入密码或验证码。
- 其他常见攻击：
  - SQL 注入：通过输入恶意 SQL 片段篡改数据库查询（防御：使用参数化查询，避免拼接 SQL）。
  - 点击劫持：通过透明 iframe 诱导用户点击隐藏的危险按钮（防御：设置X-Frame-Options: DENY禁止 iframe 嵌套）。
