/**
 * 476 - Sum
 *
 * Implement a type `Sum<A, B>` that summing two non-negative integers and returns the sum as a string. Numbers can be specified as a string, number, or bigint.
 *
 * For example,
 *
 * ```ts
 * type T0 = Sum<2, 3> // '5'
 * type T1 = Sum<'13', '21'> // '34'
 * type T2 = Sum<'328', 7> // '335'
 * type T3 = Sum<1_000_000_000_000n, '123'> // '1000000000123'
 * ```
 *
 */

/* _____________ Your Code Here _____________ */
type NumberLike = `${number}` | number | bigint;

type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

type SumMod10LookUpTable = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
  [2, 3, 4, 5, 6, 7, 8, 9, 0, 1],
  [3, 4, 5, 6, 7, 8, 9, 0, 1, 2],
  [4, 5, 6, 7, 8, 9, 0, 1, 2, 3],
  [5, 6, 7, 8, 9, 0, 1, 2, 3, 4],
  [6, 7, 8, 9, 0, 1, 2, 3, 4, 5],
  [7, 8, 9, 0, 1, 2, 3, 4, 5, 6],
  [8, 9, 0, 1, 2, 3, 4, 5, 6, 7],
  [9, 0, 1, 2, 3, 4, 5, 6, 7, 8],
];

type CarryTenLookUpTable = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

type ToString<T extends NumberLike> = `${T}`;

type SplitStrNumber<T extends string> = T extends `${infer A extends Digit}${infer R}`
  ? [A, ...SplitStrNumber<R>]
  : [];

type SumTuple<
  A extends Digit[],
  B extends Digit[],
> = [A, B] extends [[...infer ARest extends Digit[], infer ADigit extends Digit], [...infer BRest extends Digit[], infer BDigit extends Digit]]
  ? CarryTenLookUpTable[ADigit][BDigit] extends 1
    ? [
          ...SumTuple<ARest, SumTuple<BRest, [1]>>,
            SumMod10LookUpTable[ADigit][BDigit]
      ]
    : [
        ...SumTuple<ARest, BRest>,
        SumMod10LookUpTable[ADigit][BDigit]
    ]
  : A extends []
    ? B
    : A;

type Join<L extends unknown[]> = L extends [infer A extends Digit, ...infer R]
  ? `${A}${Join<R>}`
  : '';

type Sum<
  A extends NumberLike,
  B extends NumberLike,
> =
  Join<
    SumTuple<
      SplitStrNumber<ToString<A>>,
      SplitStrNumber<ToString<B>>
    >
  >;

/* _____________ Test Cases _____________ */
import type { Debug, Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Sum<2, 3>, '5'>>,
  Expect<Equal<Sum<'13', '21'>, '34'>>,
  Expect<Equal<Sum<'328', 7>, '335'>>,
  Expect<Equal<Sum<1_000_000_000_000n, '123'>, '1000000000123'>>,
  Expect<Equal<Sum<9999, 1>, '10000'>>,
  Expect<Equal<Sum<4325234, '39532'>, '4364766'>>,
  Expect<Equal<Sum<728, 0>, '728'>>,
  Expect<Equal<Sum<'0', 213>, '213'>>,
  Expect<Equal<Sum<0, '0'>, '0'>>,
]
