/**
 * 43 - Exclude
 *
 * Implement the built-in `Exclude<T, U>`
 *
 * > Exclude from `T` those types that are assignable to `U`.
 *
 * For example:
 *
 * ```ts
 * type Result = MyExclude<'a' | 'b' | 'c', 'a'> // 'b' | 'c'
 * ```
 */

/* _____________ Your Code Here _____________ */

type MyExclude<T, U> = T extends unknown
  ? T extends U
    ? never
    : T
  : never;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<MyExclude<'a' | 'b' | 'c', 'a'>, 'b' | 'c'>>,
  Expect<Equal<MyExclude<'a' | 'b' | 'c', 'a' | 'b'>, 'c'>>,
  Expect<Equal<MyExclude<string | number | (() => void), Function>, string | number>>,
]
