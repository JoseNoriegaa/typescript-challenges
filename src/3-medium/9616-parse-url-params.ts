/**
 * 9616 - Parse URL Params
 *
 * You're required to implement a type-level parser to parse URL params string into an Union.
 * 
 * ```ts
 * ParseUrlParams<':id'> // id
 * ParseUrlParams<'posts/:id'> // id
 * ParseUrlParams<'posts/:id/:user'> // id | user
 * ```
 *
 *
 */


/* _____________ Your Code Here _____________ */

type SplitBy<S extends string, SplitChar extends string> = S extends `${infer A}${SplitChar}${infer B}`
  ? [A, ...SplitBy<B, SplitChar>]
  : S extends ''
    ? []
    : [S]

type ExtractUrlParams<L extends string[]> = L extends [infer A, ...infer R extends string[]]
  ? A extends `:${infer Val}`
    ? Val | ExtractUrlParams<R>
    : ExtractUrlParams<R>
  : never;

type ParseUrlParams<T extends string> = ExtractUrlParams<SplitBy<T, '/'>>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<ParseUrlParams<''>, never>>,
  Expect<Equal<ParseUrlParams<':id'>, 'id'>>,
  Expect<Equal<ParseUrlParams<'posts/:id'>, 'id'>>,
  Expect<Equal<ParseUrlParams<'posts/:id/'>, 'id'>>,
  Expect<Equal<ParseUrlParams<'posts/:id/:user'>, 'id' | 'user'>>,
  Expect<Equal<ParseUrlParams<'posts/:id/:user/like'>, 'id' | 'user'>>,
]
