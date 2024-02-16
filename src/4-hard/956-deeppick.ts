/**
 * 956 - DeepPick
 *
 * Implement a type DeepPick, that extends Utility types `Pick`.
 * A type takes two arguments.
 *
 *
 * For example:
 *
 * ```ts
 * type obj = {
 *   name: 'hoge',
 *   age: 20,
 *   friend: {
 *     name: 'fuga',
 *     age: 30,
 *     family: {
 *       name: 'baz',
 *       age: 1
 *     }
 *   }
 * }
 *
 * type T1 = DeepPick<obj, 'name'>   // { name : 'hoge' }
 * type T2 = DeepPick<obj, 'name' | 'friend.name'>  // { name : 'hoge' } & { friend: { name: 'fuga' }}
 * type T3 = DeepPick<obj, 'name' | 'friend.name' |  'friend.family.name'>  // { name : 'hoge' } &  { friend: { name: 'fuga' }} & { friend: { family: { name: 'baz' }}}
 *
 * ```
 */

/* _____________ Your Code Here _____________ */


type Aux<T, K extends string> = K extends keyof T
  ? { [_K in K]: T[_K] }
  : K extends `${infer Key}.${infer Rest}`
    ? Key extends keyof T
      ? { [_K in Key]: T[_K] extends object ? DeepPick<T[_K], Rest> : T[_K] }
      : never
    : never

type UnionToIntersection<U> =
  (U extends unknown ? (x: U) => 0 : never) extends
  ((x: infer T) => 0) ? T : never;

type DeepPick<T, K extends string> = UnionToIntersection<
  K extends infer Keys extends string ? Aux<T, Keys> : never
>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type Obj = {
  a: number
  b: string
  c: boolean
  obj: {
    d: number
    e: string
    f: boolean
    obj2: {
      g: number
      h: string
      i: boolean
    }
  }
  obj3: {
    j: number
    k: string
    l: boolean
  }
}

type cases = [
  Expect<Equal<DeepPick<Obj, ''>, unknown>>,
  Expect<Equal<DeepPick<Obj, 'a'>, { a: number }>>,
  Expect<Equal<DeepPick<Obj, 'a' | ''>, { a: number } & unknown>>,
  Expect<Equal<DeepPick<Obj, 'a' | 'obj.e'>, { a: number } & { obj: { e: string } }>>,
  Expect<Equal<DeepPick<Obj, 'a' | 'obj.e' | 'obj.obj2.i'>, { a: number } & { obj: { e: string } } & { obj: { obj2: { i: boolean } } }>>,
]
