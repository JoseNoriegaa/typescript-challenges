/*
  3312 - Parameters
  -------
  by midorizemi (@midorizemi) #easy #infer #tuple #built-in

  ### Question

  Implement the built-in Parameters<T> generic without using it.

  For example:

  ```ts
  const foo = (arg1: string, arg2: number): void => {}

  type FunctionParamsType = MyParameters<typeof foo> // [arg1: string, arg2: number]
  ```

  > View on GitHub: https://tsch.js.org/3312
*/

/* _____________ Your Code Here _____________ */

type MyParameters<
T extends Function
> = T extends (...args: infer P) => unknown
  ? [unknown, ...P] extends [unknown, ...infer A]
    ? A
    : never
  : never;

  /* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

const foo = (arg1: string, arg2: number): void => {}
const bar = (arg1: boolean, arg2: { a: 'A' }): void => {}
const baz = (): void => {}

type cases = [
  Expect<Equal<MyParameters<typeof foo>, [string, number]>>,
  Expect<Equal<MyParameters<typeof bar>, [boolean, { a: 'A' }]>>,
  Expect<Equal<MyParameters<typeof baz>, []>>,
]

type R = MyParameters<typeof bar>