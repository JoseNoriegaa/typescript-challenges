/**
 * 57 - Get Required
 *
 * Implement the advanced util type `GetRequired<T>`, which remains all the required fields
 *
 * For example
 *
 * ```ts
 * type I = GetRequired<{ foo: number, bar?: string }> // expected to be { foo: number }
 * ```
 */

/* _____________ Your Code Here _____________ */

type GetRequired<
  T extends Record<string, unknown>,
  K extends keyof T = keyof T,
  F extends Required<T> = Required<T>
> = {
  [Key in K as T[Key] extends F[Key] ? Key : never]: T[Key];
}

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<GetRequired<{ foo: number, bar?: string }>, { foo: number }>>,
  Expect<Equal<GetRequired<{ foo: undefined, bar?: undefined }>, { foo: undefined }>>,
]
