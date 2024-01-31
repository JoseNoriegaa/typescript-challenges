/**
 * 90 - Optional Keys
 *
 * Implement the advanced util type `OptionalKeys<T>`, which picks all the optional keys into a union.
 *
 *
 * <!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://tsch.js.org/90/answer" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://tsch.js.org/90/solutions" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <hr><h3>Related Challenges</h3><a href="https://github.com/type-challenges/type-challenges/blob/main/questions/00089-hard-required-keys/README.md" target="_blank"><img src="https://img.shields.io/badge/-89%E3%83%BBRequired%20Keys-de3d37" alt="89・Required Keys"/></a>  <a href="https://github.com/type-challenges/type-challenges/blob/main/questions/00005-extreme-readonly-keys/README.md" target="_blank"><img src="https://img.shields.io/badge/-5%E3%83%BBGet%20Readonly%20Keys-b11b8d" alt="5・Get Readonly Keys"/></a> <!--info-footer-end-->
 * ```
 */

/* _____________ Your Code Here _____________ */

type OptionalKeys<T> = any

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<OptionalKeys<{ a: number, b?: string }>, 'b'>>,
  Expect<Equal<OptionalKeys<{ a: undefined, b?: undefined }>, 'b'>>,
  Expect<Equal<OptionalKeys<{ a: undefined, b?: undefined, c?: string, d?: null }>, 'b' | 'c' | 'd'>>,
  Expect<Equal<OptionalKeys<{}>, never>>,
]
