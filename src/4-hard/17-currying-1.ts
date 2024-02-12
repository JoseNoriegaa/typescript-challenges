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
 *
 * The function passed to `Currying` may have multiple arguments, you need to correctly type it.
 *
 * In this challenge, the curried function only accept one argument at a time. Once all the argument is assigned, it should return its result.
 *
 * <!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://tsch.js.org/17/answer" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://tsch.js.org/17/solutions" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <hr><h3>Related Challenges</h3><a href="https://github.com/type-challenges/type-challenges/blob/main/questions/00014-easy-first/README.md" target="_blank"><img src="https://img.shields.io/badge/-14%E3%83%BBFirst%20of%20Array-7aad0c" alt="14・First of Array"/></a>  <a href="https://github.com/type-challenges/type-challenges/blob/main/questions/00016-medium-pop/README.md" target="_blank"><img src="https://img.shields.io/badge/-16%E3%83%BBPop-d9901a" alt="16・Pop"/></a>  <a href="https://github.com/type-challenges/type-challenges/blob/main/questions/00462-extreme-currying-2/README.md" target="_blank"><img src="https://img.shields.io/badge/-462%E3%83%BBCurrying%202-b11b8d" alt="462・Currying 2"/></a> <!--info-footer-end-->
 */

/* _____________ Your Code Here _____________ */

type LinkAsFn<Args extends unknown[], LastReturn = never> = Args extends [infer Arg, ...infer Rest]
  ? (arg: Arg) => LinkAsFn<Rest, LastReturn>
  : LastReturn;

type Aux<Fns> = Fns extends (...args: infer Args) => infer R
  ? Args extends []
    ? () => R
    : LinkAsFn<Args, R>
  : never;

declare function Currying<Fns>(fn: Fns): Aux<Fns>

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
