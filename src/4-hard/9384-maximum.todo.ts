/**
 * 9384 - Maximum
 * 
 * ### Description
 * 
 * Implement the type `Maximum`, which takes an input type `T`, and returns the maximum value in `T`.
 * 
 * If `T` is an empty array, it returns `never`. **Negative numbers** are not considered.
 * 
 * For example:
 * 
 * ```ts
 * Maximum<[]> // never
 * Maximum<[0, 2, 1]> // 2
 * Maximum<[1, 20, 200, 150]> // 200
 * ```
 * 
 * ### Advanced
 * 
 * Can you implement type `Minimum` inspired by `Maximum`?
 * 
 * <!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://tsch.js.org/9384/answer" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://tsch.js.org/9384/solutions" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->
 */

/* _____________ Your Code Here _____________ */

type Maximum<T extends number[]> = {
  [K in keyof T as T[K] extends number ? T[K] : never]: 0
}

type R = Maximum<[500, 1, 20, 200, 150]>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Maximum<[]>, never>>,
  Expect<Equal<Maximum<[0, 2, 1]>, 2>>,
  Expect<Equal<Maximum<[1, 20, 200, 150]>, 200>>,
]
