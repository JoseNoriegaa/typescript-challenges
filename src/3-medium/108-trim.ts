/**
 * 108 - Trim
 *
 * Implement `Trim<T>` which takes an exact string type and returns a new string with the whitespace from both ends removed.
 *
 * For example
 *
 * ```ts
 * type trimmed = Trim<'  Hello World  '> // expected to be 'Hello World'
 * ```
 */

/* _____________ Your Code Here _____________ */

type CharsToTrim = ' ' | '\n' | '\t';

type Split<S> = S extends `${infer A}${infer B}`
  ? [A, ...Split<B>]
  : [];

type Join<L extends string[]> = L extends [infer A extends string, ...infer R extends string[]]
  ? `${A}${Join<R>}`
  : '';

type RemoveSpacesAtTheEnd<L extends string[]> = L extends [...infer R extends string[], infer A]
  ? A extends CharsToTrim
    ? RemoveSpacesAtTheEnd<R>
    : L
  : []

type RemoveSpacesAtTheBeginning<L extends string[]> = L extends [infer A, ...infer R extends string[]]
  ? A extends CharsToTrim
    ? RemoveSpacesAtTheBeginning<R>
    : L
  : [];

type Trim<S extends string> =
  Join<
    RemoveSpacesAtTheBeginning<
      RemoveSpacesAtTheEnd<
        Split<S>
      >
    >
  >
;

type S = Trim<'    hola                 sss   '>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Trim<'str'>, 'str'>>,
  Expect<Equal<Trim<' str'>, 'str'>>,
  Expect<Equal<Trim<'     str'>, 'str'>>,
  Expect<Equal<Trim<'str   '>, 'str'>>,
  Expect<Equal<Trim<'     str     '>, 'str'>>,
  Expect<Equal<Trim<'   \n\t foo bar \t'>, 'foo bar'>>,
  Expect<Equal<Trim<''>, ''>>,
  Expect<Equal<Trim<' \n\t '>, ''>>,
]
