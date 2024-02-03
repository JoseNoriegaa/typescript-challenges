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
 *
 * <!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://tsch.js.org/2949/answer" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://tsch.js.org/2949/solutions" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <hr><h3>Related Challenges</h3><a href="https://github.com/type-challenges/type-challenges/blob/main/questions/00055-hard-union-to-intersection/README.md" target="_blank"><img src="https://img.shields.io/badge/-55%E3%83%BBUnion%20to%20Intersection-de3d37" alt="55・Union to Intersection"/></a> <!--info-footer-end-->
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
