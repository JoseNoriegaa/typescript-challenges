/**
 * 9896 - GetMiddleElement
 *
 * Get the middle element of the array by implementing a `GetMiddleElement` method, represented by an array
 *
 * > If the length of the array is odd, return the middle element
 * > If the length of the array is even, return the middle two elements
 *
 * For example
 *
 * ```ts
 *   type simple1 = GetMiddleElement<[1, 2, 3, 4, 5]>, // expected to be [3]
 *   type simple2 = GetMiddleElement<[1, 2, 3, 4, 5, 6]> // expected to be [3, 4]
 * ```
 *
 *
 */

/* _____________ Your Code Here _____________ */

type GetMiddleElement<T extends unknown[]> = T['length'] extends (0|1|2)
  ? T
  : T extends [infer A, ...infer M, infer B]
    ? GetMiddleElement<M>
    : never

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<GetMiddleElement<[]>, []>>,
  Expect<Equal<GetMiddleElement<[1, 2, 3, 4, 5]>, [3]>>,
  Expect<Equal<GetMiddleElement<[1, 2, 3, 4, 5, 6]>, [3, 4]>>,
  Expect<Equal<GetMiddleElement<[() => string]>, [() => string]>>,
  Expect<Equal<GetMiddleElement<[() => number, '3', [3, 4], 5]>, ['3', [3, 4]]>>,
  Expect<Equal<GetMiddleElement<[() => string, () => number]>, [() => string, () => number]>>,
  Expect<Equal<GetMiddleElement<[never]>, [never]>>,
]
// @ts-expect-error
type error = GetMiddleElement<1, 2, 3>
