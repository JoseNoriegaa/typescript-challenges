/**
 * 62 - Type Lookup
 *
 * Sometimes, you may want to look up a type in a union by its attributes.
 *
 * In this challenge, we would like to get the corresponding type by searching for the common `type` field in the union `Cat | Dog`. In other words, we will expect to get `Dog` for `LookUp<Dog | Cat, 'dog'>` and `Cat` for `LookUp<Dog | Cat, 'cat'>` in the following example.
 *
 * ```ts
 * interface Cat {
 *   type: 'cat'
 *   breeds: 'Abyssinian' | 'Shorthair' | 'Curl' | 'Bengal'
 * }
 *
 * interface Dog {
 *   type: 'dog'
 *   breeds: 'Hound' | 'Brittany' | 'Bulldog' | 'Boxer'
 *   color: 'brown' | 'white' | 'black'
 * }
 *
 * type MyDogType = LookUp<Cat | Dog, 'dog'> // expected to be `Dog`
 * ```
 */

/* _____________ Your Code Here _____________ */

type LookUp<U, T> = U extends unknown
  ? U extends { type: T }
    ? U
    : never
  : never;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

interface Cat {
  type: 'cat'
  breeds: 'Abyssinian' | 'Shorthair' | 'Curl' | 'Bengal'
}

interface Dog {
  type: 'dog'
  breeds: 'Hound' | 'Brittany' | 'Bulldog' | 'Boxer'
  color: 'brown' | 'white' | 'black'
}

type Animal = Cat | Dog

type cases = [
  Expect<Equal<LookUp<Animal, 'dog'>, Dog>>,
  Expect<Equal<LookUp<Animal, 'cat'>, Cat>>,
]
