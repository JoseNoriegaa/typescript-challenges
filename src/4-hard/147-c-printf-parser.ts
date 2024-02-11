/**
 * 147 - C-printf Parser
 *
 * There is a function in C language: `printf`. This function allows us to print something with formatting. Like this:
 *
 * ```c
 * printf("The result is %d.", 42);
 * ```
 *
 * This challenge requires you to parse the input string and extract the format placeholders like `%d` and `%f`.
 * For example, if the input string is `"The result is %d."`, the parsed result is a tuple `['dec']`.
 *
 * Here is the mapping:
 *
 * ```typescript
 * type ControlsMap = {
 *   c: 'char',
 *   s: 'string',
 *   d: 'dec',
 *   o: 'oct',
 *   h: 'hex',
 *   f: 'float',
 *   p: 'pointer',
 * }
 * ```
 *
 */

/* _____________ Your Code Here _____________ */

type ControlsMap = {
  c: 'char'
  s: 'string'
  d: 'dec'
  o: 'oct'
  h: 'hex'
  f: 'float'
  p: 'pointer'
}

type RemoveDoubleSymbol<S extends string> = S extends `${infer A}%%${infer B}`
  ? `${A}${RemoveDoubleSymbol<B>}`
  : S;

type Aux<S extends string> = S extends `${string}%${infer A}${infer Rest}`
  ? A extends keyof ControlsMap
    ? [ControlsMap[A], ...Aux<Rest>]
    : Aux<Rest>
  : [];

type ParsePrintFormat<S extends string> = Aux<RemoveDoubleSymbol<S>>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<ParsePrintFormat<''>, []>>,
  Expect<Equal<ParsePrintFormat<'Any string.'>, []>>,
  Expect<Equal<ParsePrintFormat<'The result is %d.'>, ['dec']>>,
  Expect<Equal<ParsePrintFormat<'The result is %%d.'>, []>>,
  Expect<Equal<ParsePrintFormat<'The result is %%%d.'>, ['dec']>>,
  Expect<Equal<ParsePrintFormat<'The result is %f.'>, ['float']>>,
  Expect<Equal<ParsePrintFormat<'The result is %h.'>, ['hex']>>,
  Expect<Equal<ParsePrintFormat<'The result is %q.'>, []>>,
  Expect<Equal<ParsePrintFormat<'Hello %s: score is %d.'>, ['string', 'dec']>>,
  Expect<Equal<ParsePrintFormat<'The result is %'>, []>>,
]
