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

### 父选择器&

在嵌套规则中，嵌套子元素可使用&来指代父元素，同时可与后缀生成复合选择器

```[css]
input.scss
.parent {
  width: 100px;
  height: 100px;
  background-color: red;
  &::after {
    content: "";
    display: inline-block;
    width: 50px;
    height: 50px;
    background-color: yellow;
  }
  &-child-1 {
    width: 30px;
    height: 30px;
    background: blue;
  }
}

```

```[css]
output.scss
.parent {
  width: 100px;
  height: 100px;
  background-color: red;
}
.parent::after {
  content: "";
  display: inline-block;
  width: 50px;
  height: 50px;
  background-color: yellow;
}
.parent-child-1 {
  width: 30px;
  height: 30px;
  background: blue;
}
```

### 属性嵌套

部分 CSS 属性遵循相同的命名空间，sass 允许将属性嵌套在命名空间中

```[scss]
input.scss
.parent {
  font: {
    family: fantasy;
    size: 30em;
    weight: bold;
  }
}
```

```[css]
.parent {
  font-family: fantasy;
  font-size: 30em;
  font-weight: bold;
}
```

## SassScript

### 变量\$

Sass 可通过添加前缀\$来定义变量，变量支持块级作用域，嵌套规则内定义的变量只能在嵌套规则内使用（局部变量），不在嵌套规则内定义的变量则可在任何地方使用（全局变量）。将局部变量转换为全局变量可以添加 !global 声明

```[scss]
input.scss

$height: 100px;
.parent {
  $width: 100px;
  $bgColor: red !global;
  width: $width;
  height: $height;
  background-color: red;
}
.box {
  width: 100px;
  height: $height;
  background-color: $bgColor;
}
```

```[css]
output.css

.parent {
  width: 100px;
  height: 100px;
  background-color: red;
}
.box {
  width: 100px;
  height: 100px;
  background-color: red;
}
```

### 数据类型

- 数字，1, 2, 13, 10px
- 字符串，有引号字符串与无引号字符串，"foo", 'bar', baz
- 颜色，blue, #04a3f9, rgba(255,0,0,0.5)
- 布尔型，true, false
- 空值，null
- 数组 (list)，用空格或逗号作分隔符，1.5em 1em 0 2em, Helvetica, Arial, sans-serif  
  数组中可包含子数组，使用逗号或括号分隔，如：(1 1.5rem) (hhh, wahaha) 或 1 1.5rem, hhh wahaha
- maps, 相当于 JavaScript 的 object，(key1: value1, key2: value2)

### 运算

- 数字运算  
  SassScript 支持数字的加减乘除、取整等运算 (+, -, \*, /, %)，如果必要会在不同单位间转换值

### 插值语句 #{}

通过 #{} 插值语句可以在选择器或属性名中使用变量

```[scss]
input.scss
$bgColor: yellow;
$child: "parent-child-1";
$attr: "color";
.parent {
  .#{$child} {
    width: 100px;
    height: 100px;
    background-#{$attr}: red;
  }
}
.box {
  width: 100px;
  height: 100px;
  background-color: $bgColor;
}

```

```[css]
out.css
.parent .parent-child-1 {
  width: 100px;
  height: 100px;
  background-color: red;
}
.box {
  width: 100px;
  height: 100px;
  background-color: yellow;
}
```

## @-Rules 与指令

### extend 继承某个或多个选择器所属样式

```[scss]
input.scss
.tip {
  color: #ffffff;
  text-align: center;
  background-color: blue;
}
.tip-success {
  @extend .tip;
  background-color: green;
}
.tip-error {
  @extend .tip;
  background-color: red;
}
.tip-warn {
  @extend .tip;
  background-color: orange;
}
```

```[scss]
output.css
.tip, .tip-warn, .tip-error, .tip-success {
  color: #ffffff;
  text-align: center;
  background-color: blue;
}

.tip-success {
  background-color: green;
}

.tip-error {
  background-color: red;
}

.tip-warn {
  background-color: orange;
}
```

## 控制指令

### @if

```[scss]
input.scss
.tip {
  @if 1 + 1 == 2 {
    background-color: green;
    color: white;
  }
}
```

```[scss]
output.scss
.tip {
  background-color: green;
  color: white;
}
```

### @for

@for \$var from start through end：条件范围包含 start 与 end 的值

@for \$var from start to end：条件范围只包含 start 的值不包含 end 的值

`start 和 end必须是整数值`

```[scss]
@for $i from 0 through 3 {
  .tip-#{$i} {
    color: #fff;
    text-align: center;
    @if $i == 1 {
      background-color: green;
    } @else if $i == 2 {
      background-color: red;
    } @else if $i == 3 {
      background-color: orange;
    } @else {
      background-color: blue;
    }
  }
}
```

```[css]
output.css
.tip-0 {
  color: #fff;
  text-align: center;
  background-color: blue;
}
.tip-1 {
  color: #fff;
  text-align: center;
  background-color: green;
}
.tip-2 {
  color: #fff;
  text-align: center;
  background-color: red;
}
.tip-3 {
  color: #fff;
  text-align: center;
  background-color: orange;
}
```

### @each

@each 可用于遍历数组、Map

```[scss]
input.scss
@each $type in success warn error {
  .tip-#{$type} {
    color: #fff;
    text-align: center;
    @if $type == success {
      background-color: green;
    } @else if $type == warn {
      background-color: red;
    } @else if $type == error {
      background-color: orange;
    } @else {
      background-color: blue;
    }
  }
}
```

```[css]
.tip-success {
  color: #fff;
  text-align: center;
  background-color: green;
}
.tip-warn {
  color: #fff;
  text-align: center;
  background-color: red;
}
.tip-error {
  color: #fff;
  text-align: center;
  background-color: orange;
}
```

## 混合指令

混合指令（Mixin）用于定义可重复使用的样式，避免了使用无语意的 class

```[scss]
input.scss
@mixin tip-style($color) {
  color: #ffffff;
  background-color: $color;
  text-align: center;
}
.tip {
  @include tip-style(blue);
}
.tip-success {
  @include tip-style(green);
}
.tip-error {
  @include tip-style(red);
}
.tip-warn {
  @include tip-style(orange);
}
```

```[css]
output.css
.tip {
  color: #ffffff;
  background-color: blue;
  text-align: center;
}
.tip-success {
  color: #ffffff;
  background-color: green;
  text-align: center;
}
.tip-error {
  color: #ffffff;
  background-color: red;
  text-align: center;
}
.tip-warn {
  color: #ffffff;
  background-color: orange;
  text-align: center;
}
```

## 函数指令

```[scss]
input.scss
@function getSliderWidth($i) {
  $baseWidth: 50px;
  @return $baseWidth * $i;
}
@for $i from 1 through 4 {
  .slider-#{$i} {
    height: 25px;
    margin-bottom: 5px;
    width: getSliderWidth($i);
    background-color: red;
  }
}
```

```[scss]
output.scss
.slider-1 {
  height: 25px;
  margin-bottom: 5px;
  width: 50px;
  background-color: red;
}
.slider-2 {
  height: 25px;
  margin-bottom: 5px;
  width: 100px;
  background-color: red;
}
.slider-3 {
  height: 25px;
  margin-bottom: 5px;
  width: 150px;
  background-color: red;
}
.slider-4 {
  height: 25px;
  margin-bottom: 5px;
  width: 200px;
  background-color: red;
}
```
