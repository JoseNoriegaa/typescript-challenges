/**
 * 517 - Multiply
 *
 * **This challenge continues from [476 - Sum](https://tsch.js.org/476), it is recommended that you finish that one first, and modify your code based on it to start this challenge.**
 *
 * Implement a type `Multiply<A, B>` that multiplies two non-negative integers and returns their product as a string. Numbers can be specified as string, number, or bigint.
 *
 * For example,
 *
 * ```ts
 * type T0 = Multiply<2, 3> // '6'
 * type T1 = Multiply<3, '5'> // '15'
 * type T2 = Multiply<'4', 10> // '40'
 * type T3 = Multiply<0, 16> // '0'
 * type T4 = Multiply<'13', '21'> // '273'
 * type T5 = Multiply<'43423', 321543n> // '13962361689'
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

type MultiplicationTable = [
  //  0    1    2    3    4    5    6    7    8    9
  [[0], [0], [0], [0], [0], [0], [0], [0], [0], [0]], // 0
  [[0], [1], [2], [3], [4], [5], [6], [7], [8], [9]], // 1
  [[0], [2], [4], [6], [8], [1,0], [1,2], [1,4], [1,6], [1,8]], // 2
  [[0], [3], [6], [9], [1,2], [1,5], [1,8], [2,1], [2,4], [2,7]], // 3
  [[0], [4], [8], [1,2], [1,6], [2,0], [2,4], [2,8], [3,2], [3,6]], // 4
  [[0], [5], [1,0], [1,5], [2,0], [2,5], [3,0], [3,5], [4,0], [4,5]], // 5
  [[0], [6], [1,2], [1,8], [2,4], [3,0], [3,6], [4,2], [4,8], [5,4]], // 6
  [[0], [7], [1,4], [2,1], [2,8], [3,5], [4,2], [4,9], [5,6], [6,3]], // 7
  [[0], [8], [1,6], [2,4], [3,2], [4,0], [4,8], [5,6], [6,4], [7,2]], // 8
  [[0], [9], [1,8], [2,7], [3,6], [4,5], [5,4], [6,3], [7,2], [8,1]], // 9
];

type ToString<T extends NumberLike> = `${T}`;

type SplitStrNumber<T extends string> = T extends `${infer A extends Digit}${infer R}`
  ? [A, ...SplitStrNumber<R>]
  : [];

type Join<L extends unknown[]> = L extends [infer A extends Digit, ...infer R]
  ? `${A}${Join<R>}`
  : '';

type MultiplyWithDigit<
  A extends Digit,
  TupleNum extends Digit[],
  Zeros extends 0[] = []
>
  = TupleNum extends [...infer Rest extends Digit[], infer B extends Digit]
    ? [[...MultiplicationTable[A][B], ...Zeros], ...MultiplyWithDigit<A, Rest, [...Zeros, 0]>]
    : []

type SumTupleNum<
  A extends Digit[],
  B extends Digit[],
> = [A, B] extends [[...infer AR extends Digit[], infer _A extends Digit], [...infer BR extends Digit[], infer _B extends Digit]]
  ? CarryTenLookUpTable[_A][_B] extends 1
    ? [...SumTupleNum<AR, SumTupleNum<BR,[1]>>, SumMod10LookUpTable[_A][_B]]
    : [...SumTupleNum<AR, BR>, SumMod10LookUpTable[_A][_B]]
  : A extends []
    ? B
    : A

type SumResult<
  L extends Digit[][],
  O extends Digit[] = [],
> = L extends [
  infer A extends Digit[],
  ...infer Rest extends Digit[][]
]
  ? O extends []
    ? SumResult<Rest, A>
    : SumResult<Rest, SumTupleNum<O, A>>
  : O

type MultiplyAux<
  A extends Digit[],
  B extends Digit[],
  Zeros extends 0[] = [],
> = B extends [...infer BR extends Digit[], infer _B extends Digit]
  ? [...MultiplyWithDigit<_B, A, Zeros>, ...MultiplyAux<A, BR, [...Zeros, 0]>]
  : [];

type RemoveLeadingZeros<
  L extends Digit[]
> = L extends [infer A extends Digit, ...infer R extends Digit[]]
  ? A extends 0
    ? R extends []
      ? [A]
      : RemoveLeadingZeros<R>
    : [A, ...R]
  : [];


type Multiply<
  A extends NumberLike,
  B extends NumberLike,
> =
  Join<
    RemoveLeadingZeros<
      SumResult<
        MultiplyAux<
          SplitStrNumber<ToString<A>>,
          SplitStrNumber<ToString<B>>
        >
      >
    >
  >

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Multiply<2, 3>, '6'>>,
  Expect<Equal<Multiply<3, '5'>, '15'>>,
  Expect<Equal<Multiply<'4', 10>, '40'>>,
  Expect<Equal<Multiply<0, 16>, '0'>>,
  Expect<Equal<Multiply<'13', '21'>, '273'>>,
  Expect<Equal<Multiply<'43423', 321543n>, '13962361689'>>,
  Expect<Equal<Multiply<9999, 1>, '9999'>>,
  Expect<Equal<Multiply<4325234, '39532'>, '170985150488'>>,
  Expect<Equal<Multiply<100_000n, '1'>, '100000'>>,
  Expect<Equal<Multiply<259, 9125385>, '2363474715'>>,
  Expect<Equal<Multiply<9, 99>, '891'>>,
  Expect<Equal<Multiply<315, '100'>, '31500'>>,
  Expect<Equal<Multiply<11n, 13n>, '143'>>,
  Expect<Equal<Multiply<728, 0>, '0'>>,
  Expect<Equal<Multiply<'0', 213>, '0'>>,
  Expect<Equal<Multiply<0, '0'>, '0'>>,
]
