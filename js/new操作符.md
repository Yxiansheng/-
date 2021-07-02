# new 操作操作符

## 实现

```[js]
const new2 = (func, ...params) => {
  const o = Object.create(func.prototype)
  const ret = func.apply(o, params)
  return ret instanceof Object ? ret : o
}
```
