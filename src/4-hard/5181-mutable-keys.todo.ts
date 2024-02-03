/**
 * 5181 - Mutable Keys
 *
 * Implement the advanced util type MutableKeys<T>, which picks all the mutable (not readonly) keys into a union.
 *
 * For example:
 *
 * ```ts
 * type Keys = MutableKeys<{ readonly foo: string; bar: number }>;
 * // expected to be “bar”
 * ```
 *
 *
 * <!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://tsch.js.org/5181/answer" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://tsch.js.org/5181/solutions" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <hr><h3>Related Challenges</h3><a href="https://github.com/type-challenges/type-challenges/blob/main/questions/02793-medium-mutable/README.md" target="_blank"><img src="https://img.shields.io/badge/-2793%E3%83%BBMutable-d9901a" alt="2793・Mutable"/></a> <!--info-footer-end-->
 */

/* _____________ Your Code Here _____________ */

type MutableKeys<T> = any

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<MutableKeys<{ a: number, readonly b: string }>, 'a'>>,
  Expect<Equal<MutableKeys<{ a: undefined, readonly b: undefined }>, 'a'>>,
  Expect<Equal<MutableKeys<{ a: undefined, readonly b?: undefined, c: string, d: null }>, 'a' | 'c' | 'd'>>,
  Expect<Equal<MutableKeys<{}>, never>>,
]
