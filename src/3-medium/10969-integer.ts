/**
 * 10969 - Integer
 *
 * Please complete type `Integer<T>`, type `T` inherits from `number`, if `T` is an integer return it, otherwise return `never`.
 *
 */

/* _____________ Your Code Here _____________ */

type Integer<T extends number> = `${T}` extends `${number}.${number}`
  ? never
  : [T, number] extends [number, T]
    ? never
    : T

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

let x = 1
let y = 1 as const

type cases1 = [
  Expect<Equal<Integer<1>, 1>>,
  Expect<Equal<Integer<1.1>, never>>,
  Expect<Equal<Integer<1.0>, 1>>,
  Expect<Equal<Integer<1.000000000>, 1>>,
  Expect<Equal<Integer<0.5>, never>>,
  Expect<Equal<Integer<28.00>, 28>>,
  Expect<Equal<Integer<28.101>, never>>,
  Expect<Equal<Integer<typeof x>, never>>,
  Expect<Equal<Integer<typeof y>, 1>>,
]
