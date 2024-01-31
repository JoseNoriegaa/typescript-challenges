/**
 * 106 - Trim Left
 *
 * Implement `TrimLeft<T>` which takes an exact string type and returns a new string with the whitespace beginning removed.
 *
 * For example
 *
 * ```ts
 * type trimed = TrimLeft<'  Hello World  '> // expected to be 'Hello World  '
 * ```
 */

/* _____________ Your Code Here _____________ */

type TrimLeft<S extends string> = S extends `${infer A}${infer B}`
  ? A extends (' ' | '\n' | '\t')
    ? TrimLeft<B>
    : S
  : S;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'
type R = TrimLeft<'   \n\t foo bar '>;
type cases = [
  Expect<Equal<TrimLeft<'str'>, 'str'>>,
  Expect<Equal<TrimLeft<' str'>, 'str'>>,
  Expect<Equal<TrimLeft<'     str'>, 'str'>>,
  Expect<Equal<TrimLeft<'     str     '>, 'str     '>>,
  Expect<Equal<TrimLeft<'   \n\t foo bar '>, 'foo bar '>>,
  Expect<Equal<TrimLeft<''>, ''>>,
  Expect<Equal<TrimLeft<' \n\t'>, ''>>,
]
