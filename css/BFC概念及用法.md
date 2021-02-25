# BFC 概念及用法

## 外边距合并问题

- 概念：在同一个 BFC 容器中，两个相邻的盒子模型的外边距如果是有接触的，则会两个相邻的外边距会合并一个，边距值为两个外边距值中最大的一个

- 具体有以下几种情形

  - 父子元素在同方向都有外边距，则会合并
  - 相邻兄弟元素在反方向上有外边距，则会合并
  - 空白元素在上下方向都有外边距时，则会合并

- 解决方案：可通过单独创建 BFC(破坏在同一个 BFC 容器中的规则)来解决该问题

## 概念

BFC(Block Format Context): 块级格式化上下文

## 渲染规则

- BFC 元素内垂直方向的 margin 会发生重叠
- bfc 的区域不会与 float 的元素区域重叠。（清除浮动）
- 计算 bfc 的高度时，浮动元素也参与计算
- bfc 就是页面上的一个独立容器，容器里面的子元素不会影响外面元素。

## 形成条件

- 根元素（<html>）
- 浮动元素（元素的 float 不是 none）
- 绝对定位元素（元素的 position 为 absolute 或 fixed）
- 行内块元素（元素的 display 为 inline-block）
- 表格单元格（元素的 display 为 table-cell，HTML表格单元格默认为该值）
- 表格标题（元素的 display 为 table-caption，HTML表格标题默认为该值）
- 匿名表格单元格元素（元素的 display 为 table、table-row、table-row-group、table-header-group、table-footer-group（分别是HTML table、row、tbody、thead、tfoot 的默认属性）或 inline-table）
- overflow 计算值(Computed)不为 visible 的块元素
- display 值为 flow-root 的元素
- contain 值为 layout、content 或 paint 的元素
- 弹性元素（display 为 flex 或 inline-flex 元素的直接子元素）
- 网格元素（display 为 grid 或 inline-grid 元素的直接子元素）
- 多列容器（元素的 column-count 或 column-width 不为 auto，包括 column-count 为 1）
- column-span 为 all 的元素始终会创建一个新的BFC，即使该元素没有包裹在一个多列容器中（标准变更，Chrome bug）。
