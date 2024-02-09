/**
 * 27958 - CheckRepeatedTuple
 *
 * Implement type `CheckRepeatedChars<T>` which will return whether type `T` contains duplicated member
 *
 * For example:
 *
 * ```ts
 * type CheckRepeatedTuple<[1, 2, 3]>   // false
 * type CheckRepeatedTuple<[1, 2, 1]>   // true
 * ```
 */

/* _____________ Your Code Here _____________ */

type CheckRepeatedTuple<T extends unknown[], U = never> = T extends [infer A, ...infer Rest]
  ? A extends U
    ? true
    : CheckRepeatedTuple<Rest, U | A>
  : false

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<CheckRepeatedTuple<[number, number, string, boolean]>, true>>,
  Expect<Equal<CheckRepeatedTuple<[number, string]>, false>>,
  Expect<Equal<CheckRepeatedTuple<[1, 2, 3]>, false>>,
  Expect<Equal<CheckRepeatedTuple<[1, 2, 1]>, true>>,
  Expect<Equal<CheckRepeatedTuple<[]>, false>>,
  Expect<Equal<CheckRepeatedTuple<string[]>, false>>,
]
