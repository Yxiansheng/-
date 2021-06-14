# apply、call 与 bind 的区别

apply、call 都是转移方法运行时的 this 指向，而 call 接受的是若干个参数的列表，而 apply 传入一个多个参数的数组。

```[js]
const func = function (...args) {
  console.log(this.desc);
  console.log('args', args)
}

const a = {
  desc: 'This is a!'
}
const b = {
  desc: 'This is b!'
}

func.call(a, 1, 2, 3)
func.apply(a, [1, 2, 3])
```

## bind

bind 方法与 call / apply 最大的不同就是前者返回一个绑定上下文的函数，而后两者是直接执行了函数。

## 模拟实现

```[js]
Function.prototype.apply = function (context, arr) {
    context = context ? Object(context) : window; 
    context.fn = this;
  
    let result;
    if (!arr) {
        result = context.fn();
    } else {
        result = context.fn(...arr);
    }
      
    delete context.fn
    return result;
}

Function.prototype.call = function (context) {
  context = context ? Object(context) : window; 
  context.fn = this;

  let args = [...arguments].slice(1);
  let result = context.fn(...args);

  delete context.fn
  return result;
}

Function.prototype.bind = function (context) {

    if (typeof this !== "function") {
      throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
    }

    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);

    var fNOP = function () {};

    var fBound = function () {
        var bindArgs = Array.prototype.slice.call(arguments);
        return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
    }

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();
    return fBound;
}
```