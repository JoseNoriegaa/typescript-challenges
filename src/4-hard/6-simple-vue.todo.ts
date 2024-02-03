/**
 * 6 - Simple Vue
 *
 * Implement a simpiled version of a Vue-like typing support.
 *
 * By providing a function name `SimpleVue` (similar to `Vue.extend` or `defineComponent`), it should properly infer the `this` type inside computed and methods.
 *
 * In this challenge, we assume that SimpleVue take an Object with `data`, `computed` and `methods` fields as it's only argument,
 *
 * - `data` is a simple function that returns an object that exposes the context `this`, but you won't be accessible to other computed values or methods.
 *
 * - `computed` is an Object of functions that take the context as `this`, doing some calculation and returns the result. The computed results should be exposed to the context as the plain return values instead of functions.
 *
 * - `methods` is an Object of functions that take the context as `this` as well. Methods can access the fields exposed by `data`, `computed` as well as other `methods`. The different between `computed` is that `methods` exposed as functions as-is.
 *
 * The type of `SimpleVue`'s return value can be arbitrary.
 *
 * ```ts
 * const instance = SimpleVue({
 *   data() {
 *     return {
 *       firstname: 'Type',
 *       lastname: 'Challenges',
 *       amount: 10,
 *     }
 *   },
 *   computed: {
 *     fullname() {
 *       return this.firstname + ' ' + this.lastname
 *     }
 *   },
 *   methods: {
 *     hi() {
 *       alert(this.fullname.toLowerCase())
 *     }
 *   }
 * })
 * ```
 *
 * <!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://tsch.js.org/6/answer" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://tsch.js.org/6/solutions" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <hr><h3>Related Challenges</h3><a href="https://github.com/type-challenges/type-challenges/blob/main/questions/00213-hard-vue-basic-props/README.md" target="_blank"><img src="https://img.shields.io/badge/-213%E3%83%BBVue%20Basic%20Props-de3d37" alt="213・Vue Basic Props"/></a> <!--info-footer-end-->
 */

/* _____________ Your Code Here _____________ */

declare function SimpleVue(options: any): any

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

SimpleVue({
  data() {
    // @ts-expect-error
    this.firstname
    // @ts-expect-error
    this.getRandom()
    // @ts-expect-error
    this.data()

    return {
      firstname: 'Type',
      lastname: 'Challenges',
      amount: 10,
    }
  },
  computed: {
    fullname() {
      return `${this.firstname} ${this.lastname}`
    },
  },
  methods: {
    getRandom() {
      return Math.random()
    },
    hi() {
      alert(this.amount)
      alert(this.fullname.toLowerCase())
      alert(this.getRandom())
    },
    test() {
      const fullname = this.fullname
      const cases: [Expect<Equal<typeof fullname, string>>] = [] as any
    },
  },
})
