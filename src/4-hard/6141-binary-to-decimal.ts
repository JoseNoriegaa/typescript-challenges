/**
 * 6141 - Binary to Decimal
 *
 * Implement `BinaryToDecimal<S>` which takes an exact string type `S` consisting 0 and 1 and returns an exact number type corresponding with `S` when `S` is regarded as a binary.
 * You can assume that the length of `S` is equal to or less than 8 and `S` is not empty.
 *
 * ```ts
 * type Res1 = BinaryToDecimal<'10'>; // expected to be 2
 * type Res2 = BinaryToDecimal<'0011'>; // expected to be 3
 * ```
 *
 */

/* _____________ Your Code Here _____________ */
type Range<N extends number, O extends number[] = []> = N extends O['length']
  ? O
  : Range<N, [...O, O['length']]>;

type ReversedStrArray<S> = S extends `${infer A}${infer Rest}`
  ? [...ReversedStrArray<Rest>, A]
  : []

type BitToDecimalByIndex = {
  0: [1],
  1: Range<2>,
  2: Range<4>,
  3: Range<8>,
  4: Range<16>,
  5: Range<32>,
  6: Range<64>,
  7: Range<128>,
  8: Range<254>,
};

type BinaryToDecimal<
  S extends string,
  Bits extends string[] = ReversedStrArray<S>,
  C extends unknown[] = [],
  Acc extends unknown[] = [],
> = Bits extends [infer Bit, ...infer R extends string[]]
  ? Bit extends '1'
    ? C['length'] extends keyof BitToDecimalByIndex
      ? BinaryToDecimal<S, R, [...C, 0], [...Acc, ...BitToDecimalByIndex[C['length']]]>
      : never
    : BinaryToDecimal<S, R, [...C, 0], Acc>
  : Acc['length'];

  /* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<BinaryToDecimal<'10'>, 2>>,
  Expect<Equal<BinaryToDecimal<'0011'>, 3>>,
  Expect<Equal<BinaryToDecimal<'00000000'>, 0>>,
  Expect<Equal<BinaryToDecimal<'11111111'>, 255>>,
  Expect<Equal<BinaryToDecimal<'10101010'>, 170>>,
]
