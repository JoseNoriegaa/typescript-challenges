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
  export type Encode<S extends string> = any
  export type Decode<S extends string> = any
}

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  // Raw string -> encoded string
  Expect<Equal<RLE.Encode<'AAABCCXXXXXXY'>, '3AB2C6XY'>>,

  // Encoded string -> decoded string
  Expect<Equal<RLE.Decode<'3AB2C6XY'>, 'AAABCCXXXXXXY'>>,
]
