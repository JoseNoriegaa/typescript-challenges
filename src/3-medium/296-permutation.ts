/**
 * 296 - Permutation
 *
 * Implement permutation type that transforms union types into the array that includes permutations of unions.
 *
 * ```typescript
 * type perm = Permutation<'A' | 'B' | 'C'>; // ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']
 * ```
 *
 */

/* _____________ Your Code Here _____________ */

type Permutation<T, U = T, Res extends unknown[] = []> = [T] extends [never]
  ? Res
  : T extends unknown
    ? [Exclude<U, T>] extends [never]
      ? [...Res, T]
      : Exclude<U, T> extends infer Arr
        ? Permutation<Arr, Arr, [...Res, T]>
        : never
    : Res;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Permutation<'A'>, ['A']>>,
  Expect<Equal<Permutation<'A' | 'B' | 'C'>, ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']>>,
  Expect<Equal<Permutation<'B' | 'A' | 'C'>, ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']>>,
  Expect<Equal<Permutation<boolean>, [false, true] | [true, false]>>,
  Expect<Equal<Permutation<never>, []>>,
]
