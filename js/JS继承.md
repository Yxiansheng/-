# JS 继承

## 原型链继承

- 优点：可继承父类及其原型的所有属性

- 缺点：子类生成的实例的隐式原型都指向同一个对象，一旦该对象被修改，则全部子类实例都会受到影响

- 实现

```[js]
function Father () {
    this.name = "father"
}

function Child (age) {
    this.age = age
}
Child.prototype = new Father()
```

## 实例继承

- 优点：

  1. 可继承父类及其原型的所有属性
  2. 可传参给父类构造函数

- 缺点：返回的是一个父类类型对象而不是子类类型对象

- 实现

```[js]
function Father () {
    this.name = "father"
}
function Child (age) {
    let f = new Father()
    f.age = age
    return f
}
```

## 拷贝继承

- 优点

  1. 可继承父类及父类原型属性
  2. 可传参给父类构造函数

- 缺点：

  1. 继承父类原型链，虽然有父类原型链上的属性
  2. 消耗大量资源

```[js]
function Father () {
    this.name = "wang"
}

function Child (name) {
    let f = new Father(name)

    for (let key in f) {
        this[key] = f[key]
    }
}
```

## 构造函数继承

- 优点

  1. 可继承父类属性
  2. 可传参给父类构造函数

- 缺点：无法继承父类原型属性
- 实现

```[js]
function Father () {
    this.name = "father"
}
function Child (age) {
    Father.apply(this, arguments)
    this.age = age
}
```

## 组合继承

- 优点

  1. 可继承父类及父类原型属性
  2. 可传参给父类构造函数
  3. 可继承父类完整原型链

- 缺点：调用了两次父类构造函数造成浪费
- 实现

```[js]
function Father () {
    this.name = "wang"
}

function Child (age) {
    Father.apply(this, arguments)
    this.age = age
}
Child.prototype = new Father()
Child.prototype.constructor = Child
```

## 优化组合继承

- 优点：解决组合继承调用两次父类构造函数造成的浪费

- 实现

```[js]
function Father () {
  this.name = 'wang'
}
function Child (age) {
  Father.apply(this, arguments)
  this.age = age
}
Child.prototype = Object.create(Father.prototype)
Child.prototype.constructor = Child
```

## 寄生组合继承

- 优点：

1. 可继承父类及父类原型属性
2. 可传参给父类构造函数
3. 可继承父类完整原型链

- 实现

```[js]
function Father () {
    this.name = "father"
}

function Child (age) {
    Father.apply(this, arguments)
    this.age = age
}
(function () {
    let f = function () {
    }
    f.prototype = Father.prototype
    Child.prototype = new f()
    Child.prototype.constructor = Child
})()
```
