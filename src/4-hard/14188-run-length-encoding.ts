/**
 * 14188 - Run-length encoding
 *
 * Given a `string` sequence of a letters f.e. `AAABCCXXXXXXY`. Return run-length encoded string `3AB2C6XY`.
 * Also make a decoder for that string.
 *
 *
 */

/* _____________ Your Code Here _____________ */

namespace RLE {

  type EncodingOutput<
    T extends string[][],
    O extends string = ''
  > = T extends [infer A extends string[], ...infer Rest extends string[][]]
    ? EncodingOutput<Rest, `${O}${A['length'] extends 1 ? '' : A['length']}${A[0]}`>
    : O;

  export type Encode<
    S extends string,
    O extends string[][] = []
  > = S extends ''
    ? EncodingOutput<O>
    : S extends `${infer A}${infer Rest}`
      ? O extends [...infer Items extends string[][], infer L extends string[]]
        ? A extends L[number]
          ? Encode<Rest, [...Items, [...L, A]]>
          : Encode<Rest, [...O, [A]]>
        : Encode<Rest, [...O, [A]]>
      : never;

  export type Decode<
    S extends string,
    Char extends string = '',
    Repeat extends number = 0,
    C extends unknown[] = [],
    O extends string = ''
  > = Char extends ''
    ? S extends `${infer A extends number}${infer L}${infer Rest}`
      ? Decode<Rest, L, A, [], O>
      : S extends `${infer L}${infer Rest}`
        ? Decode<Rest, '', 0, [], `${O}${L}`>
        : O
    : C['length'] extends Repeat
      ? Decode<S, '', 0, C, O>
      : Decode<S, Char, Repeat, [...C, 0], `${O}${Char}`>
}

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  // Raw string -> encoded string
  Expect<Equal<RLE.Encode<'AAABCCXXXXXXY'>, '3AB2C6XY'>>,

  // Encoded string -> decoded string
  Expect<Equal<RLE.Decode<'3AB2C6XY'>, 'AAABCCXXXXXXY'>>,
]
