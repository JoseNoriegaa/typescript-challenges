/**
 * 151 - Query String Parser
 *
 * You're required to implement a type-level parser to parse URL query string into a object literal type.
 *
 * Some detailed requirements:
 *
 * - Value of a key in query string can be ignored but still be parsed to `true`. For example, `'key'` is without value, so the parser result is `{ key: true }`.
 * - Duplicated keys must be merged into one. If there are different values with the same key, values must be merged into a tuple type.
 * - When a key has only one value, that value can't be wrapped into a tuple type.
 * - If values with the same key appear more than once, it must be treated as once. For example, `key=value&key=value` must be treated as `key=value` only.
 *
 *
 */

/* _____________ Your Code Here _____________ */

type MyEqual<A, B> =
  (<T>() => T extends A ? 1 : 0) extends
  (<T>() => T extends B ? 1 : 0)
  ? true
  : false;

type SplitBy<S extends string, A extends string> = S extends `${infer F}${A}${infer B}`
  ? [F, ...SplitBy<B, A>]
  : [S]

type Includes<L extends unknown[], T> =  L extends [infer A, ...infer R]
  ? MyEqual<T, A> extends true
    ? true
    : Includes<R, T>
  : false

type AppendToQueryObject<Entry extends [string, unknown], Query extends Record<string, unknown> = {}> = Entry extends [infer Name extends string, infer Value]
  ? Name extends keyof Query
    ? Query[Name] extends unknown[]
      ? Includes<Query[Name], Value> extends true
        ? Query
        : Omit<Omit<Query, Name> & { [K in Name]: [...Query[Name], Value] }, never>
      : MyEqual<Query[Name], Value> extends true
        ? Query
        : Omit<Omit<Query, Name> & { [K in Name]: [Query[Name], Value] }, never>
    : Omit<Query & { [K in Name]: Value }, never>
  : Query;

type QSToQueryObject<L extends string[], Query extends Record<string, unknown> = {}> = L extends [infer A extends string, ...infer R extends string[]]
  ? A extends `${infer Name}=${infer Value}`
    ? QSToQueryObject<R, AppendToQueryObject<[Name, Value], Query>>
    : A extends ''
      ? Query
      : QSToQueryObject<R, AppendToQueryObject<[A, true], Query>>
  : Query;

type ParseQueryString<Q extends string> = QSToQueryObject<SplitBy<Q, '&'>>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<ParseQueryString<''>, {}>>,
  Expect<Equal<ParseQueryString<'k1'>, { k1: true }>>,
  Expect<Equal<ParseQueryString<'k1&k1'>, { k1: true }>>,
  Expect<Equal<ParseQueryString<'k1&k2'>, { k1: true, k2: true }>>,
  Expect<Equal<ParseQueryString<'k1=v1'>, { k1: 'v1' }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k1=v2'>, { k1: ['v1', 'v2'] }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k2=v2'>, { k1: 'v1', k2: 'v2' }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k2=v2&k1=v2'>, { k1: ['v1', 'v2'], k2: 'v2' }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k2'>, { k1: 'v1', k2: true }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k1=v1'>, { k1: 'v1' }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k1=v2&k1=v1'>, { k1: ['v1', 'v2'] }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k2=v1&k1=v2&k1=v1'>, { k1: ['v1', 'v2'], k2: 'v1' }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k2=v2&k1=v2&k1=v3'>, { k1: ['v1', 'v2', 'v3'], k2: 'v2' }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k1'>, { k1: ['v1', true] }>>,
  Expect<Equal<ParseQueryString<'k1&k1=v1'>, { k1: [true, 'v1'] }>>,
]
