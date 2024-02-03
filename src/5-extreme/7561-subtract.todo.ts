/**
 * 7561 - Subtract
 *
 * Implement the type Subtraction that is ` - ` in Javascript by using BuildTuple.
 *
 * If the minuend is less than the subtrahend, it should be `never`.
 *
 * It's a simple version.
 *
 * For example
 *
 * ```ts
 * Subtract<2, 1> // expect to be 1
 * Subtract<1, 2> // expect to be never
 * ```
 *
 *
 */

/* _____________ Your Code Here _____________ */

// M => minuend, S => subtrahend
type Subtract<M extends number, S extends number> = any

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Subtract<1, 1>, 0>>,
  Expect<Equal<Subtract<2, 1>, 1>>,
  Expect<Equal<Subtract<1, 2>, never>>,
  // @ts-expect-error
  Expect<Equal<Subtract<1000, 999>, 1>>,
]
