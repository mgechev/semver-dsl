# SemVer DSL

A simple internal DSL which allows you to invoke different functionality depending on version match. Used in codelyzer for keeping the code compatible across different versions of the Angular compiler.

# Demo

```ts
const dsl = SemDSL('3.0.0')
dsl.gt('3.2.1', body)
  .elseIf(dsl.gt('3.0.1'), elseIf1)
  .elseIf(dsl.between('3.0.1', '3.1.8'), elseIf2)
  .else(else);
```

In the example above will be invoked `else`.

# API

- `SemDSL(version: string)` - factory which accepts a version and returns an object.
- `gte(version: string, callback?: Function): ISemContextualDSL` - returns an object with `elseIf` and `else` methods if a callback is passed. Otherwise, it returns the predicate `(v: string) => gte(version, v)`.
- `lte(version: string, callback?: Function): ISemContextualDSL` - returns an object with `elseIf` and `else` methods if a callback is passed. Otherwise, it returns the predicate `(v: string) => lte(version, v)`.
- `gt(version: string, callback?: Function): ISemContextualDSL` - returns an object with `elseIf` and `else` methods if a callback is passed. Otherwise, it returns the predicate `(v: string) => gt(version, v)`.
- `lt(version: string, callback?: Function): ISemContextualDSL` - returns an object with `elseIf` and `else` methods if a callback is passed. Otherwise, it returns the predicate `(v: string) => lt(version, v)`.
- `eq(version: string, callback?: Function): ISemContextualDSL` - returns an object with `elseIf` and `else` methods if a callback is passed. Otherwise, it returns the predicate `(v: string) => eq(version, v)`.
- `neq(version: string, callback?: Function): ISemContextualDSL` - returns an object with `elseIf` and `else` methods if a callback is passed. Otherwise, it returns the predicate `(v: string) => neq(version, v)`.
- `between(v1: string, v2: string, callback?: Function): ISemContextualDSL` - returns an object with `elseIf` and `else` methods if a callback is passed. Otherwise, it returns the predicate `(v: string) => between(v1, v2, v)`.

```ts
export interface ISemDSL {
  gte(version: string, callback?: Function): ISemContextualDSL;
  lte(version: string, callback?: Function): ISemContextualDSL;
  gt(version: string, callback?: Function): ISemContextualDSL;
  lt(version: string, callback?: Function): ISemContextualDSL;
  eq(version: string, callback?: Function): ISemContextualDSL;
  neq(version: string, callback?: Function): ISemContextualDSL;
  between(v1: string, v2: string, callback?: Function): ISemContextualDSL;
}
```

```ts
export interface ISemContextualDSL {
  (): boolean;
  elseIf(predicate: Function, callback: Function): ISemContextualDSL;
  else(callback: Function);
}
```

# License

MIT
