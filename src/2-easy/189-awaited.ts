/**
 * 189 - Awaited
 *
 * If we have a type which is a wrapped type like Promise, how we can get the type which is inside the wrapped type?
 *
 * For example: if we have `Promise<ExampleType>` how to get ExampleType?
 *
 * ```ts
 * type ExampleType = Promise<string>
 *
 * type Result = MyAwaited<ExampleType> // string
 * ```
 */

/* _____________ Your Code Here _____________ */

type PromiseLike<T> = Promise<T> | {
  then: (onfulfilled: (arg: T) => unknown) => unknown;
}

type MyAwaited<T extends PromiseLike<unknown>> = T extends PromiseLike<infer S>
  ? S extends PromiseLike<unknown>
    ? MyAwaited<S>
    : S
  : never;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type X = Promise<string>
type Y = Promise<{ field: number }>
type Z = Promise<Promise<string | number>>
type Z1 = Promise<Promise<Promise<string | boolean>>>
type T = { then: (onfulfilled: (arg: number) => any) => any }
type R = MyAwaited<X>;
type cases = [
  Expect<Equal<MyAwaited<X>, string>>,
  Expect<Equal<MyAwaited<Y>, { field: number }>>,
  Expect<Equal<MyAwaited<Z>, string | number>>,
  Expect<Equal<MyAwaited<Z1>, string | boolean>>,
  Expect<Equal<MyAwaited<T>, number>>,
]

// @ts-expect-error
type error = MyAwaited<number>
