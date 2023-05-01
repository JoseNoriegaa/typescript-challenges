/*
  531 - String to Union
  -------
  by Andrey Krasovsky (@bre30kra69cs) #medium #union #string

  ### Question

  Implement the String to Union type. Type take string argument. The output should be a union of input letters

  For example

  ```ts
  type Test = '123';
  type Result = StringToUnion<Test>; // expected to be "1" | "2" | "3"
  ```

  > View on GitHub: https://tsch.js.org/531
*/

/* _____________ Your Code Here _____________ */
type StringToArray<S extends string> = S extends `${infer A}${infer B}`
  ? [A, ...StringToArray<B>]
  : [];

type StringToUnion<T extends string> = StringToArray<T>[number];

type StringToUnionV2<T extends string> = T extends `${infer A}${infer B}`
  ? A | StringToUnionV2<B>
  : never;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<StringToUnion<''>, never>>,
  Expect<Equal<StringToUnion<'t'>, 't'>>,
  Expect<Equal<StringToUnion<'hello'>, 'h' | 'e' | 'l' | 'l' | 'o'>>,
  Expect<Equal<StringToUnion<'coronavirus'>, 'c' | 'o' | 'r' | 'o' | 'n' | 'a' | 'v' | 'i' | 'r' | 'u' | 's'>>,
]

type casesV2 = [
  Expect<Equal<StringToUnionV2<''>, never>>,
  Expect<Equal<StringToUnionV2<'t'>, 't'>>,
  Expect<Equal<StringToUnionV2<'hello'>, 'h' | 'e' | 'l' | 'l' | 'o'>>,
  Expect<Equal<StringToUnionV2<'coronavirus'>, 'c' | 'o' | 'r' | 'o' | 'n' | 'a' | 'v' | 'i' | 'r' | 'u' | 's'>>,
]
