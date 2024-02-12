/**
 * 4037 - IsPalindrome
 *
 * Implement type ```IsPalindrome<T>``` to check whether  a string or number is palindrome.
 *
 * For example:
 *
 * ```typescript
 * IsPalindrome<'abc'> // false
 * IsPalindrome<121> // true
 * ```
 *
 *
 */

/* _____________ Your Code Here _____________ */

type Split<S extends string> = S extends `${infer A}${infer R}`
  ? [A, ...Split<R>]
  : [];

type Reverse<L extends unknown[]> = L extends [...infer R, infer L]
  ? [L, ...Reverse<R>]
  : []

type IsPalindrome<T extends number | string> = Split<`${T}`> extends infer Chars extends string[]
  ? Chars extends Reverse<Chars>
    ? true
    : false
  : never

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<IsPalindrome<'abc'>, false>>,
  Expect<Equal<IsPalindrome<'b'>, true>>,
  Expect<Equal<IsPalindrome<'abca'>, false>>,
  Expect<Equal<IsPalindrome<'abba'>, true>>,
  Expect<Equal<IsPalindrome<'abcba'>, true>>,
  Expect<Equal<IsPalindrome<121>, true>>,
  Expect<Equal<IsPalindrome<2332>, true>>,
  Expect<Equal<IsPalindrome<19260817>, false>>,
]
