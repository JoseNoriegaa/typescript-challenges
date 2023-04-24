/*
  14 - First of Array
  -------
  by Anthony Fu (@antfu) #easy #array

  ### Question

  Implement a generic `First<T>` that takes an Array `T` and returns its first element's type.

  For example:

  ```ts
  type arr1 = ['a', 'b', 'c']
  type arr2 = [3, 2, 1]

  type head1 = First<arr1> // expected to be 'a'
  type head2 = First<arr2> // expected to be 3
  ```

  > View on GitHub: https://tsch.js.org/14
*/

/* _____________ Your Code Here _____________ */

type First<T extends unknown[]> = T extends [] ? never : T[0];

type FirstV2<T extends unknown[]> = T extends [infer K, ...infer R] ? K : never

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<First<[3, 2, 1]>, 3>>,
  Expect<Equal<First<[() => 123, { a: string }]>, () => 123>>,
  Expect<Equal<First<[]>, never>>,
  Expect<Equal<First<[undefined]>, undefined>>,
]

type casesV2 = [
  Expect<Equal<FirstV2<[3, 2, 1]>, 3>>,
  Expect<Equal<FirstV2<[() => 123, { a: string }]>, () => 123>>,
  Expect<Equal<FirstV2<[]>, never>>,
  Expect<Equal<FirstV2<[undefined]>, undefined>>,
]

type errors = [
  // @ts-expect-error
  First<'notArray'>,
  // @ts-expect-error
  First<{ 0: 'arrayLike' }>,
]

type errorsV2 = [
  // @ts-expect-error
  FirstV2<'notArray'>,
  // @ts-expect-error
  FirstV2<{ 0: 'arrayLike' }>,
]
