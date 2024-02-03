/**
 * 4425 - Greater Than
 *
 * In This Challenge, You should implement a type `GreaterThan<T, U>` like `T > U`
 *
 * Negative numbers do not need to be considered.
 *
 * For example
 *
 * ```ts
 * GreaterThan<2, 1> //should be true
 * GreaterThan<1, 1> //should be false
 * GreaterThan<10, 100> //should be false
 * GreaterThan<111, 11> //should be true
 * ```
 *
 */

/* _____________ Your Code Here _____________ */

type MyEqual<A, B> =
  (<T>() => T extends A ? 1 : 0) extends
  (<T>() => T extends B ? 1 : 0) ? true : false;

type GreaterThanSingleDigit<A extends number, B extends number, C extends unknown[] = []> = C['length'] extends A
  ? false
  : C['length'] extends B
    ? true
    : GreaterThanSingleDigit<A, B, [...C, 0]>

type SplitByDigit<T extends (string | number)> = `${T}` extends `${infer N extends number}${infer R}`
  ? [N, ...SplitByDigit<R>]
  : []

type FillDigits<A extends unknown[], L extends number> = GreaterThanSingleDigit<L, A['length']> extends true
  ? FillDigits<[0, ...A], L>
  : A;

type ComputeGreaterThan<ADigits extends unknown[], BDigits extends unknown[]> =
  [ADigits, BDigits] extends [[infer A extends number, ...infer ARest], [infer B extends number, ...infer BRest]]
    ? MyEqual<A, B> extends true
      ? ComputeGreaterThan<ARest, BRest>
      : GreaterThanSingleDigit<A, B> extends true
        ? true
        : false
  : false

type GreaterThan<T extends number, U extends number> = SplitByDigit<T> extends infer ADigits extends number[]
  ? SplitByDigit<U> extends infer BDigits extends number[]
    ? ComputeGreaterThan<FillDigits<ADigits, BDigits['length']>, FillDigits<BDigits, ADigits['length']>>
    : never
  : never

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<GreaterThan<1, 0>, true>>,
  Expect<Equal<GreaterThan<5, 4>, true>>,
  Expect<Equal<GreaterThan<4, 5>, false>>,
  Expect<Equal<GreaterThan<0, 0>, false>>,
  Expect<Equal<GreaterThan<10, 9>, true>>,
  Expect<Equal<GreaterThan<20, 20>, false>>,
  Expect<Equal<GreaterThan<10, 100>, false>>,
  Expect<Equal<GreaterThan<111, 11>, true>>,
  Expect<Equal<GreaterThan<1234567891011, 1234567891010>, true>>,
]
