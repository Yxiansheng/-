# jscodeshift 使用

## jscodeshift 介绍

jscodeshift 是一个可以批量对 js、ts 文件进行快速且可靠地代码改造的工具集，它主要做了两件事：

1. 一个可以对指定的每个文件都执行外部传入的 transform 方法的 runner ，同时输出一个修改情况的概览，包括修改文件个数、失败个数等。
2. 一个对 recast 的包装器，提供了更多的 API 帮助我们进行对代码 AST 的操作，jscodeshift 的封装引入 Collection 的概念，它主要是在 AST Node 上进行了一个封装，让我们可以使用类似 jquery 的语法进行操作节点，如：`jscodeshift(node).find()、jscodeshift(node).relaceWidth()`等。

```
recast 可以帮助我们利用不同的 parser 将一段代码解析为一棵 AST ，并允许我们进行对 AST 中的节点进行操作，并重新转为源码。
```

## 使用方式

1. 命令行形式：

   ```[bash]
   安装 jscodeshift: npm i jscodeshift

   jscodeshift [options] PATH
   example:

   jscodeshift --parser=tsx --extensions=ts -t=transform.js src
   ```

   ```[js]
    module.exports = (file, api) => {
        const j = api.jscodeshift;
        const root = j(file.source);

        // 操作 AST

        return root.toSource();
    };

   ```

2. 使用 node 脚本 调用形式：

```[ts]
 import jscodeshift from 'jscodeshift'

 jscodeshift(`const word = 'hello jscodeshift'`, options)
```

## 常用选项

| 选项名        | 缩写 | 可选值                        | 默认值          | 描述                        |
| ------------- | ---- | ----------------------------- | --------------- | --------------------------- |
| cpus          | c    | N                             | max(all - 1, 1) | 开启 N 个子进程处理文件     |
| extensions    | --   | js, ts, tsx ....              | js              | 要处理的文件后缀            |
| parser        | --   | babel, babylon, flow, ts, tsx | babel           | 用于处理源码的解析器        |
| parser-config | --   | --                            | --              | 传给 parser 的配置文件      |
| transform     | t    | --                            | ./transform.js  | 用户对源码 AST 要操作的内容 |

## Collection 常用方法

- find(type, filter)
- filter(callback)
- forEach(callback)
- replaceWith(newNode)
- insertBefore()
- insertAfter()
- remove()

[Collection API 文档 1](https://github.com/facebook/jscodeshift/blob/main/src/collections/Node.js)  
[Collection API 文档 2](https://github.com/facebook/jscodeshift/blob/main/src/Collection.js)

## Examples

1. `import { Table } from 'antd'` 按需加载

   ```
   const j = api.jscodeshift;
   const root = j(file.source)

   root
    .find(j.ImportDeclaration, {
      source: {
        type: "StringLiteral",
        value: "antd",
      },
    })
    .forEach((importPath) => {
      const { node } = importPath;

      // 找出 Table 的标识符节点
      const importTableIdentifier = j(importPath).find(j.ImportSpecifier, {
        imported: {
          name: "Table",
        },
      });
      if (!importTableIdentifier.length) return;

      // 如果 import Table 了在下方插入一个 import 声明节点
      j(importPath).insertAfter(
        // 创建一个 import 声明节点
        j.importDeclaration(
          // 创建一个默认 import 说明符
          [j.importDefaultSpecifier(j.identifier("Table"))],
          j.literal("antd/lib/table")
        )
      );

      // 在原 import 语句中删除引入 Table
      importTableIdentifier.remove();
      // 原 import 语句里没有引入其他内容了，将整个语句删除
      if (!node.specifiers.length) {
        j(importPath).remove();
      }
    });
   ```

2.

## 推荐使用流程

1. 先确定需重构的代码是否需要文件间共享变量、方法等（如在文件 A 中拿到通过 ClassDeclaration 拿到某个类名后，需要将这个类名用到文件 B 中），推荐使用自己写 node 脚本，然后在脚本调用 jscodeshift 进行使用，否则可直接写一个 transform 文件传给 jscodeshift 。
2. 将自己的重构的代码放到 [https://astexplorer.net/](https://astexplorer.net/) 中进行解析，这个网站可以帮助我们实现展示出源码被 parser 解析后的 AST 结构，注意一定要选好正确的 parser。
   ```
   推荐使用 parser
   js => babel
   ts => typescript
   tsx => @typescript-eslint/parser // 这个还不是完全与 jscodeshift 的 tsx parser 解析出的 AST 结构一致，如果操作 AST 找不到对应节点，可以把节点输出一下看看（难受||-.-）
   ```
3. 用上述网站展示出对应的 AST 后，可以用鼠标点击需重构代码，就可以找到相应节点的类型和部分特征的属性，再通过 find、filter 等方法找到对应类型的节点进行操作。
4. 如需创造新节点可以通过 [ast-types ](https://github.com/benjamn/ast-types) 这个库查看各类型节点 builder 所需的参数，如 transform 文件是 ts, 可安装 @types/jscodeshift ，
5. 最后操作完可通过 toSource 方法将 AST 还原为 源码。

## 应注意的点

1. 在 [https://astexplorer.net/](https://astexplorer.net/) 中转换 tsx 时，jscodeshift 部分节点与网址转换的节点类型可能会不一致，如果操作 AST 找不到对应节点，可以把节点输出一下看看
2. ts 类型作为泛型参数时，使用 find 直接通过类型名会查不到这部分节点，这时可以先找到具体调用的函数声明节点，再通过其的 typeParameters 属性节点去寻到目标类型

   ```
    const j = api.jscodeshift;
    const root = j(file.source);

    const collection = root.find(j.Identifier, {
        name: "IBasicMaterial",
    });
    console.log(collection.length); // 0,找不到该部分节点

    const collection2 = root.find(j.CallExpression, {
        callee: {
        name: "useState",
        },
    });
    collection2.forEach((path) => {
        const { node } = path;
        const { typeParameters } = node;
        console.log(
        j(typeParameters).find(j.Identifier, {
            name: "IBasicMaterial",
        }).length
        ); // 1，节点数为1说明能找到节点
    });
   ```
