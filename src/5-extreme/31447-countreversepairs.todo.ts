/**
 * 31447 - CountReversePairs
 *
 * Given an integer array nums, return the number of reverse pairs in the array.
 * 
 * A reverse pair is a pair (i, j) where:
 * 
 * * 0 <= i < j < nums.length and
 * * nums[i] > nums[j].
 *
 *
 * ```
 */

/* _____________ Your Code Here _____________ */

type CountReversePairs<T extends number[]> = any

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<CountReversePairs<[5, 2, 6, 1]>, 4>>,
  Expect<Equal<CountReversePairs<[1, 2, 3, 4]>, 0>>,
  Expect<Equal<CountReversePairs<[-1, -1]>, 0>>,
  Expect<Equal<CountReversePairs<[-1]>, 0>>,
]
