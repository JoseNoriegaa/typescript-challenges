/**
 * 9 - Deep Readonly
 *
 * Implement a generic `DeepReadonly<T>` which make every parameter of an object - and its sub-objects recursively - readonly.
 *
 * You can assume that we are only dealing with Objects in this challenge. Arrays, Functions,
 * Classes and so on do not need to be taken into consideration. However, you can still challenge
 * yourself by covering as many different cases as possible.
 *
 * For example:
 *
 * ```ts
 * type X = {
 *   x: {
 *     a: 1
 *     b: 'hi'
 *   }
 *   y: 'hey'
 * }
 *
 * type Expected = {
 *   readonly x: {
 *     readonly a: 1
 *     readonly b: 'hi'
 *   }
 *   readonly y: 'hey'
 * }
 *
 * type Todo = DeepReadonly<X> // should be same as `Expected`
 * ```
 */

/* _____________ Your Code Here _____________ */

type DeepReadonly<T> = T extends Record<string, unknown>
  ? {
    readonly [K in keyof T]: DeepReadonly<T[K]>;
  }
  : T extends [infer A, ...infer Rest]
    ? readonly [DeepReadonly<A>, ...DeepReadonly<Rest>]
    : T;


/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<DeepReadonly<X1>, Expected1>>,
  Expect<Equal<DeepReadonly<X2>, Expected2>>,
]

type X1 = {
  a: () => 22
  b: string
  c: {
    d: boolean
    e: {
      g: {
        h: {
          i: true
          j: 'string'
        }
        k: 'hello'
      }
      l: [
        'hi',
        {
          m: ['hey']
        },
      ]
    }
  }
}

type X2 = { a: string } | { b: number }

type Expected1 = {
  readonly a: () => 22
  readonly b: string
  readonly c: {
    readonly d: boolean
    readonly e: {
      readonly g: {
        readonly h: {
          readonly i: true
          readonly j: 'string'
        }
        readonly k: 'hello'
      }
      readonly l: readonly [
        'hi',
        {
          readonly m: readonly ['hey']
        },
      ]
    }
  }
}

type Expected2 = { readonly a: string } | { readonly b: number }
