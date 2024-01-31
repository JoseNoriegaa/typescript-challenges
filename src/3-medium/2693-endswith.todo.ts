/**
 * 2693 - EndsWith
 *
 * Implement `EndsWith<T, U>` which takes two exact string types and returns whether `T` ends with `U`
 *
 * For example:
 *
 * ```typescript
 * type a = EndsWith<'abc', 'bc'> // expected to be true
 * type b = EndsWith<'abc', 'abc'> // expected to be true
 * type c = EndsWith<'abc', 'd'> // expected to be false
 * ```
 */

/* _____________ Your Code Here _____________ */

type EndsWith<T extends string, U extends string> = any

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<EndsWith<'abc', 'bc'>, true>>,
  Expect<Equal<EndsWith<'abc', 'abc'>, true>>,
  Expect<Equal<EndsWith<'abc', 'd'>, false>>,
  Expect<Equal<EndsWith<'abc', 'ac'>, false>>,
  Expect<Equal<EndsWith<'abc', ''>, true>>,
  Expect<Equal<EndsWith<'abc', ' '>, false>>,
]
