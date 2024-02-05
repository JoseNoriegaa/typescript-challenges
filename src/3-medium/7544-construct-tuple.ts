/**
 * 7544 - Construct Tuple
 *
 * Construct a tuple with a given length.
 *
 * For example
 *
 * ```ts
 * type result = ConstructTuple<2> // expect to be [unknown, unkonwn]
 * ```
 *
 */

/* _____________ Your Code Here _____________ */

type ConstructTuple<L extends number, Fill = unknown, Output extends Fill[] = []> = L extends Output['length']
  ? Output
  : ConstructTuple<L, Fill, [...Output, Fill]>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<ConstructTuple<0>, []>>,
  Expect<Equal<ConstructTuple<2>, [unknown, unknown]>>,
  Expect<Equal<ConstructTuple<999>['length'], 999>>,
  // @ts-expect-error
  Expect<Equal<ConstructTuple<1000>['length'], 1000>>,
]
