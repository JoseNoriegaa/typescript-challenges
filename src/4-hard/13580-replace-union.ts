/**
 * 13580 - Replace Union
 *
 * Given an `union of types` and `array of type pairs` to replace (`[[string, number], [Date, null]]`), return a new union replaced with the `type pairs`.
 *
 *
 */

/* _____________ Your Code Here _____________ */
type MyEqual<A, B> =
  (<T>() => T extends A ? 0 : 1) extends
  (<T>() => T extends B ? 0 : 1) ? true : false;

type UnionReplace<T, U extends [any, any][]> = U extends [[infer E, infer N], ...infer Rest extends [any, any][]]
  ? Exclude<T, E> extends infer NewSet
    ? MyEqual<T, NewSet> extends true
      ? UnionReplace<NewSet, Rest>
      : UnionReplace<NewSet | N, Rest>
    : never
  : T;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  // string -> null
  Expect<Equal<UnionReplace<number | string, [[string, null]]>, number | null>>,

  // string -> null
  Expect<Equal<UnionReplace<number | string, [[string, null], [Date, Function]]>, number | null>>,

  // Date -> string; Function -> undefined
  Expect<Equal<UnionReplace<Function | Date | object, [[Date, string], [Function, undefined]]>, undefined | string | object>>,
]
