/**
 * 89 - Required Keys
 *
 * Implement the advanced util type `RequiredKeys<T>`, which picks all the required keys into a union.
 *
 * For example
 *
 * ```ts
 * type Result = RequiredKeys<{ foo: number; bar?: string }>;
 * // expected to be “foo”
 * ```
 *
 *
 * <!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://tsch.js.org/89/answer" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://tsch.js.org/89/solutions" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <hr><h3>Related Challenges</h3><a href="https://github.com/type-challenges/type-challenges/blob/main/questions/00005-extreme-readonly-keys/README.md" target="_blank"><img src="https://img.shields.io/badge/-5%E3%83%BBGet%20Readonly%20Keys-b11b8d" alt="5・Get Readonly Keys"/></a> <!--info-footer-end-->
 */

/* _____________ Your Code Here _____________ */

type RequiredKeys<T> = any

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<RequiredKeys<{ a: number, b?: string }>, 'a'>>,
  Expect<Equal<RequiredKeys<{ a: undefined, b?: undefined }>, 'a'>>,
  Expect<Equal<RequiredKeys<{ a: undefined, b?: undefined, c: string, d: null }>, 'a' | 'c' | 'd'>>,
  Expect<Equal<RequiredKeys<{}>, never>>,
]
