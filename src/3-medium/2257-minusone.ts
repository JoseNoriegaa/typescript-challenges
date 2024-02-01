/**
 * 2257 - MinusOne
 *
 * Given a number (always positive) as a type. Your type should return the number decreased by one.
 *
 * For example:
 *
 * ```ts
 * type Zero = MinusOne<1> // 0
 * type FiftyFour = MinusOne<55> // 54
 * ```
 */

/* _____________ Your Code Here _____________ */

type MinusTable = {
  '0': '9',
  '1': '0',
  '2': '1',
  '3': '2',
  '4': '3',
  '5': '4',
  '6': '5',
  '7': '6',
  '8': '7',
  '9': '8',
}

type Split<S extends string> = S extends `${infer A}${infer B}`
  ? [A, ...Split<B>]
  : [];

type ArrayMinusOne<L extends string[]> = L extends [...infer A extends string[], infer L extends `${number}`]
  ? L extends keyof MinusTable
    ? MinusTable[L] extends infer Value
      ? Value extends '9'
        ? [...ArrayMinusOne<A>, Value]
        : [...A, Value]
      : never
    : never
  : L

type JoinListNumberToStr<L extends string[], Flag extends boolean = false> = L extends [infer A extends string, ...infer B extends string[]]
  ? [A, Flag] extends ['0', false]
    ? JoinListNumberToStr<B, Flag>
    : `${A}${JoinListNumberToStr<B, true>}`
  : ``;

type StringToNumber<S extends string> = S extends `${infer A extends number}`
  ? A
  : undefined;

type MinusOne<T extends number> =
  T extends 0
    ? -1
    : ArrayMinusOne<Split<`${T}`>> extends infer NumAsArr extends string[]
      ? NumAsArr['length'] extends 1
        ? StringToNumber<NumAsArr[0]>
        : StringToNumber<JoinListNumberToStr<NumAsArr>>
      : never;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<MinusOne<1>, 0>>,
  Expect<Equal<MinusOne<55>, 54>>,
  Expect<Equal<MinusOne<3>, 2>>,
  Expect<Equal<MinusOne<100>, 99>>,
  Expect<Equal<MinusOne<1101>, 1100>>,
  Expect<Equal<MinusOne<0>, -1>>,
  Expect<Equal<MinusOne<9_007_199_254_740_992>, 9_007_199_254_740_991>>,
]
