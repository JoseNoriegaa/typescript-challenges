/**
 * 19458 - SnakeCase
 *
 * Create a `SnakeCase<T>` generic that turns a string formatted in **camelCase** into a string formatted in **snake_case**.
 * 
 * A few examples:
 * 
 * ```ts
 * type res1 = SnakeCase<"hello">; // => "hello"
 * type res2 = SnakeCase<"userName">; // => "user_name"
 * type res3 = SnakeCase<"getElementById">; // => "get_element_by_id"
 * ```
 *
 *
 */

/* _____________ Your Code Here _____________ */

type SnakeCase<T extends string> = T extends string
  ? T extends `${infer A}${infer B}`
    ? A extends Uppercase<A>
      ? `_${Lowercase<A>}${SnakeCase<B>}`
      : `${A}${SnakeCase<B>}`
    : T
  : never;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<SnakeCase<'hello'>, 'hello'>>,
  Expect<Equal<SnakeCase<'userName'>, 'user_name'>>,
  Expect<Equal<SnakeCase<'getElementById'>, 'get_element_by_id'>>,
  Expect<Equal<SnakeCase<'getElementById' | 'getElementByClassNames'>, 'get_element_by_id' | 'get_element_by_class_names'>>,
]
