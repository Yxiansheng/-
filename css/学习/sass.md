# Sass

Sass 是一款强化 CSS 的辅助工具，它在 CSS 语法的基础上增加了变量 (variables)、嵌套 (nested rules)、混合 (mixins)、导入 (inline imports) 等高级功能，这些拓展令 CSS 更加强大与优雅。使用 Sass 以及 Sass 的样式库（如 Compass）有助于更好地组织管理样式文件，以及更高效地开发项目。

## CSS 语法扩展

### 嵌套规则

```[css]
input.scss
.parent {
  width: 100px;
  height: 100px;
  background-color: red;
  .child {
    width: 50px;
    height: 50px;
    background-color: #ffffff;
  }
}
```

```[css]
output.scss
.parent {
  width: 100px;
  height: 100px;
  background-color: red;
  .child {
    width: 50px;
    height: 50px;
    background-color: #ffffff;
  }
}
```

### 父选择器&

在嵌套规则中，嵌套子元素可使用&来指代父元素，同时可与后缀生成复合选择器

```[css]
input.scss
.parent {
  width: 100px;
  height: 100px;
  background-color: red;
  .child {
    width: 50px;
    height: 50px;
    background-color: #ffffff;
  }
}
```

```[css]
output.scss
.parent {
  width: 100px;
  height: 100px;
  background-color: red;
  .child {
    width: 50px;
    height: 50px;
    background-color: #ffffff;
  }
}
```
