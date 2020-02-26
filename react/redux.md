## Redux 

### 组成
 Action – 这是一个用来描述发生了什么事情的对象。 
 Reducer – 这是一个确定状态将如何变化的地方。
 Store – 整个程序的状态/对象树保存在Store中。
 View – 只显示 Store 提供的数据。
Redux中的dispatch为异步操作，因此要通过生命周期钩子函数去监听store中的state变化

### 三大原则：
1. 唯一数据源：整个应用的 state 被储存在一棵 object tree 中，并且这个 object tree 只存在于唯一一个 store 中。
2. State是只读的：唯一改变 state 的方法就是触发 action，action 是一个用于描述已发生事件的普通对象。
3. 使用纯函数来进行修改：Reducer 只是一些纯函数，它接收先前的 state 和 action，并返回新的 state，原来的state并未被改变
