#### 移动端input失去焦点，原生键盘位置出现大片空白
解决方案：捕获input的blur事件，使页面滚动最顶端
```
代码：window.scrollTo(0, 0);
```
