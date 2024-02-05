/**
 * 25170 - Replace First
 *
 * Implement the type ReplaceFirst<T, S, R> which will replace the first occurrence
 * of S in a tuple T with R. If no such S exists in T, the result should be T.
 *
 */

/* _____________ Your Code Here _____________ */

type ReplaceFirst<T extends readonly unknown[], S, R> = T extends [infer A, ...infer Rest]
  ? A extends S
    ? [R, ...Rest]
    : [A, ...ReplaceFirst<Rest, S, R>]
  : []

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<ReplaceFirst<[1, 2, 3], 3, 4>, [1, 2, 4]>>,
  Expect<Equal<ReplaceFirst<['A', 'B', 'C'], 'C', 'D'>, ['A', 'B', 'D']>>,
  Expect<Equal<ReplaceFirst<[true, true, true], true, false>, [false, true, true]>>,
  Expect<Equal<ReplaceFirst<[string, boolean, number], boolean, string>, [string, string, number]>>,
  Expect<Equal<ReplaceFirst<[1, 'two', 3], string, 2>, [1, 2, 3]>>,
  Expect<Equal<ReplaceFirst<['six', 'eight', 'ten'], 'eleven', 'twelve'>, ['six', 'eight', 'ten']>>,
]
