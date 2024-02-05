/**
 * 17973 - DeepMutable
 *
 * Implement a generic DeepMutable<T> which make every parameter of an object - and its sub-objects recursively - mutable.
 *
 * For example
 *
 * ```ts
 * type X = {
 *   readonly a: () => 1
 *   readonly b: string
 *   readonly c: {
 *     readonly d: boolean
 *     readonly e: {
 *       readonly g: {
 *         readonly h: {
 *           readonly i: true
 *           readonly j: "s"
 *         }
 *         readonly k: "hello"
 *       }
 *     }
 *   }
 * }
 *
 * type Expected = {
 *   a: () => 1
 *   b: string
 *   c: {
 *     d: boolean
 *     e: {
 *       g: {
 *         h: {
 *           i: true
 *           j: "s"
 *         }
 *         k: "hello"
 *       }
 *     }
 *   }
 * }
 *
 * type Todo = DeepMutable<X> // should be same as `Expected`
 * ```
 *
 * You can assume that we are only dealing with Objects in this challenge. Arrays, Functions, Classes and so on do not need to be taken into consideration. However, you can still challenge yourself by covering as many different cases as possible.
 *
 * <!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://tsch.js.org/17973/answer" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://tsch.js.org/17973/solutions" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->
 */

/* _____________ Your Code Here _____________ */

type DeepMutable<T extends object> = {
  -readonly [K in keyof T]: T[K] extends Function
    ? T[K]
    : T[K] extends object
      ? DeepMutable<T[K]>
      : T[K]
}

type R = DeepMutable<Test2>;
/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

interface Test1 {
  readonly title: string
  readonly description: string
  readonly completed: boolean
  readonly meta: {
    readonly author: string
  }
}
type Test2 = {
  readonly a: () => 1
  readonly b: string
  readonly c: {
    readonly d: boolean
    readonly e: {
      readonly g: {
        readonly h: {
          readonly i: true
          readonly j: 's'
        }
        readonly k: 'hello'
      }
      readonly l: readonly [
        'hi',
        {
          readonly m: readonly ['hey']
        },
      ]
    }
  }
}
interface DeepMutableTest1 {
  title: string
  description: string
  completed: boolean
  meta: {
    author: string
  }
}

type DeepMutableTest2 = {
  a: () => 1
  b: string
  c: {
    d: boolean
    e: {
      g: {
        h: {
          i: true
          j: 's'
        }
        k: 'hello'
      }
      l: [
        'hi',
        {
          m: ['hey']
        },
      ]
    }
  }
}

type cases = [
  Expect<Equal<DeepMutable<Test1>, DeepMutableTest1>>,
  Expect<Equal<DeepMutable<Test2>, DeepMutableTest2>>,
]

type errors = [
  // @ts-expect-error
  DeepMutable<'string'>,
  // @ts-expect-error
  DeepMutable<0>,
]
