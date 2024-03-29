/**
 * 5153 - IndexOf
 *
 * Implement the type version of Array.indexOf, indexOf<T, U> takes an Array T,
 * any U and returns the index of the first U in Array T.
 *
 * ```ts
 * type Res = IndexOf<[1, 2, 3], 2>; // expected to be 1
 * type Res1 = IndexOf<[2,6, 3,8,4,1,7, 3,9], 3>; // expected to be 2
 * type Res2 = IndexOf<[0, 0, 0], 2>; // expected to be -1
 * ```
 */

/* _____________ Your Code Here _____________ */

type MyEqual<A, B> = (<T>() => T extends A ? 1 : 0) extends (<T>() => T extends B ? 1 : 0)
  ? true
  : false;

type IndexOf<
  T,
  U,
  O extends unknown[] = []
> = T extends [infer A, ...infer B]
  ? MyEqual<A, U> extends true
    ? O['length']
    : IndexOf<B, U, [...O, 0]>
  : -1

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<IndexOf<[1, 2, 3], 2>, 1>>,
  Expect<Equal<IndexOf<[2, 6, 3, 8, 4, 1, 7, 3, 9], 3>, 2>>,
  Expect<Equal<IndexOf<[0, 0, 0], 2>, -1>>,
  Expect<Equal<IndexOf<[string, 1, number, 'a'], number>, 2>>,
  Expect<Equal<IndexOf<[string, 1, number, 'a', any], any>, 4>>,
  Expect<Equal<IndexOf<[string, 'a'], 'a'>, 1>>,
  Expect<Equal<IndexOf<[any, 1], 1>, 1>>,
]
