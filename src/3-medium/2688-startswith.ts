/**
 * 2688 - StartsWith
 *
 * Implement `StartsWith<T, U>` which takes two exact string types and returns whether `T` starts with `U`
 *
 * For example
 *
 * ```typescript
 * type a = StartsWith<'abc', 'ac'> // expected to be false
 * type b = StartsWith<'abc', 'ab'> // expected to be true
 * type c = StartsWith<'abc', 'abcd'> // expected to be false
 * ```
 */

/* _____________ Your Code Here _____________ */

type StartsWith<T extends string, U extends string> = T extends `${U}${string}`
  ? true
  : false;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<StartsWith<'abc', 'ac'>, false>>,
  Expect<Equal<StartsWith<'abc', 'ab'>, true>>,
  Expect<Equal<StartsWith<'abc', 'abc'>, true>>,
  Expect<Equal<StartsWith<'abc', 'abcd'>, false>>,
  Expect<Equal<StartsWith<'abc', ''>, true>>,
  Expect<Equal<StartsWith<'abc', ' '>, false>>,
  Expect<Equal<StartsWith<'', ''>, true>>,
]
