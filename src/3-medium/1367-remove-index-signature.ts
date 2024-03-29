/**
 * 1367 - Remove Index Signature
 *
 * Implement `RemoveIndexSignature<T>` , exclude the index signature from object types.
 *
 * For example:
 *
 * ```ts
 * type Foo = {
 *   [key: string]: any
 *   foo(): void
 * }
 *
 * type A = RemoveIndexSignature<Foo> // expected { foo(): void }
 * ```
 */

/* _____________ Your Code Here _____________ */

type RemoveIndexSignature<T> = {
  [
      K in keyof T as [K, string] extends [string, K]
        ? never
        : [K, number] extends [number, K]
          ? never
          : [K, symbol] extends [symbol, K]
            ? never
            : K
  ]: T[K]
};

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'
import { IndexSignatureDeclaration } from 'typescript';

type Foo = {
  [key: string]: any
  foo(): void
}

type Bar = {
  [key: number]: any
  bar(): void
  0: string
}

const foobar = Symbol('foobar')
type FooBar = {
  [key: symbol]: any
  [foobar](): void
}

type Baz = {
  bar(): void
  baz: string
}

type cases = [
  Expect<Equal<RemoveIndexSignature<Foo>, { foo(): void }>>,
  Expect<Equal<RemoveIndexSignature<Bar>, { bar(): void, 0: string }>>,
  Expect<Equal<RemoveIndexSignature<FooBar>, { [foobar](): void }>>,
  Expect<Equal<RemoveIndexSignature<Baz>, { bar(): void, baz: string }>>,
]
