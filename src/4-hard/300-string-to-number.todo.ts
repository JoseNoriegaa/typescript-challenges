/**
 * 300 - String to Number
 *
 * Convert a string literal to a number, which behaves like `Number.parseInt`.
 *
 *
 * ```
 */

/* _____________ Your Code Here _____________ */

type ToNumber<S extends string> = any

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<ToNumber<'0'>, 0>>,
  Expect<Equal<ToNumber<'5'>, 5>>,
  Expect<Equal<ToNumber<'12'>, 12>>,
  Expect<Equal<ToNumber<'27'>, 27>>,
  Expect<Equal<ToNumber<'18@7_$%'>, never>>,
]
