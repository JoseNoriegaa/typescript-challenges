/**
 * 21220 - Permutations of Tuple
 *
 * Given a generic tuple type `T extends unknown[]`, write a type which produces all permutations of `T` as a union.
 *
 * For example:
 *
 * ```ts
 * PermutationsOfTuple<[1, number, unknown]>
 *
 *  * Should return:
 *  * | [1, number, unknown]
 *  * | [1, unknown, number]
 *  * | [number, 1, unknown]
 *  * | [unknown, 1, number]
 *  * | [number, unknown, 1]
 *  * | [unknown, number ,1]
 *
 * ```
 *
 *
 */

/* _____________ Your Code Here _____________ */


type IndexUnion<L extends unknown[]>
  = L extends [infer A, ...infer Rest]
    ? Rest['length'] | IndexUnion<Rest>
    : L['length']


type Aux<T extends unknown[], U extends number = IndexUnion<T>, I extends number = U>
  = [U] extends [never]
    ? []
    : I extends unknown
      ? [T[I], ...Aux<T, Exclude<U, I>>]
      : []

type PermutationsOfTuple<T extends unknown[]>
  = T['length'] extends 0
    ? T
    : Aux<T>

/* _____________ Test Cases _____________ */
import type { Equal, Expect, ExpectFalse } from '@type-challenges/utils'

type cases = [
  Expect<Equal<PermutationsOfTuple<[]>, []>>,
  Expect<Equal<PermutationsOfTuple<[any]>, [any]>>,
  Expect<Equal<PermutationsOfTuple<[any, unknown]>, [any, unknown] | [unknown, any]>>,
  Expect<Equal<
    PermutationsOfTuple<[any, unknown, never]>,
    | [any, unknown, never]
    | [unknown, any, never]
    | [unknown, never, any]
    | [any, never, unknown]
    | [never, any, unknown]
    | [never, unknown, any]
  >>,
  Expect<Equal<
    PermutationsOfTuple<[1, number, unknown]>,
    | [1, number, unknown]
    | [1, unknown, number]
    | [number, 1, unknown]
    | [unknown, 1, number]
    | [number, unknown, 1]
    | [unknown, number, 1]
  >>,
  ExpectFalse<Equal<PermutationsOfTuple<[ 1, number, unknown ]>, [unknown]>>,
]
