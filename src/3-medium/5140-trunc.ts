/**
 * 5140 - Trunc
 *
 * Implement the type version of ```Math.trunc```, which takes string or number and returns the integer part of a number by removing any fractional digits.
 *
 * For example:
 *
 * ```typescript
 * type A = Trunc<12.34> // 12
 * ```
 */

/* _____________ Your Code Here _____________ */

type Trunc<S extends (string | number)> = `${S}` extends infer Input
  ? Input extends `.${string}`
    ? '0'
    : Input extends `${infer N extends number}.${string}`
      ? `${N}`
      : Input
  : never;

type A = Trunc<12.345>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Trunc<0.1>, '0'>>,
  Expect<Equal<Trunc<0.2>, '0'>>,
  Expect<Equal<Trunc<1.234>, '1'>>,
  Expect<Equal<Trunc<12.345>, '12'>>,
  Expect<Equal<Trunc<-5.1>, '-5'>>,
  Expect<Equal<Trunc<'.3'>, '0'>>,
  Expect<Equal<Trunc<'1.234'>, '1'>>,
  Expect<Equal<Trunc<'-10.234'>, '-10'>>,
  Expect<Equal<Trunc<10>, '10'>>,
]
