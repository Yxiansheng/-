# js 事件机制

## 不支持冒泡事件

- focus
- blur
- mouseenter
- mouseleave
- load
- unload
- resize

## 事件循环

js 中的任务分为两大类，同步任务和异步任务，而异步任务又分为宏任务和微任务

### 宏任务

宏任务主要有：读取 script 全部代码、setTimeout、setInterval、setImmediate（浏览器暂时不支持，只有 IE10 支持，具体可见 MDN）、I/O、UI Rendering

### 微任务

微任务主要有：Process.nextTick（Node 独有）、Promise、MutationObserver

### 事件流程

主线程在读取全部 script 代码时（这本身也是一个宏任务），遇到同步任务就直接将其推入执行栈执行，遇到异步任务就将其放入相应的任务队列中，待到所有的同步任务执行完后，就将微任务队列中的任务一个个推入执行栈执行，直到微任务队列空，再次从宏任务队列读取一个宏任务执行，然后再次循环上面的操作，直至每个任务队列都为空。
