/**
 * 4471 - Zip
 *
 * In This Challenge, You should implement a type `Zip<T, U>`, T and U must be `Tuple`
 * ```ts
 * type exp = Zip<[1, 2], [true, false]> // expected to be [[1, true], [2, false]]
 * ```
 */

/* _____________ Your Code Here _____________ */

type Zip<T extends unknown[], U extends unknown[], Output extends unknown[] = []> = 
  Output['length'] extends (T['length'] | U['length'])
    ? Output
    : Zip<T, U, [...Output, [T[Output['length']], U[Output['length']]]]>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Zip<[], []>, []>>,
  Expect<Equal<Zip<[1, 2], [true, false]>, [[1, true], [2, false]]>>,
  Expect<Equal<Zip<[1, 2, 3], ['1', '2']>, [[1, '1'], [2, '2']]>>,
  Expect<Equal<Zip<[], [1, 2, 3]>, []>>,
  Expect<Equal<Zip<[[1, 2]], [3]>, [[[1, 2], 3]]>>,
]
