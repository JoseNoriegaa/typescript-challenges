/**
 * 3326 - BEM style string
 *
 * The Block, Element, Modifier methodology (BEM) is a popular naming convention for classes in CSS. 
 *
 * For example, the block component would be represented as `btn`,
 * element that depends upon the block would be represented as `btn__price`,
 * modifier that changes the style of the block would be represented as `btn--big`
 * or `btn__price--warning`.
 *
 * Implement `BEM<B, E, M>` which generate string union from these three parameters.
 * Where `B` is a string literal, `E` and `M` are string arrays (can be empty).
 *
 * ```
 */

/* _____________ Your Code Here _____________ */

type ConcatString<Str1 extends string, Str2 extends string, Joiner extends string = ''> =
  `${Str1}${Joiner}${Str2}`;

type BEM<B extends string, E extends string[], M extends string[]> = ConcatString<
  ConcatString<
    B,
    [E[number]] extends [never] ? '' : E[number],
    [E[number]] extends [never] ? '' : '__'
  >,
  [M[number]] extends [never] ? '' : M[number],
  [M[number]] extends [never] ? '' : '--'
>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<BEM<'btn', ['price'], []>, 'btn__price'>>,
  Expect<Equal<BEM<'btn', ['price'], ['warning', 'success']>, 'btn__price--warning' | 'btn__price--success' >>,
  Expect<Equal<BEM<'btn', [], ['small', 'medium', 'large']>, 'btn--small' | 'btn--medium' | 'btn--large' >>,
]
