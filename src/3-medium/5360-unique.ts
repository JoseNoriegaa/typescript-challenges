/**
 * 5360 - Unique
 *
 * Implement the type version of Lodash.uniq, Unique<T> takes an Array T, returns the Array T without repeated values.
 *
 * ```ts
 * type Res = Unique<[1, 1, 2, 2, 3, 3]>; // expected to be [1, 2, 3]
 * type Res1 = Unique<[1, 2, 3, 4, 4, 5, 6, 7]>; // expected to be [1, 2, 3, 4, 5, 6, 7]
 * type Res2 = Unique<[1, "a", 2, "b", 2, "a"]>; // expected to be [1, "a", 2, "b"]
 * type Res3 = Unique<[string, number, 1, "a", 1, string, 2, "b", 2, number]>; // expected to be [string, number, 1, "a", 2, "b"]
 * type Res4 = Unique<[unknown, unknown, any, any, never, never]>; // expected to be [unknown, any, never]
 * ```
 *
 *
 */

/* _____________ Your Code Here _____________ */

type MyEqual<A, B> =
  (<T>() => T extends A ? 1 : 0) extends
  (<T>() => T extends B ? 1 : 0) ? true : false;


type Includes<L extends unknown[], T> = L extends [infer A, ...infer R]
  ? MyEqual<A, T> extends true
    ? true
    : Includes<R, T>
  : false;

type Unique<T extends unknown[], O extends unknown[] = []> = T extends [infer A, ...infer R]
  ? Includes<O, A> extends true
    ? Unique<R, O>
    : Unique<R, [...O, A]>
  : O;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Unique<[1, 1, 2, 2, 3, 3]>, [1, 2, 3]>>,
  Expect<Equal<Unique<[1, 2, 3, 4, 4, 5, 6, 7]>, [1, 2, 3, 4, 5, 6, 7]>>,
  Expect<Equal<Unique<[1, 'a', 2, 'b', 2, 'a']>, [1, 'a', 2, 'b']>>,
  Expect<Equal<Unique<[string, number, 1, 'a', 1, string, 2, 'b', 2, number]>, [string, number, 1, 'a', 2, 'b']>>,
  Expect<Equal<Unique<[unknown, unknown, any, any, never, never]>, [unknown, any, never]>>,
]
