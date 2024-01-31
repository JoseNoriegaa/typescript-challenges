/**
 * 30301 - IsOdd
 *
 * return true is a number is odd
 *
 *
 * ```
 */

/* _____________ Your Code Here _____________ */

type IsOdd<T extends number> = any

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<IsOdd<2023>, true>>,
  Expect<Equal<IsOdd<1453>, true>>,
  Expect<Equal<IsOdd<1926>, false>>,
  Expect<Equal<IsOdd<number>, false>>,
]
