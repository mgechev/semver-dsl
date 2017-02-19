# SemVer DSL

A simple internal DSL which allows you to invoke different functionality depending on version match. Used in codelyzer for keeping the code compatible across different versions of the Angular compiler.

# Demo

```ts
import {SemVerDSL} from 'semver-dsl';

SemVerDSL('3.0.0')
  .gt('3.2.1', target.base)
  .elseIf.gt('3.0.1', target.elseIf1)
  .elseIf.between('3.0.1', '3.1.8', target.elseIf2)
  .else(target.else);
```

In the example above will be invoked `else`.

# API

- `SemDSL(version: string)` - factory which accepts a version and returns an object.
- `gte(version: string, callback?: Function): ISemContextualDSL` - returns an object with `elseIf` and `else` properties.
- `lte(version: string, callback?: Function): ISemContextualDSL` - returns an object with `elseIf` and `else` properties.
- `gt(version: string, callback?: Function): ISemContextualDSL` - returns an object with `elseIf` and `else` properties.
- `lt(version: string, callback?: Function): ISemContextualDSL` - returns an object with `elseIf` and `else` properties.
- `eq(version: string, callback?: Function): ISemContextualDSL` - returns an object with `elseIf` and `else` properties.
- `neq(version: string, callback?: Function): ISemContextualDSL` - returns an object with `elseIf` and `else` properties.
- `between(v1: string, v2: string, callback?: Function): ISemContextualDSL` - returns an object with `elseIf` properties.
- `elseIf` - returns an object of type `ISemVerDSL` bound to the previous predicate.
- `else` - invokes given callback if all of the previous conditions have failed.

```ts
export interface ISemVerDSL {
  gte(version: string, callback: Function): ISemContextualDSL;
  lte(version: string, callback: Function): ISemContextualDSL;
  gt(version: string, callback: Function): ISemContextualDSL;
  lt(version: string, callback: Function): ISemContextualDSL;
  eq(version: string, callback: Function): ISemContextualDSL;
  neq(version: string, callback: Function): ISemContextualDSL;
  between(v1: string, v2: string, callback: Function): ISemContextualDSL;
}
```

```ts
export interface ISemVerContextBoundDSL {
  elseIf: ISemVerDSL;
  else(callback: Function): void;
}
```

# License

MIT
