/**
 * 13 - Hello World
 *
 * Hello, World!
 *
 * In Type Challenges, we use the type system itself to do the assertion.
 *
 * For this challenge, you will need to change the following code to make the tests pass (no type check errors).
 *
 * ```ts
 * // expected to be string
 * type HelloWorld = any
 * ```
 */

/* _____________ Your Code Here _____________ */

type HelloWorld = string // expected to be a string

/* _____________ Test Cases _____________ */
import type { Equal, Expect, NotAny } from '@type-challenges/utils'

type cases = [
  Expect<NotAny<HelloWorld>>,
  Expect<Equal<HelloWorld, string>>,
]
