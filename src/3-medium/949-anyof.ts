/**
 * 949 - AnyOf
 *
 * Implement Python liked `any` function in the type system.
 * A type takes the Array and returns `true` if any element of the Array is true. If the Array is empty, return `false`.
 *
 * For example:
 *
 * ```ts
 * type Sample1 = AnyOf<[1, "", false, [], {}]> // expected to be true.
 * type Sample2 = AnyOf<[0, "", false, [], {}]> // expected to be false.
 * ```
 */

/* _____________ Your Code Here _____________ */

type FalsyValues = '' | 0 | false | [] | undefined | Record<string, never> | null;

type AnyOf<T extends readonly any[]> = T[number] extends FalsyValues
  ? false
  : true;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<AnyOf<[1, 'test', true, [1], { name: 'test' }, { 1: 'test' }]>, true>>,
  Expect<Equal<AnyOf<[1, '', false, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, 'test', false, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, '', true, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [1], {}]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], { name: 'test' }]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], { 1: 'test' }]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], { name: 'test' }, { 1: 'test' }]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], {}, undefined, null]>, false>>,
  Expect<Equal<AnyOf<[]>, false>>,
]
