/**
 * 9898 - Appear only once
 *
 * Find the elements in the target array that appear only once.
 *
 * For example：input: `[1,2,2,3,3,4,5,6,6,6]`，ouput: `[1,4,5]`.
 *
 */

/* _____________ Your Code Here _____________ */

type FindEles<
  T extends any[],
  Past extends unknown[] = [],
  O extends unknown[] = []
> = T extends [infer A, ...infer R]
  ? A extends Past[number]
    ? FindEles<R, [...Past, A], O>
    : A extends R[number]
      ? FindEles<R, [...Past, A], O>
      : FindEles<R, [...Past, A], [...O, A]>
  : O

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<FindEles<[1, 2, 2, 3, 3, 4, 5, 6, 6, 6]>, [1, 4, 5]>>,
  Expect<Equal<FindEles<[2, 2, 3, 3, 6, 6, 6]>, []>>,
  Expect<Equal<FindEles<[1, 2, 3]>, [1, 2, 3]>>,
]
