/**
 * 30575 - BitwiseXOR
 *
 * Implement ```BitwiseXOR<S1,S2>``` which takes two binary string literal type and returns a binary string that reprents the bitwise XOR of S1 and S2
 *
 * For example:
 *
 * ```typescript
 * BitwiseXOR<'0','1'> // expect '1'
 * BitwiseXOR<'1','1'> // expect '0'
 * BitwiseXOR<'10','1'>  // expect '11'
 * ```
 *
 */

/* _____________ Your Code Here _____________ */

type ReverseStr<S> = S extends `${infer A}${infer Rest}`
  ? `${ReverseStr<Rest>}${A}`
  : S;

type Aux<
  S1R extends string,
  S2R extends string,
> = S1R extends ''
  ? S2R
  : S2R extends ''
    ? S1R
    : [S1R, S2R] extends [`${infer Bit1}${infer Rest1}`, `${infer Bit2}${infer Rest2}`]
      ? [Bit1, Bit2] extends [Bit2, Bit1]
        ? `0${Aux<Rest1, Rest2>}`
        : `1${Aux<Rest1, Rest2>}`
      : never;

type BitwiseXOR<
  S1 extends string,
  S2 extends string
> = ReverseStr<Aux<ReverseStr<S1>, ReverseStr<S2>>>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<BitwiseXOR<'0', '1'>, '1'>>,
  Expect<Equal<BitwiseXOR<'1', '1'>, '0'>>,
  Expect<Equal<BitwiseXOR<'10', '1'>, '11'>>,
  Expect<Equal<BitwiseXOR<'110', '1'>, '111'>>,
  Expect<Equal<BitwiseXOR<'101', '11'>, '110'>>,
]
