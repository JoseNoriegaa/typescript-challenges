/**
 * 3312 - Parameters
 *
 * Implement the built-in Parameters<T> generic without using it.
 *
 * For example:
 *
 * ```ts
 * const foo = (arg1: string, arg2: number): void => {}
 *
 * type FunctionParamsType = MyParameters<typeof foo> // [arg1: string, arg2: number]
 * ```
 */

/* _____________ Your Code Here _____________ */

type MyParameters<T extends (...args: any[]) => any> = T extends ((...args: infer Args) => unknown)
  ? Args
  : never;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

function foo(arg1: string, arg2: number): void {}
function bar(arg1: boolean, arg2: { a: 'A' }): void {}
function baz(): void {}

type cases = [
  Expect<Equal<MyParameters<typeof foo>, [string, number]>>,
  Expect<Equal<MyParameters<typeof bar>, [boolean, { a: 'A' }]>>,
  Expect<Equal<MyParameters<typeof baz>, []>>,
]
