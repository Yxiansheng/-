# type-fest 库 SnakeCasedPropertiesDeep 学习分享

## 描述

将一个约束为键值对的类型中的所有键从小驼峰格式转为下划线格式，再输出

## 用法

```[typescript]
export interface IUser {
  name: string;
  lastLogin?: number;
}

export type TSnakeCaseUser = SnakeCasedPropertiesDeep<IUser>;

// error: 类型 "{ name: string; }" 中缺少属性 "last_login"，但类型 "{ name: string; last_login: number; }" 中需要该属性。ts(2741)
const ming: TSnakeCaseUser = {
  first_name: '123',
};
```

## 依赖特性

### extends

- 接口继承

```[typescript]
export interface IUser {
    name: string;
    lastLogin?: number;
}
export interface IEngineer extends IUser {
    profession: 'engineer';
}
```

- 泛型约束

```[typescript]
const getName = <T extends IUser>(user: T) => {
    return user.name;
};

const wei: IEngineer = {
    name: 'wei',
    profession: 'engineer',
};
const hu: IUser = {
    name: 'hu',
};

getName(wei); // wei
getName(hu); // hu
getName({}); // error: 类型“{}”的参数不能赋给类型“IUser”的参数
```

- 条件类型，类似三元运算符，`T extends U ? X : Y`，即如果 T 是 U 的子类型，那么取结果 X，否则取结果 Y

```[typescript]
// ts 官方提供的工具函数，避免 null 或 undefined 赋给某个变量或属性
type NonNullable<T> = T extends null | undefined ? never : T;
```

分配式 extends: 当条件类型中 T 为一个 **_泛型_** 且实际传入的类型为 **_联合类型_** 的时候，TS 会将 T 中的每个子类型都单独与 U 比较，即为分配律，以得到最终结果

```[typescript]
type TA<K> = K extends 'a' | 'b' | 'c' ? 'good' : 'bad';

type TB = TA<'a' | 'b'>;
// TA<'a'> | TA<'b'> = 'good' | 'good' = 'good'

type TC = TA<'d' | 'e'>;
// TA<'d'> | TA<'e'> = 'bad' | 'bad' = 'bad'

type TD = TA<'a' | 'e'>;
// TA<'a'> | TA<'e'> = 'good' | 'bad'

注：分配式 extends 前的类型必须是个泛型
type TE = 'a' | 'd' extends 'a' | 'b' | 'c' ? 'good' : 'bad' // 'bad'
```

分配式 extends 还可以与 never 类型配合使用,以下是 TS 官方提供的几个工具类型的实现

```
type Exclude<T, U> = T extends U ? never : T

type TF = Exclude<'a' | 'b' | 'c', 'c' | 'd'> // 'a' | 'b'
```

```
type Exclude<T, U> = T extends U ? never : T

type TG = Extract<'a' | 'b' | 'c', 'a' | 'b'>; // 'a' | 'b'
```

### infer

只可以在 extends 的条件类型中使用，可以帮助我们更好得进行类型推导，下面是几个使用 infer 的例子

```[typescript]
// 美化联合类型
// 这里我们拿到外部的类型的所有键值对，并包裹到一个新的高级类型中，在使用 infer 帮助我们进行推导并返回
type Beautify<T extends Record<string, any>> = { [K in keyof T]: T[K] } extends infer U ? U : never;

interface IWorkInfor {
    profession: string;
};

interface IFamilyInfor {
    numberOfPeople: number;
};

type TInfor = IWorkInfor & IFamilyInfor // IWorkInfor & IFamilyInfor
type TInfor = Beautify<IWorkInfor & IFamilyInfor>; // { profession: string; numberOfPeople: number; }
```

```[typescript]
// 拿到一个函数类型的参数类型
type Parameters<T> = T extends (...args: infer R) => any ? R : any;

type T0 = Parameters<(a: string, b: number) => {}> // [a: string, b: number]
type T1 = Parameters<(a: string, b: string, c: boolean) => {}>; // [a: string, b: string, c: boolean]
```

```[typescript]
// 拿到一个函数类型的返回值类型
type ReturnType<T extends (...args: any[]) => any> = T extends (...args: any[]) => infer R ? R : any;

type T2 = ReturnType<(a: string, b: number) => number>; // number
type T3 = ReturnType<(a: string, b: string, c: boolean) => boolean>; // number
```

## 实现

### 调用链路 `SnakeCasedPropertiesDeep -> DelimiterCasedPropertiesDeep -> StringArrayToDelimiterCase -> SplitIncludingDelimiters`

`注：下面的方法部分属于 type-fest 公共方法，为了方便 SnakeCasedPropertiesDeep 的理解， 以下所有流程图的传参都是假设在 SnakeCasedPropertiesDeep 的调用栈中`

```[typescript]
// 公共类型
type UpperCaseCharacters = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z';
type WordSeparators = '-' | '_' | ' ';
```

