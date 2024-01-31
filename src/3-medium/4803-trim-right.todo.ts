/**
 * 4803 - Trim Right
 *
 * Implement `TrimRight<T>` which takes an exact string type and returns a new string with the whitespace ending removed.
 *
 * For example:
 *
 * ```ts
 * type Trimed = TrimRight<'   Hello World    '> // expected to be '   Hello World'
 * ```
 */

/* _____________ Your Code Here _____________ */

type TrimRight<S extends string> = any

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<TrimRight<'str'>, 'str'>>,
  Expect<Equal<TrimRight<'str '>, 'str'>>,
  Expect<Equal<TrimRight<'str     '>, 'str'>>,
  Expect<Equal<TrimRight<'     str     '>, '     str'>>,
  Expect<Equal<TrimRight<'   foo bar  \n\t '>, '   foo bar'>>,
  Expect<Equal<TrimRight<''>, ''>>,
  Expect<Equal<TrimRight<'\n\t '>, ''>>,
]
