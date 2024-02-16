/**
 * 9384 - Maximum
 *
 * ### Description
 *
 * Implement the type `Maximum`, which takes an input type `T`, and returns the maximum value in `T`.
 *
 * If `T` is an empty array, it returns `never`. **Negative numbers** are not considered.
 *
 * For example:
 *
 * ```ts
 * Maximum<[]> // never
 * Maximum<[0, 2, 1]> // 2
 * Maximum<[1, 20, 200, 150]> // 200
 * ```
 *
 * ### Advanced
 *
 * Can you implement type `Minimum` inspired by `Maximum`?
 *
 */

/* _____________ Your Code Here _____________ */

type Aux<
  T extends number[],
  U extends number = T[number],
  C extends unknown[] = []
> = [Exclude<U, C['length']>] extends [infer R extends number]
  ? [R] extends [never]
    ? U
    : Aux<T, R, [...C, 0]>
  : never;

type Maximum<T extends number[]> = Aux<T>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Maximum<[]>, never>>,
  Expect<Equal<Maximum<[0, 2, 1]>, 2>>,
  Expect<Equal<Maximum<[1, 20, 200, 150]>, 200>>,
]
