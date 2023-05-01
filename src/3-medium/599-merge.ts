/*
  599 - Merge
  -------
  by ZYSzys (@ZYSzys) #medium #object

  ### Question

  Merge two types into a new type. Keys of the second type overrides keys of the first type.

  For example

  ```ts
  type foo = {
    name: string;
    age: string;
  }
  type coo = {
    age: number;
    sex: string
  }

  type Result = Merge<foo,coo>; // expected to be {name: string, age: number, sex: string}
  ```

  > View on GitHub: https://tsch.js.org/599
*/

/* _____________ Your Code Here _____________ */

type Merge<F extends object, S extends object> = {
  [key in (keyof F | keyof S)]: key extends keyof S
    ? S[key]
    : key extends keyof F
      ? F[key]
      : never;
}

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type Foo = {
  a: number
  b: string
}
type Bar = {
  b: number
  c: boolean
}

type cases = [
  Expect<Equal<Merge<Foo, Bar>, {
    a: number
    b: number
    c: boolean
  }>>,
]
