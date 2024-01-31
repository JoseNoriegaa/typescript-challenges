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
 */

/* _____________ Your Code Here _____________ */

type DeepOmit = any

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
