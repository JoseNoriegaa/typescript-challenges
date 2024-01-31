/**
 * 3196 - Flip Arguments
 *
 * Implement the type version of lodash's ```_.flip```.
 *
 * Type ```FlipArguments<T>``` requires function type ```T``` and returns a new function type which has the same return type of T but reversed parameters.
 *
 * For example:
 *
 * ```typescript
 * type Flipped = FlipArguments<(arg0: string, arg1: number, arg2: boolean) => void> 
 * // (arg0: boolean, arg1: number, arg2: string) => void
 * ```
 */

/* _____________ Your Code Here _____________ */

type FlipArguments<T> = any

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<FlipArguments<() => boolean>, () => boolean>>,
  Expect<Equal<FlipArguments<(foo: string) => number>, (foo: string) => number>>,
  Expect<Equal<FlipArguments<(arg0: string, arg1: number, arg2: boolean) => void>, (arg0: boolean, arg1: number, arg2: string) => void>>,
]

type errors = [
  // @ts-expect-error
  FlipArguments<'string'>,
  // @ts-expect-error
  FlipArguments<{ key: 'value' }>,
  // @ts-expect-error
  FlipArguments<['apple', 'banana', 100, { a: 1 }]>,
  // @ts-expect-error
  FlipArguments<null | undefined>,
]
