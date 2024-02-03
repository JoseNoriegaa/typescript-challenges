/**
 * 545 - printf
 *
 * Implement `Format<T extends string>` generic.
 *
 * For example,
 *
 * ```ts
 * type FormatCase1 = Format<"%sabc"> // FormatCase1 : string => string
 * type FormatCase2 = Format<"%s%dabc"> // FormatCase2 : string => number => string
 * type FormatCase3 = Format<"sdabc"> // FormatCase3 :  string
 * type FormatCase4 = Format<"sd%abc"> // FormatCase4 :  string
 * ```
 *
 *
 * <!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://tsch.js.org/545/answer" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://tsch.js.org/545/solutions" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->
 */

/* _____________ Your Code Here _____________ */

type Format<T extends string> = any

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Format<'abc'>, string>>,
  Expect<Equal<Format<'a%sbc'>, (s1: string) => string>>,
  Expect<Equal<Format<'a%dbc'>, (d1: number) => string>>,
  Expect<Equal<Format<'a%%dbc'>, string>>,
  Expect<Equal<Format<'a%%%dbc'>, (d1: number) => string>>,
  Expect<Equal<Format<'a%dbc%s'>, (d1: number) => (s1: string) => string>>,
]
