# Proxy 与 Reflect

## Proxy

对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）。

### 用法：

通过构造函数的方式来使用 ```new Proxy(target, handler)```，其中 target 为需要 Proxy 包装的对象(可以是任何类型的对象，包括原生数组，函数，甚至另一个代理)，而handler以函数作为属性的对象，各属性中的函数分别定义了在执行各种操作时代理 p 的行为（可以当做钩子），其常见属性方法有：getOwnPropertyDescriptor()，get(), set(), construt()

### 常见使用场景

- 抽离校验模块

    在下面的例子中我们将类属性校验模块抽离了出来，即降低了类的复杂度，更提高了校验模块的复用性。

```[js]
const createAttrValidator = (target, validator) => {
    return new Proxy(target, {
        set (target, key, value) {
            if (validator(key)) {
                target[key] = value
            }
        }
    })
}

const dogAttrValidator = (attr) => {
    if (attr === 'wing') {
        throw Error(`The attr "${attr}" is invalid`)
    }
    return true
}

class Dog {
    constructor() {
        this.head = true
        return createAttrValidator(this, dogAttrValidator)
    }
}

const dogA = new Dog()
dogA.wing = true // Error: The attr "wing" is invalid
```

- 私有属性

    通过拦截目标对象的 set()、get() 方法，拦截外部获取或设置私有属性

- 访问日志

## Reflect

Reflect 是一个内置的对象，它提供拦截 JavaScript 操作的方法。这些方法与 proxy handlers 的方法相同。

## 用法

Reflect 不是一个函数对象，因此它是不可构造的。它的所有属性及方法都是静态，所以 Reflect.[属性或方法] 使用即用。它有以下常见的方法：

1. Reflect.construct(target, argumentsList[, newTarget])，对构造函数进行 new 操作，相当于执行 new target(...args)。

2. Reflect.get(target, propertyKey[, receiver])，获取对象身上某个属性的值，类似于 target[name]。

3. Reflect.has(target, propertyKey)，判断一个对象是否存在某个属性，和 in 运算符 的功能完全相同。

## 应用场景

我的理解是 Reflect 的出现是填了 JS 在一开始设计上的一些坑，比如一些方法设计不太便捷，在下面的例子中```Object.defineProperty()```当属性的修饰符 configurable 为 false 时，再次设置该属性的修饰符时会报错。

```[js]
const o = {}
Object.defineProperty(o, 'a', {
    configurable: false,
    value: 1,
    writable: false
})
Object.defineProperty(o, 'a', { // TypeError: Cannot redefine property: a
    writable: true,
    value: 2
}) 
```

而在实际场景中，我们并不想遇到该情况的时候就直接报错，而是跳过该属性，所以  Reflect.defineProperty() 就帮助我们用一种更友好的方式去面对这种情况。

```[js]
const o = {}
Object.defineProperty(o, 'a', {
    configurable: false,
    value: 1,
    writable: false
})

console.log(Reflect.defineProperty(o, 'a', {
    writable: true
})); // false
```