### `SplitIncludingDelimiters<Source extends string, Delimiter extends string>`

将 low camel-case 字符串切割为 `[str1, UpperCaseChar1, str2, UpperCaseChar2, str3]`，下面是两个例子

```
lastLogin => [last, L, ogin]
materialStoreId => [material, S, tore, I, d]
```

```[typescript]
// SplitIncludingDelimiters<"materialStoreId", UpperCaseCharacters>

type SplitIncludingDelimiters<Source extends string, Delimiter extends UpperCaseCharacters> = Source extends ''
  ? []
  : Source extends `${infer FirstPart}${Delimiter}${infer SecondPart}`   // FirstPart: "material" ｜ materialStore， SecondPart：“toreId” | "d"
  ? Source extends `${FirstPart}${infer UsedDelimiter}${SecondPart}` // UsedDelimiter: "S" | "I" | "StoreI"
    ? UsedDelimiter extends Delimiter // 使用分配式 extends 特点，过滤出所有大写字母
      ? Source extends `${infer FirstPart}${UsedDelimiter}${infer SecondPart}` // 因为分配式 extends 特点联合类型的每个字类型都会单独触发 extends 条件，且可在 “true” 部分使用
        ? [
            ...SplitIncludingDelimiters<FirstPart, Delimiter>,
            UsedDelimiter,
            ...SplitIncludingDelimiters<SecondPart, Delimiter>
          ]
        : never
      : never
    : never
  : [Source];
```

### `StringPartToDelimiterCase<StringPart extends string,UsedUpperCaseCharacters extends string,Delimiter extends string>`

改造 StringPart，如果 StringPart 为单个大写字母类型，则将其转为 `${Delimiter}${Lowercase<StringPart>}`，否则原样返回

```[typescript]
export type StringPartToDelimiterCase<
  StringPart extends string,
  Start extends boolean,
  UsedUpperCaseCharacters extends string,
  Delimiter extends string
> = StringPart extends UsedUpperCaseCharacters
  ? Start extends true
    ? Lowercase<StringPart>
    : `${Delimiter}${Lowercase<StringPart>}`
  : StringPart;

type TE = StringPartToDelimiterCase<'E', true, UpperCaseCharacters, '_'>; // "e"
type TF = StringPartToDelimiterCase<'F', false, UpperCaseCharacters, '_'>; // "_f"
type TG = StringPartToDelimiterCase<'material', false, UpperCaseCharacters, '_'>; "material"
```

### `StringArrayToDelimiterCase<Parts extends readonly any[], Start extends boolean,UsedWordSeparators extends string, UsedUpperCaseCharacters extends string,Delimiter extends string>`

将一个数组里的每个元素用 `StringPartToDelimiterCase` 进行改造，然后组合起来返回一个新的字符串

```[typescript]
type StringArrayToDelimiterCase<
  Parts extends readonly any[],
  Start extends boolean,
  UsedUpperCaseCharacters extends string,
  Delimiter extends string
> = Parts extends [`${infer FirstPart}`, ...infer RemainingParts]
  ? `${StringPartToDelimiterCase<FirstPart, Start, UsedUpperCaseCharacters, Delimiter>}${StringArrayToDelimiterCase< // 递归调用自身，对剩下的元素进行合并
      RemainingParts,
      false,
      UsedUpperCaseCharacters,
      Delimiter
    >}`
  : Parts extends [string] // 只剩一个元素时，直接返回该元素
  ? string
  : '';
```

### `DelimiterCase<Value extends string, Delimiter extends string>`

将字符串由小驼峰格式转为 Delimiter 作为连接符的格式

```[typescript]
export type DelimiterCase<Value extends string, Delimiter extends string> = StringArrayToDelimiterCase< // 进行字符串元组合并
  SplitIncludingDelimiters<Value, UpperCaseCharacters>, // 拆分为字符串元组
  true,
  UpperCaseCharacters,
  Delimiter
>;
```

### `DelimiterCasedPropertiesDeep<Value, Delimiter extends string> `

根据不同传入类型，对其中的键名类型进行转换

```[typescript]
DelimiterCasedPropertiesDeep<Value, Delimiter extends string> = Value extends Function
  ? Value
  : Value extends Array<infer U>
  ? Array<DelimiterCasedPropertiesDeep<U, Delimiter>>
  : Value extends Set<infer U>
  ? Set<DelimiterCasedPropertiesDeep<U, Delimiter>>
  : {
      [K in keyof Value as DelimiterCase<K, Delimiter>]: DelimiterCasedPropertiesDeep<Value[K], Delimiter>;
    };
```

### `SnakeCasedPropertiesDeep<Value extends Record<string, any>>`

```
type SnakeCasedPropertiesDeep<Value extends Record<string, any>> = DelimiterCasedPropertiesDeep<Value, '_'>
```
