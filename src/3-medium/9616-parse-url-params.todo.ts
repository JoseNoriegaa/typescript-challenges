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
 */

/* _____________ Your Code Here _____________ */

type ParseUrlParams<T extends string> = any

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
