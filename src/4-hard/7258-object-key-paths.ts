/**
 * 7258 - Object Key Paths
 *
 * Get all possible paths that could be called by [_.get](https://lodash.com/docs/4.17.15#get) (a lodash function) to get the value of an object
 *
 * ```typescript
 * type T1 = ObjectKeyPaths<{ name: string; age: number }>; // expected to be 'name' | 'age'
 * type T2 = ObjectKeyPaths<{
 *   refCount: number;
 *   person: { name: string; age: number };
 * }>; // expected to be 'refCount' | 'person' | 'person.name' | 'person.age'
 * type T3 = ObjectKeyPaths<{ books: [{ name: string; price: number }] }>; // expected to be the superset of 'books' | 'books.0' | 'books[0]' | 'books.[0]' | 'books.0.name' | 'books.0.price' | 'books.length' | 'books.find'
 * ```
 *
 */

/* _____________ Your Code Here _____________ */
type AddPrefix<P extends string, Key extends (string | number)>
  =
  [P] extends [never]
    ? `${Key}`
    : Key extends string
      ? `${P}.${Key}`
      :
        | `${P}[${Key}]`
        | `${P}.[${Key}]`
        | `${P}.${Key}`;

type ObjectKeyPaths<
  T extends object,
  Acc extends string = never,
  Keys extends keyof T = T extends unknown[] ? keyof T & number : keyof T & string,
> =
  | Acc
  | {
    [K in Keys]: T[K] extends object
      ? ObjectKeyPaths<T[K], AddPrefix<Acc, K & (string | number)>>
      : AddPrefix<Acc, K & (string | number)>
  }[Keys]

/* _____________ Test Cases _____________ */
import type { Debug, Equal, Expect, ExpectExtends } from '@type-challenges/utils'

const ref = {
  count: 1,
  person: {
    name: 'cattchen',
    age: 22,
    books: ['book1', 'book2'],
    pets: [
      {
        type: 'cat',
      },
    ],
  },
}

type cases = [
  Expect<Equal<ObjectKeyPaths<{ name: string, age: number }>, 'name' | 'age'>>,
  Expect<
  Equal<
  ObjectKeyPaths<{
    refCount: number
    person: { name: string, age: number }
  }>,
  'refCount' | 'person' | 'person.name' | 'person.age'
  >
  >,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'count'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.name'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.age'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.books'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.pets'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.books.0'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.books.1'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.books[0]'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.books.[0]'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.pets.0.type'>>,
  Expect<Equal<ExpectExtends<ObjectKeyPaths<typeof ref>, 'notExist'>, false>>,
  Expect<Equal<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.notExist'>, false>>,
  Expect<Equal<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.name.'>, false>>,
  Expect<Equal<ExpectExtends<ObjectKeyPaths<typeof ref>, '.person.name'>, false>>,
  Expect<Equal<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.pets.[0]type'>, false>>,

  // Custom
  Expect<Equal<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.pets.map'>, false>>,
  Expect<Equal<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.pets.length'>, false>>,
]
