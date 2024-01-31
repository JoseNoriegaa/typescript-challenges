/**
 * 2857 - IsRequiredKey
 *
 * Implement a generic ```IsRequiredKey<T, K>```  that return whether ```K``` are required keys of ```T``` .
 *
 * For example
 *
 * ```typescript
 * type A = IsRequiredKey<{ a: number, b?: string },'a'> // true
 * type B = IsRequiredKey<{ a: number, b?: string },'b'> // false
 * type C = IsRequiredKey<{ a: number, b?: string },'b' | 'a'> // false
 * ```
 */

/* _____________ Your Code Here _____________ */

type IsRequiredKey<T, K extends keyof T> = any

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<IsRequiredKey<{ a: number, b?: string }, 'a'>, true>>,
  Expect<Equal<IsRequiredKey<{ a: undefined, b: string }, 'a'>, true>>,
  Expect<Equal<IsRequiredKey<{ a: number, b?: string }, 'b'>, false>>,
  Expect<Equal<IsRequiredKey<{ a: number, b?: string }, 'b' | 'a'>, false>>,
  Expect<Equal<IsRequiredKey<{ a: undefined, b: undefined }, 'b' | 'a'>, true>>,
]
