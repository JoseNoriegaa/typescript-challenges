/**
 * 29650 - ExtractToObject
 *
 * Implement a type that extract prop value to the interface. The type takes the two arguments. The output should be an object with the prop values.
 *   Prop value is object.
 *
 *   For example
 *
 * ```ts
 * type Test = { id: '1', myProp: { foo: '2' }}
 * type Result = ExtractToObject<Test, 'myProp'> // expected to be { id: '1', foo: '2' }
 * ```
 *
 *
 */

/* _____________ Your Code Here _____________ */

type ExtractToObject<T extends Record<string, unknown>, U extends keyof T> =
  Omit<{
    [K in keyof T as K extends U ? never : K]: T[K]
  } & Pick<T, U>[U], never>;

type R = ExtractToObject<test1, 'myProp'>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type test1 = { id: '1', myProp: { foo: '2' } }

type testExpect1 = {
  id: '1'
  foo: '2'
}

type test2 = {
  id: '1'
  prop1: { zoo: '2' }
  prop2: { foo: '4' }
}

type testExpect2 = {
  id: '1'
  prop1: { zoo: '2' }
  foo: '4'
}

type test3 = {
  prop1: { zoo: '2', a: 2, b: 4, c: 7 }
  prop2: { foo: '4', v: 2, d: 4, g: 7 }
  k: 289
}

type testExpect3 = {
  zoo: '2'
  a: 2
  b: 4
  c: 7
  prop2: { foo: '4', v: 2, d: 4, g: 7 }
  k: 289
}

type test4 = { id: '1', myProp: { foo: '2' } }

type testExpect4 = {
  id: '1'
  myProp: { foo: '2' }
}

type cases = [
  Expect<Equal<ExtractToObject<test1, 'myProp'>, testExpect1>>,
  Expect<Equal<ExtractToObject<test2, 'prop2'>, testExpect2>>,
  Expect<Equal<ExtractToObject<test3, 'prop1'>, testExpect3>>,
  // @ts-expect-error
  Expect<Equal<ExtractToObject<test4, 'prop4'>, testExpect4>>,
]
