# JS 事件

## 事件捕获流程

window => document => html => body => ... => 目标元素

## Event 对象常见属性及方法

- event.target 当前触发事件的元素
- event.currentTarrget 当前为其绑定事件的元素
- event.preventDedault() 阻止默认事件
- event.stopPropagation() 阻止冒泡
- event.stopImmediatePropagation() 阻止该元素上同一事件的其他回调

## 自定义事件

```[js]
var eve = new Event('newEvent')
ev.addEventListener('newEvent', function () {})
ev.dispatchEvent(eve)
```
