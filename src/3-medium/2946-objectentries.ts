/**
 * 2946 - ObjectEntries
 *
 * Implement the type version of ```Object.entries```
 *
 * For example 
 *
 * ```typescript
 * interface Model {
 *   name: string;
 *   age: number;
 *   locations: string[] | null;
 * }
 * type modelEntries = ObjectEntries<Model> // ['name', string] | ['age', number] | ['locations', string[] | null];
 * ```
 */

/* _____________ Your Code Here _____________ */

type ObjectEntries<T, U = Required<T>> =
  {
    [K in keyof U]: [
      K,
      [U[K]] extends [never]
        ? K extends keyof T
          ? [T[K]] extends [never]
            ? never
            : undefined
          : never
        : U[K]
    ]
  }[keyof U];

  /* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

interface Model {
  name: string
  age: number
  locations: string[] | null
}

type ModelEntries = ['name', string] | ['age', number] | ['locations', string[] | null]

type cases = [
  Expect<Equal<ObjectEntries<Model>, ModelEntries>>,
  Expect<Equal<ObjectEntries<Partial<Model>>, ModelEntries>>,
  Expect<Equal<ObjectEntries<{ key?: undefined }>, ['key', undefined]>>,
  Expect<Equal<ObjectEntries<{ key: undefined }>, ['key', undefined]>>,
  Expect<Equal<ObjectEntries<{ key: string | undefined }>, ['key', string | undefined]>>,
]
