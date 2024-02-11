/**
 * 9775 - Capitalize Nest Object Keys
 *
 * Capitalize the key of the object, and if the value is an array, iterate through the objects in the array.
 *
 *
 */

/* _____________ Your Code Here _____________ */

type CapitalizeNestObjectKeys<T> = T extends Record<string, unknown>
  ? {
    [K in keyof T as K extends string ? Capitalize<K> : K]: CapitalizeNestObjectKeys<T[K]>
  }
  : T extends [infer A, ...infer Rest]
    ? [CapitalizeNestObjectKeys<A>, ...CapitalizeNestObjectKeys<Rest>]
    : T;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type foo = {
  foo: string
  bars: [{ foo: string }]
}

type Foo = {
  Foo: string
  Bars: [{
    Foo: string
  }]
}

type cases = [
  Expect<Equal<Foo, CapitalizeNestObjectKeys<foo>>>,
]
