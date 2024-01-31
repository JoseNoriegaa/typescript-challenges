/**
 * 17 - Currying 1
 *
 * > TypeScript 4.0 is recommended in this challenge
 *
 * [Currying](https://en.wikipedia.org/wiki/Currying) is the technique of converting a function that takes multiple arguments into a sequence of functions that each take a single argument. 
 *
 * For example:
 *
 * ```ts
 * const add = (a: number, b: number) => a + b
 * const three = add(1, 2)
 *
 * const curriedAdd = Currying(add)
 * const five = curriedAdd(2)(3)
 * ```
 */

/* _____________ Your Code Here _____________ */

declare function Currying(fn: any): any

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

const curried1 = Currying((a: string, b: number, c: boolean) => true)
const curried2 = Currying((a: string, b: number, c: boolean, d: boolean, e: boolean, f: string, g: boolean) => true)
const curried3 = Currying(() => true)

type cases = [
  Expect<Equal<
    typeof curried1,
(a: string) => (b: number) => (c: boolean) => true
  >>,
  Expect<Equal<
    typeof curried2,
(a: string) => (b: number) => (c: boolean) => (d: boolean) => (e: boolean) => (f: string) => (g: boolean) => true
  >>,
  Expect<Equal<typeof curried3, () => true>>,
]
