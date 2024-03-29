/**
 * 8767 - Combination
 *
 * Given an array of strings, do Permutation & Combination.
 * It's also useful for the prop types like video
 * [controlsList](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/controlsList)
 *
 * ```ts
 * // expected to be `"foo" | "bar" | "baz" | "foo bar" | "foo bar baz" | "foo baz" | "foo baz bar" | "bar foo" | "bar foo baz" | "bar baz" | "bar baz foo" | "baz foo" | "baz foo bar" | "baz bar" | "baz bar foo"`
 * type Keys = Combination<['foo', 'bar', 'baz']>
 * ```
 *
 *
 */

/* _____________ Your Code Here _____________ */


type Aux<U extends string, A extends U = U> = U extends string
  ? U | `${U} ${Aux<Exclude<A, U>>}`
  : never

type Combination<T extends string[]> = Aux<T[number]>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Combination<['foo', 'bar', 'baz']>, 'foo' | 'bar' | 'baz' | 'foo bar' | 'foo bar baz' | 'foo baz' | 'foo baz bar' | 'bar foo' | 'bar foo baz' | 'bar baz' | 'bar baz foo' | 'baz foo' | 'baz foo bar' | 'baz bar' | 'baz bar foo'>>,
]
