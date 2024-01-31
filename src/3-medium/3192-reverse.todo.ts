/**
 * 3192 - Reverse
 *
 * Implement the type version of ```Array.reverse```
 *
 * For example:
 *
 * ```typescript
 * type a = Reverse<['a', 'b']> // ['b', 'a']
 * type b = Reverse<['a', 'b', 'c']> // ['c', 'b', 'a']
 * ```
 */

/* _____________ Your Code Here _____________ */

type Reverse<T> = any

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Reverse<[]>, []>>,
  Expect<Equal<Reverse<['a', 'b']>, ['b', 'a']>>,
  Expect<Equal<Reverse<['a', 'b', 'c']>, ['c', 'b', 'a']>>,
]

type errors = [
  // @ts-expect-error
  Reverse<'string'>,
  // @ts-expect-error
  Reverse<{ key: 'value' }>,
]
