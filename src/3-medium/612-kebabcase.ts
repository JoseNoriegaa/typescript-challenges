/**
 * 612 - KebabCase
 *
 * Replace the `camelCase` or `PascalCase` string with `kebab-case`.
 *
 * `FooBarBaz` -> `foo-bar-baz`
 *
 * For example
 *
 * ```ts
 * type FooBarBaz = KebabCase<"FooBarBaz">
 * const foobarbaz: FooBarBaz = "foo-bar-baz"
 *
 * type DoNothing = KebabCase<"do-nothing">
 * const doNothing: DoNothing = "do-nothing"
 * ```
 */

/* _____________ Your Code Here _____________ */

type Uncapitalize<S extends string, Output extends string []= []> =
  S extends `${infer A}${infer Rest}`
    ? `${Lowercase<A>}${Rest}`
    : S;

type KebabCase<S extends string> = S extends `${infer A}${infer B}`
  ? B extends Uncapitalize<B>
    ? `${Uncapitalize<A>}${KebabCase<B>}`
    : `${Uncapitalize<A>}-${KebabCase<B>}`
  : '';

type R = KebabCase<'😎'>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<KebabCase<'FooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase<'fooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase<'foo-bar'>, 'foo-bar'>>,
  Expect<Equal<KebabCase<'foo_bar'>, 'foo_bar'>>,
  Expect<Equal<KebabCase<'Foo-Bar'>, 'foo--bar'>>,
  Expect<Equal<KebabCase<'ABC'>, 'a-b-c'>>,
  Expect<Equal<KebabCase<'-'>, '-'>>,
  Expect<Equal<KebabCase<''>, ''>>,
  Expect<Equal<KebabCase<'😎'>, '😎'>>,
]
