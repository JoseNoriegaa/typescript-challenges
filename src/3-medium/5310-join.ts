/**
 * 5310 - Join
 *
 * Implement the type version of Array.join, Join<T, U> takes an Array T, string or number U and returns the Array T with U stitching up.
 *
 * ```ts
 * type Res = Join<["a", "p", "p", "l", "e"], "-">; // expected to be 'a-p-p-l-e'
 * type Res1 = Join<["Hello", "World"], " ">; // expected to be 'Hello World'
 * type Res2 = Join<["2", "2", "2"], 1>; // expected to be '21212'
 * type Res3 = Join<["o"], "u">; // expected to be 'o'
 * ```
 */

/* _____________ Your Code Here _____________ */

type Join<T extends string[], U extends string> = T extends [infer A extends string, ...infer Rest extends [string, ...string[]]]
  ? `${A}${U}${Join<Rest, U>}`
  : T['length'] extends 0
    ? ''
    : T[0];

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Join<['a', 'p', 'p', 'l', 'e'], '-'>, 'a-p-p-l-e'>>,
  Expect<Equal<Join<['Hello', 'World'], ' '>, 'Hello World'>>,
  Expect<Equal<Join<['2', '2', '2'], 1>, '21212'>>,
  Expect<Equal<Join<['o'], 'u'>, 'o'>>,
  Expect<Equal<Join<[], 'u'>, ''>>,
]
