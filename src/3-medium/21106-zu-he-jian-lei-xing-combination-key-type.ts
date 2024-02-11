/**
 * 21106 - Combination key type
 *
 * 1. Combine multiple modifier keys, but the same modifier key combination cannot appear.
 * 2. In the `ModifierKeys` provided, the priority of the previous value is higher than the latter value; that is, `cmd ctrl` is OK, but `ctrl cmd` is not allowed.
 *
 *
 */

/* _____________ Your Code Here _____________ */

// 实现 Combs
type Aux<Key extends string, Cmds extends string[]> = Cmds[number] extends infer Cmd extends string
  ? `${Key} ${Cmd}`
  : Key;

type Combs<T extends string[]> = T extends [infer A extends string, ...infer Rest extends string[]]
  ? Aux<A, Rest> | Combs<Rest>
  : never;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type ModifierKeys = ['cmd', 'ctrl', 'opt', 'fn']
type CaseTypeOne = 'cmd ctrl' | 'cmd opt' | 'cmd fn' | 'ctrl opt' | 'ctrl fn' | 'opt fn'

type cases = [
  Expect<Equal<Combs<ModifierKeys>, CaseTypeOne>>,
]
