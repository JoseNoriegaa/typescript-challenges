/**
 * 270 - Typed Get
 *
 * The [`get` function in lodash](https://lodash.com/docs/4.17.15#get) is a quite convenient helper for accessing nested values in JavaScript. However, when we come to TypeScript, using functions like this will make you lose the type information. With TS 4.1's upcoming [Template Literal Types](https://devblogs.microsoft.com/typescript/announcing-typescript-4-1-beta/#template-literal-types) feature, properly typing `get` becomes possible. Can you implement it?
 *
 * For example,
 *
 * ```ts
 * type Data = {
 *   foo: {
 *     bar: {
 *       value: 'foobar',
 *       count: 6,
 *     },
 *     included: true,
 *   },
 *   hello: 'world'
 * }
 *   
 * type A = Get<Data, 'hello'> // 'world'
 * type B = Get<Data, 'foo.bar.count'> // 6
 * type C = Get<Data, 'foo.bar'> // { value: 'foobar', count: 6 }
 * ```
 *
 * Accessing arrays is not required in this challenge.
 *
 */

/* _____________ Your Code Here _____________ */

type ParsePath<S extends string> = S extends `${infer A}.${infer B}`
  ? [A, ...ParsePath<B>]
  : [S];

type Get<
  T,
  K extends string,
  Path extends string[] = ParsePath<K>
> = Path extends [infer Key, ...infer Rest extends string[]]
  ? Key extends keyof T
    ? Get<T[Key], K, Rest>
    : never
  : T;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Get<Data, 'hello'>, 'world'>>,
  Expect<Equal<Get<Data, 'foo.bar.count'>, 6>>,
  Expect<Equal<Get<Data, 'foo.bar'>, { value: 'foobar', count: 6 }>>,
  Expect<Equal<Get<Data, 'foo.baz'>, false>>,

  Expect<Equal<Get<Data, 'no.existed'>, never>>,
]

type Data = {
  foo: {
    bar: {
      value: 'foobar'
      count: 6
    }
    included: true
  }
  'foo.baz': false
  hello: 'world'
}
