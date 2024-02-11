/**
 * 2059 - Drop String
 *
 * Drop the specified chars from a string.
 *
 * For example:
 *
 * ```ts
 * type Butterfly = DropString<'foobar!', 'fb'> // 'ooar!'
 * ```
 *
 */

/* _____________ Your Code Here _____________ */

type StringToUnion<S> = S extends `${infer A}${infer B}`
  ? A | StringToUnion<B>
  : never;

type DropString<
  S extends string,
  R extends string,
  U extends string = StringToUnion<R>> = [U] extends [never]
  ? S
  : S extends `${infer A}${infer B}`
    ? A extends U
      ? DropString<B, R, U>
      : `${A}${DropString<B, R, U>}`
    : S;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<DropString<'butter fly!', ''>, 'butter fly!'>>,
  Expect<Equal<DropString<'butter fly!', ' '>, 'butterfly!'>>,
  Expect<Equal<DropString<'butter fly!', 'but'>, 'er fly!'>>,
  Expect<Equal<DropString<' b u t t e r f l y ! ', 'but'>, '     e r f l y ! '>>,
  Expect<Equal<DropString<'    butter fly!        ', ' '>, 'butterfly!'>>,
  Expect<Equal<DropString<' b u t t e r f l y ! ', ' '>, 'butterfly!'>>,
  Expect<Equal<DropString<' b u t t e r f l y ! ', 'but'>, '     e r f l y ! '>>,
  Expect<Equal<DropString<' b u t t e r f l y ! ', 'tub'>, '     e r f l y ! '>>,
  Expect<Equal<DropString<' b u t t e r f l y ! ', 'b'>, '  u t t e r f l y ! '>>,
  Expect<Equal<DropString<' b u t t e r f l y ! ', 't'>, ' b u   e r f l y ! '>>,
]
