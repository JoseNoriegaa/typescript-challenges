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
type MyEqual<A, B> =
  (<T>() => T extends A ? 0 : 1) extends
  (<T>() => T extends B ? 0 : 1) ? true : false;

type GetReadonlyKeys<T, ROT extends Readonly<T> = Readonly<T>> = keyof {
  [
    K in keyof T as MyEqual<Pick<T, K>, Pick<ROT, K>> extends true ? K : never
  ]: never
}

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
