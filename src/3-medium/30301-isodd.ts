/**
 * 30301 - IsOdd
 *
 * return true is a number is odd
 *
 *
 */

/* _____________ Your Code Here _____________ */

type Split<S, C extends string = '', T extends (string | number | boolean)= string> = S extends `${infer A extends T}${C}${infer B}`
  ? [A, ...Split<B, C, T>]
  : []

type GetLastDigit<T extends number> = Split<`${T}`, '', number> extends infer L
  ? L extends [...infer R, infer Last]
    ? Last
    : never
  : never

type IsOdd<T extends number> = GetLastDigit<T> extends (1 | 3 | 5 | 7 | 9)
  ? true
  : false

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<IsOdd<2023>, true>>,
  Expect<Equal<IsOdd<1453>, true>>,
  Expect<Equal<IsOdd<1926>, false>>,
  Expect<Equal<IsOdd<number>, false>>,
]
