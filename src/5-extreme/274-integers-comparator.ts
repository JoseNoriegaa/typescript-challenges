/**
 * 274 - Integers Comparator
 *
 * Implement a type-level integers comparator. We've provided an enum for indicating the comparison result, like this:
 *
 * - If `a` is greater than `b`, type should be `Comparison.Greater`.
 * - If `a` and `b` are equal, type should be `Comparison.Equal`.
 * - If `a` is lower than `b`, type should be `Comparison.Lower`.
 *
 * **Note that `a` and `b` can be positive integers or negative integers or zero, even one is positive while another one is negative.**
 *
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

type GreaterThan<T extends number, U extends number> = [SplitByDigit<T>, SplitByDigit<U>] extends [infer ADigits extends number[], infer BDigits extends number[]]
  ? ComputeGreaterThan<FillDigits<ADigits, BDigits['length']>, FillDigits<BDigits, ADigits['length']>>
  : never

type NumberSymbol<A extends number> = `${A}` extends `${infer S}${string}`
  ? S extends '-'
    ? '-'
    : '+'
  : never

enum Comparison {
  Greater,
  Equal,
  Lower,
}

type Comparator<A extends number, B extends number> = MyEqual<A, B> extends true
  ? Comparison.Equal
  : [NumberSymbol<A>, NumberSymbol<B>] extends [infer ASymbol, infer BSymbol]
    ? [ASymbol, BSymbol] extends ['-', '+']
      ? Comparison.Lower
      : [ASymbol, BSymbol] extends ['+', '-']
        ? Comparison.Greater
        : [`${A}`, `${B}`] extends [`-${infer AbsA extends number}`, `-${infer AbsB extends number}`]
          ? GreaterThan<AbsA, AbsB> extends true
            ? Comparison.Lower
            : Comparison.Greater
          : GreaterThan<A, B> extends true
            ? Comparison.Greater
            : Comparison.Lower
    : never

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Comparator<5, 5>, Comparison.Equal>>,
  Expect<Equal<Comparator<5, 6>, Comparison.Lower>>,
  Expect<Equal<Comparator<5, 8>, Comparison.Lower>>,
  Expect<Equal<Comparator<5, 0>, Comparison.Greater>>,
  Expect<Equal<Comparator<-5, 0>, Comparison.Lower>>,
  Expect<Equal<Comparator<0, 0>, Comparison.Equal>>,
  Expect<Equal<Comparator<0, -5>, Comparison.Greater>>,
  Expect<Equal<Comparator<5, -3>, Comparison.Greater>>,
  Expect<Equal<Comparator<5, -7>, Comparison.Greater>>,
  Expect<Equal<Comparator<-5, -7>, Comparison.Greater>>,
  Expect<Equal<Comparator<-5, -3>, Comparison.Lower>>,
  Expect<Equal<Comparator<-25, -30>, Comparison.Greater>>,
  Expect<Equal<Comparator<15, -23>, Comparison.Greater>>,
  Expect<Equal<Comparator<40, 37>, Comparison.Greater>>,
  Expect<Equal<Comparator<-36, 36>, Comparison.Lower>>,
  Expect<Equal<Comparator<27, 27>, Comparison.Equal>>,
  Expect<Equal<Comparator<-38, -38>, Comparison.Equal>>,

  Expect<Equal<Comparator<1, 100>, Comparison.Lower>>,
  Expect<Equal<Comparator<100, 1>, Comparison.Greater>>,
  Expect<Equal<Comparator<-100, 1>, Comparison.Lower>>,
  Expect<Equal<Comparator<1, -100>, Comparison.Greater>>,
  Expect<Equal<Comparator<-100, -1>, Comparison.Lower>>,
  Expect<Equal<Comparator<-1, -100>, Comparison.Greater>>,

  // Extra tests if you like to challenge yourself!
  Expect<Equal<Comparator<9007199254740992, 9007199254740992>, Comparison.Equal>>,
  Expect<Equal<Comparator<-9007199254740992, -9007199254740992>, Comparison.Equal>>,
  Expect<Equal<Comparator<9007199254740991, 9007199254740992>, Comparison.Lower>>,
  Expect<Equal<Comparator<9007199254740992, 9007199254740991>, Comparison.Greater>>,
  Expect<Equal<Comparator<-9007199254740992, -9007199254740991>, Comparison.Lower>>,
  Expect<Equal<Comparator<-9007199254740991, -9007199254740992>, Comparison.Greater>>,
]
