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
 */

/* _____________ Your Code Here _____________ */

type RemoveDoubles<S extends string> = S extends `${infer A}%%${infer B}`
  ? `${A}${RemoveDoubles<B>}`
  : S;

type Aux<T extends string> = T extends `%s${infer Rest}`
  ? (arg: string) => Format<Rest>
  : T extends `%d${infer Rest}`
    ? (arg: number) => Format<Rest>
    : T extends `${infer A}${infer Rest}`
      ? Format<Rest>
      : string

type Format<T extends string> = Aux<RemoveDoubles<T>>

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
