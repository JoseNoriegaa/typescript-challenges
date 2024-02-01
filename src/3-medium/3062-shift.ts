/**
 * 3062 - Shift
 *
 * Implement the type version of ```Array.shift```
 *
 * For example
 *
 * ```typescript
 * type Result = Shift<[3, 2, 1]> // [2, 1]
 * ```
 */

/* _____________ Your Code Here _____________ */

type Shift<T extends unknown[]> = T extends [unknown, ...infer R]
  ? R
  : T;

type R = Shift<[1]>;
/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  // @ts-expect-error
  Shift<unknown>,
  Expect<Equal<Shift<[]>, []>>,
  Expect<Equal<Shift<[1]>, []>>,
  Expect<Equal<Shift<[3, 2, 1]>, [2, 1]>>,
  Expect<Equal<Shift<['a', 'b', 'c', 'd']>, ['b', 'c', 'd']>>,
]
