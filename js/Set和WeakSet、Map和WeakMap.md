### Set(集合)
#### 集合是ES6新增的一种数据结构，集合中的每个元素都是不相同的，同时它可用来存放undefined及NaN
- 构造函数：new Set([iterable])
```
iterable
如果传递一个可迭代对象，它的所有元素将不重复地被添加到新的 Set中。如果不指定此参数或其值为null，则新的 Set为空
```
- 常用属性及方法：
```
属性：
size: 返回集合的长度
方法：
1. Set.prototype.add(value)
在Set对象尾部添加一个元素同时返回该Set对象。即我们可以使用链式方式来调用：newSet.add(1).add(2);
2. Set.prototype.delete(value)
移除Set的中与这个值相等的元素，同时返回传入value是否在执行删除前是否在集合中存在的布尔值
3. Set.prototype.values()
返回一个新的迭代器对象，该对象包含Set对象中的按插入顺序排列的所有元素的值。
```
- 常用例子：
1. 数组去重：``` Array.from(new Set([1, 2, 3, 4, 1, 2])) ```

****

### WeakSet
#### WeakSet是ES6新增的数据结构之一，它允许弱引用对象储存到一个集合中
- 与Set区别
  1. WeakSet只能存放对象引用，不能存放原始值
```
error: new WeakSet([1, 2, 3]) // Uncaught TypeError: Invalid value used in weak set
right: new WeakSet({ a: 1 }) 
```
  2. 之所以称WeakSet存放的对象都是弱引用的，是因为垃圾回收机制不会考虑WeakSet对集合中储存的对象的引用，如果没有其他属性对象保持着对该对象的引用，垃圾回收机制就会将存放对象回收,所以WeakSet是不可枚举的。
 
- 构造函数：new WeakSet([iterable]);
```
iterable
如果传入一个可迭代对象作为参数, 则该对象的所有迭代值都会被自动添加进生成的 WeakSet 对象中。null 被认为是 undefined。
```

- 常用属性及方法：
```
方法：
add(value): 在该 WeakSet 对象中添加一个新元素 value.
delete(value): 从该 WeakSet 对象中删除 value 这个元素, 之后 WeakSet.prototype.has(value) 方法便会返回 false
has(value): 返回一个布尔值,  表示给定的值 value 是否存在于这个 WeakSet 中.
```
