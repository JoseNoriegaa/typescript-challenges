/**
 * 3243 - FlattenDepth
 *
 * Recursively flatten array up to depth times.
 *
 * For example:
 *
 * ```typescript
 * type a = FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2> // [1, 2, 3, 4, [5]]. flattern 2 times
 * type b = FlattenDepth<[1, 2, [3, 4], [[[5]]]]> // [1, 2, 3, 4, [[5]]]. Depth defaults to be 1
 * ```
 */

/* _____________ Your Code Here _____________ */

type FlattenDepth<L extends unknown[], Depth extends number = 1, CurrentDepthLevel extends number[] = []> =
  Depth extends CurrentDepthLevel['length']
    ? L
    : L extends [infer A, ...infer Rest]
      ? A extends unknown[]
        ? [...FlattenDepth<A, Depth, [...CurrentDepthLevel, 0]>, ...FlattenDepth<Rest, Depth, CurrentDepthLevel>]
        : [A, ...FlattenDepth<Rest, Depth, CurrentDepthLevel>]
      : L

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<FlattenDepth<[]>, []>>,
  Expect<Equal<FlattenDepth<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<FlattenDepth<[1, [2]]>, [1, 2]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, [[5]]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 3>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 19260817>, [1, 2, 3, 4, 5]>>,
]
