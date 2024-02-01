/**
 * 4182 - Fibonacci Sequence
 *
 * Implement a generic `Fibonacci<T>` that takes a number `T` and returns its corresponding [Fibonacci number](https://en.wikipedia.org/wiki/Fibonacci_number).
 *
 * The sequence starts:
 * 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, ...
 *
 * For example
 * ```ts
 * type Result1 = Fibonacci<3> // 2
 * type Result2 = Fibonacci<8> // 21
 * ```
 */

/* _____________ Your Code Here _____________ */

type ArrayFromLength<L extends number = 0, Output extends number[] = []> =
  Output['length'] extends L
   ? Output
   : ArrayFromLength<L, [...Output, 0]>

type Plus<A extends number, B extends number> = [...ArrayFromLength<A>, ...ArrayFromLength<B>]['length'];

type Pop<L extends unknown[]> = L extends [...infer R, infer Last] ? Last : L[0];


type FibonacciSequence<Length extends number, Seq extends unknown[] = [0, 1]> =
  Length extends 0
    ? [Seq[0]]
    : Seq['length'] extends Length
      ? Seq
      : Seq extends [...infer Rest extends number[], infer A extends number]
        ? FibonacciSequence<Length, [...Seq, Plus<A, Pop<Rest>>]>
        : never

type Fibonacci<T extends number> = Plus<T, 1> extends infer N extends number
  ? Pop<FibonacciSequence<N>>
  : never;

type R = Fibonacci<8>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Fibonacci<1>, 1>>,
  Expect<Equal<Fibonacci<2>, 1>>,
  Expect<Equal<Fibonacci<3>, 2>>,
  Expect<Equal<Fibonacci<8>, 21>>,
]
