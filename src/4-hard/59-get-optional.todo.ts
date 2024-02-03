/**
 * 59 - Get Optional
 *
 * Implement the advanced util type `GetOptional<T>`, which remains all the optional fields
 *
 * For example
 *
 * ```ts
 * type I = GetOptional<{ foo: number, bar?: string }> // expected to be { bar?: string }
 * ```
 *
 *
 * <!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://tsch.js.org/59/answer" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://tsch.js.org/59/solutions" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <hr><h3>Related Challenges</h3><a href="https://github.com/type-challenges/type-challenges/blob/main/questions/00057-hard-get-required/README.md" target="_blank"><img src="https://img.shields.io/badge/-57%E3%83%BBGet%20Required-de3d37" alt="57・Get Required"/></a> <!--info-footer-end-->
 */

/* _____________ Your Code Here _____________ */

type GetOptional<T> = any

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<GetOptional<{ foo: number, bar?: string }>, { bar?: string }>>,
  Expect<Equal<GetOptional<{ foo: undefined, bar?: undefined }>, { bar?: undefined }>>,
]
