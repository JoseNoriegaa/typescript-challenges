/**
 * 459 - Flatten
 *
 * In this challenge, you would need to write a type that takes an array and emitted the flatten array type.
 *
 * For example:
 *
 * ```ts
 * type flatten = Flatten<[1, 2, [3, 4], [[[5]]]]> // [1, 2, 3, 4, 5]
 * ```
 */

/* _____________ Your Code Here _____________ */

type Flatten<L extends unknown[]> = L extends [infer A, ...infer R]
  ? A extends unknown[]
    ? [...Flatten<A>, ...Flatten<R>]
    : [A, ...Flatten<R>]
  : [];

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Flatten<[]>, []>>,
  Expect<Equal<Flatten<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<Flatten<[1, [2]]>, [1, 2]>>,
  Expect<Equal<Flatten<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, 5]>>,
  Expect<Equal<Flatten<[{ foo: 'bar', 2: 10 }, 'foobar']>, [{ foo: 'bar', 2: 10 }, 'foobar']>>,
]

// @ts-expect-error
type error = Flatten<'1'>
