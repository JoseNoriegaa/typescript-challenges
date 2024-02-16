/*
 * 216 - Slice
 *
 * Implement the JavaScript `Array.slice` function in the type system.
 *  `Slice<Arr, Start, End>` takes the three argument.
 *  The output should be a subarray of `Arr` from index `Start` to `End`.
 * Indexes with negative numbers should be counted from reversely.
 *
 * For example
 *
 * ```ts
 * type Arr = [1, 2, 3, 4, 5]
 * type Result = Slice<Arr, 2, 4> // expected to be [3, 4]
 * ```
 *
 */

/* _____________ Your Code Here _____________ */

type Range<N, O extends unknown[] = []> = N extends O['length']
  ? O
  : Range<N, [...O, O['length']]>

type IsNegative<N extends number> = `${N}` extends `-${number}` ? true : false;

type Abs<N extends number> = `${N}` extends `-${infer _N extends number}` ? _N : N;

type ConvertToPositivePosition<
  N,
  Len,
  P extends number[] = Range<Len>,
  C extends unknown[] = []
> = N extends [...C, 0]['length']
  ? P extends [...unknown[], infer L extends number]
    ? L
    : never
  : P extends [...infer R extends number[], unknown]
    ? ConvertToPositivePosition<N, Len, R, [...C, 0]>
    : never;

type Aux<
  Arr extends unknown[],
  Start,
  End,
  Append extends boolean = false,
  C extends unknown[] = [],
  O extends unknown[] = []
> = C['length'] extends End
? O
: [Append, Start] extends [false, C['length']]
  ? Aux<Arr, Start, End, true, C, O>
  : Arr extends [infer A, ...infer Rest]
    ? Append extends true
      ? Aux<Rest, Start, End, Append, [...C, 0], [...O, A]>
      : Aux<Rest, Start, End, Append, [...C, 0], O>
    : [];

type Slice<
  Arr extends unknown[],
  Start extends number = 0,
  End extends number = Arr['length'],
> = IsNegative<Start> extends true
  ? Slice<Arr, ConvertToPositivePosition<Abs<Start>, Arr['length']>, End>
  : IsNegative<End> extends true
    ? Slice<Arr, Start, ConvertToPositivePosition<Abs<End>, Arr['length']>>
    : Aux<Arr, Start, End>;

type R = Slice<Arr, 2, 4>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type Arr = [1, 2, 3, 4, 5]

type cases = [
  // basic
  Expect<Equal<Slice<Arr, 0, 1>, [1]>>,
  Expect<Equal<Slice<Arr, 0, 0>, []>>,
  Expect<Equal<Slice<Arr, 2, 4>, [3, 4]>>,

  // optional args
  Expect<Equal<Slice<[]>, []>>,
  Expect<Equal<Slice<Arr>, Arr>>,
  Expect<Equal<Slice<Arr, 0>, Arr>>,
  Expect<Equal<Slice<Arr, 2>, [3, 4, 5]>>,

  // negative index
  Expect<Equal<Slice<Arr, 0, -1>, [1, 2, 3, 4]>>,
  Expect<Equal<Slice<Arr, -3, -1>, [3, 4]>>,

  // invalid
  Expect<Equal<Slice<Arr, 10>, []>>,
  Expect<Equal<Slice<Arr, 1, 0>, []>>,
  Expect<Equal<Slice<Arr, 10, 20>, []>>,
]
