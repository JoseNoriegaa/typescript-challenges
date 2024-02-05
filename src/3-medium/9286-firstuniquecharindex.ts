/**
 * 9286 - FirstUniqueCharIndex
 *
 * Given a string s, find the first non-repeating character in it and return its index. If it does not exist, return -1.
 * (Inspired by [leetcode 387](https://leetcode.com/problems/first-unique-character-in-a-string/))
 *
 */

/* _____________ Your Code Here _____________ */

type FirstUniqueCharIndex<T extends string, U extends string[] = []> = T extends `${infer F}${infer R}`
  // Check if the char is in the the carry list
  ? F extends U[number]
    // If is repeat, continue checking for other char
    ? FirstUniqueCharIndex<R, [...U, F]>
    // Check if F is in the rest of chars
    : R extends `${string}${F}${string}`
      // If it's repeated, continue checking
      ? FirstUniqueCharIndex<R, [...U, F]>
      // If it's unique return the index
      : U['length']
  : -1

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<FirstUniqueCharIndex<'leetcode'>, 0>>,
  Expect<Equal<FirstUniqueCharIndex<'loveleetcode'>, 2>>,
  Expect<Equal<FirstUniqueCharIndex<'aabb'>, -1>>,
  Expect<Equal<FirstUniqueCharIndex<''>, -1>>,
  Expect<Equal<FirstUniqueCharIndex<'aaa'>, -1>>,
]
