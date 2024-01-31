/**
 * 4484 - IsTuple
 *
 * Implement a type ```IsTuple```, which takes an input type ```T``` and returns whether ```T``` is tuple type.
 *
 * For example:
 *
 * ```typescript
 * type case1 = IsTuple<[number]> // true
 * type case2 = IsTuple<readonly [number]> // true
 * type case3 = IsTuple<number[]> // false
 * ```
 */

/* _____________ Your Code Here _____________ */

type IsTuple<T> = any

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<IsTuple<[]>, true>>,
  Expect<Equal<IsTuple<[number]>, true>>,
  Expect<Equal<IsTuple<readonly [1]>, true>>,
  Expect<Equal<IsTuple<{ length: 1 }>, false>>,
  Expect<Equal<IsTuple<number[]>, false>>,
  Expect<Equal<IsTuple<never>, false>>,
]
