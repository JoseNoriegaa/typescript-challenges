/**
 * 27932 - MergeAll
 *
 * Merge variadic number of types into a new type. If the keys overlap, its values should be merged into an union.
 *
 * For example:
 *
 * ```ts
 * type Foo = { a: 1; b: 2 }
 * type Bar = { a: 2 }
 * type Baz = { c: 3 }
 *
 * type Result = MergeAll<[Foo, Bar, Baz]> // expected to be { a: 1 | 2; b: 2; c: 3 }
 * ```
 *
 */

/* _____________ Your Code Here _____________ */

type MergeAll<XS extends Record<string, unknown>[], O extends Record<string, unknown> = {}> =
  XS extends [infer A extends Record<string, unknown>, ...infer Rest  extends Record<string, unknown>[]]
    ? MergeAll<Rest, {
        [K in keyof A]: K extends keyof O
          ? O[K] | A[K]
          : A[K]
      } & Omit<O, keyof A>>
    : Omit<O, never>

type S = MergeAll<[{ a: 1 }, { a: 2 }]>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<MergeAll<[]>, {} >>,
  Expect<Equal<MergeAll<[{ a: 1 }]>, { a: 1 }>>,
  Expect<Equal<
    MergeAll<[{ a: string }, { a: string }]>,
    { a: string }
>
  >,
  Expect<Equal<
    MergeAll<[{ }, { a: string }]>,
    { a: string }
>
  >,
  Expect<Equal<
    MergeAll<[{ a: 1 }, { c: 2 }]>,
    { a: 1, c: 2 }
>
  >,
  Expect<Equal<
    MergeAll<[{ a: 1, b: 2 }, { a: 2 }, { c: 3 }]>,
    { a: 1 | 2, b: 2, c: 3 }
>
  >,
  Expect<Equal<MergeAll<[{ a: 1 }, { a: number }]>, { a: number }>>,
  Expect<Equal<MergeAll<[{ a: number }, { a: 1 }]>, { a: number }>>,
  Expect<Equal<MergeAll<[{ a: 1 | 2 }, { a: 1 | 3 }]>, { a: 1 | 2 | 3 }>>,
]
