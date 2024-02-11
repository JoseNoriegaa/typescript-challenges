/**
 * 1383 - Camelize
 *
 * Implement Camelize which converts object from snake_case to to camelCase
 *
 * ```ts
 * Camelize<{
 *   some_prop: string, 
 *   prop: { another_prop: string },
 *   array: [{ snake_case: string }]
 * }>
 *
 * // expected to be
 * // {
 * //   someProp: string, 
 * //   prop: { anotherProp: string },
 * //   array: [{ snakeCase: string }]
 * // }
 * ```
 *
 */

/* _____________ Your Code Here _____________ */



type Camelize<T> = T extends string
  ? T extends `${infer A}_${infer B}`
    ? `${A}${Camelize<Capitalize<B>>}`
    : T
  : T extends Record<string, unknown>
    ? {
      [K in keyof T as Camelize<K>]: T[K] extends (Record<string, unknown> | unknown[])
        ? Camelize<T[K]>
        : T[K]
    }
    : T extends unknown[]
      ? T extends [infer A, ...infer Rest extends unknown[]]
        ? [Camelize<A>, ...Camelize<Rest>]
        : []
      : T;

type R = Camelize<{
  some_prop: string
  prop: { another_prop: string }
  array: [
    { snake_case: string },
    { another_element: { yet_another_prop: string } },
    { yet_another_element: string },
  ]
}>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<
    Camelize<{
      some_prop: string
      prop: { another_prop: string }
      array: [
        { snake_case: string },
        { another_element: { yet_another_prop: string } },
        { yet_another_element: string },
      ]
    }>,
    {
      someProp: string
      prop: { anotherProp: string }
      array: [
        { snakeCase: string },
        { anotherElement: { yetAnotherProp: string } },
        { yetAnotherElement: string },
      ]
    }
  >>,
]
