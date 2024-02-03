/**
 * 399 - Tuple Filter
 *
 * Implement a type `FilterOut<T, F>` that filters out items of the given type `F` from the tuple `T`.
 *
 * For example,
 * ```ts
 * type Filtered = FilterOut<[1, 2, null, 3], null> // [1, 2, 3]
 * ```
 *
 *
 */

/* _____________ Your Code Here _____________ */

type FilterOut<T extends any[], F> = any

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<FilterOut<[], never>, []>>,
  Expect<Equal<FilterOut<[never], never>, []>>,
  Expect<Equal<FilterOut<['a', never], never>, ['a']>>,
  Expect<Equal<FilterOut<[1, never, 'a'], never>, [1, 'a']>>,
  Expect<Equal<FilterOut<[never, 1, 'a', undefined, false, null], never | null | undefined>, [1, 'a', false]>>,
  Expect<Equal<FilterOut<[number | null | undefined, never], never | null | undefined>, [number | null | undefined]>>,
]
