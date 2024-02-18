/**
 * 462 - Currying 2
 *
 * [Currying](https://en.wikipedia.org/wiki/Currying) is the technique of converting a function that takes multiple arguments into a
 * sequence of functions that each take a single argument.
 *
 * But in our daily life, currying dynamic arguments is also commonly used, for example, the `Function.bind(this, [...params])` API.
 *
 * ```ts
 * const func = (a: number, b: number, c: number) => {
 *   return a + b + c
 * }
 *
 * const bindFunc = func(null, 1, 2)
 *
 * const result = bindFunc(3) // result: 6
 * ```
 *
 * Thus, based on `Currying 1`, we would need to have the dynamic argument version:
 *
 * ```ts
 * const add = (a: number, b: number, c: number) => a + b + c
 * const three = add(1, 1, 1) 
 *
 * const curriedAdd = DynamicParamsCurrying(add)
 * const six = curriedAdd(1, 2, 3)
 * const seven = curriedAdd(1, 2)(4)
 * const nine = curriedAdd(2)(3)(4)
 * ```
 *
 * In this challenge, `DynamicParamsCurrying` may take a function with zero to multiple arguments,
 * you need to correctly type it. The returned function may accept at least one argument.
 * When all the arguments as satisfied, it should yield the return type of the original function correctly.
 *
 */

/* _____________ Your Code Here _____________ */

type Currying<
  // Arguments of the function to split into multiple functions
  Args extends unknown[],
  // Return type of the final function
  Return extends unknown,
  // Flag to keep track of the arguments in order to make the function overloads
  ArgsAcc extends unknown[] = []
> =
  // Get the first argument
  Args extends [infer Arg, ...infer Rest]
  ?
    /**
     * Check if we don't have any other arguments to process
     * so we don't create an extra overload for the last curried
     * function.
     *
     * Considering we have 2 arguments [bool, str] and we are in the last
     * recursive call.
     *
     * Without this checking we will be creating the following type:
     *
     * (arg: str) => str & () => str
     */
    Rest extends []
      ?
        (...args: [...ArgsAcc, Arg]) => Return
      :
      /**
       * Create the base function with arguments.
       *
       * Considering we have 3 arguments [bool, str, num]
       *
       * The first iteration is going to generate:
       * (arg: bool) => ...
       *
       * Then we use intersection to create the rest of overloads.
       *
       * so we get:
       * (arg: bool) => ... & (a: bool, b: str) => ... & (a: bool, b: str, c: num) => ...
       *
       * That will be it for the first function, then we need to take care of the "return" step
       * to get the rest of curried functions. And for that we repeat the same process as above
       * by returning a recursive call excluding the current argument we added in our function.
       */
      ((...args: [...ArgsAcc, Arg]) => Currying<Rest, Return>)
      & Currying<Rest, Return, [...ArgsAcc, Arg]>
  :
  /**
   * Base case, used when we don't have any arguments to process.
   */
  () => Return;

declare function DynamicParamsCurrying<
  Args extends unknown[],
  Return
>(fn: (...args: Args) => Return): Currying<Args, Return>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

const curried1 = DynamicParamsCurrying((a: string, b: number, c: boolean) => true)
const curried2 = DynamicParamsCurrying((a: string, b: number, c: boolean, d: boolean, e: boolean, f: string, g: boolean) => true)

const curried1Return1 = curried1('123')(123)(true)
const curried1Return2 = curried1('123', 123)(false)
const curried1Return3 = curried1('123', 123, true)

const curried2Return1 = curried2('123')(123)(true)(false)(true)('123')(false)
const curried2Return2 = curried2('123', 123)(true, false)(true, '123')(false)
const curried2Return3 = curried2('123', 123)(true)(false)(true, '123', false)
const curried2Return4 = curried2('123', 123, true)(false, true, '123')(false)
const curried2Return5 = curried2('123', 123, true)(false)(true)('123')(false)
const curried2Return6 = curried2('123', 123, true, false)(true, '123', false)
const curried2Return7 = curried2('123', 123, true, false, true)('123', false)
const curried2Return8 = curried2('123', 123, true, false, true)('123')(false)
const curried2Return9 = curried2('123', 123, true, false, true, '123')(false)
const curried2Return10 = curried2('123', 123, true, false, true, '123', false)

type cases = [
  Expect<Equal< typeof curried1Return1, boolean>>,
  Expect<Equal< typeof curried1Return2, boolean>>,
  Expect<Equal< typeof curried1Return3, boolean>>,

  Expect<Equal< typeof curried2Return1, boolean>>,
  Expect<Equal< typeof curried2Return2, boolean>>,
  Expect<Equal< typeof curried2Return3, boolean>>,
  Expect<Equal< typeof curried2Return4, boolean>>,
  Expect<Equal< typeof curried2Return5, boolean>>,
  Expect<Equal< typeof curried2Return6, boolean>>,
  Expect<Equal< typeof curried2Return7, boolean>>,
  Expect<Equal< typeof curried2Return8, boolean>>,
  Expect<Equal< typeof curried2Return9, boolean>>,
  Expect<Equal< typeof curried2Return10, boolean>>,
]
