/**
 * 9989 - Count Element Number To Object
 *
 * With type ``CountElementNumberToObject``, get the number of occurrences of every item from an array and return them in an object. For example:
 *
 * ~~~ts
 * type Simple1 = CountElementNumberToObject<[]> // return {}
 * type Simple2 = CountElementNumberToObject<[1,2,3,4,5]> 
 * // return {
 * //   1: 1,
 * //   2: 1,
 * //   3: 1,
 * //   4: 1,
 * //   5: 1
 * // }
 *
 * type Simple3 = CountElementNumberToObject<[1,2,3,4,5,[1,2,3]]> 
 * // return {
 * //   1: 2,
 * //   2: 2,
 * //   3: 2,
 * //   4: 1,
 * //   5: 1
 * // }
 * ~~~
 *
 *
 */

/* _____________ Your Code Here _____________ */

type Flatten<T> = T extends [infer A, ...infer R]
  ? [A] extends [never]
    ? [A, ...Flatten<R>]
    : A extends unknown[]
      ? [...Flatten<A>, ...Flatten<R>]
      : [A, ...Flatten<R>]
  : []

type Occurrences<L extends unknown[], O extends Record<string, unknown[]> = {}> =
  L extends [infer A extends PropertyKey, ...infer R extends PropertyKey[]]
    ? [A] extends [never]
      ? Occurrences<R, O>
      : A extends keyof O
        ? Occurrences<R, Omit<O, A> & { [K in A]: [...O[A], 0]}>
        : Occurrences<R, O & { [K in A]: [0]}>
    : Omit<O, never> extends infer R extends Record<string, unknown[]>
      ? { [K in keyof R]: R[K]['length']}
      : never;

type CountElementNumberToObject<T extends unknown[]> = Occurrences<
  Flatten<T>
>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<CountElementNumberToObject<[1, 2, 3, 4, 5]>, {
    1: 1
    2: 1
    3: 1
    4: 1
    5: 1
  } >>,
  Expect<Equal<CountElementNumberToObject<[1, 2, 3, 4, 5, [1, 2, 3]]>, {
    1: 2
    2: 2
    3: 2
    4: 1
    5: 1
  }>>,
  Expect<Equal<CountElementNumberToObject<[1, 2, 3, 4, 5, [1, 2, 3, [4, 4, 1, 2]]]>, {
    1: 3
    2: 3
    3: 2
    4: 3
    5: 1
  }>>,
  Expect<Equal<CountElementNumberToObject<[never]>, {}>>,
  Expect<Equal<CountElementNumberToObject<['1', '2', '0']>, {
    0: 1
    1: 1
    2: 1
  }>>,
  Expect<Equal<CountElementNumberToObject<['a', 'b', ['c', ['d']]]>, {
    'a': 1
    'b': 1
    'c': 1
    'd': 1
  }>>,
]
