/**
 * 29785 - Deep Omit
 *
 * Implement a type`DeepOmit`, Like Utility types [Omit](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys), A type takes two arguments.
 *
 * For example:
 *
 * ```ts
 * type obj = {
 *   person: {
 *     name: string;
 *     age: {
 *       value: number
 *     }
 *   }
 * }
 *
 * type test1 = DeepOmit<obj, 'person'>    // {}
 * type test2 = DeepOmit<obj, 'person.name'> // { person: { age: { value: number } } }
 * type test3 = DeepOmit<obj, 'name'> // { person: { name: string; age: { value: number } } }
 * type test4 = DeepOmit<obj, 'person.age.value'> // { person: { name: string; age: {} } }
 * ```
 *
 */

/* _____________ Your Code Here _____________ */
type SplitByDot<Path extends string> = Path extends `${infer A}.${infer Rest}`
  ? [A, ...SplitByDot<Rest>]
  : [Path];

type DeepOmitUtil<T extends Record<string, unknown>, P extends string[]> = P extends [infer Prop, ...infer Rest extends string[]]
  ? {
    [
      K in keyof T as K extends Prop
        ? Rest['length'] extends 0
          ? never
          : K
        : K
    ]: T[K] extends Record<string, unknown>
      ? DeepOmitUtil<T[K], Rest>
      : T[K]
  }
  : T;


type DeepOmit<T extends Record<string, unknown>, Path extends string> = DeepOmitUtil<T, SplitByDot<Path>>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type obj = {
  person: {
    name: string
    age: {
      value: number
    }
  }
}

type cases = [
  Expect<Equal<DeepOmit<obj, 'person'>, {}>>,
  Expect<Equal<DeepOmit<obj, 'person.name'>, { person: { age: { value: number } } }>>,
  Expect<Equal<DeepOmit<obj, 'name'>, obj>>,
  Expect<Equal<DeepOmit<obj, 'person.age.value'>, { person: { name: string, age: {} } }>>,
]
