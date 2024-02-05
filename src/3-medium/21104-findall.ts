/**
 * 21104 - FindAll
 *
 * Given a pattern string P and a text string T, implement the type `FindAll<T, P>` that returns an Array that contains all indices (0-indexed) from T where P matches.
 *
 */

/* _____________ Your Code Here _____________ */

type StartsWith<S extends string, T extends string> = S extends `${T}${string}` ? true : false;

type FindAll<
  T extends string,
  P extends string,
  Index extends number[] = [],
  O extends number[] = []
> = T extends ''
  ? O
  : P extends ''
    ? O
    : T extends `${infer A}${infer B}`
      ? StartsWith<T, P> extends true
        ? FindAll<B, P, [...Index, 0], [...O, Index['length']]>
        : FindAll<B, P, [...Index, 0], O>
      : never;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<FindAll<'Collection of TypeScript type challenges', 'Type'>, [14]>>,
  Expect<Equal<FindAll<'Collection of TypeScript type challenges', 'pe'>, [16, 27]>>,
  Expect<Equal<FindAll<'Collection of TypeScript type challenges', ''>, []>>,
  Expect<Equal<FindAll<'', 'Type'>, []>>,
  Expect<Equal<FindAll<'', ''>, []>>,
  Expect<Equal<FindAll<'AAAA', 'A'>, [0, 1, 2, 3]>>,
  Expect<Equal<FindAll<'AAAA', 'AA'>, [0, 1, 2]>>,
]
