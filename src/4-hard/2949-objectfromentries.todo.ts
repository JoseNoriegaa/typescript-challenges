/**
 * 2949 - ObjectFromEntries
 *
 * Implement the type version of ```Object.fromEntries```
 *
 * For example:
 *
 * ```typescript
 * interface Model {
 *   name: string;
 *   age: number;
 *   locations: string[] | null;
 * }
 *
 * type ModelEntries = ['name', string] | ['age', number] | ['locations', string[] | null];
 *
 * type result = ObjectFromEntries<ModelEntries> // expected to be Model
 * ```
 */

/* _____________ Your Code Here _____________ */

type ObjectFromEntries<T> = any

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

interface Model {
  name: string
  age: number
  locations: string[] | null
}

type ModelEntries = ['name', string] | ['age', number] | ['locations', string[] | null]

type cases = [
  Expect<Equal<ObjectFromEntries<ModelEntries>, Model>>,
]