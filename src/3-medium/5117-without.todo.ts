/**
 * 5117 - Without
 *
 * Implement the type version of Lodash.without, Without<T, U> takes an Array T, number or array U and returns an Array without the elements of U.
 *
 * ```ts
 * type Res = Without<[1, 2], 1>; // expected to be [2]
 * type Res1 = Without<[1, 2, 4, 1, 5], [1, 2]>; // expected to be [4, 5]
 * type Res2 = Without<[2, 3, 2, 3, 2, 3, 2, 3], [2, 3]>; // expected to be []
 * ```
 */

/* _____________ Your Code Here _____________ */

type Without<T, U> = any

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Without<[1, 2], 1>, [2]>>,
  Expect<Equal<Without<[1, 2, 4, 1, 5], [1, 2]>, [4, 5]>>,
  Expect<Equal<Without<[2, 3, 2, 3, 2, 3, 2, 3], [2, 3]>, []>>,
]
