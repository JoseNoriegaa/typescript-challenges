/**
 * 4803 - Trim Right
 *
 * Implement `TrimRight<T>` which takes an exact string type and returns a new string with the whitespace ending removed.
 *
 * For example:
 *
 * ```ts
 * type Trimed = TrimRight<'   Hello World    '> // expected to be '   Hello World'
 * ```
 */

/* _____________ Your Code Here _____________ */

type Split<S extends string> = S extends `${infer A}${infer B}`
  ? [A, ...Split<B>]
  : [];

type TrimArray<L extends string[]> = L extends [...infer R extends string[], infer Last extends string]
  ? Last extends (' ' | '\n' | '\t')
    ? TrimArray<R>
    : L
  : L;

type Join<L extends string[]> = L extends [infer A extends string, ...infer R extends string[]]
  ? `${A}${Join<R>}`
  : ``

type TrimRight<S extends string> = Join<TrimArray<Split<S>>>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<TrimRight<'str'>, 'str'>>,
  Expect<Equal<TrimRight<'str '>, 'str'>>,
  Expect<Equal<TrimRight<'str     '>, 'str'>>,
  Expect<Equal<TrimRight<'     str     '>, '     str'>>,
  Expect<Equal<TrimRight<'   foo bar  \n\t '>, '   foo bar'>>,
  Expect<Equal<TrimRight<''>, ''>>,
  Expect<Equal<TrimRight<'\n\t '>, ''>>,
]
