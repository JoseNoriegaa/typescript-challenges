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
