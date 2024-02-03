/**
 * 5 - Get Readonly Keys
 *
 * Implement a generic `GetReadonlyKeys<T>` that returns a union of the readonly keys of an Object.
 *
 * For example
 *
 * ```ts
 * interface Todo {
 *   readonly title: string
 *   readonly description: string
 *   completed: boolean
 * }
 *
 * type Keys = GetReadonlyKeys<Todo> // expected to be "title" | "description"
 * ```
 *
 */

/* _____________ Your Code Here _____________ */

type GetReadonlyKeys<T> = any

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<'title', GetReadonlyKeys<Todo1>>>,
  Expect<Equal<'title' | 'description', GetReadonlyKeys<Todo2>>>,
]

interface Todo1 {
  readonly title: string
  description: string
  completed: boolean
}

interface Todo2 {
  readonly title: string
  readonly description: string
  completed?: boolean
}
