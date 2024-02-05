/**
 * 9142 - CheckRepeatedChars
 *
 * Implement type ```CheckRepeatedChars<S>``` which will return whether type ```S``` contains duplicated chars?
 *
 * For example:
 *
 * ```ts
 * type CheckRepeatedChars<'abc'>   // false
 * type CheckRepeatedChars<'aba'>   // true
 * ```
 *
 */

/* _____________ Your Code Here _____________ */

type CheckRepeatedChars<T extends string, Map extends Record<string, unknown> = {}> = T extends ''
  ? false
  : T extends `${infer Char}${infer Rest}`
    ? Char extends keyof Map
      ? true
      : CheckRepeatedChars<Rest, Map & { [K in Char]: true }>
    : false;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<CheckRepeatedChars<'abc'>, false>>,
  Expect<Equal<CheckRepeatedChars<'abb'>, true>>,
  Expect<Equal<CheckRepeatedChars<'cbc'>, true>>,
  Expect<Equal<CheckRepeatedChars<''>, false>>,
]
