/**
 * 2793 - Mutable
 *
 * Implement the generic ```Mutable<T>``` which makes all properties in ```T``` mutable (not readonly).
 *
 * For example
 *
 * ```typescript
 * interface Todo {
 *   readonly title: string
 *   readonly description: string
 *   readonly completed: boolean
 * }
 *
 * type MutableTodo = Mutable<Todo> // { title: string; description: string; completed: boolean; }
 *
 * ```
 */

/* _____________ Your Code Here _____________ */

type Mutable<T extends object> = {
  -readonly [K in keyof T]: T[K];
}

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

interface Todo1 {
  title: string
  description: string
  completed: boolean
  meta: {
    author: string
  }
}

type List = [1, 2, 3]

type cases = [
  Expect<Equal<Mutable<Readonly<Todo1>>, Todo1>>,
  Expect<Equal<Mutable<Readonly<List>>, List>>,
]

type errors = [
  // @ts-expect-error
  Mutable<'string'>,
  // @ts-expect-error
  Mutable<0>,
]
