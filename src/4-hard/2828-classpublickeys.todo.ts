/**
 * 2828 - ClassPublicKeys
 *
 * Implement the generic `ClassPublicKeys<T>` which returns all public keys of a class.
 *
 * For example:
 *
 * ```ts
 * class A {
 *   public str: string
 *   protected num: number
 *   private bool: boolean
 *   getNum() {
 *     return Math.random()
 *   }
 * }
 *
 * type publicKeys = ClassPublicKeys<A> // 'str' | 'getNum'
 * ```
 *
 *
 * <!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://tsch.js.org/2828/answer" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://tsch.js.org/2828/solutions" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->
 */

/* _____________ Your Code Here _____________ */

type ClassPublicKeys = any

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

class A {
  public str: string
  protected num: number
  private bool: boolean
  constructor() {
    this.str = 'naive'
    this.num = 19260917
    this.bool = true
  }

  getNum() {
    return Math.random()
  }
}

type cases = [
  Expect<Equal<ClassPublicKeys<A>, 'str' | 'getNum'>>,
]
