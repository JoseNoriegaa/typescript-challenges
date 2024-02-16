/**
 * 9155 - ValidDate
 *
 * Implement a type `ValidDate`, which takes an input type T and returns whether T is a valid date.
 * 
 * **Leap year is not considered**
 * 
 * Good Luck!
 * 
 * ```ts
 * ValidDate<'01 02'> // true
 * ValidDate<'01 31'> // true
 * ValidDate<'12 31'> // true
 * ValidDate<'02 29'> // false
 * ValidDate<'01 00'> // false
 * ValidDate<'01 32'> // false
 * ValidDate<'13 01'> // false
 * ```
 *
 */

/* _____________ Your Code Here _____________ */

type ExtractFromDateStr<S extends string> = S extends `${infer M1 extends number}${infer M2 extends number}${infer D1 extends number}${infer D2 extends number}${infer Rest}`
  ? Rest extends ''
    ? [`${M1}${M2}`, `${D1}${D2}`]
    : false
  : false;


type Aux<T extends string> = ExtractFromDateStr<T> extends [infer Month, infer Day]
  ? Month extends '00'
    ? false
    : Month extends `1${3|4|5|6|7|8|9}`
      ? false
      : Day extends '00'
        ? false
        : Day extends `${4|5|6|7|8|9}${number}`
          ? false
          // Validate months with 31 days
          : Month extends (`0${1|3|5|7|8}` | '10' |'12' )
            ? Day extends `3${2|3|4|5|6|7|8|9}`
              ? false
              : true
            // Validate months with 30 days
            : Month extends (`0${4|6|9}` | '11')
              ? Day extends `3${1|2|3|4|5|6|7|8|9}`
                ? false
                : true
              // Validate months with 28 days
              : Month extends '02'
                ? Day extends (`2${9}` | `3${number}`)
                  ? false
                  : true
                : false
  : false;

type ValidDate<T extends string> = Aux<T>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<ValidDate<'0102'>, true>>,
  Expect<Equal<ValidDate<'0131'>, true>>,
  Expect<Equal<ValidDate<'1231'>, true>>,
  Expect<Equal<ValidDate<'0229'>, false>>,
  Expect<Equal<ValidDate<'0100'>, false>>,
  Expect<Equal<ValidDate<'0132'>, false>>,
  Expect<Equal<ValidDate<'1301'>, false>>,
  Expect<Equal<ValidDate<'0123'>, true>>,
  Expect<Equal<ValidDate<'01234'>, false>>,
  Expect<Equal<ValidDate<''>, false>>,
]
