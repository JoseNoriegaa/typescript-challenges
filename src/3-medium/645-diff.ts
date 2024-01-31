/**
 * 645 - Diff
 *
 * Get an `Object` that is the difference between `O` & `O1`
 *
 */

/* _____________ Your Code Here _____________ */

type Diff<O extends object, O1 extends object> =
  (Exclude<keyof O, keyof O1>
  | Exclude<keyof O1, keyof O>) extends infer Keys extends PropertyKey
  ? {
    [K in Keys]: K extends keyof O1
      ? O1[K]
      : K extends keyof O
        ? O[K]
        : never
  }
  : never;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type Foo = {
  name: string
  age: string
}
type Bar = {
  name: string
  age: string
  gender: number
}
type Coo = {
  name: string
  gender: number
}

type cases = [
  Expect<Equal<Diff<Foo, Bar>, { gender: number }>>,
  Expect<Equal<Diff<Bar, Foo>, { gender: number }>>,
  Expect<Equal<Diff<Foo, Coo>, { age: string, gender: number }>>,
  Expect<Equal<Diff<Coo, Foo>, { age: string, gender: number }>>,
]
