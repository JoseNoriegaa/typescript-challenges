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
 *
 */

/* _____________ Your Code Here _____________ */

type Entry = [string, unknown];

type UnionToIntersection<U> =
  (U extends unknown ? (x: U) => 0: never) extends
  ((x: infer T) => 0) ? T : never;

type ObjectFromEntries<T extends Entry> = Omit<UnionToIntersection<T extends unknown
  ? { [Key in T[0]]: T[1] }
  : never>, never>;

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
