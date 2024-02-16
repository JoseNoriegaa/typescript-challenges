/**
 * 8804 - Two Sum
 *
 * Given an array of integers `nums` and an integer `target`, return true if two numbers such that they add up to `target`.
 *
 * For example
 *
 * ```ts
 * type sum1 = TwoSum<[3, 2, 4], 6> // true
 * type sum2 = TwoSum<[2, 7, 11, 15], 15> // false
 * ```
 *
 */

/* _____________ Your Code Here _____________ */

type Range<N, O extends unknown[] = []> = N extends O['length']
  ? O
  : Range<N, [...O, 0]>

type Sum<A, B> = [...Range<A>, ...Range<B>]['length'];

type TwoSum<
  T extends number[],
  U extends number,
  P1 extends unknown[] = [],
  P2 extends unknown[] = [0],
> = T['length'] extends P2['length']
  ? false
  : Sum<T[P1['length']], T[P2['length']]> extends U
    ? true
    : TwoSum<T, U, P1, [...P2, 0]> extends true
      ? true
      : TwoSum<T, U, [...P1, 0], [...P1, 0, 0]>

type R = TwoSum<[3, 0, 3], 6>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<TwoSum<[3, 3], 6>, true>>,
  Expect<Equal<TwoSum<[3, 2, 4], 6>, true>>,
  Expect<Equal<TwoSum<[2, 7, 11, 15], 15>, false>>,
  Expect<Equal<TwoSum<[2, 7, 11, 15], 9>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 0>, false>>,
  Expect<Equal<TwoSum<[1, 2, 3], 1>, false>>,
  Expect<Equal<TwoSum<[1, 2, 3], 2>, false>>,
  Expect<Equal<TwoSum<[1, 2, 3], 3>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 4>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 5>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 6>, false>>,
  Expect<Equal<TwoSum<[3, 2, 0], 2>, true>>,
]
