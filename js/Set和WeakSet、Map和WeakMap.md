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

****

### Map(字典)
#### 用于保存键值对，并且能够记住键的原始插入顺序。任何值(对象或者原始值) 都可以作为一个键或一个值
- 构造函数：new Map([iterable])
```
iterable
Iterable 可以是一个数组或者其他 iterable 对象，其元素为键值对(两个元素的数组，例如: [[ 1, 'one' ],[ 2, 'two' ]])。
每个键值对都会添加到新的 Map。
null 会被当做 undefined。
```
- 常用属性及方法：
```
属性：
size: 返回集合的长度
方法：
1. set(key, value)
在Map对象尾部添加一个元素同时返回该Map对象。即我们可以使用链式方式来调用：newMap.set(key1, value1).set(key2, value2);
2. get(key)
返回键对应的值，如果不存在，则返回undefined。
```
- Map键的比较： 
map中判断两个键是否相同，是通过sameValueZero算法(即全等===)来判断，除NaN外，NaN默认为不自等，在这里是自等的。

***

### WeakMap
#### WeakMap 对象是一组键/值对的集合，其中的键是弱引用的。其键必须是对象，而值可以是任意
- 构造函数：new WeakMap([iterable])
```
iterable
Iterable 是一个数组（二元数组）或者其他可迭代的且其元素是键值对的对象。每个键值对会被加到新的 WeakMap 里。null 会被当做 undefined。
```
- 常用属性及方法：
```
方法：
1. set(key, value)
在WeakMap中设置一组key关联对象，返回这个 WeakMap对象。
2. delete(key)
返回键对应的值，如果不存在，则返回undefined。
3. get(key)
返回key关联对象, 或者 undefined(没有key关联对象时)。
4. has(key)
根据是否有key关联对象返回一个Boolean值
```
