/**
 * 55 - Union to Intersection
 *
 * Implement the advanced util type `UnionToIntersection<U>`
 *
 * For example
 *
 * ```ts
 * type I = UnionToIntersection<'foo' | 42 | true> // expected to be 'foo' & 42 & true
 * ```
 *
 *
 */

/* _____________ Your Code Here _____________ */

type UnionToIntersection<U> = any

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<UnionToIntersection<'foo' | 42 | true>, 'foo' & 42 & true>>,
  Expect<Equal<UnionToIntersection<(() => 'foo') | ((i: 42) => true)>, (() => 'foo') & ((i: 42) => true)>>,
]
