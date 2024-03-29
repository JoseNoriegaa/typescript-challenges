/**
 * 25747 - IsNegativeNumber
 *
 * Sometimes when working with numeric literals, we need to rule out (or enforce) that the provided number is a positive integer.
 * 
 * To do that, we first need a way to tell if the number is negative.
 * 
 * Write a type-level function `IsNegativeNumber` that accepts a number `N` and returns:
 * 
 * - `true` if `N` is negative
 * - `false` if `N` is positive
 * - `false` if `N` is `0`, 
 * - `never` if `N` is `number`
 * - `never` if `N` is a union
 *
 *
 */

/* _____________ Your Code Here _____________ */

type IsUnion<T, U = T> = T extends unknown
  ? [U] extends [T]
    ? false
    : true
  : never;

type IsNegativeNumber<T extends number> = number extends T
  ? never
  : IsUnion<T> extends true
    ? never
    : `${T}` extends `-${number}`
      ? true
      : false;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<IsNegativeNumber<0>, false>>,
  Expect<Equal<IsNegativeNumber<number>, never>>,
  Expect<Equal<IsNegativeNumber<-1 | -2>, never>>,
  Expect<Equal<IsNegativeNumber<-1>, true>>,
  Expect<Equal<IsNegativeNumber<-1.9>, true>>,
  Expect<Equal<IsNegativeNumber<-100_000_000>, true>>,
  Expect<Equal<IsNegativeNumber<1>, false>>,
  Expect<Equal<IsNegativeNumber<1.9>, false>>,
  Expect<Equal<IsNegativeNumber<100_000_000>, false>>,
]
