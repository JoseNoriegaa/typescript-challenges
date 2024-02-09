/**
 * 30958 - Pascal's triangle
 *
 * Given a number N, construct the Pascal's triangle with N rows.
 * [Wikipedia](https://en.wikipedia.org/wiki/Pascal%27s_triangle)
 *
 *
 */

/* _____________ Your Code Here _____________ */

type Range<N extends number, O extends unknown[] = []> = O['length'] extends N
  ? O
  : Range<N, [...O, O['length']]>

type GetNextRow<
  Prev extends number[],
> = Prev extends [infer A extends number, infer B extends number, ...infer Rest extends number[]]
  ? [[...Range<A>, ...Range<B>]['length'], ...GetNextRow<[B, ...Rest]>]
  : Prev extends [infer A extends number, infer B extends number]
    ? [[...Range<A>, ...Range<B>]['length']]
    : []

type Pascal<
  N extends number,
  C extends number[] = [],
  O extends number[][] = [],
  Prev extends number[] = []
> = C['length'] extends N
  ? O
  : Prev['length'] extends 0
    ? Pascal<N, [...C, 0], [[1]], [1]>
    : Prev['length'] extends 1
      ? Pascal<N, [...C, 0], [...O, [1, 1]], [1, 1]>
      : [1, ...GetNextRow<Prev>, 1] extends infer Next extends number[]
        ? Pascal<N, [...C, 0], [...O, Next], Next>
        : never;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<
    Equal<
      Pascal<1>,
      [
        [1],
      ]
    >
  >,
  Expect<
    Equal<
      Pascal<3>,
      [
        [1],
        [1, 1],
        [1, 2, 1],
      ]
    >
  >,
  Expect<
    Equal<
      Pascal<5>,
      [
        [1],
        [1, 1],
        [1, 2, 1],
        [1, 3, 3, 1],
        [1, 4, 6, 4, 1],
      ]
    >
  >,
  Expect<
    Equal<
      Pascal<7>,
      [
        [1],
        [1, 1],
        [1, 2, 1],
        [1, 3, 3, 1],
        [1, 4, 6, 4, 1],
        [1, 5, 10, 10, 5, 1],
        [1, 6, 15, 20, 15, 6, 1],
      ]
    >
  >,
]
