/**
 * 16259 - ToPrimitive
 *
 * Convert a property of type literal (label type) to a primitive type.
 *
 * For example
 *
 * ```typescript
 * type X = {
 *   name: 'Tom',
 *   age: 30,
 *   married: false,
 *   addr: {
 *     home: '123456',
 *     phone: '13111111111'
 *   }
 * }
 *
 * type Expected = {
 *   name: string,
 *   age: number,
 *   married: boolean,
 *   addr: {
 *     home: string,
 *     phone: string
 *   }
 * }
 * type Todo = ToPrimitive<X> // should be same as `Expected`
 * ```
 *
 *
 */

/* _____________ Your Code Here _____________ */

type ToPrimitive = any

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type PersonInfo = {
  name: 'Tom'
  age: 30
  married: false
  addr: {
    home: '123456'
    phone: '13111111111'
  }
  hobbies: ['sing', 'dance']
  readonlyArr: readonly ['test']
  fn: () => any
}

type ExpectedResult = {
  name: string
  age: number
  married: boolean
  addr: {
    home: string
    phone: string
  }
  hobbies: [string, string]
  readonlyArr: readonly [string]
  fn: Function
}

type cases = [
  Expect<Equal<ToPrimitive<PersonInfo>, ExpectedResult>>,
]
